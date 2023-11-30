import express from "express";
const router = express.Router();
import cors from "cors";
import { CreateCourse } from "../controllers/courseController.js";
router.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);

router.post("/create", CreateCourse);

export default router;
