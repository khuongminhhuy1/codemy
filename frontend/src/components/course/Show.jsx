import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import DeleteCourse from "./Delete";

export default function ShowCourse() {
  const [course, setCourse] = useState({});
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`/courses/${id}`)
      .then((res) => {
        setCourse(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]); // Add 'id' as a dependency to re-fetch data when the 'id' changes

  return (
    <div className="w-full flex flex-row  justify-center items-center bg-user-background py-5">
      <div className="w-11/12 h-[1000px] mt-[50px] flex flex-row justify-center bg-white rounded-lg">
        <div className="flex flex-col mt-10 w-6/12 animate-fade-down animate-ease-in-out">
          <h1 className="text-7xl font-black mt-10">{course.name}</h1>
          <div className="mt-[50px]">
            <p className="text-3xl"> {course.description}</p>
            <p className="mt-5 text-2xl">Instructor: {course.instructor}</p>
          </div>
        </div>
        <div className="flex w-2/6 justify-center mt-10 animate-ease-in-out animate-fade-down">
          <div className="flex flex-col h-[600px] items-center">
            {course.image && (
              <img
                src={`http://localhost:8080/images/${course.image}`}
                alt={course.name}
                className=" w-[650px] h-[300px] rounded-lg"
              />
            )}

            <Link
              to={`/courses/${id}/lectures`}
              className="h-[65px] w-[200px] mt-12 text-white rounded-full  bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 flex justify-center items-center text-transform: uppercase font-black hover:text-purple-500"
            >
              Learn now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
