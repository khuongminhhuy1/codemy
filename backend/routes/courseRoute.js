import express from "express";
const router = express.Router();
import cors from "cors";
import {
  CreateCourse,
  DeleteCourse,
  EditCourse,
  GetCourse,
  GetCourseByID,
} from "../controllers/courseController.js";
router.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);

router.get("/", GetCourse);
router.post("/create", CreateCourse);
router.get("/:id", GetCourseByID);
router.put("/:id", EditCourse);
router.delete("/:id", DeleteCourse);

export default router;
