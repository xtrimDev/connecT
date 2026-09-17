import Skill from "../core/Skill";
import SkillModel from "../models/SkillModel";
import User from "./User";

class SkillService {

    static async save(skill: Skill): Promise<Skill> {

        const skillDocument = new SkillModel({
            userId: skill.getId(),
            skills: skill.getSkills()
        });

        await skillDocument.save();

        return skill;
    }

    static async update(skill: Skill): Promise<Skill> {
        const skillDocument = await SkillModel.findOneAndUpdate(
            {
                userId: skill.getId()
            },
            {
                skills: skill.getSkills()
            },
            {
                new: true
            }
        );

        if (!skillDocument) {
            throw new Error("Skills not found for this user.");
        }

        return skill;
    }

    static async get(user: User): Promise<Skill> {

        const skillDocument = await SkillModel.findOne({
            userId: user.getId()
        });

        if (!skillDocument) {
            throw new Error("Skills not found for this user.");
        }

        return new Skill(
            user,
            skillDocument.skills
        );
    }
}

export default SkillService;