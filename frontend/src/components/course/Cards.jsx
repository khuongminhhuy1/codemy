import React from "react";
import SingleCard from "./SingleCard";

export default function Cards({ courses }) {
  return (
    <div className="w-[400px] h-[200px]">
      {courses.map((item) => (
        <SingleCard key={item._id} course={item} />
      ))}
    </div>
  );
}
