import mongoose, { Schema } from "mongoose";
import TaskStatus from "../core/TaskStatus";
import TaskPriority from "../core/TaskPriority";

const taskCommentSchema = new Schema(
    {
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

const taskSchema = new Schema(
    {
        teamId: {
            type: Schema.Types.ObjectId,
            ref: "Group",
            required: true
        },

        eventId: {
            type: Schema.Types.ObjectId,
            ref: "Event",
            default: null
        },

        title: {
            type: String,
            required: true,
            trim: true
        },

        description: {
            type: String,
            trim: true,
            default: null
        },

        status: {
            type: String,
            enum: Object.values(TaskStatus),
            default: TaskStatus.TODO
        },

        priority: {
            type: String,
            enum: Object.values(TaskPriority),
            default: TaskPriority.MEDIUM
        },

        assignedTo: {
            type: Schema.Types.ObjectId,
            ref: "User",
            default: null
        },

        dueDate: {
            type: Date,
            default: null
        },

        completedAt: {
            type: Date,
            default: null
        },

        createdBy: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        comments: [taskCommentSchema]
    },
    {
        timestamps: true
    }
);

// Index for querying tasks by team and status
taskSchema.index({ teamId: 1, status: 1 });
taskSchema.index({ assignedTo: 1 });
taskSchema.index({ dueDate: 1 });

// Middleware to set completedAt when status changes to COMPLETED
taskSchema.pre('save', function(next) {
    if (this.isModified('status')) {
        if (this.status === TaskStatus.COMPLETED && !this.completedAt) {
            this.completedAt = new Date();
        } else if (this.status !== TaskStatus.COMPLETED) {
            this.completedAt = null;
        }
    }
    next();
});

const TaskModel = mongoose.model("Task", taskSchema);

export default TaskModel;
