import { Progress } from "../models/learningProgress.js";

// Create Progress
export const CreateProgress = async (req, res) => {
  try {
    const userId = req.body.userId;
    const courseId = req.body.courseId;
    const lessonId = req.body.lessonId;

    const newProgress = new Progress({
      userId,
      courseId,
      lessonId,
    });

    const progress = await newProgress.save();
    return res.status(201).json(progress);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
