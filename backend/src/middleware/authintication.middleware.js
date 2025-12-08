import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { User } from "../models/user.models.js";
import AsyncHandler from "../../utils/AsyncHandler.js";
dotenv.config({ path: "./.env" });

const authenticateToken = AsyncHandler(async (req, res, next) => {
  var decoded = jwt.verify(
    req.cookies.accessToken, //token recieved from req
    process.env.Access_Token_Secret //secret
  );
  const user = await User.findById(decoded._id).select(
    "-password -refreshToken"
  );
  req.user = user;
  next();
});
export default authenticateToken;
