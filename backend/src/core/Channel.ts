import Group from './Group';

class Channel {
    #id: string | undefined;
    #name: string;
    #groups: Group[];

    constructor(name: string, groups: Group[] = []) {
        if (!name || name.trim().length === 0) {
            throw new Error("Channel name is required.");
        }

        this.#name = name.trim();
        this.#groups = groups;
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

    getGroups(): Group[] {
        return [...this.#groups];
    }

    addGroup(group: Group): void {
        if (group && !this.#groups.some((g) => g.getId() === group.getId())) {
            this.#groups.push(group);
        }
    }

    removeGroup(group: Group): void {
        this.#groups = this.#groups.filter(
            (g) => g.getId() !== group.getId()
        );
    }

    static fromDocument(doc: any): Channel {
        const groups = Array.isArray(doc.groups)
            ? doc.groups.map((g: any) => typeof g === "object" && g.name ? Group.fromDocument(g) : g)
            : [];

        const channel = new Channel(doc.name, groups);

        if (doc._id) {
            channel.setId(doc._id.toString());
        }

        return channel;
    }
}

export default Channel;

