import User from './User';

class Message {
    #id: string | undefined;
    #content: string;
    #sender: User;
    #timestamp: Date;

    constructor(content: string, sender: User, timestamp: Date = new Date()) {
        if (!content || content.trim().length === 0) {
            throw new Error("Message content is required.");
        }

        if (!sender) {
            throw new Error("Message sender is required.");
        }

        this.#content = content.trim();
        this.#sender = sender;
        this.#timestamp = timestamp;
    }

    private setId(id: string): void {
        this.#id = id;
    }

    getId(): string | undefined {
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

    static fromDocument(doc: any): Message {
        const sender = doc.sender && doc.sender.name ? User.fromDocument(doc.sender) : doc.sender;
        const message = new Message(
            doc.content,
            sender,
            doc.createdAt ? new Date(doc.createdAt) : new Date()
        );

        if (doc._id) {
            message.setId(doc._id.toString());
        }

        return message;
    }
}

export default Message;

