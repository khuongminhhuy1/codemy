import "dotenv/config";
import { User } from "../models/userModel.js";
import { hashPassword, comparePassword } from "../utils/hashPassword.js";
import jwt from "jsonwebtoken";

export const RegisterUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    //Validate
    if (!name) {
      return res.json({
        error: "Name is required",
      });
    }

    const exist = await User.findOne({ email });
    if (exist) {
      return res.json({
        error: "Email is taken already",
      });
    }

    if (!password || password.length < 8) {
      return res.json({
        error: "Password is required",
      });
    }

    const hashedPassword = await hashPassword(password);
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });
    const user = await newUser.save();

    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
  }
};

export const LoginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.json({
        error: "User not found",
      });
    }
    const match = await comparePassword(password, user.password);
    if (match) {
      jwt.sign(
        { user },
        "sdawudhpasuiodh123",
        { expiresIn: "1h" },
        (err, token) => {
          if (err) throw err;
          res.status(200).json({ token });
        }
      );
    }
    if (!match) {
      res.json({
        error: "Invalid Username or Password",
      });
    }
  } catch (error) {
    console.log(error);
  }
};
//Log out
export const LogoutUser = async (req, res) => {
  try {
    res.clearCookie("token");
    res.json({ message: "Logout successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//Get Profile by ID
export const GetProfile = (req, res) => {
  const profileUser = req.user;
  res.status(200).json(profileUser);
};
