import { Quiz } from "../models/quizModel.js";
import mongoose from "mongoose";
//Create Quiz
export const CreateQuiz = async (req, res) => {
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
      return res.status(200).json({ message: "Quiz Created" });
    } else {
      return res.status(401).json({ message: "Error Creating Quiz" });
    }
  } catch (error) {
    console.log(error);
  }
};
//Get Quizzes
export const AllQuiz = async (req, res) => {
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
export const GetQuizByCourseId = async (req, res) => {
  try {
    const courseId = req.params.courseId;
    const quiz = await Quiz.find({ courseId });

    if (quiz && quiz.length > 0) {
      return res.status(200).json(quiz);
    } else {
      return res.status(404).json({ message: "No quizzes found for the specified course" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

//Delete Quiz
export const DeleteQuiz = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await Quiz.findByIdAndDelete(id);
    if (!result) {
      res.status(404).json({ message: "Quiz not found" });
    }
    return res.status(200).send({ message: "Quiz Deleted successfully" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
//Edit Quiz
export const EditQuiz = async (req, res) => {
  try {
    const {courseId, question, options, correctAnswer } = req.body;
    const quiz = await Quiz.findByIdAndUpdate(
      {
        _id: req.params.id,
      },
      {
        courseId,
        question,
        options,
        correctAnswer,
      },
      {
        new: true,
      }
    );
    if (!quiz) {
      return res.status(404).send("Quiz not found");
    }else {
      return res.status(200).send(quiz);
    } 
  } catch (error) {
    console.log(error);
  }
};

//Get Quiz by ID 
export const GetQuizByID = async (req,res) => {
  try {
    const id = req.params.id;
    const courseId = req.params.courseId;
    const quiz = await Quiz.findOne({_id : id}).populate('courseId')
    if(quiz){
      return res.status(200).json(quiz)
    }else{
      return res.status(404).json({ message: "Quiz Not Found" });
    }

  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
}
