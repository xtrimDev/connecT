import User from "./User";

class Skill {
    #userId: string;
    #skills: string[] = [];

    constructor(user: User, skills: string[] = []) {

        const userId = user.getId();

        if (userId !== undefined) {
            this.#userId = userId;
        } else {
            throw new Error("Can't create skills because UserId not found.");
        }

        this.#skills = [...skills];
    }

    getId(): string {
        return this.#userId;
    }

    getSkills(): string[] {
        return [...this.#skills];
    }

    addSkill(skill: string): void {

        if (!skill || skill.trim().length === 0) {
            throw new Error("Skill cannot be empty.");
        }

        this.#skills.push(skill.trim());
    }

    removeSkill(skill: string): void {

        const index = this.#skills.indexOf(skill);

        if (index === -1) {
            throw new Error(`Skill "${skill}" not found.`);
        }

        this.#skills.splice(index, 1);
    }

    updateSkills(skills: string[]): void {

        if (!Array.isArray(skills)) {
            throw new Error("Skills must be an array.");
        }

        this.#skills = skills.map(skill => skill.trim());
    }
}

export default Skill;