import React, { useEffect, useState } from "react";
import { Button, Form, Input, Select, Space } from "antd";
import axios from "axios";

export default function CreateChapter() {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const [form] = Form.useForm();
  const [data, setData] = useState({});
  const [lesson, setLesson] = useState({
    content: "",
    lessons: [],
  });
  const [course, setCourse] = useState({
    course: [],
  });

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
  const handleCreateChapter = (e) => {
    let { courses, content, lessons } = data;
    const formData = new FormData();
    formData.append("courses", courses);
    formData.append("content", content);
    formData.append("lessons", lessons);
    e.preventDefault();
    axios.post("/chapter/create", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: storedUser.role,
      },
    });
  };

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
  const onFinish = (values) => {
    console.log(values);
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
        onSubmitCapture={handleCreateChapter}
      >
        <Form.Item name="course" label="Courses">
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
              onChange={handleChange}
              filterOption={filterOption}
              options={course.courses}
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
              onChange={handleChange}
              filterOption={filterOption}
              options={lesson.lessons}
            />
          </Space>
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            className=" bg-blue-500"
            onClick={handleCreateChapter}
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
