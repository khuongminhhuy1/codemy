import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minLength: 8,
    },
    role: {
      type: String,
      default: "user",
      enum: ["user", "admin"],
    },
    avatar: {
      type: String,
      default: "default-img.jpg",
    },
    phoneNumber: {
      type: Number,
      maxLength: 10,
    },
  },
  {
    timestamps: true,
  }
);

export const User = mongoose.model("users", userSchema);
