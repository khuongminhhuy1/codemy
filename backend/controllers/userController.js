import "dotenv/config";
import { User } from "../models/userModel.js";
import { hashPassword, comparePassword } from "../utils/hashPassword.js";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

export const RegisterUser = async (req, res) => {
  try {
    const { name, email, password, role , phoneNumber } = req.body;

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
        error: "Password is required and must be above 8 characters",
      });
    }

    const hashedPassword = await hashPassword(password);
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role,
      phoneNumber
    });
    const user = await newUser.save();

    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
  }
};

//Login
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
      const token = jwt.sign(
        {
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          avatar: user.avatar,
          phoneNumber: user.phoneNumber,
          bookmarks : user.bookmarks
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "1h",
        },
        (err, token) => {
          if (err) throw err;
          res.status(200).json(token);
        }
      );
    }
    if (!match) {
      res.json({
        error: "Invalid Username or Password",
      });
    }
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
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

//Get all User
export const GetUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(201).send({
      count: users.length,
      data: users,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send(error.message);
  }
};
//GetUserID
export const GetUserID = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findById(id);

    res.status(201).send(user);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
};
//Edit User
export const EditUser = async (req, res) => {
  try {
    const { name, email, password, phoneNumber } = req.body;
    console.log(req.file, "req.file");
    const user = await User.findOneAndUpdate(
      {
        _id: req.params.id,
      },
      {
        name: req.body.name,
        password: req.body.password,
        avatar: req.file.filename || "default-img.jpg",
        phoneNumber: req.body.phoneNumber,
        role: req.body.role
      },
      {
        new: true,
      }
    );
    if (!user) {
      return res.status(404).send("User not found");
    }
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
};
//Bookmark
export const addBookmark = async (req,res) => {
  const { userId, courseId } = req.params;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await user.addBookmark(courseId);

    res.status(200).json({ message: "Bookmark added successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export const removeBookmark = async (req,res) => {
  const { userId, courseId } = req.params;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await user.removeBookmark(courseId);

    res.status(200).json({ message: "Bookmark removed successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}
export const DeleteUser = async (req, res) => {
  try {
    const id = req.params.id;
  
    const result = await User.findByIdAndDelete(id);
    if (!result) {
      res.status(404).json({ message: "User not found" });
    }else {
      return res.status(200).send({ message: "User Deleted successfully" 
    });}
    
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
}