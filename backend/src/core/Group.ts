import User from './User';
import Message from './Message';

class Group {
    #id: string | undefined;
    #name: string;
    #users: User[];
    #messages: Message[];

    constructor(name: string, users: User[] = [], messages: Message[] = []) {
        if (!name || name.trim().length === 0) {
            throw new Error("Group name is required.");
        }

        this.#name = name.trim();
        this.#users = users;
        this.#messages = messages;
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

    getUsers(): User[] {
        return [...this.#users];
    }

    getMessages(): Message[] {
        return [...this.#messages];
    }

    addUser(user: User): void {
        if (user && !this.#users.some((u) => u.getId() === user.getId())) {
            this.#users.push(user);
        }
    }

    removeUser(user: User): void {
        this.#users = this.#users.filter(
            (u) => u.getId() !== user.getId()
        );
    }

    addMessage(message: Message): void {
        if (message) {
            this.#messages.push(message);
        }
    }

    removeMessage(message: Message): void {
        this.#messages = this.#messages.filter(
            (m) => m.getId() !== message.getId()
        );
    }

    static fromDocument(doc: any): Group {
        const users = Array.isArray(doc.users)
            ? doc.users.map((u: any) => typeof u === "object" && u.name ? User.fromDocument(u) : u)
            : [];
        const messages = Array.isArray(doc.messages)
            ? doc.messages.map((m: any) => typeof m === "object" && m.content ? Message.fromDocument(m) : m)
            : [];

        const group = new Group(doc.name, users, messages);

        if (doc._id) {
            group.setId(doc._id.toString());
        }

        return group;
    }
}

export default Group;

