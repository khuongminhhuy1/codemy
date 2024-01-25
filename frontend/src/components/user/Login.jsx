import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

export default function Login() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const loginUser = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/login", {
        email: data.email,
        password: data.password,
      });

      if (res) {
        const token = res.data;
        console.log("Token:", token);
        setData({ email: "", password: "" });

        const decodedToken = jwtDecode(token);
        console.log("Decoded Token:", decodedToken);

        localStorage.setItem(
          "user",
          JSON.stringify({
            id: decodedToken._id,
            name: decodedToken.name,
            email: decodedToken.email,
            role: decodedToken.role,
            phoneNumber: decodedToken.phoneNumber,
            avatar: decodedToken.avatar,
            bookmarks: decodedToken.bookmarks,
          })
        );

        const userRole = decodedToken.role;

        if (userRole === "admin") {
          navigate(`/admin`);
        } else {
          navigate(`/`);
        }
        toast.success("Welcome user");
      } else {
        toast.error(token.error);
      }
    } catch (error) {
      console.error("Error during login:", error);
      toast.error("Email Invalid or Password incorrect. Please try again");
    }
  };
  return (
    <div className="">
      <div className="w-screen flex justify-center flex-col items-center bg-user-background bg-cover h-screen">
        <h1 className="animate-fade-up text-4xl py-8  text-white uppercase font-black">
          Code : Login
        </h1>
        <div className="animate-fade-down animate-delay-[500ms] p-4 flex flex-col justify-center items-center w-96 border bg-white rounded-lg">
          <h1 className="text-xl my-8 uppercase font-black"> Login </h1>

          <form action="" onSubmit={loginUser}>
            {/* Email */}
            <div className="">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
                Email
              </label>

              <input
                type="email"
                value={data.email}
                onChange={(e) => setData({ ...data, email: e.target.value })}
                placeholder="Please enter your email"
                className="border border-black-100 rounded-lg text-black bg-white-800 h-10 w-64 pl-3 truncate "
              />
            </div>
            <br />
            {/* Password */}
            <div className="">
              <label className="block mb-2 text-sm font-medium  text-gray-900 dark:text-black">
                Password
              </label>
              <input
                type="password"
                value={data.password}
                onChange={(e) => setData({ ...data, password: e.target.value })}
                placeholder="Please enter from 8 - 20 letters"
                className="border border-black-100 rounded-lg text-black bg-white-800 h-10 w-64 pl-3 truncate"
              />
            </div>

            <button
              type="submit"
              className="border-2 border-black-500 rounded-lg text-white bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 p-3 mt-8 mb-3 flex justify-center items-center w-64"
            >
              Login
            </button>
            <div className="text-sm mb-4 ">
              Don't have an account yet ?
              <Link
                to={"/register"}
                className="text-blue-700  hover:text-red-700"
              >
                {" "}
                Register
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
