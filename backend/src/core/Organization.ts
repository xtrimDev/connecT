import User from "./User";
import Workspace from "./Workspace"

class Organization {
    #id : string | undefined;

    #name : string = "";
    #description : string = "";
    #website : string = "";
    #ownerId : string | undefined;
    
    constructor(name : string, description: string, website: string, owner: User) {
        this.setName(name);
        this.setDescription(description);
        this.setWebsite(website);

        if (owner.getId() == undefined) {
            throw new Error("Owner Id not found.");
        }

        this.#ownerId = owner.getId(); 

    }

    private setId(id : string) {
        this.#id = id;
    }

    getId() : string | undefined {
        return this.#id;
    }

    getOwnerId() : string | undefined {
        return this.#ownerId;
    }

    private setName(name : string): void {
        if (name.trim() == "") {
            throw new Error("Name is required.");
        }

        this.#name = name;
    }

    getName() : string {
        return this.#name;
    }

    setDescription(description : string): void {
        if (description.trim() == "") {
            throw new Error("Description is required.");
        }

        this.#description = description;
    }

    getDescription(): string {
        return this.#description;
    }

    setWebsite(website : string): void {
        if (website.trim() == "") {
            throw new Error("Website is required.");
        }

        this.#website = website;
    }

    getWebsite():string {
        return this.#website;
    }

    static fromDocument(organizationDocument: any): Organization {
        const organization = new Organization(
            organizationDocument.name,
            organizationDocument.description,
            organizationDocument.website,
            organizationDocument.ownerId
        );

        organization.setId(organizationDocument._id.toString());

        return organization;
    }
}

export default Organization;