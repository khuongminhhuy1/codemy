import express from "express";
const router = express.Router();
import cors from "cors";
import {
  CreateChapter,
  GetChapterByID,
  GetChapters,
  GetChaptersByCourseId,
} from "../controllers/chapterController.js";

router.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);

router.get("/", GetChapters);
router.get("/:courseId", GetChaptersByCourseId);
router.post("/create", CreateChapter);


export default router;