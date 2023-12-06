import express from "express";
const router = express.Router();
import cors from "cors";
import {
  GetProfile,
  LoginUser,
  RegisterUser,
  LogoutUser,
} from "../controllers/userController.js";
import { verifyToken } from "../middleware/VerifyToken.js";

router.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);

router.post("/login", LoginUser);
router.post("/register", RegisterUser);
router.get("/profile", verifyToken, GetProfile);
router.post("/logout", LogoutUser);

export default router;
