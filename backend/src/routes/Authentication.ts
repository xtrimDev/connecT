import express from "express";
import User from "../core/User"
import UserRole from "../core/UserRole";
import UserService from "../core/UserService";

const router = express.Router();

router.post("/signup", async (req, res) => {
    /** dummy data */
    const user : User = new User("sameer singh bhandari", "xyz@gmail.com", "abcd", UserRole.ADMIN);

    try {
        await UserService.addUser(user);

        res.json({"msg" : "Login successfull"});
    } catch(e) {
        res.json({"error": "something went wrong"});
    }    
});

router.post("/login", (req, res) => {
    res.json({"msg" : "Login successfull"});
})

export default router;