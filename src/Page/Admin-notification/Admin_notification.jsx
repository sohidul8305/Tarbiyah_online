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
  FaDatabase,
  FaEye,
  FaTrash,
  FaSync,
  FaArrowRight,
  FaCalendarCheck,
  FaUserPlus,
  FaPaperPlane,
  FaHeadset,
  FaTimes,
  FaBuilding,
  FaLock,
} from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { FiMenu, FiX } from "react-icons/fi";

const API_BASE = "https://api.tarbiyahonline.com/api";

// ============================================================
// ✅ Department → Support form department mapping
// ============================================================
const SUPPORT_DEPT_MAP = {
  Elders: [
    "quran for elder",
    "quran for elders",
    "basic tajweed",
    "quran nazera",
    "qaida",
    "najera",
    "bakarah",
  ],
  "Quran Studies": ["quran studies", "quran study", "hifzul quran"],
  Alimiya: ["allimiyah", "alimiya", "alimiyyah", "dawra", "tafsir", "fiqh"],
  Diploma: ["diploma"],
};

// ✅ Check if a support ticket belongs to admin's department
const ticketMatchesDepartment = (ticket, adminDept) => {
  if (!adminDept || adminDept === "All") return true;

  const keywords = SUPPORT_DEPT_MAP[adminDept];
  if (!keywords) return false;

  const ticketDept = String(ticket.department || "")
    .toLowerCase()
    .trim();
  if (!ticketDept) return false;

  return keywords.some(
    (kw) => ticketDept.includes(kw) || kw.includes(ticketDept),
  );
};

const Admin_notification = () => {
  const { user, logOut } = useAuth();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState("notification");
  const [activeSubMenu, setActiveSubMenu] = useState(null);

  // ✅ Current admin's department
  const [adminDepartment, setAdminDepartment] = useState("");

  const [admissions, setAdmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sourceFilter, setSourceFilter] = useState("All");

  const [statusFilter, setStatusFilter] = useState("all");

  // ✅ Support Tickets State
  const [supportTickets, setSupportTickets] = useState([]);
  const [supportLoading, setSupportLoading] = useState(false);
  const [unreadSupportCount, setUnreadSupportCount] = useState(0);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [adminReplyText, setAdminReplyText] = useState("");
  const [sendingReply, setSendingReply] = useState(false);

  const [adminInfo, setAdminInfo] = useState({
    name: "",
    email: "",
    phone: "",
    designation: "",
    department: "",
    joinDate: "",
  });

  // ============================================================
  // ✅ Load admin info + department
  // ============================================================
  useEffect(() => {
    const savedAdmin = localStorage.getItem("adminInfo");
    const savedDept = localStorage.getItem("adminDepartment");

    if (savedAdmin) {
      try {
        const parsed = JSON.parse(savedAdmin);
        setAdminInfo(parsed);
        setAdminDepartment(parsed.department || savedDept || "");
      } catch (err) {
        console.error(err);
      }
    } else {
      const fallbackDept = savedDept || "Administration";
      setAdminInfo({
        name: user?.displayName || "Admin",
        email: user?.email || "admin@tarabiyah.com",
        phone: "01700000000",
        designation: "Administrator",
        department: fallbackDept,
        joinDate: "January 2024",
      });
      setAdminDepartment(fallbackDept);
    }
  }, [user]);

  // ============================================================
  // ✅ Fetch notifications — Tazweed + Najera (Elders only)
  // ============================================================
  const fetchAdmissions = async () => {
    // Guard: Tazweed + Najera শুধু Elders department
    if (!adminDepartment || adminDepartment !== "Elders") {
      console.log(
        `⛔ Skipping admissions fetch — admin is "${adminDepartment}"`,
      );
      setAdmissions([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);

      const [tazweedRes, najeraRes] = await Promise.allSettled([
        fetch(`${API_BASE}/basic-tazweed/all`),
        fetch(`${API_BASE}/najera-batch/all`),
      ]);

      let tazweedStudents = [];
      if (tazweedRes.status === "fulfilled") {
        try {
          const d = await tazweedRes.value.json();
          if (d.success && Array.isArray(d.students)) {
            tazweedStudents = d.students.map((s) => ({
              _id: s._id,
              source: "Tazweed",
              sourceLabel: "Basic Tazweed",
              name: s.name || "",
              phone: s.phone || "",
              email: "",
              course: "Basic Tajweed (Level-1)",
              fatherName: "",
              motherName: "",
              guardianName: "",
              guardianPhone: s.phone || "",
              presentAddress: "",
              permanentAddress: "",
              dobOrNid: "",
              age: "",
              gender: "",
              occupation: "",
              maritalStatus: "",
              studentId: s.studentId || "",
              country: s.country || "BD",
              paidAmount: s.paidAmount || 0,
              dueAmount: s.dueAmount || 0,
              courseFee: s.courseFee || 0,
              scholarshipAmount: s.scholarshipAmount || 0,
              paymentStatus:
                Number(s.dueAmount) === 0
                  ? "Paid"
                  : Number(s.paidAmount) > 0
                    ? "Partial"
                    : "Unpaid",
              paymentMethod: "",
              transactionId: s.transactionId || "",
              comments: s.comments || "",
              rawStatus: "Active",
              createdAt: s.createdAt || "",
              admissionDate: "",
              uiStatus: "Approved",
              isRead: true,
            }));
          }
        } catch (e) {
          console.error("Tazweed parse error:", e);
        }
      }

      let najeraStudents = [];
      if (najeraRes.status === "fulfilled") {
        try {
          const d = await najeraRes.value.json();
          if (d.success && Array.isArray(d.students)) {
            najeraStudents = d.students.map((s) => ({
              _id: s._id,
              source: "Najera",
              sourceLabel: "Najera Batch",
              name: s.name || "",
              phone: s.phone || "",
              email: "",
              course: "Quran Nazera",
              fatherName: "",
              motherName: "",
              guardianName: "",
              guardianPhone: s.phone || "",
              presentAddress: "",
              permanentAddress: "",
              dobOrNid: "",
              age: "",
              gender: "",
              occupation: "",
              maritalStatus: "",
              studentId: s.studentId || "",
              country: s.country || "BD",
              paidAmount: s.paidAmount || 0,
              dueAmount: s.dueAmount || 0,
              courseFee: s.courseFee || 0,
              scholarshipAmount: s.scholarshipAmount || 0,
              paymentStatus:
                Number(s.dueAmount) === 0
                  ? "Paid"
                  : Number(s.paidAmount) > 0
                    ? "Partial"
                    : "Unpaid",
              paymentMethod: "",
              transactionId: s.transactionId || "",
              comments: s.comments || "",
              rawStatus: "Active",
              createdAt: s.createdAt || "",
              admissionDate: "",
              uiStatus: "Approved",
              isRead: true,
            }));
          }
        } catch (e) {
          console.error("Najera parse error:", e);
        }
      }

      const combined = [...tazweedStudents, ...najeraStudents].sort((a, b) => {
        const da = new Date(a.createdAt || 0).getTime();
        const db = new Date(b.createdAt || 0).getTime();
        return db - da;
      });

      setAdmissions(combined);
      console.log(
        `✅ [${adminDepartment}] Loaded: ${tazweedStudents.length} tazweed + ${najeraStudents.length} najera`,
      );
    } catch (error) {
      console.error("Error fetching admissions:", error);
    } finally {
      setLoading(false);
    }
  };

  // ============================================================
  // ✅ Fetch Support Tickets — department filtered
  // ============================================================
  const fetchSupportTickets = async () => {
    if (!adminDepartment) return;

    try {
      setSupportLoading(true);
      const res = await fetch(`${API_BASE}/support/tickets`);
      const data = await res.json();

      if (data.success && Array.isArray(data.tickets)) {
        // ✅ Filter by admin's department
        const filtered = data.tickets.filter((t) =>
          ticketMatchesDepartment(t, adminDepartment),
        );

        console.log(
          `🎧 [${adminDepartment}] Support tickets: ${filtered.length}/${data.tickets.length}`,
        );

        setSupportTickets(filtered);
        setUnreadSupportCount(filtered.filter((t) => !t.isRead).length);
      } else {
        setSupportTickets([]);
        setUnreadSupportCount(0);
      }
    } catch (err) {
      console.error("Support fetch error:", err);
      setSupportTickets([]);
      setUnreadSupportCount(0);
    } finally {
      setSupportLoading(false);
    }
  };

  useEffect(() => {
    if (!adminDepartment) return;

    fetchAdmissions();
    fetchSupportTickets();

    const interval = setInterval(() => {
      fetchAdmissions();
      fetchSupportTickets();
    }, 30000);

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [adminDepartment]);

  // ============================================================
  // ✅ Send Admin Reply
  // ============================================================
  const sendAdminReply = async () => {
    if (!adminReplyText.trim() || !selectedTicket) return;
    setSendingReply(true);
    try {
      const res = await fetch(
        `${API_BASE}/support/ticket/${selectedTicket._id}/reply`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            message: adminReplyText,
            role: "admin",
          }),
        },
      );
      const data = await res.json();
      if (data.success) {
        setSelectedTicket(data.ticket);
        setAdminReplyText("");
        await fetchSupportTickets();
      } else {
        Swal.fire({ icon: "error", title: "Failed!", text: data.message });
      }
    } catch (err) {
      Swal.fire({ icon: "error", title: "Error", text: err.message });
    } finally {
      setSendingReply(false);
    }
  };

  // ============================================================
  // ✅ Update Ticket Status
  // ============================================================
  const updateTicketStatus = async (newStatus) => {
    if (!selectedTicket) return;
    try {
      const res = await fetch(
        `${API_BASE}/support/ticket/${selectedTicket._id}/status`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: newStatus }),
        },
      );
      const data = await res.json();
      if (data.success) {
        setSelectedTicket(data.ticket);
        await fetchSupportTickets();
      }
    } catch (err) {
      console.error(err);
    }
  };

  // ============================================================
  // ✅ Delete Support Ticket
  // ============================================================
  const deleteSupportTicket = async (id) => {
    const ok = await Swal.fire({
      title: "Delete this ticket?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Delete",
    });
    if (!ok.isConfirmed) return;
    try {
      const res = await fetch(`${API_BASE}/support/ticket/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) {
        setSupportTickets((prev) => prev.filter((t) => t._id !== id));
        if (selectedTicket?._id === id) setSelectedTicket(null);
        setUnreadSupportCount((c) => Math.max(0, c - 1));
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
  };

  // ============================================================
  // Logout
  // ============================================================
  const handleLogout = async () => {
    try {
      await logOut();
      localStorage.removeItem("isAdminLoggedIn");
      localStorage.removeItem("adminEmail");
      localStorage.removeItem("adminDepartment");
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
  // View Student Modal
  // ============================================================
  const viewAdmission = (adm) => {
    Swal.fire({
      title: `🎓 ${adm.name}`,
      html: `
        <div style="text-align: left; font-size: 13px; max-height: 500px; overflow-y: auto;">
          <div style="background:#e6f7f9; padding:12px; border-radius:8px; border-left:4px solid #00ADD2; margin-bottom:10px;">
            <p style="margin:0;"><strong>📌 Source:</strong> ${adm.sourceLabel}</p>
            <p style="margin:5px 0 0 0;"><strong>🎓 Course:</strong> ${adm.course}</p>
            ${
              adm.studentId
                ? `<p style="margin:5px 0 0 0;"><strong>🆔 Student ID:</strong> <span style="font-family:monospace;">${adm.studentId}</span></p>`
                : ""
            }
            ${
              adm.country
                ? `<p style="margin:5px 0 0 0;"><strong>🌍 Country:</strong> ${adm.country}</p>`
                : ""
            }
            <p style="margin:5px 0 0 0;"><strong>📌 Status:</strong> 
              <span style="color:#16a34a; font-weight:bold;">${adm.uiStatus}</span>
            </p>
          </div>
          <p><strong>👤 নাম:</strong> ${adm.name}</p>
          <p><strong>📞 ফোন:</strong> ${adm.phone}</p>
          <hr>
          <h4 style="color:#004d4d; margin-bottom:5px;">💳 Payment Info</h4>
          <p><strong>Payment Status:</strong> ${adm.paymentStatus}</p>
          <p><strong>Course Fee:</strong> ৳${Number(adm.courseFee || 0).toLocaleString()}</p>
          <p><strong>Scholarship:</strong> ৳${Number(adm.scholarshipAmount || 0).toLocaleString()}</p>
          <p><strong>Paid:</strong> ৳${Number(adm.paidAmount || 0).toLocaleString()}</p>
          <p><strong>Due:</strong> <span style="color:#dc2626;">৳${Number(adm.dueAmount || 0).toLocaleString()}</span></p>
          ${
            adm.transactionId
              ? `<p><strong>Transaction ID:</strong> ${adm.transactionId}</p>`
              : ""
          }
          ${
            adm.comments
              ? `<hr><h4 style="color:#004d4d; margin-bottom:5px;">💬 Comments</h4><p>${adm.comments}</p>`
              : ""
          }
          <hr>
          <p style="font-size:11px; color:#666;">
            📅 Added: ${
              adm.createdAt ? new Date(adm.createdAt).toLocaleString() : "N/A"
            }
          </p>
        </div>
      `,
      width: 700,
      showCancelButton: true,
      showConfirmButton: false,
      cancelButtonText: "বন্ধ করুন",
    });
  };

  const deleteAdmission = async (id, name, source) => {
    const result = await Swal.fire({
      title: `Delete ${name}?`,
      text: "This will permanently delete the student record!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });
    if (!result.isConfirmed) return;

    let deleteUrl = `${API_BASE}/admin-students/delete/${id}`;
    if (source === "Tazweed") {
      deleteUrl = `${API_BASE}/basic-tazweed/delete/${id}`;
    } else if (source === "Najera") {
      deleteUrl = `${API_BASE}/najera-batch/delete/${id}`;
    }

    try {
      const res = await fetch(deleteUrl, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        setAdmissions((prev) => prev.filter((n) => n._id !== id));
        Swal.fire({
          icon: "success",
          title: "Deleted!",
          timer: 1200,
          showConfirmButton: false,
        });
      } else {
        Swal.fire({ icon: "error", title: "Failed!", text: data.message });
      }
    } catch (err) {
      Swal.fire({ icon: "error", title: "Error", text: err.message });
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
          id: "batch-manual",
          path: "/admin-students/batch",
          label: "Batch Create and Maintain",
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
      ],
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
  ];

  // ============================================================
  // Filters
  // ============================================================
  const filteredAdmissions = admissions
    .filter((a) => (sourceFilter === "All" ? true : a.source === sourceFilter))
    .filter((a) =>
      statusFilter === "all" ? true : a.uiStatus === statusFilter,
    );

  const approvedCount = admissions.filter(
    (a) => a.uiStatus === "Approved",
  ).length;
  const totalPaid = admissions.reduce(
    (sum, a) => sum + (Number(a.paidAmount) || 0),
    0,
  );
  const totalDue = admissions.reduce(
    (sum, a) => sum + (Number(a.dueAmount) || 0),
    0,
  );

  const sourceCounts = {
    All: admissions.length,
    Tazweed: admissions.filter((a) => a.source === "Tazweed").length,
    Najera: admissions.filter((a) => a.source === "Najera").length,
  };

  const getSourceBadge = (source) => {
    switch (source) {
      case "Tazweed":
        return "bg-green-100 text-green-700";
      case "Najera":
        return "bg-purple-100 text-purple-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  // ✅ Permission check
  const isEldersDept = adminDepartment === "Elders";

  // ============================================================
  // Render
  // ============================================================
  return (
    <div className="h-screen flex flex-col bg-gray-50 overflow-hidden">
      <div className="flex flex-1 overflow-hidden relative">
        {/* Mobile Header */}
        <div className="md:hidden bg-white border-b border-gray-200 p-3 flex justify-between items-center w-full absolute top-0 left-0 z-40">
          <h1 className="text-sm font-bold text-gray-800">Notifications</h1>
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
                {adminDepartment && (
                  <p className="text-[10px] opacity-90 truncate mt-0.5 bg-white/20 px-1.5 py-0.5 rounded-full inline-block">
                    🏛️ {adminDepartment}
                  </p>
                )}
              </div>
            </div>
          </div>

          <nav className="p-3 space-y-1 overflow-y-auto h-[calc(100vh-140px)]">
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
                <FaBell className="text-teal-600" /> All Notifications
                {adminDepartment && (
                  <span className="bg-teal-100 text-teal-700 text-[10px] font-bold px-2 py-0.5 rounded-full">
                    {adminDepartment}
                  </span>
                )}
              </h1>
              <p className="text-xs text-gray-500">
                {isEldersDept
                  ? "Basic Tazweed + Najera Batch + Support Tickets"
                  : "Support Tickets only"}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-gray-700 hidden sm:block">
                {adminInfo.name}
              </span>
              <button
                onClick={() => {
                  fetchAdmissions();
                  fetchSupportTickets();
                }}
                disabled={loading || supportLoading}
                className="bg-blue-600 hover:bg-blue-700 text-white text-[10px] px-3 py-1.5 rounded-lg font-bold transition-all shadow-sm flex items-center gap-1 disabled:opacity-50"
              >
                <FaSync
                  size={10}
                  className={loading || supportLoading ? "animate-spin" : ""}
                />{" "}
                Refresh
              </button>
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white text-[10px] px-3 py-1.5 rounded-lg font-bold transition-all shadow-sm"
              >
                Logout
              </button>
            </div>
          </div>

          {/* ✅ Department Banner */}
          {adminDepartment && (
            <div className="bg-gradient-to-r from-[#004d4d] to-[#006666] text-white p-3 rounded-xl shadow-sm mb-3 flex items-center justify-between flex-shrink-0">
              <div>
                <p className="text-[10px] opacity-80">You are logged in as</p>
                <p className="text-sm font-bold">
                  {adminDepartment} Department Admin
                </p>
              </div>
              <span className="text-2xl">🏛️</span>
            </div>
          )}

          {/* ✅ Source Tabs — Tazweed/Najera only for Elders */}
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-1.5 mb-3 flex gap-1 overflow-x-auto flex-shrink-0">
            {isEldersDept && (
              <>
                {[
                  { id: "All", label: "All Students", color: "blue" },
                  { id: "Tazweed", label: "Basic Tazweed", color: "green" },
                  { id: "Najera", label: "Najera Batch", color: "purple" },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setSourceFilter(tab.id)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                      sourceFilter === tab.id
                        ? tab.color === "blue"
                          ? "bg-blue-50 text-blue-700 shadow-sm"
                          : tab.color === "green"
                            ? "bg-green-50 text-green-700 shadow-sm"
                            : "bg-purple-50 text-purple-700 shadow-sm"
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    {tab.label}
                    <span
                      className={`text-[10px] px-1.5 rounded-full ${
                        sourceFilter === tab.id
                          ? "bg-white text-gray-700"
                          : "bg-gray-200 text-gray-600"
                      }`}
                    >
                      {sourceCounts[tab.id]}
                    </span>
                  </button>
                ))}
              </>
            )}
            <button
              onClick={() => setSourceFilter("Support")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                sourceFilter === "Support"
                  ? "bg-orange-50 text-orange-700 shadow-sm"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              🎧 Support Tickets
              <span
                className={`text-[10px] px-1.5 rounded-full font-bold ${
                  sourceFilter === "Support"
                    ? "bg-white text-gray-700"
                    : unreadSupportCount > 0
                      ? "bg-red-500 text-white animate-pulse"
                      : "bg-gray-200 text-gray-600"
                }`}
              >
                {supportTickets.length}
              </span>
            </button>
          </div>

          {/* Stats — only for Student tabs */}
          {sourceFilter !== "Support" && isEldersDept && (
            <>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-3 flex-shrink-0">
                <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-2 text-center">
                  <p className="text-lg font-bold text-blue-600">
                    {sourceCounts[sourceFilter]}
                  </p>
                  <p className="text-[10px] text-gray-500">
                    {sourceFilter === "All" ? "Total" : sourceFilter}
                  </p>
                </div>
                <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-2 text-center">
                  <p className="text-lg font-bold text-green-600">
                    ৳{totalPaid.toLocaleString()}
                  </p>
                  <p className="text-[10px] text-gray-500">Total Paid</p>
                </div>
                <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-2 text-center">
                  <p className="text-lg font-bold text-red-600">
                    ৳{totalDue.toLocaleString()}
                  </p>
                  <p className="text-[10px] text-gray-500">Total Due</p>
                </div>
                <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-2 text-center">
                  <p className="text-lg font-bold text-teal-600">
                    {approvedCount}
                  </p>
                  <p className="text-[10px] text-gray-500">Active</p>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-3 mb-3 flex flex-col md:flex-row justify-between items-start md:items-center gap-2 flex-shrink-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs font-bold text-gray-700">
                    Filter:
                  </span>
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="px-2 py-1 border rounded-lg text-xs"
                  >
                    <option value="all">All Status</option>
                    <option value="Approved">Approved</option>
                    <option value="Pending">Pending</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                </div>
              </div>
            </>
          )}

          {/* Support Stats */}
          {sourceFilter === "Support" && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-3 flex-shrink-0">
              <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-2 text-center">
                <p className="text-lg font-bold text-orange-600">
                  {supportTickets.length}
                </p>
                <p className="text-[10px] text-gray-500">
                  {adminDepartment} Tickets
                </p>
              </div>
              <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-2 text-center">
                <p className="text-lg font-bold text-red-600">
                  {unreadSupportCount}
                </p>
                <p className="text-[10px] text-gray-500">Unread</p>
              </div>
              <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-2 text-center">
                <p className="text-lg font-bold text-yellow-600">
                  {supportTickets.filter((t) => t.status === "Pending").length}
                </p>
                <p className="text-[10px] text-gray-500">Pending</p>
              </div>
              <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-2 text-center">
                <p className="text-lg font-bold text-green-600">
                  {supportTickets.filter((t) => t.status === "Resolved").length}
                </p>
                <p className="text-[10px] text-gray-500">Resolved</p>
              </div>
            </div>
          )}

          {/* Main Content */}
          <div className="flex-1 overflow-hidden">
            {sourceFilter === "Support" ? (
              supportLoading ? (
                <div className="bg-white border rounded-xl h-full flex items-center justify-center">
                  <div className="text-center">
                    <FaSync className="animate-spin text-orange-600 text-3xl mx-auto mb-2" />
                    <p className="text-xs text-gray-500">
                      Loading your department tickets...
                    </p>
                  </div>
                </div>
              ) : (
                <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden h-full">
                  <div className="overflow-auto h-full">
                    <table className="w-full">
                      <thead className="bg-orange-50 border-b sticky top-0 z-10">
                        <tr>
                          <th className="px-3 py-2 text-left text-[10px] font-bold text-gray-600 uppercase">
                            Student
                          </th>
                          <th className="px-3 py-2 text-left text-[10px] font-bold text-gray-600 uppercase">
                            Subject
                          </th>
                          <th className="px-3 py-2 text-left text-[10px] font-bold text-gray-600 uppercase">
                            Dept
                          </th>
                          <th className="px-3 py-2 text-left text-[10px] font-bold text-gray-600 uppercase">
                            Priority
                          </th>
                          <th className="px-3 py-2 text-left text-[10px] font-bold text-gray-600 uppercase">
                            Status
                          </th>
                          <th className="px-3 py-2 text-center text-[10px] font-bold text-gray-600 uppercase">
                            Replies
                          </th>
                          <th className="px-3 py-2 text-center text-[10px] font-bold text-gray-600 uppercase">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {supportTickets.map((tk) => (
                          <tr
                            key={tk._id}
                            className={`hover:bg-gray-50 transition-colors ${
                              !tk.isRead ? "bg-red-50/40" : ""
                            }`}
                          >
                            <td className="px-3 py-2">
                              <div className="flex items-center gap-2">
                                {!tk.isRead && (
                                  <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse flex-shrink-0" />
                                )}
                                <div className="min-w-0">
                                  <p className="text-xs font-semibold text-gray-800 truncate">
                                    {tk.name}
                                  </p>
                                  <p className="text-[10px] text-gray-500 truncate">
                                    {tk.studentId || tk.phone}
                                  </p>
                                </div>
                              </div>
                            </td>
                            <td className="px-3 py-2 text-xs text-gray-700 max-w-[200px] truncate">
                              {tk.subject}
                            </td>
                            <td className="px-3 py-2 text-xs text-gray-600">
                              {tk.department}
                            </td>
                            <td className="px-3 py-2">
                              <span
                                className={`text-[9px] px-2 py-0.5 rounded-full font-bold ${
                                  tk.priority === "High"
                                    ? "bg-red-100 text-red-700"
                                    : tk.priority === "Low"
                                      ? "bg-gray-100 text-gray-700"
                                      : "bg-yellow-100 text-yellow-700"
                                }`}
                              >
                                {tk.priority || "Medium"}
                              </span>
                            </td>
                            <td className="px-3 py-2">
                              <span
                                className={`text-[9px] px-2 py-0.5 rounded-full font-bold ${
                                  tk.status === "Resolved"
                                    ? "bg-green-100 text-green-700"
                                    : tk.status === "In Progress"
                                      ? "bg-blue-100 text-blue-700"
                                      : tk.status === "Closed"
                                        ? "bg-gray-100 text-gray-700"
                                        : "bg-yellow-100 text-yellow-700"
                                }`}
                              >
                                {tk.status}
                              </span>
                            </td>
                            <td className="px-3 py-2 text-center text-xs font-bold text-blue-600">
                              {(tk.replies || []).length}
                            </td>
                            <td className="px-3 py-2">
                              <div className="flex justify-center gap-1">
                                <button
                                  onClick={() => setSelectedTicket(tk)}
                                  className="text-orange-600 hover:bg-orange-50 p-1 rounded"
                                  title="Open chat"
                                >
                                  <FaEye size={14} />
                                </button>
                                <button
                                  onClick={() => deleteSupportTicket(tk._id)}
                                  className="text-red-600 hover:bg-red-50 p-1 rounded"
                                  title="Delete"
                                >
                                  <FaTrash size={14} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                        {supportTickets.length === 0 && (
                          <tr>
                            <td colSpan="7" className="p-10 text-center">
                              <FaHeadset className="text-5xl text-gray-300 mx-auto mb-3" />
                              <p className="text-sm font-bold text-gray-700">
                                No support tickets in {adminDepartment}
                              </p>
                              <p className="text-[10px] text-gray-500 mt-1">
                                আপনার department এর কোনো ticket এখনো আসেনি
                              </p>
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              )
            ) : !isEldersDept ? (
              /* ✅ Non-Elders: Access Denied for Student tabs */
              <div className="bg-yellow-50 border-2 border-yellow-300 rounded-xl p-10 text-center h-full flex flex-col items-center justify-center">
                <FaLock className="text-6xl text-yellow-500 mb-4" />
                <h3 className="text-lg font-bold text-yellow-800 mb-2">
                  🔒 Student Notifications শুধু Elders Department এর জন্য
                </h3>
                <p className="text-sm text-yellow-700 mb-3">
                  আপনি এখন <strong>{adminDepartment}</strong> department এ লগইন
                  করেছেন।
                </p>
                <p className="text-xs text-yellow-600 mb-4">
                  Basic Tazweed এবং Najera batch শুধু Elders department এর অংশ।
                </p>
                <button
                  onClick={() => setSourceFilter("Support")}
                  className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg font-semibold text-sm"
                >
                  🎧 আপনার Support Tickets দেখুন
                </button>
              </div>
            ) : (
              /* Student Table — Elders only */
              <div className="h-full">
                {loading ? (
                  <div className="bg-white border border-gray-200 rounded-xl h-full flex items-center justify-center">
                    <div className="text-center">
                      <FaSync
                        size={32}
                        className="animate-spin text-blue-600 mx-auto mb-3"
                      />
                      <p className="text-sm text-gray-500">
                        Loading notifications...
                      </p>
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
                              Source
                            </th>
                            <th className="px-3 py-2 text-left text-[10px] font-bold text-gray-600 uppercase">
                              Course
                            </th>
                            <th className="px-3 py-2 text-left text-[10px] font-bold text-gray-600 uppercase">
                              Country
                            </th>
                            <th className="px-3 py-2 text-left text-[10px] font-bold text-gray-600 uppercase">
                              Payment
                            </th>
                            <th className="px-3 py-2 text-right text-[10px] font-bold text-gray-600 uppercase">
                              Paid
                            </th>
                            <th className="px-3 py-2 text-right text-[10px] font-bold text-gray-600 uppercase">
                              Due
                            </th>
                            <th className="px-3 py-2 text-center text-[10px] font-bold text-gray-600 uppercase">
                              Actions
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                          {filteredAdmissions.map((adm) => (
                            <tr
                              key={adm._id}
                              className="hover:bg-gray-50 transition-colors"
                            >
                              <td className="px-3 py-2">
                                <p className="text-xs font-medium text-gray-800">
                                  {adm.name}
                                </p>
                                <p className="text-[10px] text-gray-500">
                                  {adm.phone}
                                </p>
                                {adm.studentId && (
                                  <p className="text-[9px] text-blue-600 font-mono">
                                    ID: {adm.studentId}
                                  </p>
                                )}
                              </td>
                              <td className="px-3 py-2">
                                <span
                                  className={`text-[9px] px-1.5 py-0.5 rounded-full font-semibold ${getSourceBadge(
                                    adm.source,
                                  )}`}
                                >
                                  {adm.sourceLabel}
                                </span>
                              </td>
                              <td className="px-3 py-2">
                                <p className="text-xs text-gray-700 max-w-[180px]">
                                  {adm.course}
                                </p>
                              </td>
                              <td className="px-3 py-2">
                                <span className="bg-blue-100 text-blue-700 text-[9px] px-1.5 py-0.5 rounded-full">
                                  {adm.country || "BD"}
                                </span>
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
                              <td className="px-3 py-2 text-right text-xs font-semibold text-green-600">
                                ৳{Number(adm.paidAmount || 0).toLocaleString()}
                              </td>
                              <td
                                className={`px-3 py-2 text-right text-xs font-semibold ${
                                  Number(adm.dueAmount) > 0
                                    ? "text-red-600"
                                    : "text-gray-500"
                                }`}
                              >
                                ৳{Number(adm.dueAmount || 0).toLocaleString()}
                              </td>
                              <td className="px-3 py-2">
                                <div className="flex gap-1 justify-center">
                                  <button
                                    onClick={() => viewAdmission(adm)}
                                    className="text-teal-600 hover:bg-teal-50 p-1 rounded"
                                    title="View"
                                  >
                                    <FaEye size={14} />
                                  </button>
                                  <button
                                    onClick={() =>
                                      deleteAdmission(
                                        adm._id,
                                        adm.name,
                                        adm.source,
                                      )
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
                              <td colSpan="8" className="p-10 text-center">
                                <FaBell className="text-5xl text-gray-300 mx-auto mb-3" />
                                <h3 className="text-base font-bold text-gray-800 mb-0.5">
                                  No Students Found
                                </h3>
                                <p className="text-xs text-gray-500">
                                  Basic Tazweed বা Najera Batch থেকে student add
                                  করুন।
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
            )}
          </div>
        </main>
      </div>

      {/* Support Chat Modal */}
      {selectedTicket && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/60 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col">
            <div className="p-4 border-b flex justify-between items-center bg-orange-50 rounded-t-xl">
              <div className="min-w-0">
                <h3 className="font-bold text-gray-800 text-sm flex items-center gap-2 truncate">
                  <FaHeadset className="text-orange-600 flex-shrink-0" />
                  <span className="truncate">{selectedTicket.subject}</span>
                </h3>
                <p className="text-[10px] text-gray-500 mt-0.5 truncate">
                  Ticket #{selectedTicket._id} • {selectedTicket.name} •{" "}
                  {selectedTicket.phone} • Dept: {selectedTicket.department}
                </p>
              </div>
              <button
                onClick={() => {
                  setSelectedTicket(null);
                  setAdminReplyText("");
                }}
                className="text-gray-400 hover:text-gray-700 p-1 flex-shrink-0"
              >
                <FaTimes size={20} />
              </button>
            </div>

            <div className="px-4 py-2 flex items-center gap-2 border-b bg-gray-50 flex-wrap">
              <span
                className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                  selectedTicket.priority === "High"
                    ? "bg-red-100 text-red-700"
                    : selectedTicket.priority === "Low"
                      ? "bg-gray-200 text-gray-700"
                      : "bg-yellow-100 text-yellow-700"
                }`}
              >
                Priority: {selectedTicket.priority || "Medium"}
              </span>

              {selectedTicket.category && (
                <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-blue-100 text-blue-700">
                  {selectedTicket.category}
                </span>
              )}

              <select
                value={selectedTicket.status}
                onChange={(e) => updateTicketStatus(e.target.value)}
                className="text-[10px] border rounded px-2 py-0.5 font-bold"
              >
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Resolved">Resolved</option>
                <option value="Closed">Closed</option>
              </select>

              <span className="text-[10px] text-gray-500 ml-auto">
                {new Date(selectedTicket.createdAt).toLocaleString()}
              </span>
            </div>

            <div className="p-4 bg-blue-50 border-b">
              <p className="text-[10px] font-bold text-blue-700 mb-1">
                📝 Problem Details:
              </p>
              <p className="text-xs text-gray-700">
                {selectedTicket.problemDetails}
              </p>
              {selectedTicket.attachmentUrl && (
                <a
                  href={selectedTicket.attachmentUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[10px] text-blue-600 underline mt-1 inline-block"
                >
                  📎 View Attachment
                </a>
              )}
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
              {(selectedTicket.replies || []).length === 0 ? (
                <p className="text-xs text-gray-500 text-center py-6">
                  এখনো কোনো রিপ্লাই নেই — নিচে লিখে শুরু করুন
                </p>
              ) : (
                selectedTicket.replies.map((r, i) => (
                  <div
                    key={i}
                    className={`flex ${
                      r.role === "admin" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[80%] p-3 rounded-lg shadow-sm ${
                        r.role === "admin"
                          ? "bg-orange-100 border-l-4 border-orange-500"
                          : "bg-blue-100 border-l-4 border-blue-500"
                      }`}
                    >
                      <div className="flex justify-between items-center gap-4 mb-1">
                        <strong className="text-[10px]">
                          {r.role === "admin"
                            ? "👨‍💼 You (Admin)"
                            : `👤 ${selectedTicket.name}`}
                        </strong>
                        <span className="text-[9px] text-gray-500">
                          {r.date}
                        </span>
                      </div>
                      <p className="text-xs text-gray-800">{r.message}</p>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="p-3 border-t bg-white rounded-b-xl">
              <div className="flex gap-2">
                <textarea
                  value={adminReplyText}
                  onChange={(e) => setAdminReplyText(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      sendAdminReply();
                    }
                  }}
                  rows="2"
                  placeholder="আপনার রিপ্লাই লিখুন... (Enter = Send)"
                  className="flex-1 border rounded-lg px-3 py-2 text-xs focus:ring-2 focus:ring-orange-500 resize-none"
                />
                <button
                  onClick={sendAdminReply}
                  disabled={sendingReply || !adminReplyText.trim()}
                  className="bg-orange-600 hover:bg-orange-700 disabled:bg-gray-300 text-white px-4 rounded-lg font-bold text-xs flex items-center gap-1"
                >
                  <FaPaperPlane size={11} />
                  {sendingReply ? "..." : "Send"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin_notification;
