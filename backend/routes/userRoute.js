import express from "express";
const router = express.Router();
import cors from "cors";
import {
  GetProfile,
  LoginUser,
  RegisterUser,
} from "../controllers/userController.js";

router.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);

router.post("/login", LoginUser);
router.post("/register", RegisterUser);
router.get("/profile", GetProfile);

export default router;
