import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button, Form, Input, Select, Space } from "antd";
import axios from "axios";

export default function CreateChapter() {
  const [form] = Form.useForm();
  const { id } = useParams();
  const [data, setData] = useState({
    content: "",
    lessons: [],
  });
  useEffect(() => {
    axios.get(`/lessons`).then((res) => {
      if (res.data) {
        const response = res.data.data.map((items) => ({
          value: items._id,
          label: items.title,
        }));
        setData({ ...data, lessons: response });
      }
    });
  }, []);

  const handleCreateChapter = (e) => {
    e.preventDefault();
    
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
      >
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
              options={data.lessons}
            />
          </Space>
        </Form.Item>
        <Form.Item>
          <Button type="primary" className=" bg-blue-500"onClick={handleCreateChapter}>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
