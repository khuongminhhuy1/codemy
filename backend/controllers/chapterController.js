import { Chapter } from "../models/chapterModel.js";

export const CreateChapter = async (req, res) => {
  try {
    const courses = req.body.courses;
    const lessons = req.body.lessons;
    const content = req.body.content;

    const newChapter = new Chapter({
      courses,
      content,
      lessons,
    });

    const chapter = await newChapter.save();
    if (chapter) {
      return res.status(200).json({ message: "Chapter Created" });
    }
    return res.status(401).json({ message: "Error Creating Chapter" });
  } catch (error) {
    console.log(error);
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
    const chapters = await Chapter.aggregate([
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
    res.status(200).send({
      count: chapters.length,
      data: chapters,
    });
  } catch (error) {
    console.log(error);
  }
};
