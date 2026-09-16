import ChannelModel from "../Models/ChannelModel";
import Channel from "./Channel";

class ChannelService {
    private constructor() {}

    static async addChannel(channel: Channel): Promise<Channel> {
        try {
            const groupIds = channel.getGroups()
                .map((g) => g.getId())
                .filter((id): id is string => Boolean(id));

            const createdDocument = await ChannelModel.create({
                name: channel.getName(),
                groups: groupIds
            });

            return Channel.fromDocument(createdDocument);
        } catch (e) {
            console.error("Error adding channel:", e);
            throw e;
        }
    }

    static async removeChannel(channel: Channel): Promise<void> {
        try {
            if (channel.getId()) {
                await ChannelModel.deleteOne({ _id: channel.getId() });
            } else if (channel.getName()) {
                await ChannelModel.deleteOne({ name: channel.getName() });
            } else {
                throw new Error("Can't delete channel because of insufficient details.");
            }
        } catch (e) {
            console.error("Error removing channel:", e);
            throw e;
        }
    }

    static async updateChannel(channel: Channel): Promise<void> {
        try {
            if (!channel.getId()) {
                throw new Error("Can't update channel because _id is required.");
            }

            const groupIds = channel.getGroups()
                .map((g) => g.getId())
                .filter((id): id is string => Boolean(id));

            const updatedDoc = await ChannelModel.findByIdAndUpdate(
                channel.getId(),
                {
                    name: channel.getName(),
                    groups: groupIds
                },
                {
                    new: true,
                    runValidators: true
                }
            );

            if (!updatedDoc) {
                throw new Error("Channel not found.");
            }
        } catch (e) {
            console.error("Error updating channel:", e);
            throw e;
        }
    }

    static async getById(id: string): Promise<Channel> {
        try {
            if (!id) {
                throw new Error("Channel _id is required.");
            }

            const channelDocument = await ChannelModel.findById(id).populate({
                path: "groups",
                populate: [
                    { path: "users" },
                    { path: "messages", populate: { path: "sender" } }
                ]
            });

            if (!channelDocument) {
                throw new Error("Channel not found.");
            }

            return Channel.fromDocument(channelDocument);
        } catch (e) {
            console.error("Error getting channel by ID:", e);
            throw e;
        }
    }

    static async getAllChannels(): Promise<Channel[]> {
        try {
            const documents = await ChannelModel.find().populate({
                path: "groups",
                populate: [
                    { path: "users" },
                    { path: "messages", populate: { path: "sender" } }
                ]
            });

            return documents.map((doc) => Channel.fromDocument(doc));
        } catch (e) {
            console.error("Error fetching all channels:", e);
            throw e;
        }
    }
}

export default ChannelService;
