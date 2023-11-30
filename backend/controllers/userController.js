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
        { email: user.email, id: user._id, name: user.name },
        process.env.JWT_SECRET,
        {},
        (err, token) => {
          if (err) throw err;
          res.cookie("token", token).json(user);
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

//Get Profile
export const GetProfile = (req, res) => {
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, {}, (err, user) => {
      if (err) throw err;
      res.json(user);
    });
  } else {
    res.json(null);
  }
};
