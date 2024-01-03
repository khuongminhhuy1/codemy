import express from "express";
const router = express.Router();
import cors from "cors";
import {
  GetProfile,
  LoginUser,
  RegisterUser,
  LogoutUser,
  GetUserID,
  EditUser,
  addBookmark,
  removeBookmark,
} from "../controllers/userController.js";
import { verifyToken } from "../middleware/VerifyToken.js";
import { avatarUpload, upload } from "../utils/multer.js";
import { checkExistImage } from "../middleware/validation.js";
import { Search } from "../controllers/courseController.js";

router.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);

router.post("/login", LoginUser);
router.post("/register", RegisterUser);
router.get("/profile", verifyToken, GetProfile);
router.put(
  "/profile/edit/:id",
  upload("avatar"),
  checkExistImage("Image is required"),
  EditUser
);
router.get("/user/:id", GetUserID);
router.post("/logout", LogoutUser);
router.get("/search", Search);
router.post("/:userId/bookmarks/:courseId",addBookmark)
router.delete("/:userId/bookmarks/:courseId", removeBookmark)

export default router;
