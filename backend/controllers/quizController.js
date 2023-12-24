import { Quiz } from "../models/quizModel.js";
import mongoose from "mongoose";
//Create Quiz
const CreateQuiz = async (req, res) => {
  try {
    const courseId = req.body.courseId;
    const { question, options, correctAnswer } = req.body;

    const newQuiz = new Quiz({
      courseId,
      question,
      options,
      correctAnswer,
    });
    const quiz = await newQuiz.save();
    if (quiz) {
      return res.status(200).json({ message: "Quiz Created" }).send(quiz);
    } else {
      return res.status(401).json({ message: "Error Creating Quiz" });
    }
  } catch (error) {
    console.log(error);
  }
};
//Get Quizzes
const AllQuiz = async (req, res) => {
  try {
    const quizzes = await Quiz.find({});
    return res.status(201).send({
      count: quizzes.length,
      data: quizzes,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send(error.message);
  }
};
// Get Quiz By CourseId
const GetQuizByCourseId = async (req, res) => {
  try {
    const courseId = req.params.courseId;
    const quizzes = await Quiz.find({ courseId });
    return res.status(200).json(quizzes);
  } catch (error) {
    console.log(error);
  }
};

export { CreateQuiz, AllQuiz, GetQuizByCourseId };
