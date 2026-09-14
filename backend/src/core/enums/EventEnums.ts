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

export { EventType, ResponseStatus };
