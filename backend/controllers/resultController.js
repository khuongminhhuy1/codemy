import { Result } from "../models/resultModel.js";
import { Quiz } from "../models/quizModel.js";
import mongoose from "mongoose";

export const GetResult = async (req, res) => {
  const { answers, userId, courseId , totalQuiz } = req.body;
  let correctAnswer = 0;
  for (let key in answers) {
    const quiz = await Quiz.findById(key)
    if (answers[key] === quiz.correctAnswer) {
            correctAnswer++;
          }
  }
  const newResult = new Result({
    userId,
    totalQuizzes: totalQuiz,
    correctedAnswer: correctAnswer,
    courseId
  });
  const result = await newResult.save();
  return res.status(200).json({ result });
};
//Return result by User Id
export const ReturnResult = async (req,res) => {
  try {
    const userId = req.params.userId
    const result = await Result.aggregate([
      {
        $match: {
          userId: new mongoose.Types.ObjectId(userId),
        },
      }
    ])
    console.log(userId)
    return res.status(200).json(result)
  } catch (error) {
    console.log(error)
  }
}
//Delete Result
export const DeleteResult = async (req,res) => {

}

