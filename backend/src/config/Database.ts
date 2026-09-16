import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

class Database {
    static #connection: Database;

    private constructor() {}

    static async connect() {
        if (!Database.#connection) {
            Database.#connection = new Database();

            const MONGO_URI = process.env.MONGO_URI;

            if (!MONGO_URI) {
                throw new Error(
                    "Database connection string not found because MONGO_URI is undefined."
                );
            }

            try {
                await mongoose.connect(MONGO_URI);

                console.log("Connected to database successfully.");
            } catch (e) {
                console.error("Error connecting to the database:", e);
                throw e;
            }
        }
    }
}

export default Database;