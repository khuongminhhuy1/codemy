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

import { checkUserRole } from "../middleware/Auth.js";

router.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);

router.get("/", GetCourse);
router.post("/create", checkUserRole, CreateCourse);
router.get("/:id", GetCourseByID);
router.put(
  "/:id",
  checkUserRole,
  upload("image"),
  EditCourse
);
router.delete("/:id", checkUserRole, DeleteCourse);

export default router;
