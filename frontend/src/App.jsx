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
import CreateChapter from "./components/chapter/createChapter";
import { PrivateRoutes } from "./components/admin/PrivateRoute";
import AdminPage from "./components/admin";
import EditUser from "./components/user/Edit";
import ShowLectures from "./components/lectures";
import SearchResultsPage from "./components/search/SearchResult";
import QuizPage from "./components/quiz/Show";
import EditLesson from "./components/lesson/Edit";
import CreateQuiz from "./components/quiz/Create";
import QuizList from "./components/quiz/All";
import EditQuiz from "./components/quiz/Edit";
import DeleteQuiz from "./components/quiz/Delete";
import AllUsers from "./components/user/All";
import DeleteUser from "./components/user/Delete";
import AllChapter from "./components/chapter/All";
import DeleteChapter from "./components/user/Delete";
import ShowUser from "./components/user/Show";

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

            <Route path="/search" element={<SearchResultsPage />} />

            {/* User */}
            <Route exact path="/login" element={<Login />} />

            <Route path="/profile/:id" element={<UserProfile />} />

            <Route path="/register" element={<Register />} />

            <Route path="/profile/edit/:id" element={<EditUser />} />

            {/* Course */}

            <Route path="/courses/:id" element={<ShowCourse />} />

            <Route path="/courses/:id/lectures" element={<ShowLectures />} />

            {/* Quiz */}

            <Route path="/courses/:id/quiz" element={<QuizPage />} />

            {/* Admin */}

            <Route exact element={<PrivateRoutes roles={"admin"} />}>
              <Route path="/admin" element={<AdminPage />} />

              <Route path="/admin/users" element={<AllUsers />} />

              <Route path="/admin/user/:id" element={<ShowUser />} />

              <Route path="/admin/users/delete/:id" element={<DeleteUser />} />

              <Route path="/admin/courses" element={<AllCourses />} />

              <Route
                exact
                path="admin/courses/create"
                element={<CreateCourse />}
              />

              <Route
                path="admin/courses/delete/:id"
                element={<DeleteCourse />}
              />

              <Route path="admin/courses/edit/:id" element={<EditCourse />} />

              <Route path="admin/lessons" element={<AllLesson />} />

              <Route path="admin/lessons/create" element={<CreateLesson />} />

              <Route
                path="admin/lessons/delete/:id"
                element={<DeleteLesson />}
              />

              <Route path="/lessons/edit/:id" element={<EditLesson />} />

              <Route path="admin/chapter" element={<AllChapter />} />

              <Route path="admin/chapter/:id" element={<CourseSideBar />} />

              <Route path="admin/chapter/create" element={<CreateChapter />} />

              <Route
                path="admin/chapter/delete/:id"
                element={<DeleteChapter />}
              />

              <Route path="admin/quiz/create" element={<CreateQuiz />} />

              <Route path="admin/quiz" element={<QuizList />} />

              <Route path="admin/quiz/edit/:id" element={<EditQuiz />} />

              <Route path="admin/quiz/delete/:id" element={<DeleteQuiz />} />
            </Route>
          </Routes>
        </Layout>
      </UserContext.Provider>
    </>
  );
}

export default App;
