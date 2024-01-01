import mongoose from "mongoose";
import { Course } from "./courseModel.js";
import { Lesson } from "./lessonModel.js";

const chapterSchema = mongoose.Schema(
  {
    courses: {
      type: mongoose.Types.ObjectId,
      ref: "courses",
      require: true,
    },
    content: { type: String, require: true },
    lessons: [{ type: mongoose.Types.ObjectId, ref: "lessons" , require: true }],
  },
  {
    timestamps: true,
  }
);

export const Chapter = mongoose.model("Chapters", chapterSchema);