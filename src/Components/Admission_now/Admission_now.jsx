import React, { useState } from "react";
import Footer from "../Navbar/Footer/Footer";
import Navbar from "../Navbar/Navbar";
import Swal from "sweetalert2";

const Admission_now = () => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    // Personal Information
    name: "",
    nationalId: "",
    dateOfBirth: "",
    age: "",
    phoneNumber: "",
    email: "",

    // Family Information
    fatherName: "",
    motherName: "",
    guardianPhone: "",

    // Address
    presentAddress: "",
    permanentAddress: "",

    // Additional Information
    gender: "",
    occupation: "",
    maritalStatus: "",

    // Course Selection
    selectedDepartment: "",
    selectedCourses: [],

    // Payment Information
    paymentMethod: "",
    paymentType: "",
    transactionId: "",
    paymentRemarks: "",
    paidAmount: "",
    bkashNumber: "",
    nagodNumber: "",
    rocketNumber: "",
    merchantNumber: "",
    bankAccount: "",
  });

  // Departments and Courses
  const departments = {
    "islamic-studies": {
      name: "Diploma in Islamic Studies",
      courses: [
        {
          id: "is1",
          name: "Diploma in Islamic Studies",
          price: 12000,
          duration: "1 Year",
        },
      ],
    },
    alemiyah: {
      name: "Tarbiyah Alimiyah",
      courses: [
        {
          id: "al1",
          name: "Alimiyah for Kids",
          price: 8000,
          duration: "6 Months",
        },
        {
          id: "al2",
          name: "Alimiyah Program",
          price: 20000,
          duration: "2 Years",
        },
      ],
    },
    "quran-studies": {
      name: "Tarbiyah Quran Studies",
      courses: [
        { id: "qs1", name: "Qaida Noorani", price: 3000, duration: "2 Months" },
        { id: "qs2", name: "Nazera", price: 4000, duration: "3 Months" },
        { id: "qs3", name: "Hifzul Quran", price: 25000, duration: "2 Years" },
        {
          id: "qs4",
          name: "Hifz Revision (One to One)",
          price: 10000,
          duration: "6 Months",
        },
      ],
    },
    "quran-elders": {
      name: "Quran for Elders",
      courses: [
        {
          id: "qe1",
          name: "Qaida Nooraniya",
          price: 3000,
          duration: "2 Months",
        },
        { id: "qe2", name: "Quran Nazera", price: 4000, duration: "3 Months" },
        { id: "qe3", name: "Hifzul Quran", price: 20000, duration: "2 Years" },
        {
          id: "qe4",
          name: "Basic Tajweed (Level-1)",
          price: 3000,
          duration: "2 Months",
        },
        {
          id: "qe5",
          name: "Advanced Tajweed",
          price: 5000,
          duration: "3 Months",
        },
      ],
    },
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      if (checked) {
        setFormData({
          ...formData,
          selectedCourses: [...formData.selectedCourses, value],
        });
      } else {
        setFormData({
          ...formData,
          selectedCourses: formData.selectedCourses.filter(
            (course) => course !== value,
          ),
        });
      }
    } else if (name === "selectedDepartment") {
      // ডিপার্টমেন্ট চেঞ্জ হলে প্রথম কোর্সটি ডিফল্ট সিলেক্টেড করব
      const firstCourse = departments[value]?.courses[0];
      setFormData({
        ...formData,
        selectedDepartment: value,
        selectedCourses: firstCourse ? [firstCourse.id] : [],
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const calculateAge = (dob) => {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    return age;
  };

  const handleDateChange = (e) => {
    const dob = e.target.value;
    if (dob) {
      const age = calculateAge(dob);
      setFormData({
        ...formData,
        dateOfBirth: dob,
        age: age,
      });
    }
  };

  const handleNext = () => {
    setStep(step + 1);
  };

  const handlePrevious = () => {
    setStep(step - 1);
  };

  const getCurrentCourses = () => {
    return departments[formData.selectedDepartment]?.courses || [];
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!formData.name || !formData.phoneNumber || !formData.email) {
        Swal.fire({
          icon: "warning",
          title: "Information Incomplete!",
          text: "Name, Phone Number and Email are required.",
        });
        setLoading(false);
        return;
      }

      const selectedCourseNames = formData.selectedCourses
        .map((courseId) => {
          const course = getCurrentCourses().find((c) => c.id === courseId);
          return course ? course.name : "";
        })
        .filter(Boolean);

      const paymentStatus =
        formData.paidAmount && parseFloat(formData.paidAmount) > 0
          ? "Paid"
          : "Unpaid";

      const payload = {
        // Personal Information
        name: formData.name,
        email: formData.email,
        phone: formData.phoneNumber,
        password: "student123S@",
        course:
          selectedCourseNames.join(", ") ||
          formData.selectedDepartment ||
          "Not Specified",

        // Family Information
        fatherName: formData.fatherName || "",
        motherName: formData.motherName || "",
        guardianName: formData.fatherName || "",
        guardianPhone: formData.guardianPhone || formData.phoneNumber,

        // Address
        presentAddress: formData.presentAddress || "",
        permanentAddress: formData.permanentAddress || "",

        // Additional Information
        dobOrNid: formData.nationalId || "",
        gender: formData.gender || "",
        occupation: formData.occupation || "",
        maritalStatus: formData.maritalStatus || "",
        age: formData.age || "",

        // Payment Information
        paymentMethod: formData.paymentMethod || "",
        paymentType: formData.paymentType || "",
        transactionId: formData.transactionId || "",
        paidAmount: formData.paidAmount || "",
        paymentRemarks: formData.paymentRemarks || "",
        paymentStatus: paymentStatus,

        // Status
        status: "Pending",
        admissionDate: new Date().toISOString(),
      };

      console.log("📤 ====== SENDING PAYLOAD ======");
      console.log("📤 Payment Method:", payload.paymentMethod);
      console.log("📤 Transaction ID:", payload.transactionId);
      console.log("📤 Payment Status:", payload.paymentStatus);
      console.log("📤 Admission Date:", payload.admissionDate);
      console.log("📤 ===========================");

      const response = await fetch(
        "http://localhost:5000/api/students/register/student",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        },
      );

      const data = await response.json();
      console.log("📥 Response:", data);

      if (data.success) {
        Swal.fire({
          icon: "success",
          title: "🎉 Admission Completed!",
          html: `
          <div style="text-align: left;">
            <p><strong>Name:</strong> ${formData.name}</p>
            <p><strong>Phone:</strong> ${formData.phoneNumber}</p>
            <p><strong>Email:</strong> ${formData.email}</p>
            <p><strong>Course:</strong> ${selectedCourseNames.join(", ") || "N/A"}</p>
            <p><strong>Payment Method:</strong> ${formData.paymentMethod || "N/A"}</p>
            <p><strong>Transaction ID:</strong> ${formData.transactionId || "N/A"}</p>
            <p><strong>Payment Status:</strong> ${paymentStatus}</p>
            <hr style="margin: 10px 0;">
            <p style="color: #004d4d; font-weight: bold;">
              ✅ Your application has been submitted!<br/>
              You can login after admin approval.
            </p>
            <p style="font-size: 12px; color: #666; margin-top: 5px;">
              Username: <strong>${formData.email}</strong><br/>
              Password: <strong>student123S@</strong>
            </p>
          </div>
        `,
          confirmButtonColor: "#004d4d",
          confirmButtonText: "OK",
        });

        // Reset form
        setFormData({
          name: "",
          nationalId: "",
          dateOfBirth: "",
          age: "",
          phoneNumber: "",
          email: "",
          fatherName: "",
          motherName: "",
          guardianPhone: "",
          presentAddress: "",
          permanentAddress: "",
          gender: "",
          occupation: "",
          maritalStatus: "",
          selectedDepartment: "",
          selectedCourses: [],
          paymentMethod: "",
          paymentType: "",
          transactionId: "",
          paymentRemarks: "",
          paidAmount: "",
          bkashNumber: "",
          nagodNumber: "",
          rocketNumber: "",
          merchantNumber: "",
          bankAccount: "",
        });

        setStep(1);
      } else {
        Swal.fire({
          icon: "error",
          title: "Admission Failed!",
          text: data.message || "Please try again.",
          confirmButtonColor: "#004d4d",
        });
      }
    } catch (error) {
      console.error("❌ Admission Error:", error);
      Swal.fire({
        icon: "error",
        title: "Server Connection Error!",
        text: "Please check if backend server is running.",
        confirmButtonColor: "#004d4d",
      });
    } finally {
      setLoading(false);
    }
  };

  const calculateTotal = () => {
    let total = 0;
    const currentCourses =
      departments[formData.selectedDepartment]?.courses || [];
    formData.selectedCourses.forEach((courseId) => {
      const course = currentCourses.find((c) => c.id === courseId);
      if (course) total += course.price;
    });
    return total;
  };

  const getMerchantNumber = () => {
    if (formData.paymentMethod === "bkash") {
      return "01841412525";
    } else if (formData.paymentMethod === "nagod") {
      return "01841512525";
    }
    return "";
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <Navbar></Navbar>
      <div
        className="max-w-4xl mx-auto bg-white rounded-lg shadow-xl p-6 border-t-4 mb-20 mt-10"
        style={{ borderColor: "#00ADD2" }}
      >
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold" style={{ color: "#00ADD2" }}>
            Tarbiyah Online Madrasha
          </h1>
          <p className="text-gray-600 mt-2">Trusted Islamic Education</p>
        </div>

        <h2
          className="text-2xl font-bold text-center mb-6"
          style={{ color: "#00ADD2" }}
        >
          Admission Form
        </h2>

        {/* Progress Steps - এখন Course Selection প্রথমে */}
        <div className="flex justify-between mb-8">
          <div
            className={`flex-1 text-center ${step >= 1 ? "text-[#00ADD2]" : "text-gray-400"}`}
          >
            <div
              className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center ${step >= 1 ? "bg-[#00ADD2] text-white" : "bg-gray-300"}`}
            >
              1
            </div>
            <span className="text-sm">Course Selection</span>
          </div>
          <div
            className={`flex-1 text-center ${step >= 2 ? "text-[#00ADD2]" : "text-gray-400"}`}
          >
            <div
              className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center ${step >= 2 ? "bg-[#00ADD2] text-white" : "bg-gray-300"}`}
            >
              2
            </div>
            <span className="text-sm">Personal Info</span>
          </div>
          <div
            className={`flex-1 text-center ${step >= 3 ? "text-[#00ADD2]" : "text-gray-400"}`}
          >
            <div
              className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center ${step >= 3 ? "bg-[#00ADD2] text-white" : "bg-gray-300"}`}
            >
              3
            </div>
            <span className="text-sm">Family & Address</span>
          </div>
          <div
            className={`flex-1 text-center ${step >= 4 ? "text-[#00ADD2]" : "text-gray-400"}`}
          >
            <div
              className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center ${step >= 4 ? "bg-[#00ADD2] text-white" : "bg-gray-300"}`}
            >
              4
            </div>
            <span className="text-sm">Payment</span>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Step 1: Course Selection - এখন প্রথমে */}
          {step === 1 && (
            <div className="space-y-4">
              <h2
                className="text-xl font-semibold mb-4"
                style={{ color: "#00ADD2" }}
              >
                Department & Course Selection
              </h2>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Department *
                </label>
                <select
                  name="selectedDepartment"
                  value={formData.selectedDepartment}
                  onChange={handleInputChange}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#00ADD2] focus:ring-[#00ADD2] p-2 border"
                >
                  <option value="">Select Department</option>
                  <option value="islamic-studies">
                    Diploma in Islamic Studies
                  </option>
                  <option value="alemiyah">Tarbiyah Alimiyah</option>
                  <option value="quran-studies">Tarbiyah Quran Studies</option>
                  <option value="quran-elders">Quran for Elders</option>
                </select>
              </div>

              {formData.selectedDepartment && (
                <div>
                  <h3
                    className="font-semibold mb-3"
                    style={{ color: "#00ADD2" }}
                  >
                    {departments[formData.selectedDepartment]?.name} - Courses
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {getCurrentCourses().map((course) => (
                      <div
                        key={course.id}
                        className="border rounded-lg p-4 hover:shadow-md transition"
                        style={{ borderColor: "#00ADD2" }}
                      >
                        <label className="flex items-start space-x-3 cursor-pointer">
                          <input
                            type="checkbox"
                            value={course.id}
                            checked={formData.selectedCourses.includes(
                              course.id,
                            )}
                            onChange={handleInputChange}
                            className="mt-1 h-4 w-4 focus:ring-[#00ADD2] border-gray-300 rounded"
                            style={{ color: "#00ADD2" }}
                          />
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-800">
                              {course.name}
                            </h4>
                            <div className="flex justify-between mt-1">
                              <span className="text-xs text-gray-500">
                                Duration: {course.duration}
                              </span>
                              <span
                                className="text-sm font-medium"
                                style={{ color: "#00ADD2" }}
                              >
                                ৳{course.price.toLocaleString()}
                              </span>
                            </div>
                          </div>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {formData.selectedCourses.length > 0 && (
                <div
                  className="p-4 rounded-lg mt-4"
                  style={{ backgroundColor: "#e6f7f9" }}
                >
                  <h3
                    className="font-semibold text-lg"
                    style={{ color: "#00ADD2" }}
                  >
                    Selected Courses:
                  </h3>
                  <ul className="list-disc list-inside space-y-1">
                    {formData.selectedCourses.map((courseId) => {
                      const course = getCurrentCourses().find(
                        (c) => c.id === courseId,
                      );
                      return course ? (
                        <li key={courseId}>
                          <span className="font-medium">{course.name}</span>
                          <span className="text-sm text-gray-600">
                            {" "}
                            - {course.duration}
                          </span>
                          <span
                            className="text-sm font-medium ml-2"
                            style={{ color: "#00ADD2" }}
                          >
                            ৳{course.price.toLocaleString()}
                          </span>
                        </li>
                      ) : null;
                    })}
                  </ul>
                  <div className="mt-3 pt-2 border-t border-gray-300">
                    <p
                      className="font-bold text-lg"
                      style={{ color: "#00ADD2" }}
                    >
                      Total Amount: ৳{calculateTotal().toLocaleString()}
                    </p>
                  </div>
                </div>
              )}

              <div className="flex justify-end mt-6">
                <button
                  type="button"
                  onClick={handleNext}
                  className="text-white px-6 py-2 rounded-md hover:opacity-90 transition"
                  style={{ backgroundColor: "#00ADD2" }}
                >
                  Next →
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Personal Information */}
          {step === 2 && (
            <div className="space-y-4">
              <h2
                className="text-xl font-semibold mb-4"
                style={{ color: "#00ADD2" }}
              >
                Personal Information
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#00ADD2] focus:ring-[#00ADD2] p-2 border"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    National ID / Birth Reg No. *
                  </label>
                  <input
                    type="text"
                    name="nationalId"
                    value={formData.nationalId}
                    onChange={handleInputChange}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#00ADD2] focus:ring-[#00ADD2] p-2 border"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Date of Birth *
                  </label>
                  <input
                    type="date"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleDateChange}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#00ADD2] focus:ring-[#00ADD2] p-2 border"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Age
                  </label>
                  <input
                    type="text"
                    name="age"
                    value={formData.age}
                    readOnly
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm bg-gray-50 p-2 border"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#00ADD2] focus:ring-[#00ADD2] p-2 border"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#00ADD2] focus:ring-[#00ADD2] p-2 border"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Gender *
                  </label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#00ADD2] focus:ring-[#00ADD2] p-2 border"
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Marital Status
                  </label>
                  <select
                    name="maritalStatus"
                    value={formData.maritalStatus}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#00ADD2] focus:ring-[#00ADD2] p-2 border"
                  >
                    <option value="">Select Status</option>
                    <option value="single">Single</option>
                    <option value="married">Married</option>
                    <option value="divorced">Divorced</option>
                    <option value="widowed">Widowed</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-between mt-6">
                <button
                  type="button"
                  onClick={handlePrevious}
                  className="bg-gray-500 text-white px-6 py-2 rounded-md hover:bg-gray-600 transition"
                >
                  ← Previous
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  className="text-white px-6 py-2 rounded-md hover:opacity-90 transition"
                  style={{ backgroundColor: "#00ADD2" }}
                >
                  Next →
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Family & Address Information */}
          {step === 3 && (
            <div className="space-y-4">
              <h2
                className="text-xl font-semibold mb-4"
                style={{ color: "#00ADD2" }}
              >
                Family & Address Information
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Father's Name *
                  </label>
                  <input
                    type="text"
                    name="fatherName"
                    value={formData.fatherName}
                    onChange={handleInputChange}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#00ADD2] focus:ring-[#00ADD2] p-2 border"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Mother's Name *
                  </label>
                  <input
                    type="text"
                    name="motherName"
                    value={formData.motherName}
                    onChange={handleInputChange}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#00ADD2] focus:ring-[#00ADD2] p-2 border"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Guardian's Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="guardianPhone"
                    value={formData.guardianPhone}
                    onChange={handleInputChange}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#00ADD2] focus:ring-[#00ADD2] p-2 border"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Occupation
                  </label>
                  <input
                    type="text"
                    name="occupation"
                    value={formData.occupation}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#00ADD2] focus:ring-[#00ADD2] p-2 border"
                  />
                </div>

                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Present Address *
                  </label>
                  <textarea
                    name="presentAddress"
                    value={formData.presentAddress}
                    onChange={handleInputChange}
                    required
                    rows="2"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#00ADD2] focus:ring-[#00ADD2] p-2 border"
                  />
                </div>

                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Permanent Address *
                  </label>
                  <textarea
                    name="permanentAddress"
                    value={formData.permanentAddress}
                    onChange={handleInputChange}
                    required
                    rows="2"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#00ADD2] focus:ring-[#00ADD2] p-2 border"
                  />
                </div>
              </div>

              <div className="flex justify-between mt-6">
                <button
                  type="button"
                  onClick={handlePrevious}
                  className="bg-gray-500 text-white px-6 py-2 rounded-md hover:bg-gray-600 transition"
                >
                  ← Previous
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  className="text-white px-6 py-2 rounded-md hover:opacity-90 transition"
                  style={{ backgroundColor: "#00ADD2" }}
                >
                  Next →
                </button>
              </div>
            </div>
          )}

          {/* Step 4: Payment Information */}
          {step === 4 && (
            <div className="space-y-4">
              <h2
                className="text-xl font-semibold mb-4"
                style={{ color: "#00ADD2" }}
              >
                Payment Information
              </h2>

              {/* Payment Instructions */}
              <div
                className="p-4 rounded-lg border-2"
                style={{ backgroundColor: "#fff8e1", borderColor: "#ff9800" }}
              >
                <h4 className="font-bold text-orange-600 mb-2">
                  ⚠️ Payment Instructions:
                </h4>
                <ul className="text-sm text-gray-700 space-y-1 list-disc list-inside">
                  <li>
                    For bKash & Nagad, use{" "}
                    <span className="font-bold text-green-600">
                      "Merchant Pay"
                    </span>{" "}
                    option only.
                  </li>
                  <li>
                    Merchant Number:{" "}
                    <span className="font-bold" style={{ color: "#00ADD2" }}>
                      bKash: 01841412525
                    </span>{" "}
                    and{" "}
                    <span className="font-bold" style={{ color: "#00ADD2" }}>
                      Nagad: 01841512525
                    </span>
                  </li>
                  <li>You can also pay via Bank Transfer.</li>
                </ul>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Payment Method */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Payment Method *
                  </label>
                  <select
                    name="paymentMethod"
                    value={formData.paymentMethod}
                    onChange={handleInputChange}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#00ADD2] focus:ring-[#00ADD2] p-2 border"
                  >
                    <option value="">Select Payment Method</option>
                    <option value="bkash">bKash (Merchant Pay)</option>
                    <option value="nagod">Nagad (Merchant Pay)</option>
                    <option value="rocket">Rocket</option>
                    <option value="bank">Bank Transfer</option>
                    <option value="ssl">SSL Commerz (Online)</option>
                  </select>
                </div>

                {/* Payment Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Payment Type *
                  </label>
                  <select
                    name="paymentType"
                    value={formData.paymentType}
                    onChange={handleInputChange}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#00ADD2] focus:ring-[#00ADD2] p-2 border"
                  >
                    <option value="">Select Payment Type</option>
                    <option value="online">Online Payment</option>
                    <option value="offline">Offline Payment</option>
                  </select>
                </div>

                {/* Merchant Number Display */}
                {(formData.paymentMethod === "bkash" ||
                  formData.paymentMethod === "nagod") && (
                  <div className="col-span-2">
                    <div
                      className="p-3 rounded-lg"
                      style={{
                        backgroundColor: "#e6f7f9",
                        borderColor: "#00ADD2",
                      }}
                    >
                      <p className="text-sm font-medium">
                        📌{" "}
                        {formData.paymentMethod === "bkash" ? "bKash" : "Nagad"}{" "}
                        Merchant Number:
                        <span
                          className="font-bold ml-2"
                          style={{ color: "#00ADD2" }}
                        >
                          {formData.paymentMethod === "bkash"
                            ? "01841412525"
                            : "01841512525"}
                        </span>
                      </p>
                      <p className="text-xs text-red-600 mt-1">
                        ⚠️ Use "Merchant Pay" option only. "Send Money" will not
                        work.
                      </p>
                    </div>
                  </div>
                )}

                {/* Bank Information */}
                {formData.paymentMethod === "bank" && (
                  <div className="col-span-2">
                    <div
                      className="p-3 rounded-lg border"
                      style={{
                        backgroundColor: "#e6f7f9",
                        borderColor: "#00ADD2",
                      }}
                    >
                      <h4 className="font-bold" style={{ color: "#00ADD2" }}>
                        🏦 Bank Information:
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2 text-sm">
                        <div>
                          <p>
                            <span className="font-semibold">Account Name:</span>{" "}
                            Tarbiyah Academy
                          </p>
                          <p>
                            <span className="font-semibold">
                              Account Number:
                            </span>{" "}
                            401211100007923
                          </p>
                          <p>
                            <span className="font-semibold">Bank:</span>{" "}
                            Shahjalal Islami Bank Limited
                          </p>
                        </div>
                        <div>
                          <p>
                            <span className="font-semibold">Branch:</span>{" "}
                            Satmasjid Road Branch
                          </p>
                          <p>
                            <span className="font-semibold">Branch Code:</span>{" "}
                            4012
                          </p>
                          <p>
                            <span className="font-semibold">SWIFT Code:</span>{" "}
                            SJBLBDDHSMR
                          </p>
                          <p>
                            <span className="font-semibold">Routing No:</span>{" "}
                            190264035
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Mobile Number (bKash/Nagad/Rocket) */}
                {(formData.paymentMethod === "bkash" ||
                  formData.paymentMethod === "nagod" ||
                  formData.paymentMethod === "rocket") && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      {formData.paymentMethod === "bkash"
                        ? "bKash"
                        : formData.paymentMethod === "nagod"
                          ? "Nagad"
                          : "Rocket"}{" "}
                      Number (Yours) *
                    </label>
                    <input
                      type="text"
                      name={
                        formData.paymentMethod === "bkash"
                          ? "bkashNumber"
                          : formData.paymentMethod === "nagod"
                            ? "nagodNumber"
                            : "rocketNumber"
                      }
                      value={
                        formData.paymentMethod === "bkash"
                          ? formData.bkashNumber
                          : formData.paymentMethod === "nagod"
                            ? formData.nagodNumber
                            : formData.rocketNumber
                      }
                      onChange={handleInputChange}
                      required
                      placeholder="01xxxxxxxxx"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#00ADD2] focus:ring-[#00ADD2] p-2 border"
                    />
                  </div>
                )}

                {/* Amount Paid */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Amount Paid (৳) *
                  </label>
                  <input
                    type="number"
                    name="paidAmount"
                    value={formData.paidAmount}
                    onChange={handleInputChange}
                    required
                    placeholder={
                      calculateTotal() > 0
                        ? `Total: ৳${calculateTotal()}`
                        : "Enter amount"
                    }
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#00ADD2] focus:ring-[#00ADD2] p-2 border"
                  />
                  {calculateTotal() > 0 && (
                    <p className="text-xs text-gray-500 mt-1">
                      Total to pay: ৳{calculateTotal().toLocaleString()}
                    </p>
                  )}
                </div>

                {/* Transaction ID */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Transaction ID *
                  </label>
                  <input
                    type="text"
                    name="transactionId"
                    value={formData.transactionId}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter transaction ID"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#00ADD2] focus:ring-[#00ADD2] p-2 border"
                  />
                </div>

                {/* Payment Remarks */}
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Payment Remarks
                  </label>
                  <textarea
                    name="paymentRemarks"
                    value={formData.paymentRemarks}
                    onChange={handleInputChange}
                    rows="2"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#00ADD2] focus:ring-[#00ADD2] p-2 border"
                    placeholder="Additional payment information (if any)..."
                  />
                </div>
              </div>

              {/* SSL Commerz */}
              {formData.paymentMethod === "ssl" && (
                <div
                  className="p-4 rounded-lg border"
                  style={{ backgroundColor: "#e6f7f9", borderColor: "#00ADD2" }}
                >
                  <h3 className="font-semibold" style={{ color: "#00ADD2" }}>
                    SSL Commerz Online Payment
                  </h3>
                  <p className="text-sm text-gray-600">
                    You will be redirected to SSL Commerz payment gateway for
                    secure payment.
                  </p>
                  <button
                    type="button"
                    className="mt-2 text-white px-4 py-2 rounded hover:opacity-90"
                    style={{ backgroundColor: "#00ADD2" }}
                  >
                    Pay with SSL Commerz
                  </button>
                </div>
              )}

              {/* Payment Summary */}
              <div
                className="p-4 rounded-lg border"
                style={{ backgroundColor: "#f0f9fa", borderColor: "#00ADD2" }}
              >
                <h4 className="font-semibold" style={{ color: "#00ADD2" }}>
                  Payment Summary
                </h4>
                <div className="flex justify-between mt-2">
                  <span>Total Course Fee:</span>
                  <span className="font-bold" style={{ color: "#00ADD2" }}>
                    ৳{calculateTotal().toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Selected Department:</span>
                  <span className="font-semibold">
                    {formData.selectedDepartment
                      ? departments[formData.selectedDepartment]?.name
                      : "-"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Payment Method:</span>
                  <span className="font-semibold">
                    {formData.paymentMethod === "bkash"
                      ? "bKash"
                      : formData.paymentMethod === "nagod"
                        ? "Nagad"
                        : formData.paymentMethod === "rocket"
                          ? "Rocket"
                          : formData.paymentMethod === "bank"
                            ? "Bank Transfer"
                            : formData.paymentMethod === "ssl"
                              ? "SSL Commerz"
                              : "-"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Payment Status:</span>
                  <span className="text-green-600 font-semibold">Pending</span>
                </div>
              </div>

              <div className="flex justify-between mt-6">
                <button
                  type="button"
                  onClick={handlePrevious}
                  className="bg-gray-500 text-white px-6 py-2 rounded-md hover:bg-gray-600 transition"
                >
                  ← Previous
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="text-white px-8 py-2 rounded-md hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ backgroundColor: "#00ADD2" }}
                >
                  {loading ? "Processing..." : "Submit Admission"}
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default Admission_now;
