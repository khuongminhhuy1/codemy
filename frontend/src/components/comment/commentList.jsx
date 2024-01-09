import React from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { IoCloseCircle } from "react-icons/io5";

export default function CommentsList({ comments }) {
  const navigate = useNavigate();
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const isAdmin = storedUser && storedUser.role === "admin";

  const handleDeleteComment = async (commentId) => {
    try {
      await axios.delete(`/comments/${commentId}`);
      toast.success("Comment deleted successfully");
      window.location.reload();
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  return (
    <div className="my-10">
      <h2>Comments</h2>
      <ul className="mt-5">
        {comments.map((comment) => (
          <li key={comment._id} className="flex flex-row">
            <div className="flex flex-col ">
              {
                <img
                  src={`http://localhost:8080/images/${comment.userId.avatar}`}
                  alt={`${comment.userId.avatar}`}
                  className="h-[50px] w-[50px] rounded-full mt-2"
                />
              }
              <div className="flex items-center justify-center">
                {comment.userId ? (
                  <p>{comment.userId.name}</p>
                ) : (
                  <p>Unknown User</p>
                )}
              </div>
            </div>
            <div className="w-11/12 pl-5">
              <div className="border rounded-md pl-3 h-[70px] border-gray-300">
                {comment.text}
              </div>
              <div className="text-xs flex flex-col items-end">
                {new Date(comment.createdAt).toLocaleString()}
                {isAdmin && (
                  <button
                    onClick={() => handleDeleteComment(comment._id)}
                    className="text-lg"
                  >
                    {" "}
                    <IoCloseCircle />{" "}
                  </button>
                )}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
