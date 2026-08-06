import React, { useState } from "react";
import { Link } from "react-router";
import {
  FaArrowLeft,
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
  FaTag,
  FaArrowRight,
  FaUserPlus,
  FaBook,
  FaGraduationCap,
  FaMapMarkerAlt,
  FaCity,
  FaGlobe,
  FaTruck,
  FaChevronUp,
  FaChevronDown,
} from "react-icons/fa";
import Footer from "../Navbar/Footer/Footer";
import Navbar from "../Navbar/Navbar";

const QuidaEnroll = () => {
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("bkash");
  const [createAccount, setCreateAccount] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const [showOrderSummary, setShowOrderSummary] = useState(true);
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

  // স্ক্রিনশটে থাকা হুবহু ৩টি আইটেম/কোর্স
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Tarbiyah Alimiyah Program (Bangladesh)",
      price: 3000,
      signupFee: 6000,
      quantity: 3,
      image: "https://i.ibb.co.com/7xnC6p7d/banner-2.jpg",
    },
    {
      id: 2,
      name: "Tarbiyah Alimiyah Program (Overseas)",
      price: 9000,
      signupFee: 9000,
      quantity: 3,
      image: "https://i.ibb.co.com/7xnC6p7d/banner-2.jpg",
    },
    {
      id: 3,
      name: "Qaida Nuraniyah Course (Bangladesh)",
      price: 1000,
      signupFee: 1000,
      quantity: 1,
      image:
        "https://i.ibb.co.com/MTCtR32/E0-A6-86-E0-A6-B2-E0-A6-BF-E0-A6-AE-E0-A6-BF-E0-A6-AF-E0-A6-BC-E0-A7-8-D-E0-A6-AF-E0-A6-BE-E0-A6-B9.jpg",
    },
  ]);

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
  });
  const [formErrors, setFormErrors] = useState({});

  // মোট হিসাব
  const calculateTotals = () => {
    let subtotal = cartItems.reduce(
      (acc, item) => acc + (item.price * item.quantity + item.signupFee),
      0,
    );
    let recurringTotal = cartItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0,
    );
    return { subtotal, recurringTotal, bkashCharge: 0, total: subtotal };
  };

  const totals = calculateTotals();

  const calculateCourseTotal = () => {
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

  const handleQuantityChange = (id, delta) => {
    setCartItems(
      cartItems.map((item) => {
        if (item.id === id) {
          const newQty = item.quantity + delta;
          return { ...item, quantity: newQty > 0 ? newQty : 1 };
        }
        return item;
      }),
    );
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.firstName) errors.firstName = "প্রথম নাম প্রয়োজন";
    if (!formData.lastName) errors.lastName = "শেষ নাম প্রয়োজন";
    if (!formData.nationalId)
      errors.nationalId = "জাতীয় পরিচয় পত্র নম্বর প্রয়োজন";
    if (!formData.phone) errors.phone = "ফোন নম্বর প্রয়োজন";
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
    return errors;
  };

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
        amount: totals.total,
        currency: "BDT",
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
        alert(
          `${paymentMethod.toUpperCase()} পেমেন্ট প্রক্রিয়াকরণ সফল হয়েছে।`,
        );
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

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8 font-sans">
      <Navbar />
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-sm border border-gray-200 p-6 md:p-10">
        {/* Top Toggleable Order Summary Bar */}
        <div className="border border-gray-200 rounded-lg p-4 mb-8 flex justify-between items-center bg-white shadow-xs">
          <button
            onClick={() => setShowOrderSummary(!showOrderSummary)}
            className="text-sm font-semibold text-gray-700 flex items-center gap-2 hover:text-teal-600 cursor-pointer"
          >
            <span>
              {showOrderSummary
                ? "▲ Hide Enrolment Summary"
                : "▼ Show Enrolment Summary"}
            </span>
          </button>
          <span className="text-lg font-bold text-gray-900">
            ৳ {totals.total.toLocaleString()}
          </span>
        </div>

        {/* Collapsible Items List */}
        {showOrderSummary && (
          <div className="mb-8 border-b border-gray-200 pb-6 space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 py-3 border-b border-gray-100 last:border-0"
              >
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-12 h-12 object-cover rounded border"
                    />
                    <span className="absolute -top-2 -left-2 bg-gray-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                      {item.id}
                    </span>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-gray-800">
                      {item.name} × {item.quantity}
                    </h4>
                    <p className="text-xs text-gray-500">
                      ৳ {item.price.toLocaleString()} / month and a ৳{" "}
                      {item.signupFee.toLocaleString()} sign-up fee
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-between w-full sm:w-auto gap-4">
                  <div className="flex items-center border rounded overflow-hidden">
                    <button
                      onClick={() => handleQuantityChange(item.id, -1)}
                      className="px-2.5 py-1 bg-gray-100 hover:bg-gray-200 text-xs"
                    >
                      -
                    </button>
                    <span className="px-3 text-xs font-semibold">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => handleQuantityChange(item.id, 1)}
                      className="px-2.5 py-1 bg-gray-100 hover:bg-gray-200 text-xs"
                    >
                      +
                    </button>
                  </div>
                  <span className="font-semibold text-sm text-gray-800">
                    ৳{" "}
                    {(
                      item.price * item.quantity +
                      item.signupFee
                    ).toLocaleString()}
                  </span>
                </div>
              </div>
            ))}

            <div className="text-xs text-teal-600 font-medium cursor-pointer mt-2">
              Have a coupon? Click here to enter your code
            </div>

            <div className="space-y-2 pt-4 text-sm text-gray-700">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-semibold">
                  ৳ {totals.subtotal.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span>bKash Charge</span>
                <span className="text-green-600 font-semibold">
                  ৳ {totals.bkashCharge}
                </span>
              </div>
              <div className="flex justify-between text-base font-bold text-gray-900 border-t pt-3">
                <span>Total</span>
                <span className="text-teal-700">
                  ৳ {totals.total.toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        )}

        <div className="text-xs text-gray-600 mb-6">
          Returning customer?{" "}
          <span className="text-teal-600 font-semibold cursor-pointer">
            Click here to login
          </span>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* PERSONAL INFORMATION */}
          <h3 className="text-sm font-bold text-blue-900 tracking-wider uppercase border-b pb-2">
            ব্যক্তিগত তথ্য
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-600 mb-1">
                প্রথম নাম *
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                className={`w-full px-4 py-2.5 border ${
                  formErrors.firstName ? "border-red-500" : "border-gray-300"
                } rounded text-sm focus:outline-none focus:border-teal-500`}
              />
              {formErrors.firstName && (
                <p className="text-red-500 text-xs mt-1">
                  {formErrors.firstName}
                </p>
              )}
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-600 mb-1">
                শেষ নাম *
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                className={`w-full px-4 py-2.5 border ${
                  formErrors.lastName ? "border-red-500" : "border-gray-300"
                } rounded text-sm focus:outline-none focus:border-teal-500`}
              />
              {formErrors.lastName && (
                <p className="text-red-500 text-xs mt-1">
                  {formErrors.lastName}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-600 mb-1">
                জাতীয় পরিচয় পত্র নম্বর *
              </label>
              <input
                type="text"
                name="nationalId"
                value={formData.nationalId}
                onChange={handleInputChange}
                className={`w-full px-4 py-2.5 border ${
                  formErrors.nationalId ? "border-red-500" : "border-gray-300"
                } rounded text-sm focus:outline-none focus:border-teal-500`}
              />
              {formErrors.nationalId && (
                <p className="text-red-500 text-xs mt-1">
                  {formErrors.nationalId}
                </p>
              )}
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-600 mb-1">
                জন্ম তারিখ *
              </label>
              <input
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleInputChange}
                className={`w-full px-4 py-2.5 border ${
                  formErrors.dateOfBirth ? "border-red-500" : "border-gray-300"
                } rounded text-sm focus:outline-none focus:border-teal-500`}
              />
              {formData.age && (
                <p className="text-xs text-gray-500 mt-1">
                  বয়স: {formData.age} বছর
                </p>
              )}
            </div>
          </div>

          <div className="flex border border-gray-300 rounded overflow-hidden">
            <div className="flex items-center bg-gray-50 px-3 border-r border-gray-300 text-sm gap-1 text-gray-600">
              <span>🇧🇩</span>
              <span>+880</span>
            </div>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="মোবাইল নম্বর *"
              className="w-full px-4 py-2.5 text-sm focus:outline-none"
            />
          </div>
          {formErrors.phone && (
            <p className="text-red-500 text-xs mt-1">{formErrors.phone}</p>
          )}

          <div>
            <label className="block text-xs font-bold text-gray-600 mb-1">
              ইমেইল *
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className={`w-full px-4 py-2.5 border ${
                formErrors.email ? "border-red-500" : "border-gray-300"
              } rounded text-sm focus:outline-none focus:border-teal-500`}
            />
            {formErrors.email && (
              <p className="text-red-500 text-xs mt-1">{formErrors.email}</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-600 mb-1">
                লিঙ্গ *
              </label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                className="w-full px-4 py-2.5 border border-gray-300 rounded text-sm bg-white focus:outline-none focus:border-teal-500"
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
                className="w-full px-4 py-2.5 border border-gray-300 rounded text-sm bg-white focus:outline-none focus:border-teal-500"
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
                className="w-full px-4 py-2.5 border border-gray-300 rounded text-sm focus:outline-none focus:border-teal-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-600 mb-1">
                শিক্ষাগত যোগ্যতা
              </label>
              <select
                name="educationalQualification"
                value={formData.educationalQualification}
                onChange={handleInputChange}
                className="w-full px-4 py-2.5 border border-gray-300 rounded text-sm bg-white focus:outline-none focus:border-teal-500"
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
                className="w-full px-4 py-2.5 border border-gray-300 rounded text-sm focus:outline-none focus:border-teal-500"
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
                className="w-full px-4 py-2.5 border border-gray-300 rounded text-sm focus:outline-none focus:border-teal-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-600 mb-1">
              বৈবাহিক অবস্থা
            </label>
            <select
              name="maritalStatus"
              value={formData.maritalStatus}
              onChange={handleInputChange}
              className="w-full px-4 py-2.5 border border-gray-300 rounded text-sm bg-white focus:outline-none focus:border-teal-500"
            >
              <option value="">নির্বাচন করুন</option>
              <option value="single">অবিবাহিত</option>
              <option value="married">বিবাহিত</option>
              <option value="divorced">তালাকপ্রাপ্ত</option>
              <option value="widowed">বিধবা/বিধুর</option>
            </select>
          </div>

          {/* FAMILY & ADDRESS INFORMATION */}
          <h3 className="text-sm font-bold text-blue-900 tracking-wider uppercase border-b pb-2 pt-4">
            পরিবার ও ঠিকানার তথ্য
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-600 mb-1">
                পিতার নাম *
              </label>
              <input
                type="text"
                name="fatherName"
                value={formData.fatherName}
                onChange={handleInputChange}
                className={`w-full px-4 py-2.5 border ${
                  formErrors.fatherName ? "border-red-500" : "border-gray-300"
                } rounded text-sm focus:outline-none focus:border-teal-500`}
              />
              {formErrors.fatherName && (
                <p className="text-red-500 text-xs mt-1">
                  {formErrors.fatherName}
                </p>
              )}
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-600 mb-1">
                মাতার নাম *
              </label>
              <input
                type="text"
                name="motherName"
                value={formData.motherName}
                onChange={handleInputChange}
                className={`w-full px-4 py-2.5 border ${
                  formErrors.motherName ? "border-red-500" : "border-gray-300"
                } rounded text-sm focus:outline-none focus:border-teal-500`}
              />
              {formErrors.motherName && (
                <p className="text-red-500 text-xs mt-1">
                  {formErrors.motherName}
                </p>
              )}
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-600 mb-1">
                গার্ডিয়ানের মোবাইল নম্বর *
              </label>
              <input
                type="tel"
                name="guardianPhone"
                value={formData.guardianPhone}
                onChange={handleInputChange}
                className={`w-full px-4 py-2.5 border ${
                  formErrors.guardianPhone
                    ? "border-red-500"
                    : "border-gray-300"
                } rounded text-sm focus:outline-none focus:border-teal-500`}
              />
              {formErrors.guardianPhone && (
                <p className="text-red-500 text-xs mt-1">
                  {formErrors.guardianPhone}
                </p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-600 mb-1">
              বর্তমান ঠিকানা *
            </label>
            <textarea
              name="presentAddress"
              value={formData.presentAddress}
              onChange={handleInputChange}
              rows="2"
              className={`w-full px-4 py-2.5 border ${
                formErrors.presentAddress ? "border-red-500" : "border-gray-300"
              } rounded text-sm focus:outline-none focus:border-teal-500`}
            />
            {formErrors.presentAddress && (
              <p className="text-red-500 text-xs mt-1">
                {formErrors.presentAddress}
              </p>
            )}
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-600 mb-1">
              স্থায়ী ঠিকানা *
            </label>
            <textarea
              name="permanentAddress"
              value={formData.permanentAddress}
              onChange={handleInputChange}
              rows="2"
              className={`w-full px-4 py-2.5 border ${
                formErrors.permanentAddress
                  ? "border-red-500"
                  : "border-gray-300"
              } rounded text-sm focus:outline-none focus:border-teal-500`}
            />
            {formErrors.permanentAddress && (
              <p className="text-red-500 text-xs mt-1">
                {formErrors.permanentAddress}
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              type="text"
              name="townCity"
              value={formData.townCity}
              onChange={handleInputChange}
              placeholder="TOWN / CITY"
              className="w-full px-4 py-2.5 border border-gray-300 rounded text-sm focus:outline-none focus:border-teal-500"
            />
            <input
              type="text"
              name="postcode"
              value={formData.postcode}
              onChange={handleInputChange}
              placeholder="POSTCODE"
              className="w-full px-4 py-2.5 border border-gray-300 rounded text-sm focus:outline-none focus:border-teal-500"
            />
            <select
              name="country"
              value={formData.country}
              onChange={handleInputChange}
              className="w-full px-4 py-2.5 border border-gray-300 rounded text-sm bg-white focus:outline-none focus:border-teal-500"
            >
              <option value="bangladesh">বাংলাদেশ</option>
              <option value="india">ভারত</option>
              <option value="pakistan">পাকিস্তান</option>
              <option value="other">অন্যান্য</option>
            </select>
          </div>

          {/* COURSE SELECTION */}
          <h3 className="text-sm font-bold text-blue-900 tracking-wider uppercase border-b pb-2 pt-4">
            ডিপার্টমেন্ট ও কোর্স নির্বাচন
          </h3>

          <div>
            <label className="block text-xs font-bold text-gray-600 mb-1">
              ডিপার্টমেন্ট নির্বাচন করুন *
            </label>
            <select
              name="selectedDepartment"
              value={selectedDepartment}
              onChange={handleInputChange}
              className="w-full px-4 py-2.5 border border-gray-300 rounded text-sm bg-white focus:outline-none focus:border-teal-500"
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
                      className="accent-teal-600"
                    />
                    <div className="flex-1">
                      <p className="text-xs font-medium text-gray-800">
                        {course.name}
                      </p>
                      <div className="flex justify-between">
                        <span className="text-[10px] text-gray-500">
                          মেয়াদ: {course.duration}
                        </span>
                        <span className="text-xs font-semibold text-teal-600">
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
              <p className="text-xs font-bold text-teal-600 mt-1">
                মোট মূল্য: ৳{calculateCourseTotal().toLocaleString()}
              </p>
            </div>
          )}

          {/* Lower Order Summary Section */}
          <div className="pt-6 border-t border-gray-200">
            <h3 className="text-sm font-bold text-blue-900 tracking-wider uppercase mb-4">
              Order Summary
            </h3>
            <div className="text-xs text-teal-600 mb-4 cursor-pointer">
              Have a coupon? Click here to enter your code
            </div>

            <div className="space-y-3 text-sm border-b pb-4">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center text-xs text-gray-600"
                >
                  <span>{item.name}</span>
                  <span className="font-semibold text-gray-800">
                    ৳ {item.price.toLocaleString()} / month and a ৳{" "}
                    {item.signupFee.toLocaleString()} sign-up fee
                  </span>
                </div>
              ))}
            </div>

            <div className="space-y-2 py-4 text-sm border-b">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-semibold">
                  ৳ {totals.subtotal.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">bKash Charge</span>
                <span className="text-teal-600 font-semibold">
                  ৳ {totals.bkashCharge}
                </span>
              </div>
              <div className="flex justify-between font-bold text-base pt-2">
                <span>Total</span>
                <span className="text-teal-700">
                  ৳ {totals.total.toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          {/* PAYMENT SECTION */}
          <div className="pt-4">
            <h3 className="text-sm font-bold text-blue-900 tracking-wider uppercase mb-1">
              Payment
            </h3>
            <p className="text-[11px] text-gray-400 mb-4 flex items-center gap-1">
              <FaShieldAlt className="text-green-500" /> ALL TRANSACTIONS ARE
              SECURE AND ENCRYPTED.
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

            <div className="space-y-3">
              <label className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                <input
                  type="radio"
                  name="payment"
                  value="bkash"
                  checked={paymentMethod === "bkash"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="accent-teal-600"
                />
                <span className="text-xs font-semibold text-gray-700 flex-1">
                  Direct bKash Payment Automatic
                </span>
              </label>

              <label className="flex items-center justify-between p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="payment"
                    value="sslcommerz"
                    checked={paymentMethod === "sslcommerz"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="accent-teal-600"
                  />
                  <span className="text-xs font-semibold text-gray-700">
                    Pay Online(Credit/Debit Card/MobileBanking/NetBanking/bkash)
                  </span>
                </div>
                <span className="text-[10px] bg-blue-900 text-white px-1.5 py-0.5 rounded font-bold">
                  SSLCOMMERZ
                </span>
              </label>

              <label className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                <input
                  type="radio"
                  name="payment"
                  value="bank"
                  checked={paymentMethod === "bank"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="accent-teal-600"
                />
                <span className="text-xs font-semibold text-gray-700 flex-1">
                  Bank Payment
                </span>
              </label>
            </div>

            {/* Merchant Number Display */}
            {(paymentMethod === "bkash" || paymentMethod === "nagod") && (
              <div className="p-3 rounded-lg bg-blue-50 border border-blue-200 mt-4">
                <p className="text-xs font-medium">
                  📌 {paymentMethod === "bkash" ? "বিকাশ" : "নগদ"} মার্চেন্ট
                  নম্বর:
                  <span className="font-bold ml-1 text-gray-800">
                    {paymentMethod === "bkash" ? "01841412525" : "01841512525"}
                  </span>
                </p>
                <p className="text-[10px] text-red-600 mt-0.5">
                  ⚠️ শুধুমাত্র "মার্চেন্ট পে" অপশনে পেমেন্ট করুন।
                </p>
              </div>
            )}

            {/* Bank Information */}
            {paymentMethod === "bank" && (
              <div className="p-3 rounded-lg border bg-blue-50 border-blue-200 mt-4">
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

            {(paymentMethod === "bkash" ||
              paymentMethod === "nagod" ||
              paymentMethod === "rocket") && (
              <div className="mt-4">
                <label className="block text-xs font-bold text-gray-600 mb-1">
                  {paymentMethod === "bkash"
                    ? "বিকাশ"
                    : paymentMethod === "nagod"
                      ? "নগদ"
                      : "রকেট"}{" "}
                  নম্বর (আপনার) *
                </label>
                <input
                  type="text"
                  name={
                    paymentMethod === "bkash"
                      ? "bkashNumber"
                      : paymentMethod === "nagod"
                        ? "nagodNumber"
                        : "rocketNumber"
                  }
                  value={
                    paymentMethod === "bkash"
                      ? formData.bkashNumber
                      : paymentMethod === "nagod"
                        ? formData.nagodNumber
                        : formData.rocketNumber
                  }
                  onChange={handleInputChange}
                  placeholder="01xxxxxxxxx"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded text-sm focus:outline-none focus:border-teal-500"
                />
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
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
                    totals.total > 0 ? `মোট: ৳${totals.total}` : "টাকা লিখুন"
                  }
                  className={`w-full px-4 py-2.5 border ${
                    formErrors.paidAmount ? "border-red-500" : "border-gray-300"
                  } rounded text-sm focus:outline-none focus:border-teal-500`}
                />
                {totals.total > 0 && (
                  <p className="text-[10px] text-gray-500 mt-0.5">
                    মোট দিতে হবে: ৳{totals.total.toLocaleString()}
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
                  className={`w-full px-4 py-2.5 border ${
                    formErrors.transactionId
                      ? "border-red-500"
                      : "border-gray-300"
                  } rounded text-sm focus:outline-none focus:border-teal-500`}
                />
                {formErrors.transactionId && (
                  <p className="text-red-500 text-xs mt-1">
                    {formErrors.transactionId}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-600 mb-1">
                পেমেন্ট রিমার্কস
              </label>
              <textarea
                name="paymentRemarks"
                value={formData.paymentRemarks}
                onChange={handleInputChange}
                rows="2"
                className="w-full px-4 py-2.5 border border-gray-300 rounded text-sm focus:outline-none focus:border-teal-500"
                placeholder="অতিরিক্ত পেমেন্ট তথ্য..."
              />
            </div>

            {/* Payment Summary */}
            <div className="p-3 rounded-lg border border-gray-200 bg-gray-50 mt-4">
              <p className="text-xs font-semibold text-gray-700">
                পেমেন্ট সামারি
              </p>
              <div className="flex justify-between text-xs mt-1">
                <span>মোট কোর্স ফি:</span>
                <span className="font-bold text-teal-600">
                  ৳{totals.total.toLocaleString()}
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
                  {paymentMethod === "bkash"
                    ? "বিকাশ"
                    : paymentMethod === "nagod"
                      ? "নগদ"
                      : paymentMethod === "rocket"
                        ? "রকেট"
                        : paymentMethod === "bank"
                          ? "ব্যাংক"
                          : paymentMethod === "sslcommerz"
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
            <div className="flex items-center gap-2 pt-4">
              <input
                type="checkbox"
                required
                className="accent-teal-600 w-4 h-4"
              />
              <span className="text-xs text-gray-600">
                I've read and accept the{" "}
                <span className="text-teal-600 underline cursor-pointer">
                  terms & conditions
                </span>
                ,{" "}
                <span className="text-teal-600 underline cursor-pointer">
                  privacy policy
                </span>{" "}
                &{" "}
                <span className="text-teal-600 underline cursor-pointer">
                  refund policy
                </span>
                .
              </span>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-3.5 rounded transition-all flex items-center justify-center gap-2 text-sm shadow-inner cursor-pointer mt-4"
            >
              {loading ? (
                <>
                  <FaSpinner className="animate-spin" />
                  প্রক্রিয়াকরণ...
                </>
              ) : (
                <>
                  <FaLock className="text-xs" />
                  <span>Enroll Now ৳ {totals.total.toLocaleString()}</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default QuidaEnroll;
