import React, { useEffect, useState } from "react";
import axios from "axios";
import { MdOutlineAddBox, MdOutlineDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import { BackButton } from "../layouts/BackButton";
import AdminHeader from "../admin/adminHeader";

export default function AllChapter() {
  const [chapters, setChapters] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const chapterResponse = await axios.get("/chapter");
        const chaptersData = chapterResponse.data.data;

        // Fetch additional details for each chapter
        const chaptersWithDetails = await Promise.all(
          chaptersData.map(async (chapter) => {
            // Fetch course details
            const courseResponse = await axios.get(
              `/courses/${chapter.courseId}`
            );
            const courseDetails = courseResponse.data;

            // Fetch lesson details for each lesson ID in the chapter
            const lessonsDetails = await Promise.all(
              chapter.lessons.map(async (lessonId) => {
                try {
                  const lessonResponse = await axios.get(
                    `/lessons/${lessonId}`
                  );
                  return lessonResponse.data;
                } catch (lessonError) {
                  console.error(
                    `Error fetching lesson ${lessonId}:`,
                    lessonError
                  );
                  return null; // Handle the case where the lesson cannot be fetched
                }
              })
            );

            return {
              ...chapter,
              courseDetails,
              lessonsDetails,
            };
          })
        );

        setChapters(chaptersWithDetails);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="w-full h-[1100px] bg-user-background flex flex-col items-center py-10">
      <AdminHeader />
      <h1 className="animate-fade-up text-7xl py-8 text-white uppercase font-black">
        Chapters
      </h1>
      <div className="w-11/12 flex flex-col justify-center items-center bg-white p-5 animate-fade-down animate-delay-300 animate-ease-in-out rounded-lg">
        <div className="py-5 flex flex-row w-full justify-between">
          <BackButton />
          <Link to={`/admin/chapter/create`}>
            <MdOutlineAddBox className="text-2xl text-blue-400" />
          </Link>
          <div className=""></div>
        </div>
        <table className="w-full">
          <thead>
            <tr>
              <th className="border border-gray-900 font-black">No</th>
              <th className="border border-gray-900 font-black">Course</th>
              <th className="border border-gray-900 font-black">Content</th>
              <th className="border border-gray-900 font-black">Lessons</th>
              <th className="border border-gray-900 font-black">Operations</th>
            </tr>
          </thead>
          <tbody>
            {chapters.map((chapter, index) => (
              <tr key={chapter._id} className="h-8">
                <td className="border border-slate-700 rounded-md text-center">
                  {index + 1}
                </td>
                <td className="border border-slate-700 rounded-md text-center">
                  {chapter.courseDetails
                    ? chapter.courseDetails.name
                    : "Unknown Course"}
                </td>
                <td className="border border-slate-700 rounded-md text-center">
                  {chapter.content}
                </td>
                <td className="border border-slate-700 rounded-md text-center">
                  {chapter.lessonsDetails &&
                    chapter.lessonsDetails.map((lesson, lessonIndex) => (
                      <div key={lessonIndex}>
                        {lesson ? <div>{lesson.title}</div> : "Unknown Lesson"}
                      </div>
                    ))}
                </td>
                <td className="border border-slate-700 rounded-md text-center">
                  <div className="flex justify-center gap x-4">
                    <Link to={`/admin/chapter/delete/${chapter._id}`}>
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
