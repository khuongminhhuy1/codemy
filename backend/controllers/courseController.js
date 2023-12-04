import { Course } from "../models/courseModel.js";
import { upload } from "../utils/multer.js";

export const CreateCourse = async (req, res, next) => {
  try {
    const uploadImage = upload("image");
    uploadImage(req, res, async (err) => {
      // Check if an image file is uploaded
      if (!req.file) {
        return res.status(400).json({ message: "No file uploaded." });
      }

      if (err) {
        console.error(err);
        return res.status(500).json({ message: "Error uploading file." });
      }
      let { name, description, instructor } = req.body;

      const newCourse = new Course({
        name,
        description,
        instructor,
        image: req.file.path,
      });
      // Save the course
      const course = await newCourse.save();
      return res.status(200).json(course);
    });
  } catch (error) {
    console.log(error);
  }
};

//Get All Courses
export const GetCourse = async (req, res) => {
  try {
    const courses = await Course.find({});
    res.status(201).send({
      count: courses.length,
      data: courses,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send(error.message);
  }
};

//Get courses by ID
