import { Server, Socket } from "socket.io";
import MessageService from "../core/MessageService";

export function initializeChatSocket(io: Server) {
    io.on("connection", (socket: Socket) => {
        console.log(`[Socket] User connected: ${socket.id}`);

        // Join group room
        socket.on("join_room", ({ groupId }: { groupId: string }) => {
            if (groupId) {
                const roomName = `group:${groupId}`;
                socket.join(roomName);
                console.log(`[Socket] Client ${socket.id} joined room ${roomName}`);
            }
        });

        // Leave group room
        socket.on("leave_room", ({ groupId }: { groupId: string }) => {
            if (groupId) {
                const roomName = `group:${groupId}`;
                socket.leave(roomName);
                console.log(`[Socket] Client ${socket.id} left room ${roomName}`);
            }
        });

        // Send real-time message
        socket.on("send_message", async ({ groupId, senderId, content }: { groupId: string; senderId: string; content: string }) => {
            try {
                if (!groupId || !senderId || !content) {
                    socket.emit("error", { message: "groupId, senderId, and content are required." });
                    return;
                }

                // Persist message to database via domain service
                const message = await MessageService.sendMessage(content, senderId, groupId);

                const roomName = `group:${groupId}`;
                
                // Broadcast new message to all clients currently in the room (including sender)
                io.to(roomName).emit("new_message", message);
            } catch (err: any) {
                console.error("[Socket] Error handling send_message:", err);
                socket.emit("error", { message: err.message || "Failed to process message." });
            }
        });

        // Broadcast typing status
        socket.on("typing", ({ groupId, userId, userName }: { groupId: string; userId: string; userName: string }) => {
            if (groupId) {
                socket.to(`group:${groupId}`).emit("user_typing", { userId, userName });
            }
        });

        // Broadcast stopped typing status
        socket.on("stop_typing", ({ groupId, userId }: { groupId: string; userId: string }) => {
            if (groupId) {
                socket.to(`group:${groupId}`).emit("user_stopped_typing", { userId });
            }
        });

        // Client disconnect
        socket.on("disconnect", () => {
            console.log(`[Socket] User disconnected: ${socket.id}`);
        });
    });
}
