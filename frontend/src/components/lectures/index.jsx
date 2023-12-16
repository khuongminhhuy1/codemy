import React, { useEffect, useState } from "react";
import VideoPlayer from "../layouts/VideoPlayer";
import axios from "axios";
import { SettingOutlined, PlayCircleOutlined } from "@ant-design/icons";
import { Menu } from "antd";

export default function ShowLectures() {
  const [currentLesson, setCurrentLesson] = useState([]);
  const [lessonId, setLessonId] = useState("");
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("/chapter")
      .then((res) => {
        if (res.data.data) {
          let totalLesson = 0;
          const data = res.data.data.map((chapter, chapterIndex) => {
            return {
              key: chapter._id,
              label: `${chapterIndex + 1}.${chapter.content}`,
              icon: <PlayCircleOutlined />,
              children: chapter.lessonInfo.map((lesson, index) => {
                totalLesson++;
                // if (index === 0) {
                //   getVideoById(lesson._id);
                // }
                return {
                  key: lesson._id,
                  label: `${totalLesson}. ${lesson.title}`,
                };
              }),
            };
          });
          setData(data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const onClick = (e) => {
    getVideoById(e.key);
  };
  const getVideoById = (lessonId) => {
    axios.get(`/lessons/${lessonId}`).then((res) => {
      if (res.data) {
        setCurrentLesson(res.data);
        console.log(currentLesson);
      }
    });
  };
  useEffect(() => {}, [lessonId]);
  return (
    <div className="w-full flex flex-row ">
      <div className="w-4/5 bg-gray-900 flex justify-center items-center p-5 ">
        {currentLesson?.videoUrl ? (
          <iframe
            width="100%"
            height="702"
            src={currentLesson.videoUrl}
            title={currentLesson.title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        ) : currentLesson.uploadedVideo ? (
          <video
            src={`http://localhost:8080/videos/${currentLesson.uploadedVideo}`}
            alt={currentLesson.title}
            controls
          />
        ) : (
          <p> No video</p>
        )}
      </div>
      <div className="w-1/5 bg-blue-500">
        {/* Menu */}
        <Menu
          onClick={onClick}
          style={{
            width: "full",
          }}
          defaultSelectedKeys={["65759bfc2d48c0da9b7fe852"]}
          defaultOpenKeys={["657d751f9eada2d1eb34c578"]}
          mode="inline"
          items={data}
        />
      </div>
    </div>
  );
}
