import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function CreateLesson() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    title: "",
    description: "",
    videoUrl: "",
    uploadedBy: "",
    uploadedVideo: null, // New field for uploaded video
  });

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    setData((prevData) => ({ ...prevData, uploadedVideo: file }));
  };

  const CreateLesson = async (e) => {
    e.preventDefault();
    try {
      const { title, description, videoUrl, uploadedBy, uploadedVideo } = data;

      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("uploadedBy", uploadedBy);
      if (videoUrl) {
        formData.append("videoUrl", videoUrl);
      } else {
        // If videoUrl is not present, check if uploadedVideo is present
        if (uploadedVideo) {
          formData.append("uploadedVideo", uploadedVideo);
        } else {
          // Handle the case where neither videoUrl nor uploadedVideo is present
          throw new Error("Either videoUrl or uploadedVideo is required.");
        }
      }

      const responseData = await axios.post("/lessons/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setData({
        title: "",
        description: "",
        videoUrl: "",
        uploadedBy: "",
        uploadedVideo: null,
      });

      toast.success("Lesson Created !");
      navigate("/admin/lessons");
      console.log(responseData);
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
      <div className="animate-fade-down animate-delay-[500ms] p-4 flex flex-col justify-center items-center w-[420px] border bg-white rounded-lg">
        <form onSubmit={CreateLesson}>
          <div className="">
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
              className="border border-gray-400 rounded-lg text-black bg-white-800 h-10 w-[380px] pl-3 truncate"
            />
          </div>
          <div className="">
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
              className="border pt-2 border-gray-400 rounded-lg text-black bg-white-800 w-[380px] pl-3 truncate"
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
              className="border border-gray-400 rounded-lg text-black bg-white-800 h-10 w-[380px] pl-3 truncate"
            />
          </div>

          <div className="">
            <label
              htmlFor="videoUrl"
              className="block my-2 text-sm font-medium text-gray-900 dark:text-black"
            >
              Video Url:
            </label>
            <input
              type="text"
              id="videoUrl"
              name="videoUrl"
              value={data.videoUrl}
              onChange={(e) => setData({ ...data, videoUrl: e.target.value })}
              className="border h-10 w-[380px] border-gray-400 rounded-lg text-black pl-3 truncate"
            />
          </div>
          <div className="">
            <label
              htmlFor="uploadedVideo"
              className="block my-2 text-sm font-medium text-gray-900 dark:text-black"
            >
              Or Upload Video:
            </label>
            <input
              type="file"
              id="uploadedVideo"
              name="uploadedVideo"
              accept=".mp4, .avi, .mov, .mkv, video/*"
              onChange={handleVideoChange}
              className="border h-14 w-[380px] border-gray-400 rounded-lg text-black p-3 truncate"
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
