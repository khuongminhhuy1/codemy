import express from "express";
const router = express.Router();
import cors from "cors";
import { CreateCourse, GetCourse } from "../controllers/courseController.js";
router.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);

router.get("/", GetCourse);
router.post("/create", CreateCourse);

export default router;
