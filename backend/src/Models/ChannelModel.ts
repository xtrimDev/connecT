import mongoose, { Schema } from "mongoose";

const channelSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },
        groups: [
            {
                type: Schema.Types.ObjectId,
                ref: "Group"
            }
        ]
    },
    {
        timestamps: true
    }
);

const ChannelModel = mongoose.model("Channel", channelSchema);

export default ChannelModel;
