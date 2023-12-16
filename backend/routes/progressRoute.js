import express from "express";
const router = express.Router();
import cors from "cors";
import { CreateProgress } from "../controllers/progressController.js";

router.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);

router.post("/create", CreateProgress);

export default router;
