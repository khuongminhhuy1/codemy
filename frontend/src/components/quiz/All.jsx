// QuizList.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { MdOutlineAddBox, MdOutlineDelete } from "react-icons/md";
import { BackButton } from "../layouts/BackButton";
import AdminHeader from "../admin/adminHeader";

export default function AllQuizzes() {
  const [quiz, setQuiz] = useState([]);
  const [course, setCourse] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const quizResponse = await axios.get("/quiz");
        setQuiz(quizResponse.data.data);

        const courseResponse = await axios.get("/courses");
        setCourse(courseResponse.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const quizzesWithCourses = quiz.map((q) => {
    const matchingCourse = course.find((c) => c._id === q.courseId);
    return {
      ...q,
      course: matchingCourse ? matchingCourse.name : "Unknown Course",
    };
  });

  return (
    <div className="w-full h-[1100px] bg-user-background flex flex-col items-center py-10">
      <AdminHeader />
      <h1 className="animate-fade-up text-7xl py-8  text-white uppercase font-black">
        Quiz
      </h1>
      <div className="w-11/12  flex flex-col justify-center items-center bg-white p-5 animate-fade-down animate-delay-300 animate-ease-in-out rounded-lg">
        <div className="py-5 flex flex-row w-full justify-between">
          <BackButton />
          <Link to={`/admin/quiz/create`}>
            <MdOutlineAddBox className="text-2xl text-blue-400" />
          </Link>
          <div className=""></div>
        </div>
        <table className="w-full border-separate border-spacing-2">
          <thead>
            <tr>
              <th className="border border-gray-900 font-black">No</th>
              <th className="border border-gray-900 font-black">Course</th>
              <th className="border border-gray-900 font-black">Question</th>
              <th className="border border-gray-900 font-black">Options</th>
              <th className="border border-gray-900 font-black">
                Correct Answer
              </th>
              <th className="border border-slate-600 rounded-md">Operations</th>
            </tr>
          </thead>
          <tbody>
            {quizzesWithCourses.map((q, index) => (
              <tr key={q._id} className="h-8">
                <td className="border border-slate-700 rounded-md text-center">
                  {index + 1}
                </td>
                <td className="border border-slate-700 rounded-md text-center">
                  {q.course}
                </td>
                <td className="border border-slate-700 rounded-md text-center">
                  {q.question}
                </td>
                <td className="border border-slate-700 rounded-md text-center">
                  {q.options.map((option, optionIndex) => (
                    <div className="border" key={optionIndex}>
                      {option}
                    </div>
                  ))}
                </td>
                <td className="border border-slate-700 rounded-md text-center">
                  {q.correctAnswer}
                </td>
                <td className="border border-slate-700 rounded-md text-center">
                  <div className="flex justify-center gap x-4">
                    <Link to={`/admin/quiz/edit/${q._id}`}>
                      <AiOutlineEdit className="text-2xl text-blue-700" />
                    </Link>{" "}
                    <Link to={`/admin/quiz/delete/${q._id}`}>
                      <MdOutlineDelete className="text-2xl text-red-800" />
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
