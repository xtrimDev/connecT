import UserRole from "./UserRole";
import bcrypt from "bcrypt";

class User {
    #id: string | undefined;
    #name: string = "";
    #email: string = "";
    #password: string = "";
    #role: UserRole = UserRole.BASIC_USER;

    constructor(
        name: string,
        email: string,
        password: string,
        role: UserRole,
        isHashedPassword: boolean = false
    ) {
        this.setName(name);
        this.setEmail(email);
        this.setPassword(password);
        this.setRole(role);

        if (!isHashedPassword) 
            this.setPassword(password);
        else 
            this.#password = password
    }

    private setId(id: string): void {
        this.#id = id
    }

    getId(): string | undefined {
        return this.#id;
    }

    setName(name: string) {
        if (!name || name.trim().length === 0) {
            throw new Error("User name is required.");
        }
        
        this.#name = name;
    }

    getName(): string {
        return this.#name;
    }

    setEmail(email: string) {
        this.#email = email;
    }

    getEmail(): string {
        return this.#email;
    }

    setRole(role: UserRole) {
        this.#role = role;
    }

    getRole(): UserRole {
        return this.#role;
    }

    setPassword(password: string) {
        this.#password = bcrypt.hashSync(password, 12);
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