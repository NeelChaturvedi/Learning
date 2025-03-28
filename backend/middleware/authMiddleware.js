import jwt from "jsonwebtoken"

const authMiddleware = (req, res, next) => {
    const token = req.header("x-auth-token")
    if(!token){
        return res.send(401).send({message: "Login karna seekh le bhadwe"})
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
        req.user = decoded
        next();
    } catch (error) {
        return res.status(400).send({message: "Invalid Token"})
    }
}

export default authMiddleware