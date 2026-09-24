import mongoose, { Schema } from "mongoose";

const groupSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },
        users: [
            {
                type: Schema.Types.ObjectId,
                ref: "User"
            }
        ],
        messages: [
            {
                type: Schema.Types.ObjectId,
                ref: "Message"
            }
        ]
    },
    {
        timestamps: true
    }
);

const GroupModel = mongoose.model("Group", groupSchema);

export default GroupModel;
