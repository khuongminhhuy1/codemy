import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/slogan.png";
import { toast } from "react-hot-toast";
import Cookies from "js-cookie";

export default function Header({ isLoggedIn, setIsLoggedIn }) {
  const navigate = useNavigate();
  const mainpageRoute = (e) => {
    navigate("/");
  };
  const handleLogin = () => {
    if (!isLoggedIn) {
      navigate("/login");
    } else {
      Cookies.remove("userInfo");
      setIsLoggedIn(false);
      navigate("/");
    }
  };

  const getUserInfo = () => {
    const cookies = JSON.parse(Cookies.get("userInfo"));
    return cookies.name;
  };
  return (
    <div className="flex bg-white w-full h-[48px] fixed z-1000 top-0">
      <div className="w-full h-[48px] flex items-center justify-between px-6 lg:px-16">
        <img
          src={logo}
          alt=""
          className="w-[200px] h-[38px] cursor-pointer flex-initial  "
          onClick={mainpageRoute}
        />
        <div className="flex ">
          <span className="pr-5">
            {isLoggedIn && `Hello ,${getUserInfo()}`}
          </span>
          <div onClick={handleLogin} className="cursor-pointer">
            {isLoggedIn ? "Logout" : "Login"}
          </div>
        </div>
      </div>
      <span className="block bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 h-[2px] w-full fixed top-12 z-1000"></span>
    </div>
  );
}
