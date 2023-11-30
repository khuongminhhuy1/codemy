import { Course } from "../models/courseModel.js";
import { upload } from "../utils/multer.js";

export const CreateCourse = async (req, res) => {
  try {
    upload.single("image")(req, res, (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: "Error uploading file." });
      }

      // Check if an image file is uploaded
      if (!req.file) {
        return res.status(400).json({ message: "No file uploaded." });
      }
    });

    console.log(req.file);

    let { name, description, instructor } = req.body;
    console.log(req.body);

    if (!name || !description || !instructor) {
      return res.status(400).json({
        error: "Name, description, and instructor are required.",
      });
    }
    const exist = await Course.findOne({ name });
    if (exist) {
      return res.json({
        error: "Course has been created already",
      });
    }
    const newCourse = new Course({
      name,
      description,
      instructor,
      image: req.filename,
    });
    const course = await newCourse.save();
    return res.status(200).json(course);
  } catch (error) {
    console.log(error);
  }
};

export const GetCourse = async (res, req) => {
  try {
    const courses = await Course.find({});
    res.status(201).send({
      count: courses.length,
      data: courses,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
};
