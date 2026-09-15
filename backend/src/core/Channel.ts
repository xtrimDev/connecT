import Group from './Group';

class Channel {
    static #count: number = 1000;

    #id: number;
    #name: string;
    #groups: Group[];

    constructor(name: string) {
        Channel.#count++;

        this.#id = Channel.#count;
        this.#name = name;
        this.#groups = [];
    }

    getId(): number {
        return this.#id;
    }

    getName(): string {
        return this.#name;
    }

    getGroups(): Group[] {
        return this.#groups;
    }

    addGroup(group: Group): void {
        this.#groups.push(group);
    }

    removeGroup(group: Group): void {
        this.#groups = this.#groups.filter(
            (g) => g.getId() !== group.getId()
        );
    }
}

export default Channel;
