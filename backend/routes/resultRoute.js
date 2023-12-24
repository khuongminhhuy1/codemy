import express from "express";
const router = express.Router();
import cors from "cors";
import { GetResult } from "../controllers/resultController.js";
router.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);
router.post("/", GetResult);

export default router;
