import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function CommentForm({ courseId, onCommentAdded }) {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  const [commentText, setCommentText] = useState("");
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(!!storedUser);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!isUserLoggedIn) {
        navigate("/login");
        console.log("User is not logged in. Redirect to login");
        return;
      }
      const response = await axios.post("/comments", {
        userId: storedUser.id,
        courseId: courseId,
        text: commentText,
      });

      const newComment = response.data;
      onCommentAdded(newComment);
      setCommentText("");
    } catch (error) {
      console.error("Error submitting comment:", error);
    }
  };

  return (
    <div className="mt-5">
      <h2 className="mb-3">Leave your review about this course !</h2>
      <form onSubmit={handleCommentSubmit} className="flex flex-col">
        <textarea
          rows="4"
          cols="50"
          placeholder="Add a comment..."
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          className="border-2 border-gray-400 rounded-md pl-4 pt-2"
        />
        <button
          type="submit"
          className="h-[30px] w-[120px] mt-1 text-white rounded-md  bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 flex justify-center items-center hover:text-purple-500"
        >
          {" "}
          Comment
        </button>
      </form>
    </div>
  );
}
