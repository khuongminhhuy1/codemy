import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
export default function DeleteLesson() {
  const navigate = useNavigate();
  const { id } = useParams();
  const lessonRoute = () => {
    navigate(`/admin/lessons`);
  };
  const handleDelete = () => {
    axios
      .delete(`/lessons/${id}`)
      .then(() => {
        toast.success("Lesson Deleted Successfully");
        navigate("/admin/lessons");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="w-screen h-[800px] bg-user-background flex flex-col justify-center items-center">
      <h1 className="animate-fade-up text-4xl py-8  text-white uppercase font-black">
        {" "}
        Delete Lesson
      </h1>
      <div className="animate-fade-down animate-ease-in-out animate-delay-300 w-[650px] p-5 rounded-lg  flex flex-col bg-white justify-center items-center ">
        <div className="flex flex-col w-[600px] p-8 mx-auto border-2 items-center">
          Are you sure you wanna delete this lesson ?
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
            onClick={lessonRoute}
            className="px-6 py-4  border bg-blue-500 text-white rounded-lg"
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
}
