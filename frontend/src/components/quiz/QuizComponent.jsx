import React, { useState } from "react";
import { Form, Radio, Button, Space, List, Modal } from "antd";
import axios from "axios";
import toast from "react-hot-toast";

const QuizComponent = ({ questions, onSubmit, courseId, totalQuiz }) => {
  const [form] = Form.useForm();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [modalOpen, setModalOpen] = useState(false);

  const handleNext = () => {
    setCurrentQuestion((prev) => Math.min(prev + 1, questions.length - 1));
  };

  const handlePrev = () => {
    setCurrentQuestion((prev) => Math.max(prev - 1, 0));
  };

  const handleQuestionSelect = (selectedQuestion) => {
    setCurrentQuestion(selectedQuestion);
  };

  const handleChange = (idQuestion) => (e) => {
    setAnswers({ ...answers, [idQuestion]: e.target.value });
  };

  const onFinish = async (values) => {
    // Call Api
    try {
      const res = await axios.post("/result", {
        userId: JSON.parse(localStorage.getItem("user"))?.id,
        answers,
        courseId,
        totalQuiz,
      });
      console.log(res, "res");
      toast.success("Submitted !");
    } catch (error) {
      console.log(error, "error");
    }
  };
  console.log(answers);

  return (
    <div className="w-full h-screen bg-user-background flex flex-col items-center">
      <h1 className="py-10 flex justify-center w-full text-3xl text-white">
        Quiz Time!
      </h1>
      <div className="w-5/12 p-10 bg-white rounded-lg">
        <div className="w-full h-[270px] flex flex-row justify-between items-center">
          <div className="w-4/12">
            <Form form={form} onFinish={onFinish} layout="vertical">
              <Form.Item
                label={`Q${currentQuestion + 1}: ${
                  questions[currentQuestion]?.text
                }`}
                name={`question_${currentQuestion}`}
              >
                <Radio.Group
                  className="flex flex-col "
                  onChange={handleChange(questions[currentQuestion]?._id)}
                >
                  {questions[currentQuestion]?.options.map(
                    (option, optionIndex) => (
                      <Radio className="p-3" key={optionIndex} value={option}>
                        {option}
                      </Radio>
                    )
                  )}
                </Radio.Group>
              </Form.Item>

              <Space>
                <Button
                  className="bg-blue-500 text-white"
                  onClick={handlePrev}
                  disabled={currentQuestion === 0}
                >
                  Previous
                </Button>
                {currentQuestion === questions.length - 1 && (
                  <Button
                    className="bg-blue-500 text-white"
                    onClick={() => setModalOpen(true)}
                    htmlType="submit"
                  >
                    Submit
                  </Button>
                )}
                <Button
                  className="bg-blue-500 text-white"
                  onClick={handleNext}
                  disabled={currentQuestion === questions.length - 1}
                >
                  Next
                </Button>
              </Space>
            </Form>
            <Modal
              title="Congratulations on finishing your test. You can view the result in your profile page"
              centered
              open={modalOpen}
              onOk={() => setModalOpen(false)}
              onCancel={() => setModalOpen(false)}
            ></Modal>
          </div>
          <div className="w-2/12 mr-20 ">
            <h3>Questions</h3>
            <List
              bordered
              dataSource={questions}
              renderItem={(item, index) => (
                <List.Item
                  onClick={() => handleQuestionSelect(index)}
                  style={{ cursor: "pointer" }}
                >
                  {`${index + 1}`}
                </List.Item>
              )}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizComponent;
