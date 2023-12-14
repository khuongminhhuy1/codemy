import express from "express";
const router = express.Router();
import cors from "cors";
import { AllQuiz, CreateQuiz } from "../controllers/quizController.js";

router.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);
router.get("/", AllQuiz);
router.post("/create", CreateQuiz);

export default router;
