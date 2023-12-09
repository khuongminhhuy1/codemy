import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function SingleCard({ course }) {
  const nav = useNavigate();
  const showRoute = () => {
    nav(`/courses/${course._id}`);
  };
  return (
    <div className="">
      <div key={course._id} className="cursor-pointer" onClick={showRoute}>
        <img
          className="rounded-lg md:w-[300px] lg:w-[400px] h-[225px] mr-16 ml-9 mb-5 z-0 "
          src={`http://localhost:8080/images/${course.image}`}
          alt={course.name}
        />
      </div>
    </div>
  );
}
