import "dotenv/config";
import { User } from "../models/userModel.js";
import { hashPassword, comparePassword } from "../utils/hashPassword.js";
import jwt from "jsonwebtoken";

export const RegisterUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
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
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const match = await comparePassword(password, user.password);

    if (match) {
      const token = jwt.sign(
        { _id: user._id, email: user.email, role: user.role },
        process.env.JWT_SECRET,
        {
          expiresIn: "1h",
        },
        (err, token) => {
          if (err) throw err;
          res.status(200).json({ token });
        }
      );
    } else {
      return res.status(401).json({ error: "Invalid credentials" });
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

// export const GetUserID = async (req, res) => {
//   try {
//     const id = req.params.id;
//     const user = await User.findById(id);

//     res.status(201).send(user);
//   } catch (error) {
//     console.log(error.message);
//     res.status(500).send({ message: error.message });
//   }
// };
