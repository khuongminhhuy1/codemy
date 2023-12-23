import Result from "../models/resultModel.js";
import { Quiz } from "../models/quizModel.js";

export const GetResult = async (req, res) => {
  const { answerList, userId } = req.body;

  let correctAnswer = 0;

  await Promise.all(
    answerList.map(async (element) => {
      const quiz = await Quiz.findById(element.id);

      // Check if the user's answer matches the correct answer
      if (element.answer === quiz.correctAnswer) {
        correctAnswer++;
      }
    })
  );
  const newResult = new Result({
    userId,
    totalQuizzes: answerList.length,
    correctedAnswer: correctAnswer,
  });
  const result = await newResult.save();
  return res.status(200).json({ result });
};
