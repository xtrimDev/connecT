import express from "express";
import http from "http";
import { Server } from "socket.io";
import dotenv from "dotenv";
import Database from "./config/Database";

/** Import routes */
import auth_route from "./routes/Authentication";
import channel_route from "./routes/ChannelRoutes";
import group_route from "./routes/GroupRoutes";
import message_route from "./routes/MessageRoutes";

/** Import sockets handler */
import { initializeChatSocket } from "./sockets/chatSocket";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

/** Body parser middleware */
app.use(express.json());

/** Mount API routes */
app.use("/auth", auth_route);
app.use("/api/channels", channel_route);
app.use("/api/groups", group_route);
app.use("/api/messages", message_route);

/** Create HTTP server for Express + Socket.io */
const server = http.createServer(app);

/** Initialize Socket.io */
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST", "PUT", "DELETE"]
    }
});

initializeChatSocket(io);

/** Connect to Database and start server */
await Database.connect();

server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});