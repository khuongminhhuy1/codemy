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
import UserProfile from "../pages/userProfile";
import Show from "./components/course/Show";
import Footer from "./components/layouts/Footer";

axios.defaults.baseURL = "http://localhost:8080";
axios.defaults.withCredentials = true;

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
};
function App() {
  return (
    <>
      <Toaster position="top-center" toastOptions={{ duration: 3000 }} />
      <Layout>
        <Routes>
          <Route exact path="/" element={<Main />} />
          {/* User */}
          <Route exact path="/login" element={<Login />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/register" element={<Register />} />
          {/* Course */}
          <Route exact path="/courses/create" element={<CreateCourse />} />
          <Route path="/courses/:id" element={<Show />} />
        </Routes>
      </Layout>
    </>
  );
}

export default App;
