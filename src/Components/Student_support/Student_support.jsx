// src/Page/Student-support/Student_support.jsx
import React, { useState, useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "../Navbar/Footer/Footer";
import { useLanguage } from "../../context/useLanguage";

const API = "https://api.tarbiyahonline.com/api";

const Student_support = () => {
  const { t } = useLanguage();

  const [activeTab, setActiveTab] = useState("submit");
  const [captchaNum, setCaptchaNum] = useState(5394);
  const [captchaInput, setCaptchaInput] = useState("");
  const [statusCaptchaNum, setStatusCaptchaNum] = useState(7264);
  const [statusCaptchaInput, setStatusCaptchaInput] = useState("");

  const [formData, setFormData] = useState({
    department: "",
    phone: "",
    email: "",
    name: "",
    gender: "",
    studentId: "",
    reference: "",
    subject: "",
    problemDetails: "",
    priority: "Medium",
    category: "General",
    attachmentUrl: "",
  });

  const [searchBy, setSearchBy] = useState("phone");
  const [searchValue, setSearchValue] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [studentReply, setStudentReply] = useState("");
  const [isSendingReply, setIsSendingReply] = useState(false);

  useEffect(() => {
    generateCaptcha();
    generateStatusCaptcha();
    // ✅ Auto-fill from logged-in student
    try {
      const saved =
        localStorage.getItem("studentInfo") ||
        localStorage.getItem("campusStudentInfo");
      if (saved) {
        const s = JSON.parse(saved);
        setFormData((p) => ({
          ...p,
          name: s.name || p.name,
          phone: s.phone || p.phone,
          email: s.email || p.email,
          studentId: s.studentId || s._id || p.studentId,
          gender: (s.gender || "").toLowerCase() || p.gender,
          department: s.course || s.department || p.department,
        }));
      }
    } catch (e) {}
  }, []);

  const generateCaptcha = () =>
    setCaptchaNum(Math.floor(1000 + Math.random() * 9000));
  const generateStatusCaptcha = () =>
    setStatusCaptchaNum(Math.floor(1000 + Math.random() * 9000));

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (parseInt(captchaInput) !== captchaNum) {
      alert(t({ en: "Captcha is incorrect!", bn: "ক্যাপচা সঠিক হয়নি!" }));
      generateCaptcha();
      setCaptchaInput("");
      return;
    }

    try {
      const response = await fetch(`${API}/support/submit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (data.success) {
        alert(
          t({
            en: "Support ticket submitted successfully!",
            bn: "সাপোর্ট টিকেট সফলভাবে জমা হয়েছে!",
          }),
        );
        setFormData({
          department: "",
          phone: "",
          email: "",
          name: "",
          gender: "",
          studentId: "",
          reference: "",
          subject: "",
          problemDetails: "",
          priority: "Medium",
          category: "General",
          attachmentUrl: "",
        });
        setCaptchaInput("");
        generateCaptcha();
      } else {
        alert(data.message || "Something went wrong!");
      }
    } catch (error) {
      alert("Network error!");
    }
  };

  const handleStatusSearch = async (e) => {
    e.preventDefault();
    if (parseInt(statusCaptchaInput) !== statusCaptchaNum) {
      alert(t({ en: "Captcha is incorrect!", bn: "ক্যাপচা সঠিক হয়নি!" }));
      generateStatusCaptcha();
      setStatusCaptchaInput("");
      return;
    }

    try {
      const response = await fetch(
        `${API}/support/status?type=${searchBy}&value=${searchValue.trim()}`,
      );
      const data = await response.json();
      if (data.success && data.data) {
        setSearchResults(data.data);
      } else {
        setSearchResults([]);
        alert(data.message || "No records found!");
      }
      setHasSearched(true);
    } catch (error) {
      setSearchResults([]);
      setHasSearched(true);
    }
  };

  const sendStudentReply = async () => {
    if (!studentReply.trim() || !selectedTicket) return;
    setIsSendingReply(true);
    try {
      const response = await fetch(
        `${API}/support/ticket/${selectedTicket.supportNo}/reply`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            message: studentReply,
            role: "user", // ✅ স্টুডেন্ট রিপ্লাই হিসেবে চিহ্নিত
          }),
        },
      );
      const data = await response.json();
      if (data.success) {
        setSelectedTicket({
          ...data.ticket,
          supportNo: data.ticket._id,
          dept: data.ticket.department,
          desc: data.ticket.problemDetails,
          description: data.ticket.problemDetails,
        });
        setStudentReply("");
      } else {
        alert(data.message || "Failed to send reply");
      }
    } catch (error) {
      alert("Server error!");
    } finally {
      setIsSendingReply(false);
    }
  };

  const getPriorityBadge = (priority) => {
    const p = (priority || "Medium").toLowerCase();
    if (p === "high") return "bg-red-100 text-red-700 border-red-300";
    if (p === "low") return "bg-gray-100 text-gray-700 border-gray-300";
    return "bg-yellow-100 text-yellow-700 border-yellow-300";
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-100 text-yellow-700";
      case "In Progress":
        return "bg-blue-100 text-blue-700";
      case "Resolved":
        return "bg-green-100 text-green-700";
      case "Closed":
        return "bg-gray-100 text-gray-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col">
      <Navbar />
      <div className="container mx-auto px-4 py-8 max-w-7xl flex-grow">
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setActiveTab("submit")}
            className={`px-6 py-2.5 rounded-md font-medium transition-all shadow-md ${
              activeTab === "submit"
                ? "bg-blue-600 text-white"
                : "bg-white text-slate-700 hover:bg-slate-100"
            }`}
          >
            {t({ en: "Submit Support", bn: "সাবমিট সাপোর্ট" })}
          </button>
          <button
            onClick={() => setActiveTab("status")}
            className={`px-6 py-2.5 rounded-md font-medium transition-all shadow-md ${
              activeTab === "status"
                ? "bg-blue-600 text-white"
                : "bg-white text-slate-700 hover:bg-slate-100"
            }`}
          >
            {t({ en: "My Support Status", bn: "আমার সাপোর্ট স্ট্যাটাস" })}
          </button>
        </div>

        {activeTab === "submit" ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7 bg-white text-slate-800 p-6 md:p-8 rounded-lg shadow-xl">
              <h2 className="text-2xl font-bold text-center mb-6 text-slate-800 border-b pb-3">
                Support Form
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Department */}
                <div>
                  <label className="block text-sm font-semibold mb-1">
                    Department: *
                  </label>
                  <select
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                    required
                    className="w-full border border-slate-300 rounded-md p-2.5"
                  >
                    <option value="">--Select Department--</option>
                    <option value="Diploma">Diploma In Islamic Studies</option>
                    <option value="Allimiyah">Allimiyah</option>
                    <option value="Quran studies">Quran Studies</option>
                    <option value="Quran for elder">Quran For Elder</option>
                    <option value="Basic Tajweed (Level-1)">
                      Basic Tajweed (Level-1)
                    </option>
                    <option value="Quran Nazera">Quran Nazera</option>
                  </select>
                </div>

                {/* Student ID + Name */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold mb-1">
                      Student ID: *
                    </label>
                    <input
                      type="text"
                      name="studentId"
                      value={formData.studentId}
                      onChange={handleChange}
                      required
                      placeholder="TAR2648213"
                      className="w-full border border-slate-300 rounded-md p-2.5 font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-1">
                      Name: *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full border border-slate-300 rounded-md p-2.5"
                    />
                  </div>
                </div>

                {/* Phone + Email */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold mb-1">
                      Phone: *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="w-full border border-slate-300 rounded-md p-2.5"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-1">
                      Email: *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full border border-slate-300 rounded-md p-2.5"
                    />
                  </div>
                </div>

                {/* Gender + Priority */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold mb-1">
                      Gender:
                    </label>
                    <select
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                      className="w-full border border-slate-300 rounded-md p-2.5"
                    >
                      <option value="">--Select Gender--</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-1">
                      Priority: *
                    </label>
                    <select
                      name="priority"
                      value={formData.priority}
                      onChange={handleChange}
                      className="w-full border border-slate-300 rounded-md p-2.5"
                    >
                      <option value="Low">Low</option>
                      <option value="Medium">Medium</option>
                      <option value="High">High</option>
                    </select>
                  </div>
                </div>

                {/* Category */}
                <div>
                  <label className="block text-sm font-semibold mb-1">
                    Category:
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full border border-slate-300 rounded-md p-2.5"
                  >
                    <option value="General">General</option>
                    <option value="Payment">Payment / Fee</option>
                    <option value="Technical">Technical Issue</option>
                    <option value="Course">Course / Content</option>
                    <option value="Account">Account / Login</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                {/* Subject */}
                <div>
                  <label className="block text-sm font-semibold mb-1">
                    Subject: *
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full border border-slate-300 rounded-md p-2.5"
                  />
                </div>

                {/* Problem Details */}
                <div>
                  <label className="block text-sm font-semibold mb-1">
                    Problem Details: *
                  </label>
                  <textarea
                    name="problemDetails"
                    rows="4"
                    value={formData.problemDetails}
                    onChange={handleChange}
                    required
                    className="w-full border border-slate-300 rounded-md p-2.5"
                  ></textarea>
                </div>

                {/* Attachment URL */}
                <div>
                  <label className="block text-sm font-semibold mb-1">
                    Attachment URL (optional):
                  </label>
                  <input
                    type="text"
                    name="attachmentUrl"
                    value={formData.attachmentUrl}
                    onChange={handleChange}
                    placeholder="https://drive.google.com/... (screenshot / file link)"
                    className="w-full border border-slate-300 rounded-md p-2.5"
                  />
                </div>

                {/* Captcha */}
                <div>
                  <label className="block text-sm font-semibold mb-1">
                    Captcha: *
                  </label>
                  <div className="flex items-center gap-3">
                    <div className="bg-slate-100 border border-slate-300 px-4 py-2 rounded font-bold text-lg text-blue-800">
                      {captchaNum}
                    </div>
                    <input
                      type="text"
                      value={captchaInput}
                      onChange={(e) => setCaptchaInput(e.target.value)}
                      required
                      className="flex-grow border border-slate-300 rounded-md p-2.5"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full md:w-auto px-8 py-3 bg-blue-700 hover:bg-blue-800 text-white font-semibold rounded-md shadow-lg"
                >
                  Submit
                </button>
              </form>
            </div>

            <div className="lg:col-span-5 bg-amber-50 border border-amber-200 text-amber-900 p-6 rounded-lg shadow-xl">
              <p className="font-bold text-red-600 bg-red-50 p-3 rounded border border-red-200">
                সাপোর্ট লেখার সময় অবশ্যই ডিপার্টমেন্ট ও Student ID ঠিকমতো দিন।
              </p>
              <p className="mt-4 text-sm">
                ⏱️ সাধারণত ২৪ ঘণ্টার মধ্যে অ্যাডমিন রিপ্লাই দিবেন। আপনি "My
                Support Status" ট্যাবে গিয়ে রিপ্লাই দেখতে ও নতুন মেসেজ পাঠাতে
                পারবেন।
              </p>
            </div>
          </div>
        ) : (
          <div className="bg-white text-slate-800 p-6 md:p-8 rounded-lg shadow-xl max-w-6xl mx-auto">
            {selectedTicket ? (
              <div>
                <button
                  onClick={() => setSelectedTicket(null)}
                  className="mb-4 text-blue-600 hover:underline text-sm font-semibold"
                >
                  ← Back to List
                </button>
                <div className="flex justify-between mb-4 border-b pb-3 flex-wrap gap-2">
                  <h2 className="text-lg font-bold">
                    Support No: {selectedTicket.supportNo}
                  </h2>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusBadge(
                      selectedTicket.status,
                    )}`}
                  >
                    {selectedTicket.status}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="border p-4 rounded bg-gray-50 text-sm space-y-1">
                    <p>
                      <strong>Name:</strong> {selectedTicket.name}
                    </p>
                    <p>
                      <strong>Phone:</strong> {selectedTicket.phone}
                    </p>
                    <p>
                      <strong>Email:</strong> {selectedTicket.email}
                    </p>
                    {selectedTicket.studentId && (
                      <p>
                        <strong>Student ID:</strong> {selectedTicket.studentId}
                      </p>
                    )}
                  </div>
                  <div className="border p-4 rounded bg-gray-50 text-sm space-y-1">
                    <p>
                      <strong>Department:</strong> {selectedTicket.dept}
                    </p>
                    <p>
                      <strong>Date:</strong> {selectedTicket.date}
                    </p>
                    {selectedTicket.priority && (
                      <p>
                        <strong>Priority:</strong>{" "}
                        <span
                          className={`text-[10px] px-2 py-0.5 rounded border ${getPriorityBadge(
                            selectedTicket.priority,
                          )}`}
                        >
                          {selectedTicket.priority}
                        </span>
                      </p>
                    )}
                  </div>
                </div>

                <div className="border p-4 rounded bg-gray-50 mb-4">
                  <p className="font-bold mb-1">
                    Subject: {selectedTicket.subject}
                  </p>
                  <p className="text-sm">{selectedTicket.description}</p>
                </div>

                {/* 💬 Chat */}
                <div className="border rounded p-4 bg-gray-50">
                  <h3 className="font-bold mb-4 text-blue-700">
                    💬 Conversation
                  </h3>

                  <div className="space-y-3 mb-4 max-h-96 overflow-y-auto">
                    {selectedTicket.replies &&
                    selectedTicket.replies.length > 0 ? (
                      selectedTicket.replies.map((reply, index) => (
                        <div
                          key={index}
                          className={`p-3 rounded-lg ${
                            reply.role === "admin"
                              ? "bg-green-100 border-l-4 border-green-500 ml-0 mr-8"
                              : "bg-blue-100 border-l-4 border-blue-500 ml-8 mr-0"
                          }`}
                        >
                          <div className="flex justify-between items-center mb-1">
                            <strong className="text-sm">
                              {reply.role === "admin" ? "👨‍💼 Admin" : "👤 You"}
                            </strong>
                            <span className="text-xs text-gray-500">
                              {reply.date}
                            </span>
                          </div>
                          <p className="text-sm">{reply.message}</p>
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-500 text-sm text-center py-4">
                        এখনো কোনো রিপ্লাই আসেনি। অনুগ্রহ করে অপেক্ষা করুন।
                      </p>
                    )}
                  </div>

                  <div className="mt-4 border-t pt-4">
                    <textarea
                      className="w-full border p-2 rounded mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      rows="3"
                      placeholder="আপনার রিপ্লাই লিখুন..."
                      value={studentReply}
                      onChange={(e) => setStudentReply(e.target.value)}
                    />
                    <button
                      onClick={sendStudentReply}
                      disabled={isSendingReply}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded disabled:opacity-50 font-semibold text-sm"
                    >
                      {isSendingReply ? "Sending..." : "Send Reply"}
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <h2 className="text-2xl font-bold text-center mb-6 border-b pb-3">
                  My Support
                </h2>
                <div className="flex flex-wrap items-center gap-4 mb-4">
                  <span className="font-semibold">Search By:</span>
                  <label>
                    <input
                      type="radio"
                      name="searchBy"
                      value="phone"
                      checked={searchBy === "phone"}
                      onChange={(e) => setSearchBy(e.target.value)}
                    />{" "}
                    Phone
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="searchBy"
                      value="email"
                      checked={searchBy === "email"}
                      onChange={(e) => setSearchBy(e.target.value)}
                    />{" "}
                    Email
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="searchBy"
                      value="ticket"
                      checked={searchBy === "ticket"}
                      onChange={(e) => setSearchBy(e.target.value)}
                    />{" "}
                    Ticket No
                  </label>
                </div>
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <input
                    type="text"
                    placeholder="Enter value..."
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    className="w-full border border-slate-300 rounded-md p-2.5"
                  />
                  <div className="flex gap-3">
                    <div className="bg-slate-100 px-4 py-2 rounded font-bold text-lg">
                      {statusCaptchaNum}
                    </div>
                    <input
                      type="text"
                      placeholder="Captcha"
                      value={statusCaptchaInput}
                      onChange={(e) => setStatusCaptchaInput(e.target.value)}
                      className="flex-grow border border-slate-300 rounded-md p-2.5"
                    />
                  </div>
                </div>
                <button
                  onClick={handleStatusSearch}
                  className="w-full md:w-auto px-8 py-3 bg-blue-700 text-white font-semibold rounded-md"
                >
                  Search
                </button>

                {searchResults.length > 0 ? (
                  <div className="mt-6 overflow-x-auto">
                    <table className="w-full border-collapse border border-gray-300 text-sm">
                      <thead>
                        <tr className="bg-gray-100">
                          <th className="border p-3">Support No</th>
                          <th className="border p-3">Dept</th>
                          <th className="border p-3">Subject</th>
                          <th className="border p-3">Status</th>
                          <th className="border p-3">Replies</th>
                          <th className="border p-3">Details</th>
                        </tr>
                      </thead>
                      <tbody>
                        {searchResults.map((ticket) => (
                          <tr
                            key={ticket.supportNo}
                            className="hover:bg-blue-50"
                          >
                            <td className="border p-3 font-mono text-xs">
                              {ticket.supportNo}
                            </td>
                            <td className="border p-3">{ticket.dept}</td>
                            <td className="border p-3">{ticket.subject}</td>
                            <td className="border p-3">
                              <span
                                className={`px-2 py-0.5 rounded-full text-xs font-bold ${getStatusBadge(
                                  ticket.status,
                                )}`}
                              >
                                {ticket.status}
                              </span>
                            </td>
                            <td className="border p-3 text-center">
                              {(ticket.replies || []).length}
                            </td>
                            <td className="border p-3">
                              <button
                                onClick={() => setSelectedTicket(ticket)}
                                className="text-blue-600 hover:underline font-semibold"
                              >
                                Open
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : hasSearched ? (
                  <div className="text-center text-gray-500 py-6 mt-4 bg-gray-50 border rounded">
                    No tickets found!
                  </div>
                ) : null}
              </div>
            )}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Student_support;
