import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import axios from "axios";
import { Toaster } from "react-hot-toast";
import Header from "./components/layouts/Header";
import Register from "./components/user/Register";
import Login from "./components/user/Login";
import CreateCourse from "./components/course/Create";
import Main from "./components/Main";
import UserProfile from "../pages/userProfile";
import Footer from "./components/layouts/Footer";
import { UserContext } from "./context/userContext";
import DeleteCourse from "./components/course/Delete";
import ShowCourse from "./components/course/Show";
import AllCourses from "./components/course/All";
import CreateLesson from "./components/lesson/Create";
import AllLesson from "./components/lesson/All";
import EditCourse from "./components/course/Edit";
import DeleteLesson from "./components/lesson/Delete";
import CourseSideBar from "./components/layouts/CourseSideBar";
import CreateChapter from "../pages/createChapter";
import { PrivateRoutes } from "./components/admin/PrivateRoute";
import AdminPage from "./components/admin";
import QuizMain from "./components/quiz";
import EditUser from "./components/user/Edit";
import ShowLectures from "./components/lectures";

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
  const [user, setUser] = useState(null);
  return (
    <>
      <Toaster position="top-center" toastOptions={{ duration: 3000 }} />
      <UserContext.Provider value={{ user, setUser }}>
        <Layout>
          <Routes>
            <Route exact path="/" element={<Main />} />
            {/* User */}
            <Route exact path="/login" element={<Login />} />
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile/edit" element={<EditUser />} />

            {/* Course */}
            <Route path="/courses/:id" element={<ShowCourse />} />
            <Route path="/courses/:id/lectures" element={<ShowLectures />} />
            {/* Admin */}

            <Route exact element={<PrivateRoutes roles={"admin"} />}>
              <Route path="/admin" element={<AdminPage />} />

              <Route path="/admin/courses" element={<AllCourses />} />

              <Route exact path="/courses/create" element={<CreateCourse />} />

              <Route path="/courses/delete/:id" element={<DeleteCourse />} />

              <Route path="/courses/edit/:id" element={<EditCourse />} />

              <Route path="/admin/lessons" element={<AllLesson />} />

              <Route path="/lessons/create" element={<CreateLesson />} />

              <Route path="/lessons/delete/:id" element={<DeleteLesson />} />

              <Route path="/chapter/:id" element={<CourseSideBar />} />

              <Route path="/chapter/create" element={<CreateChapter />} />
            </Route>
          </Routes>
        </Layout>
      </UserContext.Provider>
    </>
  );
}

export default App;
