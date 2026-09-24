import express from "express";
import ChannelService from "../core/ChannelService";
import Channel from "../core/Channel";

const router = express.Router();

// Create channel
router.post("/", async (req, res) => {
    try {
        const { name } = req.body;
        if (!name) {
            return res.status(400).json({ error: "Channel name is required." });
        }

        const newChannel = new Channel(name);
        const createdChannel = await ChannelService.addChannel(newChannel);

        res.status(201).json({
            message: "Channel created successfully.",
            channel: createdChannel
        });
    } catch (e: any) {
        res.status(500).json({ error: e.message || "Failed to create channel." });
    }
});

// List all channels
router.get("/", async (req, res) => {
    try {
        const channels = await ChannelService.getAllChannels();
        res.json({ channels });
    } catch (e: any) {
        res.status(500).json({ error: e.message || "Failed to fetch channels." });
    }
});

// Get channel by ID
router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const channel = await ChannelService.getById(id);
        res.json({ channel });
    } catch (e: any) {
        res.status(404).json({ error: e.message || "Channel not found." });
    }
});

// Add group to channel
router.post("/:id/groups", async (req, res) => {
    try {
        const { id } = req.params;
        const { groupId } = req.body;

        if (!groupId) {
            return res.status(400).json({ error: "groupId is required." });
        }

        const channel = await ChannelService.addGroupToChannel(id, groupId);
        res.json({ message: "Group added to channel.", channel });
    } catch (e: any) {
        res.status(500).json({ error: e.message || "Failed to add group to channel." });
    }
});

// Remove group from channel
router.delete("/:id/groups/:groupId", async (req, res) => {
    try {
        const { id, groupId } = req.params;
        const channel = await ChannelService.removeGroupFromChannel(id, groupId);
        res.json({ message: "Group removed from channel.", channel });
    } catch (e: any) {
        res.status(500).json({ error: e.message || "Failed to remove group from channel." });
    }
});

// Delete channel
router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const success = await ChannelService.deleteChannelById(id);
        if (!success) {
            return res.status(404).json({ error: "Channel not found." });
        }
        res.json({ message: "Channel deleted successfully." });
    } catch (e: any) {
        res.status(500).json({ error: e.message || "Failed to delete channel." });
    }
});

export default router;
