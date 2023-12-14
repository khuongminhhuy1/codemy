import { Quiz } from "../models/quizModel.js";

//Create Quiz
const CreateQuiz = async (req, res) => {
  try {
    const courseId = req.params.id;
    const { question, option1, option2, option3, option4, answer } = req.body;

    const newQuiz = new Quiz({
      courseId,
      question,
      option1,
      option2,
      option3,
      option4,
      answer,
    });
    const quiz = await newQuiz.save();
    if (quiz) {
      return res.status(200).json({ message: "Quiz Created" }).send(quiz);
    }
    return res.status(401).json({ message: "Error Creating Quiz" });
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

export { CreateQuiz, AllQuiz };
