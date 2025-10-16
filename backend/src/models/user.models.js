import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { type } from "mongoose/lib/schema/operators/type.js";
const UserSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    age: {
      type: Number,
      required: true,
    },
    weight: {
      type: Number,
    },
    height: {
      type: Number,
    },
    phone_number: {
      type: Number,
      required: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
    },
    avatar: {
      type: String, //url from database
    },
    address: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Address",
    },
    password: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: [true, "please enter username"],
      lowercase: true,
      unique: true,
      trim: true,
      index: true,
    },
    routines: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Routine",
      },
    ],
    loginToken: {
      type: String,
    },
    refreshToken: {
      type: String,
    },
  },
  { timestamps: true }
);

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

UserSchema.method.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

UserSchema.meathod.generateAccessToken = async function () {
  return jwt.sign(
    {
      _id: this._id,
      username: this.username,
      fullName: this.fullName,
      email: this.email,
    },
    process.env.Access_Token_Secret,
    { expiresIn: process.env.Access_TOKEN_EXPIRY }
  );
};
UserSchema.meathod.generateRefreshToken = async function () {
  return jwt.sign(
    {
      _id: this._id,
    },
    process.env.Refresh_Token_Secret,
    { expiresIn: process.env.Refresh_TOKEN_EXPIRY }
  );
};
export const User = mongoose.model("User", UserSchema);
