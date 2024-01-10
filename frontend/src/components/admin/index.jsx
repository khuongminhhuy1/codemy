import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminHeader from "./adminHeader";

const AdminPage = () => {
  const [user, setUser] = useState([]);
  const [course, setCourse] = useState([]);
  const [lesson, setLesson] = useState([]);
  const [quiz, setQuiz] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const users = await axios.get(`/users`);
        setUser(users.data.data);

        const courses = await axios.get(`/courses`);
        setCourse(courses.data.data);

        const lessons = await axios.get(`/lessons`);
        setLesson(lessons.data.data);

        const quizzes = await axios.get(`/quiz`);
        setQuiz(quizzes.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const generateSummary = (stateName, state) => {
    return (
      <div key={stateName} className="my-4">
        <h2 className="text-xl font-bold">{stateName}</h2>
        <p>{`Total: ${state.length}`}</p>
      </div>
    );
  };

  return (
    <div className="w-screen flex justify-center flex-col items-center bg-user-background bg-cover h-screen">
      <h1 className="animate-fade-up text-7xl py-8 text-white uppercase font-black">
        {" "}
        Admin
      </h1>
      <AdminHeader />
      <div className=" p-4 flex flex-col w-11/12 border bg-white rounded-lg">
        {generateSummary("Users", user)}
        {generateSummary("Courses", course)}
        {generateSummary("Lessons", lesson)}
        {generateSummary("Quizzes", quiz)}
      </div>
    </div>
  );
};

export default AdminPage;
