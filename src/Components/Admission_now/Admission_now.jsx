import React, { useState } from "react";
import Footer from "../Navbar/Footer/Footer";
import Navbar from "../Navbar/Navbar";

const Admission_now = () => {
  const [step, setStep] = useState(1);
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
    religion: "",
    bloodGroup: "",
    occupation: "",
    maritalStatus: "",
    educationalQualification: "",
    instituteName: "",

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

  // শুধুমাত্র আপনার বলা ডিপার্টমেন্ট ও কোর্সসমূহ
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
      setFormData({
        ...formData,
        selectedDepartment: value,
        selectedCourses: [],
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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    alert("আপনার আবেদন সফলভাবে জমা হয়েছে!");
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

  const getCurrentCourses = () => {
    return departments[formData.selectedDepartment]?.courses || [];
  };

  // পেমেন্ট মেথড অনুযায়ী মার্চেন্ট নম্বর দেখানো
  const getMerchantNumber = () => {
    if (formData.paymentMethod === "bkash") {
      return "01841412525";
    } else if (formData.paymentMethod === "nagod") {
      return "01841512525";
    }
    return "";
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 ">
      <Navbar></Navbar>
      <div
        className="max-w-4xl mx-auto bg-white rounded-lg shadow-xl p-6 border-t-4 mb-20"
        style={{ borderColor: "#00ADD2" }}
      >
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold" style={{ color: "#00ADD2" }}>
            তারবিয়াহ অনলাইন মাদ্রাসা
          </h1>
          <p className="text-gray-600 mt-2">ইসলামিক শিক্ষার বিশ্বস্ত ঠিকানা</p>
        </div>

        <h2
          className="text-2xl font-bold text-center mb-6"
          style={{ color: "#00ADD2" }}
        >
          ভর্তি ফর্ম
        </h2>

        {/* Progress Steps */}
        <div className="flex justify-between mb-8">
          <div
            className={`flex-1 text-center ${step >= 1 ? "text-[#00ADD2]" : "text-gray-400"}`}
          >
            <div
              className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center ${step >= 1 ? "bg-[#00ADD2] text-white" : "bg-gray-300"}`}
            >
              ১
            </div>
            <span className="text-sm">ব্যক্তিগত তথ্য</span>
          </div>
          <div
            className={`flex-1 text-center ${step >= 2 ? "text-[#00ADD2]" : "text-gray-400"}`}
          >
            <div
              className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center ${step >= 2 ? "bg-[#00ADD2] text-white" : "bg-gray-300"}`}
            >
              ২
            </div>
            <span className="text-sm">পরিবার ও ঠিকানা</span>
          </div>
          <div
            className={`flex-1 text-center ${step >= 3 ? "text-[#00ADD2]" : "text-gray-400"}`}
          >
            <div
              className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center ${step >= 3 ? "bg-[#00ADD2] text-white" : "bg-gray-300"}`}
            >
              ৩
            </div>
            <span className="text-sm">কোর্স নির্বাচন</span>
          </div>
          <div
            className={`flex-1 text-center ${step >= 4 ? "text-[#00ADD2]" : "text-gray-400"}`}
          >
            <div
              className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center ${step >= 4 ? "bg-[#00ADD2] text-white" : "bg-gray-300"}`}
            >
              ৪
            </div>
            <span className="text-sm">পেমেন্ট</span>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Step 1: Personal Information */}
          {step === 1 && (
            <div className="space-y-4">
              <h2
                className="text-xl font-semibold mb-4"
                style={{ color: "#00ADD2" }}
              >
                ব্যক্তিগত তথ্য
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    পূর্ণ নাম *
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
                    জাতীয় পরিচয় পত্র নম্বর *
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
                    জন্ম তারিখ *
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
                    বয়স
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
                    মোবাইল নম্বর *
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
                    ইমেইল *
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
                    লিঙ্গ *
                  </label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#00ADD2] focus:ring-[#00ADD2] p-2 border"
                  >
                    <option value="">লিঙ্গ নির্বাচন করুন</option>
                    <option value="male">পুরুষ</option>
                    <option value="female">মহিলা</option>
                    <option value="other">অন্যান্য</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    শিক্ষাগত যোগ্যতা
                  </label>
                  <select
                    name="educationalQualification"
                    value={formData.educationalQualification}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#00ADD2] focus:ring-[#00ADD2] p-2 border"
                  >
                    <option value="">শিক্ষাগত যোগ্যতা নির্বাচন করুন</option>
                    <option value="ssc">এসএসসি/সমমান</option>
                    <option value="hsc">এইচএসসি/সমমান</option>
                    <option value="graduate">স্নাতক/সমমান</option>
                    <option value="postgraduate">স্নাতকোত্তর/সমমান</option>
                    <option value="others">অন্যান্য</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    প্রতিষ্ঠানের নাম
                  </label>
                  <input
                    type="text"
                    name="instituteName"
                    value={formData.instituteName}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#00ADD2] focus:ring-[#00ADD2] p-2 border"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    রক্তের গ্রুপ
                  </label>
                  <select
                    name="bloodGroup"
                    value={formData.bloodGroup}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#00ADD2] focus:ring-[#00ADD2] p-2 border"
                  >
                    <option value="">রক্তের গ্রুপ নির্বাচন করুন</option>
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
                  <label className="block text-sm font-medium text-gray-700">
                    ধর্ম
                  </label>
                  <input
                    type="text"
                    name="religion"
                    value={formData.religion}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#00ADD2] focus:ring-[#00ADD2] p-2 border"
                    placeholder="ইসলাম"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    বৈবাহিক অবস্থা
                  </label>
                  <select
                    name="maritalStatus"
                    value={formData.maritalStatus}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#00ADD2] focus:ring-[#00ADD2] p-2 border"
                  >
                    <option value="">নির্বাচন করুন</option>
                    <option value="single">অবিবাহিত</option>
                    <option value="married">বিবাহিত</option>
                    <option value="divorced">তালাকপ্রাপ্ত</option>
                    <option value="widowed">বিধবা/বিধুর</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    পেশা
                  </label>
                  <input
                    type="text"
                    name="occupation"
                    value={formData.occupation}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#00ADD2] focus:ring-[#00ADD2] p-2 border"
                  />
                </div>
              </div>

              <div className="flex justify-end mt-6">
                <button
                  type="button"
                  onClick={handleNext}
                  className="text-white px-6 py-2 rounded-md hover:opacity-90 transition"
                  style={{ backgroundColor: "#00ADD2" }}
                >
                  পরবর্তী →
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Family & Address Information */}
          {step === 2 && (
            <div className="space-y-4">
              <h2
                className="text-xl font-semibold mb-4"
                style={{ color: "#00ADD2" }}
              >
                পরিবার ও ঠিকানার তথ্য
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    পিতার নাম *
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
                    মাতার নাম *
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
                    গার্ডিয়ানের মোবাইল নম্বর *
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

                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700">
                    বর্তমান ঠিকানা *
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
                    স্থায়ী ঠিকানা *
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
                  ← পূর্ববর্তী
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  className="text-white px-6 py-2 rounded-md hover:opacity-90 transition"
                  style={{ backgroundColor: "#00ADD2" }}
                >
                  পরবর্তী →
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Course Selection */}
          {step === 3 && (
            <div className="space-y-4">
              <h2
                className="text-xl font-semibold mb-4"
                style={{ color: "#00ADD2" }}
              >
                ডিপার্টমেন্ট ও কোর্স নির্বাচন
              </h2>

              {/* Department Selection */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  ডিপার্টমেন্ট নির্বাচন করুন *
                </label>
                <select
                  name="selectedDepartment"
                  value={formData.selectedDepartment}
                  onChange={handleInputChange}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#00ADD2] focus:ring-[#00ADD2] p-2 border"
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

              {/* Course Selection */}
              {formData.selectedDepartment && (
                <div>
                  <h3
                    className="font-semibold mb-3"
                    style={{ color: "#00ADD2" }}
                  >
                    {departments[formData.selectedDepartment]?.name} - কোর্সসমূহ
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
                                মেয়াদ: {course.duration}
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
                    নির্বাচিত কোর্সসমূহ:
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
                      মোট মূল্য: ৳{calculateTotal().toLocaleString()}
                    </p>
                  </div>
                </div>
              )}

              <div className="flex justify-between mt-6">
                <button
                  type="button"
                  onClick={handlePrevious}
                  className="bg-gray-500 text-white px-6 py-2 rounded-md hover:bg-gray-600 transition"
                >
                  ← পূর্ববর্তী
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  className="text-white px-6 py-2 rounded-md hover:opacity-90 transition"
                  style={{ backgroundColor: "#00ADD2" }}
                >
                  পরবর্তী →
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
                পেমেন্ট তথ্য
              </h2>

              {/* Payment Instructions */}
              <div
                className="p-4 rounded-lg border-2"
                style={{ backgroundColor: "#fff8e1", borderColor: "#ff9800" }}
              >
                <h4 className="font-bold text-orange-600 mb-2">
                  ⚠️ পেমেন্ট করার আগে নির্দেশনা পড়ুন:
                </h4>
                <ul className="text-sm text-gray-700 space-y-1 list-disc list-inside">
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
                    <span className="font-bold" style={{ color: "#00ADD2" }}>
                      বিকাশ: 01841412525
                    </span>{" "}
                    এবং{" "}
                    <span className="font-bold" style={{ color: "#00ADD2" }}>
                      নগদ: 01841512525
                    </span>
                  </li>
                  <li>ব্যাংক ট্রান্সফারের মাধ্যমে পেমেন্ট করতে পারবেন।</li>
                </ul>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    পেমেন্ট মেথড *
                  </label>
                  <select
                    name="paymentMethod"
                    value={formData.paymentMethod}
                    onChange={handleInputChange}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#00ADD2] focus:ring-[#00ADD2] p-2 border"
                  >
                    <option value="">পেমেন্ট মেথড নির্বাচন করুন</option>
                    <option value="bkash">বিকাশ (মার্চেন্ট পে)</option>
                    <option value="nagod">নগদ (মার্চেন্ট পে)</option>
                    <option value="rocket">রকেট</option>
                    <option value="bank">ব্যাংক ট্রান্সফার</option>
                    <option value="ssl">এসএসএল কমার্জ (অনলাইন)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    পেমেন্ট টাইপ *
                  </label>
                  <select
                    name="paymentType"
                    value={formData.paymentType}
                    onChange={handleInputChange}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#00ADD2] focus:ring-[#00ADD2] p-2 border"
                  >
                    <option value="">পেমেন্ট টাইপ নির্বাচন করুন</option>
                    <option value="online">অনলাইন পেমেন্ট</option>
                    <option value="offline">অফলাইন পেমেন্ট</option>
                  </select>
                </div>

                {/* মার্চেন্ট নম্বর দেখানো */}
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
                        {formData.paymentMethod === "bkash" ? "বিকাশ" : "নগদ"}{" "}
                        মার্চেন্ট নম্বর:
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
                        ⚠️ শুধুমাত্র "মার্চেন্ট পে" অপশনে পেমেন্ট করুন। "সেন্ড
                        মানি" করলে হবে না।
                      </p>
                    </div>
                  </div>
                )}

                {/* ব্যাংক তথ্য */}
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
                        🏦 ব্যাংক তথ্য:
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2 text-sm">
                        <div>
                          <p>
                            <span className="font-semibold">একাউন্ট নাম:</span>{" "}
                            Tarbiyah Academy
                          </p>
                          <p>
                            <span className="font-semibold">
                              একাউন্ট নম্বর:
                            </span>{" "}
                            401211100007923
                          </p>
                          <p>
                            <span className="font-semibold">ব্যাংক:</span>{" "}
                            Shahjalal Islami Bank Limited
                          </p>
                        </div>
                        <div>
                          <p>
                            <span className="font-semibold">শাখা:</span>{" "}
                            Satmasjid Road Branch
                          </p>
                          <p>
                            <span className="font-semibold">ব্রাঞ্চ কোড:</span>{" "}
                            4012
                          </p>
                          <p>
                            <span className="font-semibold">SWIFT কোড:</span>{" "}
                            SJBLBDDHSMR
                          </p>
                          <p>
                            <span className="font-semibold">রাউটিং নম্বর:</span>{" "}
                            190264035
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {(formData.paymentMethod === "bkash" ||
                  formData.paymentMethod === "nagod" ||
                  formData.paymentMethod === "rocket") && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
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
                        required
                        placeholder="01xxxxxxxxx"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#00ADD2] focus:ring-[#00ADD2] p-2 border"
                      />
                    </div>
                  </>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    প্রদানকৃত টাকা (৳) *
                  </label>
                  <input
                    type="number"
                    name="paidAmount"
                    value={formData.paidAmount}
                    onChange={handleInputChange}
                    required
                    placeholder={
                      calculateTotal() > 0
                        ? `মোট: ৳${calculateTotal()}`
                        : "টাকা লিখুন"
                    }
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#00ADD2] focus:ring-[#00ADD2] p-2 border"
                  />
                  {calculateTotal() > 0 && (
                    <p className="text-xs text-gray-500 mt-1">
                      মোট দিতে হবে: ৳{calculateTotal().toLocaleString()}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    ট্রানজেকশন আইডি *
                  </label>
                  <input
                    type="text"
                    name="transactionId"
                    value={formData.transactionId}
                    onChange={handleInputChange}
                    required
                    placeholder="ট্রানজেকশন আইডি লিখুন"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#00ADD2] focus:ring-[#00ADD2] p-2 border"
                  />
                </div>

                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700">
                    পেমেন্ট রিমার্কস
                  </label>
                  <textarea
                    name="paymentRemarks"
                    value={formData.paymentRemarks}
                    onChange={handleInputChange}
                    rows="2"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#00ADD2] focus:ring-[#00ADD2] p-2 border"
                    placeholder="অতিরিক্ত পেমেন্ট তথ্য (যদি থাকে)..."
                  />
                </div>
              </div>

              {/* SSL Commerz Integration */}
              {formData.paymentMethod === "ssl" && (
                <div
                  className="p-4 rounded-lg border"
                  style={{ backgroundColor: "#e6f7f9", borderColor: "#00ADD2" }}
                >
                  <h3 className="font-semibold" style={{ color: "#00ADD2" }}>
                    এসএসএল কমার্জ অনলাইন পেমেন্ট
                  </h3>
                  <p className="text-sm text-gray-600">
                    আপনাকে নিরাপদ পেমেন্টের জন্য এসএসএল কমার্জ পেমেন্ট গেটওয়েতে
                    পুনঃনির্দেশিত করা হবে।
                  </p>
                  <button
                    type="button"
                    className="mt-2 text-white px-4 py-2 rounded hover:opacity-90"
                    style={{ backgroundColor: "#00ADD2" }}
                  >
                    এসএসএল কমার্জ দিয়ে পেমেন্ট করুন
                  </button>
                </div>
              )}

              {/* Payment Summary */}
              <div
                className="p-4 rounded-lg border"
                style={{ backgroundColor: "#f0f9fa", borderColor: "#00ADD2" }}
              >
                <h4 className="font-semibold" style={{ color: "#00ADD2" }}>
                  পেমেন্ট সামারি
                </h4>
                <div className="flex justify-between mt-2">
                  <span>মোট কোর্স ফি:</span>
                  <span className="font-bold" style={{ color: "#00ADD2" }}>
                    ৳{calculateTotal().toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>নির্বাচিত ডিপার্টমেন্ট:</span>
                  <span className="font-semibold">
                    {formData.selectedDepartment
                      ? departments[formData.selectedDepartment]?.name
                      : "-"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>পেমেন্ট মেথড:</span>
                  <span className="font-semibold">
                    {formData.paymentMethod === "bkash"
                      ? "বিকাশ"
                      : formData.paymentMethod === "nagod"
                        ? "নগদ"
                        : formData.paymentMethod === "rocket"
                          ? "রকেট"
                          : formData.paymentMethod === "bank"
                            ? "ব্যাংক ট্রান্সফার"
                            : formData.paymentMethod === "ssl"
                              ? "এসএসএল কমার্জ"
                              : "-"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>পেমেন্ট স্ট্যাটাস:</span>
                  <span className="text-green-600 font-semibold">পেন্ডিং</span>
                </div>
              </div>

              <div className="flex justify-between mt-6">
                <button
                  type="button"
                  onClick={handlePrevious}
                  className="bg-gray-500 text-white px-6 py-2 rounded-md hover:bg-gray-600 transition"
                >
                  ← পূর্ববর্তী
                </button>
                <button
                  type="submit"
                  className="text-white px-8 py-2 rounded-md hover:opacity-90 transition"
                  style={{ backgroundColor: "#00ADD2" }}
                >
                  ভর্তি সম্পন্ন করুন
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
