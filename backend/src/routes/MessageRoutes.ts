import express from "express";
import MessageService from "../core/MessageService";

const router = express.Router();

// Send a message via HTTP REST
router.post("/", async (req, res) => {
    try {
        const { content, senderId, groupId } = req.body;
        if (!content || !senderId || !groupId) {
            return res.status(400).json({ error: "content, senderId, and groupId are required." });
        }

        const message = await MessageService.sendMessage(content, senderId, groupId);
        res.status(201).json({
            message: "Message sent successfully.",
            data: message
        });
    } catch (e: any) {
        res.status(500).json({ error: e.message || "Failed to send message." });
    }
});

// Get paginated chat history for a group
router.get("/group/:groupId", async (req, res) => {
    try {
        const { groupId } = req.params;
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 50;

        const messages = await MessageService.getMessagesByGroup(groupId, page, limit);
        res.json({
            groupId,
            page,
            limit,
            count: messages.length,
            messages
        });
    } catch (e: any) {
        res.status(500).json({ error: e.message || "Failed to fetch group messages." });
    }
});

// Edit message content
router.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { senderId, content } = req.body;

        if (!senderId || !content) {
            return res.status(400).json({ error: "senderId and content are required." });
        }

        const updatedMessage = await MessageService.editMessage(id, senderId, content);
        res.json({
            message: "Message updated successfully.",
            data: updatedMessage
        });
    } catch (e: any) {
        res.status(500).json({ error: e.message || "Failed to update message." });
    }
});

// Delete message
router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { senderId } = req.body;

        if (!senderId) {
            return res.status(400).json({ error: "senderId is required to delete message." });
        }

        await MessageService.deleteMessage(id, senderId);
        res.json({ message: "Message deleted successfully." });
    } catch (e: any) {
        res.status(500).json({ error: e.message || "Failed to delete message." });
    }
});

export default router;
