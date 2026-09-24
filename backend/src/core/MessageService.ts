import MessageModel from "../Models/MessageModel";
import GroupModel from "../Models/GroupModel";
import Message from "./Message";

class MessageService {
    private constructor() {}

    static async sendMessage(content: string, senderId: string, groupId: string): Promise<Message> {
        try {
            if (!content || content.trim().length === 0) {
                throw new Error("Message content cannot be empty.");
            }
            if (!senderId) {
                throw new Error("Sender ID is required.");
            }
            if (!groupId) {
                throw new Error("Group ID is required.");
            }

            const messageDoc = await MessageModel.create({
                content: content.trim(),
                sender: senderId,
                group: groupId
            });

            // Link message to Group
            await GroupModel.findByIdAndUpdate(groupId, {
                $push: { messages: messageDoc._id }
            });

            const populatedDoc = await MessageModel.findById(messageDoc._id).populate("sender", "name email role");

            if (!populatedDoc) {
                throw new Error("Failed to populate message sender.");
            }

            return Message.fromDocument(populatedDoc);
        } catch (e) {
            console.error("Error sending message:", e);
            throw e;
        }
    }

    static async getMessagesByGroup(groupId: string, page: number = 1, limit: number = 50): Promise<Message[]> {
        try {
            if (!groupId) {
                throw new Error("Group ID is required.");
            }

            const skip = (Math.max(1, page) - 1) * limit;

            const messageDocs = await MessageModel.find({ group: groupId })
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limit)
                .populate("sender", "name email role");

            // Return in chronological order (oldest to newest)
            const sortedDocs = messageDocs.reverse();

            return sortedDocs.map((doc) => Message.fromDocument(doc));
        } catch (e) {
            console.error("Error fetching messages by group:", e);
            throw e;
        }
    }

    static async editMessage(messageId: string, senderId: string, content: string): Promise<Message> {
        try {
            if (!content || content.trim().length === 0) {
                throw new Error("Updated message content cannot be empty.");
            }

            const updatedDoc = await MessageModel.findOneAndUpdate(
                { _id: messageId, sender: senderId },
                { content: content.trim() },
                { new: true, runValidators: true }
            ).populate("sender", "name email role");

            if (!updatedDoc) {
                throw new Error("Message not found or user unauthorized to edit this message.");
            }

            return Message.fromDocument(updatedDoc);
        } catch (e) {
            console.error("Error editing message:", e);
            throw e;
        }
    }

    static async deleteMessage(messageId: string, senderId: string): Promise<boolean> {
        try {
            const messageDoc = await MessageModel.findOne({ _id: messageId, sender: senderId });

            if (!messageDoc) {
                throw new Error("Message not found or user unauthorized to delete this message.");
            }

            const groupId = messageDoc.group;

            await MessageModel.deleteOne({ _id: messageId });

            if (groupId) {
                await GroupModel.findByIdAndUpdate(groupId, {
                    $pull: { messages: messageId }
                });
            }

            return true;
        } catch (e) {
            console.error("Error deleting message:", e);
            throw e;
        }
    }
}

export default MessageService;
