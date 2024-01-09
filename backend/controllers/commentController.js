import { Comment } from "../models/commentModel.js";

export const CreateComment = async (req,res) => {
    try {
        const { userId, courseId, text } = req.body;
        const newComment = await Comment.create({ userId, courseId, text });
        res.status(201).json(newComment);
      } catch (error) {
        console.error('Error creating comment:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
}

export const GetComment = async (req,res) => {
   try {
    const { courseId } = req.query;
    const comments = await Comment.find({ courseId }).populate({
      path: 'userId'
    });
    res.json(comments);
  } catch (error) {
    console.error('Error fetching comments:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

export const DeleteComment = async (req,res) => {
  const {id} = req.params;

  try {
    await Comment.findByIdAndDelete(id);

    res.json({ message: 'Comment deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
} 