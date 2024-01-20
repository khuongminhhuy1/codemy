import React, { useEffect, useState } from "react";
import { Button, Form, Input, Select, Space } from "antd";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function CreateChapter() {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [data, setData] = useState({
    courseId: "",
    content: "",
    lessons: [],
  });
  const [lesson, setLesson] = useState({
    lessons: [],
  });
  const [course, setCourse] = useState({});

  const handleCourseChange = (CourseValue) => {
    console.log("course ", CourseValue);
    setData({ ...data, courseId: CourseValue });
  };
  const handleLessonChange = (LessonsValue) => {
    console.log("lesson", LessonsValue);
    setData({ ...data, lessons: LessonsValue });
  };
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
        setCourse({ ...course, courseId: response });
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
    const { content } = values;
    const { courseId, lessons } = data;
    const requestData = {
      ...values,
      courseId,
      lessons,
    };
    if (!content) {
      toast.error("Title needed");
      return false;
    }
    if (!courseId) {
      toast.error("A course must be required");
      return false;
    }

    if (lessons.length <= 0) {
      toast.error("Lesson must be choosen");
      return false;
    }

    const res = await axios.post("/chapter/create", requestData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: storedUser.role,
      },
    });
    toast.success("Chapter Created");
    navigate("/admin/chapter");
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
    <div className="w-full h-[1100px] bg-user-background flex flex-col items-center py-10">
      <h1 className="text-7xl pt-2 font-black text-white"> Create Chapter</h1>
      <div className="w-8/12 flex flex-col items-center mt-5 bg-white rounded-lg">
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
                options={course.courseId}
                name="courseId"
              />
            </Space>
          </Form.Item>
          <Form.Item name="content" label="Title">
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
          <Form.Item className="flex flex-row justify-center">
            <Button type="primary" className=" bg-blue-500 " htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
