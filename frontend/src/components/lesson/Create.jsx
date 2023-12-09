import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function CreateLesson() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    title: "",
    description: "",
    videoUrl: null,
    uploadedBy: "",
  });

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    setData((prevData) => ({ ...prevData, videoUrl: file }));
  };

  const CreateLesson = async (e) => {
    e.preventDefault();
    try {
      const { title, description, videoUrl, uploadedBy } = data;

      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("videoUrl", videoUrl);
      formData.append("uploadedBy", uploadedBy);

      const responseData = await axios.post("/lessons/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setData({
        title: "",
        description: "",
        videoUrl: null,
        uploadedBy: "",
      });

      toast.success("Lesson Created !");
      navigate("/");
    } catch (error) {
      console.error("Error during lesson creation:", error);
      toast.error("Failed to create lesson. Please try again.");
    }
  };
  return (
    <div className=" w-screen flex justify-center flex-col items-center bg-user-background bg-cover h-screen">
      <h1 className=" animate-fade-up text-4xl py-8 uppercase text-white font-black">
        Create Lesson
      </h1>
      <div className="animate-fade-down animate-delay-[500ms] p-4 flex flex-col justify-center items-center w-96 border bg-white rounded-lg">
        <form onSubmit={CreateLesson}>
          <label
            className="block my-2 text-sm font-medium text-gray-900 dark:text-black"
            htmlFor="name"
          >
            Lesson title :
          </label>
          <input
            type="text"
            name="title"
            id="title"
            onChange={(e) => setData({ ...data, title: e.target.value })}
            placeholder="Title"
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
              htmlFor="uploadedBy"
            >
              Uploaded By :
            </label>
            <input
              type="text"
              name="uploadedBy"
              id="uploadedBy"
              onChange={(e) => setData({ ...data, uploadedBy: e.target.value })}
              className="border border-gray-400 rounded-lg text-black  h-10 w-[350px] pl-3 truncate"
            />
          </label>
          <div className="border p-3 rounded-lg border-gray-400">
            <label
              htmlFor="videoUrl"
              className="block my-2 text-sm font-medium text-gray-900 dark:text-black"
            >
              Video Url:
            </label>
            <input
              type="file"
              id="videoUrl"
              name="videoUrl"
              accept=".mp4, .avi, .mov, .mkv, video/*"
              onChange={handleVideoChange}
              className=""
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
