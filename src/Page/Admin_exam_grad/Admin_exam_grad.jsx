// src/Page/Admin/Admin_exam_grad.jsx
import React, { useState, useEffect } from "react";
import {
  FaAward,
  FaSave,
  FaEdit,
  FaTrash,
  FaCheckCircle,
  FaTimes,
  FaSpinner,
  FaPlusCircle,
  FaFilePdf,
  FaQuestionCircle,
  FaExternalLinkAlt,
  FaLink,
  FaListAlt,
} from "react-icons/fa";

const API_BASE = "http://localhost:5010";

const Admin_exam_grad = () => {
  const [activeTab, setActiveTab] = useState("grades");

  return (
    <div className="h-full flex flex-col space-y-3 overflow-hidden">
      {/* Tabs */}
      <div className="flex gap-1 bg-gray-100 p-1 rounded-lg flex-shrink-0">
        <button
          onClick={() => setActiveTab("grades")}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
            activeTab === "grades"
              ? "bg-white text-purple-600 shadow-sm"
              : "text-gray-600 hover:bg-gray-200"
          }`}
        >
          <FaAward size={12} /> Grades
        </button>
        <button
          onClick={() => setActiveTab("pdfs")}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
            activeTab === "pdfs"
              ? "bg-white text-blue-600 shadow-sm"
              : "text-gray-600 hover:bg-gray-200"
          }`}
        >
          <FaFilePdf size={12} /> PDF Notes
        </button>
        <button
          onClick={() => setActiveTab("quizzes")}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
            activeTab === "quizzes"
              ? "bg-white text-green-600 shadow-sm"
              : "text-gray-600 hover:bg-gray-200"
          }`}
        >
          <FaQuestionCircle size={12} /> Quizzes
        </button>
      </div>

      <div className="flex-1 overflow-hidden">
        {activeTab === "grades" && <GradesTab />}
        {activeTab === "pdfs" && <ResourcesTab type="pdf" />}
        {activeTab === "quizzes" && <ResourcesTab type="quiz" />}
      </div>
    </div>
  );
};

// ==================================================
// GRADES TAB (আগের মতোই)
// ==================================================
const GradesTab = () => {
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [grades, setGrades] = useState([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    studentId: "",
    studentName: "",
    studentRoll: "",
    courseId: "",
    courseTitle: "",
    courseCode: "",
    grad: "A+",
    classTest: "",
    midTerm: "",
    finalExam: "Pending",
    teacher: "",
    remarks: "",
  });

  useEffect(() => {
    fetchStudents();
    fetchCourses();
    fetchGrades();
  }, []);

  const fetchStudents = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/students/all`);
      const data = await res.json();
      if (data.success) setStudents(data.students || []);
    } catch (err) {
      console.error(err);
    }
  };
  const fetchCourses = async () => {
    try {
      // ✅ Try 1: courses.json থেকে
      let res = await fetch(`${API_BASE}/api/courses/teacher/all`);
      let data = await res.json();
      let allCourses = data.success ? data.courses || [] : [];

      // ✅ Try 2: যদি খালি হয়, students থেকে unique courses collect
      if (allCourses.length === 0) {
        const studentsRes = await fetch(`${API_BASE}/api/students/all`);
        const studentsData = await studentsRes.json();
        const students = studentsData.students || [];

        const courseMap = new Map();
        students.forEach((s) => {
          if (s.enrolledCourses && Array.isArray(s.enrolledCourses)) {
            s.enrolledCourses.forEach((c) => {
              // enrolledCourses might be IDs or objects
              if (typeof c === "object" && c._id) {
                courseMap.set(c._id, c);
              }
            });
          }
        });
        allCourses = Array.from(courseMap.values());
      }

      console.log("📚 [Admin] Loaded courses:", allCourses.length);
      setCourses(allCourses);
    } catch (err) {
      console.error("❌ Courses fetch error:", err);
    }
  };

  const fetchGrades = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_BASE}/api/grades/all`);
      const data = await res.json();
      if (data.success) setGrades(data.grades || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleStudentChange = (studentId) => {
    const st = students.find(
      (s) => String(s._id || s.id) === String(studentId),
    );
    setFormData({
      ...formData,
      studentId: studentId || "",
      studentName: st?.name || "",
      studentRoll: st?.roll || "",
    });
  };

  const handleCourseChange = (courseId) => {
    const co = courses.find((c) => String(c._id || c.id) === String(courseId));
    setFormData({
      ...formData,
      courseId: courseId || "",
      courseTitle: co?.title || co?.name || "",
      courseCode: co?.code || "",
      teacher: co?.teacher || "",
    });
  };

  const resetForm = () => {
    setFormData({
      studentId: "",
      studentName: "",
      studentRoll: "",
      courseId: "",
      courseTitle: "",
      courseCode: "",
      grad: "A+",
      classTest: "",
      midTerm: "",
      finalExam: "Pending",
      teacher: "",
      remarks: "",
    });
    setEditingId(null);
    setShowForm(false);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!formData.studentId || !formData.courseId) {
      alert("Student এবং Course select করুন!");
      return;
    }
    setSaving(true);
    try {
      const url = editingId
        ? `${API_BASE}/api/grades/update/${editingId}`
        : `${API_BASE}/api/grades/create`;
      const method = editingId ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success) {
        await fetchGrades();
        resetForm();
        alert(editingId ? "✅ Grade updated!" : "✅ Grade published!");
      } else alert("❌ " + (data.message || "Failed"));
    } catch (err) {
      alert("❌ " + err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (g) => {
    setFormData({
      studentId: g.studentId,
      studentName: g.studentName,
      studentRoll: g.studentRoll,
      courseId: g.courseId,
      courseTitle: g.courseTitle,
      courseCode: g.courseCode,
      grad: g.grad || "A+",
      classTest: g.classTest || "",
      midTerm: g.midTerm || "",
      finalExam: g.finalExam || "Pending",
      teacher: g.teacher || "",
      remarks: g.remarks || "",
    });
    setEditingId(g._id);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this grade?")) return;
    try {
      await fetch(`${API_BASE}/api/grades/delete/${id}`, { method: "DELETE" });
      await fetchGrades();
    } catch (err) {
      console.error(err);
    }
  };

  const filteredGrades = grades.filter(
    (g) =>
      (g.studentName || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (g.studentRoll || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (g.courseTitle || "").toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="h-full flex flex-col space-y-3 overflow-hidden">
      <div className="flex justify-between items-center flex-shrink-0 flex-wrap gap-2">
        <h2 className="text-base font-bold text-gray-800 flex items-center gap-2">
          <FaAward className="text-purple-600" /> Exam Grades
          <span className="text-xs font-normal text-gray-500">
            (Total: {grades.length})
          </span>
        </h2>
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-2 py-1 border rounded-lg text-xs w-40 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <button
            onClick={() => {
              resetForm();
              setShowForm(!showForm);
            }}
            className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1"
          >
            <FaPlusCircle size={12} /> {showForm ? "Close" : "Add Grade"}
          </button>
        </div>
      </div>

      {showForm && (
        <div className="bg-white border border-purple-200 rounded-xl shadow-sm p-4 flex-shrink-0">
          <h3 className="text-sm font-bold text-gray-800 mb-3 flex items-center gap-2">
            <FaSave className="text-purple-600" />{" "}
            {editingId ? "Edit Grade" : "Publish Grade"}
          </h3>
          <form onSubmit={handleSave} className="space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Student <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.studentId}
                  onChange={(e) => handleStudentChange(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-xs"
                  required
                >
                  <option value="">-- Select --</option>
                  {students.map((s) => (
                    <option key={s._id || s.id} value={s._id || s.id}>
                      {s.name} {s.roll ? `(Roll: ${s.roll})` : ""} — {s.phone}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Course <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.courseId}
                  onChange={(e) => handleCourseChange(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-xs"
                  required
                >
                  <option value="">-- Select --</option>
                  {courses.map((c) => (
                    <option key={c._id || c.id} value={c._id || c.id}>
                      {c.code ? `[${c.code}] ` : ""}
                      {c.title || c.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Overall Grade
                </label>
                <select
                  value={formData.grad}
                  onChange={(e) =>
                    setFormData({ ...formData, grad: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-xs"
                >
                  {[
                    "A+",
                    "A",
                    "A-",
                    "B+",
                    "B",
                    "B-",
                    "C+",
                    "C",
                    "D",
                    "F",
                    "N/A",
                  ].map((g) => (
                    <option key={g} value={g}>
                      {g}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Class Test
                </label>
                <input
                  type="text"
                  placeholder="85/100"
                  value={formData.classTest}
                  onChange={(e) =>
                    setFormData({ ...formData, classTest: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-xs"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Mid Term
                </label>
                <input
                  type="text"
                  placeholder="42/50"
                  value={formData.midTerm}
                  onChange={(e) =>
                    setFormData({ ...formData, midTerm: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-xs"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Final Exam
                </label>
                <select
                  value={formData.finalExam}
                  onChange={(e) =>
                    setFormData({ ...formData, finalExam: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-xs"
                >
                  <option value="Pending">Pending</option>
                  {["A+", "A", "A-", "B+", "B", "C", "D", "F"].map((g) => (
                    <option key={g} value={g}>
                      {g}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Teacher
                </label>
                <input
                  type="text"
                  value={formData.teacher}
                  onChange={(e) =>
                    setFormData({ ...formData, teacher: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-xs"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Remarks
                </label>
                <input
                  type="text"
                  value={formData.remarks}
                  onChange={(e) =>
                    setFormData({ ...formData, remarks: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-xs"
                />
              </div>
            </div>

            <div className="flex gap-2 pt-2 border-t">
              <button
                type="submit"
                disabled={saving}
                className="bg-purple-600 hover:bg-purple-700 disabled:bg-purple-400 text-white px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5"
              >
                {saving ? (
                  <>
                    <FaSpinner className="animate-spin" size={12} /> Saving...
                  </>
                ) : (
                  <>
                    <FaCheckCircle size={12} />{" "}
                    {editingId ? "Update" : "Publish"}
                  </>
                )}
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5"
              >
                <FaTimes size={12} /> Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden flex-1">
        <div className="overflow-auto h-full">
          {loading ? (
            <div className="flex items-center justify-center py-16">
              <FaSpinner className="animate-spin text-3xl text-purple-500" />
            </div>
          ) : filteredGrades.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <FaAward className="text-5xl text-gray-300 mb-3" />
              <p className="text-sm font-semibold text-gray-700">
                কোনো grade নেই
              </p>
              <p className="text-xs text-gray-500 mt-1">
                "Add Grade" button এ ক্লিক করুন
              </p>
            </div>
          ) : (
            <table className="w-full">
              <thead className="bg-gray-50 border-b sticky top-0 z-10">
                <tr>
                  <th className="px-3 py-2 text-left text-[10px] font-bold text-gray-600 uppercase">
                    Student
                  </th>
                  <th className="px-3 py-2 text-left text-[10px] font-bold text-gray-600 uppercase">
                    Course
                  </th>
                  <th className="px-3 py-2 text-center text-[10px] font-bold text-gray-600 uppercase">
                    Grad
                  </th>
                  <th className="px-3 py-2 text-center text-[10px] font-bold text-gray-600 uppercase">
                    Test
                  </th>
                  <th className="px-3 py-2 text-center text-[10px] font-bold text-gray-600 uppercase">
                    Mid
                  </th>
                  <th className="px-3 py-2 text-center text-[10px] font-bold text-gray-600 uppercase">
                    Final
                  </th>
                  <th className="px-3 py-2 text-right text-[10px] font-bold text-gray-600 uppercase">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {filteredGrades.map((g) => (
                  <tr key={g._id} className="hover:bg-gray-50">
                    <td className="px-3 py-2">
                      <p className="text-xs font-semibold">{g.studentName}</p>
                      {g.studentRoll && (
                        <p className="text-[10px] text-gray-500">
                          Roll: {g.studentRoll}
                        </p>
                      )}
                    </td>
                    <td className="px-3 py-2">
                      <p className="text-xs">{g.courseTitle}</p>
                      {g.courseCode && (
                        <p className="text-[10px] text-gray-500">
                          {g.courseCode}
                        </p>
                      )}
                    </td>
                    <td className="px-3 py-2 text-center">
                      <span className="text-xs font-bold text-teal-700 bg-teal-100 px-2 py-0.5 rounded">
                        {g.grad}
                      </span>
                    </td>
                    <td className="px-3 py-2 text-center text-xs">
                      {g.classTest || "-"}
                    </td>
                    <td className="px-3 py-2 text-center text-xs">
                      {g.midTerm || "-"}
                    </td>
                    <td className="px-3 py-2 text-center text-xs">
                      {g.finalExam || "-"}
                    </td>
                    <td className="px-3 py-2">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => handleEdit(g)}
                          className="text-green-600 p-1 hover:bg-green-50 rounded"
                        >
                          <FaEdit size={12} />
                        </button>
                        <button
                          onClick={() => handleDelete(g._id)}
                          className="text-red-600 p-1 hover:bg-red-50 rounded"
                        >
                          <FaTrash size={12} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

// ==================================================
// RESOURCES TAB (PDF + Quiz)
// ==================================================
const ResourcesTab = ({ type }) => {
  const isPdf = type === "pdf";
  const [courses, setCourses] = useState([]);
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showForm, setShowForm] = useState(false);

  const [formData, setFormData] = useState({
    courseId: "",
    courseTitle: "",
    courseCode: "",
    title: "",
    url: "",
    description: "",
  });

  useEffect(() => {
    fetchCourses();
    fetchResources();
  }, []);

  const fetchCourses = async () => {
    try {
      let res = await fetch(`${API_BASE}/api/courses/teacher/all`);
      let data = await res.json();
      if (!data.success || !data.courses) {
        res = await fetch(`${API_BASE}/api/courses/teacher/any`);
        data = await res.json();
      }
      if (data.success) setCourses(data.courses || []);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchResources = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_BASE}/api/course-resources/all`);
      const data = await res.json();
      if (data.success) {
        setResources((data.resources || []).filter((r) => r.type === type));
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCourseChange = (courseId) => {
    const co = courses.find((c) => String(c._id || c.id) === String(courseId));
    setFormData({
      ...formData,
      courseId: courseId || "",
      courseTitle: co?.title || co?.name || "",
      courseCode: co?.code || "",
    });
  };

  const resetForm = () => {
    setFormData({
      courseId: "",
      courseTitle: "",
      courseCode: "",
      title: "",
      url: "",
      description: "",
    });
    setShowForm(false);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!formData.courseId || !formData.title || !formData.url) {
      alert("Course, Title এবং URL আবশ্যক!");
      return;
    }
    setSaving(true);
    try {
      const res = await fetch(`${API_BASE}/api/course-resources/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, type }),
      });
      const data = await res.json();
      if (data.success) {
        await fetchResources();
        resetForm();
        alert(`✅ ${isPdf ? "PDF" : "Quiz"} added!`);
      } else alert("❌ " + (data.message || "Failed"));
    } catch (err) {
      alert("❌ " + err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm(`Delete this ${isPdf ? "PDF" : "Quiz"}?`)) return;
    try {
      await fetch(`${API_BASE}/api/course-resources/delete/${id}`, {
        method: "DELETE",
      });
      await fetchResources();
    } catch (err) {
      console.error(err);
    }
  };

  const filtered = resources.filter(
    (r) =>
      (r.title || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (r.courseTitle || "").toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const themeColor = isPdf ? "blue" : "green";
  const Icon = isPdf ? FaFilePdf : FaQuestionCircle;

  return (
    <div className="h-full flex flex-col space-y-3 overflow-hidden">
      <div className="flex justify-between items-center flex-shrink-0 flex-wrap gap-2">
        <h2
          className={`text-base font-bold text-gray-800 flex items-center gap-2`}
        >
          <Icon className={`text-${themeColor}-600`} />{" "}
          {isPdf ? "PDF Notes" : "Quizzes"}
          <span className="text-xs font-normal text-gray-500">
            (Total: {resources.length})
          </span>
        </h2>
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-2 py-1 border rounded-lg text-xs w-40"
          />
          <button
            onClick={() => {
              resetForm();
              setShowForm(!showForm);
            }}
            className={`bg-${themeColor}-600 hover:bg-${themeColor}-700 text-white px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1`}
          >
            <FaPlusCircle size={12} />{" "}
            {showForm ? "Close" : `Add ${isPdf ? "PDF" : "Quiz"}`}
          </button>
        </div>
      </div>

      {showForm && (
        <div
          className={`bg-white border border-${themeColor}-200 rounded-xl shadow-sm p-4 flex-shrink-0`}
        >
          <h3 className="text-sm font-bold text-gray-800 mb-3 flex items-center gap-2">
            <FaSave className={`text-${themeColor}-600`} /> Add New{" "}
            {isPdf ? "PDF Note" : "Quiz"}
          </h3>
          <form onSubmit={handleSave} className="space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Course <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.courseId}
                  onChange={(e) => handleCourseChange(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-xs"
                  required
                >
                  <option value="">-- Select Course --</option>
                  {courses.map((c) => (
                    <option key={c._id || c.id} value={c._id || c.id}>
                      {c.code ? `[${c.code}] ` : ""}
                      {c.title || c.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  {isPdf ? "PDF Title" : "Quiz Title"}{" "}
                  <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-xs"
                  placeholder={
                    isPdf ? "e.g., Class 1 Notes" : "e.g., Weekly Quiz 1"
                  }
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1 flex items-center gap-1">
                <FaLink size={10} /> {isPdf ? "PDF URL" : "Quiz URL"}{" "}
                <span className="text-red-500">*</span>
              </label>
              <input
                type="url"
                value={formData.url}
                onChange={(e) =>
                  setFormData({ ...formData, url: e.target.value })
                }
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-xs"
                placeholder={
                  isPdf
                    ? "https://drive.google.com/..."
                    : "https://forms.google.com/..."
                }
                required
              />
              <p className="text-[10px] text-gray-400 mt-1">
                {isPdf
                  ? "Google Drive, Dropbox বা direct PDF link"
                  : "Google Forms, Typeform বা online quiz link"}
              </p>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Description (optional)
              </label>
              <input
                type="text"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-xs"
                placeholder="Short description..."
              />
            </div>

            <div className="flex gap-2 pt-2 border-t">
              <button
                type="submit"
                disabled={saving}
                className={`bg-${themeColor}-600 hover:bg-${themeColor}-700 text-white px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 disabled:opacity-50`}
              >
                {saving ? (
                  <>
                    <FaSpinner className="animate-spin" size={12} /> Saving...
                  </>
                ) : (
                  <>
                    <FaCheckCircle size={12} /> Save
                  </>
                )}
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5"
              >
                <FaTimes size={12} /> Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden flex-1">
        <div className="overflow-auto h-full">
          {loading ? (
            <div className="flex items-center justify-center py-16">
              <FaSpinner
                className={`animate-spin text-3xl text-${themeColor}-500`}
              />
            </div>
          ) : filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <Icon className="text-5xl text-gray-300 mb-3" />
              <p className="text-sm font-semibold text-gray-700">
                কোনো {isPdf ? "PDF" : "Quiz"} নেই
              </p>
              <p className="text-xs text-gray-500 mt-1">
                উপরে "Add" button এ ক্লিক করুন
              </p>
            </div>
          ) : (
            <table className="w-full">
              <thead className="bg-gray-50 border-b sticky top-0 z-10">
                <tr>
                  <th className="px-3 py-2 text-left text-[10px] font-bold text-gray-600 uppercase">
                    Title
                  </th>
                  <th className="px-3 py-2 text-left text-[10px] font-bold text-gray-600 uppercase">
                    Course
                  </th>
                  <th className="px-3 py-2 text-left text-[10px] font-bold text-gray-600 uppercase">
                    Link
                  </th>
                  <th className="px-3 py-2 text-right text-[10px] font-bold text-gray-600 uppercase">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {filtered.map((r) => (
                  <tr key={r._id} className="hover:bg-gray-50">
                    <td className="px-3 py-2">
                      <p className="text-xs font-semibold">{r.title}</p>
                      {r.description && (
                        <p className="text-[10px] text-gray-500 truncate max-w-xs">
                          {r.description}
                        </p>
                      )}
                    </td>
                    <td className="px-3 py-2">
                      <p className="text-xs">{r.courseTitle}</p>
                      {r.courseCode && (
                        <p className="text-[10px] text-gray-500">
                          {r.courseCode}
                        </p>
                      )}
                    </td>
                    <td className="px-3 py-2">
                      <a
                        href={r.url}
                        target="_blank"
                        rel="noreferrer"
                        className={`text-xs text-${themeColor}-600 hover:underline flex items-center gap-1`}
                      >
                        <FaExternalLinkAlt size={10} /> Open
                      </a>
                    </td>
                    <td className="px-3 py-2">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => handleDelete(r._id)}
                          className="text-red-600 p-1 hover:bg-red-50 rounded"
                        >
                          <FaTrash size={12} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default Admin_exam_grad;
