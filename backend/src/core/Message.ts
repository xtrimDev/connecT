import User from './User';

class Message {
    static #count: number = 1000;

    #id: number;
    #content: string;
    #sender: User;
    #timestamp: Date;

    constructor(content: string, sender: User) {
        Message.#count++;

        this.#id = Message.#count;
        this.#content = content;
        this.#sender = sender;
        this.#timestamp = new Date();
    }

    getId(): number {
        return this.#id;
    }

    getContent(): string {
        return this.#content;
    }

    getSender(): User {
        return this.#sender;
    }

    getTimestamp(): Date {
        return this.#timestamp;
    }
}

export default Message;
