import React, { useState } from "react";
import { Link } from "react-router";
import {
  FaArrowLeft,
  FaCheckCircle,
  FaUser,
  FaEnvelope,
  FaPhone,
  FaCreditCard,
  FaMobileAlt,
  FaLock,
  FaSpinner,
  FaShieldAlt,
  FaUniversity,
  FaBuilding,
  FaMapMarkerAlt,
  FaCity,
  FaGlobe,
  FaTag,
  FaArrowRight,
  FaUserPlus,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";
import Footer from "../Navbar/Footer/Footer";
import Navbar from "../Navbar/Navbar";

const Enroll = () => {
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("bkash");
  const [createAccount, setCreateAccount] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);
  const [showOrderSummaryMobile, setShowOrderSummaryMobile] = useState(false);
  const [step, setStep] = useState(1);

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

    // Account
    password: "",
    confirmPassword: "",

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
  const [formErrors, setFormErrors] = useState({});

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

  // কোর্সের তথ্য
  const courseInfo = {
    name: "Diploma in Islamic Studies",
    subtitle: "بسم الله الرحمن الرحيم",
    price: 12000,
    discount: 0,
    bkashCharge: 0,
    total: 12000,
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
    if (!formData.selectedDepartment)
      errors.selectedDepartment = "ডিপার্টমেন্ট নির্বাচন করুন";
    if (formData.selectedCourses.length === 0)
      errors.selectedCourses = "কমপক্ষে একটি কোর্স নির্বাচন করুন";
    if (!formData.paymentMethod)
      errors.paymentMethod = "পেমেন্ট মেথড নির্বাচন করুন";
    if (!formData.paymentType)
      errors.paymentType = "পেমেন্ট টাইপ নির্বাচন করুন";
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
        city: formData.city,
        country: formData.country,
        postcode: formData.postcode,
        amount: calculateTotal(),
        currency: "BDT",
        product_name: formData.selectedCourses
          .map((id) => {
            const course = getCurrentCourses().find((c) => c.id === id);
            return course ? course.name : "";
          })
          .join(", "),
        product_category: "educational",
        payment_method: paymentMethod,
        ...formData,
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

  const initiateSSLCommerzPayment = async () => {
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
    if (couponCode === "DISCOUNT50") {
      setCouponApplied(true);
      alert("কুপন প্রয়োগ করা হয়েছে!");
    } else {
      alert("ভুল কুপন কোড।");
    }
  };

  const handleNext = () => {
    setStep(step + 1);
  };

  const handlePrevious = () => {
    setStep(step - 1);
  };

  return (
    <div className="min-h-screen bg-white py-8 px-4 sm:px-6 lg:px-8">
      <Navbar />
      <div className="max-w-4xl mx-auto">
        {/* Top Collapsible Order Summary Bar */}
        <div className="border border-gray-200 rounded-lg p-4 mb-6 shadow-sm bg-white mt-5">
          <div
            className="flex justify-between items-center cursor-pointer text-gray-700 font-medium"
            onClick={() => setShowOrderSummaryMobile(!showOrderSummaryMobile)}
          >
            <div className="flex items-center gap-2 text-sm">
              {showOrderSummaryMobile ? (
                <FaChevronUp className="text-xs" />
              ) : (
                <FaChevronDown className="text-xs" />
              )}
              <span>
                {showOrderSummaryMobile
                  ? "Hide Enrolment Summary"
                  : "Show Enrolment Summary"}
              </span>
            </div>
            <span className="font-bold text-gray-800">
              ৳ {calculateTotal().toLocaleString() || "0"}
            </span>
          </div>

          {showOrderSummaryMobile && (
            <div className="mt-4 pt-4 border-t border-gray-100 animate-fade-in">
              {formData.selectedCourses.length > 0 ? (
                formData.selectedCourses.map((courseId) => {
                  const course = getCurrentCourses().find(
                    (c) => c.id === courseId,
                  );
                  return course ? (
                    <div
                      key={courseId}
                      className="flex items-center justify-between pb-3 border-b border-gray-100"
                    >
                      <div className="flex items-center gap-3">
                        <span className="bg-gray-100 p-2 rounded text-xs relative">
                          🎓
                        </span>
                        <span className="text-sm font-medium text-gray-800">
                          {course.name} × 1
                        </span>
                      </div>
                      <span className="text-sm font-semibold">
                        ৳ {course.price.toLocaleString()}
                      </span>
                    </div>
                  ) : null;
                })
              ) : (
                <div className="text-sm text-gray-500 text-center py-2">
                  কোন কোর্স নির্বাচন করা হয়নি
                </div>
              )}
              <div className="flex justify-between py-1 text-sm text-gray-600 mt-2">
                <span>Subtotal</span>
                <span>৳ {calculateTotal().toLocaleString()}</span>
              </div>
              <div className="flex justify-between py-1 text-sm text-gray-600">
                <span>bKash Charge</span>
                <span className="text-green-600">৳ 0</span>
              </div>
              <div className="flex justify-between py-2 border-t border-gray-200 font-bold text-base text-gray-900 mt-2">
                <span>Total</span>
                <span>৳ {calculateTotal().toLocaleString()}</span>
              </div>
            </div>
          )}
        </div>

        {/* Returning Customer Link */}
        <div className="text-sm text-gray-500 mb-6">
          Returning customer?{" "}
          <button className="text-yellow-600 hover:underline font-medium">
            Click here to login
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* SHIPPING INFORMATION - Personal Info */}
          <div>
            <h2 className="text-sm font-bold tracking-wider text-[#002b2b] mb-4 uppercase">
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
                  className={`w-full px-3 py-2.5 border ${
                    formErrors.firstName ? "border-red-500" : "border-gray-300"
                  } rounded focus:outline-none focus:border-gray-500 text-sm`}
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
                  className={`w-full px-3 py-2.5 border ${
                    formErrors.lastName ? "border-red-500" : "border-gray-300"
                  } rounded focus:outline-none focus:border-gray-500 text-sm`}
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
                  className={`w-full px-3 py-2.5 border ${
                    formErrors.nationalId ? "border-red-500" : "border-gray-300"
                  } rounded focus:outline-none focus:border-gray-500 text-sm`}
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
                  className={`w-full px-3 py-2.5 border ${
                    formErrors.dateOfBirth
                      ? "border-red-500"
                      : "border-gray-300"
                  } rounded focus:outline-none focus:border-gray-500 text-sm`}
                />
                {formData.age && (
                  <p className="text-xs text-gray-500 mt-1">
                    বয়স: {formData.age} বছর
                  </p>
                )}
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-xs font-bold text-gray-600 mb-1">
                মোবাইল নম্বর <span className="text-red-500">*</span>
              </label>
              <div className="flex border border-gray-300 rounded overflow-hidden focus-within:border-gray-500">
                <div className="bg-gray-50 px-3 flex items-center gap-1 border-r border-gray-300 text-sm text-gray-700">
                  <span>🇧🇩</span>
                  <span>+880</span>
                  <FaChevronDown className="text-[10px] text-gray-500" />
                </div>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="ফোন নম্বর"
                  className="w-full px-3 py-2.5 text-sm focus:outline-none"
                />
              </div>
              {formErrors.phone && (
                <p className="text-red-500 text-xs mt-1">{formErrors.phone}</p>
              )}
            </div>

            <div className="mb-4">
              <label className="block text-xs font-bold text-gray-600 mb-1">
                ইমেইল <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`w-full px-3 py-2.5 border ${
                  formErrors.email ? "border-red-500" : "border-gray-300"
                } rounded focus:outline-none focus:border-gray-500 text-sm`}
              />
              {formErrors.email && (
                <p className="text-red-500 text-xs mt-1">{formErrors.email}</p>
              )}
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
                  className="w-full px-3 py-2.5 border border-gray-300 rounded focus:outline-none focus:border-gray-500 text-sm"
                >
                  <option value="">লিঙ্গ নির্বাচন করুন</option>
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
                  className="w-full px-3 py-2.5 border border-gray-300 rounded focus:outline-none focus:border-gray-500 text-sm"
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
                <label className="block text-xs font-bold text-gray-600 mb-1">
                  ধর্ম
                </label>
                <input
                  type="text"
                  name="religion"
                  value={formData.religion}
                  onChange={handleInputChange}
                  placeholder="ইসলাম"
                  className="w-full px-3 py-2.5 border border-gray-300 rounded focus:outline-none focus:border-gray-500 text-sm"
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
                  className="w-full px-3 py-2.5 border border-gray-300 rounded focus:outline-none focus:border-gray-500 text-sm"
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
                <label className="block text-xs font-bold text-gray-600 mb-1">
                  প্রতিষ্ঠানের নাম
                </label>
                <input
                  type="text"
                  name="instituteName"
                  value={formData.instituteName}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2.5 border border-gray-300 rounded focus:outline-none focus:border-gray-500 text-sm"
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
                  className="w-full px-3 py-2.5 border border-gray-300 rounded focus:outline-none focus:border-gray-500 text-sm"
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
                className="w-full px-3 py-2.5 border border-gray-300 rounded focus:outline-none focus:border-gray-500 text-sm"
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
          <div className="pt-6 border-t border-gray-200">
            <h2 className="text-sm font-bold tracking-wider text-[#002b2b] mb-4 uppercase">
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
                  className={`w-full px-3 py-2.5 border ${
                    formErrors.fatherName ? "border-red-500" : "border-gray-300"
                  } rounded focus:outline-none focus:border-gray-500 text-sm`}
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
                  className={`w-full px-3 py-2.5 border ${
                    formErrors.motherName ? "border-red-500" : "border-gray-300"
                  } rounded focus:outline-none focus:border-gray-500 text-sm`}
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
                  className={`w-full px-3 py-2.5 border ${
                    formErrors.guardianPhone
                      ? "border-red-500"
                      : "border-gray-300"
                  } rounded focus:outline-none focus:border-gray-500 text-sm`}
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
                className={`w-full px-3 py-2.5 border ${
                  formErrors.presentAddress
                    ? "border-red-500"
                    : "border-gray-300"
                } rounded focus:outline-none focus:border-gray-500 text-sm`}
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
                className={`w-full px-3 py-2.5 border ${
                  formErrors.permanentAddress
                    ? "border-red-500"
                    : "border-gray-300"
                } rounded focus:outline-none focus:border-gray-500 text-sm`}
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
                  শহর
                </label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2.5 border border-gray-300 rounded focus:outline-none focus:border-gray-500 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1">
                  পোস্ট কোড
                </label>
                <input
                  type="text"
                  name="postcode"
                  value={formData.postcode}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2.5 border border-gray-300 rounded focus:outline-none focus:border-gray-500 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1">
                  দেশ <span className="text-red-500">*</span>
                </label>
                <select
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2.5 border border-gray-300 rounded bg-white text-sm focus:outline-none"
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
          <div className="pt-6 border-t border-gray-200">
            <h2 className="text-sm font-bold tracking-wider text-[#002b2b] mb-4 uppercase">
              ডিপার্টমেন্ট ও কোর্স নির্বাচন
            </h2>

            <div className="mb-6">
              <label className="block text-xs font-bold text-gray-600 mb-1">
                ডিপার্টমেন্ট নির্বাচন করুন{" "}
                <span className="text-red-500">*</span>
              </label>
              <select
                name="selectedDepartment"
                value={formData.selectedDepartment}
                onChange={handleInputChange}
                className={`w-full px-3 py-2.5 border ${
                  formErrors.selectedDepartment
                    ? "border-red-500"
                    : "border-gray-300"
                } rounded focus:outline-none focus:border-gray-500 text-sm`}
              >
                <option value="">ডিপার্টমেন্ট নির্বাচন করুন</option>
                <option value="islamic-studies">
                  ডিপ্লোমা ইন ইসলামিক স্টাডিজ
                </option>
                <option value="alemiyah">তারবিয়াহ আলেমিয়াহ</option>
                <option value="quran-studies">তারবিয়াহ কুরআন স্টাডিজ</option>
                <option value="quran-elders">কুরআন ফর এল্ডার্স</option>
              </select>
              {formErrors.selectedDepartment && (
                <p className="text-red-500 text-xs mt-1">
                  {formErrors.selectedDepartment}
                </p>
              )}
            </div>

            {formData.selectedDepartment && (
              <div>
                <h3 className="font-semibold mb-3 text-gray-800">
                  {departments[formData.selectedDepartment]?.name} - কোর্সসমূহ
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {getCurrentCourses().map((course) => (
                    <div
                      key={course.id}
                      className="border rounded-lg p-4 hover:shadow-md transition border-gray-200"
                    >
                      <label className="flex items-start space-x-3 cursor-pointer">
                        <input
                          type="checkbox"
                          name="selectedCourses"
                          value={course.id}
                          checked={formData.selectedCourses.includes(course.id)}
                          onChange={handleInputChange}
                          className="mt-1 h-4 w-4 text-gray-800 focus:ring-gray-500 border-gray-300 rounded"
                        />
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-800">
                            {course.name}
                          </h4>
                          <div className="flex justify-between mt-1">
                            <span className="text-xs text-gray-500">
                              মেয়াদ: {course.duration}
                            </span>
                            <span className="text-sm font-medium text-gray-700">
                              ৳{course.price.toLocaleString()}
                            </span>
                          </div>
                        </div>
                      </label>
                    </div>
                  ))}
                </div>
                {formErrors.selectedCourses && (
                  <p className="text-red-500 text-xs mt-2">
                    {formErrors.selectedCourses}
                  </p>
                )}
              </div>
            )}

            {formData.selectedCourses.length > 0 && (
              <div className="p-4 rounded-lg mt-4 bg-gray-50 border border-gray-200">
                <h3 className="font-semibold text-lg text-gray-800">
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
                        <span className="text-sm font-medium ml-2 text-gray-700">
                          ৳{course.price.toLocaleString()}
                        </span>
                      </li>
                    ) : null;
                  })}
                </ul>
                <div className="mt-3 pt-2 border-t border-gray-300">
                  <p className="font-bold text-lg text-gray-800">
                    মোট মূল্য: ৳{calculateTotal().toLocaleString()}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* CREATE ACCOUNT */}
          <div className="pt-6 border-t border-gray-200">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={createAccount}
                onChange={() => setCreateAccount(!createAccount)}
                className="w-4 h-4 text-gray-700 rounded border-gray-300"
              />
              <span className="text-sm text-gray-700">create an account?</span>
            </label>

            {createAccount && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3 p-4 bg-gray-50 rounded border border-gray-200">
                <div>
                  <label className="block text-xs font-bold text-gray-600 mb-1">
                    PASSWORD <span className="text-red-500">*</span>
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
                    CONFIRM PASSWORD <span className="text-red-500">*</span>
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

          {/* ORDER SUMMARY SECTION */}
          <div className="pt-6 border-t border-gray-200">
            <h2 className="text-sm font-bold tracking-wider text-[#002b2b] mb-4 uppercase">
              Order Summary
            </h2>
            <div className="text-xs text-yellow-600 mb-3 cursor-pointer font-medium">
              Have a coupon? Click here to enter your code
            </div>

            <div className="flex gap-2 mb-4">
              <input
                type="text"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                placeholder="Enter coupon code"
                className="px-3 py-2 border border-gray-300 rounded text-sm flex-1 focus:outline-none"
              />
              <button
                type="button"
                onClick={applyCoupon}
                className="bg-gray-800 text-white px-4 py-2 rounded text-sm font-medium hover:bg-gray-700"
              >
                Apply
              </button>
            </div>

            <div className="border border-gray-200 rounded-lg p-4 bg-gray-50/50">
              {formData.selectedCourses.length > 0 ? (
                formData.selectedCourses.map((courseId) => {
                  const course = getCurrentCourses().find(
                    (c) => c.id === courseId,
                  );
                  return course ? (
                    <div
                      key={courseId}
                      className="flex items-center justify-between pb-3 border-b border-gray-200"
                    >
                      <div className="flex items-center gap-3">
                        <span className="bg-white border border-gray-200 p-2 rounded text-xs relative">
                          🎓
                        </span>
                        <span className="text-sm font-medium text-gray-800">
                          {course.name}
                        </span>
                      </div>
                      <span className="text-sm font-semibold">
                        ৳ {course.price.toLocaleString()}
                      </span>
                    </div>
                  ) : null;
                })
              ) : (
                <div className="text-sm text-gray-500 text-center py-2">
                  কোন কোর্স নির্বাচন করা হয়নি
                </div>
              )}
              <div className="flex justify-between py-2 text-sm text-gray-600 mt-2">
                <span>Subtotal</span>
                <span>৳ {calculateTotal().toLocaleString()}</span>
              </div>
              <div className="flex justify-between py-2 text-sm text-gray-600 border-t border-gray-200">
                <span>bKash Charge</span>
                <span className="text-green-600">৳ 0</span>
              </div>
              <div className="flex justify-between py-3 text-base font-bold text-gray-900 border-t border-gray-300 mt-1">
                <span>Total</span>
                <span>৳ {calculateTotal().toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* PAYMENT SECTION */}
          <div className="pt-6 border-t border-gray-200">
            <h2 className="text-sm font-bold tracking-wider text-[#002b2b] mb-1 uppercase">
              Payment
            </h2>
            <p className="text-[11px] text-gray-500 mb-4 tracking-wide uppercase">
              All transactions are secure and encrypted.
            </p>

            {/* Payment Instructions */}
            <div
              className="p-4 rounded-lg border-2 mb-4"
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
                  <span className="font-bold text-gray-800">
                    বিকাশ: 01841412525
                  </span>
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
                  className={`w-full px-3 py-2.5 border ${
                    formErrors.paymentMethod
                      ? "border-red-500"
                      : "border-gray-300"
                  } rounded focus:outline-none focus:border-gray-500 text-sm`}
                >
                  <option value="">পেমেন্ট মেথড নির্বাচন করুন</option>
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
                  পেমেন্ট টাইপ <span className="text-red-500">*</span>
                </label>
                <select
                  name="paymentType"
                  value={formData.paymentType}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2.5 border ${
                    formErrors.paymentType
                      ? "border-red-500"
                      : "border-gray-300"
                  } rounded focus:outline-none focus:border-gray-500 text-sm`}
                >
                  <option value="">পেমেন্ট টাইপ নির্বাচন করুন</option>
                  <option value="online">অনলাইন পেমেন্ট</option>
                  <option value="offline">অফলাইন পেমেন্ট</option>
                </select>
                {formErrors.paymentType && (
                  <p className="text-red-500 text-xs mt-1">
                    {formErrors.paymentType}
                  </p>
                )}
              </div>
            </div>

            {/* মার্চেন্ট নম্বর দেখানো */}
            {(formData.paymentMethod === "bkash" ||
              formData.paymentMethod === "nagod") && (
              <div className="p-3 rounded-lg mb-4 bg-blue-50 border border-blue-200">
                <p className="text-sm font-medium">
                  📌 {formData.paymentMethod === "bkash" ? "বিকাশ" : "নগদ"}{" "}
                  মার্চেন্ট নম্বর:
                  <span className="font-bold ml-2 text-gray-800">
                    {formData.paymentMethod === "bkash"
                      ? "01841412525"
                      : "01841512525"}
                  </span>
                </p>
                <p className="text-xs text-red-600 mt-1">
                  ⚠️ শুধুমাত্র "মার্চেন্ট পে" অপশনে পেমেন্ট করুন। "সেন্ড মানি"
                  করলে হবে না।
                </p>
              </div>
            )}

            {/* ব্যাংক তথ্য */}
            {formData.paymentMethod === "bank" && (
              <div className="p-3 rounded-lg border mb-4 bg-blue-50 border-blue-200">
                <h4 className="font-bold text-gray-800">🏦 ব্যাংক তথ্য:</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2 text-sm">
                  <div>
                    <p>
                      <span className="font-semibold">একাউন্ট নাম:</span>{" "}
                      Tarbiyah Academy
                    </p>
                    <p>
                      <span className="font-semibold">একাউন্ট নম্বর:</span>{" "}
                      401211100007923
                    </p>
                    <p>
                      <span className="font-semibold">ব্যাংক:</span> Shahjalal
                      Islami Bank Limited
                    </p>
                  </div>
                  <div>
                    <p>
                      <span className="font-semibold">শাখা:</span> Satmasjid
                      Road Branch
                    </p>
                    <p>
                      <span className="font-semibold">ব্রাঞ্চ কোড:</span> 4012
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
                  required
                  placeholder="01xxxxxxxxx"
                  className="w-full px-3 py-2.5 border border-gray-300 rounded focus:outline-none focus:border-gray-500 text-sm"
                />
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1">
                  প্রদানকৃত টাকা (৳) <span className="text-red-500">*</span>
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
                  className={`w-full px-3 py-2.5 border ${
                    formErrors.paidAmount ? "border-red-500" : "border-gray-300"
                  } rounded focus:outline-none focus:border-gray-500 text-sm`}
                />
                {calculateTotal() > 0 && (
                  <p className="text-xs text-gray-500 mt-1">
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
                  ট্রানজেকশন আইডি <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="transactionId"
                  value={formData.transactionId}
                  onChange={handleInputChange}
                  required
                  placeholder="ট্রানজেকশন আইডি লিখুন"
                  className={`w-full px-3 py-2.5 border ${
                    formErrors.transactionId
                      ? "border-red-500"
                      : "border-gray-300"
                  } rounded focus:outline-none focus:border-gray-500 text-sm`}
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
                className="w-full px-3 py-2.5 border border-gray-300 rounded focus:outline-none focus:border-gray-500 text-sm"
                placeholder="অতিরিক্ত পেমেন্ট তথ্য (যদি থাকে)..."
              />
            </div>

            {/* SSL Commerz Integration */}
            {formData.paymentMethod === "ssl" && (
              <div className="p-4 rounded-lg border mb-4 bg-blue-50 border-blue-200">
                <h3 className="font-semibold text-gray-800">
                  এসএসএল কমার্জ অনলাইন পেমেন্ট
                </h3>
                <p className="text-sm text-gray-600">
                  আপনাকে নিরাপদ পেমেন্টের জন্য এসএসএল কমার্জ পেমেন্ট গেটওয়েতে
                  পুনঃনির্দেশিত করা হবে।
                </p>
                <button
                  type="button"
                  className="mt-2 bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700"
                >
                  এসএসএল কমার্জ দিয়ে পেমেন্ট করুন
                </button>
              </div>
            )}

            {/* Payment Summary */}
            <div className="p-4 rounded-lg border border-gray-200 bg-gray-50">
              <h4 className="font-semibold text-gray-800">পেমেন্ট সামারি</h4>
              <div className="flex justify-between mt-2">
                <span>মোট কোর্স ফি:</span>
                <span className="font-bold text-gray-800">
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

            {/* Terms & Conditions Checkbox */}
            <div className="flex items-start gap-2 pt-4">
              <input
                type="checkbox"
                required
                className="mt-1 w-4 h-4 text-gray-800 rounded border-gray-300"
              />
              <p className="text-xs text-gray-600">
                I've read and accept the{" "}
                <span className="text-yellow-600 cursor-pointer underline">
                  terms & conditions
                </span>
                ,{" "}
                <span className="text-yellow-600 cursor-pointer underline">
                  privacy policy
                </span>{" "}
                &{" "}
                <span className="text-yellow-600 cursor-pointer underline">
                  refund policy
                </span>
                .
              </p>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full bg-[#c0c0c0] hover:bg-[#b0b0b0] text-gray-800 font-bold py-3.5 rounded transition-all flex items-center justify-center gap-2 text-sm shadow-sm mt-4 ${
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
          </div>
        </form>

        {/* Security Footer Notice */}
        <div className="flex items-center justify-center gap-1.5 mt-6 text-xs text-gray-600 font-medium">
          <FaCheckCircle className="text-green-600" />
          <span>100% Secure Payments</span>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Enroll;
