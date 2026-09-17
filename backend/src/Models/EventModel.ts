import mongoose, { Schema } from "mongoose";
import EventType from "../core/EventType";
import EventResponseStatus from "../core/EventResponseStatus";

const eventParticipantSchema = new Schema(
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
    },
    {
        timestamps: true
    }
);

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

        participants: [eventParticipantSchema]
    },
    {
        timestamps: true
    }
);

// Index for querying events by team and date
eventSchema.index({ teamId: 1, startTime: 1 });
eventSchema.index({ startTime: 1, endTime: 1 });

const EventModel = mongoose.model("Event", eventSchema);

export default EventModel;
