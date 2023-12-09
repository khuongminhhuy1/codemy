import express from "express";
const router = express.Router();
import cors from "cors";
import {
  CreateLesson,
  DeleteLesson,
  GetLesson,
  GetLessonByID,
} from "../controllers/lessonController.js";

router.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);

router.get("/", GetLesson);
router.post("/create", CreateLesson);
router.get("/:id", GetLessonByID);
router.delete("/:id", DeleteLesson);

export default router;
