import React, { useEffect, useState } from "react";
import axios from "axios";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineAddBox, MdOutlineDelete } from "react-icons/md";
import { Link } from "react-router-dom";

export default function AllLesson() {
  const [lesson, setLesson] = useState([]);
  useEffect(() => {
    axios
      .get("/lessons")
      .then((res) => {
        setLesson(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <div className="w-full bg-user-background flex flex-col items-center justify-center py-10">
      <h1 className="animate-fade-up text-7xl py-8  text-white uppercase font-black">
        Courses
      </h1>
      <div className="w-11/12 flex flex-col justify-center items-center bg-white p-5 animate-fade-down animate-delay-300 animate-ease-in-out rounded-lg">
        <div className="py-5 flex flex-row">
          <Link to={`/lessons/create`}>
            <MdOutlineAddBox className="text-2xl text-blue-400" />
          </Link>
        </div>
        <table className="w-full border-seperate border-spacing-2 ">
          <thead>
            <tr>
              <th className="border border-gray-900 font-black">No</th>
              <th className="border border-slate-600">Name</th>
              <th className="border border-slate-600 max-md:hidden">
                Description
              </th>
              <th className="border border-slate-600 rounded-md">Instructor</th>
              <th className="border border-slate-600 rounded-md">Video</th>
              {/* <th className="">Courses</th> */}
              <th className="border border-slate-600 rounded-md">Operations</th>
            </tr>
          </thead>
          <tbody>
            {lesson.map((lesson, index) => (
              <tr key={lesson._id} className="h-8">
                <td className="border border-slate-700 rounded-md text-center">
                  {index + 1}
                </td>
                <td className="border border-slate-700 rounded-md text-center">
                  {lesson.title}
                </td>
                <td className="border border-slate-700 rounded-md text-center">
                  {lesson.description}
                </td>
                <td className="border border-slate-700 rounded-md text-center">
                  {lesson.uploadedBy}
                </td>
                <td className="border border-slate-700 rounded-md text-center w-[400px]">
                  {lesson.videoUrl && (
                    <video
                      src={`http://localhost:8080/videos/${lesson.videoUrl}`}
                      alt={lesson.title}
                    />
                  )}
                </td>
                <td className="border border-slate-700 rounded-md text-center">
                  <div className="flex justify-center gap x-4">
                    <Link to={`/courses/${lesson._id}`}>
                      <BsInfoCircle className="text-2xl text-green-800" />
                    </Link>
                    <Link to={`/courses/delete/${lesson._id}`}>
                      <MdOutlineDelete className="text-2xl text-red-800" />
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
