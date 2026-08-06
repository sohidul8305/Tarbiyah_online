import React, { useState } from "react";
import {
  FaChevronUp,
  FaMinus,
  FaPlus,
  FaLock,
  FaShieldAlt,
  FaCheckCircle,
  FaChevronDown,
} from "react-icons/fa";

const BanglaVersion = () => {
  const [kidsQty, setKidsQty] = useState(2);
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

  // ডিপার্টমেন্ট ও কোর্সসমূহ (যা Admission_now এ আছে)
  const departments = {
    "islamic-studies": {
      name: "ডিপ্লোমা ইন ইসলামিক স্টাডিজ",
      courses: [
        {
          id: "is1",
          name: "ডিপ্লোমা ইন ইসলামিক স্টাডিজ",
          price: 12000,
          duration: "১ বছর",
        },
      ],
    },
    alemiyah: {
      name: "তারবিয়াহ আলেমিয়াহ",
      courses: [
        {
          id: "al1",
          name: "আলেমিয়াহ ফর কিডস",
          price: 8000,
          duration: "৬ মাস",
        },
        {
          id: "al2",
          name: "আলেমিয়াহ প্রোগ্রাম",
          price: 20000,
          duration: "২ বছর",
        },
      ],
    },
    "quran-studies": {
      name: "তারবিয়াহ কুরআন স্টাডিজ",
      courses: [
        { id: "qs1", name: "কায়দা নুরানী", price: 3000, duration: "২ মাস" },
        { id: "qs2", name: "নাজেরা", price: 4000, duration: "৩ মাস" },
        { id: "qs3", name: "হিফজুল কুরআন", price: 25000, duration: "২ বছর" },
        {
          id: "qs4",
          name: "হিফজ রিভিশন (ওয়ান টু ওয়ান)",
          price: 10000,
          duration: "৬ মাস",
        },
      ],
    },
    "quran-elders": {
      name: "কুরআন ফর এল্ডার্স",
      courses: [
        { id: "qe1", name: "কায়দা নুরানীয়া", price: 3000, duration: "২ মাস" },
        { id: "qe2", name: "কুরআন নাজেরা", price: 4000, duration: "৩ মাস" },
        { id: "qe3", name: "হিফজুল কুরআন", price: 20000, duration: "২ বছর" },
        {
          id: "qe4",
          name: "বেসিক তাজউইদ (লেভেল-১)",
          price: 3000,
          duration: "২ মাস",
        },
        {
          id: "qe5",
          name: "অ্যাডভান্সড তাজউইদ",
          price: 5000,
          duration: "৩ মাস",
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
    alert("আপনার আবেদন সফলভাবে জমা হয়েছে!");
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
                            মেয়াদ: {course.duration}
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
                  কোন কোর্স নির্বাচন করা হয়নি
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
              ব্যক্তিগত তথ্য
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] text-gray-500 mb-1">
                  প্রথম নাম *
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
                  শেষ নাম *
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
                  জাতীয় পরিচয় পত্র নম্বর *
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
                  জন্ম তারিখ *
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
                    বয়স: {formData.age} বছর
                  </p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-[11px] text-gray-500 mb-1">
                মোবাইল নম্বর *
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
                  placeholder="ফোন নম্বর"
                  className="w-full px-3 py-2 text-xs focus:outline-none"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] text-gray-500 mb-1">
                ইমেইল *
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
                  লিঙ্গ *
                </label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-xs bg-white focus:outline-none focus:border-[#0073aa]"
                  required
                >
                  <option value="">লিঙ্গ নির্বাচন</option>
                  <option value="male">পুরুষ</option>
                  <option value="female">মহিলা</option>
                  <option value="other">অন্যান্য</option>
                </select>
              </div>
              <div>
                <label className="block text-[11px] text-gray-500 mb-1">
                  রক্তের গ্রুপ
                </label>
                <select
                  name="bloodGroup"
                  value={formData.bloodGroup}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-xs bg-white focus:outline-none focus:border-[#0073aa]"
                >
                  <option value="">রক্তের গ্রুপ</option>
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
                  ধর্ম
                </label>
                <input
                  type="text"
                  name="religion"
                  value={formData.religion}
                  onChange={handleInputChange}
                  placeholder="ইসলাম"
                  className="w-full border border-gray-300 rounded px-3 py-2 text-xs focus:outline-none focus:border-[#0073aa]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-[11px] text-gray-500 mb-1">
                  শিক্ষাগত যোগ্যতা
                </label>
                <select
                  name="educationalQualification"
                  value={formData.educationalQualification}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-xs bg-white focus:outline-none focus:border-[#0073aa]"
                >
                  <option value="">যোগ্যতা নির্বাচন</option>
                  <option value="ssc">এসএসসি/সমমান</option>
                  <option value="hsc">এইচএসসি/সমমান</option>
                  <option value="graduate">স্নাতক/সমমান</option>
                  <option value="postgraduate">স্নাতকোত্তর/সমমান</option>
                  <option value="others">অন্যান্য</option>
                </select>
              </div>
              <div>
                <label className="block text-[11px] text-gray-500 mb-1">
                  প্রতিষ্ঠানের নাম
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
                  পেশা
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
                বৈবাহিক অবস্থা
              </label>
              <select
                name="maritalStatus"
                value={formData.maritalStatus}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded px-3 py-2 text-xs bg-white focus:outline-none focus:border-[#0073aa]"
              >
                <option value="">নির্বাচন করুন</option>
                <option value="single">অবিবাহিত</option>
                <option value="married">বিবাহিত</option>
                <option value="divorced">তালাকপ্রাপ্ত</option>
                <option value="widowed">বিধবা/বিধুর</option>
              </select>
            </div>
          </div>

          {/* FAMILY & ADDRESS INFORMATION */}
          <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm space-y-4 mt-6">
            <h2 className="text-xs sm:text-sm font-bold text-[#0073aa] tracking-wider uppercase">
              পরিবার ও ঠিকানার তথ্য
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-[11px] text-gray-500 mb-1">
                  পিতার নাম *
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
                  মাতার নাম *
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
                  গার্ডিয়ানের মোবাইল নম্বর *
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
                বর্তমান ঠিকানা *
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
                স্থায়ী ঠিকানা *
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
                  শহর
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
                  পোস্ট কোড
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
                  দেশ *
                </label>
                <select
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-xs bg-white focus:outline-none focus:border-[#0073aa]"
                >
                  <option value="Bangladesh">বাংলাদেশ</option>
                  <option value="India">ভারত</option>
                  <option value="Pakistan">পাকিস্তান</option>
                  <option value="Other">অন্যান্য</option>
                </select>
              </div>
            </div>
          </div>

          {/* COURSE SELECTION */}
          <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm space-y-4 mt-6">
            <h2 className="text-xs sm:text-sm font-bold text-[#0073aa] tracking-wider uppercase">
              ডিপার্টমেন্ট ও কোর্স নির্বাচন
            </h2>

            <div>
              <label className="block text-[11px] text-gray-500 mb-1">
                ডিপার্টমেন্ট নির্বাচন করুন *
              </label>
              <select
                name="selectedDepartment"
                value={selectedDepartment}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded px-3 py-2 text-xs bg-white focus:outline-none focus:border-[#0073aa]"
                required
              >
                <option value="">ডিপার্টমেন্ট নির্বাচন করুন</option>
                <option value="islamic-studies">
                  ডিপ্লোমা ইন ইসলামিক স্টাডিজ
                </option>
                <option value="alemiyah">তারবিয়াহ আলেমিয়াহ</option>
                <option value="quran-studies">তারবিয়াহ কুরআন স্টাডিজ</option>
                <option value="quran-elders">কুরআন ফর এল্ডার্স</option>
              </select>
            </div>

            {selectedDepartment && (
              <div>
                <p className="text-xs font-semibold text-gray-700 mb-2">
                  {departments[selectedDepartment]?.name} - কোর্সসমূহ
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
                            মেয়াদ: {course.duration}
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
                  নির্বাচিত কোর্সসমূহ:
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
                  মোট মূল্য: ৳{calculateTotal().toLocaleString()}
                </p>
              </div>
            )}
          </div>

          {/* ORDER SUMMARY */}
          <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm space-y-4 text-xs sm:text-sm mt-6">
            <h2 className="text-xs sm:text-sm font-bold text-[#0073aa] tracking-wider uppercase">
              Order Summary
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
                কোন কোর্স নির্বাচন করা হয়নি
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
              Payment
            </h2>
            <p className="text-[11px] text-gray-500">
              ALL TRANSACTIONS ARE SECURE AND ENCRYPTED.
            </p>

            {/* Payment Instructions */}
            <div
              className="p-3 rounded-lg border-2"
              style={{ backgroundColor: "#fff8e1", borderColor: "#ff9800" }}
            >
              <p className="font-bold text-orange-600 text-xs mb-1">
                ⚠️ পেমেন্ট করার আগে নির্দেশনা পড়ুন:
              </p>
              <ul className="text-[10px] text-gray-700 space-y-0.5 list-disc list-inside">
                <li>
                  বিকাশ ও নগদে{" "}
                  <span className="font-bold text-red-600">"সেন্ড মানি"</span>{" "}
                  করলে হবে না। শুধুমাত্র{" "}
                  <span className="font-bold text-green-600">
                    "মার্চেন্ট পে"
                  </span>{" "}
                  অপশনে পেমেন্ট করতে হবে।
                </li>
                <li>
                  মার্চেন্ট নম্বর:{" "}
                  <span className="font-bold text-gray-800">
                    বিকাশ: 01841412525
                  </span>{" "}
                  এবং{" "}
                  <span className="font-bold text-gray-800">
                    নগদ: 01841512525
                  </span>
                </li>
                <li>ব্যাংক ট্রান্সফারের মাধ্যমে পেমেন্ট করতে পারবেন।</li>
              </ul>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] text-gray-500 mb-1">
                  পেমেন্ট মেথড *
                </label>
                <select
                  name="paymentMethod"
                  value={formData.paymentMethod}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-xs bg-white focus:outline-none focus:border-[#0073aa]"
                  required
                >
                  <option value="">পেমেন্ট মেথড নির্বাচন</option>
                  <option value="bkash">বিকাশ (মার্চেন্ট পে)</option>
                  <option value="nagod">নগদ (মার্চেন্ট পে)</option>
                  <option value="rocket">রকেট</option>
                  <option value="bank">ব্যাংক ট্রান্সফার</option>
                  <option value="ssl">এসএসএল কমার্জ</option>
                </select>
              </div>
              <div>
                <label className="block text-[11px] text-gray-500 mb-1">
                  পেমেন্ট টাইপ *
                </label>
                <select
                  name="paymentType"
                  value={formData.paymentType}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-xs bg-white focus:outline-none focus:border-[#0073aa]"
                  required
                >
                  <option value="online">অনলাইন পেমেন্ট</option>
                  <option value="offline">অফলাইন পেমেন্ট</option>
                </select>
              </div>
            </div>

            {/* মার্চেন্ট নম্বর দেখানো */}
            {(formData.paymentMethod === "bkash" ||
              formData.paymentMethod === "nagod") && (
              <div className="p-3 rounded-lg bg-blue-50 border border-blue-200">
                <p className="text-xs font-medium">
                  📌 {formData.paymentMethod === "bkash" ? "বিকাশ" : "নগদ"}{" "}
                  মার্চেন্ট নম্বর:
                  <span className="font-bold ml-1 text-gray-800">
                    {formData.paymentMethod === "bkash"
                      ? "01841412525"
                      : "01841512525"}
                  </span>
                </p>
                <p className="text-[10px] text-red-600 mt-0.5">
                  ⚠️ শুধুমাত্র "মার্চেন্ট পে" অপশনে পেমেন্ট করুন।
                </p>
              </div>
            )}

            {/* ব্যাংক তথ্য */}
            {formData.paymentMethod === "bank" && (
              <div className="p-3 rounded-lg border bg-blue-50 border-blue-200">
                <p className="text-xs font-bold text-gray-800">
                  🏦 ব্যাংক তথ্য:
                </p>
                <div className="grid grid-cols-2 gap-1 mt-1 text-[10px]">
                  <div>
                    <p>
                      <span className="font-semibold">একাউন্ট:</span> Tarbiyah
                      Academy
                    </p>
                    <p>
                      <span className="font-semibold">একাউন্ট নম্বর:</span>{" "}
                      401211100007923
                    </p>
                    <p>
                      <span className="font-semibold">ব্যাংক:</span> Shahjalal
                      Islami Bank Ltd
                    </p>
                  </div>
                  <div>
                    <p>
                      <span className="font-semibold">শাখা:</span> Satmasjid
                      Road
                    </p>
                    <p>
                      <span className="font-semibold">SWIFT:</span> SJBLBDDHSMR
                    </p>
                    <p>
                      <span className="font-semibold">রাউটিং:</span> 190264035
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
                    ? "বিকাশ"
                    : formData.paymentMethod === "nagod"
                      ? "নগদ"
                      : "রকেট"}{" "}
                  নম্বর (আপনার) *
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
                  প্রদানকৃত টাকা (৳) *
                </label>
                <input
                  type="number"
                  name="paidAmount"
                  value={formData.paidAmount}
                  onChange={handleInputChange}
                  placeholder={
                    calculateTotal() > 0
                      ? `মোট: ৳${calculateTotal()}`
                      : "টাকা লিখুন"
                  }
                  className="w-full border border-gray-300 rounded px-3 py-2 text-xs focus:outline-none focus:border-[#0073aa]"
                  required
                />
                {calculateTotal() > 0 && (
                  <p className="text-[10px] text-gray-500 mt-0.5">
                    মোট দিতে হবে: ৳{calculateTotal().toLocaleString()}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-[11px] text-gray-500 mb-1">
                  ট্রানজেকশন আইডি *
                </label>
                <input
                  type="text"
                  name="transactionId"
                  value={formData.transactionId}
                  onChange={handleInputChange}
                  placeholder="ট্রানজেকশন আইডি"
                  className="w-full border border-gray-300 rounded px-3 py-2 text-xs focus:outline-none focus:border-[#0073aa]"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] text-gray-500 mb-1">
                পেমেন্ট রিমার্কস
              </label>
              <textarea
                name="paymentRemarks"
                value={formData.paymentRemarks}
                onChange={handleInputChange}
                rows="2"
                className="w-full border border-gray-300 rounded px-3 py-2 text-xs focus:outline-none focus:border-[#0073aa]"
                placeholder="অতিরিক্ত পেমেন্ট তথ্য..."
              />
            </div>

            {/* SSL Commerz */}
            {formData.paymentMethod === "ssl" && (
              <div className="p-3 rounded-lg border bg-blue-50 border-blue-200">
                <p className="text-xs font-semibold text-gray-800">
                  এসএসএল কমার্জ অনলাইন পেমেন্ট
                </p>
                <p className="text-[10px] text-gray-600">
                  আপনাকে SSL Commerz পেমেন্ট গেটওয়েতে পুনঃনির্দেশিত করা হবে।
                </p>
              </div>
            )}

            {/* Payment Summary */}
            <div className="p-3 rounded-lg border border-gray-200 bg-gray-50">
              <p className="text-xs font-semibold text-gray-700">
                পেমেন্ট সামারি
              </p>
              <div className="flex justify-between text-xs mt-1">
                <span>মোট কোর্স ফি:</span>
                <span className="font-bold text-[#0073aa]">
                  ৳{calculateTotal().toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between text-xs">
                <span>পেমেন্ট মেথড:</span>
                <span className="font-semibold">
                  {formData.paymentMethod === "bkash"
                    ? "বিকাশ"
                    : formData.paymentMethod === "nagod"
                      ? "নগদ"
                      : formData.paymentMethod === "rocket"
                        ? "রকেট"
                        : formData.paymentMethod === "bank"
                          ? "ব্যাংক"
                          : formData.paymentMethod === "ssl"
                            ? "এসএসএল"
                            : "-"}
                </span>
              </div>
              <div className="flex justify-between text-xs">
                <span>পেমেন্ট স্ট্যাটাস:</span>
                <span className="text-green-600 font-semibold">পেন্ডিং</span>
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

            {/* Submit Button */}
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

export default BanglaVersion;
