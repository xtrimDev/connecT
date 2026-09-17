import EventModel, { IEvent } from "../Models/EventModel";
import Event from "./Event";
import EventType from "./EventType";
import EventResponseStatus from "./EventResponseStatus";
import mongoose from "mongoose";

class EventService {
    private constructor() {}

    static async createEvent(event: Event): Promise<string> {
        try {
            const newEvent = await EventModel.create({
                teamId: event.getTeamId(),
                title: event.getTitle(),
                description: event.getDescription(),
                eventType: event.getEventType(),
                location: event.getLocation(),
                startTime: event.getStartTime(),
                endTime: event.getEndTime(),
                isAllDay: event.isAllDay(),
                reminderMinutes: event.getReminderMinutes(),
                createdBy: event.getCreatedBy(),
                participants: []
            });

            return newEvent._id.toString();
        } catch (e) {
            console.log("Error creating event: ", e);
            throw e;
        }
    }

    static async getEventById(eventId: string): Promise<IEvent | null> {
        try {
            const event = await EventModel.findById(eventId)
                .populate("createdBy", "name email")
                .populate("participants.userId", "name email");

            return event;
        } catch (e) {
            console.log("Error fetching event: ", e);
            throw e;
        }
    }

    static async getEventsByTeam(teamId: string): Promise<IEvent[]> {
        try {
            const events = await EventModel.find({ teamId })
                .populate("createdBy", "name email")
                .populate("participants.userId", "name email")
                .sort({ startTime: 1 });

            return events;
        } catch (e) {
            console.log("Error fetching team events: ", e);
            throw e;
        }
    }

    static async getEventsByDateRange(
        teamId: string,
        startDate: Date,
        endDate: Date
    ): Promise<IEvent[]> {
        try {
            const events = await EventModel.find({
                teamId,
                startTime: { $gte: startDate, $lte: endDate }
            })
                .populate("createdBy", "name email")
                .populate("participants.userId", "name email")
                .sort({ startTime: 1 });

            return events;
        } catch (e) {
            console.log("Error fetching events by date range: ", e);
            throw e;
        }
    }

    static async updateEvent(eventId: string, updates: Partial<IEvent>): Promise<IEvent | null> {
        try {
            const event = await EventModel.findByIdAndUpdate(
                eventId,
                updates,
                { new: true, runValidators: true }
            );

            return event;
        } catch (e) {
            console.log("Error updating event: ", e);
            throw e;
        }
    }

    static async deleteEvent(eventId: string): Promise<boolean> {
        try {
            const result = await EventModel.deleteOne({ _id: eventId });
            return result.deletedCount > 0;
        } catch (e) {
            console.log("Error deleting event: ", e);
            throw e;
        }
    }

    static async addParticipant(
        eventId: string,
        userId: string,
        responseStatus: EventResponseStatus = EventResponseStatus.PENDING
    ): Promise<IEvent | null> {
        try {
            const event = await EventModel.findByIdAndUpdate(
                eventId,
                {
                    $push: {
                        participants: {
                            userId,
                            responseStatus
                        }
                    }
                },
                { new: true }
            ).populate("participants.userId", "name email");

            return event;
        } catch (e) {
            console.log("Error adding participant: ", e);
            throw e;
        }
    }

    static async removeParticipant(eventId: string, userId: string): Promise<IEvent | null> {
        try {
            const event = await EventModel.findByIdAndUpdate(
                eventId,
                {
                    $pull: {
                        participants: { userId }
                    }
                },
                { new: true }
            );

            return event;
        } catch (e) {
            console.log("Error removing participant: ", e);
            throw e;
        }
    }

    static async updateParticipantResponse(
        eventId: string,
        userId: string,
        responseStatus: EventResponseStatus
    ): Promise<IEvent | null> {
        try {
            const event = await EventModel.findOneAndUpdate(
                {
                    _id: eventId,
                    "participants.userId": userId
                },
                {
                    $set: {
                        "participants.$.responseStatus": responseStatus
                    }
                },
                { new: true }
            ).populate("participants.userId", "name email");

            return event;
        } catch (e) {
            console.log("Error updating participant response: ", e);
            throw e;
        }
    }

    static async getParticipantsByStatus(
        eventId: string,
        responseStatus: EventResponseStatus
    ): Promise<IEvent | null> {
        try {
            const event = await EventModel.findById(eventId)
                .populate("participants.userId", "name email");

            if (event) {
                event.participants = event.participants.filter(
                    p => p.responseStatus === responseStatus
                );
            }

            return event;
        } catch (e) {
            console.log("Error fetching participants by status: ", e);
            throw e;
        }
    }
}

export default EventService;
