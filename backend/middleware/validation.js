import { Lesson } from "../models/lessonModel.js";

const checkExistImage = (customMess) => (req, res, next) => {
  if (!req.file) {
    return res.status(400).json({ error: customMess });
  }
  next();
};

const checkExistVideo = (customMess) => (req, res, next) => {
  if (!req.file) {
    Lesson.uploadedVideo = null;
  }
  next();
};

const checkExistCourseImage = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file selected' });
    }
    const existingCourse = await CourseModel.findOne({ image: req.file.filename });

    if (existingCourse) {
      req.existingCourse = existingCourse;
    }

    next();
  } catch (error) {
    console.error('Error checking for existing image:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

export { checkExistImage, checkExistVideo, checkExistCourseImage };

