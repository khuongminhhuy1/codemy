import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function Show() {
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
    <div className="">
      <h1>{course.name}</h1>
      <p>Description: {course.description}</p>
      <p>Instructor: {course.instructor}</p>
      {course.image && (
        <img src={`http://localhost:8080/${course.image}`} alt={course.name} />
      )}
    </div>
  );
}
