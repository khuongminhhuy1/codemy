import React, { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/slogan.png";
import { toast } from "react-hot-toast";
import Cookies from "js-cookie";
import UserContext from "../../context/userContext";

export default function Header() {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);
  const userName = user?.name;
  const mainpageRoute = (e) => {
    navigate("/");
  };
  const registerRoute = (e) => {
    navigate("/register");
  };
  const handleLogin = () => {
    if (!userName) {
      navigate("/login");
    } else {
      Cookies.remove("token");
      setUser({ name: "", email: "" });
      navigate("/");
    }
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
        <div className="flex items-center">
          <span className="pr-5">{userName && `Hello , ${userName}`}</span>
          <div
            onClick={handleLogin}
            className="cursor-pointer hover:text-purple-700"
          >
            {userName ? "Logout" : "Login"}
          </div>
          <div className="">
            {userName ? (
              ""
            ) : (
              <Link
                to={"/register"}
                className="w-[80px] h-[40px] ml-5 p-2 text-white border-2 bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 rounded-lg hover:text-purple-500"
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
