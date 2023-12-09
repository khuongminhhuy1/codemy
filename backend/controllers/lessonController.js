import { Lesson } from "../models/lessonModel.js";
import { videoUpload } from "../utils/multer.js";

export const CreateLesson = (req, res) => {
  try {
    const uploadVideo = videoUpload("videoUrl");
    uploadVideo(req, res, async (err) => {
      if (!req.file) {
        return res.status(400).json({ message: "No file uploaded." });
      }

      if (err) {
        console.error(err);
        return res.status(500).json({ message: "Error uploading file." });
      }

      const { title, description, uploadedBy } = req.body;
      // const existingCourse = await Course.findById(course);
      // if (!existingCourse) {
      //   return res.status(404).json({ message: "Course not found" });
      // }

      const newLesson = new Lesson({
        title,
        description,
        uploadedBy,
        // course,
        videoUrl: req.file.filename,
      });

      // Save Lessons
      const newLessonDocument = await newLesson.save();

      // Optionally, return the video URL in the response
      return res
        .status(200)
        .json({ lesson: newLessonDocument, videoUrl: req.file.filename });
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

//Get Lessons
export const GetLesson = async (req, res) => {
  // var page = req.query.page;
  // if(page){

  // } else {

  //}
  try {
    const lessons = await Lesson.find({});
    res.status(201).send({
      count: lessons.length,
      data: lessons,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send(error.message);
  }
};

//Get Lessons by ID
export const GetLessonByID = async (req, res) => {
  try {
    const id = req.params.id;

    const lesson = await Lesson.findById(id);

    res.status(201).send(lesson);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
};

//Delete Lesson
export const DeleteLesson = async (req, res) => {
  try {
    const id = req.params.id;

    const result = await Lesson.findByIdAndDelete(id);
    if (!result) {
      res.status(404).json({ message: "Lesson not found" });
    }
    return res.status(200).send({ message: "Lesson Deleted successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
};
