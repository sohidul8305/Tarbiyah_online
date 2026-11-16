// src/Page/Admin/new-admission/UpdateStudentModal.jsx
import React, { useState } from "react";
import Swal from "sweetalert2";

// ✅ Same base as New_admission.jsx
const API_BASE = "https://api.tarbiyahonline.com/api";

const UpdateStudentModal = ({ student, onClose, onSaved }) => {
  const [form, setForm] = useState({
    name: student.name || "",
    phone: student.phone || "",
    email: student.email || "",
    country: student.country || "",
    fatherName: student.fatherName || "",
    motherName: student.motherName || "",
    guardianPhone: student.guardianPhone || "",
    presentAddress: student.address || student.presentAddress || "",
    permanentAddress: student.permanentAddress || "",
    gender: student.gender || "",
    age: student.age || "",
    maritalStatus: student.maritalStatus || "",
    occupation: student.occupation || "",
    courseFee: student.courseFee || 0,
    paidAmount: student.paidAmount || 0,
    scholarshipAmount: student.scholarshipAmount || 0,
    paymentStatus: student.paymentStatus || "Unpaid",
    status: student.status || "Pending",
  });
  const [saving, setSaving] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };

  const handleSave = async () => {
    // ✅ Validation
    if (!form.name.trim()) {
      Swal.fire("Missing", "Name is required", "warning");
      return;
    }
    if (!form.phone.trim()) {
      Swal.fire("Missing", "Phone is required", "warning");
      return;
    }

    setSaving(true);
    try {
      // ✅ _id priority, fallback to studentId
      const id = student._id || student.id || student.studentId;
      if (!id) {
        throw new Error("Student ID is missing");
      }

      const res = await fetch(`${API_BASE}/students/update/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (data.success) {
        Swal.fire({
          icon: "success",
          title: "✅ Updated!",
          text: "Student information updated successfully",
          timer: 1500,
          showConfirmButton: false,
        });
        onSaved?.(data);
      } else {
        Swal.fire("Failed", data.message || "Update failed", "error");
      }
    } catch (err) {
      console.error("❌ Update error:", err);
      Swal.fire("Error", err.message || "Network error", "error");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-[999] flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-3xl max-h-[92vh] overflow-y-auto">
        {/* Header */}
        <div
          className="px-5 py-3 flex justify-between items-center rounded-t-xl sticky top-0 z-10"
          style={{ backgroundColor: "#004d4d" }}
        >
          <h2 className="text-white font-bold text-lg">
            ✏️ Update Student —{" "}
            <span className="font-mono text-sm">
              {student.studentId || student._id || "—"}
            </span>
          </h2>
          <button
            onClick={onClose}
            className="text-white text-2xl leading-none hover:opacity-80"
            title="Close"
          >
            ×
          </button>
        </div>

        {/* Body */}
        <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* ===== Personal Info ===== */}
          <div className="md:col-span-2">
            <h3 className="text-sm font-bold text-[#004d4d] border-b pb-1 mb-2">
              👤 Personal Information
            </h3>
          </div>

          <Input
            label="Full Name *"
            name="name"
            value={form.name}
            onChange={handleChange}
          />
          <Input
            label="Phone * (+country code)"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="+880... / +966... / +971..."
          />
          <Input
            label="Email"
            name="email"
            value={form.email}
            onChange={handleChange}
            type="email"
          />
          <Input
            label="Country"
            name="country"
            value={form.country}
            onChange={handleChange}
          />
          <Input
            label="Age"
            name="age"
            value={form.age}
            onChange={handleChange}
            type="number"
          />
          <Select
            label="Gender"
            name="gender"
            value={form.gender}
            onChange={handleChange}
            options={["male", "female", "other"]}
          />
          <Select
            label="Marital Status"
            name="maritalStatus"
            value={form.maritalStatus}
            onChange={handleChange}
            options={["single", "married", "divorced", "widowed"]}
          />
          <Input
            label="Occupation"
            name="occupation"
            value={form.occupation}
            onChange={handleChange}
          />

          {/* ===== Family ===== */}
          <div className="md:col-span-2 mt-2">
            <h3 className="text-sm font-bold text-[#004d4d] border-b pb-1 mb-2">
              👨‍👩‍👧 Family Information
            </h3>
          </div>
          <Input
            label="Father's Name"
            name="fatherName"
            value={form.fatherName}
            onChange={handleChange}
          />
          <Input
            label="Mother's Name"
            name="motherName"
            value={form.motherName}
            onChange={handleChange}
          />
          <Input
            label="Guardian Phone"
            name="guardianPhone"
            value={form.guardianPhone}
            onChange={handleChange}
          />

          {/* ===== Address ===== */}
          <div className="md:col-span-2 mt-2">
            <h3 className="text-sm font-bold text-[#004d4d] border-b pb-1 mb-2">
              🏠 Address
            </h3>
          </div>
          <div className="md:col-span-2">
            <Textarea
              label="Present Address"
              name="presentAddress"
              value={form.presentAddress}
              onChange={handleChange}
            />
          </div>
          <div className="md:col-span-2">
            <Textarea
              label="Permanent Address"
              name="permanentAddress"
              value={form.permanentAddress}
              onChange={handleChange}
            />
          </div>

          {/* ===== Fee ===== */}
          <div className="md:col-span-2 mt-2">
            <h3 className="text-sm font-bold text-[#004d4d] border-b pb-1 mb-2">
              💳 Fee & Payment
            </h3>
          </div>
          <Input
            label="Course Fee (৳)"
            name="courseFee"
            value={form.courseFee}
            onChange={handleChange}
            type="number"
          />
          <Input
            label="Paid Amount (৳)"
            name="paidAmount"
            value={form.paidAmount}
            onChange={handleChange}
            type="number"
          />
          <Input
            label="Scholarship (৳)"
            name="scholarshipAmount"
            value={form.scholarshipAmount}
            onChange={handleChange}
            type="number"
          />
          <Select
            label="Payment Status"
            name="paymentStatus"
            value={form.paymentStatus}
            onChange={handleChange}
            options={["Unpaid", "Partial", "Paid"]}
          />
          <Select
            label="Account Status"
            name="status"
            value={form.status}
            onChange={handleChange}
            options={["Pending", "Approved", "Rejected"]}
          />
        </div>

        {/* Footer */}
        <div className="px-5 py-3 border-t flex justify-end gap-3 sticky bottom-0 bg-white">
          <button
            onClick={onClose}
            disabled={saving}
            className="px-4 py-2 rounded-md bg-gray-500 text-white hover:bg-gray-600 disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="px-6 py-2 rounded-md text-white font-semibold hover:opacity-90 disabled:opacity-50"
            style={{ backgroundColor: "#004d4d" }}
          >
            {saving ? "⏳ Saving..." : "💾 Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
};

// ═══════════════════════════════════════
// Small Reusable Input Components
// ═══════════════════════════════════════
const Input = ({ label, ...p }) => (
  <div>
    <label className="block text-xs font-semibold text-gray-700 mb-1">
      {label}
    </label>
    <input
      {...p}
      className="w-full border rounded-md px-3 py-2 text-sm focus:border-[#004d4d] focus:ring-1 focus:ring-[#004d4d] outline-none disabled:bg-gray-100"
    />
  </div>
);

const Textarea = ({ label, ...p }) => (
  <div>
    <label className="block text-xs font-semibold text-gray-700 mb-1">
      {label}
    </label>
    <textarea
      rows={2}
      {...p}
      className="w-full border rounded-md px-3 py-2 text-sm focus:border-[#004d4d] focus:ring-1 focus:ring-[#004d4d] outline-none"
    />
  </div>
);

const Select = ({ label, options, ...p }) => (
  <div>
    <label className="block text-xs font-semibold text-gray-700 mb-1">
      {label}
    </label>
    <select
      {...p}
      className="w-full border rounded-md px-3 py-2 text-sm bg-white focus:border-[#004d4d] focus:ring-1 focus:ring-[#004d4d] outline-none"
    >
      <option value="">— Select —</option>
      {options.map((o) => (
        <option key={o} value={o}>
          {o.charAt(0).toUpperCase() + o.slice(1)}
        </option>
      ))}
    </select>
  </div>
);

export default UpdateStudentModal;
