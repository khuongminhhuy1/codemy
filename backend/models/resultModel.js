import mongoose from "mongoose";

const resultSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    totalQuizzes: {
      type: Number,
    },
    correctedAnswer: {
      type: Number,
    },
    courseId : {
      type: mongoose.Schema.Types.ObjectId,
      ref:"courses",
      required : true,
    }
  },
  {
    timestamps: true,
  }
);

export const Result = mongoose.model("results", resultSchema);


