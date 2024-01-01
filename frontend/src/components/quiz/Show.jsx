import React, { useEffect, useState } from "react";
import QuizComponent from "./QuizComponent";
import axios from "axios";
import { useParams } from "react-router-dom";

const QuizPage = () => {
  const [questions, setQuestions] = useState([]);
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
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleQuizSubmit = (values) => {
    // Handle the submitted values (selected options) here
    console.log("Submitted values:", values);
  };

  return (
    <div className="w-full flex flex-col justify-center items-center">
      <h1 className="pb-10">Quiz Time!</h1>
      <QuizComponent
        questions={questions}
        onSubmit={handleQuizSubmit}
        courseId={courseId.id}
      />
    </div>
  );
};

export default QuizPage;
