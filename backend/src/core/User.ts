import UserRole from "./UserRole";
import UserModel from "../Models/UserModel";
import bcrypt from "bcrypt";

class User {
    #id: string | undefined;
    #name: string;
    #email: string;
    #password: string;
    #role: UserRole;

    constructor(
        name: string,
        email: string,
        password: string,
        role: UserRole,
        isHashedPassword: boolean = false
    ) {
        if (!name || name.trim().length === 0) {
            throw new Error("User name is required.");
        }

        if (!email || email.trim().length === 0) {
            throw new Error("User email is required.");
        }

        if (!password || password.length < 8) {
            throw new Error("Password must contain at least 8 characters.");
        }

        this.#name = name.trim();
        this.#email = email.trim().toLowerCase();

        this.#password = isHashedPassword
            ? password
            : bcrypt.hashSync(password, 12);

        this.#role = role;
    }

    private setId(id: string): void {
        this.#id = id
    }

    getId(): string | undefined {
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

    getPassword(): string {
        return this.#password;
    }

    async matchPassword(password: string): Promise<boolean> {
        return await bcrypt.compare(password, this.#password);
    }

    static fromDocument(userDocument: any): User {
        const user = new User(
            userDocument.name,
            userDocument.email,
            userDocument.password,
            userDocument.role,
            true
        );

        user.setId(userDocument._id.toString());

        return user;
    }
}

export default User;