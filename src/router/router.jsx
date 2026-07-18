import { createBrowserRouter } from "react-router-dom"; // ← dom যোগ করুন

// ===== লেআউট =====
import RootLayouts from "../Layouts/RootLayouts";
// import DashboardLayout from "../Layouts/DashboardLayout";

// ===== রাউট প্রটেক্টর =====
import PrivateRoute from "./PrivateRoute";

import Unauthorized from "./Unauthorized";

// ===== পাবলিক পেজ =====
import Home from "../Page/Home/Home";
import About from "../Page/Home/About/About";
import Course from "../Page/Home/Course/Course";
import Student from "../Page/Student/Student";
import Consultancy from "../Page/Home/Consultancy/Consultancy";
import Blog from "../Page/Home/Blog/Blog";
import Sponsorship from "../Page/Home/Sponsorship/Sponsorship";
import Teacher from "../Page/Home/Teacher/Teacher";
import Faculty from "../Components/Faculty/Faculty";
import LiveCourse from "../Page/Live_course/Live_course";
import RecordedCourse from "../Page/Recorded_course/Recorded_course";
import Events from "../Page/Events/Events";
import Gallery from "../Page/Gallery/Gallery";
import Member from "../Components/Member/Member";

// ===== অথ পেজ =====

// ===== ড্যাশবোর্ড পেজ =====
import Dashboard from "../Page/Dashboard/Dashboard";
import Admin from "../Page/Admin/Admin";

// ==========================================
// ⚠️ সব ড্যাশবোর্ড চাইল্ড পেজ কমেন্ট (ফাইল নেই)
// ==========================================
import Reports from "../Page/Dashboard/Admin/Reports";
import MyCourse from "../Page/Dashboard/Student/MyCourse";
import MyAssignments from "../Page/Dashboard/Student/MyAssignments";
import MyQuizzes from "../Page/Dashboard/Student/MyQuizzes";
import Certificates from "../Page/Dashboard/Student/Certificates";
import CoursePlayer from "../Page/Dashboard/Student/CoursePlayer";
import TeacherCourses from "../Page/Dashboard/Teacher/TeacherCourses";
import CreateCourse from "../Page/Dashboard/Teacher/CreateCourse";
import ReviewAssignments from "../Page/Dashboard/Teacher/ReviewAssignments";
import StudentsList from "../Page/Dashboard/Teacher/StudentsList";
import EditCourse from "../Page/Dashboard/Teacher/EditCourse";
import UsersManagement from "../Page/Dashboard/Admin/UsersManagement";
import CoursesManagement from "../Page/Dashboard/Admin/CoursesManagement";
import TeachersManagement from "../Page/Dashboard/Admin/TeachersManagement";
import Recorded_course from "../Page/Recorded_course/Recorded_course";
import Management from "../Page/Management/Management";
import Login from "../Page/Login/Login";
import Register from "../Page/Register/Register";

export const router = createBrowserRouter([
  // ==========================================
  // ১. পাবলিক রাউট
  // ==========================================
  {
    path: "/",
    element: <RootLayouts />,
    children: [
      { index: true, element: <Home /> },
      { path: "about", element: <About /> },
      { path: "course", element: <Course /> },
      { path: "consultancy", element: <Consultancy /> },
      { path: "blog", element: <Blog /> },
      { path: "sponsorship", element: <Sponsorship /> },
      { path: "teacher", element: <Teacher /> },
      { path: "faculty", element: <Faculty /> },
      { path: "live-course", element: <LiveCourse /> },

      { path: "events", element: <Events /> },
      { path: "gallery", element: <Gallery /> },
      { path: "member", element: <Member /> },
      { path: "management", element: <Management /> },
      { path: "recorded-course", element: <RecordedCourse /> },
    ],
  },

  // admin , teacher, student
  //===========================================

  {
    path: "my-course",
    element: <MyCourse></MyCourse>,
  },
  {
    path: "my-assignments",
    element: <MyAssignments></MyAssignments>,
  },
  {
    path: "my-quizzes",
    element: <MyQuizzes></MyQuizzes>,
  },
  {
    path: "certificate",
    element: <Certificates></Certificates>,
  },
  {
    path: "course-player",
    element: <CoursePlayer></CoursePlayer>,
  },
  {
    path: "teacher-course",
    element: <TeacherCourses></TeacherCourses>,
  },

  {
    path: "create-course",
    element: <CreateCourse></CreateCourse>,
  },
  {
    path: "review-assignment",
    element: <ReviewAssignments></ReviewAssignments>,
  },
  {
    path: "student-list",
    element: <StudentsList></StudentsList>,
  },
  {
    path: "edit-course",
    element: <EditCourse></EditCourse>,
  },
  {
    path: "user-management",
    element: <UsersManagement></UsersManagement>,
  },
  {
    path: "course-management",
    element: <CoursesManagement></CoursesManagement>,
  },
  {
    path: "teacher-management",
    element: <TeachersManagement></TeachersManagement>,
  },
  {
    path: "record-course",
    element: <Recorded_course></Recorded_course>,
  },

  // ==========================================
  // ২. অথ রাউট
  // ==========================================
  {
    path: "login",
    element: <Login></Login>,
  },
  {
    path: "register",
    element: <Register></Register>,
  },

  // ==========================================
  // ৩. ড্যাশবোর্ড রাউট (শুধু বেসিক)
  // ==========================================
  {
    path: "dashboard",
    element: <Dashboard></Dashboard>,
  },

  //==========================================
  //potral login
  //==========================================
  {
    path: "/admin",
    element: <Admin></Admin>,
  },
  {
    path: "/student",
    element: <Student></Student>,
  },

  // ==========================================
  // ৪. আনঅথরাইজড
  // ==========================================
  {
    path: "/unauthorized",
    element: <Unauthorized />,
  },

  // ==========================================
  // ৫. ৪০৪
  // ==========================================
  {
    path: "*",
    element: <RootLayouts />,
    children: [
      {
        path: "*",
        element: (
          <div style={{ textAlign: "center", padding: "100px" }}>
            <h1>❓ 404 - পৃষ্ঠা পাওয়া যায়নি</h1>
            <p>আপনি যে পৃষ্ঠাটি খুঁজছেন তা আমাদের কাছে নেই।</p>
            <a href="/" style={{ color: "#4CAF50" }}>
              হোম পেজে ফিরে যান
            </a>
          </div>
        ),
      },
    ],
  },
]);

export default router;
