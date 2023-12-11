import express from "express";
const router = express.Router();
import cors from "cors";
import {
  CreateChapter,
  GetChapterByID,
} from "../controllers/chapterController.js";

router.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);

router.get("/:id", GetChapterByID);
router.post("/create", CreateChapter);

export default router;
