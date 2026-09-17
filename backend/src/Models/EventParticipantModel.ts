import mongoose, { Schema, Document } from "mongoose";
import EventResponseStatus from "../core/EventResponseStatus";

export interface IEventParticipant extends Document {
    eventId: mongoose.Types.ObjectId;
    userId: mongoose.Types.ObjectId;
    responseStatus: EventResponseStatus;
    createdAt: Date;
    updatedAt: Date;
}

const eventParticipantSchema = new Schema(
    {
        eventId: {
            type: Schema.Types.ObjectId,
            ref: "Event",
            required: true
        },

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

eventParticipantSchema.index({ eventId: 1 });
eventParticipantSchema.index({ userId: 1 });

const EventParticipantModel = mongoose.model<IEventParticipant>(
    "EventParticipant",
    eventParticipantSchema
);

export default EventParticipantModel;
