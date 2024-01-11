import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function CreateLesson() {
  const navigate = useNavigate();
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    uploadedBy: "",
    videoType: "url",
    videoValue: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      videoType: "file",
      videoValue: e.target.files[0],
    });
  };

  const validateVideo = () => {
    const { videoType, videoValue } = formData;
    if (videoType === "url" && !videoValue) {
      // Video URL is empty
      return false;
    } else if (videoType === "file" && !videoValue) {
      // Video file is empty
      return false;
    } else if (videoType !== "url" && videoType !== "file") {
      // Video type is invalid
      return false;
    } else {
      // Video is valid
      return true;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { title, description, uploadedBy, videoType, videoValue } =
        formData;

      const formDataToSend = new FormData();
      formDataToSend.append("title", title);
      formDataToSend.append("description", description);
      formDataToSend.append("uploadedBy", uploadedBy);

      if (videoType === "url") {
        formDataToSend.append("videoUrl", videoValue);
      } else if (videoType === "file") {
        formDataToSend.append("uploadedVideo", videoValue);
      }
      if (!validateVideo()) {
        toast.error("Please provide either a video URL or a video file");
        return;
      }

      await axios.post("/lessons/create", formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: storedUser?.role || "", // Use optional chaining to handle null/undefined
        },
      });

      console.log("Lesson created successfully!", formData);

      toast.success("Lesson Created");
      navigate("/admin/lessons");
    } catch (error) {
      console.error("Error creating lesson:", error);
      toast.error("All fields must be required");
    }
  };
  return (
    <div className=" w-screen flex justify-center flex-col items-center bg-user-background bg-cover h-screen">
      <h1 className=" animate-fade-up text-4xl py-8 uppercase text-white font-black">
        Create Lesson
      </h1>
      <div className="animate-fade-down animate-delay-[500ms] p-4 flex flex-col justify-center items-center w-[420px] border bg-white rounded-lg">
        <form className="w-full" onSubmit={handleSubmit}>
          <label className="block my-2 text-sm font-medium text-gray-900 dark:text-black">
            Title:
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="border border-gray-400 rounded-lg text-black bg-white-800 h-10 w-full pl-3 truncate"
            required
          />

          <label className="block my-2 text-sm font-medium text-gray-900 dark:text-black">
            Description:
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="border border-gray-400 rounded-lg text-black bg-white-800 h-[150px] w-full pl-3 truncate"
          />

          <label className="block my-2 text-sm font-medium text-gray-900 dark:text-black">
            Uploaded By:
          </label>
          <input
            type="text"
            name="uploadedBy"
            value={formData.uploadedBy}
            onChange={handleChange}
            className="w-full border border-gray-400 rounded-lg text-black bg-white-800 h-10  pl-3 truncate"
            required
          />

          <label className="block my-2 text-sm font-medium text-gray-900 dark:text-black">
            Video Type:
          </label>
          <select
            name="videoType"
            value={formData.videoType}
            onChange={handleChange}
            className="border border-gray-400 rounded-lg text-black bg-white-800 h-10 w-full pl-3 truncate"
          >
            <option value="url">URL</option>
            <option value="file">File</option>
          </select>

          {formData.videoType === "url" && (
            <div>
              <label className="block my-2 text-sm font-medium text-gray-900 dark:text-black">
                Video URL:
              </label>
              <input
                type="text"
                name="videoValue"
                value={formData.videoValue}
                onChange={handleChange}
                className="border border-gray-400 rounded-lg text-black bg-white-800 h-10 w-full pl-3 truncate"
                required
              />
            </div>
          )}

          {formData.videoType === "file" && (
            <div>
              <label className="block my-2 text-sm font-medium text-gray-900 dark:text-black">
                Upload Video:
              </label>
              <input
                accept=".mp4 , .avi"
                type="file"
                name="videoValue"
                onChange={handleFileChange}
                className="pt-3 truncate"
              />
            </div>
          )}

          <button
            type="submit"
            className=" border-2 border-black-500 rounded-lg text-white bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 p-3 mt-8 mb-3 flex w-full justify-center items-center"
          >
            Create Lesson
          </button>
        </form>
      </div>
    </div>
  );
}
