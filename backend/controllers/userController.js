import {User} from "../models/user.js"
import bcrypt from "bcrypt"

export const registerUser = async(req, res) =>{
    try {
        console.log(req.body)
        const {email, name, password}  = req.body
        let user = await User.findOne({email})
        if (user){
            return res.status(409).send("User already exists")
        }

        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(password, salt)

        user = new User({...req.body, password:hashPassword})
        await user.save()

        res.status(201).send("Registration Successful")


    } catch (error) {
        res.status(500).send({message: "Internal Server Error", error})
        console.log("Status : 500", error)
    }
}