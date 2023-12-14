import React, { useContext, useEffect, useState } from "react";
import Header from "../src/components/layouts/Header";
import Profile from "../src/components/user/Profile";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../src/context/userContext";

export default function UserProfile() {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);

  const fetchData = async () => {
    try {
      const check = Cookies.get("token");
      if (check) {
        const cookies = JSON.parse(Cookies.get("token"));
        if (cookies) {
          const token = cookies;
          const res = await axios.get("/profile", {
            headers: { Authorization: `Bearer ${token}` },
          });
          if (res.data) {
            setUser({ name: res.data.name, email: res.data.email });
          }
        }
      } else {
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="">
      <Profile user={user} />
    </div>
  );
}
