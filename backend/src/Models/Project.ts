import mongoose, { Schema, Document } from "mongoose";
import ProjectStatus from "../core/ProjectStatus";

export interface IProject extends Document {
    name: string;
    description?: string;
    status: ProjectStatus;
    progress: number;
    createdBy: mongoose.Types.ObjectId;
    members: mongoose.Types.ObjectId[];
    channel?: mongoose.Types.ObjectId | null;
    startDate?: Date | null;
    endDate?: Date | null;
    createdAt: Date;
    updatedAt: Date;
}

const projectSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },

        description: {
            type: String,
            trim: true,
            default: ""
        },

        status: {
            type: String,
            enum: Object.values(ProjectStatus),
            default: ProjectStatus.PLANNING
        },

        progress: {
            type: Number,
            min: 0,
            max: 100,
            default: 0
        },

        createdBy: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        members: [
            {
                type: Schema.Types.ObjectId,
                ref: "User"
            }
        ],

        channel: {
            type: Schema.Types.ObjectId,
            ref: "Channel",
            default: null
        },

        startDate: {
            type: Date,
            default: null
        },

        endDate: {
            type: Date,
            default: null
        }
    },
    {
        timestamps: true
    }
);

// Indexes for fast lookup
projectSchema.index({ createdBy: 1 });
projectSchema.index({ status: 1 });
projectSchema.index({ members: 1 });
projectSchema.index({ channel: 1 });

// Date validation middleware
projectSchema.pre("validate", function () {
    if (this.startDate && this.endDate && this.startDate > this.endDate) {
        throw new Error("Project start date cannot be after end date.");
    }
});

// Middleware to sync status and progress consistency
projectSchema.pre("save", function () {
    if (this.status === ProjectStatus.COMPLETED && this.progress < 100) {
        this.progress = 100;
    } else if (this.progress === 100 && this.status !== ProjectStatus.COMPLETED) {
        this.status = ProjectStatus.COMPLETED;
    }
});

const ProjectModel = mongoose.model<IProject>("Project", projectSchema);

export { ProjectModel };
export default ProjectModel;

