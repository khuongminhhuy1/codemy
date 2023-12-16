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
    },
    uploadedBy: {
      type: String,
      required: true,
    },
    uploadedVideo: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export const Lesson = mongoose.model("lessons", lessonSchema);
