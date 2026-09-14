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


class Group {
    static #count: number = 1000;

    #id: number;
    #name: string;
    #users: User[];
    #messages: Message[];

    constructor(name: string) {
        Group.#count++;

        this.#id = Group.#count;
        this.#name = name;
        this.#users = [];
        this.#messages = [];
    }

    getId(): number {
        return this.#id;
    }

    getName(): string {
        return this.#name;
    }

    getUsers(): User[] {
        return this.#users;
    }

    getMessages(): Message[] {
        return this.#messages;
    }

    addUser(user: User): void {
        this.#users.push(user);
    }

    removeUser(user: User): void {
        this.#users = this.#users.filter(
            (u) => u.getId() !== user.getId()
        );
    }

    addMessage(message: Message): void {
        this.#messages.push(message);
    }

    removeMessage(message: Message): void {
        this.#messages = this.#messages.filter(
            (m) => m.getId() !== message.getId()
        );
    }
}


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


export { Group, Message };
export default Channel;
