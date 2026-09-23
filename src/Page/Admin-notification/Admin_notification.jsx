// src/Page/Admin-notification/Admin_notification.jsx
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../Provider/AuthProvider";
import Swal from "sweetalert2";
import {
  FaUser,
  FaUsers,
  FaChalkboardTeacher,
  FaMoneyBillWave,
  FaSignOutAlt,
  FaBell,
  FaChartLine,
  FaUserTimes,
  FaDatabase,
  FaEye,
  FaTrash,
  FaSync,
  FaArrowRight,
  FaLayerGroup,
  FaCalendarCheck,
  FaUserPlus,
} from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { FiMenu, FiX } from "react-icons/fi";

const API_BASE = "https://api.tarbiyahonline.com/api";

// ============================================================
// ✅ ELDERS COURSE CHECK
// শুধু এই ৪টি course এর student notification এ আসবে:
// Qaida Nuraniyah, Quran Nazera, Bakarah Hifz, Basic Tajweed (Level-1)
// ============================================================
const ELDERS_COURSES = [
  "qaida nuraniyah",
  "qaida nooraniya",
  "qaida noorani",
  "qaida nurani",
  "qaidah nuraniyah",
  "qaidah nooraniya",
  "qaidah noorani",
  "quran nazera",
  "nazera quran",
  "quran najera",
  "najera quran",
  "bakarah hifz",
  "bakara hifz",
  "baqarah hifz",
  "baqara hifz",
  "basic tajweed (level-1)",
  "basic tajweed (level 1)",
  "basic tajweed level-1",
  "basic tajweed level 1",
  "basic tajweed",
];

const isSingleEldersCourse = (singleCourse) => {
  const p = String(singleCourse).toLowerCase().trim();
  if (!p) return false;

  return ELDERS_COURSES.some((c) => {
    if (p === c) return true;
    if (p.includes(c)) return true;
    if (c.includes(p) && p.length >= 8) return true;
    return false;
  });
};

const isEldersCourse = (courseStr) => {
  if (!courseStr) return false;
  const parts = String(courseStr)
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  if (parts.length === 0) return false;
  return parts.every((part) => isSingleEldersCourse(part));
};

const Admin_notification = () => {
  const { user, logOut } = useAuth();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState("notification");
  const [activeSubMenu, setActiveSubMenu] = useState(null);

  const [admissions, setAdmissions] = useState([]);
  const [loading, setLoading] = useState(true);

  const [readFilter, setReadFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const [adminInfo, setAdminInfo] = useState({
    name: "",
    email: "",
    phone: "",
    designation: "",
    department: "",
    joinDate: "",
  });

  // ============================================================
  // Load admin info
  // ============================================================
  useEffect(() => {
    const savedAdmin = localStorage.getItem("adminInfo");
    if (savedAdmin) {
      try {
        setAdminInfo(JSON.parse(savedAdmin));
      } catch (err) {
        console.error(err);
      }
    } else {
      setAdminInfo({
        name: user?.displayName || "Admin",
        email: user?.email || "admin@tarabiyah.com",
        phone: "01700000000",
        designation: "Administrator",
        department: "Administration",
        joinDate: "January 2024",
      });
    }
  }, [user]);

  // ============================================================
  // ✅ Fetch only Elders course admission students
  // ============================================================
  const fetchAdmissions = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_BASE}/students/all`);
      const data = await res.json();

      if (data.success) {
        const all = data.students || [];

        // শুধু pure elders course এর student
        const elders = all.filter((s) => isEldersCourse(s.course));

        console.log("📥 Total students:", all.length);
        console.log("✅ Elders filtered:", elders.length);
        elders.forEach((s) => console.log("   →", s.name, "|", s.course));

        const notifs = elders.map((s) => ({
          _id: s._id,
          name: s.name || "",
          phone: s.phone || "",
          email: s.email || "",
          course: s.course || "",
          fatherName: s.fatherName || "",
          motherName: s.motherName || "",
          guardianName: s.guardianName || s.fatherName || "",
          guardianPhone: s.guardianPhone || "",
          presentAddress: s.presentAddress || s.address || "",
          permanentAddress: s.permanentAddress || "",
          dobOrNid: s.dobOrNid || "",
          age: s.age || "",
          gender: s.gender || "",
          occupation: s.occupation || "",
          maritalStatus: s.maritalStatus || "",
          paidAmount: s.paidAmount || 0,
          paymentStatus: s.paymentStatus || "Unpaid",
          paymentMethod: s.paymentMethod || "",
          transactionId: s.transactionId || "",
          rawStatus: s.status || "Pending",
          createdAt: s.createdAt || "",
          admissionDate: s.admissionDate || "",
          uiStatus:
            s.status === "Active"
              ? "Approved"
              : s.status === "Inactive"
                ? "Rejected"
                : "Pending",
          isRead: s.status === "Active" || s.status === "Inactive",
        }));

        // নতুন আগে
        notifs.sort(
          (a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0),
        );

        setAdmissions(notifs);
      }
    } catch (error) {
      console.error("Error fetching admissions:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdmissions();
    const interval = setInterval(fetchAdmissions, 30000);
    return () => clearInterval(interval);
  }, []);

  // ============================================================
  // Logout
  // ============================================================
  const handleLogout = async () => {
    try {
      await logOut();
      localStorage.removeItem("isAdminLoggedIn");
      localStorage.removeItem("adminEmail");
      await Swal.fire({
        icon: "success",
        title: "Logged Out Successfully",
        timer: 1200,
        showConfirmButton: false,
      });
      navigate("/admin-login");
    } catch (err) {
      Swal.fire({ icon: "error", title: "Logout Failed" });
    }
  };

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const toggleSubMenu = (menu) =>
    setActiveSubMenu(activeSubMenu === menu ? null : menu);

  // ============================================================
  // View Admission Modal
  // ============================================================
  const viewAdmission = (adm) => {
    Swal.fire({
      title: `🎓 Admission: ${adm.name}`,
      html: `
        <div style="text-align: left; font-size: 13px; max-height: 500px; overflow-y: auto;">
          <div style="background:#e6f7f9; padding:12px; border-radius:8px; border-left:4px solid #00ADD2; margin-bottom:10px;">
            <p style="margin:0;"><strong>🎓 Course:</strong> ${adm.course}</p>
            <p style="margin:5px 0 0 0;"><strong>📌 Status:</strong> 
              <span style="color:${
                adm.uiStatus === "Approved"
                  ? "#16a34a"
                  : adm.uiStatus === "Rejected"
                    ? "#dc2626"
                    : "#eab308"
              }; font-weight:bold;">${adm.uiStatus}</span>
            </p>
          </div>
          <p><strong>👤 নাম:</strong> ${adm.name}</p>
          <p><strong>📞 ফোন:</strong> ${adm.phone}</p>
          <p><strong>✉️ ইমেইল:</strong> ${adm.email || "N/A"}</p>
          <p><strong>👨 পিতা:</strong> ${adm.fatherName || "N/A"}</p>
          <p><strong>👩 মাতা:</strong> ${adm.motherName || "N/A"}</p>
          <p><strong>👨 অভিভাবক:</strong> ${adm.guardianName || "N/A"}</p>
          <p><strong>📱 অভিভাবক ফোন:</strong> ${adm.guardianPhone || "N/A"}</p>
          <p><strong>🎂 বয়স:</strong> ${adm.age || "N/A"}</p>
          <p><strong>⚧ লিঙ্গ:</strong> ${adm.gender || "N/A"}</p>
          <p><strong>🏠 ঠিকানা:</strong> ${adm.presentAddress || "N/A"}</p>
          <hr>
          <h4 style="color:#004d4d; margin-bottom:5px;">💳 Payment Info</h4>
          <p><strong>Status:</strong> ${adm.paymentStatus}</p>
          <p><strong>Paid:</strong> ৳${Number(adm.paidAmount || 0).toLocaleString()}</p>
          <p><strong>Method:</strong> ${adm.paymentMethod || "N/A"}</p>
          <p><strong>Transaction ID:</strong> ${adm.transactionId || "N/A"}</p>
          <hr>
          <p style="font-size:11px; color:#666;">
            📅 Applied: ${
              adm.createdAt ? new Date(adm.createdAt).toLocaleString() : "N/A"
            }
          </p>
        </div>
      `,
      width: 700,
      showCancelButton: true,
      showConfirmButton: adm.uiStatus === "Pending",
      confirmButtonText: "✅ Approve Student",
      confirmButtonColor: "#16a34a",
      cancelButtonText: "বন্ধ করুন",
      preConfirm: async () => {
        try {
          const res = await fetch(
            `${API_BASE}/admin-students/update/${adm._id}`,
            {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ status: "Active" }),
            },
          );
          const data = await res.json();
          if (data.success) {
            setAdmissions((prev) =>
              prev.map((n) =>
                n._id === adm._id
                  ? { ...n, uiStatus: "Approved", isRead: true }
                  : n,
              ),
            );
            return true;
          }
          Swal.showValidationMessage(data.message || "Approve failed");
          return false;
        } catch (err) {
          Swal.showValidationMessage("সার্ভার এরর!");
          return false;
        }
      },
    }).then((result) => {
      if (result.isConfirmed)
        Swal.fire({
          icon: "success",
          title: "✅ Student Approved!",
          timer: 1500,
          showConfirmButton: false,
        });
    });
  };

  // ============================================================
  // Delete Admission (student record)
  // ============================================================
  const deleteAdmission = async (id, name) => {
    const result = await Swal.fire({
      title: `Delete ${name}?`,
      text: "This will permanently delete the student record!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });
    if (result.isConfirmed) {
      try {
        const res = await fetch(`${API_BASE}/admin-students/delete/${id}`, {
          method: "DELETE",
        });
        const data = await res.json();
        if (data.success) {
          setAdmissions((prev) => prev.filter((n) => n._id !== id));
          Swal.fire({
            icon: "success",
            title: "Deleted!",
            timer: 1200,
            showConfirmButton: false,
          });
        }
      } catch (err) {
        Swal.fire({ icon: "error", title: "Error", text: err.message });
      }
    }
  };

  // ============================================================
  // Sidebar Menu
  // ============================================================
  const menuItems = [
    {
      id: "profile",
      path: "/admin-profile",
      icon: <FaUser className="text-xl" />,
      label: "Profile",
    },
    {
      id: "dashboard",
      path: "/admin-dashboard",
      icon: <MdDashboard className="text-xl" />,
      label: "Dashboard",
      subItems: [
        {
          id: "department",
          path: "/admin-dashboard/department",
          label: "Department",
        },
        {
          id: "today-class",
          path: "/admin-dashboard/today-class",
          label: "Today's Class",
        },
        {
          id: "basic-tazweed",
          path: "/admin-dashboard/basic-tazweed",
          label: "Basic Tazweed Payment Overview",
        },
        {
          id: "najera-batch",
          path: "/admin-dashboard/najera-batch",
          label: "Najera Payment Overview",
        },
        {
          id: "new-admission",
          path: "/admin-dashboard/new-admission",
          label: "New Admission",
        },
        {
          id: "notification",
          path: "/admin-dashboard/notification",
          label: "Notification",
        },
      ],
    },
    {
      id: "student-management",
      path: "/admin-students",
      icon: <FaUsers className="text-xl" />,
      label: "Student Management",
      subItems: [
        {
          id: "student-add",
          path: "/admin-students/add",
          label: "Student Add",
        },
        {
          id: "batch-manual",
          path: "/admin-students/batch",
          label: "Batch Maintain",
        },
        {
          id: "student-profile",
          path: "/admin-students/profile",
          label: "Student Profile",
        },
        {
          id: "admission-permission",
          path: "/admin-students/admission",
          label: "Admission Permission",
        },
      ],
    },
    {
      id: "teacher-management",
      path: "/admin-teachers",
      icon: <FaChalkboardTeacher className="text-xl" />,
      label: "Teacher Management",
      subItems: [
        {
          id: "teacher-assign",
          path: "/admin-teachers/assign",
          label: "Teacher Assign",
        },
        {
          id: "class-schedule",
          path: "/admin-teachers/schedule",
          label: "Class Schedule",
        },
        {
          id: "teacher-attendance",
          path: "/admin-teachers/attendance",
          label: "Teacher Attendance",
        },
        {
          id: "teacher-overview",
          path: "/admin-teachers/overview",
          label: "Teacher Overview",
        },
      ],
    },
    {
      id: "batch-course",
      path: "/admin-batch-course",
      icon: <FaLayerGroup className="text-xl" />,
      label: "Batch & Course",
      subItems: [
        {
          id: "batch-make",
          path: "/admin-batch-course/batch-make",
          label: "Batch Make",
        },
        {
          id: "course-make",
          path: "/admin-batch-course/course-make",
          label: "Course Make",
        },
        {
          id: "syllabus",
          path: "/admin-batch-course/syllabus",
          label: "Syllabus",
        },
        {
          id: "clear-routine",
          path: "/admin-batch-course/clear-routine",
          label: "Clear Routine",
        },
      ],
    },
    {
      id: "absence-student",
      path: "/admin-absence",
      icon: <FaUserTimes className="text-xl" />,
      label: "Absence Student Community",
    },
    {
      id: "finance",
      path: "/admin-finance",
      icon: <FaMoneyBillWave className="text-xl" />,
      label: "Finance",
      subItems: [
        {
          id: "admin-on-fee",
          path: "/admin-finance/admin-fee",
          label: "Admin on Fee",
        },
        {
          id: "monthly-fee",
          path: "/admin-finance/monthly-fee",
          label: "Monthly Fee",
        },
        { id: "invoice", path: "/admin-finance/invoice", label: "Invoice" },
        { id: "report", path: "/admin-finance/report", label: "Report" },
      ],
    },
    {
      id: "exam",
      path: "/admin-exam",
      icon: <FaCalendarCheck className="text-xl" />,
      label: "Exam",
      subItems: [
        { id: "exam-make", path: "/admin-exam/make", label: "Exam Make" },
        {
          id: "result-publish",
          path: "/admin-exam/result",
          label: "Result Publish",
        },
        {
          id: "certificate-permission",
          path: "/admin-exam/certificate",
          label: "Certificate Permission",
        },
        { id: "grad", path: "/admin-exam/grad", label: "Grad" },
        {
          id: "class-test",
          path: "/admin-exam/class-test",
          label: "Class Test",
        },
        {
          id: "mid-term",
          path: "/admin-exam/mid-term",
          label: "Mid Term Exam",
        },
        {
          id: "final-exam",
          path: "/admin-exam/final-exam",
          label: "Final Exam",
        },
      ],
    },
    {
      id: "report-analytics",
      path: "/admin-reports",
      icon: <FaChartLine className="text-xl" />,
      label: "Report & Analytics",
      subItems: [
        {
          id: "admission-report",
          path: "/admin-reports/admission",
          label: "Admission Report",
        },
        {
          id: "attendance-report",
          path: "/admin-reports/attendance",
          label: "Attendance Report",
        },
        { id: "income", path: "/admin-reports/income", label: "Income" },
      ],
    },
    {
      id: "crm-management",
      path: "/admin-crm",
      icon: <FaDatabase className="text-xl" />,
      label: "CRM Management",
      subItems: [
        {
          id: "data-entry",
          path: "/admin-crm/data-entry",
          label: "Data Entry",
        },
      ],
    },
    {
      id: "salary",
      path: "/admin-salary",
      icon: <FaMoneyBillWave className="text-xl" />,
      label: "Salary",
      subItems: [
        {
          id: "total-salary",
          path: "/admin-salary/total",
          label: "Total Salary",
        },
        { id: "due-salary", path: "/admin-salary/due", label: "Due Salary" },
      ],
    },
  ];

  // ============================================================
  // Filters
  // ============================================================
  const filteredAdmissions = admissions
    .filter((a) =>
      readFilter === "all"
        ? true
        : readFilter === "unread"
          ? !a.isRead
          : a.isRead,
    )
    .filter((a) =>
      statusFilter === "all" ? true : a.uiStatus === statusFilter,
    );

  const unreadCount = admissions.filter((a) => !a.isRead).length;
  const pendingCount = admissions.filter(
    (a) => a.uiStatus === "Pending",
  ).length;
  const approvedCount = admissions.filter(
    (a) => a.uiStatus === "Approved",
  ).length;
  const rejectedCount = admissions.filter(
    (a) => a.uiStatus === "Rejected",
  ).length;

  // ============================================================
  // Render
  // ============================================================
  return (
    <div className="h-screen flex flex-col bg-gray-50 overflow-hidden">
      <div className="flex flex-1 overflow-hidden relative">
        {/* Mobile Header */}
        <div className="md:hidden bg-white border-b border-gray-200 p-3 flex justify-between items-center w-full absolute top-0 left-0 z-40">
          <h1 className="text-sm font-bold text-gray-800">
            Admission Notifications
          </h1>
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {isSidebarOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>

        {/* Sidebar */}
        <aside
          className={`fixed md:relative z-50 w-72 md:w-64 bg-white border-r border-gray-200 shadow-lg md:shadow-sm transition-all duration-300 ease-in-out h-full overflow-hidden flex-shrink-0 ${
            isSidebarOpen ? "left-0" : "-left-72 md:left-0"
          }`}
        >
          <div className="p-4 bg-gradient-to-r from-[#004d4d] to-[#006666] text-white">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center overflow-hidden">
                {adminInfo.profileImage ? (
                  <img
                    src={adminInfo.profileImage}
                    alt="admin"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-xl font-bold">
                    {adminInfo.name?.charAt(0) || "A"}
                  </span>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-sm truncate">{adminInfo.name}</p>
                <p className="text-xs opacity-80 truncate">
                  {adminInfo.designation}
                </p>
              </div>
            </div>
          </div>

          <nav className="p-3 space-y-1 overflow-y-auto h-[calc(100vh-180px)]">
            {menuItems.map((item) => (
              <div key={item.id}>
                {item.subItems ? (
                  <>
                    <button
                      onClick={() => {
                        setActiveMenu(item.id);
                        toggleSubMenu(item.id);
                        setIsSidebarOpen(false);
                      }}
                      className={`w-full flex items-center justify-between gap-3 px-3 py-2.5 rounded-lg transition-all text-sm ${
                        activeMenu === item.id
                          ? "bg-teal-50 text-[#004d4d] font-bold shadow-sm"
                          : "text-gray-700 hover:bg-gray-50 hover:text-[#004d4d]"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-gray-600">{item.icon}</span>
                        <span>{item.label}</span>
                      </div>
                      <span
                        className={`transition-transform ${
                          activeSubMenu === item.id ? "rotate-180" : ""
                        }`}
                      >
                        <FaArrowRight size={12} />
                      </span>
                    </button>
                    {activeSubMenu === item.id && (
                      <div className="ml-6 space-y-1 mt-1">
                        {item.subItems.map((sub) => (
                          <Link
                            key={sub.id}
                            to={sub.path}
                            onClick={() => {
                              setActiveSubMenu(item.id);
                              setIsSidebarOpen(false);
                            }}
                            className="block w-full text-left px-3 py-1.5 rounded-lg text-xs text-gray-600 hover:bg-gray-50 hover:text-[#004d4d] transition-all"
                          >
                            {sub.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    to={item.path || "#"}
                    onClick={() => {
                      setActiveMenu(item.id);
                      setIsSidebarOpen(false);
                    }}
                  >
                    <button
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all text-sm ${
                        activeMenu === item.id
                          ? "bg-teal-50 text-[#004d4d] font-bold shadow-sm"
                          : "text-gray-700 hover:bg-gray-50 hover:text-[#004d4d]"
                      }`}
                    >
                      <span className="text-gray-600">{item.icon}</span>
                      <span>{item.label}</span>
                    </button>
                  </Link>
                )}
              </div>
            ))}

            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-red-600 hover:bg-red-50 transition-all mt-4 border-t border-gray-200 pt-4"
            >
              <FaSignOutAlt className="text-xl" />
              <span className="text-sm font-medium">Logout</span>
            </button>
          </nav>

          <div className="p-4 text-xs text-gray-400 border-t border-gray-100">
            <p>© 2026 Pipilika Soft</p>
          </div>
        </aside>

        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Main */}
        <main className="flex-1 p-4 md:p-6 w-full overflow-hidden flex flex-col">
          {/* Top Bar */}
          <div className="bg-white p-3 rounded-xl shadow-sm border border-gray-200 mb-3 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 flex-shrink-0">
            <div>
              <h1 className="text-base font-bold text-gray-800 flex items-center gap-2">
                <FaUserPlus className="text-teal-600" /> Admission Notifications
                — Quran for Elders
              </h1>
              <p className="text-xs text-gray-500">
                Qaida Nuraniyah • Quran Nazera • Bakarah Hifz • Basic Tajweed
                (Level-1)
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-gray-700 hidden sm:block">
                {adminInfo.name}
              </span>
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white text-[10px] px-3 py-1.5 rounded-lg font-bold transition-all shadow-sm"
              >
                Logout
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-3 flex-shrink-0">
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-2 text-center">
              <p className="text-lg font-bold text-blue-600">
                {admissions.length}
              </p>
              <p className="text-[10px] text-gray-500">Total</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-2 text-center">
              <p className="text-lg font-bold text-yellow-600">
                {pendingCount}
              </p>
              <p className="text-[10px] text-gray-500">Pending</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-2 text-center">
              <p className="text-lg font-bold text-green-600">
                {approvedCount}
              </p>
              <p className="text-[10px] text-gray-500">Approved</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-2 text-center">
              <p className="text-lg font-bold text-red-600">{rejectedCount}</p>
              <p className="text-[10px] text-gray-500">Rejected</p>
            </div>
          </div>

          {/* Filters */}
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-3 mb-3 flex flex-col md:flex-row justify-between items-start md:items-center gap-2 flex-shrink-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-bold text-gray-700">Filter:</span>
              <select
                value={readFilter}
                onChange={(e) => setReadFilter(e.target.value)}
                className="px-2 py-1 border rounded-lg text-xs"
              >
                <option value="all">All</option>
                <option value="unread">Unread ({unreadCount})</option>
                <option value="read">Read</option>
              </select>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-2 py-1 border rounded-lg text-xs"
              >
                <option value="all">All Status</option>
                <option value="Pending">Pending</option>
                <option value="Approved">Approved</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>
            <button
              onClick={fetchAdmissions}
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 disabled:opacity-50"
            >
              <FaSync size={12} className={loading ? "animate-spin" : ""} />{" "}
              Refresh
            </button>
          </div>

          {/* Table */}
          <div className="flex-1 overflow-hidden">
            {loading ? (
              <div className="bg-white border border-gray-200 rounded-xl h-full flex items-center justify-center">
                <div className="text-center">
                  <FaSync
                    size={32}
                    className="animate-spin text-blue-600 mx-auto mb-3"
                  />
                  <p className="text-sm text-gray-500">Loading admissions...</p>
                </div>
              </div>
            ) : (
              <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden h-full">
                <div className="overflow-auto h-full">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200 sticky top-0 z-10">
                      <tr>
                        <th className="px-3 py-2 text-left text-[10px] font-bold text-gray-600 uppercase">
                          Student
                        </th>
                        <th className="px-3 py-2 text-left text-[10px] font-bold text-gray-600 uppercase">
                          Course
                        </th>
                        <th className="px-3 py-2 text-left text-[10px] font-bold text-gray-600 uppercase">
                          Date
                        </th>
                        <th className="px-3 py-2 text-left text-[10px] font-bold text-gray-600 uppercase">
                          Payment
                        </th>
                        <th className="px-3 py-2 text-left text-[10px] font-bold text-gray-600 uppercase">
                          Status
                        </th>
                        <th className="px-3 py-2 text-left text-[10px] font-bold text-gray-600 uppercase">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {filteredAdmissions.map((adm) => (
                        <tr
                          key={adm._id}
                          className={`hover:bg-gray-50 transition-colors ${
                            !adm.isRead ? "bg-teal-50/40" : ""
                          }`}
                        >
                          <td className="px-3 py-2">
                            <p className="text-xs font-medium text-gray-800">
                              {adm.name}
                              {!adm.isRead && (
                                <span className="ml-1 inline-block w-2 h-2 bg-red-500 rounded-full animate-pulse align-middle"></span>
                              )}
                            </p>
                            <p className="text-[10px] text-gray-500">
                              {adm.email || adm.phone}
                            </p>
                          </td>
                          <td className="px-3 py-2">
                            <p className="text-xs text-gray-700 max-w-[250px]">
                              {adm.course}
                            </p>
                          </td>
                          <td className="px-3 py-2 text-xs text-gray-600">
                            {adm.createdAt
                              ? new Date(adm.createdAt)
                                  .toISOString()
                                  .split("T")[0]
                              : "N/A"}
                          </td>
                          <td className="px-3 py-2">
                            <span
                              className={`text-[8px] px-1.5 py-0.5 rounded-full ${
                                adm.paymentStatus === "Paid"
                                  ? "bg-green-100 text-green-700"
                                  : adm.paymentStatus === "Partial"
                                    ? "bg-yellow-100 text-yellow-700"
                                    : "bg-red-100 text-red-700"
                              }`}
                            >
                              {adm.paymentStatus}
                            </span>
                          </td>
                          <td className="px-3 py-2">
                            <span
                              className={`text-[8px] px-1.5 py-0.5 rounded-full ${
                                adm.uiStatus === "Approved"
                                  ? "bg-green-100 text-green-700"
                                  : adm.uiStatus === "Rejected"
                                    ? "bg-red-100 text-red-700"
                                    : "bg-yellow-100 text-yellow-700 animate-pulse"
                              }`}
                            >
                              {adm.uiStatus}
                            </span>
                          </td>
                          <td className="px-3 py-2">
                            <div className="flex gap-1">
                              <button
                                onClick={() => viewAdmission(adm)}
                                className="text-teal-600 hover:bg-teal-50 p-1 rounded"
                                title="View / Approve"
                              >
                                <FaEye size={14} />
                              </button>
                              <button
                                onClick={() =>
                                  deleteAdmission(adm._id, adm.name)
                                }
                                className="text-red-600 hover:bg-red-50 p-1 rounded"
                                title="Delete"
                              >
                                <FaTrash size={14} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}

                      {filteredAdmissions.length === 0 && (
                        <tr>
                          <td colSpan="6" className="p-10 text-center">
                            <FaUserPlus className="text-5xl text-gray-300 mx-auto mb-3" />
                            <h3 className="text-base font-bold text-gray-800 mb-0.5">
                              No Admission Notifications
                            </h3>
                            <p className="text-xs text-gray-500">
                              Qaida Nuraniyah, Quran Nazera, Bakarah Hifz, Basic
                              Tajweed (Level-1) — এই ৪টি কোর্সে এখনো কোনো নতুন
                              ভর্তি হয়নি।
                            </p>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Admin_notification;
