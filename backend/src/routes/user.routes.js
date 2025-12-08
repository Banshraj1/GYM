import multer from "multer";
import { Router } from "express";
import { register,login,updateDetails, logout, deleteUser } from "../controllers/user.controller.js";
import authenticateToken from "../middleware/authintication.middleware.js";
const UploadStream = multer();
const userRouter = Router();
userRouter.route("/register").post(UploadStream.none(), register);
userRouter.route("/login").post(UploadStream.none(), login);
userRouter.route("/updateDetails").post(authenticateToken,updateDetails)
userRouter.route("/logout").post(authenticateToken,logout)
userRouter.route("/delete").post(authenticateToken, deleteUser);
export default userRouter;
