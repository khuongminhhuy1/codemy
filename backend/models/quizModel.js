import mongoose from "mongoose";

const QuizSchema = mongoose.Schema(
  {
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "courses",
      require: true,
    },
    question: {
      type: String,
      required: true,
    },
    options: [
      {
        type: String,
        unique : true,
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
