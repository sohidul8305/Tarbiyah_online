import React, { useState } from "react";
import { Link } from "react-router";
import {
  FaArrowLeft,
  FaCheckCircle,
  FaUser,
  FaEnvelope,
  FaPhone,
  FaAddressCard,
  FaCreditCard,
  FaMobileAlt,
  FaWallet,
  FaLock,
  FaSpinner,
  FaShieldAlt,
  FaInfoCircle,
  FaUniversity,
  FaBuilding,
  FaClock,
  FaAward,
  FaBookOpen,
  FaUsers,
  FaStar,
  FaHandshake,
  FaTruck,
  FaMapMarkerAlt,
  FaCity,
  FaGlobe,
  FaTag,
  FaArrowRight,
  FaUserPlus,
  FaGraduationCap,
  FaMosque,
  FaQuran,
  FaChevronUp,
  FaChevronDown,
} from "react-icons/fa";
import Footer from "../Navbar/Footer/Footer";
import Navbar from "../Navbar/Navbar";

const Course_kids_tajweed_enrollbnagla = () => {
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("bkash");
  const [createAccount, setCreateAccount] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);
  const [showEnrolmentSummaryMobile, setShowEnrolmentSummaryMobile] =
    useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedCourses, setSelectedCourses] = useState([]);

  // ডিপার্টমেন্ট ও কোর্সসমূহ
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
    townCity: "",
    postcode: "",
    country: "bangladesh",
    state: "",

    // Account
    password: "",
    confirmPassword: "",

    // Payment Information
    paymentMethod: "bkash",
    paymentType: "online",
    transactionId: "",
    paymentRemarks: "",
    paidAmount: "",
    bkashNumber: "",
    nagodNumber: "",
    rocketNumber: "",

    // Additional
    previousEducation: "",
    interestedSubjects: "",
  });
  const [formErrors, setFormErrors] = useState({});

  // কোর্সের তথ্য - Tajweed Course
  const courseInfo = {
    name: "তাজবিদ কোর্স",
    price: 5200,
    subtotal: 5200,
    bkashCharge: 0,
    total: 5200,
    recurringSubtotal: "৳ 1,300 / month",
    recurringTotals: "৳ 1,300 / month",
    firstRenewal: "08/30/2026",
  };

  const calculateTotal = () => {
    let total = 0;
    const currentCourses = departments[selectedDepartment]?.courses || [];
    selectedCourses.forEach((courseId) => {
      const course = currentCourses.find((c) => c.id === courseId);
      if (course) total += course.price;
    });
    return total || courseInfo.total;
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

  // ফর্ম ভ্যালিডেশন
  const validateForm = () => {
    const errors = {};
    if (!formData.firstName) errors.firstName = "প্রথম নাম প্রয়োজন";
    if (!formData.lastName) errors.lastName = "শেষ নাম প্রয়োজন";
    if (!formData.nationalId)
      errors.nationalId = "জাতীয় পরিচয় পত্র নম্বর প্রয়োজন";
    if (!formData.phone) errors.phone = "ফোন নম্বর প্রয়োজন";
    if (formData.phone && formData.phone.length < 11)
      errors.phone = "সঠিক ফোন নম্বর দিন";
    if (!formData.email) errors.email = "ইমেইল প্রয়োজন";
    if (!formData.fatherName) errors.fatherName = "পিতার নাম প্রয়োজন";
    if (!formData.motherName) errors.motherName = "মাতার নাম প্রয়োজন";
    if (!formData.guardianPhone)
      errors.guardianPhone = "গার্ডিয়ানের ফোন নম্বর প্রয়োজন";
    if (!formData.presentAddress)
      errors.presentAddress = "বর্তমান ঠিকানা প্রয়োজন";
    if (!formData.permanentAddress)
      errors.permanentAddress = "স্থায়ী ঠিকানা প্রয়োজন";
    if (!formData.paymentMethod)
      errors.paymentMethod = "পেমেন্ট মেথড নির্বাচন করুন";
    if (!formData.paidAmount) errors.paidAmount = "প্রদানকৃত টাকা লিখুন";
    if (!formData.transactionId) errors.transactionId = "ট্রানজেকশন আইডি লিখুন";

    if (createAccount) {
      if (!formData.password) errors.password = "পাসওয়ার্ড প্রয়োজন";
      if (formData.password !== formData.confirmPassword)
        errors.confirmPassword = "পাসওয়ার্ড মিলছে না";
    }
    return errors;
  };

  // ফর্ম সাবমিট হ্যান্ডলার
  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      alert("দয়া করে সব প্রয়োজনীয় তথ্য পূরণ করুন।");
      return;
    }

    setLoading(true);
    setFormErrors({});

    try {
      const paymentData = {
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        phone: formData.phone,
        address: formData.presentAddress,
        city: formData.townCity,
        country: formData.country,
        postcode: formData.postcode,
        amount: calculateTotal(),
        currency: "BDT",
        product_name:
          selectedCourses
            .map((id) => {
              const course = getCurrentCourses().find((c) => c.id === id);
              return course ? course.name : "";
            })
            .join(", ") || courseInfo.name,
        product_category: "educational",
        payment_method: paymentMethod,
        ...formData,
        selectedDepartment,
        selectedCourses,
      };

      console.log("Payment Data:", paymentData);

      if (
        paymentMethod === "sslcommerz" ||
        paymentMethod === "card" ||
        paymentMethod === "bank"
      ) {
        const response = await initiateSSLCommerzPayment(paymentData);
        if (response && response.redirectUrl) {
          window.location.href = response.redirectUrl;
        } else {
          alert("পেমেন্ট ইনিশিয়েট করতে সমস্যা হয়েছে।");
          setLoading(false);
        }
      } else {
        alert(`${paymentMethod.toUpperCase()} পেমেন্ট প্রক্রিয়াকরণ...`);
        alert("আপনার আবেদন সফলভাবে জমা হয়েছে!");
        setLoading(false);
      }
    } catch (error) {
      console.error("Payment Error:", error);
      alert("পেমেন্ট প্রক্রিয়ায় ত্রুটি হয়েছে।");
      setLoading(false);
    }
  };

  const initiateSSLCommerzPayment = async (paymentData) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          redirectUrl: "https://sandbox.sslcommerz.com/gwprocess/v4/index.php",
          transactionId: "TX" + Date.now(),
        });
      }, 1500);
    });
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

    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: "",
      });
    }
  };

  const applyCoupon = () => {
    if (couponCode === "TAJWEED50") {
      setCouponApplied(true);
      alert("কুপন প্রয়োগ করা হয়েছে! ডিসকাউন্ট প্রযোজ্য।");
    } else {
      alert("ভুল কুপন কোড।");
    }
  };

  return (
    <div className="min-h-screen bg-white text-[#333333] font-sans">
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Top Toggleable Enrolment Summary Bar */}
        <div className="bg-[#f8f9fa] border border-gray-200 rounded-md p-3 mb-6 flex justify-between items-center text-sm">
          <button
            onClick={() =>
              setShowEnrolmentSummaryMobile(!showEnrolmentSummaryMobile)
            }
            className="text-[#004d61] font-medium flex items-center gap-1 hover:underline"
          >
            <span>
              {showEnrolmentSummaryMobile
                ? "Hide Enrolment Summary"
                : "Show Enrolment Summary"}
            </span>
            {showEnrolmentSummaryMobile ? (
              <FaChevronUp className="text-xs" />
            ) : (
              <FaChevronDown className="text-xs" />
            )}
          </button>
          <span className="font-bold text-[#004d61]">
            ৳ {calculateTotal().toLocaleString()}
          </span>
        </div>

        {/* Expandable summary box */}
        {showEnrolmentSummaryMobile && (
          <div className="bg-white border border-gray-200 rounded-md p-4 mb-6 shadow-sm">
            {selectedCourses.length > 0 ? (
              selectedCourses.map((courseId) => {
                const course = getCurrentCourses().find(
                  (c) => c.id === courseId,
                );
                return course ? (
                  <div
                    key={courseId}
                    className="flex items-center justify-between pb-3 border-b border-gray-100"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-200 rounded overflow-hidden flex-shrink-0">
                        <img
                          src="https://i.ibb.co.com/7xnC6p7d/banner-2.jpg"
                          alt={course.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-[#004d61]">
                          {course.name} × 1
                        </p>
                        <p className="text-xs text-gray-500">
                          মেয়াদ: {course.duration}
                        </p>
                      </div>
                    </div>
                    <span className="font-bold text-sm">
                      ৳ {course.price.toLocaleString()}
                    </span>
                  </div>
                ) : null;
              })
            ) : (
              <div className="text-center text-gray-500 py-2 text-sm">
                কোন কোর্স নির্বাচন করা হয়নি
              </div>
            )}
          </div>
        )}

        {/* Returning customer login prompt */}
        <div className="text-sm mb-6 text-gray-600">
          Returning customer?{" "}
          <button className="text-[#004d61] font-semibold hover:underline">
            Click here to login
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* PERSONAL INFORMATION */}
          <div>
            <h2 className="text-[#004d61] font-bold text-sm tracking-wider mb-4 uppercase">
              ব্যক্তিগত তথ্য
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1">
                  প্রথম নাম <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border ${
                    formErrors.firstName ? "border-red-500" : "border-gray-300"
                  } rounded text-sm focus:outline-none focus:border-[#004d61]`}
                />
                {formErrors.firstName && (
                  <p className="text-red-500 text-xs mt-1">
                    {formErrors.firstName}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1">
                  শেষ নাম <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border ${
                    formErrors.lastName ? "border-red-500" : "border-gray-300"
                  } rounded text-sm focus:outline-none focus:border-[#004d61]`}
                />
                {formErrors.lastName && (
                  <p className="text-red-500 text-xs mt-1">
                    {formErrors.lastName}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1">
                  জাতীয় পরিচয় পত্র নম্বর{" "}
                  <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="nationalId"
                  value={formData.nationalId}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border ${
                    formErrors.nationalId ? "border-red-500" : "border-gray-300"
                  } rounded text-sm focus:outline-none focus:border-[#004d61]`}
                />
                {formErrors.nationalId && (
                  <p className="text-red-500 text-xs mt-1">
                    {formErrors.nationalId}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1">
                  জন্ম তারিখ <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border ${
                    formErrors.dateOfBirth
                      ? "border-red-500"
                      : "border-gray-300"
                  } rounded text-sm focus:outline-none focus:border-[#004d61]`}
                />
                {formData.age && (
                  <p className="text-xs text-gray-500 mt-1">
                    বয়স: {formData.age} বছর
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1">
                  মোবাইল নম্বর <span className="text-red-500">*</span>
                </label>
                <div className="flex border border-gray-300 rounded overflow-hidden">
                  <div className="bg-gray-100 px-3 py-2 flex items-center gap-1 border-r border-gray-300 text-sm">
                    <span>🇧🇩</span>
                    <span className="text-xs">▼</span>
                  </div>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="ফোন নম্বর"
                    className="w-full px-3 py-2 text-sm focus:outline-none"
                  />
                </div>
                {formErrors.phone && (
                  <p className="text-red-500 text-xs mt-1">
                    {formErrors.phone}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1">
                  ইমেইল <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border ${
                    formErrors.email ? "border-red-500" : "border-gray-300"
                  } rounded text-sm focus:outline-none focus:border-[#004d61]`}
                />
                {formErrors.email && (
                  <p className="text-red-500 text-xs mt-1">
                    {formErrors.email}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1">
                  লিঙ্গ <span className="text-red-500">*</span>
                </label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded text-sm bg-white focus:outline-none focus:border-[#004d61]"
                >
                  <option value="">লিঙ্গ নির্বাচন</option>
                  <option value="male">পুরুষ</option>
                  <option value="female">মহিলা</option>
                  <option value="other">অন্যান্য</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1">
                  রক্তের গ্রুপ
                </label>
                <select
                  name="bloodGroup"
                  value={formData.bloodGroup}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded text-sm bg-white focus:outline-none focus:border-[#004d61]"
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
                <label className="block text-xs font-bold text-gray-600 mb-1">
                  ধর্ম
                </label>
                <input
                  type="text"
                  name="religion"
                  value={formData.religion}
                  onChange={handleInputChange}
                  placeholder="ইসলাম"
                  className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-[#004d61]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1">
                  শিক্ষাগত যোগ্যতা
                </label>
                <select
                  name="educationalQualification"
                  value={formData.educationalQualification}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded text-sm bg-white focus:outline-none focus:border-[#004d61]"
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
                <label className="block text-xs font-bold text-gray-600 mb-1">
                  প্রতিষ্ঠানের নাম
                </label>
                <input
                  type="text"
                  name="instituteName"
                  value={formData.instituteName}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-[#004d61]"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1">
                  পেশা
                </label>
                <input
                  type="text"
                  name="occupation"
                  value={formData.occupation}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-[#004d61]"
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-xs font-bold text-gray-600 mb-1">
                বৈবাহিক অবস্থা
              </label>
              <select
                name="maritalStatus"
                value={formData.maritalStatus}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded text-sm bg-white focus:outline-none focus:border-[#004d61]"
              >
                <option value="">নির্বাচন করুন</option>
                <option value="single">অবিবাহিত</option>
                <option value="married">বিবাহিত</option>
                <option value="divorced">তালাকপ্রাপ্ত</option>
                <option value="widowed">বিধবা/বিধুর</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={createAccount}
                  onChange={() => setCreateAccount(!createAccount)}
                  className="w-4 h-4 text-[#004d61] rounded border-gray-300"
                />
                <span className="text-sm text-gray-700">
                  একটি অ্যাকাউন্ট তৈরি করুন?
                </span>
              </label>

              {createAccount && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3 p-4 bg-gray-50 rounded border border-gray-200">
                  <div>
                    <label className="block text-xs font-bold text-gray-600 mb-1">
                      পাসওয়ার্ড <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-600 mb-1">
                      পাসওয়ার্ড নিশ্চিত করুন{" "}
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          <hr className="border-gray-200 my-6" />

          {/* FAMILY & ADDRESS INFORMATION */}
          <div>
            <h2 className="text-[#004d61] font-bold text-sm tracking-wider mb-4 uppercase">
              পরিবার ও ঠিকানার তথ্য
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1">
                  পিতার নাম <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="fatherName"
                  value={formData.fatherName}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border ${
                    formErrors.fatherName ? "border-red-500" : "border-gray-300"
                  } rounded text-sm focus:outline-none focus:border-[#004d61]`}
                />
                {formErrors.fatherName && (
                  <p className="text-red-500 text-xs mt-1">
                    {formErrors.fatherName}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1">
                  মাতার নাম <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="motherName"
                  value={formData.motherName}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border ${
                    formErrors.motherName ? "border-red-500" : "border-gray-300"
                  } rounded text-sm focus:outline-none focus:border-[#004d61]`}
                />
                {formErrors.motherName && (
                  <p className="text-red-500 text-xs mt-1">
                    {formErrors.motherName}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1">
                  গার্ডিয়ানের মোবাইল নম্বর{" "}
                  <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  name="guardianPhone"
                  value={formData.guardianPhone}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border ${
                    formErrors.guardianPhone
                      ? "border-red-500"
                      : "border-gray-300"
                  } rounded text-sm focus:outline-none focus:border-[#004d61]`}
                />
                {formErrors.guardianPhone && (
                  <p className="text-red-500 text-xs mt-1">
                    {formErrors.guardianPhone}
                  </p>
                )}
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-xs font-bold text-gray-600 mb-1">
                বর্তমান ঠিকানা <span className="text-red-500">*</span>
              </label>
              <textarea
                name="presentAddress"
                value={formData.presentAddress}
                onChange={handleInputChange}
                rows="2"
                className={`w-full px-3 py-2 border ${
                  formErrors.presentAddress
                    ? "border-red-500"
                    : "border-gray-300"
                } rounded text-sm focus:outline-none focus:border-[#004d61]`}
              />
              {formErrors.presentAddress && (
                <p className="text-red-500 text-xs mt-1">
                  {formErrors.presentAddress}
                </p>
              )}
            </div>

            <div className="mb-4">
              <label className="block text-xs font-bold text-gray-600 mb-1">
                স্থায়ী ঠিকানা <span className="text-red-500">*</span>
              </label>
              <textarea
                name="permanentAddress"
                value={formData.permanentAddress}
                onChange={handleInputChange}
                rows="2"
                className={`w-full px-3 py-2 border ${
                  formErrors.permanentAddress
                    ? "border-red-500"
                    : "border-gray-300"
                } rounded text-sm focus:outline-none focus:border-[#004d61]`}
              />
              {formErrors.permanentAddress && (
                <p className="text-red-500 text-xs mt-1">
                  {formErrors.permanentAddress}
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1">
                  TOWN / CITY
                </label>
                <input
                  type="text"
                  name="townCity"
                  value={formData.townCity}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-[#004d61]"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1">
                  POSTCODE
                </label>
                <input
                  type="text"
                  name="postcode"
                  value={formData.postcode}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-[#004d61]"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1">
                  Country <span className="text-red-500">*</span>
                </label>
                <select
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded text-sm bg-white focus:outline-none focus:border-[#004d61]"
                >
                  <option value="bangladesh">বাংলাদেশ</option>
                  <option value="india">ভারত</option>
                  <option value="pakistan">পাকিস্তান</option>
                  <option value="other">অন্যান্য</option>
                </select>
              </div>
            </div>
          </div>

          <hr className="border-gray-200 my-6" />

          {/* COURSE SELECTION */}
          <div>
            <h2 className="text-[#004d61] font-bold text-sm tracking-wider mb-4 uppercase">
              ডিপার্টমেন্ট ও কোর্স নির্বাচন
            </h2>

            <div className="mb-4">
              <label className="block text-xs font-bold text-gray-600 mb-1">
                ডিপার্টমেন্ট নির্বাচন করুন *
              </label>
              <select
                name="selectedDepartment"
                value={selectedDepartment}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded text-sm bg-white focus:outline-none focus:border-[#004d61]"
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
              <div className="mb-4">
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
                        className="accent-[#004d61]"
                      />
                      <div className="flex-1">
                        <p className="text-xs font-medium text-gray-800">
                          {course.name}
                        </p>
                        <div className="flex justify-between">
                          <span className="text-[10px] text-gray-500">
                            মেয়াদ: {course.duration}
                          </span>
                          <span className="text-xs font-semibold text-[#004d61]">
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
              <div className="bg-gray-50 p-3 rounded border border-gray-200 mb-4">
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
                <p className="text-xs font-bold text-[#004d61] mt-1">
                  মোট মূল্য: ৳{calculateTotal().toLocaleString()}
                </p>
              </div>
            )}
          </div>

          <hr className="border-gray-200 my-6" />

          {/* ORDER SUMMARY SECTION */}
          <div>
            <h2 className="text-[#004d61] font-bold text-sm tracking-wider mb-2 uppercase">
              ORDER SUMMARY
            </h2>

            <div className="mb-4">
              <button
                type="button"
                className="text-xs text-[#004d61] hover:underline flex items-center gap-1"
              >
                Have a coupon?{" "}
                <span className="font-semibold">
                  Click here to enter your code
                </span>
              </button>
            </div>

            <div className="bg-[#fcfcfc] border border-gray-200 rounded p-4 mb-4">
              {selectedCourses.length > 0 ? (
                selectedCourses.map((courseId) => {
                  const course = getCurrentCourses().find(
                    (c) => c.id === courseId,
                  );
                  return course ? (
                    <div
                      key={courseId}
                      className="flex items-center justify-between pb-3 border-b border-gray-100"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gray-200 rounded overflow-hidden flex-shrink-0">
                          <img
                            src="https://i.ibb.co.com/7xnC6p7d/banner-2.jpg"
                            alt={course.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <p className="text-xs font-bold text-[#004d61]">
                          {course.name}
                        </p>
                      </div>
                      <span className="text-xs font-semibold">
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
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">
                  ৳ {calculateTotal().toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-gray-600">bKash Charge</span>
                <span className="font-medium text-green-600">৳ 0</span>
              </div>
              <div className="flex justify-between py-3 border-b border-gray-200 text-base font-bold text-[#004d61]">
                <span>Total</span>
                <span className="text-[#004d61]">
                  ৳ {calculateTotal().toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          <hr className="border-gray-200 my-6" />

          {/* PAYMENT SECTION */}
          <div>
            <h2 className="text-[#004d61] font-bold text-sm tracking-wider uppercase mb-1">
              PAYMENT
            </h2>
            <p className="text-[11px] text-gray-500 mb-4 flex items-center gap-1 font-medium tracking-wide">
              ALL TRANSACTIONS ARE SECURE AND ENCRYPTED.
            </p>

            {/* Payment Instructions */}
            <div
              className="p-3 rounded-lg border-2 mb-4"
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1">
                  পেমেন্ট মেথড <span className="text-red-500">*</span>
                </label>
                <select
                  name="paymentMethod"
                  value={formData.paymentMethod}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border ${
                    formErrors.paymentMethod
                      ? "border-red-500"
                      : "border-gray-300"
                  } rounded text-sm bg-white focus:outline-none focus:border-[#004d61]`}
                >
                  <option value="bkash">বিকাশ (মার্চেন্ট পে)</option>
                  <option value="nagod">নগদ (মার্চেন্ট পে)</option>
                  <option value="rocket">রকেট</option>
                  <option value="bank">ব্যাংক ট্রান্সফার</option>
                  <option value="ssl">এসএসএল কমার্জ (অনলাইন)</option>
                </select>
                {formErrors.paymentMethod && (
                  <p className="text-red-500 text-xs mt-1">
                    {formErrors.paymentMethod}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1">
                  পেমেন্ট টাইপ *
                </label>
                <select
                  name="paymentType"
                  value={formData.paymentType}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded text-sm bg-white focus:outline-none focus:border-[#004d61]"
                >
                  <option value="online">অনলাইন পেমেন্ট</option>
                  <option value="offline">অফলাইন পেমেন্ট</option>
                </select>
              </div>
            </div>

            {/* Merchant Number Display */}
            {(formData.paymentMethod === "bkash" ||
              formData.paymentMethod === "nagod") && (
              <div className="p-3 rounded-lg bg-blue-50 border border-blue-200 mb-4">
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

            {/* Bank Information */}
            {formData.paymentMethod === "bank" && (
              <div className="p-3 rounded-lg border bg-blue-50 border-blue-200 mb-4">
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
              <div className="mb-4">
                <label className="block text-xs font-bold text-gray-600 mb-1">
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
                  className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-[#004d61]"
                />
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1">
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
                  className={`w-full px-3 py-2 border ${
                    formErrors.paidAmount ? "border-red-500" : "border-gray-300"
                  } rounded text-sm focus:outline-none focus:border-[#004d61]`}
                />
                {calculateTotal() > 0 && (
                  <p className="text-[10px] text-gray-500 mt-0.5">
                    মোট দিতে হবে: ৳{calculateTotal().toLocaleString()}
                  </p>
                )}
                {formErrors.paidAmount && (
                  <p className="text-red-500 text-xs mt-1">
                    {formErrors.paidAmount}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1">
                  ট্রানজেকশন আইডি *
                </label>
                <input
                  type="text"
                  name="transactionId"
                  value={formData.transactionId}
                  onChange={handleInputChange}
                  placeholder="ট্রানজেকশন আইডি"
                  className={`w-full px-3 py-2 border ${
                    formErrors.transactionId
                      ? "border-red-500"
                      : "border-gray-300"
                  } rounded text-sm focus:outline-none focus:border-[#004d61]`}
                />
                {formErrors.transactionId && (
                  <p className="text-red-500 text-xs mt-1">
                    {formErrors.transactionId}
                  </p>
                )}
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-xs font-bold text-gray-600 mb-1">
                পেমেন্ট রিমার্কস
              </label>
              <textarea
                name="paymentRemarks"
                value={formData.paymentRemarks}
                onChange={handleInputChange}
                rows="2"
                className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-[#004d61]"
                placeholder="অতিরিক্ত পেমেন্ট তথ্য..."
              />
            </div>

            {/* Payment Summary */}
            <div className="p-3 rounded-lg border border-gray-200 bg-gray-50 mb-4">
              <p className="text-xs font-semibold text-gray-700">
                পেমেন্ট সামারি
              </p>
              <div className="flex justify-between text-xs mt-1">
                <span>মোট কোর্স ফি:</span>
                <span className="font-bold text-[#004d61]">
                  ৳{calculateTotal().toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between text-xs">
                <span>নির্বাচিত ডিপার্টমেন্ট:</span>
                <span className="font-semibold">
                  {selectedDepartment
                    ? departments[selectedDepartment]?.name
                    : "-"}
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

            {/* Terms and conditions */}
            <div className="flex items-start gap-2 mb-6 text-xs text-gray-600">
              <input
                type="checkbox"
                required
                className="mt-0.5 w-4 h-4 text-[#004d61] rounded border-gray-300"
              />
              <div>
                I've read and accept the{" "}
                <button
                  type="button"
                  className="text-[#004d61] underline font-medium"
                >
                  terms & conditions
                </button>
                ,{" "}
                <button
                  type="button"
                  className="text-[#004d61] underline font-medium"
                >
                  privacy policy
                </button>{" "}
                &{" "}
                <button
                  type="button"
                  className="text-[#004d61] underline font-medium"
                >
                  refund policy
                </button>
                .
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full bg-[#cccccc] text-gray-800 font-bold py-3.5 rounded text-sm hover:bg-[#b3b3b3] transition-colors flex items-center justify-center gap-2 ${
                loading ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {loading ? (
                <>
                  <FaSpinner className="animate-spin" />
                  প্রক্রিয়াকরণ...
                </>
              ) : (
                <>
                  <FaLock className="text-xs" />
                  <span>Enroll Now ৳ {calculateTotal().toLocaleString()}</span>
                </>
              )}
            </button>

            <div className="flex items-center justify-center gap-1.5 mt-3 text-xs text-gray-500">
              <span className="text-green-600 font-bold">✔</span> 100% Secure
              Payments
            </div>
          </div>
        </form>
      </div>

      <Footer />
    </div>
  );
};

export default Course_kids_tajweed_enrollbnagla;
