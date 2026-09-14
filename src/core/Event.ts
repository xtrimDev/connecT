enum EventType {
    MEETING = "MEETING",
    DEADLINE = "DEADLINE",
    MILESTONE = "MILESTONE",
    PRESENTATION = "PRESENTATION",
    OTHER = "OTHER"
}

enum ResponseStatus {
    PENDING = "PENDING",
    ACCEPTED = "ACCEPTED",
    DECLINED = "DECLINED",
    TENTATIVE = "TENTATIVE"
}

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
    #participants: Map<number, ResponseStatus>;

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
        this.#participants = new Map();
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
        if (endTime && this.#startTime && endTime <= this.#startTime) {
            throw new Error("End time must be after start time");
        }
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
        if (minutes !== null && (minutes < 0 || minutes > 10080)) {
            throw new Error("Reminder must be between 0 and 10080 minutes (1 week)");
        }
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

    addParticipant(userId: number, status: ResponseStatus = ResponseStatus.PENDING): void {
        this.#participants.set(userId, status);
    }

    removeParticipant(userId: number): void {
        this.#participants.delete(userId);
    }

    updateParticipantResponse(userId: number, status: ResponseStatus): void {
        if (!this.#participants.has(userId)) {
            throw new Error("Participant not found");
        }
        this.#participants.set(userId, status);
    }

    getParticipantResponse(userId: number): ResponseStatus | null {
        return this.#participants.get(userId) || null;
    }

    getParticipants(): Map<number, ResponseStatus> {
        return new Map(this.#participants);
    }

    getParticipantCount(): number {
        return this.#participants.size;
    }

    getAcceptedCount(): number {
        let count = 0;
        for (const status of this.#participants.values()) {
            if (status === ResponseStatus.ACCEPTED) {
                count++;
            }
        }
        return count;
    }

    isPast(): boolean {
        const now = new Date();
        return this.#startTime < now;
    }

    isUpcoming(daysAhead: number = 7): boolean {
        const now = new Date();
        const futureDate = new Date();
        futureDate.setDate(futureDate.getDate() + daysAhead);
        return this.#startTime > now && this.#startTime <= futureDate;
    }

    getDuration(): number | null {
        if (!this.#endTime) {
            return null;
        }
        return this.#endTime.getTime() - this.#startTime.getTime();
    }

    conflictsWith(otherEvent: Event): boolean {
        if (!this.#endTime || !otherEvent.getEndTime()) {
            return false;
        }

        const thisStart = this.#startTime.getTime();
        const thisEnd = this.#endTime.getTime();
        const otherStart = otherEvent.getStartTime().getTime();
        const otherEnd = otherEvent.getEndTime()!.getTime();

        return (thisStart < otherEnd && thisEnd > otherStart);
    }
}

export default Event;
export { EventType, ResponseStatus };
