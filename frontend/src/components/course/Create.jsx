import React from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export default function CreateCourse() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    name: "",
    description: "",
    instructor: "",
    image: null,
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setData((prevData) => ({ ...prevData, image: file }));
  };

  const CreateCourse = async (e) => {
    e.preventDefault();
    try {
      let { name, description, instructor, image } = data;
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("instructor", instructor);
      formData.append("image", image);

      const responseData = await axios.post("/courses/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // Handle success
      setData({
        name: "",
        description: "",
        instructor: "",
        image: null,
      });

      toast.success("Course Created !");
      navigate("/"); // Redirect to the home page or wherever appropriate
    } catch (error) {
      console.error("Error during course creation:", error);
      toast.error("Failed to create course. Please try again.");
    }
  };
  return (
    <div className=" w-screen flex justify-center flex-col items-center bg-user-background bg-cover h-screen">
      <h1 className=" animate-fade-up text-4xl py-8 uppercase text-white font-black">
        Create Course
      </h1>
      <div className="animate-fade-down animate-delay-[500ms] p-4 flex flex-col justify-center items-center w-96 border bg-white rounded-lg">
        <form onSubmit={CreateCourse}>
          <label
            className="block my-2 text-sm font-medium text-gray-900 dark:text-black"
            htmlFor="name"
          >
            Course Name :
          </label>
          <input
            type="text"
            name="name"
            id="name"
            onChange={(e) => setData({ ...data, name: e.target.value })}
            placeholder="Course Name"
            className="border border-gray-400 rounded-lg text-black bg-white-800 h-10 w-[350px] pl-3 truncate"
          />
          <label
            className="block my-2 text-sm font-medium text-gray-900 dark:text-black"
            htmlFor="description"
          >
            <label
              htmlFor="description"
              className="block my-2 text-sm font-medium text-gray-900 dark:text-black"
            >
              Description :
            </label>
            <textarea
              name="description"
              id="description"
              onChange={(e) =>
                setData({ ...data, description: e.target.value })
              }
              placeholder="Description"
              cols="30"
              rows="10"
              className="border border-gray-400 rounded-lg text-black w-[350px] pl-3 truncate py-3"
            />
            <label
              className="block my-2 text-sm font-medium text-gray-900 dark:text-black"
              htmlFor="instructor"
            >
              Instructor :
            </label>
            <input
              type="text"
              name="instructor"
              id="instructor"
              onChange={(e) => setData({ ...data, instructor: e.target.value })}
              className="border border-gray-400 rounded-lg text-black  h-10 w-[350px] pl-3 truncate"
            />
          </label>
          <div className="border p-3 rounded-lg border-gray-400">
            <label
              htmlFor="image"
              className="block my-2 text-sm font-medium text-gray-900 dark:text-black"
            >
              Course Image:
            </label>
            <input
              type="file"
              id="image"
              name="image"
              accept="image/*"
              onChange={handleImageChange}
            />
          </div>
          <button
            type="submit"
            className=" border-2 border-black-500 rounded-lg text-white bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 p-3 mt-8 mb-3 flex w-full justify-center items-center"
          >
            Create
          </button>
        </form>
      </div>
    </div>
  );
}
