import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

export default function EditCourse() {
  const [course, setCourse] = useState({
    name: "",
    description: "",
    instructor: "",
    image: null,
  });
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`/courses/${id}`)
      .then((res) => {
        if (res.data) {
          console.log(res.data);
          setCourse({
            name: res.data.name,
            description: res.data.description,
            instructor: res.data.instructor,
            image: res.data.image,
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleEditCourse = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", course.name);
      formData.append("description", course.description);
      formData.append("instructor", course.instructor);
      formData.append("image", course.image);

      const responseData = await axios
        .put(`/courses/${id}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: storedUser.role,
          },
          
        })
        .then(() => {
          toast.success("Course Updated Successfully !");
          navigate("/admin/courses");
        })
        .catch((error) => {
          toast.error("Error while updating course");
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    setCourse({ ...course, image: file });
  };

  return (
    <div className=" w-screen flex justify-center flex-col items-center bg-user-background bg-cover h-screen">
      <h1 className=" animate-fade-up text-4xl py-8 uppercase text-white font-black">
        Edit Course
      </h1>
      <div className="animate-fade-down animate-delay-[500ms] p-4 flex flex-col justify-center items-center w-96 border bg-white rounded-lg">
        <form onSubmit={handleEditCourse}>
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
            value={course.name}
            onChange={(e) => setCourse({ ...course, name: e.target.value })}
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
              value={course.description}
              onChange={(e) =>
                setCourse({ ...course, description: e.target.value })
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
              value={course.instructor}
              onChange={(e) =>
                setCourse({ ...course, instructor: e.target.value })
              }
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
            Change
          </button>
        </form>
      </div>
    </div>
  );
}
