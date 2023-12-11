import { Lesson } from "../models/lessonModel.js";
import { videoUpload } from "../utils/multer.js";

export const CreateLesson = (req, res) => {
  try {
    const uploadVideo = videoUpload("uploadedVideo");
    uploadVideo(req, res, async (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: "Error uploading file." });
      }

      const { title, description, uploadedBy, videoUrl } = req.body;

      let uploadedVideo;
      if (!videoUrl && req.file) {
        uploadedVideo = req.file.filename;
      }

      const newLesson = new Lesson({
        title,
        description,
        uploadedBy,
        videoUrl,
        uploadedVideo,
      });

      const newLessonDocument = await newLesson.save();

      return res
        .status(200)
        .json({ lesson: newLessonDocument, videoUrl: uploadedVideo });
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

//Get Lessons
export const GetLesson = async (req, res) => {
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

//Edit Lesson
export const EditLesson = async (req, res) => {
  try {
    const { title, description, uploadedBy, videoUrl } = req.body;
    let updateFields = {
      title,
      description,
      uploadedBy,
    };

    // Check if req.file exists (uploaded video)
    if (req.file) {
      updateFields = {
        ...updateFields,
        uploadedVideo: req.file.filename,
        videoUrl: null, // Assuming you want to clear videoUrl when uploading a new video
      };
    } else if (videoUrl) {
      // If videoUrl is provided in the request, update it
      updateFields = {
        ...updateFields,
        videoUrl,
        uploadedVideo: null, // Assuming you want to clear uploadedVideo when updating videoUrl
      };
    }
    console.log("Update fields:", updateFields);
    const lesson = await Lesson.findByIdAndUpdate(req.params.id, updateFields, {
      new: true,
    });

    if (!lesson) {
      return res.status(404).send("Lesson not found");
    }

    res.status(200).json({ message: "Lesson updated successfully", lesson });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal Server Error" });
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
    // res.status(500).send({ message: error.message });
  }
};
