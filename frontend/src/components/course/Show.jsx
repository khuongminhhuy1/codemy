import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import CommentForm from "../comment/commentForm";
import CommentsList from "../comment/commentList";

export default function ShowCourse({ user }) {
  const navigate = useNavigate();
  const [comments, setComments] = useState([]);
  const [course, setCourse] = useState({});
  const { id } = useParams();
  const [isBookmarked, setIsBookmarked] = useState(false);
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const userId = storedUser ? storedUser.id : null;

  const handleLectures = () => {
    try {
      if (!userId) {
        navigate("/login");
        return;
      } else {
        navigate(`/courses/${id}/lectures`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleQuizzes = () => {
    try {
      if (!userId) {
        navigate("/login");
        return;
      } else {
        navigate(`/courses/${id}/quiz`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    axios
      .get(`/courses/${id}`)
      .then((res) => {
        setCourse(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  useEffect(() => {
    setIsBookmarked(user && user.bookmarks.includes(id));
  }, [user, id]);

  const handleBookmark = async () => {
    try {
      if (!userId) {
        navigate("/login");
        return;
      }
      const isCourseInBookmarks = storedUser.bookmarks.includes(id);

      if (isCourseInBookmarks) {
        await axios.delete(`/${userId}/bookmarks/${id}`);
      } else {
        await axios.post(`/${userId}/bookmarks/${id}`);
      }

      // Toggle the bookmark state
      setIsBookmarked(!isCourseInBookmarks);

      // Update local storage with the new bookmarks
      const updatedUser = {
        ...storedUser,
        bookmarks: isCourseInBookmarks
          ? storedUser.bookmarks.filter((bookmarkId) => bookmarkId !== id)
          : [...storedUser.bookmarks, id],
      };

      localStorage.setItem("user", JSON.stringify(updatedUser));
      toast.success(
        isCourseInBookmarks
          ? "Course removed from bookmarks"
          : "Course bookmarked"
      );
    } catch (error) {
      console.error("Error handling bookmark:", error);
    }
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const user = storedUser ? JSON.parse(storedUser) : null;
    const isBookmarkedInLocalStorage = user && user.bookmarks.includes(id);

    setIsBookmarked(isBookmarkedInLocalStorage);
  }, [id]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(`/comments?courseId=${id}`);
        setComments(response.data);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    fetchComments();
  }, [id]);

  const handleCommentAdded = async (newComment) => {
    try {
      const res = await axios.get(`/comments?courseId=${id}`);
      setComments(res.data);
    } catch (error) {
      console.error("Error getting comments:", error);
    }
  };

  return (
    <div className="w-full flex flex-row  justify-center items-center bg-user-background py-5">
      <div className="w-11/12 h-[1200px] mt-[50px] flex flex-row justify-center bg-white rounded-lg">
        <div className="flex flex-col mt-10 w-6/12 animate-fade-down animate-ease-in-out">
          <h1 className="text-7xl font-black mt-10">{course.name}</h1>
          <div className="mt-[50px]">
            <p className="text-3xl h-[300px]"> {course.description}</p>
            <p className="mt-5 text-2xl mb-[10px]">
              Instructor: {course.instructor}
            </p>
          </div>
          <div className="">
            <CommentForm
              courseId={id}
              userId={userId}
              onCommentAdded={handleCommentAdded}
            />
            <CommentsList comments={comments} />
          </div>
        </div>
        <div className="flex w-2/6 justify-center mt-10 ml-10 animate-ease-in-out animate-fade-down">
          <div className="flex flex-col h-[600px] items-center">
            {course.image && (
              <img
                src={`http://localhost:8080/images/${course.image}`}
                alt={course.name}
                className=" w-[650px] h-[300px] rounded-lg"
              />
            )}
            <div className="">
              <button
                onClick={handleLectures}
                className="h-[65px] w-[200px] mt-12 text-white rounded-full  bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 flex justify-center items-center text-transform: uppercase font-black hover:text-purple-500"
              >
                Learn now
              </button>

              <button
                onClick={handleQuizzes}
                className="h-[65px] w-[200px] mt-12 text-white rounded-full  bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 flex justify-center items-center text-transform: uppercase font-black hover:text-purple-500"
              >
                Take test
              </button>

              <button
                onClick={handleBookmark}
                className="h-[65px] w-[200px] mt-12 text-white rounded-full  bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 flex justify-center items-center text-transform: uppercase font-black hover:text-purple-500"
              >
                {isBookmarked ? "Remove Bookmark" : "Bookmark"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
