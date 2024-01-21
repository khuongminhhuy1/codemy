// src/components/CreateQuiz.js
import React, { useState, useEffect } from "react";
import { Form, Input, Select, Button, message, Space } from "antd";
import axios from "axios";
import { FaPlus, FaTrash } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";

const { Option } = Select;

export default function EditQuiz() {
  const navigate = useNavigate();
  const { id } = useParams();
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const [form] = Form.useForm();
  const [options, setOptions] = useState([]);
  const [currentCourse, setCurrentCourse] = useState("");
  const [courses, setCourses] = useState([]);
  const [defaultCourse, setDefaultCourse] = useState("");
  const [quiz, setQuiz] = useState({
    correctAnswer: "",
    courseId: "",
    createdAt: "",
    options: [],
    question: "",
    _id: "",
  });

  //Get Data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [quizResponse, courseResponse] = await Promise.all([
          axios.get(`/quiz/${id}`),
          axios.get("/courses"),
        ]);

        if (quizResponse.data) {
          setOptions(quizResponse.data.options);
          setQuiz(quizResponse.data);
          form.setFieldsValue(quizResponse.data);

          if (courseResponse.data) {
            const response = courseResponse.data.data.map((items) => ({
              value: items._id,
              label: items.name,
            }));
            setCourses(response);

            const result = response.find(
              (x) => x.value === quizResponse.data.courseId._id
            );

            setDefaultCourse(result?.label);
            setCurrentCourse(result.value);
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleCourseChange = (CourseValue) => {
    setDefaultCourse(CourseValue);
    setCurrentCourse(CourseValue);
  };

  const filterOption = (input, option) => {
    return option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0;
  };

  const onFinish = async (values) => {
    try {
      console.log(form.getFieldValue());
      const selectedCourse = currentCourse;
      await axios.put(
        `/quiz/${id}`,
        { ...values, courseId: selectedCourse, options },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: storedUser.role,
          },
        }
      );
      message.success("Update Quiz successfully!");
      navigate("/admin/quiz");
      // setOptions([""]);
    } catch (error) {
      console.error("Error Updating quiz:", error);
      message.error("Failed to update quiz. Please try again.");
    }
  };

  const handleOptionChange = (index, value) => {
    const updatedOptions = [...options];
    updatedOptions[index] = value;
    setOptions(updatedOptions);
  };

  const addOption = () => {
    if (options.length < 4) {
      console.log(options);
      setOptions([...options, ""]);
    } else {
      message.warning("Maximum 4 options allowed.");
    }
  };

  const removeOption = (index) => {
    if (options.length > 1) {
      const updatedOptions = [...options];
      updatedOptions.splice(index, 1);
      console.log(updatedOptions);
      setOptions(updatedOptions);
    }
  };
  console.log(options);
  console.log(form.getFieldValue(), "form");
  return (
    <div className="w-full h-[1100px] bg-user-background flex flex-col items-center py-10">
      <h1 className="text-7xl pt-2 font-black text-white"> Edit Quiz</h1>
      <div className="w-8/12 pt-10 flex flex-col items-center mt-5 bg-white rounded-lg">
        <Form
          className="w-6/12 m-auto"
          form={form}
          onFinish={onFinish}
          layout="vertical"
        >
          <Form.Item name="course" label="Courses">
            <Space
              style={{
                width: "100%",
              }}
              direction="vertical"
            >
              <Select
                showSearch
                placeholder="Select a course"
                optionFilterProp="children"
                onChange={handleCourseChange}
                filterOption={filterOption}
                options={courses}
                value={defaultCourse || undefined}
                name="courses"
              />
            </Space>
          </Form.Item>
          <Form.Item
            label="Question"
            name="question"
            rules={[{ required: true, message: "Please enter the question" }]}
          >
            <Input />
          </Form.Item>

          {options &&
            options.map((option, index) => (
              <Form.Item
                key={index}
                label={`Option ${index + 1}`}
                name={`options[${index}]`}
                rules={[{ required: true, message: "Please enter the option" }]}
                initialValue={option}
              >
                <Input
                  onChange={(e) => handleOptionChange(index, e.target.value)}
                  addonAfter={
                    options.length > 1 ? (
                      <Button type="link" onClick={() => removeOption(index)}>
                        <FaTrash />
                      </Button>
                    ) : null
                  }
                />
              </Form.Item>
            ))}

          <Button
            type="dashed"
            onClick={addOption}
            className="mb-[16px] flex flex-row al w-[125px] items-center justify-between "
          >
            <FaPlus /> Add Option
          </Button>

          <Form.Item
            label="Correct Answer"
            name="correctAnswer"
            rules={[
              { required: true, message: "Please select the correct answer" },
            ]}
          >
            <Select placeholder="Select correct answer">
              {options.map((option, index) => (
                <Option key={index} value={option}>
                  {option}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" className="bg-blue-500">
              Update Quiz
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
