import React, { useEffect, useState } from "react";

export default function userInfo() {
  const storedUser = localStorage.getItem("user");
  const [user, setUser] = useState({
    name: "",
    email: "",
  });
  useEffect(() => {
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
    }
  }, []);
  return user;
}
