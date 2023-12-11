import mongoose from "mongoose";

const chapterSchema = mongoose.Schema(
  {
    courseId: {
      type: mongoose.Types.ObjectId,
    },
    content: { type: String, required: true },
    lessons: { type: Array },
  },
  {
    timestamps: true,
  }
);

export const Chapter = mongoose.model("Chapters", chapterSchema);
