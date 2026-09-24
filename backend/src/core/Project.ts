import User from "./User";
import Channel from "./Channel";
import ProjectStatus from "./ProjectStatus";

class Project {
    #id: string | undefined;
    #name: string = "";
    #description: string = "";
    #createdBy: string = "";
    #status: ProjectStatus = ProjectStatus.PLANNING;
    #progress: number = 0;
    #members: User[] = [];
    #channel: Channel | null = null;
    #startDate: Date | null = null;
    #endDate: Date | null = null;
    #createdAt: Date;
    #updatedAt: Date;

    constructor(
        name: string,
        createdBy: string | User,
        description: string = "",
        members: User[] = [],
        channel: Channel | null = null,
        status: ProjectStatus = ProjectStatus.PLANNING,
        progress: number = 0,
        startDate: Date | null = null,
        endDate: Date | null = null
    ) {
        this.setName(name);
        this.setDescription(description);

        if (createdBy instanceof User) {
            const creatorId = createdBy.getId();
            if (!creatorId) {
                throw new Error("Creator User must have an ID.");
            }
            this.#createdBy = creatorId;
            this.addMember(createdBy);
        } else if (typeof createdBy === "string" && createdBy.trim().length > 0) {
            this.#createdBy = createdBy.trim();
        } else {
            throw new Error("Valid createdBy (User or string ID) is required.");
        }

        this.setProgress(progress);
        this.setStatus(status);
        this.setDates(startDate, endDate);

        for (const member of members) {
            this.addMember(member);
        }

        if (channel) {
            this.setChannel(channel);
        }

        this.#createdAt = new Date();
        this.#updatedAt = new Date();
    }

    private setId(id: string): void {
        this.#id = id;
    }

    getId(): string | undefined {
        return this.#id;
    }

    getName(): string {
        return this.#name;
    }

    setName(name: string): void {
        if (!name || name.trim().length === 0) {
            throw new Error("Project name is required.");
        }
        this.#name = name.trim();
        this.#updatedAt = new Date();
    }

    getDescription(): string {
        return this.#description;
    }

    setDescription(description: string): void {
        this.#description = description ? description.trim() : "";
        this.#updatedAt = new Date();
    }

    getCreatedBy(): string {
        return this.#createdBy;
    }

    getStatus(): ProjectStatus {
        return this.#status;
    }

    setStatus(status: ProjectStatus): void {
        if (!Object.values(ProjectStatus).includes(status)) {
            throw new Error(`Invalid project status: ${status}`);
        }
        this.#status = status;

        if (status === ProjectStatus.COMPLETED && this.#progress < 100) {
            this.#progress = 100;
        } else if (this.#progress === 100 && status !== ProjectStatus.COMPLETED) {
            this.#status = ProjectStatus.COMPLETED;
        }

        this.#updatedAt = new Date();
    }

    getProgress(): number {
        return this.#progress;
    }

    setProgress(progress: number): void {
        if (typeof progress !== "number" || isNaN(progress) || progress < 0 || progress > 100) {
            throw new Error("Progress must be a valid number between 0 and 100.");
        }

        this.#progress = Math.round(progress);

        if (this.#progress === 100 && this.#status !== ProjectStatus.COMPLETED) {
            this.#status = ProjectStatus.COMPLETED;
        } else if (this.#progress < 100 && this.#status === ProjectStatus.COMPLETED) {
            this.#status = ProjectStatus.ACTIVE;
        }

        this.#updatedAt = new Date();
    }

    getStartDate(): Date | null {
        return this.#startDate;
    }

    getEndDate(): Date | null {
        return this.#endDate;
    }

    setDates(startDate: Date | null, endDate: Date | null): void {
        if (startDate && endDate && startDate.getTime() > endDate.getTime()) {
            throw new Error("Project start date cannot be after end date.");
        }
        this.#startDate = startDate;
        this.#endDate = endDate;
        this.#updatedAt = new Date();
    }

    getCreatedAt(): Date {
        return this.#createdAt;
    }

    getUpdatedAt(): Date {
        return this.#updatedAt;
    }

    // Member Management
    getMembers(): User[] {
        return [...this.#members];
    }

    getMemberCount(): number {
        return this.#members.length;
    }

    hasMember(userOrId: User | string): boolean {
        if (userOrId instanceof User) {
            const id = userOrId.getId();
            if (id) {
                return this.#members.some((m) => m.getId() === id || m === userOrId);
            }
            return this.#members.includes(userOrId);
        }
        if (typeof userOrId === "string" && userOrId.trim().length > 0) {
            return this.#members.some((m) => m.getId() === userOrId);
        }
        return false;
    }

    addMember(user: User): void {
        if (!user || !(user instanceof User)) return;
        if (!this.hasMember(user)) {
            this.#members.push(user);
            this.#updatedAt = new Date();
        }
    }

    removeMember(userOrId: User | string): void {
        const targetId = userOrId instanceof User ? userOrId.getId() : userOrId;
        if (targetId && targetId === this.#createdBy) {
            throw new Error("Cannot remove the creator/owner of the project from members.");
        }

        const initialLength = this.#members.length;
        this.#members = this.#members.filter((m) => {
            if (userOrId instanceof User) {
                return m !== userOrId && (!targetId || m.getId() !== targetId);
            }
            return m.getId() !== userOrId;
        });

        if (this.#members.length !== initialLength) {
            this.#updatedAt = new Date();
        }
    }

    // Channel Management (1 Project : 1 Channel)
    getChannel(): Channel | null {
        return this.#channel;
    }

    getChannelId(): string | undefined {
        return this.#channel?.getId();
    }

    setChannel(channel: Channel | null): void {
        this.#channel = channel;
        this.#updatedAt = new Date();
    }

    removeChannel(): void {
        this.#channel = null;
        this.#updatedAt = new Date();
    }

    hasChannel(): boolean {
        return this.#channel !== null;
    }

    // Domain & Utility Methods
    calculateProgressFromTasks(tasks: Array<{ isCompleted?: () => boolean; status?: string }>): number {
        if (!tasks || tasks.length === 0) {
            return this.#progress;
        }

        const completedCount = tasks.filter((t) => {
            if (typeof t.isCompleted === "function") {
                return t.isCompleted();
            }
            return t.status === "COMPLETED";
        }).length;

        const calculated = Math.round((completedCount / tasks.length) * 100);
        this.setProgress(calculated);
        return calculated;
    }

    isCompleted(): boolean {
        return this.#status === ProjectStatus.COMPLETED;
    }

    isActive(): boolean {
        return this.#status === ProjectStatus.ACTIVE;
    }

    isOverdue(): boolean {
        if (!this.#endDate) return false;
        return new Date() > this.#endDate && !this.isCompleted();
    }

    toObject() {
        return {
            id: this.#id,
            name: this.#name,
            description: this.#description,
            createdBy: this.#createdBy,
            status: this.#status,
            progress: this.#progress,
            members: this.#members.map((m) => (typeof m.getId === "function" ? m.getId() : m)),
            channel: this.#channel
                ? typeof this.#channel.getId === "function" && this.#channel.getId()
                    ? this.#channel.getId()
                    : this.#channel.getName()
                : null,
            startDate: this.#startDate,
            endDate: this.#endDate,
            createdAt: this.#createdAt,
            updatedAt: this.#updatedAt
        };
    }

    // Factory hydration from database document
    static fromDocument(doc: any): Project {
        if (!doc) {
            throw new Error("Invalid document provided to Project.fromDocument");
        }

        const createdBy =
            doc.createdBy && typeof doc.createdBy === "object" && doc.createdBy._id
                ? doc.createdBy._id.toString()
                : doc.createdBy?.toString() || "";

        const members: User[] = Array.isArray(doc.members)
            ? doc.members
                .map((m: any) => {
                    if (m instanceof User) return m;
                    if (typeof m === "object" && m !== null) {
                        if (m._id || m.name) {
                            return User.fromDocument({ password: "dummy_password_hash", ...m });
                        }
                    }
                    return null;
                })
                .filter((m: any): m is User => m !== null)
            : [];

        let channel: Channel | null = null;
        const rawChannel = doc.channel || doc.channelId;
        if (rawChannel) {
            if (rawChannel instanceof Channel) {
                channel = rawChannel;
            } else if (typeof rawChannel === "object" && rawChannel !== null && rawChannel.name) {
                channel = Channel.fromDocument(rawChannel);
            }
        }

        const project = new Project(
            doc.name,
            createdBy,
            doc.description || "",
            members,
            channel,
            doc.status || ProjectStatus.PLANNING,
            typeof doc.progress === "number" ? doc.progress : 0,
            doc.startDate ? new Date(doc.startDate) : null,
            doc.endDate ? new Date(doc.endDate) : null
        );

        if (doc._id) {
            project.setId(doc._id.toString());
        }

        if (doc.createdAt) {
            project.#createdAt = new Date(doc.createdAt);
        }

        if (doc.updatedAt) {
            project.#updatedAt = new Date(doc.updatedAt);
        }

        return project;
    }
}

export default Project;
export { ProjectStatus };