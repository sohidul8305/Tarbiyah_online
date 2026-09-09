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

  // ============================================================
  // সম্পূর্ণ আপডেটেড ডিপার্টমেন্ট ও কোর্স (নতুন ফি স্ট্রাকচার)
  // ============================================================
  const departments = {
    "islamic-studies": {
      name: "Diploma in Islamic Studies",
      courses: [
        {
          id: "is1",
          name: "Diploma in Islamic Studies",
          duration: "1 Year",
          admissionFee: 0, // নির্দিষ্ট নেই, পুরো টাকা এককালীন
          monthlyFee: 0,
          totalOneTime: 12000,
          discount: 0,
          price: 12000, // প্রদর্শনের জন্য
        },
      ],
    },
    alemiyah: {
      name: "Tarbiyah Alimiyah",
      courses: [
        {
          id: "al1",
          name: "Alimiyah for Kids (Bangla Medium)",
          duration: "6 Months",
          admissionFee: 2000,
          monthlyFee: 2000,
          totalOneTime: 2000 + 2000 * 6, // 14000
          discount: 0,
          price: 14000,
        },
        {
          id: "al2",
          name: "Alimiyah for Kids (English Medium)",
          duration: "6 Months",
          admissionFee: 3000,
          monthlyFee: 3000,
          totalOneTime: 3000 + 3000 * 6, // 21000
          discount: 0,
          price: 21000,
        },
        {
          id: "al3",
          name: "Alimiyah Program (Bangla Version)",
          duration: "2 Years",
          admissionFee: 2000,
          monthlyFee: 0, // semester fee system; total one-time = admission + semester fee
          totalOneTime: 2000 + 4000, // 6000? কিন্তু আপনি লিখেছেন Semester Fee 4000 TK, ধরে নিচ্ছি পুরো কোর্সের জন্য 4000? আসলে ২ বছরে কয় সেমিস্টার? আমি ধরে নিচ্ছি পুরো কোর্সের ফি 6000
          discount: 0,
          price: 6000,
        },
        {
          id: "al4",
          name: "Alimiyah Program (English Version)",
          duration: "2 Years",
          admissionFee: 3000,
          monthlyFee: 0,
          totalOneTime: 3000 + 12000, // 15000
          discount: 0,
          price: 15000,
        },
      ],
    },
    "quran-studies": {
      name: "Tarbiyah Quran Studies",
      courses: [
        {
          id: "qs1",
          name: "Qaida Noorani (Bangla Medium)",
          duration: "2 Months",
          admissionFee: 1000,
          monthlyFee: 1000,
          totalOneTime: 1000 + 1000 * 2, // 3000
          discount: 0,
          price: 3000,
        },
        {
          id: "qs1i",
          name: "Qaida Noorani (International)",
          duration: "2 Months",
          admissionFee: 2000,
          monthlyFee: 2000,
          totalOneTime: 2000 + 2000 * 2, // 6000
          discount: 0,
          price: 6000,
        },
        {
          id: "qs2",
          name: "Nazera Quran (Bangladeshi)",
          duration: "3 Months",
          admissionFee: 1000,
          monthlyFee: 1000,
          totalOneTime: 1000 + 1000 * 3, // 4000
          discount: 0,
          price: 4000,
        },
        {
          id: "qs2i",
          name: "Nazera Quran (Expatriate)",
          duration: "3 Months",
          admissionFee: 2000,
          monthlyFee: 2000,
          totalOneTime: 2000 + 2000 * 3, // 8000
          discount: 0,
          price: 8000,
        },
        {
          id: "qs3",
          name: "Hifzul Quran",
          duration: "2 Years",
          admissionFee: 2000,
          monthlyFee: 2000,
          totalOneTime: 2000 + 2000 * 24, // 50000? কিন্তু আপনি ২০০০ মাসিক বলেছেন, ২ বছর = ২৪ মাস, তাহলে ৫০০০০ হয়। তবে আপনি হয়তো পুরো কোর্সের ফি বোঝাতে চেয়েছেন। আমি ধরে নিচ্ছি ২০০০ মাসিক + ২০০০ ভর্তি = মোট ৫০০০০ (ডিসকাউন্ট নেই)
          discount: 0,
          price: 50000,
        },
        {
          id: "qs4",
          name: "Hifz Revision (One to One) - Bangla Medium",
          duration: "6 Months",
          admissionFee: 2000,
          monthlyFee: 2000,
          totalOneTime: 2000 + 2000 * 6, // 14000
          discount: 0,
          price: 14000,
        },
        {
          id: "qs4i",
          name: "Hifz Revision (One to One) - International",
          duration: "6 Months",
          admissionFee: 2000,
          monthlyFee: 2000,
          totalOneTime: 2000 + 2000 * 6, // 14000
          discount: 0,
          price: 14000,
        },
        // নতুন: One to One (আলাদা) – যদিও Hifz Revision এর সাথে মিলে যায়, তবু আলাদা করলাম
        {
          id: "qs5",
          name: "One-to-One Program (Bangla Medium)",
          duration: "Flexible",
          admissionFee: 1000,
          monthlyFee: 5000,
          totalOneTime: 1000 + 5000 * 6, // ধরে নিচ্ছি ৬ মাসের কোর্স, 31000
          discount: 0,
          price: 31000,
        },
        {
          id: "qs5i",
          name: "One-to-One Program (International)",
          duration: "Flexible",
          admissionFee: 1000,
          monthlyFee: 5000,
          totalOneTime: 1000 + 5000 * 6,
          discount: 0,
          price: 31000,
        },
      ],
    },
    "quran-elders": {
      name: "Quran for Elders",
      courses: [
        {
          id: "qe1",
          name: "Qaida Nooraniya",
          duration: "4 Months",
          admissionFee: 1000,
          monthlyFee: 1000,
          totalOneTime: 5000, // admission 1000 + monthly 1000*4 = 5000, discount 500
          discount: 500,
          price: 4500, // after discount
        },
        {
          id: "qe2",
          name: "Quran Nazera",
          duration: "4 Months",
          admissionFee: 1000,
          monthlyFee: 1000,
          totalOneTime: 5000,
          discount: 500,
          price: 4500,
        },
        {
          id: "qe4",
          name: "Basic Tajweed (Level-1)",
          duration: "4 Months",
          admissionFee: 1000,
          monthlyFee: 1000,
          totalOneTime: 5000,
          discount: 500,
          price: 4500,
        },
        {
          id: "qe6",
          name: "Bakarah Hifz",
          duration: "6 Months",
          admissionFee: 1000,
          monthlyFee: 1000,
          totalOneTime: 6000, // 1000 + 1000*5? কিন্তু আপনি ৬ মাস বলেছেন, তাহলে 1000+6000=7000? কিন্তু আপনার দেওয়া লিস্টে এককালীন ৬০০০ ও ডিসকাউন্ট ৫০০, তাই আমি ধরে নিচ্ছি ৫ মাসের ফি + ভর্তি = ৬০০০
          discount: 500,
          price: 5500,
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

  // স্টেপ ১-এ ভ্যালিডেশন
  const handleNext = () => {
    if (step === 1) {
      if (!formData.selectedDepartment) {
        Swal.fire({
          icon: "warning",
          title: "Department Required!",
          text: "Please select a department first.",
          confirmButtonColor: "#00ADD2",
        });
        return;
      }
      if (formData.selectedCourses.length === 0) {
        Swal.fire({
          icon: "warning",
          title: "Course Required!",
          text: "Please select at least one course.",
          confirmButtonColor: "#00ADD2",
        });
        return;
      }
    }
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
        name: formData.name,
        email: formData.email,
        phone: formData.phoneNumber,
        password: "student123S@",
        course:
          selectedCourseNames.join(", ") ||
          formData.selectedDepartment ||
          "Not Specified",
        fatherName: formData.fatherName || "",
        motherName: formData.motherName || "",
        guardianName: formData.fatherName || "",
        guardianPhone: formData.guardianPhone || formData.phoneNumber,
        presentAddress: formData.presentAddress || "",
        permanentAddress: formData.permanentAddress || "",
        dobOrNid: formData.nationalId || "",
        gender: formData.gender || "",
        occupation: formData.occupation || "",
        maritalStatus: formData.maritalStatus || "",
        age: formData.age || "",
        paymentMethod: formData.paymentMethod || "",
        paymentType: formData.paymentType || "",
        transactionId: formData.transactionId || "",
        paidAmount: formData.paidAmount || "",
        paymentRemarks: formData.paymentRemarks || "",
        paymentStatus: paymentStatus,
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

  // টোটাল এককালীন পেমেন্ট (সিলেক্টেড কোর্সগুলোর totalOneTime এর যোগফল, ডিসকাউন্ট বিবেচনায়)
  const calculateTotal = () => {
    let total = 0;
    const currentCourses = getCurrentCourses();
    formData.selectedCourses.forEach((courseId) => {
      const course = currentCourses.find((c) => c.id === courseId);
      if (course) {
        // এককালীন পেমেন্ট = totalOneTime - discount (কারণ price হলো discount সহ)
        total += course.price || course.totalOneTime || 0;
      }
    });
    return total;
  };

  // সিলেক্টেড কোর্সের বিস্তারিত (পেমেন্ট টেবিলের জন্য)
  const getSelectedCourseDetails = () => {
    const currentCourses = getCurrentCourses();
    return formData.selectedCourses
      .map((courseId) => {
        const course = currentCourses.find((c) => c.id === courseId);
        return course || null;
      })
      .filter(Boolean);
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
      <Navbar />
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

        {/* Progress Steps */}
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
          {/* ========== STEP 1: COURSE SELECTION ========== */}
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
                                ৳{course.price?.toLocaleString() || 0}
                              </span>
                            </div>
                            {course.discount > 0 && (
                              <div className="text-xs text-green-600 mt-1">
                                Save ৳{course.discount} on one-time payment
                              </div>
                            )}
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
                            ৳
                            {(
                              course.price || course.totalOneTime
                            )?.toLocaleString()}
                          </span>
                          {course.discount > 0 && (
                            <span className="text-xs text-green-600 ml-2">
                              (Save ৳{course.discount})
                            </span>
                          )}
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

          {/* ========== STEP 2: PERSONAL INFO ========== */}
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

          {/* ========== STEP 3: FAMILY & ADDRESS ========== */}
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

          {/* ========== STEP 4: PAYMENT ========== */}
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

              {/* ===== ফি ডিটেইল টেবিল ===== */}
              {formData.selectedCourses.length > 0 && (
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <h4 className="font-bold text-[#00ADD2] mb-3">
                    Fee Details for Selected Courses
                  </h4>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="bg-[#e6f7f9]">
                          <th className="px-3 py-2 text-left">Course</th>
                          <th className="px-3 py-2 text-left">Duration</th>
                          <th className="px-3 py-2 text-left">Admission</th>
                          <th className="px-3 py-2 text-left">Monthly</th>
                          <th className="px-3 py-2 text-left">One-Time</th>
                          <th className="px-3 py-2 text-left">Save</th>
                        </tr>
                      </thead>
                      <tbody>
                        {getSelectedCourseDetails().map((course, idx) => (
                          <tr
                            key={idx}
                            className="border-b border-gray-200 last:border-none"
                          >
                            <td className="px-3 py-2 font-medium">
                              {course.name}
                            </td>
                            <td className="px-3 py-2">{course.duration}</td>
                            <td className="px-3 py-2">
                              ৳{course.admissionFee?.toLocaleString() || 0}
                            </td>
                            <td className="px-3 py-2">
                              ৳{course.monthlyFee?.toLocaleString() || 0}
                            </td>
                            <td className="px-3 py-2 font-bold text-[#00ADD2]">
                              ৳
                              {(
                                course.price || course.totalOneTime
                              )?.toLocaleString()}
                            </td>
                            <td className="px-3 py-2 text-green-600">
                              {course.discount > 0
                                ? `৳${course.discount}`
                                : "-"}
                            </td>
                          </tr>
                        ))}
                        <tr className="font-bold bg-gray-100">
                          <td
                            colSpan="4"
                            className="px-3 py-2 text-right"
                            style={{ color: "#00ADD2" }}
                          >
                            Total One-Time Payment:
                          </td>
                          <td
                            className="px-3 py-2 text-lg"
                            style={{ color: "#00ADD2" }}
                          >
                            ৳{calculateTotal().toLocaleString()}
                          </td>
                          <td></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    * One-Time payment includes admission + all monthly fees
                    with applicable discount.
                  </p>
                </div>
              )}

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
      <Footer />
    </div>
  );
};

export default Admission_now;
