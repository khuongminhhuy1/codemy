import express from "express";
const router = express.Router();
import cors from "cors";
import {
  CreateLesson,
  DeleteLesson,
  EditLesson,
  GetLesson,
  GetLessonByID,
} from "../controllers/lessonController.js";
import { checkUserRole } from "../middleware/Auth.js";

router.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);

router.get("/", GetLesson);
router.post("/create", checkUserRole, CreateLesson);
router.get("/:id", GetLessonByID);
router.put("/:id", checkUserRole, EditLesson);
router.delete("/:id", checkUserRole, DeleteLesson);

export default router;
