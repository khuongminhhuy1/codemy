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
    <div className="header">
 
      <section className="flex flex-col items-center justify-center bg-white mt-[50px] px-6">
        <div className="w-full bg-gradient-to-r from-violet-600 via-red-500 to-yellow-500 flex items-center flex-col text-transparent bg-clip-text">
          <img src={logo} alt="" className="h-[240px] w-[240px]" />
          <h1 className="text-7xl mb-4 font-black py-6">CODE : HELLO</h1>
        </div>
        <div className="w-full  flex items-center flex-row text-black ">
          <div className="py-4 lg:pt-16 px-6 w-full  h-[570px] ">
            <h1 className="text-5xl mb-4 font-black animate-fade-left animate-ease-out uppercase">
              Learn various website coding languages
            </h1>
            <p className="text-xl py-10 animate-fade-left animate-delay-[150ms] animate-ease-in-out">
              With 8 courses in Available. You'll have plenty of choices to
              learn <br /> what you want most !{" "}
            </p>
            <div className="w-full flex flex-wrap -mx-4 animate-fade-down animate-delay-[300ms] animate-ease-in-out ">
              {courses.length > 0 ? <Cards courses={courses} /> : "none"}
            </div>
            <div className="font-black mt-10">
              <Link to={"/courses"}> View more </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
