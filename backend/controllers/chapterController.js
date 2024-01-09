import { Chapter } from "../models/chapterModel.js";
import mongoose from "mongoose";

export const CreateChapter = async (req, res) => {
  try {
    const courseId = req.body.courseId;
    const lessons = req.body.lessons;
    const content = req.body.content;

    const newChapter = new Chapter({
      courseId,
      content,
      lessons,
    });

    const chapter = await newChapter.save();

    if (chapter) {
      return res.status(201).json({ message: "Chapter Created", chapter });
    } else {
      return res.status(400).json({ message: "Error Creating Chapter" });
    }
  } catch (error) {
    console.error("Error creating chapter:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const GetChapterByID = async (req, res) => {
  try {
    const id = req.params.id;

    const chapter = await Chapter.findById(id);
    res.status(201).json(chapter);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
};

//Get All
export const GetChapters = async (req, res) => {
  try {
   
    const chapters = await Chapter.find({});
    res.status(200).send({
      count: chapters.length,
      data: chapters,
    });
  } catch (error) {
    console.log(error);
  }
};

//Get Chapters by Course ID
export const GetChaptersByCourseId = async (req, res) => {
  const courseId = req.params.courseId;
  try {
    const chapters = await Chapter.aggregate([
      {
        $match: {
          courseId: new mongoose.Types.ObjectId(courseId),
        },
      },
      {
        $lookup: {
          from: "lessons",
          let: { lessonIds: "$lessons" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $in: ["$_id", "$$lessonIds"],
                },
              },
            },
            {
              $sort: {
                createdAt: 1, // 1 for ascending order, -1 for descending order
              },
            },
          ],
          as: "lessonInfo",
        },
      },
      {
        $project: {
          content: 1,
          lessonInfo: 1,
        },
      },
    ]);
    console.log(chapters);
    return res.status(200).json(chapters);
  } catch (error) {
    console.log(error);
  }
};

//Delete Chapter
export const DeleteChapter = async (req, res) => {
  try {
    const id = req.params.id;

    const result = await Chapter.findByIdAndDelete(id);
    if (!result) {
      res.status(404).json({ message: "Chapter not found" });
    }
    return res.status(200).send({ message: "Chapter Deleted successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
};