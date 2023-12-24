import express from "express";
const router = express.Router();
import cors from "cors";
import {
  AllQuiz,
  CreateQuiz,
  DeleteQuiz,
  EditQuiz,
  GetQuizByCourseId,
} from "../controllers/quizController.js";
import { checkUserRole } from "../middleware/Auth.js";

router.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);
router.get("/", AllQuiz);
router.post("/create", checkUserRole, CreateQuiz);
router.get("/:courseId", GetQuizByCourseId);
router.put("/:id", checkUserRole, EditQuiz);
router.delete("/:id", checkUserRole, DeleteQuiz);

export default router;
