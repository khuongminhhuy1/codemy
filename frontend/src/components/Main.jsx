import React, { useEffect, useState } from "react";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cards from "./layouts/CourseCard/Cards";
export default function Main() {
  const [courses, setCourses] = useState([]);
  useEffect(() => {
    axios
      .get("/courses")
      .then((response) => {
        setCourses(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <div className="w-full bg-gradient-to-r from-violet-600 via-red-500 to-yellow-500 flex items-center flex-col text-transparent bg-clip-text">
      <div className="flex items-center flext-row">
        <img src={logo} alt="" className="h-[240px] w-[240px]" />
        <h1 className="text-7xl mb-4 font-black py-6">CODE : HELLO</h1>
      </div>
      <div className="w-full  flex items-center flex-row text-black ">
        <div className="py-4 lg:pt-16 px-6 w-full  h-[570px] ">
          <h1 className="text-5xl mb-4 font-black animate-fade-left animate-ease-out uppercase">
            Learn various website coding languages
          </h1>
          <p className="text-xl py-10 animate-fade-left animate-delay-[150ms] animate-ease-in-out">
            With a lot of courses in Available. You'll have plenty of choices to
            learn what you want the most !{" "}
          </p>
          <div className="w-full  flex flex-wrap -mx-4 animate-fade-down animate-delay-[300ms] animate-ease-in-out ">
            {courses.length > 0 ? <Cards courses={courses} /> : "none"}
          </div>
        </div>
      </div>
    </div>
  );
}
