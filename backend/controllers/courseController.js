import { Course } from "../models/courseModel.js";
import { upload } from "../utils/multer.js";
import { User } from "../models/userModel.js";

export const CreateCourse = async (req, res, next) => {
  try {
    const uploadImage = upload("image");
    uploadImage(req, res, async (err) => {
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
    const {name , description , instructor} = req.body
 
    let updateFields = {
      name,
      description,
      instructor,
    }
    if(req?.file){
      updateFields = {
        ...updateFields,
        image: req.file.filename,
      }
    }else {
      updateFields = {
        ...updateFields,
      }
    }
    console.log("Update fields:", updateFields);
    const course = await Course.findByIdAndUpdate(req.params.id , updateFields ,{
      new : true
    })
    if(!course){
      return res.status(404).json("Course not found")
    }
    res.status(200).json({ message: "Course updated successfully",course});
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal Server Error" });
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
    await User.updateMany({}, { $pull: { bookmarks: result._id } });

    return res.status(200).send({ message: "Course Deleted successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
};
//Search
export const Search = async (req, res) => {
  const searchTerm = req.query.q;
  try {
    const searchResults = await Course.find({
      $text: { $search: searchTerm },
    });

    res.status(200).json(searchResults);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
