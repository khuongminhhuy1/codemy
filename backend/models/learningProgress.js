import mongoose from "mongoose";

const learningProgressSchema = mongoose.Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
    validate: {
      validator: (value) => mongoose.Types.ObjectId.isValid(value),
      message: "Invalid userId",
    },
  },
  courseId: {
    type: mongoose.Types.ObjectId,
    ref: "Course",
    required: true,
    validate: {
      validator: (value) => mongoose.Types.ObjectId.isValid(value),
      message: "Invalid courseId",
    },
  },
  lessonId: {
    type: mongoose.Types.ObjectId,
    ref: "Lesson",
    required: true,
    validate: {
      validator: (value) => mongoose.Types.ObjectId.isValid(value),
      message: "Invalid lessonId",
    },
  },
});

export const Progress = mongoose.model("Progress", learningProgressSchema);
