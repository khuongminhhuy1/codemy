import mongoose from "mongoose";

const chapterSchema = mongoose.Schema(
  {
    courseId: {
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

export const Chapter = mongoose.model("chapters", chapterSchema);