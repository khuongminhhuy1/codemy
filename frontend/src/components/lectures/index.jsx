import React, { useEffect, useState } from "react";
import VideoPlayer from "../layouts/VideoPlayer";
import axios from "axios";
import { SettingOutlined } from "@ant-design/icons";
import { Menu } from "antd";

export default function ShowLectures() {
  const [lesson, setLesson] = useState([]);
  const [data, setData] = useState([]);

  function getItem(label, key, icon, children, type) {
    return {
      key,
      icon,
      children,
      label,
      type,
    };
  }
  let items = [
    getItem("Navigation Three", "sub4", <SettingOutlined />, [
      getItem("Option 9", "9"),
      getItem("Option 10", "10"),
      getItem("Option 11", "11"),
      getItem("Option 12", "12"),
    ]),
  ];

  useEffect(() => {
    axios
      .get("/lessons")
      .then((res) => {
        setLesson(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
    // get Chapter
    axios
      .get("/chapter")
      .then((res) => {
        if (res.data.data) {
          console.log(items, "items");
          items = dsa;
          console.log("dsa", dsa);
        }
      })
      .catch((error) => {
        console.log(error);
      });
    // get Chapter
  }, []);

  const onClick = (e) => {
    console.log("click ", e);
  };

  return (
    <div className="w-full flex flex-row h-[1000px]">
      <div className="w-4/5 bg-slate-700">
        <VideoPlayer />
      </div>
      <div className="w-1/5 bg-blue-500">
        {/* <table>
          {lesson.map((lesson, index) => (
            <tr key={lesson._id}>
              <td>{lesson.title}</td>
            </tr>
          ))}
        </table> */}

        {/* Menu */}
        <Menu
          onClick={onClick}
          style={{
            width: "full",
          }}
          defaultSelectedKeys={["1"]}
          defaultOpenKeys={["sub1"]}
          mode="inline"
          items={items}
        />
      </div>
    </div>
  );
}
