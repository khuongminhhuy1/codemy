import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/slogan.png";

export default function Header() {
  const navigate = useNavigate();
  const mainpageRoute = (e) => {
    navigate("/");
  };
  const loginRoute = (e) => {
    navigate("/user/login");
  };
  return (
    <div className="flex bg-white w-full h-[48px] fixed z-1000 top-0">
      <div className=" w-full h-[48px] flex items-center justify-between px-6 lg:px-16">
        <img
          src={logo}
          alt=""
          className="w-[200px] h-[38px] cursor-pointer"
          onClick={mainpageRoute}
        />

        <button className="" onClick={loginRoute}>
          Sign in
        </button>
      </div>
      <span className="block bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 h-[2px] w-full fixed top-12 z-1000"></span>
    </div>
  );
}
