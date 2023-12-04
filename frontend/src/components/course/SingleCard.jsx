import React from "react";

export default function SingleCard({ course }) {
  return (
    <div className="">
      <div key={course._id} className="w-[400px] h-[225px]">
        <img src={`http://localhost:8080/${course.image}`} alt={course.name} />
      </div>
    </div>
  );
}
