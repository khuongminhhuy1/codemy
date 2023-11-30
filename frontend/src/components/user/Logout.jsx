import axios from "axios";
import React from "react";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";

export default function Logout() {
  const handleLogout = async () => {
    try {
      const response = await axios.post("/user/logout");
      if (response.status === 200) {
        toast.success("Logout successfully");
      }
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };
  return (
    <button onClick={handleLogout} type="button">
      Logout
    </button>
  );
}
