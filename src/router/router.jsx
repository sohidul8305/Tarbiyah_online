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
import AdminLogin from "../Page/Admin/Admin";
import TeacherLogin from "../Page/Home/Teacher/Teacher";
import Teacher_profile from "../Page/Teacher_profile/Teacher_profile";
import Teacher_classes from "../Page/Teacher_Classes/Teacher_classes";
import Teacher_courses from "../Page/Teacher_courses/Teacher_courses";
import TeacherCourses from "../Page/Teacher_courses/Teacher_courses";
import Teacher_homework from "../Page/Teacher_homework/Teacher_homework";
import Teacher_notifications from "../Page/Teacher_notifications/Teacher_notifications";
import Teacher_students from "../Page/Teacher_students/Teacher_students";
import Teacher_results from "../Page/Teacher_results/Teacher_results";
import Teacher_leave from "../Page/Teacher_leave/Teacher_leave";
import Teacher_salary from "../Page/Teacher_salary/Teacher_salary";
import Upload_videos from "../Page/Upload_videos/Upload_videos";
import Teacher_assignments from "../Page/Teacher_assignments/Teacher_assignments";
import Teacher_quizzes from "../Page/Teacher_quizzes/Teacher_quizzes";
import Short_questions from "../Page/Short_questions/Short_questions";
import Admin_profile from "../Page/Admin_profile/Admin_profile";
import Department from "../Page/Department/Department";
import Today_class from "../Page/Today_class/Today_class";
import Payment_overview from "../Page/Payment-overview/Payment_overview";
import New_notification from "../Page/New-admission/New_admission";
import Admin_notification from "../Page/Admin-notification/Admin_notification";
import New_admission from "../Page/New-admission/New_admission";
import Add_student from "../Page/Add-student/Add_student";
import Student_batch from "../Page/Student-batch/Student_batch";
import Adminstudent_profile from "../Page/Student-profile/Adminstudent_profile";
import Student_admission from "../Page/Student-admission/Student_admission";
import Teacher_assign from "../Page/Teacher-assign/Teacher_assign";
import Class_shedule from "../Page/Teacher-shedule/Teacher_shedule";
import Teacher_attence from "../Page/Teacher-attence/Teacher_attence";
import Teacher_overview from "../Page/Teacher-overview/Teacher_overview";
import Batch_make from "../Page/Batch_make/Batch_make";
import Syllabus from "../Page/Syllabus/Syllabus";
import Clear_routing from "../Page/Clear_routing/Clear_routing";
import Admin_fee from "../Page/Admin_fee/Admin_fee";
import Monthly_fee from "../Page/Monthly_fee/Monthly_fee";
import Invoice from "../Page/Invoice/Invoice";
import Report from "../Page/Report/Report";
import Exam_make from "../Page/Exam_make/Exam_make";
import Result_publish from "../Page/Result_publish/Result_publish";
import Certificate_permission from "../Page/Certificate_permission/Certificate_permission";
import Admission_report from "../Page/Admission_report/Admission_report";
import Attantence_report from "../Page/Attantence_report/Attantence_report";
import Income from "../Page/Income/Income";
import Data_enty from "../Page/Data-enty/Data_enty";
import Total_salary from "../Page/Total-salary/Total_salary";
import Due_salary from "../Page/Due_salary/Due_salary";
import Student_absence from "../Page/Student_absence/Student_absence";
import DiplomaDetails from "../Components/DiplomaDetails/DiplomaDetails";
import Enroll from "../Components/Enroll/Enroll";
import AlimiyahKidsDetails from "../Components/AlimiyahKidsDetails/AlimiyahKidsDetails";
import AlimiyahProgramDetails from "../Components/AlimiyahProgramDetails/AlimiyahProgramDetails";
import AlimiyahKidsEnroll from "../Components/AlimiyahKidsEnroll/AlimiyahKidsEnroll";
import QuidaNuraniDetails from "../Components/QuidaNuraniDetails/QuidaNuraniDetails";
import NazeraDetails from "../Components/NazeraDetails/NazeraDetails";
import HifzDetail from "../Components/HifzDetail/HifzDetail";
import HifzRevisionDetails from "../Components/HifzRevisionDetails/HifzRevisionDetails";
import OneToOneDetails from "../Components/OneToOneDetails/OneToOneDetails";
import NazeraEnroll from "../Components/NazeraEnroll/NazeraEnroll";
import HifzEnroll from "../Components/HifzEnroll/HifzEnroll";
import HifzRevisionEnroll from "../Components/HifzRevisionEnroll/HifzRevisionEnroll";
import OneToOneEnroll from "../Components/OneToOneEnroll/OneToOneEnroll";
import EldersQuidaDetails from "../Components/EldersQuidaDetails/EldersQuidaDetails";
import Bangla_version from "../Components/Bangla-version/Bangla_version";
import English_version from "../Components/English_version/English_version";
import QuidaEnroll from "../Components/QuidaEnroll/QuidaEnroll";
import Course_apply_from from "../Components/Course_apply_from/Course_apply_from";
import AlimiyahProgramEnrollBangla from "../Components/AlimiyahProgramEnrollBangla/AlimiyahProgramEnrollBangla";
import Enroll_alemiyah_english_version from "../Components/Enroll_alemiyah_english_version/Enroll_alemiyah_english_version";
import Enroll_quida_english_version from "../Components/Enroll_quida_english_version/Enroll_quida_english_version";
import Course_kids_quidaelders_enrollbnagla from "../Components/Course_kids_quidaelders_enrollbnagla/Course_kids_quidaelders_enrollbnagla";
import Enroll_quidaelders_english_version from "../Components/Enroll_quidaelders_english_version/Enroll_quidaelders_english_version";
import Course_quran_elders_nazeradetails from "../Components/Course_quran_elders_nazeradetails/Course_quran_elders_nazeradetails";
import Course_kids_najera_enrollbnagla from "../Components/Course_kids_najera_enrollbnagla/Course_kids_najera_enrollbnagla";
import Enroll_bajeraelders_english_version from "../Components/Enroll_bajeraelders_english_version/Enroll_bajeraelders_english_version";
import Course_quran_elders_hifz from "../Components/Course_quran_elders_hifz/Course_quran_elders_hifz";
import Course_kids_hifz_enrollbnagla from "../Components/Course_kids_hifz_enrollbnagla/Course_kids_hifz_enrollbnagla";
import Enroll_hifz_english_version from "../Components/Enroll_hifz_english_version/Enroll_hifz_english_version";
import Course_kids_tajweed_enrollbnagla from "../Components/Course_kids_tajweed_enrollbnagla/Course_kids_tajweed_enrollbnagla";
import Course_quran_elders_tajweed from "../Components/Course_quran_elders_tajweed/Course_quran_elders_tajweed";
import Enroll_tajweed_english_version from "../Components/Enroll_tajweed_english_version/Enroll_tajweed_english_version";
import Campus_login from "../Page/Campus_login/Campus_login";
import Course_quran_elders_advanced_tajweed from "../Components/Course_quran_elders_advanced_tajweed/Course_quran_elders_advanced_tajweed";
import Course_quran_elders_advanced_tajweed_enroll from "../Components/Course_quran_elders_advanced_tajweed_enroll/Course_quran_elders_advanced_tajweed_enroll";

import Admission_now from "../Components/Admission_now/Admission_now";
import Dashboard from "../Page/Dashboard/Dashboard";
import NotFoundPage from "../Page/NotFoundPage/NotFoundPage";
import Donate from "../Components/Donate/Donate";
import Child_development_details from "../Components/Child_development_details/Child_development_details";
import Farewell_hajj_details from "../Components/Farewell_hajj_details/Farewell_hajj_details";
import Age_barriers_details from "../Components/Age_barriers_details/Age_barriers_details";

// Course_kids_tajweed_enrollbnagla.jsx;
//
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
      { path: "teacher-profile", element: <Teacher_profile /> },
      { path: "/teacher-courses", element: <Teacher_courses /> },
      { path: "/teacher-classes", element: <Teacher_classes /> },
      { path: "/teacher-homework", element: <Teacher_homework /> },
      { path: "/teacher-notifications", element: <Teacher_notifications /> },
      { path: "/teacher-students", element: <Teacher_students /> },
      { path: "/teacher-results", element: <Teacher_results /> },
      { path: "/teacher-leave", element: <Teacher_leave /> },
      { path: "/teacher-salary", element: <Teacher_salary /> },
      { path: "/teacher-videos", element: <Upload_videos /> },
      { path: "/teacher-assignments", element: <Teacher_assignments /> },
      { path: "/teacher-quizzes", element: <Teacher_quizzes /> },
      { path: "/teacher-short-questions", element: <Short_questions /> },
      { path: "/admin-profile", element: <Admin_profile /> },
      { path: "/admin-dashboard/department", element: <Department /> },
      { path: "/admin-dashboard/today-class", element: <Today_class /> },
      { path: "/admin-students/add", element: <Add_student /> },
      { path: "/admin-students/batch", element: <Student_batch /> },
      { path: "/admin-students/profile", element: <Adminstudent_profile /> },
      { path: "/admin-students/admission", element: <Student_admission /> },
      { path: "/admin-teachers/assign", element: <Teacher_assign /> },
      { path: "/admin-teachers/schedule", element: <Class_shedule /> },
      { path: "/admin-teachers/attendance", element: <Teacher_attence /> },
      { path: "/admin-teachers/overview", element: <Teacher_overview /> },
      { path: "/admin-batch-course/batch-make", element: <Batch_make /> },
      { path: "/admin-batch-course/syllabus", element: <Syllabus /> },
      { path: "/admin-batch-course/clear-routine", element: <Clear_routing /> },
      { path: "/admin-finance/admin-fee", element: <Admin_fee /> },
      { path: "/admin-finance/monthly-fee", element: <Monthly_fee /> },
      { path: "/admin-finance/invoice", element: <Invoice /> },
      { path: "/admin-finance/report", element: <Report /> },
      { path: "/admin-exam/make", element: <Exam_make /> },
      { path: "/admin-exam/result", element: <Result_publish /> },
      { path: "/admin-exam/certificate", element: <Certificate_permission /> },
      { path: "/admin-reports/admission", element: <Admission_report /> },
      { path: "/admin-reports/attendance", element: <Attantence_report /> },
      { path: "/admin-reports/income", element: <Income /> },
      { path: "/admin-crm/data-entry", element: <Data_enty /> },
      { path: "/admin-salary/total", element: <Total_salary /> },
      { path: "/admin-salary/due", element: <Due_salary /> },
      { path: "/admin-absence", element: <Student_absence /> },
      { path: "/donate", element: <Donate /> },

      {
        path: "/admin-batch-course/course-make",
        element: <Teacher_overview />,
      },
      {
        path: "/admin-dashboard/new-admission",
        element: <New_notification />,
      },
      {
        path: "/admin-dashboard/payment-overview",
        element: <Payment_overview />,
      },
      {
        path: "/admin-dashboard/new-admission",
        element: <New_admission />,
      },
      {
        path: "/admin-dashboard/notification",
        element: <Admin_notification />,
      },
      {
        path: "/enroll/bangla-version",
        element: <Bangla_version />,
      },
      {
        path: "/enroll/english-version",
        element: <English_version />,
      },
      {
        path: "/Course-apply-from",
        element: <Course_apply_from />,
      },
      {
        path: "/enroll/quida/english-version",
        element: <Enroll_quida_english_version />,
      },
    ],
  },

  // Details page all  route

  {
    path: "/course/diploma/details",
    element: <DiplomaDetails></DiplomaDetails>,
  },
  {
    path: "/dashboard",
    element: <Dashboard></Dashboard>,
  },
  {
    path: "/course/diploma/enroll",
    element: <Enroll></Enroll>,
  },
  {
    path: "/course/alemiah/alimiyah-kids",
    element: <AlimiyahKidsDetails></AlimiyahKidsDetails>,
  },
  {
    path: "/course/alemiah/alimiyah-program",
    element: <AlimiyahProgramDetails></AlimiyahProgramDetails>,
  },
  {
    path: "/course/alemiah/kids/enroll",
    element: <AlimiyahProgramEnrollBangla></AlimiyahProgramEnrollBangla>,
  },
  {
    path: "/course/alemiah/program/enroll",
    element: <AlimiyahKidsEnroll></AlimiyahKidsEnroll>,
  },
  {
    path: "/course/kids/quida-nurani",
    element: <QuidaNuraniDetails></QuidaNuraniDetails>,
  },
  {
    path: "/course/kids/nazera",
    element: <NazeraDetails></NazeraDetails>,
  },
  {
    path: "/course/kids/hifz",
    element: <HifzDetail></HifzDetail>,
  },
  {
    path: "/course/kids/hifz-revision",
    element: <HifzRevisionDetails></HifzRevisionDetails>,
  },
  {
    path: "/course/kids/one-to-one",
    element: <OneToOneDetails></OneToOneDetails>,
  },
  {
    path: "/course/kids/quida/enrollbnagla",
    element: <QuidaEnroll></QuidaEnroll>,
  },
  {
    path: "/course/kids/nazera/enroll",
    element: <NazeraEnroll></NazeraEnroll>,
  },
  {
    path: "/course/kids/hifz/enroll",
    element: <HifzEnroll></HifzEnroll>,
  },
  {
    path: "/course/kids/revision/enroll",
    element: <HifzRevisionEnroll></HifzRevisionEnroll>,
  },
  {
    path: "/course/kids/one-to-one/enroll",
    element: <OneToOneEnroll></OneToOneEnroll>,
  },
  {
    path: "/course/quran/elders-quida",
    element: <EldersQuidaDetails></EldersQuidaDetails>,
  },
  {
    path: "/course/quran/elders-quida",
    element: <EldersQuidaDetails></EldersQuidaDetails>,
  },
  {
    path: "/course/quran/elders-hifz",
    element: <Course_quran_elders_hifz></Course_quran_elders_hifz>,
  },
  {
    path: "/course/kids/hifz/enrollbnagla",
    element: <Course_kids_hifz_enrollbnagla></Course_kids_hifz_enrollbnagla>,
  },
  {
    path: "/enroll/hifz/english-version",
    element: <Enroll_hifz_english_version></Enroll_hifz_english_version>,
  },
  {
    path: "/course/quran/elders-tajweed",
    element: <Course_quran_elders_tajweed></Course_quran_elders_tajweed>,
  },
  {
    path: "/enroll/tajweed/english-version",
    element: <Enroll_tajweed_english_version></Enroll_tajweed_english_version>,
  },
  {
    path: "/admission-now",
    element: <Admission_now></Admission_now>,
  },
  {
    path: "/course/quran/elders-advanced-tajweed",
    element: (
      <Course_quran_elders_advanced_tajweed></Course_quran_elders_advanced_tajweed>
    ),
  },
  {
    path: "/course/kids/tajweed/enrollbnagla",
    element: (
      <Course_kids_tajweed_enrollbnagla></Course_kids_tajweed_enrollbnagla>
    ),
  },
  {
    path: "Course_kids_tajweed_enrollbnagla",
    element: (
      <Course_kids_tajweed_enrollbnagla></Course_kids_tajweed_enrollbnagla>
    ),
  },
  {
    path: "/enroll/bajeraelders/english-version",
    element: (
      <Enroll_bajeraelders_english_version></Enroll_bajeraelders_english_version>
    ),
  },
  {
    path: "/course/kids/najera/enrollbnagla",
    element: (
      <Course_kids_najera_enrollbnagla></Course_kids_najera_enrollbnagla>
    ),
  },
  {
    path: "/course/quran/elders-nazera",
    element: (
      <Course_quran_elders_nazeradetails></Course_quran_elders_nazeradetails>
    ),
  },
  {
    path: "/enroll/quidaelders/english-version",
    element: (
      <Enroll_quidaelders_english_version></Enroll_quidaelders_english_version>
    ),
  },
  {
    path: "/course/kids/quidaelders/enrollbnagla",
    element: (
      <Course_kids_quidaelders_enrollbnagla></Course_kids_quidaelders_enrollbnagla>
    ),
  },

  {
    path: "/enroll/alemiyah/english-version",
    element: (
      <Enroll_alemiyah_english_version></Enroll_alemiyah_english_version>
    ),
  },
  {
    path: "/course/quran/elders-advanced-tajweed/enroll",
    element: (
      <Course_quran_elders_advanced_tajweed_enroll></Course_quran_elders_advanced_tajweed_enroll>
    ),
  },
  {
    path: "/blog/importance-of-environment-in-child-development",
    element: <Child_development_details></Child_development_details>,
  },
  {
    path: "/blog/conquest-of-mecca-and-farewell-hajj",
    element: <Farewell_hajj_details></Farewell_hajj_details>,
  },
  {
    path: "/blog/accomplished-thinkers-transcend-age-barriers",
    element: <Age_barriers_details></Age_barriers_details>,
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

  {
    path: "/admin-login",
    element: <AdminLogin />,
  },
  {
    path: "/teacher-login",
    element: <TeacherLogin />,
  },
  {
    path: "/teacher-login",
    element: <TeacherLogin />,
  },
  {
    path: "/campus-login",
    element: <Campus_login />,
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
  // ৫. অ্যাডমিন ড্যাশবোর্ড (প্রাইভেট)
  {
    path: "/admin-dashboard",
    element: (
      <PrivateRoute role="admin">
        {" "}
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
        element: <NotFoundPage></NotFoundPage>,
      },
    ],
  },
]);

export default router;
