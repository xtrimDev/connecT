import Database from "./config/Database"
import User from "./core/User"
import UserRole from "./core/UserRole"
import UserService from "./core/UserService"

Database.connect()

const u1 = new User("Sameer Singh Bhandari", "bhandarisameer512@gmail.com", "Password", UserRole.BASIC, false, ["TypeScript", "Node.js", "React"])
UserService.addUser(u1)