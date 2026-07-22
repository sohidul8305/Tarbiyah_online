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

// ===== নতুন পেজ সমূহ =====
import Student_opinion from "../Page/Student_opinion/Student_opinion";
import Terms from "../Page/Terms/Terms";
import Diploma from "../Page/Diploma/Diploma";
import Alemiah from "../Page/Alemiah/Alemiah";
import Kids from "../Page/Kids/Kids";
import Quran from "../Page/Quran/Quran";

// ===== অথ ও লগইন পেজ =====
import Login from "../Page/Login/Login";
import Register from "../Page/Register/Register";
import StudentLogin from "../Page/Login/StudentLogin";

// ===== ড্যাশবোর্ড পেজ =====
import StudentDashboard from "../Page/Student/StudentDashboard";
import TeacherDashboard from "../Page/Dashboard/TeacherDashboard";
import AdminDashboard from "../Page/Dashboard/AdminDashboard";

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

// ===== অন্যান্য পেজ =====
import Campus from "../Page/Campus/Campus";
import Class_routine from "../Page/Class-routine/Class_routine";
import Notice_board from "../Page/Notice-board/Notice_board";
import Support from "../Page/Support/Support";
import Student_result from "../Page/Studentresult/Student_result";
import Online_payment from "../Page/Online_payment/Online_payment";
import Student_acedemic from "../Page/Student-acedemic/Student_acedemic";
import Student_profile from "../Page/Student_profile/Student_profile";
import Due_payment from "../Page/Due_payment/Due_payment";

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
      { path: "student-opinion", element: <Student_opinion /> },
      { path: "terms", element: <Terms /> },
      { path: "course/diploma", element: <Diploma /> },
      { path: "course/alemiah", element: <Alemiah /> },
      { path: "course/kids", element: <Kids /> },
      { path: "course/quran", element: <Quran /> },
      { path: "campus", element: <Campus /> },
      { path: "class-routine", element: <Class_routine /> },
      { path: "notice-board", element: <Notice_board /> },
      { path: "support", element: <Support /> },
      { path: "student-profile", element: <Student_profile /> },
      { path: "student-result", element: <Student_result /> },
      { path: "student-acedemic", element: <Student_acedemic /> },
      { path: "online-payment", element: <Online_payment /> },
      { path: "due-payment", element: <Due_payment /> },
    ],
  },

  // ==========================================
  // ২. অথ পেজ (লগইন, রেজিস্টার)
  // ==========================================
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/student-login",
    element: <StudentLogin />,
  },

  // ==========================================
  // ৩. স্টুডেন্ট ড্যাশবোর্ড (প্রাইভেট)
  // ==========================================
  {
    path: "/student-dashboard",
    element: (
      <PrivateRoute role="student">
        <StudentDashboard />
      </PrivateRoute>
    ),
  },

  // ==========================================
  // ৪. টিচার ড্যাশবোর্ড (প্রাইভেট)
  // ==========================================
  {
    path: "/teacher-dashboard",
    element: (
      <PrivateRoute role="teacher">
        <TeacherDashboard />
      </PrivateRoute>
    ),
  },

  // ==========================================
  // ৫. অ্যাডমিন ড্যাশবোর্ড (প্রাইভেট)
  // ==========================================
  {
    path: "/admin-dashboard",
    element: (
      <PrivateRoute role="admin">
        <AdminDashboard />
      </PrivateRoute>
    ),
  },

  // ==========================================
  // ৬. সাব-ড্যাশবোর্ড পেজ (Student)
  // ==========================================
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

  // ==========================================
  // ৭. সাব-ড্যাশবোর্ড পেজ (Teacher)
  // ==========================================
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

  // ==========================================
  // ৮. সাব-ড্যাশবোর্ড পেজ (Admin)
  // ==========================================
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
  // ৯. আনঅথরাইজড পেজ
  // ==========================================
  {
    path: "/unauthorized",
    element: <Unauthorized />,
  },

  // ==========================================
  // ১০. ৪০৪ নট ফাউন্ড
  // ==========================================
  {
    path: "*",
    element: <RootLayouts />,
    children: [
      {
        path: "*",
        element: (
          <div style={{ textAlign: "center", padding: "100px" }}>
            <h1>❓ ৪০৪ - পৃষ্ঠা পাওয়া যায়নি</h1>
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
