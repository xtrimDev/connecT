import User from './User';
import Message from './Message';

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

export default Group;
