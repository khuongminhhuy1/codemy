import React, { useEffect, useState } from "react";
import Profile from "../src/components/user/Profile";
import { useNavigate } from "react-router-dom";

export default function UserProfile() {
  const navigate = useNavigate();
  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;
  const [userData, setUserData] = useState({
    id: "",
    name: "",
    email: "",
    avatar: "default-img.jpg",
    phoneNumber: "",
    bookmarks: [],
  });

  const fetch = async (e) => {
    if (user) {
      setUserData({
        id: user.id,
        name: user.name,
        email: user.email,
        avatar: user.avatar || "default-img.jpg",
        phoneNumber: user.phoneNumber,
        bookmarks: user.bookmarks,
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
      <Profile />
    </div>
  );
}
