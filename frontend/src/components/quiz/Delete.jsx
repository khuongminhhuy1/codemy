import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

export default function DeleteQuiz() {
  const navigate = useNavigate();
  const quizRoute = (e) => {
    navigate(`/admin/quiz`);
  };
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const { id } = useParams();
  const handleDelete = () => {
    axios
      .delete(`/quiz/${id}`, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: storedUser.role,
        },
      })
      .then(() => {
        toast.success("Quiz Deleted Successfully");
        navigate("/admin/quiz");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="w-screen h-[800px] bg-user-background flex flex-col justify-center items-center">
      <h1 className="animate-fade-up text-4xl py-8  text-white uppercase font-black">
        {" "}
        Delete Quiz
      </h1>
      <div className="animate-fade-down animate-ease-in-out animate-delay-300 w-[650px] p-5 rounded-lg  flex flex-col bg-white justify-center items-center ">
        <div className="flex flex-col w-[600px] p-8 mx-auto border-2 items-center">
          Are you sure you wanna delete this quiz ?
        </div>
        <div className="flex flex-row pt-5">
          <button
            type="submit"
            onClick={handleDelete}
            className="px-6 py-4  border bg-red-500 text-white rounded-lg"
          >
            Yes
          </button>
          <button
            type="submit"
            onClick={quizRoute}
            className="px-6 py-4  border bg-blue-500 text-white rounded-lg"
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
}
