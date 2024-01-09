import express from "express";
const router = express.Router();
import cors from "cors";
import { CreateComment, DeleteComment, GetComment } from "../controllers/commentController.js";
router.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);

router.get('/', GetComment);
router.post('/', CreateComment);
router.delete('/:id', DeleteComment)

export default router;
