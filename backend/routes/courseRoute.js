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
import { upload } from "../utils/multer.js";
import { checkExistImage } from "../middleware/validation.js";
import { checkUserRole } from "../middleware/Auth.js";

router.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);

router.get("/", GetCourse);
router.post("/create", checkUserRole("admin"), CreateCourse);
router.get("/:id", GetCourseByID);
router.put(
  "/:id",
  upload("image"),
  checkExistImage("Image is required"),
  EditCourse
);
router.delete("/:id", checkUserRole("admin"), DeleteCourse);

export default router;
