import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import axios from "axios";
import { Toaster } from "react-hot-toast";
import Header from "./components/layouts/Header";
import Register from "./components/user/Register";
import Login from "./components/user/Login";
import CreateCourse from "./components/course/Create";
import Main from "./components/Main";
import Profile from "./components/user/Profile";
import Cookies from "js-cookie";

axios.defaults.baseURL = "http://localhost:8080";
axios.defaults.withCredentials = true;

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const userInfo = Cookies.get("userInfo");
    if (userInfo) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <>
      <Toaster position="top-center" toastOptions={{ duration: 3000 }} />
      <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <Routes>
        {/* User */}
        <Route
          exact
          path="/login"
          element={<Login setIsLoggedIn={setIsLoggedIn} />}
        />
        <Route path="/register" element={<Register />} />
        <Route path="/user/:id" element={<Profile />} />
        {/* Course */}
        <Route
          exact
          path="/courses/create"
          element={
            isLoggedIn ? (
              <CreateCourse />
            ) : (
              <Login setIsLoggedIn={setIsLoggedIn} />
            )
          }
        />
        <Route exact path="/" element={<Main />} />
      </Routes>
    </>
  );
}

export default App;
