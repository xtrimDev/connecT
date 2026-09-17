import mongoose, { Schema, Document } from "mongoose";
import EventType from "../core/EventType";
import EventResponseStatus from "../core/EventResponseStatus";

export interface IEventParticipant {
    userId: mongoose.Types.ObjectId;
    responseStatus: EventResponseStatus;
    createdAt: Date;
    updatedAt: Date;
}

export interface IEvent extends Document {
    teamId: mongoose.Types.ObjectId;
    title: string;
    description?: string;
    eventType: EventType;
    location?: string;
    startTime: Date;
    endTime?: Date;
    isAllDay: boolean;
    reminderMinutes?: number;
    createdBy: mongoose.Types.ObjectId;
    participants: IEventParticipant[];
    createdAt: Date;
    updatedAt: Date;
}

const eventSchema = new Schema(
    {
        teamId: {
            type: Schema.Types.ObjectId,
            ref: "Group",
            required: true
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

        eventType: {
            type: String,
            enum: Object.values(EventType),
            default: EventType.MEETING
        },

        location: {
            type: String,
            trim: true,
            default: null
        },

        startTime: {
            type: Date,
            required: true
        },

        endTime: {
            type: Date,
            default: null
        },

        isAllDay: {
            type: Boolean,
            default: false
        },

        reminderMinutes: {
            type: Number,
            default: null
        },

        createdBy: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        participants: [
            {
                userId: {
                    type: Schema.Types.ObjectId,
                    ref: "User",
                    required: true
                },
                responseStatus: {
                    type: String,
                    enum: Object.values(EventResponseStatus),
                    default: EventResponseStatus.PENDING
                }
            }
        ]
    },
    {
        timestamps: true
    }
);

// Indexes
eventSchema.index({ teamId: 1, startTime: 1 });
eventSchema.index({ startTime: 1, endTime: 1 });

const EventModel = mongoose.model<IEvent>("Event", eventSchema);

export default EventModel;
