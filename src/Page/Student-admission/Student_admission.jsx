// src/Page/Admin/Student_admission.jsx
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
  FaChartLine,
  FaUserGraduate,
  FaUserPlus,
  FaCalendarCheck,
  FaIdCard,
  FaUserTimes,
  FaDatabase,
  FaEye,
  FaTrash,
  FaSearch,
  FaPlusCircle,
  FaCheckCircle,
  FaTimesCircle,
  FaArrowRight,
  FaLayerGroup,
  FaStar,
  FaHourglassHalf,
  FaCheckDouble,
  FaBan,
  FaSchool as FaSchoolIcon,
  FaInfoCircle,
  FaSyncAlt,
} from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { FiMenu, FiX } from "react-icons/fi";

const Student_admission = () => {
  const { user, logOut } = useAuth();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState("student-management");
  const [activeSubMenu, setActiveSubMenu] = useState("admission-permission");
  const [adminInfo, setAdminInfo] = useState({
    name: "",
    email: "",
    phone: "",
    designation: "",
    department: "",
    joinDate: "",
  });

  // ✅ Dynamic admission requests
  const [admissionRequests, setAdmissionRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [filterClass, setFilterClass] = useState("All");
  const [filterPriority, setFilterPriority] = useState("All");
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [rejectionReason, setRejectionReason] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  // ✅ Load admin info
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

  // ✅ Fetch students from API
  useEffect(() => {
    fetchAdmissions();
  }, []);

  const fetchAdmissions = async () => {
    try {
      setLoading(true);
      setFetchError(null);

      console.log("📡 Fetching students...");
      const res = await fetch("http://localhost:5000/api/students/all");
      const data = await res.json();
      console.log("📥 Response:", data);

      if (data.success) {
        const formatted = (data.students || []).map((s, idx) => {
          // Calculate priority based on payment
          let priority = "Medium";
          if (s.paymentStatus === "Paid") priority = "High";
          else if (s.paymentStatus === "Unpaid") priority = "Low";

          // Map DB status → display status
          let displayStatus = "Pending";
          if (s.status === "Active") displayStatus = "Approved";
          else if (s.status === "Rejected") displayStatus = "Rejected";
          else if (s.status === "Inactive") displayStatus = "Rejected";

          return {
            id: s._id,
            _id: s._id,
            studentName: s.name || "Unknown",
            fatherName: s.fatherName || s.guardianName || "N/A",
            motherName: s.motherName || "N/A",
            class: s.course || s.class || "N/A",
            subject: s.course || "N/A",
            phone: s.phone || "",
            email: s.email || "",
            address: s.presentAddress || s.permanentAddress || "N/A",
            dob: s.dobOrNid || "",
            gender: s.gender || "N/A",
            previousSchool: s.previousSchool || "N/A",
            admissionDate: s.admissionDate
              ? new Date(s.admissionDate).toISOString().split("T")[0]
              : "N/A",
            status: displayStatus,
            paymentStatus: s.paymentStatus || "Unpaid",
            priority: priority,
            notes: s.paymentRemarks || "No additional notes",
            appliedDate: s.createdAt
              ? new Date(s.createdAt).toISOString().split("T")[0]
              : "N/A",
            reviewedBy: s.approvedBy || null,
            reviewedDate: s.approvedAt
              ? new Date(s.approvedAt).toISOString().split("T")[0]
              : null,
            rejectionReason: s.rejectionReason || null,
            // Keep for approve
            username: s.username || "",
            enrolledCourses: s.enrolledCourses || [],
            paidAmount: s.paidAmount || 0,
            paymentMethod: s.paymentMethod || "",
            transactionId: s.transactionId || "",
            guardianPhone: s.guardianPhone || "",
            _raw: s,
          };
        });

        setAdmissionRequests(formatted);
        console.log(`✅ Loaded ${formatted.length} admission requests`);
      } else {
        setFetchError(data.message || "Failed to load students");
      }
    } catch (err) {
      console.error("❌ Fetch error:", err);
      setFetchError("সার্ভারে সংযোগ করা যায়নি!");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logOut();
      localStorage.removeItem("isAdminLoggedIn");
      localStorage.removeItem("adminInfo");
      localStorage.removeItem("adminEmail");

      await Swal.fire({
        icon: "success",
        title: "Logged Out Successfully",
        timer: 1200,
        showConfirmButton: false,
      });
      navigate("/admin-login");
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
  const toggleSubMenu = (menu) =>
    setActiveSubMenu(activeSubMenu === menu ? null : menu);

  // Sidebar Menu Items
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
          id: "payment-overview",
          path: "/admin-dashboard/payment-overview",
          label: "Payment Overview",
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

  // Filter
  const filteredRequests = admissionRequests.filter((request) => {
    const matchesSearch =
      (request.studentName || "")
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      (request.fatherName || "")
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      (request.email || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (request.phone || "").includes(searchTerm);

    const matchesStatus =
      filterStatus === "All" || request.status === filterStatus;
    const matchesClass = filterClass === "All" || request.class === filterClass;
    const matchesPriority =
      filterPriority === "All" || request.priority === filterPriority;

    return matchesSearch && matchesStatus && matchesClass && matchesPriority;
  });

  const uniqueClasses = [
    "All",
    ...new Set(admissionRequests.map((r) => r.class).filter(Boolean)),
  ];
  const uniqueStatuses = [
    "All",
    ...new Set(admissionRequests.map((r) => r.status).filter(Boolean)),
  ];
  const uniquePriorities = [
    "All",
    ...new Set(admissionRequests.map((r) => r.priority).filter(Boolean)),
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-100 text-yellow-700";
      case "Approved":
        return "bg-green-100 text-green-700";
      case "Rejected":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "Pending":
        return <FaHourglassHalf className="text-yellow-500" />;
      case "Approved":
        return <FaCheckCircle className="text-green-500" />;
      case "Rejected":
        return <FaTimesCircle className="text-red-500" />;
      default:
        return null;
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "High":
        return "bg-red-100 text-red-700";
      case "Medium":
        return "bg-yellow-100 text-yellow-700";
      case "Low":
        return "bg-green-100 text-green-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const openDetailsModal = (request) => {
    setSelectedRequest(request);
    setShowDetailsModal(true);
  };

  // ✅ Approve — backend API call
  const handleApprove = async (request) => {
    const confirm = await Swal.fire({
      title: "Approve Admission?",
      html: `
        <p>Are you sure you want to approve <strong>${request.studentName}</strong>'s admission?</p>
        <div style="text-align: left; background: #f0fdf4; padding: 12px; border-radius: 8px; margin-top: 10px;">
          <p style="font-size: 12px; margin: 0 0 5px 0;"><strong>Login Credentials will be auto-generated:</strong></p>
          <p style="font-size: 12px; margin: 0;">Username: <strong>${generateUsername(request)}</strong></p>
          <p style="font-size: 12px; margin: 0;">Password: <strong>student123S@</strong></p>
        </div>
      `,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#22c55e",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, Approve!",
    });

    if (!confirm.isConfirmed) return;

    setIsProcessing(true);

    try {
      const username = generateUsername(request);
      const password = "student123S@";
      const roll = "R" + Date.now().toString().slice(-4);

      const res = await fetch(
        `http://localhost:5000/api/students/approve/${request.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username,
            password,
            roll,
            enrolledCourses: request.enrolledCourses || [],
          }),
        },
      );

      const data = await res.json();

      if (data.success) {
        setAdmissionRequests(
          admissionRequests.map((r) =>
            r.id === request.id
              ? {
                  ...r,
                  status: "Approved",
                  reviewedBy: adminInfo.name,
                  reviewedDate: new Date().toISOString().split("T")[0],
                  username,
                }
              : r,
          ),
        );

        Swal.fire({
          icon: "success",
          title: "✅ Admission Approved!",
          html: `
            <div style="text-align: left;">
              <p><strong>Student:</strong> ${request.studentName}</p>
              <p><strong>Username:</strong> ${username}</p>
              <p><strong>Password:</strong> ${password}</p>
              <p style="color: #004d4d; font-size: 12px; margin-top: 8px;">✅ Student can now login to Campus</p>
            </div>
          `,
          confirmButtonColor: "#004d4d",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Failed!",
          text: data.message || "Could not approve admission.",
        });
      }
    } catch (err) {
      console.error("❌ Approve error:", err);
      Swal.fire({
        icon: "error",
        title: "Server Error!",
        text: "Could not connect to server.",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  // ✅ Generate username from student data
  const generateUsername = (request) => {
    const base = (request.email || request.phone || "student")
      .split("@")[0]
      .toLowerCase()
      .replace(/[^a-z0-9]/g, "");
    return base + Math.floor(100 + Math.random() * 900);
  };

  const handleReject = (request) => {
    setSelectedRequest(request);
    setRejectionReason("");
    setShowRejectModal(true);
  };

  // ✅ Reject — backend delete or update
  const confirmRejection = async () => {
    if (!rejectionReason.trim()) {
      Swal.fire({
        icon: "warning",
        title: "Please provide a reason",
        timer: 1500,
        showConfirmButton: false,
      });
      return;
    }

    setIsProcessing(true);

    try {
      // Update status to rejected using DELETE (removes from DB)
      const res = await fetch(
        `http://localhost:5000/api/students/delete/${selectedRequest.id}`,
        { method: "DELETE" },
      );
      const data = await res.json();

      if (data.success) {
        setAdmissionRequests(
          admissionRequests.map((r) =>
            r.id === selectedRequest.id
              ? {
                  ...r,
                  status: "Rejected",
                  reviewedBy: adminInfo.name,
                  reviewedDate: new Date().toISOString().split("T")[0],
                  rejectionReason,
                }
              : r,
          ),
        );

        setShowRejectModal(false);
        setRejectionReason("");

        Swal.fire({
          icon: "success",
          title: "Admission Rejected",
          text: `${selectedRequest.studentName}'s admission has been rejected.`,
          timer: 1500,
          showConfirmButton: false,
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Failed!",
          text: data.message || "Could not reject.",
        });
      }
    } catch (err) {
      console.error("❌ Reject error:", err);
      Swal.fire({
        icon: "error",
        title: "Server Error!",
        text: "Could not connect to server.",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  // ✅ Bulk approve — one by one
  const handleBulkApprove = async () => {
    const pendingRequests = admissionRequests.filter(
      (r) => r.status === "Pending",
    );
    if (pendingRequests.length === 0) {
      Swal.fire({
        icon: "info",
        title: "No Pending Requests",
        timer: 1500,
        showConfirmButton: false,
      });
      return;
    }

    const confirm = await Swal.fire({
      title: "Approve All Pending?",
      text: `This will approve ${pendingRequests.length} pending admission requests.`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#22c55e",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, Approve All!",
    });

    if (!confirm.isConfirmed) return;

    setIsProcessing(true);

    let successCount = 0;

    for (const req of pendingRequests) {
      try {
        const username = generateUsername(req);
        const password = "student123S@";
        const roll = "R" + Date.now().toString().slice(-4) + successCount;

        const res = await fetch(
          `http://localhost:5000/api/students/approve/${req.id}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              username,
              password,
              roll,
              enrolledCourses: req.enrolledCourses || [],
            }),
          },
        );
        const data = await res.json();
        if (data.success) successCount++;
      } catch (err) {
        console.error("Bulk approve error for", req.studentName, err);
      }
    }

    // Refresh from server
    await fetchAdmissions();

    setIsProcessing(false);
    Swal.fire({
      icon: "success",
      title: "Bulk Approve Done!",
      text: `${successCount} of ${pendingRequests.length} approved successfully.`,
      timer: 2000,
      showConfirmButton: false,
    });
  };

  const totalRequests = admissionRequests.length;
  const pendingRequests = admissionRequests.filter(
    (r) => r.status === "Pending",
  ).length;
  const approvedRequests = admissionRequests.filter(
    (r) => r.status === "Approved",
  ).length;
  const rejectedRequests = admissionRequests.filter(
    (r) => r.status === "Rejected",
  ).length;

  return (
    <div className="h-screen flex flex-col bg-gray-50 overflow-hidden">
      <div className="flex flex-1 overflow-hidden relative">
        {/* Mobile Header */}
        <div className="md:hidden bg-white border-b border-gray-200 p-3 flex justify-between items-center w-full absolute top-0 left-0 z-40">
          <h1 className="text-sm font-bold text-gray-800">
            Admission Permission
          </h1>
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-lg hover:bg-gray-100"
          >
            {isSidebarOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>

        {/* Sidebar */}
        <aside
          className={`
            fixed md:relative z-50 w-72 md:w-64 bg-white border-r border-gray-200 
            shadow-lg md:shadow-sm transition-all duration-300 h-full overflow-hidden flex-shrink-0
            ${isSidebarOpen ? "left-0" : "-left-72 md:left-0"}
          `}
        >
          <div className="p-4 bg-gradient-to-r from-[#004d4d] to-[#006666] text-white">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <span className="text-xl font-bold">
                  {adminInfo.name?.charAt(0) || "A"}
                </span>
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
                      className={`w-full flex items-center justify-between gap-3 px-3 py-2.5 rounded-lg text-sm transition-all ${
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
                        className={
                          activeSubMenu === item.id
                            ? "rotate-180 transition-transform"
                            : "transition-transform"
                        }
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
                              setActiveSubMenu(sub.id);
                              setIsSidebarOpen(false);
                            }}
                            className={`block px-3 py-1.5 rounded-lg text-xs transition-all ${
                              activeSubMenu === sub.id
                                ? "bg-teal-50 text-[#004d4d] font-bold"
                                : "text-gray-600 hover:bg-gray-50 hover:text-[#004d4d]"
                            }`}
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
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all ${
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
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-red-600 hover:bg-red-50 mt-4 border-t border-gray-200 pt-4"
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
        <main className="flex-1 p-4 md:p-6 w-full overflow-auto">
          {/* Top Bar */}
          <div className="bg-white p-3 rounded-xl shadow-sm border border-gray-200 mb-3 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
            <div>
              <h1 className="text-base font-bold text-gray-800 flex items-center gap-2">
                <FaUserPlus className="text-blue-600" /> Admission Permission
              </h1>
              <p className="text-xs text-gray-500">
                Review and manage student admission requests
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={fetchAdmissions}
                className="bg-blue-500 hover:bg-blue-600 text-white text-xs px-3 py-1.5 rounded-lg font-bold flex items-center gap-1"
              >
                <FaSyncAlt size={12} /> Refresh
              </button>
              <button
                onClick={handleBulkApprove}
                disabled={isProcessing}
                className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white text-xs px-3 py-1.5 rounded-lg font-bold flex items-center gap-1 disabled:opacity-50"
              >
                <FaCheckDouble size={12} /> Approve All Pending
              </button>
              <span className="text-xs font-semibold text-gray-700 hidden sm:block">
                {adminInfo.name}
              </span>
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white text-[10px] px-3 py-1.5 rounded-lg font-bold"
              >
                Logout
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-3">
            <div className="bg-white border rounded-xl shadow-sm p-2 text-center">
              <p className="text-lg font-bold text-blue-600">{totalRequests}</p>
              <p className="text-[10px] text-gray-500">Total Requests</p>
            </div>
            <div className="bg-white border rounded-xl shadow-sm p-2 text-center">
              <p className="text-lg font-bold text-yellow-600">
                {pendingRequests}
              </p>
              <p className="text-[10px] text-gray-500">Pending</p>
            </div>
            <div className="bg-white border rounded-xl shadow-sm p-2 text-center">
              <p className="text-lg font-bold text-green-600">
                {approvedRequests}
              </p>
              <p className="text-[10px] text-gray-500">Approved</p>
            </div>
            <div className="bg-white border rounded-xl shadow-sm p-2 text-center">
              <p className="text-lg font-bold text-red-600">
                {rejectedRequests}
              </p>
              <p className="text-[10px] text-gray-500">Rejected</p>
            </div>
          </div>

          {/* Filters */}
          <div className="bg-white border rounded-xl shadow-sm p-2 mb-3">
            <div className="flex flex-col md:flex-row gap-2">
              <div className="flex-1 relative">
                <FaSearch className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 text-xs" />
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-7 pr-2 py-1 text-xs border rounded-lg"
                />
              </div>
              <div className="flex items-center gap-1 flex-wrap">
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-1.5 py-1 text-xs border rounded-lg"
                >
                  {uniqueStatuses.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
                <select
                  value={filterClass}
                  onChange={(e) => setFilterClass(e.target.value)}
                  className="px-1.5 py-1 text-xs border rounded-lg max-w-[150px]"
                >
                  {uniqueClasses.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
                <select
                  value={filterPriority}
                  onChange={(e) => setFilterPriority(e.target.value)}
                  className="px-1.5 py-1 text-xs border rounded-lg"
                >
                  {uniquePriorities.map((p) => (
                    <option key={p} value={p}>
                      {p}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Loading / Error / Table */}
          {loading ? (
            <div className="bg-white border rounded-xl shadow-sm p-12 text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <p className="text-sm text-gray-500 mt-3">
                Loading admission requests...
              </p>
            </div>
          ) : fetchError ? (
            <div className="bg-white border border-red-200 rounded-xl shadow-sm p-8 text-center">
              <p className="text-red-500 font-bold text-lg mb-2">⚠️ Error</p>
              <p className="text-gray-600 text-sm mb-4">{fetchError}</p>
              <button
                onClick={fetchAdmissions}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-bold"
              >
                Retry
              </button>
            </div>
          ) : (
            <div className="bg-white border rounded-xl shadow-sm overflow-hidden">
              <div className="overflow-x-auto max-h-[calc(100vh-400px)] overflow-y-auto">
                <table className="w-full text-xs">
                  <thead className="bg-gray-50 sticky top-0 z-10">
                    <tr>
                      <th className="px-3 py-2 text-left font-semibold text-gray-600">
                        #
                      </th>
                      <th className="px-3 py-2 text-left font-semibold text-gray-600">
                        Student
                      </th>
                      <th className="px-3 py-2 text-left font-semibold text-gray-600 hidden md:table-cell">
                        Father
                      </th>
                      <th className="px-3 py-2 text-left font-semibold text-gray-600">
                        Course
                      </th>
                      <th className="px-3 py-2 text-left font-semibold text-gray-600 hidden lg:table-cell">
                        Phone
                      </th>
                      <th className="px-3 py-2 text-left font-semibold text-gray-600">
                        Status
                      </th>
                      <th className="px-3 py-2 text-left font-semibold text-gray-600 hidden sm:table-cell">
                        Priority
                      </th>
                      <th className="px-3 py-2 text-left font-semibold text-gray-600">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {filteredRequests.length > 0 ? (
                      filteredRequests.map((request, index) => (
                        <tr key={request.id} className="hover:bg-gray-50">
                          <td className="px-3 py-2 font-medium text-gray-500">
                            {index + 1}
                          </td>
                          <td className="px-3 py-2">
                            <div className="font-medium text-gray-800">
                              {request.studentName}
                            </div>
                            <div className="text-[10px] text-gray-400">
                              {request.email}
                            </div>
                          </td>
                          <td className="px-3 py-2 hidden md:table-cell">
                            <div className="text-gray-700">
                              {request.fatherName}
                            </div>
                            <div className="text-[10px] text-gray-400">
                              {request.guardianPhone}
                            </div>
                          </td>
                          <td className="px-3 py-2">
                            <div className="font-medium text-gray-700 text-xs max-w-[150px] truncate">
                              {request.class}
                            </div>
                          </td>
                          <td className="px-3 py-2 hidden lg:table-cell text-gray-600">
                            {request.phone}
                          </td>
                          <td className="px-3 py-2">
                            <span
                              className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium ${getStatusColor(request.status)}`}
                            >
                              {getStatusIcon(request.status)}
                              {request.status}
                            </span>
                          </td>
                          <td className="px-3 py-2 hidden sm:table-cell">
                            <span
                              className={`inline-flex px-2 py-0.5 rounded-full text-[10px] font-medium ${getPriorityColor(request.priority)}`}
                            >
                              {request.priority}
                            </span>
                          </td>
                          <td className="px-3 py-2">
                            <div className="flex items-center gap-1">
                              <button
                                onClick={() => openDetailsModal(request)}
                                className="text-blue-600 hover:text-blue-800 p-1 rounded hover:bg-blue-50"
                                title="View Details"
                              >
                                <FaEye size={14} />
                              </button>
                              {request.status === "Pending" && (
                                <>
                                  <button
                                    onClick={() => handleApprove(request)}
                                    disabled={isProcessing}
                                    className="text-green-600 hover:text-green-800 p-1 rounded hover:bg-green-50 disabled:opacity-50"
                                    title="Approve"
                                  >
                                    <FaCheckCircle size={14} />
                                  </button>
                                  <button
                                    onClick={() => handleReject(request)}
                                    disabled={isProcessing}
                                    className="text-red-600 hover:text-red-800 p-1 rounded hover:bg-red-50 disabled:opacity-50"
                                    title="Reject"
                                  >
                                    <FaTimesCircle size={14} />
                                  </button>
                                </>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan="8"
                          className="px-3 py-8 text-center text-gray-500"
                        >
                          <FaUserPlus className="text-4xl text-gray-300 mx-auto mb-2" />
                          <p>No admission requests found</p>
                          <p className="text-[10px] text-gray-400 mt-1">
                            {admissionRequests.length === 0
                              ? "Students will appear here after registering"
                              : "Try adjusting your search or filter"}
                          </p>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Details Modal */}
      {showDetailsModal && selectedRequest && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b flex justify-between items-center sticky top-0 bg-white z-10">
              <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <FaIdCard className="text-blue-600" /> Admission Request
              </h3>
              <button
                onClick={() => setShowDetailsModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <FiX size={24} />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex items-start gap-4 pb-4 border-b">
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-teal-500 to-blue-500 flex items-center justify-center text-white text-2xl font-bold flex-shrink-0">
                  {selectedRequest.studentName.charAt(0).toUpperCase()}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h2 className="text-xl font-bold text-gray-800">
                      {selectedRequest.studentName}
                    </h2>
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(selectedRequest.status)}`}
                    >
                      {getStatusIcon(selectedRequest.status)}
                      {selectedRequest.status}
                    </span>
                    <span
                      className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(selectedRequest.priority)}`}
                    >
                      {selectedRequest.priority} Priority
                    </span>
                  </div>
                  <p className="text-sm text-gray-500">
                    {selectedRequest.class}
                  </p>
                  <div className="flex flex-wrap gap-3 mt-1 text-xs text-gray-500">
                    <span>📧 {selectedRequest.email}</span>
                    <span>📱 {selectedRequest.phone}</span>
                    <span>📅 Applied: {selectedRequest.appliedDate}</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-gray-700 text-sm mb-2 flex items-center gap-2">
                    <FaUser className="text-blue-500" /> Personal Info
                  </h4>
                  <div className="space-y-1.5 text-sm">
                    <div className="flex justify-between border-b pb-1">
                      <span className="text-gray-500">Father's Name</span>
                      <span className="font-medium">
                        {selectedRequest.fatherName}
                      </span>
                    </div>
                    <div className="flex justify-between border-b pb-1">
                      <span className="text-gray-500">Mother's Name</span>
                      <span className="font-medium">
                        {selectedRequest.motherName}
                      </span>
                    </div>
                    <div className="flex justify-between border-b pb-1">
                      <span className="text-gray-500">Gender</span>
                      <span className="font-medium">
                        {selectedRequest.gender}
                      </span>
                    </div>
                    <div className="flex justify-between border-b pb-1">
                      <span className="text-gray-500">NID / DOB</span>
                      <span className="font-medium">
                        {selectedRequest.dob || "N/A"}
                      </span>
                    </div>
                    <div className="flex justify-between border-b pb-1">
                      <span className="text-gray-500">Address</span>
                      <span className="font-medium text-xs">
                        {selectedRequest.address}
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-700 text-sm mb-2 flex items-center gap-2">
                    <FaSchoolIcon className="text-green-500" /> Admission
                    Details
                  </h4>
                  <div className="space-y-1.5 text-sm">
                    <div className="flex justify-between border-b pb-1">
                      <span className="text-gray-500">Applied Date</span>
                      <span className="font-medium">
                        {selectedRequest.appliedDate}
                      </span>
                    </div>
                    <div className="flex justify-between border-b pb-1">
                      <span className="text-gray-500">Admission Date</span>
                      <span className="font-medium">
                        {selectedRequest.admissionDate}
                      </span>
                    </div>
                    <div className="flex justify-between border-b pb-1">
                      <span className="text-gray-500">Payment Status</span>
                      <span
                        className={`font-medium ${selectedRequest.paymentStatus === "Paid" ? "text-green-600" : "text-red-600"}`}
                      >
                        {selectedRequest.paymentStatus}
                      </span>
                    </div>
                    <div className="flex justify-between border-b pb-1">
                      <span className="text-gray-500">Payment Method</span>
                      <span className="font-medium">
                        {selectedRequest.paymentMethod || "N/A"}
                      </span>
                    </div>
                    <div className="flex justify-between border-b pb-1">
                      <span className="text-gray-500">Transaction ID</span>
                      <span className="font-medium text-xs">
                        {selectedRequest.transactionId || "N/A"}
                      </span>
                    </div>
                    <div className="flex justify-between border-b pb-1">
                      <span className="text-gray-500">Paid Amount</span>
                      <span className="font-medium">
                        ৳{selectedRequest.paidAmount || 0}
                      </span>
                    </div>
                    {selectedRequest.reviewedBy && (
                      <>
                        <div className="flex justify-between border-b pb-1">
                          <span className="text-gray-500">Reviewed By</span>
                          <span className="font-medium">
                            {selectedRequest.reviewedBy}
                          </span>
                        </div>
                        <div className="flex justify-between border-b pb-1">
                          <span className="text-gray-500">Reviewed Date</span>
                          <span className="font-medium">
                            {selectedRequest.reviewedDate}
                          </span>
                        </div>
                      </>
                    )}
                    {selectedRequest.rejectionReason && (
                      <div className="mt-2 p-2 bg-red-50 rounded-lg border border-red-200">
                        <p className="text-xs text-red-600 font-medium">
                          Rejection Reason:
                        </p>
                        <p className="text-sm text-red-700">
                          {selectedRequest.rejectionReason}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {selectedRequest.notes &&
                selectedRequest.notes !== "No additional notes" && (
                  <div className="border-t pt-4">
                    <h4 className="font-semibold text-gray-700 text-sm mb-1 flex items-center gap-2">
                      <FaInfoCircle className="text-blue-500" /> Notes
                    </h4>
                    <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                      {selectedRequest.notes}
                    </p>
                  </div>
                )}

              <div className="flex gap-3 pt-4 border-t">
                {selectedRequest.status === "Pending" && (
                  <>
                    <button
                      onClick={() => {
                        setShowDetailsModal(false);
                        handleApprove(selectedRequest);
                      }}
                      disabled={isProcessing}
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-semibold text-sm disabled:opacity-50"
                    >
                      <FaCheckCircle className="inline mr-2" /> Approve
                    </button>
                    <button
                      onClick={() => {
                        setShowDetailsModal(false);
                        handleReject(selectedRequest);
                      }}
                      disabled={isProcessing}
                      className="flex-1 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-semibold text-sm disabled:opacity-50"
                    >
                      <FaTimesCircle className="inline mr-2" /> Reject
                    </button>
                  </>
                )}
                <button
                  onClick={() => setShowDetailsModal(false)}
                  className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg font-semibold text-sm"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Reject Modal */}
      {showRejectModal && selectedRequest && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6">
            <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2 mb-2">
              <FaBan className="text-red-600" /> Reject Admission
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              You are about to reject{" "}
              <strong>{selectedRequest.studentName}</strong>'s admission. Please
              provide a reason.
            </p>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Rejection Reason *
              </label>
              <textarea
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
                rows="3"
                className="w-full border rounded-lg px-3 py-2 text-sm"
                placeholder="Enter the reason..."
              />
            </div>
            <div className="flex gap-3">
              <button
                onClick={confirmRejection}
                disabled={isProcessing || !rejectionReason.trim()}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg font-semibold text-sm disabled:opacity-50"
              >
                <FaBan className="inline mr-2" /> Confirm
              </button>
              <button
                onClick={() => {
                  setShowRejectModal(false);
                  setRejectionReason("");
                }}
                className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 rounded-lg font-semibold text-sm"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Student_admission;
