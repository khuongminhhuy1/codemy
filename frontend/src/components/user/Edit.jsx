import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import userInfo from "../../hooks/userInfo";
export default function EditUser() {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const { user, setUser } = userInfo();
  const { id } = storedUser;
  const navigate = useNavigate();
  useEffect(() => {
    setUser(storedUser);
  }, []);

  const handleEditUser = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", user.name);
      formData.append("email", user.email);
      formData.append("phoneNumber", user.phoneNumber);
      formData.append("avatar", user.avatar);

      const responseData = await axios
        .put(`/profile/edit/${id}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: storedUser.role,
          },
        })
        .then((res) => {
          if (res.data) {
            localStorage.setItem(
              "user",
              JSON.stringify({
                id: res.data._id,
                name: res.data.name,
                email: res.data.email,
                role: res.data.role,
                phoneNumber: res.data.phoneNumber,
                avatar: res.data.avatar,
              })
            );

            toast.success("Update User Successfully");
            navigate("/profile");
          } else {
            toast.error("Update User failed");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setUser({ ...user, avatar: file });
  };
  return (
    <div className=" w-screen flex justify-center flex-col items-center bg-user-background bg-cover h-screen">
      <div className="animate-fade-down animate-delay-[500ms] p-4 flex flex-col justify-between items-center h-[650px] w-[400px] border bg-white rounded-lg">
        <h1 className="text-xl my-8 uppercase font-black"> Update </h1>
        <form action="" onSubmit={handleEditUser} className="h-[550px]">
          {/* Name */}
          <label className="block my-2 text-sm font-medium text-gray-900 dark:text-black">
            Name
          </label>
          <input
            type="text"
            value={user?.name || ""}
            id="name"
            name="name"
            onChange={(e) => setUser({ ...user, name: e.target.value })}
            placeholder="Name"
            className="border border-black-100 rounded-lg text-black bg-white-800 h-10 w-64 pl-3 truncate "
          />

          {/* Email */}
          <label className="block my-2 text-sm font-medium text-gray-900 dark:text-black">
            Email
          </label>
          <input
            type="email"
            value={user?.email || ""}
            id="email"
            name="email"
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            className="border border-black-100 rounded-lg text-black bg-white-800 h-10 w-64 pl-3 truncate "
            readOnly
          />

          <label
            htmlFor="phoneNumber"
            className="block my-2 text-sm font-medium text-gray-900 dark:text-black"
          >
            Phone Number
          </label>
          <input
            type="text"
            name="phoneNumber"
            id="phoneNumber"
            pattern="[0-9]+"
            maxLength={10}
            value={user?.phoneNumber || ""}
            onChange={(e) => setUser({ ...user, phoneNumber: e.target.value })}
            className="border border-black-100 rounded-lg text-black bg-white-800 h-10 w-64 pl-3 truncate "
          />
          <label
            htmlFor="avatar"
            className="block my-2 text-sm font-medium text-gray-900 dark:text-black"
          >
            Avatar
          </label>
          <input
            type="file"
            name="avatar"
            id="avatar"
            accept="image/*"
            onChange={handleImageChange}
            className="border border-black-100 rounded-lg text-black bg-white-800 h-10 w-64 pl-3 truncate "
          />

          <button
            type="submit"
            className="border-2 border-black-500 rounded-lg text-white bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 p-3 mt-8 mb-3 flex justify-center items-center w-64"
          >
            Update
          </button>
        </form>
      </div>
    </div>
  );
}
