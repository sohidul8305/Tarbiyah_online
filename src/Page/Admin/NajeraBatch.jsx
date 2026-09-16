// src/Page/Admin/NajeraBatch.jsx
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
  FaCalendarAlt,
  FaBook,
  FaChartLine,
  FaUserTimes,
  FaDatabase,
  FaEye,
  FaEdit,
  FaTrash,
  FaSearch,
  FaPlusCircle,
  FaArrowRight,
  FaLayerGroup,
  FaCalendarCheck,
  FaPrint,
  FaSync,
  FaBookOpen,
} from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { FiMenu, FiX } from "react-icons/fi";

const API_BASE = "http://api.tarbiyahonline.com/api";

const NajeraBatch = () => {
  const { user, logOut } = useAuth();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState("dashboard");
  const [activeSubMenu, setActiveSubMenu] = useState("dashboard");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [editingStudent, setEditingStudent] = useState(null);
  const [students, setStudents] = useState([]);

  const [adminInfo, setAdminInfo] = useState({
    name: "",
    email: "",
    phone: "",
    designation: "",
    department: "",
    joinDate: "",
  });

  const emptyForm = {
    studentId: "",
    name: "",
    phone: "",
    country: "BD",
    scholarshipAmount: 0,
    courseFee: 0,
    paidAmount: 0,
    transactionId: "",
    dueAmount: 0,
    julyAugust: 0,
    september: 0,
    paymentMethodSept: "---",
    paymentDateSept: "---",
    transactionIdSept: "---",
    october: 0,
    paymentMethodOct: "---",
    paymentDateOct: "---",
    transactionIdOct: "---",
    november: 0,
    paymentMethodNov: "---",
    paymentDateNov: "---",
    transactionIdNov: "---",
    december: 0,
    paymentMethodDec: "---",
    paymentDateDec: "---",
    transactionIdDec: "---",
    comments: "",
  };

  const [newStudent, setNewStudent] = useState({ ...emptyForm });

  useEffect(() => {
    const savedAdmin = localStorage.getItem("adminInfo");
    if (savedAdmin) setAdminInfo(JSON.parse(savedAdmin));
    else
      setAdminInfo({
        name: user?.displayName || "Admin",
        email: user?.email || "admin@tarabiyah.com",
        phone: "01700000000",
        designation: "Administrator",
        department: "Administration",
        joinDate: "January 2024",
      });
  }, [user]);

  const fetchStudents = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE}/najera-batch/all`);
      const data = await response.json();
      if (data.success) {
        setStudents(data.students || []);
        console.log(`✅ Loaded ${data.students?.length || 0} students`);
      }
    } catch (error) {
      console.error("❌ Fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
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

  const handleAddStudent = async () => {
    if (!newStudent.studentId || !newStudent.name || !newStudent.phone) {
      Swal.fire({
        icon: "warning",
        title: "Missing Information",
        text: "Student ID, Name, and Phone are required!",
      });
      return;
    }
    setSubmitting(true);
    Swal.fire({
      title: "Adding student...",
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading(),
    });
    try {
      const response = await fetch(`${API_BASE}/najera-batch/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newStudent),
      });
      const data = await response.json();
      if (data.success) {
        await fetchStudents();
        setShowAddModal(false);
        setNewStudent({ ...emptyForm });
        Swal.fire({
          icon: "success",
          title: "Student Added!",
          timer: 1500,
          showConfirmButton: false,
        });
      } else {
        Swal.fire({ icon: "error", title: "Failed!", text: data.message });
      }
    } catch (error) {
      Swal.fire({ icon: "error", title: "Connection Error" });
    } finally {
      setSubmitting(false);
    }
  };

  const handleEditStudent = async () => {
    if (!editingStudent) return;
    setSubmitting(true);
    Swal.fire({
      title: "Updating...",
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading(),
    });
    try {
      const response = await fetch(
        `${API_BASE}/najera-batch/update/${editingStudent._id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(editingStudent),
        },
      );
      const data = await response.json();
      if (data.success) {
        await fetchStudents();
        setShowEditModal(false);
        setEditingStudent(null);
        Swal.fire({
          icon: "success",
          title: "Updated!",
          timer: 1500,
          showConfirmButton: false,
        });
      } else {
        Swal.fire({ icon: "error", title: "Failed!", text: data.message });
      }
    } catch (error) {
      Swal.fire({ icon: "error", title: "Connection Error" });
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteStudent = async (id, name) => {
    const result = await Swal.fire({
      title: `Delete "${name}"?`,
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });
    if (!result.isConfirmed) return;
    try {
      const response = await fetch(`${API_BASE}/najera-batch/delete/${id}`, {
        method: "DELETE",
      });
      const data = await response.json();
      if (data.success) {
        await fetchStudents();
        Swal.fire({
          icon: "success",
          title: "Deleted!",
          timer: 1500,
          showConfirmButton: false,
        });
      }
    } catch (error) {
      Swal.fire({ icon: "error", title: "Connection Error" });
    }
  };

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
          label: "Basic Tazweed",
        },
        {
          id: "najera-batch",
          path: "/admin-dashboard/najera-batch",
          label: "Najera Batch",
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

  const filteredStudents = students.filter((s) => {
    return (
      s.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.phone?.includes(searchTerm) ||
      s.studentId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.transactionId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.country?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const totalIncome = students.reduce(
    (sum, s) => sum + (Number(s.paidAmount) || 0),
    0,
  );
  const pendingAmount = students.reduce(
    (sum, s) => sum + (Number(s.dueAmount) || 0),
    0,
  );
  const totalScholarship = students.reduce(
    (sum, s) => sum + (Number(s.scholarshipAmount) || 0),
    0,
  );
  const totalCourseFee = students.reduce(
    (sum, s) => sum + (Number(s.courseFee) || 0),
    0,
  );

  const getStatusColor = (due) => {
    if (Number(due) === 0) return "bg-green-100 text-green-700";
    if (Number(due) > 0 && Number(due) < Number(5000))
      return "bg-yellow-100 text-yellow-700";
    return "bg-red-100 text-red-700";
  };

  const getStatusText = (due) => {
    if (Number(due) === 0) return "Paid";
    return "Due ৳" + Number(due).toLocaleString();
  };

  const handleInputChange = (e, isEdit = false) => {
    const { name, value, type } = e.target;
    const finalValue = type === "number" ? Number(value) || 0 : value;
    if (isEdit) setEditingStudent((prev) => ({ ...prev, [name]: finalValue }));
    else setNewStudent((prev) => ({ ...prev, [name]: finalValue }));
  };

  const renderFormFields = (data, onChange) => (
    <div className="space-y-4">
      <div>
        <h4 className="text-xs font-bold text-gray-700 mb-2 pb-1 border-b">
          📋 Basic Information
        </h4>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          <div>
            <label className="block text-[10px] font-semibold text-gray-700 mb-0.5">
              Student ID *
            </label>
            <input
              type="text"
              name="studentId"
              value={data.studentId}
              onChange={onChange}
              placeholder="TEN26FB60XX"
              className="w-full px-2 py-1.5 text-xs border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-[10px] font-semibold text-gray-700 mb-0.5">
              Student Name *
            </label>
            <input
              type="text"
              name="name"
              value={data.name}
              onChange={onChange}
              placeholder="Full Name"
              className="w-full px-2 py-1.5 text-xs border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-[10px] font-semibold text-gray-700 mb-0.5">
              Phone Number *
            </label>
            <input
              type="text"
              name="phone"
              value={data.phone}
              onChange={onChange}
              placeholder="01XXXXXXXXX"
              className="w-full px-2 py-1.5 text-xs border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-[10px] font-semibold text-gray-700 mb-0.5">
              Country
            </label>
            <input
              type="text"
              name="country"
              value={data.country}
              onChange={onChange}
              placeholder="BD / England"
              className="w-full px-2 py-1.5 text-xs border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      <div>
        <h4 className="text-xs font-bold text-gray-700 mb-2 pb-1 border-b">
          💰 Fee Information
        </h4>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          <div>
            <label className="block text-[10px] font-semibold text-gray-700 mb-0.5">
              Scholarship Amount
            </label>
            <input
              type="number"
              name="scholarshipAmount"
              value={data.scholarshipAmount}
              onChange={onChange}
              className="w-full px-2 py-1.5 text-xs border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-[10px] font-semibold text-gray-700 mb-0.5">
              Course Fee
            </label>
            <input
              type="number"
              name="courseFee"
              value={data.courseFee}
              onChange={onChange}
              className="w-full px-2 py-1.5 text-xs border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-[10px] font-semibold text-gray-700 mb-0.5">
              Paid Amount
            </label>
            <input
              type="number"
              name="paidAmount"
              value={data.paidAmount}
              onChange={onChange}
              className="w-full px-2 py-1.5 text-xs border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-[10px] font-semibold text-gray-700 mb-0.5">
              Transaction ID
            </label>
            <input
              type="text"
              name="transactionId"
              value={data.transactionId}
              onChange={onChange}
              placeholder="TXN ID"
              className="w-full px-2 py-1.5 text-xs border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-[10px] font-semibold text-gray-700 mb-0.5">
              Due Amount
            </label>
            <input
              type="number"
              name="dueAmount"
              value={data.dueAmount}
              onChange={onChange}
              className="w-full px-2 py-1.5 text-xs border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      <div>
        <h4 className="text-xs font-bold text-gray-700 mb-2 pb-1 border-b">
          📅 Monthly Payments
        </h4>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-2">
          <div>
            <label className="block text-[10px] font-semibold text-gray-700 mb-0.5">
              August (Admission)
            </label>
            <input
              type="number"
              name="julyAugust"
              value={data.julyAugust}
              onChange={onChange}
              className="w-full px-2 py-1.5 text-xs border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-2">
          <div>
            <label className="block text-[10px] font-semibold text-gray-700 mb-0.5">
              September
            </label>
            <input
              type="number"
              name="september"
              value={data.september}
              onChange={onChange}
              className="w-full px-2 py-1.5 text-xs border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-[10px] font-semibold text-gray-700 mb-0.5">
              Payment Method
            </label>
            <input
              type="text"
              name="paymentMethodSept"
              value={data.paymentMethodSept}
              onChange={onChange}
              className="w-full px-2 py-1.5 text-xs border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-[10px] font-semibold text-gray-700 mb-0.5">
              Date
            </label>
            <input
              type="text"
              name="paymentDateSept"
              value={data.paymentDateSept}
              onChange={onChange}
              className="w-full px-2 py-1.5 text-xs border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-[10px] font-semibold text-gray-700 mb-0.5">
              Transaction ID
            </label>
            <input
              type="text"
              name="transactionIdSept"
              value={data.transactionIdSept}
              onChange={onChange}
              className="w-full px-2 py-1.5 text-xs border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-2">
          <div>
            <label className="block text-[10px] font-semibold text-gray-700 mb-0.5">
              October
            </label>
            <input
              type="number"
              name="october"
              value={data.october}
              onChange={onChange}
              className="w-full px-2 py-1.5 text-xs border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-[10px] font-semibold text-gray-700 mb-0.5">
              Payment Method
            </label>
            <input
              type="text"
              name="paymentMethodOct"
              value={data.paymentMethodOct}
              onChange={onChange}
              className="w-full px-2 py-1.5 text-xs border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-[10px] font-semibold text-gray-700 mb-0.5">
              Date
            </label>
            <input
              type="text"
              name="paymentDateOct"
              value={data.paymentDateOct}
              onChange={onChange}
              className="w-full px-2 py-1.5 text-xs border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-[10px] font-semibold text-gray-700 mb-0.5">
              Transaction ID
            </label>
            <input
              type="text"
              name="transactionIdOct"
              value={data.transactionIdOct}
              onChange={onChange}
              className="w-full px-2 py-1.5 text-xs border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-2">
          <div>
            <label className="block text-[10px] font-semibold text-gray-700 mb-0.5">
              November
            </label>
            <input
              type="number"
              name="november"
              value={data.november}
              onChange={onChange}
              className="w-full px-2 py-1.5 text-xs border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-[10px] font-semibold text-gray-700 mb-0.5">
              Payment Method
            </label>
            <input
              type="text"
              name="paymentMethodNov"
              value={data.paymentMethodNov}
              onChange={onChange}
              className="w-full px-2 py-1.5 text-xs border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-[10px] font-semibold text-gray-700 mb-0.5">
              Date
            </label>
            <input
              type="text"
              name="paymentDateNov"
              value={data.paymentDateNov}
              onChange={onChange}
              className="w-full px-2 py-1.5 text-xs border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-[10px] font-semibold text-gray-700 mb-0.5">
              Transaction ID
            </label>
            <input
              type="text"
              name="transactionIdNov"
              value={data.transactionIdNov}
              onChange={onChange}
              className="w-full px-2 py-1.5 text-xs border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div>
            <label className="block text-[10px] font-semibold text-gray-700 mb-0.5">
              December
            </label>
            <input
              type="number"
              name="december"
              value={data.december}
              onChange={onChange}
              className="w-full px-2 py-1.5 text-xs border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-[10px] font-semibold text-gray-700 mb-0.5">
              Payment Method
            </label>
            <input
              type="text"
              name="paymentMethodDec"
              value={data.paymentMethodDec}
              onChange={onChange}
              className="w-full px-2 py-1.5 text-xs border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-[10px] font-semibold text-gray-700 mb-0.5">
              Date
            </label>
            <input
              type="text"
              name="paymentDateDec"
              value={data.paymentDateDec}
              onChange={onChange}
              className="w-full px-2 py-1.5 text-xs border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-[10px] font-semibold text-gray-700 mb-0.5">
              Transaction ID
            </label>
            <input
              type="text"
              name="transactionIdDec"
              value={data.transactionIdDec}
              onChange={onChange}
              className="w-full px-2 py-1.5 text-xs border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      <div>
        <h4 className="text-xs font-bold text-gray-700 mb-2 pb-1 border-b">
          💬 Comments
        </h4>
        <textarea
          name="comments"
          value={data.comments}
          onChange={onChange}
          rows="2"
          placeholder="Write any comments..."
          className="w-full px-2 py-1.5 text-xs border rounded-lg focus:ring-2 focus:ring-blue-500"
        />
      </div>
    </div>
  );

  return (
    <div className="h-screen flex flex-col bg-gray-50 overflow-hidden">
      <div className="flex flex-1 overflow-hidden relative">
        <div className="md:hidden bg-white border-b border-gray-200 p-3 flex justify-between items-center w-full absolute top-0 left-0 z-40">
          <h1 className="text-sm font-bold text-gray-800">Najera Batch</h1>
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-lg hover:bg-gray-100"
          >
            {isSidebarOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>

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

        <main className="flex-1 p-4 md:p-6 w-full overflow-hidden">
          <div className="bg-white p-3 rounded-xl shadow-sm border border-gray-200 mb-3 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
            <div>
              <h1 className="text-base font-bold text-gray-800 flex items-center gap-2">
                <FaBookOpen className="text-blue-600" />
                Najera Batch-02 — Payment Overview
              </h1>
              <p className="text-xs text-gray-500">
                Manage Najera batch payments & students ({students.length}{" "}
                total)
              </p>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <button
                onClick={() => setShowAddModal(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white text-[10px] px-3 py-1.5 rounded-lg font-bold transition-all shadow-sm flex items-center gap-1"
              >
                <FaPlusCircle size={10} /> Add Student
              </button>
              <button
                onClick={fetchStudents}
                disabled={loading}
                className="bg-blue-500 hover:bg-blue-600 text-white text-[10px] px-3 py-1.5 rounded-lg font-bold transition-all shadow-sm flex items-center gap-1 disabled:opacity-50"
              >
                <FaSync size={10} className={loading ? "animate-spin" : ""} />{" "}
                Refresh
              </button>
              <button
                onClick={() => window.print()}
                className="bg-gray-500 hover:bg-gray-600 text-white text-[10px] px-3 py-1.5 rounded-lg font-bold transition-all shadow-sm flex items-center gap-1"
              >
                <FaPrint size={10} /> Print
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-2 mb-3">
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-3 text-center">
              <p className="text-xl font-bold text-purple-600">
                {students.length}
              </p>
              <p className="text-[10px] text-gray-500">Total Students</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-3 text-center">
              <p className="text-xl font-bold text-green-600">
                ৳{totalIncome.toLocaleString()}
              </p>
              <p className="text-[10px] text-gray-500">Collected</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-3 text-center">
              <p className="text-xl font-bold text-red-600">
                ৳{pendingAmount.toLocaleString()}
              </p>
              <p className="text-[10px] text-gray-500">Due Amount</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-3 text-center">
              <p className="text-xl font-bold text-blue-600">
                ৳{totalScholarship.toLocaleString()}
              </p>
              <p className="text-[10px] text-gray-500">Scholarships</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-3 text-center">
              <p className="text-xl font-bold text-yellow-600">
                ৳{totalCourseFee.toLocaleString()}
              </p>
              <p className="text-[10px] text-gray-500">Course Fees</p>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-2 mb-3">
            <div className="relative">
              <FaSearch className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 text-xs" />
              <input
                type="text"
                placeholder="Search by name, phone, student ID, transaction ID, country..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-7 pr-2 py-1.5 text-xs border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden h-[calc(100vh-380px)]">
            <div className="overflow-auto h-full">
              <table className="w-full text-[10px]">
                <thead className="bg-gray-100 border-b border-gray-200 sticky top-0 z-10">
                  <tr>
                    <th className="px-2 py-2 text-left font-bold text-gray-600 uppercase">
                      Student ID
                    </th>
                    <th className="px-2 py-2 text-left font-bold text-gray-600 uppercase">
                      Name
                    </th>
                    <th className="px-2 py-2 text-left font-bold text-gray-600 uppercase">
                      Phone
                    </th>
                    <th className="px-2 py-2 text-left font-bold text-gray-600 uppercase">
                      Country
                    </th>
                    <th className="px-2 py-2 text-right font-bold text-gray-600 uppercase">
                      Scholarship
                    </th>
                    <th className="px-2 py-2 text-right font-bold text-gray-600 uppercase">
                      Course Fee
                    </th>
                    <th className="px-2 py-2 text-right font-bold text-gray-600 uppercase">
                      Paid
                    </th>
                    <th className="px-2 py-2 text-left font-bold text-gray-600 uppercase">
                      TXN ID
                    </th>
                    <th className="px-2 py-2 text-right font-bold text-gray-600 uppercase">
                      Due
                    </th>
                    <th className="px-2 py-2 text-right font-bold text-gray-600 uppercase">
                      Aug (Adm)
                    </th>
                    <th className="px-2 py-2 text-right font-bold text-gray-600 uppercase">
                      Sept
                    </th>
                    <th className="px-2 py-2 text-right font-bold text-gray-600 uppercase">
                      Oct
                    </th>
                    <th className="px-2 py-2 text-right font-bold text-gray-600 uppercase">
                      Nov
                    </th>
                    <th className="px-2 py-2 text-right font-bold text-gray-600 uppercase">
                      Dec
                    </th>
                    <th className="px-2 py-2 text-left font-bold text-gray-600 uppercase">
                      Comments
                    </th>
                    <th className="px-2 py-2 text-center font-bold text-gray-600 uppercase">
                      Status
                    </th>
                    <th className="px-2 py-2 text-center font-bold text-gray-600 uppercase">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredStudents.map((student) => (
                    <tr key={student._id} className="hover:bg-gray-50">
                      <td className="px-2 py-1.5 text-[9px] text-gray-500 font-mono">
                        {student.studentId}
                      </td>
                      <td className="px-2 py-1.5 text-xs font-medium text-gray-800">
                        {student.name}
                      </td>
                      <td className="px-2 py-1.5 text-[10px] text-gray-600">
                        {student.phone}
                      </td>
                      <td className="px-2 py-1.5">
                        <span className="bg-blue-100 text-blue-700 text-[9px] px-1.5 py-0.5 rounded-full">
                          {student.country}
                        </span>
                      </td>
                      <td className="px-2 py-1.5 text-right text-gray-600">
                        ৳{(student.scholarshipAmount || 0).toLocaleString()}
                      </td>
                      <td className="px-2 py-1.5 text-right text-gray-600">
                        ৳{(student.courseFee || 0).toLocaleString()}
                      </td>
                      <td className="px-2 py-1.5 text-right font-semibold text-green-600">
                        ৳{(student.paidAmount || 0).toLocaleString()}
                      </td>
                      <td className="px-2 py-1.5 text-[9px] text-gray-500 font-mono truncate max-w-[100px]">
                        {student.transactionId}
                      </td>
                      <td
                        className={`px-2 py-1.5 text-right font-semibold ${Number(student.dueAmount) > 0 ? "text-red-600" : "text-gray-500"}`}
                      >
                        ৳{(student.dueAmount || 0).toLocaleString()}
                      </td>
                      <td className="px-2 py-1.5 text-right text-gray-600">
                        ৳{(student.julyAugust || 0).toLocaleString()}
                      </td>
                      <td className="px-2 py-1.5 text-right text-gray-600">
                        ৳{(student.september || 0).toLocaleString()}
                      </td>
                      <td className="px-2 py-1.5 text-right text-gray-600">
                        ৳{(student.october || 0).toLocaleString()}
                      </td>
                      <td className="px-2 py-1.5 text-right text-gray-600">
                        ৳{(student.november || 0).toLocaleString()}
                      </td>
                      <td className="px-2 py-1.5 text-right text-gray-600">
                        ৳{(student.december || 0).toLocaleString()}
                      </td>
                      <td className="px-2 py-1.5 text-[9px] text-gray-500 truncate max-w-[120px]">
                        {student.comments || "-"}
                      </td>
                      <td className="px-2 py-1.5 text-center">
                        <span
                          className={`text-[8px] px-1.5 py-0.5 rounded-full ${getStatusColor(student.dueAmount)}`}
                        >
                          {getStatusText(student.dueAmount)}
                        </span>
                      </td>
                      <td className="px-2 py-1.5">
                        <div className="flex items-center justify-center gap-0.5">
                          <button
                            onClick={() => {
                              setSelectedStudent(student);
                              setShowViewModal(true);
                            }}
                            className="text-blue-600 hover:bg-blue-50 p-1 rounded"
                            title="View"
                          >
                            <FaEye size={11} />
                          </button>
                          <button
                            onClick={() => {
                              setEditingStudent({ ...student });
                              setShowEditModal(true);
                            }}
                            className="text-green-600 hover:bg-green-50 p-1 rounded"
                            title="Edit"
                          >
                            <FaEdit size={11} />
                          </button>
                          <button
                            onClick={() =>
                              handleDeleteStudent(student._id, student.name)
                            }
                            className="text-red-600 hover:bg-red-50 p-1 rounded"
                            title="Delete"
                          >
                            <FaTrash size={11} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {filteredStudents.length === 0 && !loading && (
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-8 text-center mt-3">
              <FaBookOpen className="text-5xl text-gray-300 mx-auto mb-3" />
              <h3 className="text-base font-bold text-gray-800 mb-0.5">
                No Students Found
              </h3>
              <p className="text-xs text-gray-500 mb-3">
                {students.length === 0
                  ? "Click 'Add Student' to add your first student."
                  : "Try adjusting your search criteria"}
              </p>
              {students.length === 0 && (
                <button
                  onClick={() => setShowAddModal(true)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-xs font-semibold inline-flex items-center gap-1"
                >
                  <FaPlusCircle size={12} /> Add First Student
                </button>
              )}
            </div>
          )}
        </main>
      </div>

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-4 border-b border-gray-200 flex justify-between items-center sticky top-0 bg-white z-10">
              <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                <FaPlusCircle className="text-blue-600" /> Add New Student
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <FiX size={22} />
              </button>
            </div>
            <div className="p-4">
              {renderFormFields(newStudent, (e) => handleInputChange(e, false))}
            </div>
            <div className="p-4 border-t border-gray-200 flex gap-2 sticky bottom-0 bg-white">
              <button
                onClick={handleAddStudent}
                disabled={submitting}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold text-sm disabled:opacity-50"
              >
                {submitting ? "Adding..." : "Add Student"}
              </button>
              <button
                onClick={() => {
                  setShowAddModal(false);
                  setNewStudent({ ...emptyForm });
                }}
                className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 rounded-lg font-semibold text-sm"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && editingStudent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-4 border-b border-gray-200 flex justify-between items-center sticky top-0 bg-white z-10">
              <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                <FaEdit className="text-blue-600" /> Edit Student
              </h3>
              <button
                onClick={() => setShowEditModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <FiX size={22} />
              </button>
            </div>
            <div className="p-4">
              {renderFormFields(editingStudent, (e) =>
                handleInputChange(e, true),
              )}
            </div>
            <div className="p-4 border-t border-gray-200 flex gap-2 sticky bottom-0 bg-white">
              <button
                onClick={handleEditStudent}
                disabled={submitting}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold text-sm disabled:opacity-50"
              >
                {submitting ? "Updating..." : "Update Student"}
              </button>
              <button
                onClick={() => setShowEditModal(false)}
                className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 rounded-lg font-semibold text-sm"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* View Modal */}
      {showViewModal && selectedStudent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-4 border-b border-gray-200 flex justify-between items-center sticky top-0 bg-white z-10">
              <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                <FaEye className="text-blue-600" /> {selectedStudent.name}
              </h3>
              <button
                onClick={() => setShowViewModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <FiX size={22} />
              </button>
            </div>
            <div className="p-4 space-y-3">
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="bg-gray-50 p-2 rounded">
                  <b>Student ID:</b> {selectedStudent.studentId}
                </div>
                <div className="bg-gray-50 p-2 rounded">
                  <b>Phone:</b> {selectedStudent.phone}
                </div>
                <div className="bg-gray-50 p-2 rounded">
                  <b>Country:</b> {selectedStudent.country}
                </div>
                <div className="bg-gray-50 p-2 rounded">
                  <b>Scholarship:</b> ৳{selectedStudent.scholarshipAmount}
                </div>
                <div className="bg-gray-50 p-2 rounded">
                  <b>Course Fee:</b> ৳{selectedStudent.courseFee}
                </div>
                <div className="bg-gray-50 p-2 rounded">
                  <b>Paid:</b> ৳{selectedStudent.paidAmount}
                </div>
                <div className="bg-gray-50 p-2 rounded">
                  <b>Due:</b> ৳{selectedStudent.dueAmount}
                </div>
                <div className="bg-gray-50 p-2 rounded">
                  <b>Transaction ID:</b> {selectedStudent.transactionId}
                </div>
                <div className="bg-blue-50 p-2 rounded">
                  <b>Aug (Adm):</b> ৳{selectedStudent.julyAugust}
                </div>
                <div className="bg-blue-50 p-2 rounded">
                  <b>September:</b> ৳{selectedStudent.september}
                </div>
                <div className="bg-blue-50 p-2 rounded">
                  <b>October:</b> ৳{selectedStudent.october}
                </div>
                <div className="bg-blue-50 p-2 rounded">
                  <b>November:</b> ৳{selectedStudent.november}
                </div>
                <div className="bg-purple-50 p-2 rounded">
                  <b>December:</b> ৳{selectedStudent.december || 0}
                </div>
              </div>
              {selectedStudent.comments && (
                <div className="bg-yellow-50 p-3 rounded border border-yellow-200">
                  <b className="text-xs">💬 Comments:</b>
                  <p className="text-xs text-gray-700 mt-1">
                    {selectedStudent.comments}
                  </p>
                </div>
              )}
            </div>
            <div className="p-4 border-t border-gray-200 flex justify-end sticky bottom-0 bg-white">
              <button
                onClick={() => setShowViewModal(false)}
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg text-sm font-semibold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NajeraBatch;
