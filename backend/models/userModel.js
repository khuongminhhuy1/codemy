import mongoose from "mongoose";
import { Comment } from "./commentModel.js"

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
    bookmarks: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'courses',
    }],
    
  },
  {
    timestamps: true,
  }
);

userSchema.pre('remove', async function (next) {
  console.log('Pre-remove hook triggered');
  await Comment.deleteMany({ userId: this._id });
  next();
});

userSchema.methods.addBookmark = async function (courseId) {
  if (!this.bookmarks.includes(courseId)) {
    this.bookmarks.push(courseId);
    await this.save();
  }
};

userSchema.methods.removeBookmark = async function (courseId) {
  if (this.bookmarks.includes(courseId)) {
    this.bookmarks = this.bookmarks.filter((id) => id.toString() !== courseId.toString());
    await this.save();
  }
};




export const User = mongoose.model("users", userSchema);
