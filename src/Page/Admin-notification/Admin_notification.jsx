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
  FaCalendarAlt,
  FaBook,
  FaChartLine,
  FaUserTimes,
  FaDatabase,
  FaEye,
  FaTrash,
  FaSync,
  FaArrowRight,
  FaLayerGroup,
  FaCalendarCheck,
  FaCheckCircle,
} from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { FiMenu, FiX } from "react-icons/fi";

const API_BASE = "https://api.tarbiyahonline.com/api";

const Admin_notification = () => {
  const { user, logOut } = useAuth();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState("notification");
  const [activeSubMenu, setActiveSubMenu] = useState(null);
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const [adminInfo, setAdminInfo] = useState({
    name: "",
    email: "",
    phone: "",
    designation: "",
    department: "",
    joinDate: "",
  });

  // Load admin info
  useEffect(() => {
    const savedAdmin = localStorage.getItem("adminInfo");
    if (savedAdmin) {
      setAdminInfo(JSON.parse(savedAdmin));
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

  const fetchTickets = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE}/support/tickets`);
      const data = await response.json();
      if (data.success) setTickets(data.tickets);
    } catch (error) {
      console.error("Error fetching tickets:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTickets();
    const interval = setInterval(fetchTickets, 30000);
    return () => clearInterval(interval);
  }, []);

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

  const markAsRead = async (id) => {
    await fetch(`${API_BASE}/support/ticket/${id}/read`, { method: "PUT" });
    setTickets(tickets.map((t) => (t._id === id ? { ...t, isRead: true } : t)));
  };

  const deleteTicket = async (id) => {
    const result = await Swal.fire({
      title: "Delete this ticket?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });
    if (result.isConfirmed) {
      await fetch(`${API_BASE}/support/ticket/${id}`, { method: "DELETE" });
      setTickets(tickets.filter((t) => t._id !== id));
    }
  };

  const viewTicket = (ticket) => {
    Swal.fire({
      title: `📋 Support Ticket: ${ticket.subject}`,
      html: `
        <div style="text-align: left; font-size: 13px; max-height: 500px; overflow-y: auto;">
          <p><strong>নাম:</strong> ${ticket.name}</p>
          <p><strong>ফোন:</strong> ${ticket.phone}</p>
          <p><strong>ইমেইল:</strong> ${ticket.email}</p>
          <p><strong>ডিপার্টমেন্ট:</strong> ${ticket.department}</p>
          <hr>
          <p><strong>সমস্যা বিবরণ:</strong></p>
          <p style="background: #f3f4f6; padding: 10px; border-radius: 8px;">${ticket.problemDetails}</p>
          <hr>
          <div style="margin-top: 15px;">
             <p><strong>📝 আপনার রিপ্লাই লিখুন:</strong></p>
             <textarea id="swal-reply-input" class="swal2-textarea" placeholder="এখানে রিপ্লাই লিখুন..."></textarea>
          </div>
        </div>
      `,
      width: 700,
      showCancelButton: true,
      confirmButtonText: "রিপ্লাই পাঠান",
      cancelButtonText: "বন্ধ করুন",
      preConfirm: async () => {
        const replyMessage = document.getElementById("swal-reply-input").value;
        if (!replyMessage.trim()) {
          Swal.showValidationMessage("রিপ্লাই লিখুন");
          return false;
        }
        try {
          const response = await fetch(
            `${API_BASE}/support/ticket/${ticket._id}/reply`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ message: replyMessage }),
            },
          );
          const data = await response.json();
          if (data.success) {
            setTickets((prev) =>
              prev.map((t) =>
                t._id === ticket._id
                  ? {
                      ...t,
                      status: "In Progress",
                      replies: data.ticket.replies,
                    }
                  : t,
              ),
            );
            return true;
          } else {
            Swal.showValidationMessage(data.message || "রিপ্লাই যায়নি!");
            return false;
          }
        } catch (error) {
          Swal.showValidationMessage("সার্ভার এরর!");
          return false;
        }
      },
    }).then((result) => {
      if (result.isConfirmed)
        Swal.fire({
          icon: "success",
          title: "রিপ্লাই পাঠানো হয়েছে!",
          timer: 1500,
          showConfirmButton: false,
        });
    });
  };

  const menuItems = [
    {
      id: "profile",
      path: "/admin-profile",
      icon: <FaUser className="text-xl" />,
      label: "Profile",
    },
    {
      id: "notification",
      icon: <FaBell className="text-xl" />,
      label: "Notification",
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
          id: "basic-tazweed payment overview",
          path: "/admin-dashboard/basic-tazweed",
          label: "Basic Tazweed Payment Overview",
        },
        {
          id: "najera-payment overview",
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

  const filteredTickets = tickets
    .filter((t) =>
      filter === "all" ? true : filter === "unread" ? !t.isRead : t.isRead,
    )
    .filter((t) => (statusFilter === "all" ? true : t.status === statusFilter));

  const unreadCount = tickets.filter((t) => !t.isRead).length;

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
          className={`
            fixed md:relative z-50 w-72 md:w-64 bg-white border-r border-gray-200 
            shadow-lg md:shadow-sm transition-all duration-300 ease-in-out
            h-full overflow-hidden flex-shrink-0
            ${isSidebarOpen ? "left-0" : "-left-72 md:left-0"}
          `}
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

          <nav className="p-3 space-y-1 overflow-hidden h-[calc(100vh-180px)]">
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
                        className={`transition-transform ${activeSubMenu === item.id ? "rotate-180" : ""}`}
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
                    to={item.path}
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

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-6 w-full overflow-hidden">
          {/* Top Bar */}
          <div className="bg-white p-3 rounded-xl shadow-sm border border-gray-200 mb-3 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
            <div>
              <h1 className="text-base font-bold text-gray-800 flex items-center gap-2">
                <FaBell className="text-yellow-600" /> Support Notifications
              </h1>
              <p className="text-xs text-gray-500">
                Manage student support tickets
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

          {/* Header with Stats */}
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-3 mb-3 flex flex-col md:flex-row justify-between items-start md:items-center gap-2">
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-base font-bold text-gray-800 flex items-center gap-2">
                <FaBell className="text-yellow-600" /> Support Tickets
                {unreadCount > 0 && (
                  <span className="bg-red-500 text-white text-[10px] px-2 py-1 rounded-full animate-pulse">
                    {unreadCount} New
                  </span>
                )}
              </h2>
            </div>
            <div className="flex gap-2 flex-wrap">
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="px-2 py-1 border rounded-lg text-xs focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Tickets</option>
                <option value="unread">Unread ({unreadCount})</option>
                <option value="read">Read</option>
              </select>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-2 py-1 border rounded-lg text-xs focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Status</option>
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Resolved">Resolved</option>
                <option value="Closed">Closed</option>
              </select>
              <button
                onClick={fetchTickets}
                disabled={loading}
                className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 disabled:opacity-50"
              >
                <FaSync size={12} className={loading ? "animate-spin" : ""} />{" "}
                Refresh
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden h-[calc(100vh-250px)]">
            {loading ? (
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <FaSync
                    size={32}
                    className="animate-spin text-blue-600 mx-auto mb-3"
                  />
                  <p className="text-sm text-gray-500">Loading tickets...</p>
                </div>
              </div>
            ) : filteredTickets.length === 0 ? (
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <FaBell className="text-5xl text-gray-300 mx-auto mb-3" />
                  <h3 className="text-base font-bold text-gray-800 mb-0.5">
                    No Tickets Found
                  </h3>
                  <p className="text-xs text-gray-500">
                    Try adjusting your search criteria
                  </p>
                </div>
              </div>
            ) : (
              <div className="overflow-auto h-full">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200 sticky top-0 z-10">
                    <tr>
                      <th className="px-3 py-2 text-left text-[10px] font-bold text-gray-600 uppercase">
                        Student
                      </th>
                      <th className="px-3 py-2 text-left text-[10px] font-bold text-gray-600 uppercase">
                        Department
                      </th>
                      <th className="px-3 py-2 text-left text-[10px] font-bold text-gray-600 uppercase">
                        Subject
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
                    {filteredTickets.map((ticket) => (
                      <tr
                        key={ticket._id}
                        className={`hover:bg-gray-50 transition-colors ${!ticket.isRead ? "bg-blue-50/30" : ""}`}
                      >
                        <td className="px-3 py-2">
                          <p className="text-xs font-medium text-gray-800">
                            {ticket.name}
                          </p>
                          <p className="text-[10px] text-gray-500">
                            {ticket.phone}
                          </p>
                        </td>
                        <td className="px-3 py-2 text-xs text-gray-600">
                          {ticket.department}
                        </td>
                        <td className="px-3 py-2 text-xs text-gray-600">
                          {ticket.subject}
                        </td>
                        <td className="px-3 py-2">
                          <span
                            className={`text-[8px] px-1.5 py-0.5 rounded-full ${
                              ticket.status === "Pending"
                                ? "bg-yellow-100 text-yellow-700"
                                : ticket.status === "In Progress"
                                  ? "bg-blue-100 text-blue-700"
                                  : ticket.status === "Resolved"
                                    ? "bg-green-100 text-green-700"
                                    : "bg-gray-100 text-gray-700"
                            }`}
                          >
                            {ticket.status}
                          </span>
                        </td>
                        <td className="px-3 py-2">
                          <div className="flex gap-1">
                            <button
                              onClick={() => {
                                viewTicket(ticket);
                                if (!ticket.isRead) markAsRead(ticket._id);
                              }}
                              className="text-blue-600 hover:bg-blue-50 p-1 rounded"
                              title="View/Reply"
                            >
                              <FaEye size={14} />
                            </button>
                            <button
                              onClick={() => deleteTicket(ticket._id)}
                              className="text-red-600 hover:bg-red-50 p-1 rounded"
                              title="Delete"
                            >
                              <FaTrash size={14} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Admin_notification;
