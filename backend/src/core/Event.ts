import { EventType, ResponseStatus } from './enums/EventEnums';

class Event {
    static #count: number = 1000;

    #id: number;
    #teamId: number;
    #title: string;
    #description: string | null;
    #eventType: EventType;
    #location: string | null;
    #startTime: Date;
    #endTime: Date | null;
    #isAllDay: boolean;
    #reminderMinutes: number | null;
    #createdBy: number;
    #createdAt: Date;
    #updatedAt: Date;

    constructor(
        teamId: number,
        title: string,
        startTime: Date,
        createdBy: number,
        description: string | null = null,
        eventType: EventType = EventType.MEETING,
        location: string | null = null,
        endTime: Date | null = null,
        isAllDay: boolean = false,
        reminderMinutes: number | null = null
    ) {
        Event.#count++;

        this.#id = Event.#count;
        this.#teamId = teamId;
        this.#title = title;
        this.#description = description;
        this.#eventType = eventType;
        this.#location = location;
        this.#startTime = startTime;
        this.#endTime = endTime;
        this.#isAllDay = isAllDay;
        this.#reminderMinutes = reminderMinutes;
        this.#createdBy = createdBy;
        this.#createdAt = new Date();
        this.#updatedAt = new Date();
    }

    getId(): number {
        return this.#id;
    }

    getTeamId(): number {
        return this.#teamId;
    }

    getTitle(): string {
        return this.#title;
    }

    setTitle(title: string): void {
        this.#title = title;
        this.#updatedAt = new Date();
    }

    getDescription(): string | null {
        return this.#description;
    }

    setDescription(description: string | null): void {
        this.#description = description;
        this.#updatedAt = new Date();
    }

    getEventType(): EventType {
        return this.#eventType;
    }

    setEventType(eventType: EventType): void {
        this.#eventType = eventType;
        this.#updatedAt = new Date();
    }

    getLocation(): string | null {
        return this.#location;
    }

    setLocation(location: string | null): void {
        this.#location = location;
        this.#updatedAt = new Date();
    }

    getStartTime(): Date {
        return this.#startTime;
    }

    setStartTime(startTime: Date): void {
        this.#startTime = startTime;
        this.#updatedAt = new Date();
    }

    getEndTime(): Date | null {
        return this.#endTime;
    }

    setEndTime(endTime: Date | null): void {
        this.#endTime = endTime;
        this.#updatedAt = new Date();
    }

    isAllDay(): boolean {
        return this.#isAllDay;
    }

    setAllDay(isAllDay: boolean): void {
        this.#isAllDay = isAllDay;
        this.#updatedAt = new Date();
    }

    getReminderMinutes(): number | null {
        return this.#reminderMinutes;
    }

    setReminderMinutes(minutes: number | null): void {
        this.#reminderMinutes = minutes;
        this.#updatedAt = new Date();
    }

    getCreatedBy(): number {
        return this.#createdBy;
    }

    getCreatedAt(): Date {
        return this.#createdAt;
    }

    getUpdatedAt(): Date {
        return this.#updatedAt;
    }

    // Database integration methods - to be implemented with actual DB calls
    addParticipant(userId: number, status: ResponseStatus = ResponseStatus.PENDING): void {
        // TODO: Insert into event_participants table
    }

    removeParticipant(userId: number): void {
        // TODO: Delete from event_participants table
    }

    updateParticipantResponse(userId: number, status: ResponseStatus): void {
        // TODO: Update event_participants table
    }

    getParticipantResponse(userId: number): ResponseStatus | null {
        // TODO: Query from event_participants table
        return null;
    }

    getParticipantCount(): number {
        // TODO: Count from event_participants table
        return 0;
    }

    getAcceptedCount(): number {
        // TODO: Count accepted from event_participants table
        return 0;
    }
}

export default Event;
export { EventType, ResponseStatus };
