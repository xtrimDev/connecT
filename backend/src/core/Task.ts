import TaskStatus from "./TaskStatus"
import TaskPriority from "./TaskPriority"

interface TaskComment {
    id: number;
    userId: number;
    content: string;
    createdAt: Date;
    updatedAt: Date;
}

class Task {
    static #count: number = 1000;

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

    // Database integration methods - to be implemented with actual DB calls
    addComment(_userId: number, _content: string): TaskComment | null {
        // TODO: Insert into task_comments table
        return null;
    }

    updateComment(_commentId: number, _content: string, _userId: number): boolean {
        // TODO: Update task_comments table with authorization check
        return false;
    }

    deleteComment(_commentId: number, _userId: number): boolean {
        // TODO: Delete from task_comments table with authorization check
        return false;
    }

    getComments(): TaskComment[] {
        // TODO: Query from task_comments table
        return [];
    }

    getCommentCount(): number {
        // TODO: Count from task_comments table
        return 0;
    }

    getComment(_commentId: number): TaskComment | null {
        // TODO: Query single comment from task_comments table
        return null;
    }
}

export default Task;
export { TaskStatus, TaskPriority, TaskComment };
