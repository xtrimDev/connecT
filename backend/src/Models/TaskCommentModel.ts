import mongoose, { Schema, Document } from "mongoose";

export interface ITaskComment extends Document {
    taskId: mongoose.Types.ObjectId;
    userId: mongoose.Types.ObjectId;
    content: string;
    createdAt: Date;
    updatedAt: Date;
}

const taskCommentSchema = new Schema(
    {
        taskId: {
            type: Schema.Types.ObjectId,
            ref: "Task",
            required: true
        },

        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        content: {
            type: String,
            required: true,
            trim: true
        }
    },
    {
        timestamps: true
    }
);

taskCommentSchema.index({ taskId: 1, createdAt: -1 });

const TaskCommentModel = mongoose.model<ITaskComment>("TaskComment", taskCommentSchema);

export default TaskCommentModel;
