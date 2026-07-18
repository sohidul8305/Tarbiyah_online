import { createBrowserRouter } from "react-router-dom";

// ===== লেআউট =====
import RootLayouts from "../Layouts/RootLayouts";

// ===== রাউট প্রটেক্টর =====
import PrivateRoute from "./PrivateRoute";
import Unauthorized from "./Unauthorized";

// ===== পাবলিক পেজ =====
import Home from "../Page/Home/Home";
import About from "../Page/Home/About/About";
import Course from "../Page/Home/Course/Course";
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
import Management from "../Page/Management/Management";

// ===== অথ পেজ =====
import Login from "../Page/Login/Login";
import Register from "../Page/Register/Register";

// ===== ড্যাশবোর্ড পেজ =====
import Dashboard from "../Page/Dashboard/Dashboard";
import Admin from "../Page/Admin/Admin";
import Student from "../Page/Student/Student";

// ===== ড্যাশবোর্ড চাইল্ড পেজ =====
// Student
import MyCourse from "../Page/Dashboard/Student/MyCourse";
import MyAssignments from "../Page/Dashboard/Student/MyAssignments";
import MyQuizzes from "../Page/Dashboard/Student/MyQuizzes";
import Certificates from "../Page/Dashboard/Student/Certificates";
import CoursePlayer from "../Page/Dashboard/Student/CoursePlayer";

// Teacher
import TeacherCourses from "../Page/Dashboard/Teacher/TeacherCourses";
import CreateCourse from "../Page/Dashboard/Teacher/CreateCourse";
import ReviewAssignments from "../Page/Dashboard/Teacher/ReviewAssignments";
import StudentsList from "../Page/Dashboard/Teacher/StudentsList";
import EditCourse from "../Page/Dashboard/Teacher/EditCourse";

// Admin
import UsersManagement from "../Page/Dashboard/Admin/UsersManagement";
import CoursesManagement from "../Page/Dashboard/Admin/CoursesManagement";
import TeachersManagement from "../Page/Dashboard/Admin/TeachersManagement";
import Reports from "../Page/Dashboard/Admin/Reports";

export const router = createBrowserRouter([
  // ==========================================
  // ১. পাবলিক রাউট (RootLayouts - হেডার/ফুটার সহ)
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
      { path: "recorded-course", element: <RecordedCourse /> },
      { path: "events", element: <Events /> },
      { path: "gallery", element: <Gallery /> },
      { path: "member", element: <Member /> },
      { path: "management", element: <Management /> },
    ],
  },

  // ==========================================
  // ২. অথ রাউট (হেডার/ফুটার ছাড়া)
  // ==========================================
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },

  // ==========================================
  // ৩. রোল বেসড লগইন পেজ (হেডার/ফুটার সহ)
  // ==========================================
  {
    path: "/admin",
    element: <Admin />,
  },
  {
    path: "/student",
    element: <Student />,
  },

  // ==========================================
  // ৪. ড্যাশবোর্ড (প্রাইভেট - লগইন লাগবে)
  // ==========================================
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    ),
  },

  // ==========================================
  // ৫. ড্যাশবোর্ড চাইল্ড পেজ (প্রাইভেট - লগইন লাগবে)
  // ==========================================
  // Student Dashboard Pages
  {
    path: "/dashboard/my-courses",
    element: (
      <PrivateRoute>
        <MyCourse />
      </PrivateRoute>
    ),
  },
  {
    path: "/dashboard/my-assignments",
    element: (
      <PrivateRoute>
        <MyAssignments />
      </PrivateRoute>
    ),
  },
  {
    path: "/dashboard/my-quizzes",
    element: (
      <PrivateRoute>
        <MyQuizzes />
      </PrivateRoute>
    ),
  },
  {
    path: "/dashboard/certificates",
    element: (
      <PrivateRoute>
        <Certificates />
      </PrivateRoute>
    ),
  },
  {
    path: "/dashboard/course-player/:courseId/:lessonId",
    element: (
      <PrivateRoute>
        <CoursePlayer />
      </PrivateRoute>
    ),
  },

  // Teacher Dashboard Pages
  {
    path: "/dashboard/teacher-courses",
    element: (
      <PrivateRoute>
        <TeacherCourses />
      </PrivateRoute>
    ),
  },
  {
    path: "/dashboard/create-course",
    element: (
      <PrivateRoute>
        <CreateCourse />
      </PrivateRoute>
    ),
  },
  {
    path: "/dashboard/edit-course/:courseId",
    element: (
      <PrivateRoute>
        <EditCourse />
      </PrivateRoute>
    ),
  },
  {
    path: "/dashboard/review-assignments",
    element: (
      <PrivateRoute>
        <ReviewAssignments />
      </PrivateRoute>
    ),
  },
  {
    path: "/dashboard/students",
    element: (
      <PrivateRoute>
        <StudentsList />
      </PrivateRoute>
    ),
  },

  // Admin Dashboard Pages
  {
    path: "/dashboard/users",
    element: (
      <PrivateRoute>
        <UsersManagement />
      </PrivateRoute>
    ),
  },
  {
    path: "/dashboard/courses",
    element: (
      <PrivateRoute>
        <CoursesManagement />
      </PrivateRoute>
    ),
  },
  {
    path: "/dashboard/teachers",
    element: (
      <PrivateRoute>
        <TeachersManagement />
      </PrivateRoute>
    ),
  },
  {
    path: "/dashboard/reports",
    element: (
      <PrivateRoute>
        <Reports />
      </PrivateRoute>
    ),
  },

  // ==========================================
  // ৬. আনঅথরাইজড পেজ
  // ==========================================
  {
    path: "/unauthorized",
    element: <Unauthorized />,
  },

  // ==========================================
  // ৭. ৪০৪ নট ফাউন্ড
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
