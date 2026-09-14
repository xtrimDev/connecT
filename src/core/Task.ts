enum TaskStatus {
    TODO = "TODO",
    IN_PROGRESS = "IN_PROGRESS",
    COMPLETED = "COMPLETED",
    BLOCKED = "BLOCKED"
}

enum TaskPriority {
    LOW = "LOW",
    MEDIUM = "MEDIUM",
    HIGH = "HIGH",
    URGENT = "URGENT"
}

interface TaskComment {
    id: number;
    userId: number;
    content: string;
    createdAt: Date;
    updatedAt: Date;
}

class Task {
    static #count: number = 1000;
    static #commentCount: number = 1000;

    #id: number;
    #teamId: number;
    #eventId: number | null;
    #title: string;
    #description: string | null;
    #status: TaskStatus;
    #priority: TaskPriority;
    #assignedTo: number | null;
    #dueDate: Date | null;
    #completedAt: Date | null;
    #createdBy: number;
    #createdAt: Date;
    #updatedAt: Date;
    #comments: TaskComment[];

    constructor(
        teamId: number,
        title: string,
        createdBy: number,
        description: string | null = null,
        status: TaskStatus = TaskStatus.TODO,
        priority: TaskPriority = TaskPriority.MEDIUM,
        assignedTo: number | null = null,
        dueDate: Date | null = null,
        eventId: number | null = null
    ) {
        Task.#count++;

        this.#id = Task.#count;
        this.#teamId = teamId;
        this.#eventId = eventId;
        this.#title = title;
        this.#description = description;
        this.#status = status;
        this.#priority = priority;
        this.#assignedTo = assignedTo;
        this.#dueDate = dueDate;
        this.#completedAt = null;
        this.#createdBy = createdBy;
        this.#createdAt = new Date();
        this.#updatedAt = new Date();
        this.#comments = [];
    }

    getId(): number {
        return this.#id;
    }

    getTeamId(): number {
        return this.#teamId;
    }

    getEventId(): number | null {
        return this.#eventId;
    }

    setEventId(eventId: number | null): void {
        this.#eventId = eventId;
        this.#updatedAt = new Date();
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

    getStatus(): TaskStatus {
        return this.#status;
    }

    setStatus(status: TaskStatus): void {
        const previousStatus = this.#status;
        this.#status = status;
        this.#updatedAt = new Date();

        // Auto-set completed_at when status changes to COMPLETED
        if (status === TaskStatus.COMPLETED && previousStatus !== TaskStatus.COMPLETED) {
            this.#completedAt = new Date();
        } else if (status !== TaskStatus.COMPLETED) {
            this.#completedAt = null;
        }
    }

    getPriority(): TaskPriority {
        return this.#priority;
    }

    setPriority(priority: TaskPriority): void {
        this.#priority = priority;
        this.#updatedAt = new Date();
    }

    getAssignedTo(): number | null {
        return this.#assignedTo;
    }

    setAssignedTo(userId: number | null): void {
        this.#assignedTo = userId;
        this.#updatedAt = new Date();
    }

    getDueDate(): Date | null {
        return this.#dueDate;
    }

    setDueDate(dueDate: Date | null): void {
        this.#dueDate = dueDate;
        this.#updatedAt = new Date();
    }

    getCompletedAt(): Date | null {
        return this.#completedAt;
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

    isCompleted(): boolean {
        return this.#status === TaskStatus.COMPLETED;
    }

    isOverdue(): boolean {
        if (!this.#dueDate || this.#status === TaskStatus.COMPLETED) {
            return false;
        }
        return new Date() > this.#dueDate;
    }

    getDaysUntilDue(): number | null {
        if (!this.#dueDate) {
            return null;
        }
        const now = new Date();
        const diff = this.#dueDate.getTime() - now.getTime();
        return Math.ceil(diff / (1000 * 60 * 60 * 24));
    }

    isAssignedTo(userId: number): boolean {
        return this.#assignedTo === userId;
    }

    isCreatedBy(userId: number): boolean {
        return this.#createdBy === userId;
    }

    addComment(userId: number, content: string): TaskComment {
        Task.#commentCount++;

        const comment: TaskComment = {
            id: Task.#commentCount,
            userId,
            content,
            createdAt: new Date(),
            updatedAt: new Date()
        };

        this.#comments.push(comment);
        return comment;
    }

    updateComment(commentId: number, content: string, userId: number): boolean {
        const comment = this.#comments.find(c => c.id === commentId);
        if (!comment) {
            return false;
        }

        // Only the author can update their comment
        if (comment.userId !== userId) {
            throw new Error("You can only update your own comments");
        }

        comment.content = content;
        comment.updatedAt = new Date();
        return true;
    }

    deleteComment(commentId: number, userId: number): boolean {
        const commentIndex = this.#comments.findIndex(c => c.id === commentId);
        if (commentIndex === -1) {
            return false;
        }

        // Only the author can delete their comment
        if (this.#comments[commentIndex].userId !== userId) {
            throw new Error("You can only delete your own comments");
        }

        this.#comments.splice(commentIndex, 1);
        return true;
    }

    getComments(): TaskComment[] {
        return [...this.#comments];
    }

    getCommentCount(): number {
        return this.#comments.length;
    }

    getComment(commentId: number): TaskComment | null {
        return this.#comments.find(c => c.id === commentId) || null;
    }

    complete(): void {
        this.setStatus(TaskStatus.COMPLETED);
    }

    reopen(): void {
        if (this.#status === TaskStatus.COMPLETED) {
            this.setStatus(TaskStatus.TODO);
        }
    }

    block(): void {
        this.setStatus(TaskStatus.BLOCKED);
    }

    startProgress(): void {
        if (this.#status === TaskStatus.TODO) {
            this.setStatus(TaskStatus.IN_PROGRESS);
        }
    }

    getPriorityLevel(): number {
        switch (this.#priority) {
            case TaskPriority.LOW:
                return 1;
            case TaskPriority.MEDIUM:
                return 2;
            case TaskPriority.HIGH:
                return 3;
            case TaskPriority.URGENT:
                return 4;
            default:
                return 0;
        }
    }

    comparePriority(other: Task): number {
        return this.getPriorityLevel() - other.getPriorityLevel();
    }
}

export default Task;
export { TaskStatus, TaskPriority, TaskComment };
