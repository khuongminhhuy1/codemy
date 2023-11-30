import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import axios from "axios";
import { Toaster } from "react-hot-toast";
import { UserContextProvider } from "../context/userContext";
import Header from "./components/layouts/Header";
import Register from "./components/user/Register";
import Login from "./components/user/Login";
import Logout from "./components/user/Logout";
import CreateCourse from "./components/course/Create";
import Main from "./components/Main";

axios.defaults.baseURL = "http://localhost:8080";
axios.defaults.withCredentials = true;

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <UserContextProvider>
        <Toaster position="top-center" toastOptions={{ duration: 3000 }} />
        <Header />
        <Routes>
          <Route path="/" element={<Main />} />
          {/* User */}
          <Route path="/user/login" element={<Login />} />
          <Route path="/user/register" element={<Register />} />
          <Route path="/user/logout" element={<Logout />} />

          {/* Course */}
          <Route path="/courses/create" element={<CreateCourse />} />
        </Routes>
      </UserContextProvider>
    </>
  );
}

export default App;
