import mongoose from "mongoose";

const lessonSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    videoUrl: {
      type: String,
      required: true,
    },
    uploadedBy: {
      type: String,
      required: true,
    },
    
  },
  {
    timestamps: true,
  }
);

export const Lesson = mongoose.model("lessons", lessonSchema);
