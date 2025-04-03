import {Order} from "../models/order.js"

export const createOrder = async(req, res) =>{
    try {
        console.log(req.body)
        const order = new Order({...req.body})
        await order.save()

        res.status(201).send("Order placed successfully")


    } catch (error) {
        res.status(500).send({message: "Internal Server Error", error})
    }
}