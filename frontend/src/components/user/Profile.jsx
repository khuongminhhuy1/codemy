import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const Profile = ({ user }) => {
  const [result, setResult] = useState([]);
  const [course, setCourse] = useState([]);

  const calculatePoints = (correctAnswer, totalQuestions) => {
    const points = (correctAnswer / totalQuestions) * 100;
    return points.toFixed(1);
  };

  const getResult = async (userId) => {
    try {
      const response = await axios.get(`/result/${userId}`);
      const results = response.data;
      setResult(results);
    } catch (error) {
      console.error("Error fetching results:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const courseResponse = await axios.get("/courses");
        setCourse(courseResponse.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const resultsWithCourses = result.map((r) => {
    const matchingCourse = course.find((c) => c._id === r.courseId);
    return {
      ...r,
      course: matchingCourse ? matchingCourse.name : "Unknown Course",
    };
  });
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const user = storedUser ? JSON.parse(storedUser) : null;
    const userId = user ? user.id : null;

    if (userId) {
      getResult(userId);
    }
  }, []);
  return (
    <div className="w-screen flex justify-center flex-col items-center bg-user-background bg-cover h-[1500px]">
      <div className="w-[1080px] h-[1200px] rounded-md bg-white p-4">
        <h1 className="text-2xl font-bold mb-4">Profile</h1>
        {user ? (
          <>
            <img
              src={`http://localhost:8080/images/${user.avatar}`}
              alt="avatar"
              className="h-[128px] w-[128px] rounded-full"
            />
            <p>
              <strong>Name: </strong> {user.name}
            </p>
            <p>
              <strong>Email: </strong> {user.email}
            </p>
            <p>
              <strong>Phone Number: </strong> {user.phoneNumber}
            </p>
            <p>
              <strong>Bookmarked Course :</strong>
            </p>
            <p>
              <strong>Test Result :</strong>{" "}
            </p>
            {result ? (
              <table>
                <thead>
                  <tr>
                    <th className="border border-gray-900 font-black">No</th>
                    <th className="border border-gray-900 font-black">
                      Course
                    </th>
                    <th className="border border-gray-900 font-black">
                      Correct Answer
                    </th>
                    <th className="border border-gray-900 font-black">
                      Total Questions
                    </th>
                    <th className="border border-gray-900 font-black">
                      Points
                    </th>
                    <th className="border border-gray-900 font-black">
                      Day exam taken
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {resultsWithCourses.map((result, index) => (
                    <tr key={result._id}>
                      <td className="border border-slate-700 rounded-md text-center">
                        {index + 1}
                      </td>
                      <td className="border border-slate-700 rounded-md text-center">
                        {result.course}
                      </td>
                      <td className="border border-slate-700 rounded-md text-center">
                        {result.correctedAnswer}
                      </td>
                      <td className="border border-slate-700 rounded-md text-center">
                        {result.totalQuizzes}
                      </td>
                      <td className="border border-slate-700 rounded-md text-center">
                        {calculatePoints(
                          result.correctedAnswer,
                          result.totalQuizzes
                        )}
                      </td>
                      <td className="border border-slate-700 rounded-md text-center">
                        {new Date(result.createdAt).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              "No Result"
            )}
          </>
        ) : (
          <p>No user information available</p>
        )}
        <div className="w-full border-2 border-black-500 rounded-lg text-white bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 p-3 mt-8 mb-3 flex justify-center items-center">
          <Link to={"/profile/edit"}>Update Information</Link>
        </div>
      </div>
    </div>
  );
};

export default Profile;
