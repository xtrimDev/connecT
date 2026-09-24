import express from "express";
import GroupService from "../core/GroupService";
import Group from "../core/Group";
import ChannelService from "../core/ChannelService";

const router = express.Router();

// Create group (optionally attach to a channel)
router.post("/", async (req, res) => {
    try {
        const { name, channelId } = req.body;
        if (!name) {
            return res.status(400).json({ error: "Group name is required." });
        }

        const newGroup = new Group(name);
        const createdGroup = await GroupService.addGroup(newGroup);

        if (channelId && createdGroup.getId()) {
            await ChannelService.addGroupToChannel(channelId, createdGroup.getId()!);
        }

        res.status(201).json({
            message: "Group created successfully.",
            group: createdGroup
        });
    } catch (e: any) {
        res.status(500).json({ error: e.message || "Failed to create group." });
    }
});

// Get group by ID
router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const group = await GroupService.getById(id);
        res.json({ group });
    } catch (e: any) {
        res.status(404).json({ error: e.message || "Group not found." });
    }
});

// Add user to group
router.post("/:id/users", async (req, res) => {
    try {
        const { id } = req.params;
        const { userId } = req.body;

        if (!userId) {
            return res.status(400).json({ error: "userId is required." });
        }

        const updatedGroup = await GroupService.addUserToGroup(id, userId);
        res.json({ message: "User added to group.", group: updatedGroup });
    } catch (e: any) {
        res.status(500).json({ error: e.message || "Failed to add user to group." });
    }
});

// Remove user from group
router.delete("/:id/users/:userId", async (req, res) => {
    try {
        const { id, userId } = req.params;
        const updatedGroup = await GroupService.removeUserFromGroup(id, userId);
        res.json({ message: "User removed from group.", group: updatedGroup });
    } catch (e: any) {
        res.status(500).json({ error: e.message || "Failed to remove user from group." });
    }
});

// Delete group
router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const success = await GroupService.deleteGroupById(id);
        if (!success) {
            return res.status(404).json({ error: "Group not found." });
        }
        res.json({ message: "Group deleted successfully." });
    } catch (e: any) {
        res.status(500).json({ error: e.message || "Failed to delete group." });
    }
});

export default router;
