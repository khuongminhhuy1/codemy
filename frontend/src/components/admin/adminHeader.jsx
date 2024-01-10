import React from "react";
import { Link } from "react-router-dom";

export default function AdminHeader() {
  return (
    <div className="w-full flex flex-col justify-center items-center">
      <div className=" p-4 flex flex-col w-11/12 border bg-white rounded-lg">
        <div className="flex flex-row justify-between">
          <Link
            to={"/admin/users"}
            className="border p-2 text-white bg-purple-500 rounded-lg w-[180px] text-center"
          >
            {" "}
            Users{" "}
          </Link>
          <Link
            to={"/admin/courses"}
            className="border p-2 text-white bg-purple-500 rounded-lg w-[180px] text-center"
          >
            {" "}
            Courses{" "}
          </Link>
          <Link
            to={"/admin/chapter"}
            className="border p-2 text-white bg-purple-500 rounded-lg w-[180px] text-center"
          >
            {" "}
            Chapters{" "}
          </Link>
          <Link
            to={"/admin/lessons"}
            className="border p-2 text-white bg-purple-500 rounded-lg w-[180px] text-center"
          >
            {" "}
            Lessons{" "}
          </Link>
          <Link
            to={"/admin/quiz"}
            className="border p-2 text-white bg-purple-500 rounded-lg w-[180px] text-center"
          >
            {" "}
            Quiz{" "}
          </Link>
        </div>
      </div>
    </div>
  );
}
