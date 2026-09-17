import UserModel from "../Models/UserModel";
import User from "./User";

class UserService {
    private constructor() {}

    static async addUser(user: User) {
        try {
            await UserModel.create({
                name: user.getName(),
                email: user.getEmail(),
                password: user.getPassword(),
                role: user.getRole()
            });
        } catch (e) {
            console.log("Error: ", e);
            throw e;
        }
    }

    static async removeUser(user: User) {
        try {
            if (user.getId()) {
                await UserModel.deleteOne({
                    id: user.getId()
                });
            } else if (user.getEmail()) {
                await UserModel.deleteOne({
                    email: user.getEmail()
                });
            } else {
                throw new Error("Can't delete user because of insufficient details.");
            }
        } catch (e) {
            console.log("Error: ", e);
            throw e;
        }
    }

    static async updateUser(user: User) {
        try {
            if (!user.getId()) {
                throw new Error("Can't update user because _id is required.");
            }

            const updatedUser = await UserModel.findByIdAndUpdate(
                user.getId(),
                {
                    name: user.getName(),
                    email: user.getEmail(),
                    password: user.getPassword(),
                    role: user.getRole()
                },
                {
                    new: true,
                    runValidators: true
                }
            );

            if (!updatedUser) {
                throw new Error("User not found.");
            }
        } catch (e) {
            console.log("Error: ", e);
            throw e;
        }
    }

    static async getById(id: string): Promise<User> {
        try {
            if (!id) {
                throw new Error("User _id is required.");
            }

            const userDocument = await UserModel
                .findById(id)
                .select("+password");

            if (!userDocument) {
                throw new Error("User not found.");
            }

            return User.fromDocument(userDocument);

        } catch (e) {
            console.log("Error: ", e);
            throw e;
        }
    }

    static async getByEmail(email: string): Promise<User> {
        try {
            if (!email) {
                throw new Error("User email is required.");
            }

            const userDocument = await UserModel
                .findOne({ email });

            if (!userDocument) {
                throw new Error("User not found.");
            }

            return User.fromDocument(userDocument);

        } catch (e) {
            console.log("Error: ", e);
            throw e;
        }
    }
}

export default UserService;