import mongoose from "mongoose"
import jwt from "jsonwebtoken"

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    mobile: {
      type: Number,
      required: true
    }
  },
  {
    timestamps: true,
  }
);

userSchema.methods.generateAuthToken = function(){
  const token = jwt.sign({_id: this._id},process.env.JWT_SECRET_KEY,{expiresIn: "7d"})
  return token
}


const User = mongoose.model("User", userSchema);

export  {User};
