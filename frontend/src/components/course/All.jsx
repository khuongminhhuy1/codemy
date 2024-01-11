import React, { useEffect, useState } from "react";
import axios from "axios";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineAddBox, MdOutlineDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import { BackButton } from "../layouts/BackButton";
import AdminHeader from "../admin/adminHeader";
export default function AllCourses() {
  const [course, setCourse] = useState([]);
  useEffect(() => {
    axios
      .get("/courses")
      .then((res) => {
        setCourse(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <div className="w-full h-[1100px] bg-user-background flex flex-col items-center py-10">
      <AdminHeader />
      <h1 className="animate-fade-up text-7xl py-8  text-white uppercase font-black">
        Courses
      </h1>
      <div className="w-11/12  flex flex-col justify-center items-center bg-white p-5 animate-fade-down animate-delay-300 animate-ease-in-out rounded-lg">
        <div className="w-full py-5 flex flex-row justify-between items-between">
          <BackButton />
          <Link to={`/admin/courses/create`}>
            <MdOutlineAddBox className="text-2xl text-blue-400" />
          </Link>
          <div className=""></div>
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
              <th className="border border-slate-600 rounded-md">Image</th>
              <th className="border border-slate-600 rounded-md">Operations</th>
            </tr>
          </thead>
          <tbody>
            {course.map((course, index) => (
              <tr key={course._id} className="h-8">
                <td className="border border-slate-700 rounded-md text-center">
                  {index + 1}
                </td>
                <td className="border border-slate-700 rounded-md text-center">
                  {course.name}
                </td>
                <td className="border border-slate-700 rounded-md text-center">
                  {course.description}
                </td>
                <td className="border border-slate-700 rounded-md text-center">
                  {course.instructor}
                </td>
                <td className="border border-slate-700 rounded-md text-center w-[400px]">
                  {course.image && (
                    <img
                      src={`http://localhost:8080/images/${course.image}`}
                      alt={course.name}
                    />
                  )}
                </td>
                <td className="border border-slate-700 rounded-md text-center">
                  <div className="flex justify-center gap x-4">
                    <Link to={`/courses/${course._id}`}>
                      <BsInfoCircle className="text-2xl text-green-800" />
                    </Link>
                    <Link to={`/admin/courses/edit/${course._id}`}>
                      <AiOutlineEdit className="text-2xl text-blue-700" />
                    </Link>
                    <Link to={`/admin/courses/delete/${course._id}`}>
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
