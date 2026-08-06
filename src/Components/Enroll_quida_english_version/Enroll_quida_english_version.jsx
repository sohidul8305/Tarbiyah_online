import React, { useState } from "react";
import { Link } from "react-router";
import {
  FaLock,
  FaSpinner,
  FaShieldAlt,
  FaChevronUp,
  FaChevronDown,
  FaMinus,
  FaPlus,
} from "react-icons/fa";

const Enroll_quida_english_version = () => {
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("bkash");
  const [showOrderSummary, setShowOrderSummary] = useState(true);
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedCourses, setSelectedCourses] = useState([]);

  // ডিপার্টমেন্ট ও কোর্সসমূহ
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

  // স্ক্রিনশটের সাথে মিলিয়ে ৪টি কোর্স বা আইটেম
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Tarbiyah Alimiyah Program (Bangladesh)",
      price: 3000,
      signupFee: 6000,
      quantity: 3,
      image: "https://via.placeholder.com/60",
    },
    {
      id: 2,
      name: "Tarbiyah Alimiyah Program (Overseas)",
      price: 9000,
      signupFee: 9000,
      quantity: 2,
      image: "https://via.placeholder.com/60",
    },
    {
      id: 3,
      name: "Qaida Nuraniyah Course (Bangladesh)",
      price: 2000,
      signupFee: 2000,
      quantity: 2,
      image: "https://via.placeholder.com/60",
    },
    {
      id: 4,
      name: "Tarbiyah Najera Course (Overseas)",
      price: 2000,
      signupFee: 2000,
      quantity: 1,
      image: "https://via.placeholder.com/60",
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
    return { subtotal, bkashCharge: 0, total: subtotal };
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
    if (!formData.firstName) errors.firstName = "First name is required";
    if (!formData.lastName) errors.lastName = "Last name is required";
    if (!formData.nationalId) errors.nationalId = "National ID is required";
    if (!formData.phone) errors.phone = "Phone is required";
    if (!formData.email) errors.email = "Email is required";
    if (!formData.fatherName) errors.fatherName = "Father's name is required";
    if (!formData.motherName) errors.motherName = "Mother's name is required";
    if (!formData.guardianPhone)
      errors.guardianPhone = "Guardian phone is required";
    if (!formData.presentAddress)
      errors.presentAddress = "Present address is required";
    if (!formData.permanentAddress)
      errors.permanentAddress = "Permanent address is required";
    if (!formData.paymentMethod)
      errors.paymentMethod = "Payment method is required";
    if (!formData.paidAmount) errors.paidAmount = "Paid amount is required";
    if (!formData.transactionId)
      errors.transactionId = "Transaction ID is required";
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      alert("Please fill in all required fields.");
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
          alert("Failed to initiate payment.");
          setLoading(false);
        }
      } else {
        alert(`${paymentMethod.toUpperCase()} Payment processing successful.`);
        alert("Your application has been submitted successfully!");
        setLoading(false);
      }
    } catch (error) {
      console.error("Payment Error:", error);
      alert("Payment processing failed.");
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
                      className="px-2.5 py-1 bg-gray-100 hover:bg-gray-200 text-xs cursor-pointer"
                    >
                      <FaMinus className="text-[10px]" />
                    </button>
                    <span className="px-3 text-xs font-semibold">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => handleQuantityChange(item.id, 1)}
                      className="px-2.5 py-1 bg-gray-100 hover:bg-gray-200 text-xs cursor-pointer"
                    >
                      <FaPlus className="text-[10px]" />
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
            PERSONAL INFORMATION
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-bold text-gray-600 mb-1">
                FIRST NAME *
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
              <label className="block text-[10px] font-bold text-gray-600 mb-1">
                LAST NAME *
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
              <label className="block text-[10px] font-bold text-gray-600 mb-1">
                NATIONAL ID NUMBER *
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
              <label className="block text-[10px] font-bold text-gray-600 mb-1">
                DATE OF BIRTH *
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
                <p className="text-[10px] text-gray-500 mt-1">
                  Age: {formData.age} years
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
              placeholder="PHONE *"
              className="w-full px-4 py-2.5 text-sm focus:outline-none"
            />
          </div>
          {formErrors.phone && (
            <p className="text-red-500 text-xs mt-1">{formErrors.phone}</p>
          )}

          <div>
            <label className="block text-[10px] font-bold text-gray-600 mb-1">
              EMAIL *
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
              <label className="block text-[10px] font-bold text-gray-600 mb-1">
                GENDER *
              </label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                className="w-full px-4 py-2.5 border border-gray-300 rounded text-sm bg-white focus:outline-none focus:border-teal-500"
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-[10px] font-bold text-gray-600 mb-1">
                BLOOD GROUP
              </label>
              <select
                name="bloodGroup"
                value={formData.bloodGroup}
                onChange={handleInputChange}
                className="w-full px-4 py-2.5 border border-gray-300 rounded text-sm bg-white focus:outline-none focus:border-teal-500"
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
              <label className="block text-[10px] font-bold text-gray-600 mb-1">
                RELIGION
              </label>
              <input
                type="text"
                name="religion"
                value={formData.religion}
                onChange={handleInputChange}
                placeholder="Islam"
                className="w-full px-4 py-2.5 border border-gray-300 rounded text-sm focus:outline-none focus:border-teal-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-[10px] font-bold text-gray-600 mb-1">
                EDUCATIONAL QUALIFICATION
              </label>
              <select
                name="educationalQualification"
                value={formData.educationalQualification}
                onChange={handleInputChange}
                className="w-full px-4 py-2.5 border border-gray-300 rounded text-sm bg-white focus:outline-none focus:border-teal-500"
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
              <label className="block text-[10px] font-bold text-gray-600 mb-1">
                INSTITUTE NAME
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
              <label className="block text-[10px] font-bold text-gray-600 mb-1">
                OCCUPATION
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
            <label className="block text-[10px] font-bold text-gray-600 mb-1">
              MARITAL STATUS
            </label>
            <select
              name="maritalStatus"
              value={formData.maritalStatus}
              onChange={handleInputChange}
              className="w-full px-4 py-2.5 border border-gray-300 rounded text-sm bg-white focus:outline-none focus:border-teal-500"
            >
              <option value="">Select Status</option>
              <option value="single">Single</option>
              <option value="married">Married</option>
              <option value="divorced">Divorced</option>
              <option value="widowed">Widowed</option>
            </select>
          </div>

          {/* FAMILY & ADDRESS INFORMATION */}
          <h3 className="text-sm font-bold text-blue-900 tracking-wider uppercase border-b pb-2 pt-4">
            FAMILY & ADDRESS INFORMATION
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-[10px] font-bold text-gray-600 mb-1">
                FATHER'S NAME *
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
              <label className="block text-[10px] font-bold text-gray-600 mb-1">
                MOTHER'S NAME *
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
              <label className="block text-[10px] font-bold text-gray-600 mb-1">
                GUARDIAN PHONE *
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
            <label className="block text-[10px] font-bold text-gray-600 mb-1">
              PRESENT ADDRESS *
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
            <label className="block text-[10px] font-bold text-gray-600 mb-1">
              PERMANENT ADDRESS *
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
              <option value="bangladesh">Bangladesh</option>
              <option value="india">India</option>
              <option value="pakistan">Pakistan</option>
              <option value="usa">USA</option>
              <option value="uk">UK</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* COURSE SELECTION */}
          <h3 className="text-sm font-bold text-blue-900 tracking-wider uppercase border-b pb-2 pt-4">
            DEPARTMENT & COURSE SELECTION
          </h3>

          <div>
            <label className="block text-[10px] font-bold text-gray-600 mb-1">
              SELECT DEPARTMENT *
            </label>
            <select
              name="selectedDepartment"
              value={selectedDepartment}
              onChange={handleInputChange}
              className="w-full px-4 py-2.5 border border-gray-300 rounded text-sm bg-white focus:outline-none focus:border-teal-500"
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
                      className="accent-teal-600"
                    />
                    <div className="flex-1">
                      <p className="text-xs font-medium text-gray-800">
                        {course.name}
                      </p>
                      <div className="flex justify-between">
                        <span className="text-[10px] text-gray-500">
                          Duration: {course.duration}
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
              <p className="text-xs font-bold text-teal-600 mt-1">
                Total: ৳{calculateCourseTotal().toLocaleString()}
              </p>
            </div>
          )}

          {/* Lower Order Summary Section */}
          <div className="pt-6 border-t border-gray-200">
            <h3 className="text-sm font-bold text-blue-900 tracking-wider uppercase mb-4">
              ORDER SUMMARY
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
              PAYMENT
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-[10px] font-bold text-gray-600 mb-1">
                  PAYMENT METHOD *
                </label>
                <select
                  name="paymentMethod"
                  value={formData.paymentMethod}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2.5 border ${
                    formErrors.paymentMethod
                      ? "border-red-500"
                      : "border-gray-300"
                  } rounded text-sm bg-white focus:outline-none focus:border-teal-500`}
                >
                  <option value="bkash">bKash (Merchant Pay)</option>
                  <option value="nagod">Nagod (Merchant Pay)</option>
                  <option value="rocket">Rocket</option>
                  <option value="bank">Bank Transfer</option>
                  <option value="ssl">SSL Commerz</option>
                </select>
                {formErrors.paymentMethod && (
                  <p className="text-red-500 text-xs mt-1">
                    {formErrors.paymentMethod}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-[10px] font-bold text-gray-600 mb-1">
                  PAYMENT TYPE *
                </label>
                <select
                  name="paymentType"
                  value={formData.paymentType}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded text-sm bg-white focus:outline-none focus:border-teal-500"
                >
                  <option value="online">Online Payment</option>
                  <option value="offline">Offline Payment</option>
                </select>
              </div>
            </div>

            {/* Merchant Number Display */}
            {(formData.paymentMethod === "bkash" ||
              formData.paymentMethod === "nagod") && (
              <div className="p-3 rounded-lg bg-blue-50 border border-blue-200 mb-4">
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
              <div className="p-3 rounded-lg border bg-blue-50 border-blue-200 mb-4">
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
              <div className="mb-4">
                <label className="block text-[10px] font-bold text-gray-600 mb-1">
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
                  className="w-full px-4 py-2.5 border border-gray-300 rounded text-sm focus:outline-none focus:border-teal-500"
                />
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-[10px] font-bold text-gray-600 mb-1">
                  PAID AMOUNT (৳) *
                </label>
                <input
                  type="number"
                  name="paidAmount"
                  value={formData.paidAmount}
                  onChange={handleInputChange}
                  placeholder={
                    totals.total > 0
                      ? `Total: ৳${totals.total}`
                      : "Enter amount"
                  }
                  className={`w-full px-4 py-2.5 border ${
                    formErrors.paidAmount ? "border-red-500" : "border-gray-300"
                  } rounded text-sm focus:outline-none focus:border-teal-500`}
                />
                {totals.total > 0 && (
                  <p className="text-[10px] text-gray-500 mt-0.5">
                    Total to pay: ৳{totals.total.toLocaleString()}
                  </p>
                )}
                {formErrors.paidAmount && (
                  <p className="text-red-500 text-xs mt-1">
                    {formErrors.paidAmount}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-[10px] font-bold text-gray-600 mb-1">
                  TRANSACTION ID *
                </label>
                <input
                  type="text"
                  name="transactionId"
                  value={formData.transactionId}
                  onChange={handleInputChange}
                  placeholder="Transaction ID"
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
              <label className="block text-[10px] font-bold text-gray-600 mb-1">
                PAYMENT REMARKS
              </label>
              <textarea
                name="paymentRemarks"
                value={formData.paymentRemarks}
                onChange={handleInputChange}
                rows="2"
                className="w-full px-4 py-2.5 border border-gray-300 rounded text-sm focus:outline-none focus:border-teal-500"
                placeholder="Additional payment information..."
              />
            </div>

            {/* Payment Summary */}
            <div className="p-3 rounded-lg border border-gray-200 bg-gray-50 mb-4">
              <p className="text-xs font-semibold text-gray-700">
                Payment Summary
              </p>
              <div className="flex justify-between text-xs mt-1">
                <span>Total Course Fee:</span>
                <span className="font-bold text-teal-600">
                  ৳{totals.total.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between text-xs">
                <span>Selected Department:</span>
                <span className="font-semibold">
                  {selectedDepartment
                    ? departments[selectedDepartment]?.name
                    : "-"}
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
            <div className="flex items-center gap-2 pt-2">
              <input
                type="checkbox"
                required
                className="accent-teal-600 w-4 h-4 cursor-pointer"
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
                  Processing...
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
    </div>
  );
};

export default Enroll_quida_english_version;
