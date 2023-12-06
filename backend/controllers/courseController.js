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
        image: req.file.filename,
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
export const GetCourseByID = async (req, res) => {
  try {
    const id = req.params.id;

    const course = await Course.findById(id);

    res.status(201).send(course);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
};

//Edit Course
export const EditCourse = async (req, res) => {
  try {
    const id = req.params.id;
    // Check if all required fields are present
    const { name, description, instructor } = req.body;
    if (!name || !description || !instructor) {
      return res.status(400).json({
        message: "All fields (name, description, instructor) are required.",
      });
    }

    // Check if an image file is uploaded
    if (req.file) {
      const uploadImage = upload("image");
      uploadImage(req, res, async (err) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ message: "Error uploading file." });
        }

        // Update the image filename in the req.body
        req.body.image = req.file.filename;

        // Update the course in the database
        const result = await Course.findByIdAndUpdate(id, req.body);

        if (!result) {
          return res.status(404).json({ message: "Course not found" });
        }

        return res.status(200).json({ message: "Course updated successfully" });
      });
    } else {
      // If no image is uploaded, update the course without changing the image
      const result = await Course.findByIdAndUpdate(id, req.body);

      if (!result) {
        return res.status(404).json({ message: "Course not found" });
      }

      return res.status(200).json({ message: "Course updated successfully" });
    }
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: error.message });
  }
};

//Delete Course
export const DeleteCourse = async (req, res) => {
  try {
    const id = req.params.id;

    const result = await Course.findByIdAndDelete(id);
    if (!result) {
      res.status(404).json({ message: "Course not found" });
    }

    return res.status(200).send({ message: "Course Deleted successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
};
