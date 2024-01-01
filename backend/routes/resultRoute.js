import express from "express";
const router = express.Router();
import cors from "cors";
import { GetResult, ReturnResult } from "../controllers/resultController.js";
router.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);
router.post("/", GetResult);
router.get("/", ReturnResult)

export default router;
