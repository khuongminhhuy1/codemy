import React, { useEffect, useState } from "react";
import QuizComponent from "./QuizComponent";
import axios from "axios";
import { useParams } from "react-router-dom";

const QuizPage = () => {
  const [questions, setQuestions] = useState([]);
  const [totalQuiz, setTotalQuiz] = useState(0);
  const courseId = useParams();

  useEffect(() => {
    const response = axios
      .get(`/quiz/course/${courseId.id}`)
      .then((res) => {
        if (res) {
          const data = res.data.map((item) => ({
            ...item,
            text: item.question,
            options: item.options,
          }));
          setQuestions(data);
          setTotalQuiz(data.length);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleQuizSubmit = (values) => {
    console.log("Submitted values:", values);
  };

  return (
    <div className="w-full flex flex-col justify-center items-center">
      {questions.length > 0 ? (
        <QuizComponent
          questions={questions}
          onSubmit={handleQuizSubmit}
          courseId={courseId.id}
          totalQuiz={totalQuiz}
        />
      ) : (
        "There's no quizzes for this course yet"
      )}
    </div>
  );
};

export default QuizPage;
