import React from "react";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const registerUser = async (e) => {
    e.preventDefault();
    const { name, email, password } = data;
    try {
      const { data } = await axios.post("/user/register", {
        name,
        email,
        password,
      });
      if (data.error) {
        toast.error(data.error);
      } else {
        setData({});
        toast.success("User Created. Welcome new Dev");
        navigate("/user/login");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <section className="">
      <div className=" w-screen flex justify-center flex-col items-center bg-user-background bg-cover h-screen">
        <h1 className=" animate-fade-up text-4xl py-8 uppercase text-white font-black">
          Code : Register
        </h1>
        <div className="animate-fade-down animate-delay-[500ms] p-4 flex flex-col justify-between items-center h-[650px] w-[400px] border bg-white rounded-lg">
          <h1 className="text-xl my-8 uppercase font-black"> Register</h1>
          <form action="" onSubmit={registerUser} className="h-[550px]">
            {/* Name */}
            <label className="block my-2 text-sm font-medium text-gray-900 dark:text-black">
              Name
            </label>
            <input
              type="text"
              value={data.name}
              id="name"
              name="name"
              onChange={(e) => setData({ ...data, name: e.target.value })}
              placeholder="Name"
              className="border border-black-100 rounded-lg text-black bg-white-800 h-10 w-64 pl-3 truncate "
            />

            {/* Email */}
            <label className="block my-2 text-sm font-medium text-gray-900 dark:text-black">
              Email
            </label>
            <input
              type="email"
              value={data.email}
              id="email"
              name="email"
              onChange={(e) => setData({ ...data, email: e.target.value })}
              placeholder="Please enter your email"
              className="border border-black-100 rounded-lg text-black bg-white-800 h-10 w-64 pl-3 truncate "
            />

            {/* Password */}
            <label className="block my-2 text-sm font-medium text-gray-900 dark:text-black">
              Password
            </label>
            <input
              type="password"
              value={data.password}
              id="password"
              name="password"
              onChange={(e) => setData({ ...data, password: e.target.value })}
              placeholder="Please enter from 8 - 20 letters"
              className="border border-black-100 rounded-lg text-black bg-white-800 h-10 w-64 pl-3 truncate "
            />

            <button
              type="submit"
              className="border-2 border-black-500 rounded-lg text-white bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 p-3 mt-8 mb-3 flex justify-center items-center w-64"
            >
              Register
            </button>
            <div className="text-sm">
              Already have an account ?
              <Link
                to={"/user/login"}
                className="text-blue-700 hover:text-red-700"
              >
                {" "}
                Login{" "}
              </Link>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
