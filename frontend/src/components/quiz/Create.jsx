// src/components/CreateQuiz.js
import React, { useState, useEffect } from "react";
import { Form, Input, Select, Button, message, Space } from "antd";
import axios from "axios";
import { FaPlus, FaTrash } from "react-icons/fa";

const { Option } = Select;

const CreateQuiz = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const [form] = Form.useForm();
  const [options, setOptions] = useState(["", ""]);
  const [course, setCourse] = useState({});
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    axios.get(`/courses`).then((res) => {
      if (res.data) {
        const response = res.data.data.map((items) => ({
          value: items._id,
          label: items.name,
        }));
        setCourses(response);
      }
    });
  }, []);

  const handleCourseChange = (CourseValue) => {
    console.log("course ", CourseValue);
    setCourse({ ...course, courseId: CourseValue });
    console.log(course);
  };

  const filterOption = (input, option) => {
    return option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0;
  };
  const onSearch = (value) => {};
  const onFinish = async (values) => {
    try {
      console.log(values);
      const courseId = course.courseId;
      await axios.post(
        "/quiz/create",
        { ...values, courseId, options },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: storedUser.role,
          },
        }
      ); // Replace with your actual backend API endpoint
      message.success("Quiz created successfully!");
      form.resetFields();
      setOptions([""]); // Reset options after submitting the form
    } catch (error) {
      console.error("Error creating quiz:", error);
      message.error("Failed to create quiz. Please try again.");
    }
  };

  const handleOptionChange = (index, value) => {
    const updatedOptions = [...options];
    updatedOptions[index] = value;
    setOptions(updatedOptions);
  };

  const addOption = () => {
    if (options.length < 4) {
      setOptions([...options, ""]);
    } else {
      message.warning("Maximum 4 options allowed.");
    }
  };

  const removeOption = (index) => {
    if (options.length > 2) {
      const updatedOptions = [...options];
      updatedOptions.splice(index, 1);
      setOptions(updatedOptions);
    }
  };

  return (
    <div className="w-full h-[1100px] bg-user-background flex flex-col items-center py-10">
      <h1 className="text-7xl pt-2 font-black text-white"> Create Quiz</h1>
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
                placeholder="Select a person"
                optionFilterProp="children"
                onChange={handleCourseChange}
                onSearch={onSearch}
                filterOption={filterOption}
                options={courses}
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

          {options.map((option, index) => (
            <Form.Item
              key={index}
              label={`Option ${index + 1}`}
              name={`options[${index}]`}
              rules={[{ required: true, message: "Please enter the option" }]}
            >
              <Input
                value={option}
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

          <Form.Item className="w-full flex justify-center">
            <Button type="primary" htmlType="submit" className="bg-blue-500">
              Create Quiz
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default CreateQuiz;
