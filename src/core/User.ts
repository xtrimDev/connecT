import UserRole from './UserRole';

class User {
    static #count: number = 1000;

    #id: number;
    #name: string;
    #email: string;
    #role: UserRole;

    constructor(name: string, email: string, role: UserRole) {
        User.#count++;

        this.#id = User.#count;
        this.#name = name;
        this.#email = email;
        this.#role = role;
    }

    getId(): number {
        return this.#id;
    }

    getName(): string {
        return this.#name;
    }

    getEmail(): string {
        return this.#email;
    }

    getRole(): UserRole {
        return this.#role;
    }
}

export default User;