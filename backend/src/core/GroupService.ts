import GroupModel from "../Models/GroupModel";
import Group from "./Group";

class GroupService {
    private constructor() {}

    static async addGroup(group: Group): Promise<Group> {
        try {
            const userIds = group.getUsers()
                .map((u) => u.getId())
                .filter((id): id is string => Boolean(id));

            const messageIds = group.getMessages()
                .map((m) => m.getId())
                .filter((id): id is string => Boolean(id));

            const createdDocument = await GroupModel.create({
                name: group.getName(),
                users: userIds,
                messages: messageIds
            });

            return Group.fromDocument(createdDocument);
        } catch (e) {
            console.error("Error adding group:", e);
            throw e;
        }
    }

    static async removeGroup(group: Group): Promise<void> {
        try {
            if (group.getId()) {
                await GroupModel.deleteOne({ _id: group.getId() });
            } else if (group.getName()) {
                await GroupModel.deleteOne({ name: group.getName() });
            } else {
                throw new Error("Can't delete group because of insufficient details.");
            }
        } catch (e) {
            console.error("Error removing group:", e);
            throw e;
        }
    }

    static async updateGroup(group: Group): Promise<void> {
        try {
            if (!group.getId()) {
                throw new Error("Can't update group because _id is required.");
            }

            const userIds = group.getUsers()
                .map((u) => u.getId())
                .filter((id): id is string => Boolean(id));

            const messageIds = group.getMessages()
                .map((m) => m.getId())
                .filter((id): id is string => Boolean(id));

            const updatedDoc = await GroupModel.findByIdAndUpdate(
                group.getId(),
                {
                    name: group.getName(),
                    users: userIds,
                    messages: messageIds
                },
                {
                    new: true,
                    runValidators: true
                }
            );

            if (!updatedDoc) {
                throw new Error("Group not found.");
            }
        } catch (e) {
            console.error("Error updating group:", e);
            throw e;
        }
    }

    static async getById(id: string): Promise<Group> {
        try {
            if (!id) {
                throw new Error("Group _id is required.");
            }

            const groupDoc = await GroupModel.findById(id)
                .populate("users")
                .populate({
                    path: "messages",
                    populate: { path: "sender" }
                });

            if (!groupDoc) {
                throw new Error("Group not found.");
            }

            return Group.fromDocument(groupDoc);
        } catch (e) {
            console.error("Error getting group by ID:", e);
            throw e;
        }
    }
}

export default GroupService;
