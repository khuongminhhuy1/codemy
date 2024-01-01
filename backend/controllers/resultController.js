import Result from "../models/resultModel.js";
import { Quiz } from "../models/quizModel.js";

export const GetResult = async (req, res) => {
  const { answers, userId, courseId } = req.body;
  let correctAnswer = 0;
  for (let key in answers) {
    const quiz = await Quiz.findById(key)
    if (answers[key] === quiz.correctAnswer) {
            correctAnswer++;
          }
  }
  // await Promise.all(

  //   answers.map(async (element) => {
  //     const quiz = await Quiz.findById(element.id);


  //     // Check if the user's answer matches the correct answer
  //     if (element.answer === quiz.correctAnswer) {
  //       correctAnswer++;
  //     }
  //   })
  // );
  const newResult = new Result({
    userId,
    totalQuizzes: Object.keys(answers).length,
    correctedAnswer: correctAnswer,
    courseId
  });
  const result = await newResult.save();
  return res.status(200).json({ result });
};
//Return result
export const ReturnResult = async (req,res) => {
  try {
    const { userId } = req.body
    const result = await Result.find({userId})
    return res.status(200).json(result)
  } catch (error) {
    console.log(error)
  }
}

