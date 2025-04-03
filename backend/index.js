import dotenv from "dotenv"
import userRoute from "./routes/userRoute.js";
import authRoute from "./routes/authRoute.js";
import orderRoute from "./routes/orderRoute.js";
import authMiddleware from "./middleware/authMiddleware.js";
import cors from "cors";
dotenv.config()
import express from "express"
import connectDB from './config/connectdb.js'

const app = express();
app.use(cors({origin: "*", method: "GET,POST,PUT,DELETE", allowedHeaders: "Content-Type, Authorization"}))
app.use(express.json({limit: "100mb"}))

const PORT = 6900

app.use("/api/auth", authRoute)
app.use("/api/users", userRoute)
app.use("/api/orders", orderRoute)
app.use("/api", authMiddleware)

app.listen(PORT, () => {
    connectDB();
    console.log("Connected to DB")
})