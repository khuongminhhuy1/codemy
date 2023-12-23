import express from "express";
const router = express.Router();
import cors from "cors";
import { AllQuiz, CreateQuiz, GetQuizByCourseId } from "../controllers/quizController.js";

router.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);
router.get("/", AllQuiz);
router.post("/create", CreateQuiz);
router.get("/:courseId", GetQuizByCourseId)


export default router;
