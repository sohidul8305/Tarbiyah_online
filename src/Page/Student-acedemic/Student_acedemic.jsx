// src/Page/Student-acedemic/Student_acedemic.jsx
import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import {
  FaUser,
  FaUniversity,
  FaFileAlt,
  FaCreditCard,
  FaMoneyBillWave,
  FaGraduationCap,
  FaSync,
  FaInfoCircle,
  FaClock,
  FaChalkboardTeacher,
  FaLink,
  FaBookOpen,
  FaPhone,
  FaIdCard,
  FaCalendarAlt,
  FaFilePdf,
  FaVideo,
  FaExternalLinkAlt,
  FaEnvelope,
  FaClipboardList,
  FaBell,
} from "react-icons/fa";
import { MdDashboard, MdOutlineQuiz } from "react-icons/md";

const API_BASE = "https://api.tarbiyahonline.com/api";

const StudentAcademic = () => {
  const location = useLocation();

  const [studentInfo, setStudentInfo] = useState({
    _id: "",
    name: "Student",
    studentId: "",
    class: "Not Assigned",
    roll: "N/A",
    course: "",
    phone: "",
    email: "",
    admissionDate: "",
    status: "Active",
  });

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [fetchError, setFetchError] = useState(null);
  const [studentBatches, setStudentBatches] = useState([]);

  const [academicData, setAcademicData] = useState({
    videos: [],
    classes: [],
    materials: { all: [], exams: [], quizzes: [], pdfs: [] },
    stats: {
      totalVideos: 0,
      totalExams: 0,
      totalQuizzes: 0,
      totalPdfs: 0,
      totalClasses: 0,
      totalMaterials: 0,
    },
  });

  // ============================================================
  // ✅ Fetch academic data
  // ============================================================
  const fetchAcademicData = useCallback(async (identifiers = {}) => {
    try {
      setFetchError(null);
      const { id, studentId, phone, name, username } = identifiers;

      const params = new URLSearchParams();
      if (id) params.append("id", id);
      if (studentId) params.append("studentId", studentId);
      if (phone) params.append("phone", phone);
      if (name) params.append("name", name);
      if (username) params.append("username", username);

      if (params.toString() === "") {
        setLoading(false);
        setRefreshing(false);
        return;
      }

      const url = `${API_BASE}/student/my-academic?${params.toString()}`;
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      const d = await res.json();

      if (d.success) {
        setAcademicData({
          videos: d.videos || [],
          classes: d.classes || [],
          materials: d.materials || {
            all: [],
            exams: [],
            quizzes: [],
            pdfs: [],
          },
          stats: d.stats || {
            totalVideos: 0,
            totalExams: 0,
            totalQuizzes: 0,
            totalPdfs: 0,
            totalClasses: 0,
            totalMaterials: 0,
          },
        });
        setStudentBatches(d.batches || []);
      } else {
        setFetchError(d.message || "Failed to load");
      }
    } catch (e) {
      setFetchError(e.message || "Failed to load academic data");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  // ============================================================
  // ✅ Load from localStorage
  // ============================================================
  useEffect(() => {
    const savedInfo = localStorage.getItem("studentInfo");
    if (!savedInfo) {
      setLoading(false);
      return;
    }

    let parsed = {};
    try {
      parsed = JSON.parse(savedInfo);
    } catch (e) {
      setLoading(false);
      return;
    }

    setStudentInfo({
      _id: parsed._id || "",
      name: parsed.name || "Student",
      studentId: parsed.studentId || "",
      class:
        parsed.class || parsed.course || parsed.department || "Not Assigned",
      roll: parsed.roll || parsed.studentId || "N/A",
      course: parsed.course || parsed.class || "",
      phone: parsed.phone || "",
      email: parsed.email || "",
      admissionDate: parsed.admissionDate || parsed.createdAt || "",
      status: parsed.status || "Active",
    });

    fetchAcademicData({
      id: parsed._id,
      studentId: parsed.studentId,
      phone: parsed.phone,
      name: parsed.name,
      username: parsed.username,
    });
  }, [fetchAcademicData]);

  const handleRefresh = () => {
    setRefreshing(true);
    const parsed = JSON.parse(localStorage.getItem("studentInfo") || "{}");
    fetchAcademicData({
      id: parsed._id,
      studentId: parsed.studentId,
      phone: parsed.phone,
      name: parsed.name,
      username: parsed.username,
    });
  };

  // ============================================================
  // ✅ Derived data
  // ============================================================
  const primaryBatch = studentBatches[0] || null;

  const weeklyRoutine = useMemo(() => {
    const days = [
      "Saturday",
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
    ];
    const map = {};
    days.forEach((d) => (map[d] = []));
    (academicData.classes || []).forEach((c) => {
      const day = c.day || "Other";
      if (!map[day]) map[day] = [];
      map[day].push(c);
    });
    return days
      .filter((d) => map[d].length > 0)
      .map((d) => ({ day: d, classes: map[d] }));
  }, [academicData.classes]);

  const teachersList = useMemo(() => {
    const set = new Map();
    (academicData.classes || []).forEach((c) => {
      const arr = Array.isArray(c.teachers)
        ? c.teachers
        : c.teacher
          ? [c.teacher]
          : [];
      arr.forEach((t) => {
        if (!set.has(t)) set.set(t, { name: t, subjects: new Set() });
        set.get(t).subjects.add(c.name);
      });
    });
    return Array.from(set.values()).map((t) => ({
      name: t.name,
      subjects: Array.from(t.subjects),
    }));
  }, [academicData.classes]);

  const recentUploads = useMemo(() => {
    const items = [];
    (academicData.videos || []).forEach((v) =>
      items.push({
        type: "video",
        title: v.title,
        url: v.url,
        batch: v.batchName,
        date: v.createdAt || v.date,
      }),
    );
    (academicData.materials?.all || []).forEach((m) =>
      items.push({
        type: m.type || "material",
        title: m.title,
        url: m.url,
        date: m.date || m.createdAt,
      }),
    );
    items.sort((a, b) => new Date(b.date || 0) - new Date(a.date || 0));
    return items.slice(0, 6);
  }, [academicData.videos, academicData.materials]);

  const todayClasses = useMemo(() => {
    const today = new Date().toLocaleDateString("en-US", { weekday: "long" });
    return (academicData.classes || []).filter(
      (c) => (c.day || "").toLowerCase() === today.toLowerCase(),
    );
  }, [academicData.classes]);

  // ============================================================
  // ✅ Locked content click handler
  // ============================================================
  const handleLockedClick = (item) => {
    Swal.fire({
      icon: "info",
      title: "🔒 Campus Login Required",
      html: `
        <p style="font-size:14px;color:#444;">
          <strong>${item.title || "এই content"}</strong> দেখতে হলে
          Campus-এ login করতে হবে।
        </p>
        <p style="font-size:12px;color:#888;margin-top:8px;">
          Campus Login → Academic → Content
        </p>
      `,
      showCancelButton: true,
      confirmButtonText: "Campus Login",
      cancelButtonText: "পরে",
      confirmButtonColor: "#00ADD2",
      cancelColor: "#9ca3af",
    }).then((r) => {
      if (r.isConfirmed) {
        window.location.href = "/campus-login";
      }
    });
  };

  // ============================================================
  // ✅ Sidebar menu
  // ============================================================
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
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#00ADD2] mx-auto"></div>
          <p className="text-sm text-gray-500 mt-3">Loading academic data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row gap-6">
      {/* ==================== SIDEBAR ==================== */}
      <aside className="hidden md:block w-64 bg-white border border-gray-200 rounded-xl shadow-sm h-fit overflow-hidden flex-shrink-0">
        <div className="p-4 bg-gradient-to-r from-[#00ADD2] to-[#00c4e6] text-white">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-xl font-bold">
              {studentInfo.name?.charAt(0) || "S"}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-bold text-sm truncate">{studentInfo.name}</p>
              <p className="text-xs opacity-80 truncate">{studentInfo.class}</p>
            </div>
          </div>
        </div>

        <nav className="p-3 space-y-1">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link key={item.id} to={item.path}>
                <button
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${
                    isActive
                      ? "bg-[#e6f7f9] text-[#00ADD2] font-bold shadow-sm"
                      : "text-gray-700 hover:bg-gray-50 hover:text-[#00ADD2]"
                  }`}
                >
                  <span className="text-gray-600">{item.icon}</span>
                  <span className="text-sm">{item.label}</span>
                </button>
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* ==================== MAIN ==================== */}
      <div className="flex-1 space-y-4 min-w-0">
        {/* HERO HEADER */}
        <div className="bg-gradient-to-r from-[#00ADD2] to-[#00c4e6] rounded-xl shadow-sm p-5 text-white">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="min-w-0">
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <FaGraduationCap /> Academic Information
              </h2>
              <p className="text-sm opacity-90 mt-1">
                {studentInfo.name} • {studentInfo.class} • ID:{" "}
                <span className="font-semibold">
                  {studentInfo.studentId || studentInfo.roll}
                </span>
              </p>
            </div>
            <button
              onClick={handleRefresh}
              disabled={refreshing}
              className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg text-sm flex items-center gap-2 font-semibold disabled:opacity-50 transition"
            >
              <FaSync className={refreshing ? "animate-spin" : ""} />
              {refreshing ? "Refreshing..." : "Refresh"}
            </button>
          </div>
        </div>

        {/* ERROR */}
        {fetchError && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-3 flex items-center justify-between">
            <p className="text-xs text-red-700 font-semibold">
              ⚠️ {fetchError}
            </p>
            <button
              onClick={handleRefresh}
              className="text-xs text-red-600 underline font-semibold"
            >
              Try again
            </button>
          </div>
        )}

        {/* NO BATCH WARNING */}
        {studentBatches.length === 0 && !fetchError && !loading && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 text-center">
            <FaInfoCircle className="text-yellow-600 text-2xl mx-auto mb-1" />
            <p className="text-sm font-semibold text-yellow-800">
              You are not assigned to any batch yet
            </p>
            <p className="text-xs text-yellow-700 mt-1">
              Please contact admin to add you to a batch
            </p>
          </div>
        )}

        {/* ACADEMIC PROFILE */}
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
          <div className="bg-[#00ADD2] text-white px-4 py-2 flex items-center gap-2 text-sm font-bold">
            <FaUser /> Academic Profile
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0">
            <InfoItem
              icon={<FaUser />}
              label="Full Name"
              value={studentInfo.name || "N/A"}
            />
            <InfoItem
              icon={<FaIdCard />}
              label="Student ID"
              value={studentInfo.studentId || "N/A"}
            />
            <InfoItem
              icon={<FaBookOpen />}
              label="Course"
              value={
                primaryBatch?.course || studentInfo.course || studentInfo.class
              }
            />
            <InfoItem
              icon={<FaCalendarAlt />}
              label="Admission Date"
              value={
                studentInfo.admissionDate
                  ? new Date(studentInfo.admissionDate).toLocaleDateString()
                  : "N/A"
              }
            />
            <InfoItem
              icon={<FaGraduationCap />}
              label="Batch"
              value={primaryBatch?.name || "N/A"}
            />
            <InfoItem
              icon={<FaChalkboardTeacher />}
              label="Batch Teacher"
              value={
                teachersList.length > 0
                  ? teachersList.map((t) => t.name).join(", ")
                  : "N/A"
              }
            />
            <InfoItem
              icon={<FaPhone />}
              label="Phone"
              value={studentInfo.phone || "N/A"}
            />
            <InfoItem
              icon={<FaEnvelope />}
              label="Email"
              value={studentInfo.email || "N/A"}
            />
          </div>
        </div>

        {/* TODAY'S CLASS */}
        {todayClasses.length > 0 && (
          <div className="bg-white border border-green-300 rounded-xl shadow-sm overflow-hidden">
            <div className="bg-green-600 text-white px-4 py-2 flex items-center gap-2 text-sm font-bold">
              <FaBell /> Today&apos;s Class ({todayClasses.length})
            </div>
            <div className="p-4 space-y-2">
              {todayClasses.map((c, i) => (
                <div
                  key={c._id || i}
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-green-50 border border-green-100 rounded-lg p-3"
                >
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-gray-800 text-sm">{c.name}</p>
                    <p className="text-xs text-gray-600 flex items-center gap-2 mt-1">
                      <FaClock className="text-gray-400" />
                      {c.time}
                    </p>
                  </div>
                  {c.meetingLink && (
                    <button
                      onClick={() =>
                        handleLockedClick({
                          title: `${c.name} — ${c.time}`,
                        })
                      }
                      className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-2 whitespace-nowrap"
                    >
                      <FaLink size={11} /> Join Now
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TEACHERS */}
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
          <div className="bg-[#00ADD2] text-white px-4 py-2 flex items-center gap-2 text-sm font-bold">
            <FaChalkboardTeacher /> Your Teachers ({teachersList.length})
          </div>
          {teachersList.length === 0 ? (
            <div className="p-8 text-center">
              <FaChalkboardTeacher className="text-4xl text-gray-300 mx-auto mb-2" />
              <p className="text-sm text-gray-500">
                No teacher information available
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 p-4">
              {teachersList.map((t, i) => (
                <div
                  key={i}
                  className="border border-gray-200 rounded-lg p-3 flex items-start gap-3 hover:shadow-md transition"
                >
                  <div className="w-10 h-10 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center font-bold flex-shrink-0">
                    {t.name?.charAt(0) || "T"}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-bold text-gray-800 text-sm truncate">
                      {t.name}
                    </p>
                    <p className="text-[10px] text-gray-500 mt-0.5">
                      {t.subjects.length > 0
                        ? t.subjects.join(", ")
                        : "Teacher"}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* RECENT UPLOADS */}
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
          <div className="bg-[#00ADD2] text-white px-4 py-2 flex items-center gap-2 text-sm font-bold">
            <FaClipboardList /> Recent Uploads
          </div>
          {recentUploads.length === 0 ? (
            <div className="p-8 text-center">
              <FaClipboardList className="text-4xl text-gray-300 mx-auto mb-2" />
              <p className="text-sm text-gray-500">
                No recent uploads from your batch
              </p>
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {recentUploads.map((item, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => handleLockedClick(item)}
                  className="w-full text-left flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition"
                >
                  <div
                    className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${
                      item.type === "video"
                        ? "bg-red-100 text-red-600"
                        : item.type === "pdf"
                          ? "bg-orange-100 text-orange-600"
                          : item.type === "quiz"
                            ? "bg-blue-100 text-blue-600"
                            : "bg-purple-100 text-purple-600"
                    }`}
                  >
                    {item.type === "video" ? (
                      <FaVideo />
                    ) : item.type === "pdf" ? (
                      <FaFilePdf />
                    ) : item.type === "quiz" ? (
                      <MdOutlineQuiz />
                    ) : (
                      <FaGraduationCap />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-800 text-sm truncate">
                      {item.title}
                    </p>
                    <p className="text-[10px] text-gray-500">
                      <span className="uppercase font-bold">{item.type}</span>
                      {item.batch && <> • {item.batch}</>}
                      {item.date && (
                        <> • {new Date(item.date).toLocaleDateString()}</>
                      )}
                    </p>
                  </div>
                  <span className="text-gray-400 flex-shrink-0 text-xs">
                    🔒
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// ==========================================
// Reusable: Info Item
// ==========================================
const InfoItem = ({ icon, label, value }) => (
  <div className="flex items-center gap-3 px-4 py-3 border-b border-r border-gray-100">
    <div className="w-8 h-8 rounded-lg bg-[#e6f7f9] text-[#00ADD2] flex items-center justify-center flex-shrink-0 text-xs">
      {icon}
    </div>
    <div className="min-w-0 flex-1">
      <p className="text-[10px] text-gray-500 uppercase font-bold">{label}</p>
      <p className="text-sm font-semibold text-gray-800 truncate">
        {value || "N/A"}
      </p>
    </div>
  </div>
);

export default StudentAcademic;
