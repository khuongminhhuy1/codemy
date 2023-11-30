import React from "react";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";
export default function Main() {
  return (
    <section className="relative flex flex-col items-center justify-center bg-white mt-[50px] px-6">
      <div className="w-full bg-gradient-to-r from-violet-600 via-red-500 to-yellow-500 flex items-center flex-col text-transparent bg-clip-text">
        <img src={logo} alt="" className="h-[240px] w-[240px]" />
        <h1 className="text-7xl mb-4 font-black py-6">CODE : HELLO</h1>
      </div>
      <div className="w-full bg-gradient-to-r from-violet-600 via-red-500 to-yellow-500 flex items-center flex-row text-white">
        <div className="py-4 lg:pt-16 px-6 w-full  h-[400px] ">
          <h1 className="text-5xl mb-4 font-black animate-fade-left animate-ease-out uppercase">
            Learn various website coding languages
          </h1>
          <p className="text-xl pt-10 animate-fade-down animate-delay-[150ms] animate-ease-in-out">
            With 8 courses in Available. You'll have plenty of choices to learn{" "}
            <br /> what you want most !{" "}
          </p>

          <div className="font-black mt-10">
            <Link to={"/courses"}> View more </Link>
          </div>
        </div>
        <div className="w-2/6"></div>
      </div>
    </section>
  );
}
