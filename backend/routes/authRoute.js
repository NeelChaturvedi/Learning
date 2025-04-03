import express from "express";
import bcrypt from "bcrypt";
import {User} from "../models/user.js";

const router = express.Router();

router.post("/", async (req, res) => {
    try {
        const {email, password} = req.body
        console.log(req.body)
        const user = await User.findOne({email})
        if (!user){
            return res.status(401).send({message: "User does not exist"})
        }
        const validPassword = await bcrypt.compare(password, user.password)
        if (!validPassword){
            return res.status(401).send({message: "Incorrect Password"})
        }
        const token = user.generateAuthToken()
        res.status(201).send({token, user, message: "Login Successful"})
    } catch (error) {
        res.status(500).send({message: "Something went wrong."})
    }
});

export default router;
