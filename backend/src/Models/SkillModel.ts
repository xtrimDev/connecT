import mongoose, { Schema } from "mongoose";

const SkillSchema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
            unique: true
        },

        skills: {
            type: [String],
            default: []
        }
    },
    {
        timestamps: true
    }
);

const SkillModel = mongoose.model("Skill", SkillSchema);

export default SkillModel;