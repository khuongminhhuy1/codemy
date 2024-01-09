import express from "express";
const router = express.Router();
import cors from "cors";
import {
  CreateChapter,
  DeleteChapter,
  GetChapters,
  GetChaptersByCourseId,
} from "../controllers/chapterController.js";
import {checkUserRole} from "../middleware/Auth.js"

router.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);

router.get("/", GetChapters);
router.get("/:courseId", GetChaptersByCourseId);
router.post("/create",checkUserRole, CreateChapter);
router.delete("/:id", checkUserRole, DeleteChapter)



export default router;
