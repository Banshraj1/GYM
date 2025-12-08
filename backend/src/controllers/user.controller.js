import { User } from "../models/user.models.js";
import bcrypt from "bcrypt";
import AsyncHandler from "../../utils/AsyncHandler.js";
import ApiError from "../../utils/ApiError.js";
import ApiResponse from "../../utils/ApiResponse.js";
import uploadImage from "../../utils/cloudinary.js";
const accessAndRefreshTokenGenerator = async (userId) => {
  try {
    const user = await User.findById(userId);
    const refreshToken = await user.generateRefreshToken();
    const accessToken = await user.generateAccessToken();
    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      599,
      "some error occured during access and refresh token generation"
    );
  }
};
const register = AsyncHandler(async (req, res) => {
  const {
    fullName,
    email,
    phone_number,
    height,
    weight,
    age,
    username,
    password,
    avatar,
    // address,
  } = req.body;

  if (!(fullName && email && phone_number && age && username && password)) {
    throw new ApiError(400, "All fields are required");
  }
  if (password.length < 6) {
    throw new ApiError(400, "Password must be at least 6 characters long");
  }
  const existingUser = await User.findOne({ username });
  if (existingUser) {
    throw new ApiError(409, "User with given username already exists");
  }
  const avatarRes = avatar ? await uploadImage(avatar) : null;
  const createdUser = await User.create({
    fullName,
    email,
    phone_number,
    height,
    weight,
    age,
    username,
    password,
    avatar: avatarRes?.secure_url || " ",
    // address: address || "",
  });
  const user = await User.findById(createdUser._id).select("-password");
  return res
    .status(201)
    .json(new ApiResponse(201, "User registered successfully", user));
});

const login = AsyncHandler(async (req, res, next) => {
  const { username, password } = req.body;
  if (!(username && password)) {
    throw new ApiError(400, "All fields are required");
  }
  const user = await User.findOne({ username });
  // console.log(user);

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  const isMatch = await user.isPasswordCorrect(password);
  if (!isMatch) {
    throw new ApiError(401, "Invalid credentials");
  }
  const data = await accessAndRefreshTokenGenerator(user._id);
  const accessToken = data.accessToken;
  const refreshToken = data.refreshToken;

  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );
  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        {
          user: loggedInUser,
          accessToken: accessToken,
          refreshToken: refreshToken,
        },
        "User loggedin successfully"
      )
    );
});

const logout = AsyncHandler(async (req, res, next) => {
  const user = req.user;
  const name = user.username;
  user.refreshToken = "";
  user.save({ validateBeforeSave: false });
  const options = {
    secure: true,
    httpOnly: true,
  };
  return res
    .cookie("accessToken", "", options)
    .cookie("refreshToken", "", options)
    .status(200)
    .json(`${name} log out successfull`);
});

const updateDetails = AsyncHandler(async (req, res, next) => {
  const {
    fullName,
    email,
    phone_number,
    height,
    weight,
    age,
    username,
    // avatar,
    // address,
  } = req.body;
  const user = req.user;
  if (fullName) {
    user.fullName = fullName;
  }
  if (email) {
    user.email = email;
  }
  if (phone_number) {
    user.phone_number = phone_number;
  }
  if (height) {
    user.height = height;
  }
  if (weight) {
    user.weight = weight;
  }
  if (age) {
    user.age = age;
  }
  if (username) {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      throw new ApiError(409, "User with given username already exists");
    }
    user.username = username;
  }
  await user.save({ validateBeforeSave: false });
  const updatedUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );
  const options = {
    httpOnly: true,
    secure: true,
  };
  return res
    .status(200)
    .cookie("accessToken", "", options)
    .cookie("refreshToken", "", options)
    .json({ updatedUser, message: "update success" });
});

const updatePassword = AsyncHandler(async (req, res, next) => {
  const { username, oldPassword, newPassword } = req.body;
  const user = req.user;

  if (!oldPassword || !newPassword) {
    throw new ApiError(400, "All fields are required");
  }
  if (newPassword.length < 6) {
    throw new ApiError(400, "Password must be at least 6 characters long");
  }
  const User = await User.findOne({ username });
  if (!User) {
    throw new ApiError(404, "User not found");
  }
  const isMatch = await user.isPasswordCorrect(oldPassword);
  if (!isMatch) {
    throw new ApiError(401, "Invalid credentials");
  }

  user.password = newPassword;
  await user.save({ validateBeforeSave: false });
  return res.status(200).json({ message: "Password updated successfully" });
});

const deleteUser = AsyncHandler(async (req, res, next) => {
  const user = req.user;
  const name = user.username;
  User.collection.deleteOne({ _id: user._id });
  return res.status(200).json(`${name} deleted success`);
});
export { register, login, logout, updateDetails, deleteUser };
