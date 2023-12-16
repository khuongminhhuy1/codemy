import React, { useEffect, useState } from "react";
import Profile from "../src/components/user/Profile";
import { useNavigate } from "react-router-dom";

export default function UserProfile() {
  const navigate = useNavigate();
  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;

  const [userData, setUserData] = useState({
    name: "",
    email: "",
    avatar: "default-img.jpg",
  });

  const fetch = async (e) => {
    if (user) {
      setUserData({
        name: user.name,
        email: user.email,
        avatar: user.avatar || "default-img.jpg",
      });
    } else {
      navigate("/login");
    }
  };

  useEffect(() => {
    fetch();
  }, []);
  return (
    <div className="">
      <Profile user={userData} />
    </div>
  );
}
