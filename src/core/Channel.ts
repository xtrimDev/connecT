class Channel {
    static #count: number = 1000;

    #id: number;
    #name: string;
    #createdBy: number;

    constructor(name: string, createdBy: number) {
        Channel.#count++;

        this.#id = Channel.#count;
        this.#name = name;
        this.#createdBy = createdBy;
    }

    getId(): number {
        return this.#id;
    }

    getName(): string {
        return this.#name;
    }

    getCreatedBy(): number {
        return this.#createdBy;
    }
}

export default Channel;
