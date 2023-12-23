import React, { useEffect, useState } from "react";
import { Button, Form, Input, Select, Space } from "antd";
import axios from "axios";
import toast from "react-hot-toast";

export default function CreateChapter() {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const [form] = Form.useForm();
  const [data, setData] = useState({
    courses : "",
    content: "",
    lessons: [],
  });
  const [lesson, setLesson] = useState({
    lessons: [],
  });
  const [course, setCourse] = useState({});

  const handleCourseChange = (CourseValue) => {
    console.log("course ",CourseValue)
    setData({ ...data, courses: CourseValue });
  };
  const handleLessonChange = (LessonsValue) => {
    console.log("lesson", LessonsValue)
    setData({...data, lessons : LessonsValue})
  }
  useEffect(() => {
    axios.get(`/lessons`).then((res) => {
      if (res.data) {
        const response = res.data.data.map((items) => ({
          value: items._id,
          label: items.title,
        }));
        setLesson({ ...lesson, lessons: response });
      }
    });
  }, []);
  useEffect(() => {
    axios.get(`/courses`).then((res) => {
      if (res.data) {
        const response = res.data.data.map((items) => ({
          value: items._id,
          label: items.name,
        }));
        setCourse({ ...course, courses: response });
      }
    });
  }, []);

  // Form
  const layout = {
    labelCol: {
      span: 5,
    },
    wrapperCol: {
      span: 16,
    },
  };
  const tailLayout = {
    wrapperCol: {
      offset: 8,
      span: 16,
    },
  };
  const onFinish = async (values) => {
    const { content } = values
    const {courses , lessons} = data
    const requestData = {
      ...values,
      courses,
      lessons,
    };
    console.log("Complete Form Data:", requestData);
    const res = await axios.post("/chapter/create",requestData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: storedUser.role,
      },
    });
    toast.success("Chapter Created");

  };
  const onReset = () => {
    form.resetFields();
  };

  // Select
  const filterOption = (input, option) => {
    console.log(input, "input", option, "option");
    return option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0;
  };

  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };
  
  return (
    <div className="w-full flex flex-col items-center mt-5">
      <h1> ABC</h1>
      <Form
        {...layout}
        form={form}
        name="control-hooks"
        onFinish={onFinish}
        style={{
          minWidth: 900,
          marginTop: 30,
        }}
      >
        <Form.Item name="course" label="Courses">
          <Space
            style={{
              width: "100%",
            }}
            direction="vertical"
          >
            <Select
              mode="one"
              allowClear
              style={{
                width: "100%",
              }}
              placeholder="Please select"
              onChange={handleCourseChange}
              filterOption={filterOption}
              options={course.courses}
              name = "courses"
            />
          </Space>
        </Form.Item>
        <Form.Item name="content" label="Content">
          <Input />
        </Form.Item>
        <Form.Item name="lessons" label="Lessons">
          <Space
            style={{
              width: "100%",
            }}
            direction="vertical"
          >
            <Select
              mode="multiple"
              allowClear
              style={{
                width: "100%",
              }}
              placeholder="Please select"
              onChange={handleLessonChange}
              filterOption={filterOption}
              options={lesson.lessons}
            />
          </Space>
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            className=" bg-blue-500"
            htmlType="submit"
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}