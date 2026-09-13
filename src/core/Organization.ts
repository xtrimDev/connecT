import User from "./User";
import Workspace from "./Workspace"

class Organization extends Workspace {
    static #count: number = 1000;

    #id : number;
    #name : string;

    #users: User[] = [];
    
    constructor(name : string) {
        super();
        
        Organization.#count++;

        this.#id = Organization.#count;
        this.#name = name;
    }

    countEmployee() : number {
        return this.#users.length;
    }

    addEmployee(user: User) {
        this.#users.push(user);
    }

    removeEmployee(user: User) {
        this.#users = this.#users.filter(u => u !== user);
    }
}

export default Organization;