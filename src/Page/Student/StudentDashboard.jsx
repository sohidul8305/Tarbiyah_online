// src/Page/Student/StudentDashboard.jsx
import React, { useState, useEffect } from "react";
import { Link, useNavigate, Outlet } from "react-router-dom";
import { useAuth } from "../../Provider/AuthProvider";
import Swal from "sweetalert2";
import {
  FaUser,
  FaUniversity,
  FaFileAlt,
  FaCreditCard,
  FaMoneyBillWave,
  FaSignOutAlt,
  FaDollarSign,
  FaPaperPlane,
  FaGraduationCap,
  FaInfoCircle,
  FaExpand,
  FaMinus,
  FaEdit,
  FaPrint,
  FaSync,
  FaExchangeAlt,
  FaPlayCircle,
  FaTimes,
  FaShieldAlt,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { FiMenu, FiX } from "react-icons/fi";
import SupportChatWidget from "./SupportChatWidget";

const API_BASE = "https://api.tarbiyahonline.com/api";

// ✅ ৪০ হাদিসের ভিডিওর ফলব্যাক লিস্ট
const HADITH_40_VIDEOS = [
  { title: "Session 1", url: "https://youtu.be/hox2-9CszHg" },
  { title: "Session 2", url: "https://youtu.be/t0AvtmKesfM" },
  { title: "Session 3", url: "https://youtu.be/kYMpEvhGbvA" },
  { title: "Session 4", url: "https://youtu.be/EAan2kTwB_Q" },
  { title: "Session 5", url: "https://youtu.be/Ltiwcq9JDo0" },
  { title: "Session 6", url: "https://youtu.be/YnoknCA_TfA" },
  { title: "Session 7", url: "https://youtu.be/9PrFwap8ckM" },
  { title: "Session 8", url: "https://youtu.be/e676nmgauqk" },
  { title: "Session 9", url: "https://youtu.be/Pvci3YmiI-M" },
  { title: "Session 10", url: "https://youtu.be/RlgHYR5AQ4w" },
  { title: "Session 11", url: "https://youtu.be/uGVy85PDRHc" },
  { title: "Session 12", url: "https://youtu.be/lKcUyubyvig" },
  { title: "Session 13", url: "https://youtu.be/eBdmiDTiVE4" },
  { title: "Session 14", url: "https://youtu.be/lCZfdO-1YKs" },
  { title: "Session 15", url: "https://youtu.be/ZApcxoda6Uk" },
  { title: "Session 16", url: "https://youtu.be/3m_a1HLGWGw" },
  { title: "Session 17", url: "https://youtu.be/tJ9pjkMF0l4" },
  { title: "Session 18", url: "https://youtu.be/tIj9WPS6NIw" },
  { title: "Session 19", url: "https://youtu.be/l6lXJnj6bSk" },
  { title: "Session 20", url: "https://youtu.be/zzb-nv74tC4" },
  { title: "Session 21", url: "https://youtu.be/prd_6g4z7I8" },
  { title: "Session 22", url: "https://youtu.be/JHHGMNCIuMQ" },
  { title: "Session 23", url: "https://youtu.be/veMS_XpzuJI" },
  { title: "Session 24", url: "https://youtu.be/rHG9GXK3ngQ" },
  { title: "Session 25", url: "https://youtu.be/qQdObp3lXB4" },
  { title: "Session 26", url: "https://youtu.be/HEdnZ2bGzZs" },
  { title: "Session 27", url: "https://youtu.be/G4JcKcrlRJA" },
  { title: "Session 28", url: "https://youtu.be/_ecH-mt66mM" },
  { title: "Session 29", url: "https://youtu.be/zPQ8PwR4yXQ" },
  { title: "Session 30", url: "https://youtu.be/jbsO30E7pMk" },
  { title: "Session 31", url: "https://youtu.be/E-q_jmgCZ98" },
  { title: "Session 32", url: "https://youtu.be/MT2wp0ST0Jw" },
  { title: "Session 33", url: "https://youtu.be/wEtQ1bp8GP4" },
  { title: "Session 34", url: "https://youtu.be/yvxxKwQGG54" },
  { title: "Session 35", url: "https://youtu.be/fEnQz0M-nm4" },
  { title: "Session 36", url: "https://youtu.be/lAFpYripOSs" },
  { title: "Session 37", url: "https://youtu.be/PB4OXS4K7aM" },
  { title: "Session 38", url: "https://youtu.be/kMNu2n6pBLI" },
  { title: "Session 39", url: "https://youtu.be/dOP7jFBD2pk" },
  { title: "Session 40", url: "https://youtu.be/aIIVg7Bes-M" },
  { title: "Session 41", url: "https://youtu.be/aH1P2ymRAiM" },
  { title: "Session 42", url: "https://youtu.be/Wk9EC1vkPts" },
];

// ✅ ৮টি মডিউলের টাইটেল (স্ক্রিনশট অনুযায়ী)
const MODULE_TITLES = [
  "01. নিয়ত, ঈমান ও ইসলামের মৌলিক পক্ষ",
  "02. তাকওয়া ও আত্মশুদ্ধি",
  "03. ইবাদত ও আল্লাহর আনুগত্য",
  "04. হালাল-হারাম ও শরীয়তের বিধান",
  "05. উত্তম চরিত্র ও আত্মসংযম",
  "06. মানুষের অধিকার ও সামাজিক দায়িত্ব",
  "07. কল্যাণ, ন্যায়বিচার ও সংস্কার",
  "08. আল্লাহর রহমত ও পরকাল",
];

// ✅ ভিডিওগুলোকে ৮টি মডিউলে ভাগ করার লজিক (প্রতি মডিউলে ৫টি, শেষে ৭টি)
const GROUPED_MODULES = MODULE_TITLES.map((title, index) => {
  const start = index * 5;
  const end = index === 7 ? 42 : start + 5; // ৮ম মডিউলে বাকি সব ভিডিও থাকবে
  return {
    moduleId: index,
    title: title,
    videos: HADITH_40_VIDEOS.slice(start, end),
  };
});

const getSourceLabel = (src) => {
  if (src === "basic_tazweed_students") return "Basic Tazweed";
  if (src === "najera_batch_students") return "Najera Batch";
  if (src === "batch_students") return "Batch Student";
  return "Regular Student";
};

const getSourceColor = (src) => {
  if (src === "basic_tazweed_students") return "bg-green-100 text-green-700";
  if (src === "najera_batch_students") return "bg-purple-100 text-purple-700";
  if (src === "batch_students") return "bg-indigo-100 text-indigo-700";
  return "bg-blue-100 text-blue-700";
};

const extractYoutubeId = (url) => {
  if (!url) return "";
  const match = url.match(
    /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|v\/))([^&?/]+)/,
  );
  return match ? match[1] : "";
};

const getYoutubeThumb = (url, quality = "maxresdefault") => {
  const id = extractYoutubeId(url);
  if (!id) return "";
  return `https://img.youtube.com/vi/${id}/${quality}.jpg`;
};

const YoutubeThumbImg = ({ url, alt, className }) => (
  <img
    src={getYoutubeThumb(url, "maxresdefault")}
    alt={alt}
    className={className}
    onError={(e) => {
      if (!e.target.dataset.fallback) {
        e.target.dataset.fallback = "true";
        e.target.src = getYoutubeThumb(url, "hqdefault");
      }
    }}
  />
);

const StudentDashboard = () => {
  const { user, logOut } = useAuth();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState("dashboard");
  const [loading, setLoading] = useState(true);

  const [studentInfo, setStudentInfo] = useState({
    _id: "",
    name: "",
    email: "",
    phone: "",
    class: "",
    roll: "",
    username: "",
    studentId: "",
    status: "",
    admissionDate: "",
    course: "",
    enrolledCourses: [],
    paymentStatus: "",
    paymentMethod: "",
    transactionId: "",
    paidAmount: 0,
    dueAmount: 0,
    courseFee: 0,
    scholarshipAmount: 0,
    monthlyFee: 0,
    country: "",
    gender: "",
    guardianName: "",
    guardianPhone: "",
    paidMonths: [],
    batchName: "",
    batchTeacher: "",
    batchCourse: "",
    batchSchedule: "",
    batchClasses: [],
    loginSource: "",
    source: "",
    sourceLabel: "",
  });

  const [courses, setCourses] = useState([]);
  const [loadingCourses, setLoadingCourses] = useState(false);

  // ✅ ভিডিও প্লেয়ার স্টেট
  const [courseVideos, setCourseVideos] = useState([]);
  const [activeVideo, setActiveVideo] = useState(null);

  // ✅ সিকিউরিটি স্টেট
  const [isWindowFocused, setIsWindowFocused] = useState(true);
  const [showSecurityWarning, setShowSecurityWarning] = useState(false);

  // ✅ অ্যাডভান্সড সিকিউরিটি ইফেক্ট (স্ক্রিন শেয়ার, স্ক্রিন রেকর্ড এবং স্ক্রিনশট ব্লক)
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        setIsWindowFocused(false);
        if (activeVideo) setShowSecurityWarning(true);
      } else {
        setIsWindowFocused(true);
        setShowSecurityWarning(false);
      }
    };

    const handleBlur = () => {
      setTimeout(() => {
        if (
          document.activeElement &&
          document.activeElement.tagName === "IFRAME"
        ) {
          return;
        }
        setIsWindowFocused(false);
        if (activeVideo) setShowSecurityWarning(true);
      }, 200);
    };

    const handleFocus = () => {
      setIsWindowFocused(true);
      setShowSecurityWarning(false);
    };

    const handleKeyDown = (e) => {
      if (
        e.key === "PrintScreen" ||
        (e.metaKey && e.shiftKey && ["3", "4", "5"].includes(e.key)) ||
        (e.ctrlKey && e.shiftKey && ["S", "s"].includes(e.key)) ||
        (e.ctrlKey && e.key === "p") ||
        e.key === "F12"
      ) {
        e.preventDefault();
        try {
          if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(
              "Screenshot Blocked by Security Policy!",
            );
          }
        } catch (err) {}

        Swal.fire({
          icon: "warning",
          title: "সতর্কতা!",
          text: "ভিডিও কন্টেন্ট স্ক্রিনশট বা রেকর্ড করা কঠোরভাবে নিষিদ্ধ।",
          timer: 2000,
          showConfirmButton: false,
        });
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("blur", handleBlur);
    window.addEventListener("focus", handleFocus);
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("blur", handleBlur);
      window.removeEventListener("focus", handleFocus);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeVideo]);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isStudentLoggedIn");
    if (!isLoggedIn) {
      navigate("/student-login");
      return;
    }

    const raw = localStorage.getItem("studentInfo");
    if (!raw) {
      navigate("/student-login");
      return;
    }

    let parsed = {};
    try {
      parsed = JSON.parse(raw);
    } catch (e) {
      navigate("/student-login");
      return;
    }

    const resolvedSource =
      parsed.loginSource || localStorage.getItem("loginSource") || "students";

    setStudentInfo((prev) => ({
      ...prev,
      ...parsed,
      name: parsed.name || "",
      roll: parsed.roll || "",
      course:
        parsed.course || parsed.class || parsed.subject || parsed.program || "",
      class:
        parsed.class || parsed.course || parsed.subject || parsed.program || "",
      loginSource: resolvedSource,
      source: resolvedSource,
      sourceLabel: getSourceLabel(resolvedSource),
    }));

    const primaryKey = parsed._id || parsed.studentId || parsed.phone;
    if (primaryKey) {
      fetchFullStudentData(primaryKey, resolvedSource);
    } else {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchFullStudentData = async (studentId, loginSource) => {
    try {
      const resolvedSource =
        loginSource || localStorage.getItem("loginSource") || "students";

      const raw = localStorage.getItem("studentInfo");
      const parsed = raw ? JSON.parse(raw) : {};

      const params = new URLSearchParams();
      if (parsed._id) params.append("id", parsed._id);
      if (studentId && studentId !== parsed._id)
        params.append("studentId", studentId);
      if (parsed.studentId) params.append("studentId", parsed.studentId);
      if (parsed.phone) params.append("phone", parsed.phone);
      if (parsed.name && parsed.name !== "Student")
        params.append("name", parsed.name);
      if (parsed.username) params.append("username", parsed.username);

      console.log("📥 Fetching dashboard-full:", params.toString());

      const url = `${API_BASE}/student/dashboard-full?${params.toString()}`;
      const res = await fetch(url);
      const d = await res.json();
      console.log("📥 Response:", d);

      if (d.success && d.student) {
        const data = d.student;

        if (data.password) {
          delete data.password;
        }

        const finalSource = d.source || resolvedSource;
        console.log(`✅ Found in ${finalSource}:`, data.name);

        const fee = Number(data.courseFee) || Number(data.monthlyFee) || 0;
        const scholarship = Number(data.scholarshipAmount) || 0;
        const fromMonths = (data.paidMonths || []).reduce(
          (sum, p) => sum + Number(p.amount || 0),
          0,
        );
        const paid = fromMonths > 0 ? fromMonths : Number(data.paidAmount) || 0;
        const due =
          data.dueAmount !== undefined && data.dueAmount !== null
            ? Number(data.dueAmount)
            : Math.max(fee - scholarship - paid, 0);

        let autoStatus = data.paymentStatus;
        if (!autoStatus) {
          if (due === 0 && paid > 0) autoStatus = "Paid";
          else if (paid > 0) autoStatus = "Partial";
          else autoStatus = "Unpaid";
        }

        setStudentInfo((prev) => ({
          ...prev,
          ...data,
          _id: data._id || prev._id,
          name: data.name || prev.name || "",
          roll: data.roll || prev.roll || "",
          username: data.username || prev.username || "",
          studentId: data.studentId || prev.studentId || "",
          course:
            data.batchCourse || data.course || data.class || prev.course || "",
          class:
            data.batchCourse || data.class || data.course || prev.class || "",
          batchName: data.batchName || prev.batchName || "",
          batchTeacher: data.batchTeacher || prev.batchTeacher || "",
          batchCourse: data.batchCourse || prev.batchCourse || "",
          batchSchedule: data.batchSchedule || prev.batchSchedule || "",
          batchClasses: data.batchClasses || prev.batchClasses || [],
          email: data.email || prev.email || "",
          phone: data.phone || prev.phone || "",
          gender: data.gender || prev.gender || "",
          country: data.country || prev.country || "BD",
          admissionDate:
            data.admissionDate || data.createdAt || prev.admissionDate || "",
          status: data.status || "Active",
          paymentStatus: autoStatus || "Unpaid",
          paymentMethod: data.paymentMethod || "",
          transactionId: data.transactionId || "",
          paidAmount: paid,
          dueAmount: due,
          courseFee: fee,
          scholarshipAmount: scholarship,
          monthlyFee: Number(data.monthlyFee) || fee,
          paidMonths: data.paidMonths || [],
          loginSource: finalSource,
          source: finalSource,
          sourceLabel: getSourceLabel(finalSource),
        }));

        const stored = {
          _id: data._id,
          name: data.name,
          studentId: data.studentId || "",
          phone: data.phone || "",
          username: data.username || "",
          course: data.batchCourse || data.course || data.class || "",
          class: data.batchCourse || data.class || data.course || "",
          batchName: data.batchName || "",
          batchCourse: data.batchCourse || "",
          loginSource: finalSource,
        };
        localStorage.setItem("studentInfo", JSON.stringify(stored));
        localStorage.setItem("loginSource", finalSource);

        // ✅ ভিডিও ফেচ করা
        fetchVideos(data, finalSource);
      } else {
        console.warn("⚠️ Student not found:", d.message);
      }

      await fetchEnrolledCourses(studentId, resolvedSource);
    } catch (e) {
      console.error("❌ Fetch error:", e);
    } finally {
      setLoading(false);
    }
  };

  const fetchVideos = async (studentData, source) => {
    try {
      const params = new URLSearchParams();
      if (studentData._id) params.append("id", studentData._id);
      if (studentData.studentId)
        params.append("studentId", studentData.studentId);
      if (studentData.phone) params.append("phone", studentData.phone);
      if (studentData.name && studentData.name !== "Student")
        params.append("name", studentData.name);

      const res = await fetch(
        `${API_BASE}/student/my-academic?${params.toString()}`,
      );
      const d = await res.json();

      let fetchedVideos = d.videos || [];

      // ✅ FALLBACK: যদি API থেকে ভিডিও না আসে কিন্তু কোর্স "Imam Nabawi" হয়
      const courseName = String(
        studentData.course ||
          studentData.batchCourse ||
          studentData.class ||
          "",
      ).toLowerCase();
      const isHadithCourse =
        courseName.includes("imam nabawi") || courseName.includes("40 hadith");

      if (fetchedVideos.length === 0 && isHadithCourse) {
        console.log(
          "⚠️ my-academic returned 0 videos. Using hardcoded fallback for Imam Nabawi.",
        );
        fetchedVideos = HADITH_40_VIDEOS.map((v, i) => ({
          _id: `fallback_${i}`,
          title: v.title,
          url: v.url,
        }));
      }

      if (fetchedVideos.length > 0) {
        console.log(`🎬 Loaded ${fetchedVideos.length} videos for dashboard`);
        setCourseVideos(fetchedVideos);
      } else {
        console.log("ℹ️ No videos found for this student.");
      }
    } catch (err) {
      console.warn("⚠️ Failed to load videos. Checking fallback...");
      const courseName = String(
        studentData.course ||
          studentData.batchCourse ||
          studentData.class ||
          "",
      ).toLowerCase();
      if (
        courseName.includes("imam nabawi") ||
        courseName.includes("40 hadith")
      ) {
        setCourseVideos(
          HADITH_40_VIDEOS.map((v, i) => ({
            _id: `fallback_${i}`,
            title: v.title,
            url: v.url,
          })),
        );
      }
    }
  };

  const fetchEnrolledCourses = async (studentId, loginSource) => {
    try {
      setLoadingCourses(true);
      let loadedCourses = [];

      try {
        const res = await fetch(`${API_BASE}/students/my-courses/${studentId}`);
        const d = await res.json();
        console.log("📚 my-courses API response:", d);

        if (d.success && Array.isArray(d.courses) && d.courses.length > 0) {
          loadedCourses = d.courses;
          console.log(`✅ Loaded ${d.courses.length} courses from API`);
        }
      } catch (e) {
        console.warn("⚠️ my-courses API failed:", e.message);
      }

      if (loadedCourses.length === 0) {
        const raw = localStorage.getItem("studentInfo");
        if (raw) {
          const parsed = JSON.parse(raw);

          if (
            Array.isArray(parsed.enrolledCourses) &&
            parsed.enrolledCourses.length > 0
          ) {
            loadedCourses = parsed.enrolledCourses;
          } else {
            const courseString =
              parsed.batchCourse ||
              parsed.course ||
              parsed.class ||
              parsed.subject ||
              parsed.program ||
              "";
            if (courseString) {
              const courseNames = String(courseString)
                .split(/[,\n]/)
                .map((s) => s.trim())
                .filter(Boolean);

              loadedCourses = courseNames.map((name, i) => ({
                _id: `fallback_${i}_${Date.now()}`,
                code: name
                  .substring(0, 8)
                  .toUpperCase()
                  .replace(/[^A-Z0-9]/g, ""),
                title: name,
                className: name,
                section: "",
                teacher: "",
                duration: "",
              }));
              console.log(
                `✅ Fallback: ${loadedCourses.length} courses from course string`,
              );
            }
          }
        }
      }

      setCourses(loadedCourses);
    } catch (e) {
      console.error("❌ Fetch courses error:", e);
      setCourses([]);
    } finally {
      setLoadingCourses(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logOut();
      localStorage.removeItem("isStudentLoggedIn");
      localStorage.removeItem("studentInfo");
      localStorage.removeItem("studentEmail");
      localStorage.removeItem("studentPhone");
      localStorage.removeItem("studentUsername");
      localStorage.removeItem("loginSource");
      localStorage.removeItem("studentToken");
      localStorage.removeItem("studentId");

      await Swal.fire({
        icon: "success",
        title: "Logged Out Successfully",
        timer: 1200,
        showConfirmButton: false,
      });
      navigate("/student-login");
    } catch (err) {
      console.error("Logout error:", err);
      Swal.fire({
        icon: "error",
        title: "Logout Failed",
        text: "Please try again",
      });
    }
  };

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const menuItems = [
    {
      id: "dashboard",
      path: "/student-dashboard",
      icon: <MdDashboard className="text-xl" />,
      label: "Dashboard",
    },
    {
      id: "profile",
      path: "/student-profile",
      icon: <FaUser className="text-xl" />,
      label: "Profile",
    },
    {
      id: "academic",
      path: "/student-acedemic",
      icon: <FaUniversity className="text-xl" />,
      label: "Academic",
    },
    {
      id: "result",
      path: "/student-result",
      icon: <FaFileAlt className="text-xl" />,
      label: "Regular Exam Result",
    },
    {
      id: "payment",
      path: "/online-payment",
      icon: <FaCreditCard className="text-xl" />,
      label: "Monthly Online Payment",
    },
    {
      id: "due",
      path: "/due-payment",
      icon: <FaMoneyBillWave className="text-xl" />,
      label: "Due & Payments",
    },
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#00ADD2] mx-auto"></div>
          <p className="text-sm text-gray-500 mt-3">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-gray-50 flex flex-col select-none"
      onContextMenu={(e) => e.preventDefault()}
    >
      <div className="md:hidden bg-white border-b border-gray-200 p-3 flex justify-between items-center">
        <h1 className="text-sm font-bold text-gray-800">Student Dashboard</h1>
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
        >
          {isSidebarOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>

      <div className="flex flex-grow relative">
        <aside
          className={`
            fixed md:relative z-50
            w-72 md:w-64 
            bg-white border-r border-gray-200 
            shadow-lg md:shadow-sm
            transition-all duration-300 ease-in-out
            h-screen md:h-auto
            ${isSidebarOpen ? "left-0" : "-left-72 md:left-0"}
          `}
        >
          <div className="p-4 bg-gradient-to-r from-[#00ADD2] to-[#00c4e6] text-white">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <span className="text-xl font-bold">
                  {studentInfo.name?.charAt(0) || "S"}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-sm truncate">{studentInfo.name}</p>
                <p className="text-xs opacity-80 truncate">
                  {studentInfo.course || studentInfo.class}
                </p>
                {studentInfo.sourceLabel && (
                  <span className="inline-block mt-1 text-[10px] px-2 py-0.5 rounded-full bg-white/25 font-semibold">
                    {studentInfo.sourceLabel}
                  </span>
                )}
              </div>
            </div>
          </div>

          <nav className="p-3 space-y-1">
            {menuItems.map((item) => (
              <Link
                key={item.id}
                to={item.path}
                onClick={() => {
                  setActiveMenu(item.id);
                  setIsSidebarOpen(false);
                }}
              >
                <button
                  className={`
                    w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all
                    ${
                      activeMenu === item.id
                        ? "bg-[#e6f7f9] text-[#00ADD2] font-bold shadow-sm"
                        : "text-gray-700 hover:bg-gray-50 hover:text-[#00ADD2]"
                    }
                  `}
                >
                  <span className="text-gray-600">{item.icon}</span>
                  <span className="text-sm">{item.label}</span>
                </button>
              </Link>
            ))}

            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-red-600 hover:bg-red-50 transition-all mt-4 border-t border-gray-200 pt-4"
            >
              <FaSignOutAlt className="text-xl" />
              <span className="text-sm font-medium">Logout</span>
            </button>
          </nav>

          <div className="absolute bottom-0 left-0 right-0 p-4 text-xs text-gray-400 border-t border-gray-100">
            <p>Tarbiyah Online Madrasha</p>
          </div>
        </aside>

        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        <main className="flex-grow p-4 md:p-6 overflow-x-auto w-full">
          <div className="bg-white p-3 rounded-sm shadow-sm border border-gray-200 mb-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            <div>
              <h1 className="text-base font-bold text-gray-800">Dashboard</h1>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <button
                title="Edit Profile"
                onClick={() => navigate("/student-profile")}
                className="p-1.5 hover:bg-gray-100 rounded border border-gray-300 text-xs"
              >
                <FaEdit />
              </button>
              <button
                title="Print"
                onClick={() => window.print()}
                className="p-1.5 hover:bg-gray-100 rounded border border-gray-300 text-xs"
              >
                <FaPrint />
              </button>
              <button
                title="Fullscreen"
                onClick={() => {
                  if (!document.fullscreenElement) {
                    document.documentElement.requestFullscreen();
                  } else {
                    if (document.exitFullscreen) {
                      document.exitFullscreen();
                    }
                  }
                }}
                className="p-1.5 hover:bg-gray-100 rounded border border-gray-300 text-xs"
              >
                <FaExpand />
              </button>
              <button
                title="Refresh"
                onClick={() => window.location.reload()}
                className="p-1.5 hover:bg-gray-100 rounded border border-gray-300 text-xs"
              >
                <FaSync />
              </button>
              <button
                title="Switch"
                className="p-1.5 hover:bg-gray-100 rounded border border-gray-300 text-xs"
              >
                <FaExchangeAlt />
              </button>
            </div>
          </div>

          <Outlet />

          {activeMenu === "dashboard" && (
            <DashboardContent
              studentInfo={studentInfo}
              courses={courses}
              loadingCourses={loadingCourses}
              courseVideos={courseVideos}
              onVideoClick={(video) => setActiveVideo(video)}
              onRefresh={() =>
                fetchFullStudentData(
                  studentInfo._id || studentInfo.studentId,
                  studentInfo.loginSource,
                )
              }
            />
          )}
        </main>
      </div>

      {/* ✅ ভিডিও প্লেয়ার মোডাল (পপআপ) with Full Security */}
      {activeVideo && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setActiveVideo(null)}
          onContextMenu={(e) => e.preventDefault()}
        >
          <div
            className="relative w-full max-w-5xl bg-black rounded-xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveVideo(null)}
              className="absolute top-2 right-2 z-20 bg-red-600 hover:bg-red-700 text-white p-2 rounded-full cursor-pointer shadow-lg"
            >
              <FaTimes />
            </button>

            <div className="relative aspect-video w-full bg-black overflow-hidden">
              <div
                className={`w-full h-full transition-all duration-300 ${!isWindowFocused || showSecurityWarning ? "blur-2xl brightness-50 pointer-events-none" : ""}`}
              >
                <iframe
                  src={`https://www.youtube.com/embed/${extractYoutubeId(activeVideo.url)}?autoplay=1&modestbranding=1&rel=0&showinfo=0`}
                  title={activeVideo.title}
                  className="w-full h-full border-none pointer-events-auto"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  disablePictureInPicture
                  controlsList="nodownload"
                ></iframe>
              </div>

              {/* সিকিউরিটি ওভারলে */}
              {(!isWindowFocused || showSecurityWarning) && (
                <div className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-black/60 text-white p-4 text-center">
                  <FaShieldAlt className="text-6xl text-red-500 mb-4 animate-pulse" />
                  <h2 className="text-2xl font-bold mb-2">
                    ভিডিও লক করা হয়েছে!
                  </h2>
                  <p className="text-sm max-w-md">
                    আপনি অন্য ট্যাবে গেছেন বা স্ক্রিন রেকর্ডিং টুল ওপেন করেছেন।
                    ভিডিও দেখতে অনুগ্রহ করে এই ট্যাবে ফিরে আসুন।
                  </p>
                </div>
              )}

              {/* মুভিং ওয়াটারমার্ক */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-10 opacity-30">
                <div className="absolute top-1/4 left-1/4 text-white font-mono text-xl font-bold tracking-widest drop-shadow-md animate-[ping_4s_ease-in-out_infinite]">
                  ID: {studentInfo?.studentId || "STUDENT"}
                </div>
                <div className="absolute bottom-1/4 right-1/4 text-white font-mono text-xl font-bold tracking-widest drop-shadow-md animate-[bounce_5s_infinite]">
                  PHONE: {studentInfo?.phone || "01XXXXXXXXX"}
                </div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white/50 font-bold text-4xl rotate-12">
                  Tarbiyah Academy
                </div>
              </div>
            </div>

            <div className="p-4 bg-gray-900 text-white flex justify-between items-center">
              <h3 className="font-bold text-lg">{activeVideo.title}</h3>
              <div className="flex items-center gap-1 text-[10px] text-gray-400">
                <FaShieldAlt /> Protected Content
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ✅ Support Chat Widget — Floating Button */}
      <SupportChatWidget />
    </div>
  );
};

// ==========================================
// Dashboard Content
// ==========================================
const DashboardContent = ({
  studentInfo,
  courses,
  loadingCourses,
  courseVideos,
  onVideoClick,
  onRefresh,
}) => {
  const navigate = useNavigate();
  const [paymentTab, setPaymentTab] = useState("summary");

  // ✅ মডিউল ওপেন/ক্লোজ করার স্টেট (প্রথম মডিউল ডিফল্ট ওপেন থাকবে)
  const [openModule, setOpenModule] = useState(0);

  const totalBill = Number(studentInfo.courseFee) || 0;
  const totalPaid = Number(studentInfo.paidAmount) || 0;
  const totalDue = Number(studentInfo.dueAmount) || 0;

  const courseDisplayValue =
    studentInfo.course || studentInfo.batchCourse || studentInfo.class || "N/A";

  // ✅ ভিডিওগুলো গ্রুপ করা (ফলব্যাক লিস্টের জন্য)
  // নোট: যদি ড্যাশবোর্ডে API থেকে ভিডিও আসে, তবে সেগুলোও ৫টি করে মডিউলে ভাগ হবে
  const displayModules = GROUPED_MODULES;

  return (
    <div className="space-y-4">
      {/* Welcome Banner */}
      <div className="bg-[#6b2158] text-white p-3 rounded-sm shadow-sm text-sm flex items-center justify-between gap-3 flex-wrap">
        <div>
          <p>
            Assalamu alaikum wa rahmatullahi wa barakatuh. Ahlan wa Sahlan WA
            Masa'al Khair!{" "}
            <strong>
              {studentInfo.name || "Student"}{" "}
              {studentInfo.studentId ? `[${studentInfo.studentId}]` : ""}
            </strong>
          </p>
          {studentInfo.batchName && (
            <p className="text-[11px] opacity-80 mt-0.5">
              📚 Batch: <strong>{studentInfo.batchName}</strong>
              {studentInfo.batchTeacher && (
                <> • 👨‍🏫 {studentInfo.batchTeacher}</>
              )}
            </p>
          )}
        </div>
        {studentInfo.sourceLabel && (
          <span className="shrink-0 text-[10px] px-2 py-1 rounded-full bg-white/20 font-bold">
            🎓 {studentInfo.sourceLabel}
          </span>
        )}
      </div>

      {/* Important Links */}
      <div className="border border-[#00ADD2] bg-white rounded-sm shadow-sm">
        <div className="bg-[#00ADD2] text-white px-3 py-2 flex justify-between items-center rounded-t-sm">
          <div className="flex items-center gap-2 text-sm font-medium">
            <FaInfoCircle /> Important Links
          </div>
          <div className="flex gap-3 text-xs">
            <button className="hover:opacity-80">
              <FaExpand />
            </button>
            <button className="hover:opacity-80">
              <FaMinus />
            </button>
          </div>
        </div>

        <div className="p-4 bg-[#f8f9fa]">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-[#78b866] text-white rounded-sm relative flex flex-col justify-between h-[100px] hover:brightness-105 transition-all">
              <div className="p-3 z-10">
                <h3 className="font-semibold text-lg leading-tight">
                  Check Due & <br /> Payments
                </h3>
              </div>
              <FaDollarSign className="absolute right-2 top-2 text-[60px] opacity-20 z-0" />
              <Link
                to="/due-payment"
                className="bg-black/10 py-1 text-center text-xs hover:bg-black/20 cursor-pointer block transition-colors w-full mt-auto z-10"
              >
                View ➔
              </Link>
            </div>

            <div className="bg-[#8c1c44] text-white rounded-sm relative flex flex-col justify-between h-[100px] hover:brightness-105 transition-all">
              <div className="p-3 z-10">
                <h3 className="font-semibold text-lg leading-tight">
                  Semester <br /> Result
                </h3>
              </div>
              <FaFileAlt className="absolute right-2 top-2 text-[60px] opacity-20 z-0" />
              <Link
                to="/student-result"
                className="bg-black/10 py-1 text-center text-xs hover:bg-black/20 cursor-pointer block transition-colors w-full mt-auto z-10"
              >
                View ➔
              </Link>
            </div>

            <div className="bg-[#00a65a] text-white rounded-sm relative flex flex-col justify-between h-[100px] hover:brightness-105 transition-all">
              <div className="p-3 z-10">
                <h3 className="font-semibold text-lg leading-tight">
                  Online <br /> Registration
                </h3>
              </div>
              <FaPaperPlane className="absolute right-2 top-2 text-[60px] opacity-20 z-0" />
              <Link
                to="/student-registration"
                className="bg-black/10 py-1 text-center text-xs hover:bg-black/20 cursor-pointer block transition-colors w-full mt-auto z-10"
              >
                Apply Online ➔
              </Link>
            </div>

            <div className="bg-[#0073b7] text-white rounded-sm relative flex flex-col justify-between h-[100px] hover:brightness-105 transition-all">
              <div className="p-3 z-10">
                <h3 className="font-semibold text-lg leading-tight">
                  Monthly Online <br /> Payment
                </h3>
              </div>
              <FaDollarSign className="absolute right-2 top-2 text-[60px] opacity-20 z-0" />
              <Link
                to="/online-payment"
                className="bg-black/10 py-1 text-center text-xs hover:bg-black/20 cursor-pointer block transition-colors w-full mt-auto z-10"
              >
                Payment ➔
              </Link>
            </div>

            <div className="col-span-1 md:col-span-1 bg-[#f39c12] text-white text-xs p-2 rounded-sm leading-relaxed mt-2">
              আপনার পোর্টাল এবং ক্যাম্পাসের পাসওয়ার্ড যদি একই থাকে সে ক্ষেত্রে
              আপনি সরাসরি ক্যাম্পাসে লগইন হয়ে যেতে পারবেন, অন্যথায় আপনাকে
              ক্যাম্পাসে পাসওয়ার্ড দিয়ে লগইন করতে হবে।
            </div>

            <div className="col-span-1 md:col-span-1 bg-[#00a65a] text-white rounded-sm relative flex flex-col justify-between h-[100px] mt-2 hover:brightness-105 transition-all">
              <div className="p-3 z-10">
                <h3 className="font-semibold text-lg mb-1">Campus</h3>
                {(studentInfo.dueAmount || 0) > 0 ? (
                  <button
                    onClick={() =>
                      Swal.fire({
                        icon: "warning",
                        title: "🚫 Due বাকি আছে!",
                        html: `
              <p>আপনার বকেয়া <strong>৳${studentInfo.dueAmount}</strong></p>
              <p style="font-size: 13px; color: #666; margin-top: 8px;">
                Campus-এ প্রবেশের আগে payment সম্পূর্ণ করুন।
              </p>
            `,
                        confirmButtonText: "Payment করব",
                        confirmButtonColor: "#00ADD2",
                        showCancelButton: true,
                        cancelButtonText: "পরে",
                      }).then((r) => {
                        if (r.isConfirmed) navigate("/online-payment");
                      })
                    }
                    className="bg-red-500 hover:bg-red-600 text-white text-xs px-3 py-1 rounded shadow-sm transition-colors border border-transparent cursor-not-allowed opacity-90"
                  >
                    🔒 Due বাকি — Locked
                  </button>
                ) : (
                  <Link to="/campus-login">
                    <button className="bg-[#008c9e] hover:bg-[#006b7a] text-white text-xs px-3 py-1 rounded shadow-sm transition-colors border border-transparent">
                      Login to Campus
                    </button>
                  </Link>
                )}
              </div>
              <FaGraduationCap className="absolute right-2 top-2 text-[60px] opacity-20 z-0" />

              {(studentInfo.dueAmount || 0) > 0 ? (
                <div className="bg-red-700/40 py-1 text-center text-[10px] w-full mt-auto z-10 cursor-not-allowed">
                  🔒 Payment Pending
                </div>
              ) : (
                <Link
                  to="/campus-login"
                  className="bg-black/10 py-1 text-center text-xs hover:bg-black/20 cursor-pointer block transition-colors w-full mt-auto z-10"
                >
                  Go to Campus ➔
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Registered Courses */}
      <div className="border border-[#00ADD2] bg-white rounded-sm shadow-sm mb-6">
        <div className="flex flex-wrap items-center gap-2 p-2 border-b border-[#00ADD2] text-sm bg-[#f4f6f9] font-medium text-gray-700">
          <FaFileAlt className="text-[#00ADD2]" /> Registered Courses of
          <span className="border border-[#00ADD2] rounded px-2 py-0.5 text-xs bg-white font-bold text-[#00ADD2]">
            {courseDisplayValue}
          </span>
          {studentInfo.sourceLabel && (
            <span
              className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${getSourceColor(
                studentInfo.source,
              )}`}
            >
              🎓 {studentInfo.sourceLabel}
            </span>
          )}
          <button
            onClick={onRefresh}
            className="ml-auto text-[#00ADD2] hover:text-[#008c9e] text-xs flex items-center gap-1"
          >
            <FaSync size={10} /> Refresh
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-600">
            <thead className="text-xs text-gray-700 bg-gray-100 border-b border-gray-200">
              <tr>
                <th className="px-4 py-2 font-semibold w-12 border-r border-gray-200 text-center">
                  Ser
                </th>
                <th className="px-4 py-2 font-semibold">Title</th>
              </tr>
            </thead>
            <tbody>
              {loadingCourses ? (
                <tr>
                  <td colSpan="2" className="text-center py-4 text-gray-500">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-[#00ADD2] mx-auto"></div>
                    <p className="mt-2 text-xs">Loading courses...</p>
                  </td>
                </tr>
              ) : (
                (courses.length > 0
                  ? courses
                  : [
                      {
                        _id: "fallback_0",
                        code: studentInfo.studentId || "CRS-001",
                        title:
                          studentInfo.course ||
                          studentInfo.batchCourse ||
                          studentInfo.class ||
                          "N/A",
                        className:
                          studentInfo.course ||
                          studentInfo.batchCourse ||
                          studentInfo.class ||
                          "N/A",
                      },
                    ]
                ).map((course, index) => (
                  <tr
                    key={course._id || index}
                    className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-4 py-3 align-top border-r border-gray-200 text-center font-mono">
                      {String(index + 1).padStart(2, "0")}
                    </td>

                    <td className="px-4 py-3">
                      <p className="font-medium text-[#00ADD2]">
                        {course.title ||
                          course.className ||
                          studentInfo.course ||
                          studentInfo.batchCourse ||
                          studentInfo.class ||
                          "N/A"}
                      </p>

                      {studentInfo.batchName && (
                        <p className="text-[10px] text-gray-500 mt-0.5">
                          📚 Batch:{" "}
                          <span className="font-semibold text-gray-700">
                            {studentInfo.batchName}
                          </span>
                        </p>
                      )}

                      {studentInfo.batchTeacher && (
                        <p className="text-[10px] text-purple-600 mt-0.5">
                          👨‍🏫 Teacher:{" "}
                          <span className="font-semibold">
                            {studentInfo.batchTeacher}
                          </span>
                        </p>
                      )}

                      {studentInfo.batchSchedule && (
                        <p className="text-[10px] text-blue-600 mt-0.5">
                          ⏰ Schedule:{" "}
                          <span className="font-semibold">
                            {studentInfo.batchSchedule}
                          </span>
                        </p>
                      )}

                      <div className="text-[11px] text-[#00ADD2] flex gap-2 mt-1">
                        <Link
                          to={`/student-attendance/${course.code || course._id}`}
                          className="hover:underline"
                        >
                          [Attendances]
                        </Link>
                        <Link
                          to={`/course-notices/${course.code || course._id}`}
                          className="hover:underline"
                        >
                          [Course Notices]
                        </Link>
                      </div>

                      <p className="text-xs text-gray-500 italic mt-1 font-serif">
                        {studentInfo.batchSchedule ||
                          studentInfo.class ||
                          "Fall 2026"}
                      </p>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ✅ Recorded Course Videos Section (Module Wise) */}
      {courseVideos.length > 0 && (
        <div className="bg-white border-2 border-teal-100 rounded-xl shadow-sm p-4 md:p-6 mb-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1.5 h-6 bg-[#00ADD2] rounded-full"></div>
            <h2 className="text-xl font-bold text-[#00ADD2]">
              🎬 Course Modules & Videos
            </h2>
          </div>

          <div className="space-y-4">
            {displayModules.map((module, mIndex) => (
              <div
                key={mIndex}
                className="border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm"
              >
                {/* মডিউল হেডার (ক্লিক করলে ওপেন/ক্লোজ হবে) */}
                <button
                  onClick={() =>
                    setOpenModule(openModule === mIndex ? null : mIndex)
                  }
                  className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-[#e6f7f9] transition-colors text-left"
                >
                  <span className="font-bold text-[#002b2b] text-[15px]">
                    {module.title}
                  </span>
                  <span className="text-[#00ADD2]">
                    {openModule === mIndex ? (
                      <FaChevronUp />
                    ) : (
                      <FaChevronDown />
                    )}
                  </span>
                </button>

                {/* মডিউলের ভেতরের ভিডিও গ্রিড */}
                {openModule === mIndex && (
                  <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 bg-white border-t border-gray-100">
                    {module.videos.map((video, index) => (
                      <div
                        key={video._id || index}
                        onClick={() => onVideoClick(video)}
                        className="group block overflow-hidden rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 cursor-pointer bg-white"
                      >
                        <div className="relative aspect-video bg-gray-200 overflow-hidden">
                          <YoutubeThumbImg
                            url={video.url}
                            alt={video.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 pointer-events-none"
                          />
                          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                            <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center shadow-lg text-white transition-transform group-hover:scale-110">
                              <FaPlayCircle className="text-2xl" />
                            </div>
                          </div>
                          <div className="absolute top-2 left-2 bg-black/70 text-white text-[10px] font-bold px-2 py-0.5 rounded">
                            {video.title.replace("Session ", "")}
                          </div>
                        </div>
                        <div className="p-3">
                          <p className="text-sm font-semibold text-[#002b2b] truncate">
                            {video.title}
                          </p>
                          <p className="text-[10px] text-gray-500 mt-0.5">
                            ▶ Click to watch
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      <PaymentSection
        paymentTab={paymentTab}
        setPaymentTab={setPaymentTab}
        studentInfo={studentInfo}
        totalBill={totalBill}
        totalPaid={totalPaid}
        totalDue={totalDue}
      />
    </div>
  );
};

// ==========================================
// Payment Section (Unchanged)
// ==========================================
const PaymentSection = ({
  paymentTab,
  setPaymentTab,
  studentInfo,
  totalBill,
  totalPaid,
  totalDue,
}) => {
  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4">
      <div className="flex flex-wrap gap-2 border-b border-gray-200 pb-3 mb-4 text-sm">
        {[
          { id: "summary", label: "Payment Summary" },
          { id: "all-bill", label: "All Bill (Debit)" },
          { id: "history", label: "Payment History (Credit)" },
          { id: "online-history", label: "Online Payment History" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setPaymentTab(tab.id)}
            className={`px-4 py-1.5 rounded border transition-all ${
              paymentTab === tab.id
                ? "bg-gray-100 font-bold border-[#00ADD2] text-[#00ADD2]"
                : "bg-white text-gray-600 hover:bg-gray-50 border-gray-200"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {paymentTab === "summary" && (
        <PaymentSummary
          totalBill={totalBill}
          totalPaid={totalPaid}
          totalDue={totalDue}
          studentInfo={studentInfo}
        />
      )}
      {paymentTab === "all-bill" && <AllBill studentInfo={studentInfo} />}
      {paymentTab === "history" && <PaymentHistory studentInfo={studentInfo} />}
      {paymentTab === "online-history" && (
        <OnlinePaymentHistory studentInfo={studentInfo} />
      )}
    </div>
  );
};

const PaymentSummary = ({ totalBill, totalPaid, totalDue, studentInfo }) => {
  const bill = Number(totalBill) || 0;
  const paid = Number(totalPaid) || 0;
  const due = Number(totalDue) || 0;
  const scholarship = Number(studentInfo.scholarshipAmount) || 0;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="border border-gray-300 rounded-lg overflow-hidden bg-white shadow-sm">
        <div className="bg-[#00ADD2] text-white px-4 py-2 border-b border-gray-300 font-bold text-sm flex items-center gap-2">
          <span>📊</span> Payment Summary
        </div>
        <div className="p-4 space-y-3 text-sm text-gray-700">
          <div className="flex justify-between py-1 border-b border-dashed border-gray-200">
            <span>Course Fee:</span>
            <span className="font-semibold">{bill.toFixed(2)}</span>
          </div>
          <div className="flex justify-between py-1 border-b border-dashed border-gray-200">
            <span>Scholarship:</span>
            <span className="font-semibold text-blue-600">
              {scholarship.toFixed(2)}
            </span>
          </div>
          <div className="border-t border-black my-1"></div>
          <div className="flex justify-between py-1 border-b border-dashed border-gray-200">
            <span>Total Paid:</span>
            <span className="font-semibold text-green-600">
              {paid.toFixed(2)}
            </span>
          </div>
          <div className="flex justify-between py-1 text-base font-bold text-gray-900">
            <span>Total Due:</span>
            <span className="text-red-600">{due.toFixed(2)}</span>
          </div>
          <div className="text-xs text-gray-400 mt-2 border-t pt-2">
            <p>Payment Method: {studentInfo.paymentMethod || "N/A"}</p>
            <p>Transaction ID: {studentInfo.transactionId || "N/A"}</p>
            <p>
              Status:{" "}
              <span
                className={
                  studentInfo.paymentStatus === "Paid"
                    ? "text-green-600 font-bold"
                    : studentInfo.paymentStatus === "Partial"
                      ? "text-yellow-600 font-bold"
                      : "text-red-600 font-bold"
                }
              >
                {studentInfo.paymentStatus || "Unpaid"}
              </span>
            </p>
          </div>
        </div>
      </div>

      <div className="border border-gray-300 rounded-lg overflow-hidden bg-white shadow-sm">
        <div className="bg-[#00ADD2] text-white px-4 py-2 border-b border-gray-300 font-bold text-sm flex items-center gap-2">
          <span>📈</span> Overall Summary
        </div>
        <div className="p-4 space-y-3 text-sm text-gray-700">
          <div className="flex justify-between py-1 border-b border-dashed border-gray-200">
            <span>Total Bill:</span>
            <span className="font-semibold">{bill.toFixed(2)}</span>
          </div>
          <div className="flex justify-between py-1 border-b border-dashed border-gray-200">
            <span>Total Paid:</span>
            <span className="font-semibold text-green-600">
              {paid.toFixed(2)}
            </span>
          </div>
          <div className="border-t border-black my-1"></div>
          <div className="flex justify-between items-center py-2 bg-gray-50 px-2 rounded">
            <span className="font-bold text-gray-900">Overall Due:</span>
            <span className="bg-red-600 text-white font-bold px-3 py-1 rounded text-sm shadow">
              {due.toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

const AllBill = ({ studentInfo }) => {
  const bill = Number(studentInfo.courseFee) || 0;
  const status = studentInfo.paymentStatus || "Unpaid";

  return (
    <div className="p-4 text-sm text-gray-600 bg-gray-50 rounded-lg border">
      <p className="font-bold text-gray-800 mb-4">All Semester Bills:</p>
      <div className="space-y-2">
        <div className="flex justify-between items-center p-2 bg-white rounded border">
          <span>Course Fee</span>
          <span className="font-bold text-red-600">{bill.toFixed(2)} BDT</span>
          <span
            className={`text-xs px-2 py-1 rounded ${
              status === "Paid"
                ? "bg-green-100 text-green-700"
                : status === "Partial"
                  ? "bg-yellow-100 text-yellow-700"
                  : "bg-red-100 text-red-700"
            }`}
          >
            {status}
          </span>
        </div>
      </div>
    </div>
  );
};

const PaymentHistory = ({ studentInfo }) => {
  const paid = Number(studentInfo.paidAmount) || 0;
  const paidMonths = studentInfo.paidMonths || [];

  return (
    <div className="p-4 text-sm text-gray-600 bg-gray-50 rounded-lg border">
      <p className="font-bold text-gray-800 mb-2">Payment History (Credit):</p>
      {paidMonths.length > 0 ? (
        <div className="space-y-2">
          {paidMonths.map((p, i) => (
            <div
              key={p._id || i}
              className="flex justify-between items-center p-2 bg-white rounded border"
            >
              <div className="min-w-0">
                <p className="text-xs font-semibold text-gray-800">
                  {p.month || "Payment"}
                </p>
                <p className="text-[10px] text-gray-400">
                  {p.method || ""}{" "}
                  {p.paidAt
                    ? `• ${new Date(p.paidAt).toLocaleDateString()}`
                    : ""}
                </p>
              </div>
              <span className="font-bold text-green-600">
                ৳{Number(p.amount || 0).toFixed(2)}
              </span>
            </div>
          ))}
        </div>
      ) : paid > 0 ? (
        <div className="space-y-2">
          <div className="flex justify-between items-center p-2 bg-white rounded border">
            <span>Payment</span>
            <span className="font-bold text-green-600">৳{paid.toFixed(2)}</span>
            <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded">
              Paid
            </span>
          </div>
        </div>
      ) : (
        <p className="text-gray-500">No payment records found yet.</p>
      )}
      <div className="mt-4 text-xs text-gray-400">
        <p>📌 Total Paid: ৳{paid.toFixed(2)}</p>
      </div>
    </div>
  );
};

const OnlinePaymentHistory = ({ studentInfo }) => {
  const due = Number(studentInfo.dueAmount) || 0;

  return (
    <div className="p-4 text-sm bg-teal-50 rounded-lg border border-teal-100 text-center space-y-4">
      <p className="font-bold text-teal-900 text-base">
        Make Online Payment via bKash / SSLCommerz
      </p>
      <p className="text-gray-600 text-sm">
        আপনার বকেয়া{" "}
        <span className="font-bold text-red-600">
          {due > 0 ? `${due.toFixed(2)} টাকা` : "০.০০ টাকা"}
        </span>{" "}
        অনলাইনে পরিশোধ করতে নিচের বাটনে ক্লিক করুন।
      </p>
      <button
        onClick={() => {
          if (due <= 0) {
            Swal.fire("Info", "আপনার কোনো বকেয়া নেই!", "info");
            return;
          }
          Swal.fire({
            title: "Payment Gateway",
            text: "Connecting to bKash Gateway...",
            icon: "info",
            confirmButtonColor: "#00ADD2",
          });
        }}
        className="bg-[#00ADD2] hover:bg-[#008c9e] text-white px-8 py-3 rounded-lg font-bold text-sm shadow-lg transition-all"
      >
        Pay {due > 0 ? due.toFixed(2) : "0.00"} BDT Now
      </button>
    </div>
  );
};

export default StudentDashboard;
