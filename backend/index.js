import dotenv from "dotenv"
import userRoute from "./routes/userRoute.js";
import authRoute from "./routes/authRoute.js";
import authMiddleware from "./middleware/authMiddleware.js";
dotenv.config()
import express from "express"
import connectDB from './config/connectdb.js'

const app = express();

const PORT = 6900

app.use("/api/auth", authRoute)
app.use("/api/users", userRoute)
app.use("/api", authMiddleware)

app.listen(PORT, () => {
    connectDB();
    console.log("Connected to DB")
})