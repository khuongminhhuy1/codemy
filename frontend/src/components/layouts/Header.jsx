import React, { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import logo from "../../assets/slogan.png";
import userInfo from "../../hooks/userInfo";
import CourseSearchComponent from "../search/SearchComponent";

export default function Header() {
  const navigate = useNavigate();
  const { user, setUser } = userInfo();

  const mainpageRoute = (e) => {
    navigate("/");
  };
 

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
    toast.success("Logged Out Successfully");
  };

  return (
    <div className="flex flex-col bg-white w-full h-[48px] ">
      <div className="w-full h-[48px] flex items-center justify-between px-6 lg:px-16 z-9999 sticky top-0">
        <img
          src={logo}
          alt=""
          className="w-[200px] h-[38px] cursor-pointer flex-initial  "
          onClick={mainpageRoute}
        />
        <div className="">
          <CourseSearchComponent />
        </div>
        <div className="flex items-center">
          {user ? (
            <>
              <span className="pr-5">{`Hello, ${user.name}`}</span>
              <span className="pr-5">
                <Link to={`/profile/${user.id}`}>Profile</Link>
              </span>
              <span className="pr-5" onClick={handleLogout}>
                Logout
              </span>
            </>
          ) : (
            <span onClick={() => navigate("/login")}>Login</span>
          )}

          <div>
            {user ? (
              ""
            ) : (
              <Link
                to={"/register"}
                className="w-[80px] h-[40px] ml-5 p-2 text-white bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 rounded-lg hover:text-purple-500"
              >
                Register
              </Link>
            )}
          </div>
        </div>
      </div>
      <span className="block bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 h-[2px] w-full top-12 z-1000 sticky"></span>
    </div>
  );
}
