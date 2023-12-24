import mongoose from "mongoose";

const QuizSchema = mongoose.Schema(
  {
    courseId: {
      type: mongoose.Types.ObjectId,
      ref: "Course",
      require: true,
    },
    question: {
      type: String,
      required: true,
    },
    options: [
      {
        type: String,
      },
    ],
    correctAnswer: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Quiz = mongoose.model("quizzes", QuizSchema);
