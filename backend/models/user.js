import mongoose from "mongoose"
import jwt from "jsonwebtoken"

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true
    },
    mobile: {
      type: Number,
    },
    pincode: {
      type: Number,
      required: true,
    },
    shippingAddress: {
      type: String,
      required: true,
    },
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
