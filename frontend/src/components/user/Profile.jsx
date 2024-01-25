import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const Profile = () => {
  const navigate = useNavigate();
  const [result, setResult] = useState([]);
  const [course, setCourse] = useState([]);
  const [courseImages, setCourseImages] = useState({});
  const { id: userId } = useParams();
  const [user, setUser] = useState();

  useEffect(() => {
    axios.get(`/user/${userId}`).then((res) => {
      setUser(res.data);
    });
  }, []);

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

  const fetchCourseDetails = async (courseId) => {
    try {
      const response = await axios.get(`/courses/${courseId}`);
      const courseDetail = response.data;
      setCourseImages((prevImages) => ({
        ...prevImages,
        [courseId]: courseDetail.image,
      }));
      console.log(courseImages);
    } catch (error) {
      console.error("Error fetching course details:", error);
    }
  };

  useEffect(() => {
    if (user && user.bookmarks && user.bookmarks.length > 0) {
      user.bookmarks.forEach((courseId) => {
        fetchCourseDetails(courseId);
      });
    }
  }, [user]);

  const updateBookmarksInLocalStorage = (newBookmarks) => {
    ``;
    const storedUser = localStorage.getItem("user");
    const currentUser = storedUser ? JSON.parse(storedUser) : null;

    if (currentUser) {
      const updatedUser = {
        ...currentUser,
        bookmarks: newBookmarks,
      };

      localStorage.setItem("user", JSON.stringify(updatedUser));
    }
  };

  const handleBookmark = (courseId) => {
    const isBookmarked = user && user.bookmarks.includes(courseId);

    if (isBookmarked) {
      navigate(`/courses/${courseId}`);
    } else {
      const newBookmarks = user.bookmarks.filter((id) => id !== courseId);
      updateBookmarksInLocalStorage(newBookmarks);
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

  useEffect(() => {
    if (userId) {
      getResult(userId);
    }
  }, []);

  const resultsWithCourses = result.map((r) => {
    const matchingCourse = course.find((c) => c._id === r.courseId);
    return {
      ...r,
      course: matchingCourse ? matchingCourse.name : "Unknown Course",
    };
  });

  return (
    <div className="w-screen flex justify-center flex-col items-center bg-user-background bg-cover h-[1500px]">
      <div className="w-[1080px] h-[1250px] rounded-md bg-white p-4">
        <h1 className="text-2xl font-bold mb-4 flex justify-center">Profile</h1>
        <div className="flex flex-col">
          {user ? (
            <>
              <div className="flex flex-row w-full justify-evenly items-center">
                <div className="flex flex-col justify-center items-center">
                  <h2 className="text-xl mb-5"> Profile Picture</h2>
                  <img
                    src={`http://localhost:8080/images/${user.avatar}`}
                    alt="avatar"
                    className="h-[128px] w-[128px] rounded-full"
                  />
                </div>
                <span className="h-[200px] w-[2px] bg-black ml-[80px]"></span>
                <div className="flex flex-col">
                  <p>
                    <strong>Name: </strong> {user.name}
                  </p>
                  <p>
                    <strong>Email: </strong> {user.email}
                  </p>
                  <p>
                    <strong>Phone Number: </strong> {user.phoneNumber}
                  </p>
                </div>
              </div>
              <span className="w-full h-[2px] bg-black my-5"></span>
              <div className="">
                <strong>Bookmarked Course :</strong>
                {user.bookmarks && user.bookmarks.length > 0 ? (
                  <div className="flex space-x-2">
                    {user.bookmarks.map((courseId) => (
                      <img
                        key={courseId}
                        src={`http://localhost:8080/images/${courseImages[courseId]}`}
                        alt={`Course ${courseId}`}
                        className="h-[150px] w-[250px] rounded-lg"
                        onClick={() => handleBookmark(courseId)}
                      />
                    ))}
                  </div>
                ) : (
                  "No Bookmarked Course"
                )}
              </div>
              <span className="w-full h-[2px] bg-black my-5"> </span>
              <p>
                <strong>Test Result :</strong>{" "}
              </p>
              {result.length > 0 ? (
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
                    {resultsWithCourses.map((result, index) => {
                      const key = `${result._id}-${result.courseId}`;

                      return (
                        <tr key={key}>
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
                      );
                    })}
                  </tbody>
                </table>
              ) : (
                "Student haven't taken any test"
              )}
            </>
          ) : (
            <p>No user information available</p>
          )}
          <div className="w-full border-2 border-black-500 rounded-lg text-white bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 p-3 mt-8 mb-3 flex justify-center items-center">
            <Link to={`/profile/edit/${userId}`}>Update Information</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
