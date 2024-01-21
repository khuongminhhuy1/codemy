import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import {
  MdOutlineEdit,
  MdOutlineDelete,
  MdOutlineAddBox,
} from "react-icons/md";
import { BsInfoCircle } from "react-icons/bs";
import { BackButton } from "../layouts/BackButton";
import AdminHeader from "../admin/adminHeader";
export default function AllUsers() {
  const id = useParams();
  const [user, setUser] = useState([]);
  useEffect(() => {
    axios
      .get("/users")
      .then((res) => {
        setUser(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <div className="w-full h-[1100px] bg-user-background flex flex-col items-center py-10">
      <AdminHeader />
      <h1 className="animate-fade-up text-7xl py-8  text-white uppercase font-black">
        Users
      </h1>
      <div className=" bg-white w-11/12 rounded-md p-20">
        <div className="m-5 flex flex-row justify-between">
          <BackButton />
          <Link to={`/register`}>
            <MdOutlineAddBox className="text-2xl text-blue-400" />
          </Link>
          <div className=""></div>
        </div>
        <table className="w-full border-seperate border-spacing-2 ">
          <thead>
            <tr>
              <th className="border border-gray-900 font-black">No</th>
              <th className="border border-gray-900 font-black">Name</th>
              <th className="border border-gray-900 font-black">Email</th>
              <th className="border border-gray-900 font-black">Role</th>
              <th className="border border-gray-900 font-black">
                Phone Number
              </th>
              <th className="border border-gray-900 font-black">Operation</th>
            </tr>
          </thead>
          <tbody>
            {user.map((user, index) => (
              <tr key={user._id}>
                <td className="border border-slate-700 rounded-md text-center">
                  {index + 1}
                </td>
                <td className="border border-slate-700 rounded-md text-center">
                  {user.name}
                </td>
                <td className="border border-slate-700 rounded-md text-center">
                  {user.email}
                </td>
                <td className="border border-slate-700 rounded-md text-center">
                  {user.role}
                </td>
                <td className="border border-slate-700 rounded-md text-center">
                  {user.phoneNumber}
                </td>
                <td className="border border-slate-700 rounded-md text-center">
                  <div className="flex flex-row items-center justify-center">
                    <Link to={`/admin/user/${user._id}`}>
                      <BsInfoCircle className="text-2xl text-green-800" />
                    </Link>
                    <Link to={`/profile/edit/${user._id}`}>
                      <MdOutlineEdit className="text-2xl text-blue-800" />
                    </Link>
                    <Link to={`/admin/users/delete/${user._id}`}>
                      <MdOutlineDelete className="text-2xl text-red-800" />
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
