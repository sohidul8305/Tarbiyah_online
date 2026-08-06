import React, { useState } from "react";
import {
  FaChevronUp,
  FaMinus,
  FaPlus,
  FaLock,
  FaCheckCircle,
  FaChevronDown,
} from "react-icons/fa";

const English_version = () => {
  const [kidsBanglaQty, setKidsBanglaQty] = useState(2);
  const [kidsOverseasQty, setKidsOverseasQty] = useState(1);
  const [showOrderSummary, setShowOrderSummary] = useState(true);
  const [formData, setFormData] = useState({
    // Personal Information
    firstName: "",
    lastName: "",
    nationalId: "",
    dateOfBirth: "",
    age: "",
    phone: "",
    email: "",
    gender: "",
    religion: "",
    bloodGroup: "",
    occupation: "",
    maritalStatus: "",
    educationalQualification: "",
    instituteName: "",

    // Family Information
    fatherName: "",
    motherName: "",
    guardianPhone: "",

    // Address
    streetAddress: "",
    presentAddress: "",
    permanentAddress: "",
    city: "",
    postcode: "",
    country: "Bangladesh",
    state: "",

    // Payment Information
    paymentMethod: "bkash",
    paymentType: "online",
    transactionId: "",
    paymentRemarks: "",
    paidAmount: "",
    bkashNumber: "",
    nagodNumber: "",
    rocketNumber: "",
  });

  // Departments & Courses (from Admission_now)
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
      name: "Tarbiyah Alemiyah",
      courses: [
        {
          id: "al1",
          name: "Alemiyah for Kids",
          price: 8000,
          duration: "6 Months",
        },
        {
          id: "al2",
          name: "Alemiyah Program",
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
          name: "Qaida Nooraniyah",
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

  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [formErrors, setFormErrors] = useState({});

  const calculateTotal = () => {
    let total = 0;
    const currentCourses = departments[selectedDepartment]?.courses || [];
    selectedCourses.forEach((courseId) => {
      const course = currentCourses.find((c) => c.id === courseId);
      if (course) total += course.price;
    });
    return total;
  };

  const getCurrentCourses = () => {
    return departments[selectedDepartment]?.courses || [];
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

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox" && name === "selectedCourses") {
      if (checked) {
        setSelectedCourses([...selectedCourses, value]);
      } else {
        setSelectedCourses(
          selectedCourses.filter((course) => course !== value),
        );
      }
    } else if (name === "selectedDepartment") {
      setSelectedDepartment(value);
      setSelectedCourses([]);
    } else if (name === "dateOfBirth") {
      const age = calculateAge(value);
      setFormData({
        ...formData,
        dateOfBirth: value,
        age: age,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Your application has been submitted successfully!");
    console.log("Form Data:", {
      ...formData,
      selectedDepartment,
      selectedCourses,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Top Collapsible Enrolment Summary Bar */}
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
          <div
            className="flex justify-between items-center px-4 py-3 cursor-pointer text-xs sm:text-sm font-medium text-gray-700"
            onClick={() => setShowOrderSummary(!showOrderSummary)}
          >
            <div className="flex items-center gap-2">
              <span className="text-gray-500">🛒</span>
              <span>
                {showOrderSummary ? "Hide" : "Show"} Enrolment Summary
              </span>
              {showOrderSummary ? (
                <FaChevronUp className="text-gray-400 text-xs" />
              ) : (
                <FaChevronDown className="text-gray-400 text-xs" />
              )}
            </div>
            <div className="font-bold text-gray-900">
              ৳ {calculateTotal().toLocaleString() || "0"}
            </div>
          </div>

          {showOrderSummary && (
            <div className="px-4 pb-4 border-t border-gray-100 pt-3 space-y-3 text-xs sm:text-sm">
              {selectedCourses.length > 0 ? (
                selectedCourses.map((courseId) => {
                  const course = getCurrentCourses().find(
                    (c) => c.id === courseId,
                  );
                  return course ? (
                    <div
                      key={courseId}
                      className="flex justify-between items-center"
                    >
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <img
                            src="https://i.ibb.co.com/SzV4rgk/diploma-2-1-jpg.jpg"
                            alt={course.name}
                            className="w-10 h-10 object-cover rounded border"
                          />
                          <span className="absolute -top-1.5 -right-1.5 bg-gray-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                            1
                          </span>
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">
                            {course.name} × 1
                          </p>
                          <p className="text-[11px] text-gray-500">
                            Duration: {course.duration}
                          </p>
                        </div>
                      </div>
                      <span className="font-semibold text-gray-800">
                        ৳ {course.price.toLocaleString()}
                      </span>
                    </div>
                  ) : null;
                })
              ) : (
                <div className="text-center text-gray-500 py-2">
                  No courses selected
                </div>
              )}

              <div className="pt-2 text-[11px] text-[#0073aa] hover:underline cursor-pointer">
                Have a coupon? Click here to enter your code
              </div>

              <div className="space-y-1.5 pt-2 border-t border-gray-100 text-gray-600 text-xs">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-medium text-gray-900">
                    ৳ {calculateTotal().toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span>bKash Charge</span>
                  <span className="text-teal-600 font-bold text-sm">৳ 0</span>
                </div>
              </div>

              <div className="flex justify-between items-center pt-3 border-t border-gray-200 font-bold text-sm sm:text-base text-[#0073aa]">
                <span>Total</span>
                <span>৳ {calculateTotal().toLocaleString()}</span>
              </div>
            </div>
          )}
        </div>

        {/* Returning Customer notice */}
        <p className="text-xs text-gray-600">
          Returning customer?{" "}
          <span className="text-[#0073aa] cursor-pointer hover:underline">
            Click here to login
          </span>
        </p>

        <form onSubmit={handleSubmit}>
          {/* SHIPPING INFORMATION - Personal Info */}
          <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm space-y-4">
            <h2 className="text-xs sm:text-sm font-bold text-[#0073aa] tracking-wider uppercase">
              PERSONAL INFORMATION
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] text-gray-500 mb-1">
                  FIRST NAME *
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-xs focus:outline-none focus:border-[#0073aa]"
                  required
                />
              </div>
              <div>
                <label className="block text-[11px] text-gray-500 mb-1">
                  LAST NAME *
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-xs focus:outline-none focus:border-[#0073aa]"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] text-gray-500 mb-1">
                  NATIONAL ID NUMBER *
                </label>
                <input
                  type="text"
                  name="nationalId"
                  value={formData.nationalId}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-xs focus:outline-none focus:border-[#0073aa]"
                  required
                />
              </div>
              <div>
                <label className="block text-[11px] text-gray-500 mb-1">
                  DATE OF BIRTH *
                </label>
                <input
                  type="date"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-xs focus:outline-none focus:border-[#0073aa]"
                  required
                />
                {formData.age && (
                  <p className="text-[10px] text-gray-500 mt-1">
                    Age: {formData.age} years
                  </p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-[11px] text-gray-500 mb-1">
                PHONE *
              </label>
              <div className="flex border border-gray-300 rounded overflow-hidden">
                <div className="bg-gray-50 px-3 py-2 flex items-center gap-1.5 border-r border-gray-300 text-xs text-gray-700">
                  <span>🇧🇩</span>
                  <span>+880</span>
                  <span className="text-[10px]">▼</span>
                </div>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="Phone Number"
                  className="w-full px-3 py-2 text-xs focus:outline-none"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] text-gray-500 mb-1">
                EMAIL *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded px-3 py-2 text-xs focus:outline-none focus:border-[#0073aa]"
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-[11px] text-gray-500 mb-1">
                  GENDER *
                </label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-xs bg-white focus:outline-none focus:border-[#0073aa]"
                  required
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-[11px] text-gray-500 mb-1">
                  BLOOD GROUP
                </label>
                <select
                  name="bloodGroup"
                  value={formData.bloodGroup}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-xs bg-white focus:outline-none focus:border-[#0073aa]"
                >
                  <option value="">Select Blood Group</option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                </select>
              </div>
              <div>
                <label className="block text-[11px] text-gray-500 mb-1">
                  RELIGION
                </label>
                <input
                  type="text"
                  name="religion"
                  value={formData.religion}
                  onChange={handleInputChange}
                  placeholder="Islam"
                  className="w-full border border-gray-300 rounded px-3 py-2 text-xs focus:outline-none focus:border-[#0073aa]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-[11px] text-gray-500 mb-1">
                  EDUCATIONAL QUALIFICATION
                </label>
                <select
                  name="educationalQualification"
                  value={formData.educationalQualification}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-xs bg-white focus:outline-none focus:border-[#0073aa]"
                >
                  <option value="">Select Qualification</option>
                  <option value="ssc">SSC/Equivalent</option>
                  <option value="hsc">HSC/Equivalent</option>
                  <option value="graduate">Graduate/Equivalent</option>
                  <option value="postgraduate">Postgraduate/Equivalent</option>
                  <option value="others">Others</option>
                </select>
              </div>
              <div>
                <label className="block text-[11px] text-gray-500 mb-1">
                  INSTITUTE NAME
                </label>
                <input
                  type="text"
                  name="instituteName"
                  value={formData.instituteName}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-xs focus:outline-none focus:border-[#0073aa]"
                />
              </div>
              <div>
                <label className="block text-[11px] text-gray-500 mb-1">
                  OCCUPATION
                </label>
                <input
                  type="text"
                  name="occupation"
                  value={formData.occupation}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-xs focus:outline-none focus:border-[#0073aa]"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] text-gray-500 mb-1">
                MARITAL STATUS
              </label>
              <select
                name="maritalStatus"
                value={formData.maritalStatus}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded px-3 py-2 text-xs bg-white focus:outline-none focus:border-[#0073aa]"
              >
                <option value="">Select Status</option>
                <option value="single">Single</option>
                <option value="married">Married</option>
                <option value="divorced">Divorced</option>
                <option value="widowed">Widowed</option>
              </select>
            </div>
          </div>

          {/* FAMILY & ADDRESS INFORMATION */}
          <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm space-y-4 mt-6">
            <h2 className="text-xs sm:text-sm font-bold text-[#0073aa] tracking-wider uppercase">
              FAMILY & ADDRESS INFORMATION
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-[11px] text-gray-500 mb-1">
                  FATHER'S NAME *
                </label>
                <input
                  type="text"
                  name="fatherName"
                  value={formData.fatherName}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-xs focus:outline-none focus:border-[#0073aa]"
                  required
                />
              </div>
              <div>
                <label className="block text-[11px] text-gray-500 mb-1">
                  MOTHER'S NAME *
                </label>
                <input
                  type="text"
                  name="motherName"
                  value={formData.motherName}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-xs focus:outline-none focus:border-[#0073aa]"
                  required
                />
              </div>
              <div>
                <label className="block text-[11px] text-gray-500 mb-1">
                  GUARDIAN PHONE *
                </label>
                <input
                  type="tel"
                  name="guardianPhone"
                  value={formData.guardianPhone}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-xs focus:outline-none focus:border-[#0073aa]"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] text-gray-500 mb-1">
                PRESENT ADDRESS *
              </label>
              <textarea
                name="presentAddress"
                value={formData.presentAddress}
                onChange={handleInputChange}
                rows="2"
                className="w-full border border-gray-300 rounded px-3 py-2 text-xs focus:outline-none focus:border-[#0073aa]"
                required
              />
            </div>

            <div>
              <label className="block text-[11px] text-gray-500 mb-1">
                PERMANENT ADDRESS *
              </label>
              <textarea
                name="permanentAddress"
                value={formData.permanentAddress}
                onChange={handleInputChange}
                rows="2"
                className="w-full border border-gray-300 rounded px-3 py-2 text-xs focus:outline-none focus:border-[#0073aa]"
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-[11px] text-gray-500 mb-1">
                  TOWN / CITY
                </label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-xs focus:outline-none focus:border-[#0073aa]"
                />
              </div>
              <div>
                <label className="block text-[11px] text-gray-500 mb-1">
                  POSTCODE
                </label>
                <input
                  type="text"
                  name="postcode"
                  value={formData.postcode}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-xs focus:outline-none focus:border-[#0073aa]"
                />
              </div>
              <div>
                <label className="block text-[11px] text-gray-500 mb-1">
                  COUNTRY *
                </label>
                <select
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-xs bg-white focus:outline-none focus:border-[#0073aa]"
                >
                  <option value="Bangladesh">Bangladesh</option>
                  <option value="India">India</option>
                  <option value="Pakistan">Pakistan</option>
                  <option value="USA">USA</option>
                  <option value="UK">UK</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>
          </div>

          {/* COURSE SELECTION */}
          <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm space-y-4 mt-6">
            <h2 className="text-xs sm:text-sm font-bold text-[#0073aa] tracking-wider uppercase">
              DEPARTMENT & COURSE SELECTION
            </h2>

            <div>
              <label className="block text-[11px] text-gray-500 mb-1">
                SELECT DEPARTMENT *
              </label>
              <select
                name="selectedDepartment"
                value={selectedDepartment}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded px-3 py-2 text-xs bg-white focus:outline-none focus:border-[#0073aa]"
                required
              >
                <option value="">Select Department</option>
                <option value="islamic-studies">
                  Diploma in Islamic Studies
                </option>
                <option value="alemiyah">Tarbiyah Alemiyah</option>
                <option value="quran-studies">Tarbiyah Quran Studies</option>
                <option value="quran-elders">Quran for Elders</option>
              </select>
            </div>

            {selectedDepartment && (
              <div>
                <p className="text-xs font-semibold text-gray-700 mb-2">
                  {departments[selectedDepartment]?.name} - Courses
                </p>
                <div className="space-y-2">
                  {getCurrentCourses().map((course) => (
                    <div
                      key={course.id}
                      className="flex items-center gap-2 border border-gray-200 rounded p-2"
                    >
                      <input
                        type="checkbox"
                        name="selectedCourses"
                        value={course.id}
                        checked={selectedCourses.includes(course.id)}
                        onChange={handleInputChange}
                        className="accent-[#0073aa]"
                      />
                      <div className="flex-1">
                        <p className="text-xs font-medium text-gray-800">
                          {course.name}
                        </p>
                        <div className="flex justify-between">
                          <span className="text-[10px] text-gray-500">
                            Duration: {course.duration}
                          </span>
                          <span className="text-xs font-semibold text-[#0073aa]">
                            ৳{course.price.toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {selectedCourses.length > 0 && (
              <div className="bg-gray-50 p-3 rounded border border-gray-200">
                <p className="text-xs font-semibold text-gray-700">
                  Selected Courses:
                </p>
                <ul className="text-xs text-gray-600 list-disc list-inside">
                  {selectedCourses.map((courseId) => {
                    const course = getCurrentCourses().find(
                      (c) => c.id === courseId,
                    );
                    return course ? (
                      <li key={courseId}>
                        {course.name} - {course.duration} - ৳
                        {course.price.toLocaleString()}
                      </li>
                    ) : null;
                  })}
                </ul>
                <p className="text-xs font-bold text-[#0073aa] mt-1">
                  Total: ৳{calculateTotal().toLocaleString()}
                </p>
              </div>
            )}
          </div>

          {/* ORDER SUMMARY */}
          <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm space-y-4 text-xs sm:text-sm mt-6">
            <h2 className="text-xs sm:text-sm font-bold text-[#0073aa] tracking-wider uppercase">
              ORDER SUMMARY
            </h2>

            <div className="text-[11px] text-[#0073aa] hover:underline cursor-pointer">
              Have a coupon? Click here to enter your code
            </div>

            {selectedCourses.length > 0 ? (
              selectedCourses.map((courseId) => {
                const course = getCurrentCourses().find(
                  (c) => c.id === courseId,
                );
                return course ? (
                  <div
                    key={courseId}
                    className="flex justify-between items-center py-2 border-b border-gray-100"
                  >
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <img
                          src="https://i.ibb.co.com/SzV4rgk/diploma-2-1-jpg.jpg"
                          alt={course.name}
                          className="w-8 h-8 object-cover rounded border"
                        />
                        <span className="absolute -top-1.5 -right-1.5 bg-gray-500 text-white text-[9px] w-3.5 h-3.5 rounded-full flex items-center justify-center font-bold">
                          1
                        </span>
                      </div>
                      <span className="font-medium text-gray-900 text-xs">
                        {course.name}
                      </span>
                    </div>
                    <span className="font-semibold text-gray-800 text-xs">
                      ৳ {course.price.toLocaleString()}
                    </span>
                  </div>
                ) : null;
              })
            ) : (
              <div className="text-center text-gray-500 py-2 text-xs">
                No courses selected
              </div>
            )}

            <div className="space-y-1.5 pt-2 text-gray-600">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-medium text-gray-900">
                  ৳ {calculateTotal().toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span>bKash Charge</span>
                <span className="text-teal-600 font-bold text-sm">৳ 0</span>
              </div>
            </div>

            <div className="flex justify-between items-center pt-3 border-t border-gray-200 font-bold text-sm text-[#0073aa]">
              <span>Total</span>
              <span>৳ {calculateTotal().toLocaleString()}</span>
            </div>
          </div>

          {/* PAYMENT SECTION */}
          <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm space-y-4 mt-6">
            <h2 className="text-xs sm:text-sm font-bold text-[#0073aa] tracking-wider uppercase">
              PAYMENT
            </h2>
            <p className="text-[11px] text-gray-500 uppercase">
              All transactions are secure and encrypted.
            </p>

            {/* Payment Instructions */}
            <div
              className="p-3 rounded-lg border-2"
              style={{ backgroundColor: "#fff8e1", borderColor: "#ff9800" }}
            >
              <p className="font-bold text-orange-600 text-xs mb-1">
                ⚠️ Payment Instructions:
              </p>
              <ul className="text-[10px] text-gray-700 space-y-0.5 list-disc list-inside">
                <li>
                  For bKash & Nagod, use{" "}
                  <span className="font-bold text-red-600">"Merchant Pay"</span>{" "}
                  option only.{" "}
                  <span className="font-bold text-red-600">"Send Money"</span>{" "}
                  will not work.
                </li>
                <li>
                  Merchant Numbers:{" "}
                  <span className="font-bold text-gray-800">
                    bKash: 01841412525
                  </span>{" "}
                  and{" "}
                  <span className="font-bold text-gray-800">
                    Nagod: 01841512525
                  </span>
                </li>
                <li>Bank Transfer is also available.</li>
              </ul>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] text-gray-500 mb-1">
                  PAYMENT METHOD *
                </label>
                <select
                  name="paymentMethod"
                  value={formData.paymentMethod}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-xs bg-white focus:outline-none focus:border-[#0073aa]"
                  required
                >
                  <option value="">Select Payment Method</option>
                  <option value="bkash">bKash (Merchant Pay)</option>
                  <option value="nagod">Nagod (Merchant Pay)</option>
                  <option value="rocket">Rocket</option>
                  <option value="bank">Bank Transfer</option>
                  <option value="ssl">SSL Commerz</option>
                </select>
              </div>
              <div>
                <label className="block text-[11px] text-gray-500 mb-1">
                  PAYMENT TYPE *
                </label>
                <select
                  name="paymentType"
                  value={formData.paymentType}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-xs bg-white focus:outline-none focus:border-[#0073aa]"
                  required
                >
                  <option value="online">Online Payment</option>
                  <option value="offline">Offline Payment</option>
                </select>
              </div>
            </div>

            {/* Merchant Number Display */}
            {(formData.paymentMethod === "bkash" ||
              formData.paymentMethod === "nagod") && (
              <div className="p-3 rounded-lg bg-blue-50 border border-blue-200">
                <p className="text-xs font-medium">
                  📌 {formData.paymentMethod === "bkash" ? "bKash" : "Nagod"}{" "}
                  Merchant Number:
                  <span className="font-bold ml-1 text-gray-800">
                    {formData.paymentMethod === "bkash"
                      ? "01841412525"
                      : "01841512525"}
                  </span>
                </p>
                <p className="text-[10px] text-red-600 mt-0.5">
                  ⚠️ Use only "Merchant Pay" option. "Send Money" will not work.
                </p>
              </div>
            )}

            {/* Bank Information */}
            {formData.paymentMethod === "bank" && (
              <div className="p-3 rounded-lg border bg-blue-50 border-blue-200">
                <p className="text-xs font-bold text-gray-800">
                  🏦 Bank Information:
                </p>
                <div className="grid grid-cols-2 gap-1 mt-1 text-[10px]">
                  <div>
                    <p>
                      <span className="font-semibold">Account:</span> Tarbiyah
                      Academy
                    </p>
                    <p>
                      <span className="font-semibold">Account No:</span>{" "}
                      401211100007923
                    </p>
                    <p>
                      <span className="font-semibold">Bank:</span> Shahjalal
                      Islami Bank Ltd
                    </p>
                  </div>
                  <div>
                    <p>
                      <span className="font-semibold">Branch:</span> Satmasjid
                      Road
                    </p>
                    <p>
                      <span className="font-semibold">SWIFT:</span> SJBLBDDHSMR
                    </p>
                    <p>
                      <span className="font-semibold">Routing:</span> 190264035
                    </p>
                  </div>
                </div>
              </div>
            )}

            {(formData.paymentMethod === "bkash" ||
              formData.paymentMethod === "nagod" ||
              formData.paymentMethod === "rocket") && (
              <div>
                <label className="block text-[11px] text-gray-500 mb-1">
                  {formData.paymentMethod === "bkash"
                    ? "bKash"
                    : formData.paymentMethod === "nagod"
                      ? "Nagod"
                      : "Rocket"}{" "}
                  Number (Your) *
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
                  placeholder="01xxxxxxxxx"
                  className="w-full border border-gray-300 rounded px-3 py-2 text-xs focus:outline-none focus:border-[#0073aa]"
                />
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] text-gray-500 mb-1">
                  PAID AMOUNT (৳) *
                </label>
                <input
                  type="number"
                  name="paidAmount"
                  value={formData.paidAmount}
                  onChange={handleInputChange}
                  placeholder={
                    calculateTotal() > 0
                      ? `Total: ৳${calculateTotal()}`
                      : "Enter amount"
                  }
                  className="w-full border border-gray-300 rounded px-3 py-2 text-xs focus:outline-none focus:border-[#0073aa]"
                  required
                />
                {calculateTotal() > 0 && (
                  <p className="text-[10px] text-gray-500 mt-0.5">
                    Total to pay: ৳{calculateTotal().toLocaleString()}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-[11px] text-gray-500 mb-1">
                  TRANSACTION ID *
                </label>
                <input
                  type="text"
                  name="transactionId"
                  value={formData.transactionId}
                  onChange={handleInputChange}
                  placeholder="Transaction ID"
                  className="w-full border border-gray-300 rounded px-3 py-2 text-xs focus:outline-none focus:border-[#0073aa]"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] text-gray-500 mb-1">
                PAYMENT REMARKS
              </label>
              <textarea
                name="paymentRemarks"
                value={formData.paymentRemarks}
                onChange={handleInputChange}
                rows="2"
                className="w-full border border-gray-300 rounded px-3 py-2 text-xs focus:outline-none focus:border-[#0073aa]"
                placeholder="Additional payment information..."
              />
            </div>

            {/* SSL Commerz */}
            {formData.paymentMethod === "ssl" && (
              <div className="p-3 rounded-lg border bg-blue-50 border-blue-200">
                <p className="text-xs font-semibold text-gray-800">
                  SSL Commerz Online Payment
                </p>
                <p className="text-[10px] text-gray-600">
                  You will be redirected to SSL Commerz payment gateway.
                </p>
              </div>
            )}

            {/* Payment Summary */}
            <div className="p-3 rounded-lg border border-gray-200 bg-gray-50">
              <p className="text-xs font-semibold text-gray-700">
                Payment Summary
              </p>
              <div className="flex justify-between text-xs mt-1">
                <span>Total Course Fee:</span>
                <span className="font-bold text-[#0073aa]">
                  ৳{calculateTotal().toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between text-xs">
                <span>Payment Method:</span>
                <span className="font-semibold">
                  {formData.paymentMethod === "bkash"
                    ? "bKash"
                    : formData.paymentMethod === "nagod"
                      ? "Nagod"
                      : formData.paymentMethod === "rocket"
                        ? "Rocket"
                        : formData.paymentMethod === "bank"
                          ? "Bank"
                          : formData.paymentMethod === "ssl"
                            ? "SSL"
                            : "-"}
                </span>
              </div>
              <div className="flex justify-between text-xs">
                <span>Payment Status:</span>
                <span className="text-green-600 font-semibold">Pending</span>
              </div>
            </div>

            {/* Terms & Conditions */}
            <div className="flex items-start gap-2 pt-2 text-xs text-gray-600">
              <input
                type="checkbox"
                className="mt-0.5 accent-[#0073aa]"
                required
              />
              <span>
                I've read and accept the{" "}
                <span className="text-[#0073aa] cursor-pointer hover:underline">
                  terms & conditions
                </span>
                ,{" "}
                <span className="text-[#0073aa] cursor-pointer hover:underline">
                  privacy policy
                </span>{" "}
                &{" "}
                <span className="text-[#0073aa] cursor-pointer hover:underline">
                  refund policy
                </span>
                .
              </span>
            </div>

            {/* Enroll Now Button */}
            <button
              type="submit"
              className="w-full bg-gray-300 hover:bg-gray-400 text-gray-700 font-bold py-3.5 px-6 rounded shadow-inner flex items-center justify-center gap-2 text-sm transition-all cursor-pointer"
            >
              <FaLock className="text-xs" />
              <span>
                Enroll Now ৳ {calculateTotal().toLocaleString() || "0"}
              </span>
            </button>

            {/* Secure footer */}
            <div className="flex items-center justify-center gap-1.5 text-xs text-gray-500 pt-2">
              <FaCheckCircle className="text-green-600 text-xs" />
              <span>100% Secure Payments</span>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default English_version;
