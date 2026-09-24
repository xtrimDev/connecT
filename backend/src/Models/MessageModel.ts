import mongoose, { Schema } from "mongoose";

const messageSchema = new Schema(
    {
        content: {
            type: String,
            required: true,
            trim: true
        },
        sender: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        group: {
            type: Schema.Types.ObjectId,
            ref: "Group"
        }
    },
    {
        timestamps: true
    }
);

messageSchema.index({ group: 1, createdAt: -1 });

const MessageModel = mongoose.model("Message", messageSchema);

export default MessageModel;
