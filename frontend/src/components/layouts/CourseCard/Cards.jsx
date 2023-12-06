import React from "react";
import SingleCard from "./SingleCard";
import { Link } from "react-router-dom";

export default function Cards({ courses }) {
  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4">
      {courses.map((item) => (
        <SingleCard key={item._id} course={item} />
      ))}
    </div>
  );
}
