import React, { useState, useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "../Navbar/Footer/Footer";
import { useLanguage } from "../../context/useLanguage";

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
  });

  const [searchBy, setSearchBy] = useState("phone");
  const [searchValue, setSearchValue] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);

  // ➕ নতুন State (স্টুডেন্ট রিপ্লাই করার জন্য)
  const [studentReply, setStudentReply] = useState("");
  const [isSendingReply, setIsSendingReply] = useState(false);

  useEffect(() => {
    generateCaptcha();
    generateStatusCaptcha();
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
      const response = await fetch("http://localhost:5000/api/support/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (data.success) {
        alert(
          t({
            en: "Support application submitted successfully!",
            bn: "সাপোর্ট আবেদন সফলভাবে জমা হয়েছে!",
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
        });
        setCaptchaInput("");
        generateCaptcha();
      } else {
        alert(
          data.message ||
            t({ en: "Something went wrong!", bn: "কিছু ভুল হয়েছে!" }),
        );
      }
    } catch (error) {
      console.error("Submit error:", error);
      alert(t({ en: "Network error!", bn: "নেটওয়ার্ক সমস্যা!" }));
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
        `http://localhost:5000/api/support/status?type=${searchBy}&value=${searchValue.trim()}`,
      );

      let data;
      try {
        data = await response.json();
      } catch (err) {
        data = { message: "Invalid JSON from server" };
      }

      if (!response.ok) {
        alert(
          data.message ||
            t({
              en: "Server error! Please try again later.",
              bn: "সার্ভার এরর! পরে আবার চেষ্টা করুন।",
            }),
        );
        setSearchResults([]);
        setHasSearched(true);
        return;
      }

      if (data.success && data.data) {
        setSearchResults(data.data);
      } else {
        setSearchResults([]);
        alert(
          data.message ||
            t({ en: "No records found!", bn: "কোনো রেকর্ড পাওয়া যায়নি!" }),
        );
      }

      setHasSearched(true);
    } catch (error) {
      alert(
        t({
          en: "Network error! Please try again.",
          bn: "নেটওয়ার্ক সমস্যা! আবার চেষ্টা করুন।",
        }),
      );
      setSearchResults([]);
      setHasSearched(true);
    }
  };

  // ➕ স্টুডেন্ট রিপ্লাই পাঠানোর ফাংশন
  const sendStudentReply = async () => {
    if (!studentReply.trim()) {
      alert("রিপ্লাই লিখুন!");
      return;
    }
    if (!selectedTicket) return;

    setIsSendingReply(true);
    try {
      const response = await fetch(
        `http://localhost:5000/api/support/ticket/${selectedTicket.supportNo}/reply`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: studentReply }),
        },
      );
      const data = await response.json();
      if (data.success) {
        // সফল হলে সাথে সাথে UI-তে রিপ্লাই দেখান
        setSelectedTicket((prev) => ({
          ...prev,
          replies: [
            ...(prev.replies || []),
            {
              role: "user",
              message: studentReply,
              date: new Date().toLocaleString(),
            },
          ],
        }));
        setStudentReply("");
        alert("রিপ্লাই পাঠানো হয়েছে!");
      } else {
        alert(data.message || "রিপ্লাই পাঠানো যায়নি!");
      }
    } catch (error) {
      console.error("Reply error:", error);
      alert("সার্ভার এরর! আবার চেষ্টা করুন।");
    } finally {
      setIsSendingReply(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col justify-between">
      <Navbar />
      <div className="container mx-auto px-4 py-8 max-w-7xl flex-grow">
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setActiveTab("submit")}
            className={`px-6 py-2.5 rounded-md font-medium transition-all shadow-md ${activeTab === "submit" ? "bg-blue-600 text-white shadow-blue-500/20" : "bg-white text-slate-700 hover:bg-slate-100"}`}
          >
            {t({ en: "Submit Support", bn: "সাবমিট সাপোর্ট" })}
          </button>
          <button
            onClick={() => setActiveTab("status")}
            className={`px-6 py-2.5 rounded-md font-medium transition-all shadow-md ${activeTab === "status" ? "bg-blue-600 text-white shadow-blue-500/20" : "bg-white text-slate-700 hover:bg-slate-100"}`}
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
                <div>
                  <label className="block text-sm font-semibold mb-1 text-slate-700">
                    Department:
                  </label>
                  <select
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                    required
                    className="w-full border border-slate-300 rounded-md p-2.5 bg-white"
                  >
                    <option value="">--Select Department--</option>
                    <option value="Diploma">Diploma In Islamic Studies</option>
                    <option value="Allimiyah">Allimiyah</option>
                    <option value="Quran studies">Quran Studies</option>
                    <option value="Quran for elder">Quran For Elder</option>
                  </select>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold mb-1 text-slate-700">
                      Phone:
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      placeholder="Phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="w-full border border-slate-300 rounded-md p-2.5"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-1 text-slate-700">
                      Email:
                    </label>
                    <input
                      type="email"
                      name="email"
                      placeholder="Email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full border border-slate-300 rounded-md p-2.5"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold mb-1 text-slate-700">
                      Name:
                    </label>
                    <input
                      type="text"
                      name="name"
                      placeholder="Name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full border border-slate-300 rounded-md p-2.5"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-1 text-slate-700">
                      Gender:
                    </label>
                    <select
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                      required
                      className="w-full border border-slate-300 rounded-md p-2.5 bg-white"
                    >
                      <option value="">--Select Gender--</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1 text-slate-700">
                    Subject:
                  </label>
                  <input
                    type="text"
                    name="subject"
                    placeholder="Subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full border border-slate-300 rounded-md p-2.5"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1 text-slate-700">
                    Problem Details:
                  </label>
                  <textarea
                    name="problemDetails"
                    rows="4"
                    placeholder="Write problem details..."
                    value={formData.problemDetails}
                    onChange={handleChange}
                    required
                    className="w-full border border-slate-300 rounded-md p-2.5"
                  ></textarea>
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1 text-slate-700">
                    Captcha:
                  </label>
                  <div className="flex items-center gap-3">
                    <div className="bg-slate-100 border border-slate-300 px-4 py-2 rounded font-bold text-lg text-blue-800">
                      {captchaNum}
                    </div>
                    <input
                      type="text"
                      placeholder="Enter captcha"
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
                সাপোর্ট লেখার সময় অবশ্যই ডিপার্টমেন্ট ঠিকমতো সিলেক্ট করতে হবে।
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
                <div className="flex justify-between mb-6 border-b pb-3">
                  <h2 className="text-xl font-bold text-green-600">
                    Status: {selectedTicket.status}
                  </h2>
                  <h2 className="text-xl font-bold">
                    Support No: {selectedTicket.supportNo}
                  </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="border p-4 rounded bg-gray-50">
                    <p>
                      <strong>Name:</strong> {selectedTicket.name}
                    </p>
                    <p>
                      <strong>Phone:</strong> {selectedTicket.phone}
                    </p>
                    <p>
                      <strong>Email:</strong> {selectedTicket.email}
                    </p>
                  </div>
                  <div className="border p-4 rounded bg-gray-50">
                    <p>
                      <strong>Department:</strong> {selectedTicket.dept}
                    </p>
                    <p>
                      <strong>Date:</strong> {selectedTicket.date}
                    </p>
                  </div>
                </div>
                <div className="border p-4 rounded bg-gray-50 mb-4">
                  <p className="font-bold mb-1">
                    Subject: {selectedTicket.subject}
                  </p>
                  <p>{selectedTicket.description}</p>
                </div>

                {/* ✅ কনভারসেশন (Replies) অংশ - এখানে স্টুডেন্ট রিপ্লাই যোগ করা হয়েছে */}
                <div className="border rounded p-4 bg-gray-50">
                  <h3 className="font-bold mb-4 text-blue-700">
                    💬 কনভারসেশন (Replies)
                  </h3>

                  <div className="space-y-4 mb-4">
                    {selectedTicket.replies &&
                    selectedTicket.replies.length > 0 ? (
                      selectedTicket.replies.map((reply, index) => (
                        <div
                          key={index}
                          className={`p-3 rounded ${reply.role === "admin" ? "bg-green-100 border-l-4 border-green-500" : "bg-blue-100 border-l-4 border-blue-500"}`}
                        >
                          <div className="flex justify-between items-center mb-1">
                            <strong>
                              {reply.role === "admin"
                                ? "👤 অ্যাডমিন"
                                : "👤 আপনি"}
                            </strong>
                            <span className="text-xs text-gray-500">
                              {reply.date}
                            </span>
                          </div>
                          <p>{reply.message}</p>
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-500 text-sm">
                        এখনো কোনো রিপ্লাই আসেনি।
                      </p>
                    )}
                  </div>

                  {/* ➕ স্টুডেন্ট রিপ্লাই দেওয়ার UI */}
                  <div className="mt-4 border-t pt-4">
                    <textarea
                      className="w-full border p-2 rounded mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      rows="3"
                      placeholder="আপনার রিপ্লাই লিখুন..."
                      value={studentReply}
                      onChange={(e) => setStudentReply(e.target.value)}
                    ></textarea>
                    <button
                      onClick={sendStudentReply}
                      disabled={isSendingReply}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded disabled:opacity-50"
                    >
                      {isSendingReply ? "পাঠানো হচ্ছে..." : "রিপ্লাই পাঠান"}
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
                    Ticket
                  </label>
                </div>
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <input
                      type="text"
                      placeholder="Enter value..."
                      value={searchValue}
                      onChange={(e) => setSearchValue(e.target.value)}
                      className="w-full border border-slate-300 rounded-md p-2.5"
                    />
                  </div>
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
                  <table className="w-full mt-6 border-collapse border border-gray-300">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="border p-3">Dept</th>
                        <th className="border p-3">Description</th>
                        <th className="border p-3">Status</th>
                        <th className="border p-3">Details</th>
                      </tr>
                    </thead>
                    <tbody>
                      {searchResults.map((ticket) => (
                        <tr key={ticket.supportNo} className="hover:bg-blue-50">
                          <td className="border p-3">{ticket.dept}</td>
                          <td className="border p-3">{ticket.desc}</td>
                          <td className="border p-3 text-green-600">
                            {ticket.status}
                          </td>
                          <td className="border p-3">
                            <button
                              onClick={() => setSelectedTicket(ticket)}
                              className="text-blue-600 hover:underline"
                            >
                              Details
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
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
