import { Chapter } from "../models/chapterModel.js";


export const CreateChapter = async (req, res) => {
  try {
    const courseId = req.params.id;
    const lessons = req.body.lessons;
    const content = req.body.content;

    const newChapter = new Chapter({
      courseId,
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
