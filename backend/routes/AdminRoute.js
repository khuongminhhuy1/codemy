import express from "express";
const router = express.Router();
import cors from "cors";
import { GetUsers } from "../controllers/userController.js";

router.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);

router.get("/users", GetUsers);

export default router;
