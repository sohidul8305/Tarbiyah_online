// src/Components/PrivateRoute.jsx - সম্পূর্ণ ঠিক করা
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../Provider/AuthProvider";

const PrivateRoute = ({ children, role }) => {
  const { user, loading } = useAuth();

  // ✅ লোকাল স্টোরেজ থেকে স্টুডেন্ট লগইন স্ট্যাটাস চেক
  const isStudentLoggedIn =
    localStorage.getItem("isStudentLoggedIn") === "true";

  // ✅ নতুন — লোকাল স্টোরেজ থেকে predefined ADMIN লগইন চেক
  // (যেমন: elders@tarabiyah.com, boys@tarabiyah.com)
  const isAdminLoggedIn = localStorage.getItem("isAdminLoggedIn") === "true";
  const adminEmail = localStorage.getItem("adminEmail");
  const adminInfo = localStorage.getItem("adminInfo");
  const isPredefinedAdmin = isAdminLoggedIn && adminEmail && adminInfo;

  console.log("🔍 PrivateRoute Check:", {
    isStudentLoggedIn,
    isPredefinedAdmin,
    adminEmail,
    userEmail: user?.email,
    userRole: user?.role,
    requiredRole: role,
  });

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          flexDirection: "column",
          gap: "1rem",
        }}
      >
        <div className="animate-spin inline-block w-12 h-12 border-4 border-[#004d4d] border-t-transparent rounded-full"></div>
        <p className="text-gray-600 font-medium">Loading...</p>
      </div>
    );
  }

  // ✅ ১. স্টুডেন্ট লোকাল লগইন চেক
  if (role === "student" && isStudentLoggedIn) {
    console.log("✅ Student logged in via localStorage");
    return children;
  }

  // ✅ ২. নতুন — predefined ADMIN লোকাল লগইন চেক
  // (elders@tarabiyah.com, boys@tarabiyah.com ইত্যাদি)
  if (role === "admin" && isPredefinedAdmin) {
    console.log("✅ Predefined Admin logged in via localStorage:", adminEmail);
    return children;
  }

  // ✅ ৩. Firebase ইউজার লগইন নাই
  if (!user) {
    console.log("🔒 No user, redirecting to login");
    let loginRedirect = "/login";
    if (role === "student") loginRedirect = "/student-login";
    else if (role === "admin") loginRedirect = "/admin-login";
    return <Navigate to={loginRedirect} replace />;
  }

  // ✅ ৪. রোল চেক - যদি role প্রোভাইড করা থাকে
  if (role) {
    const userRole = user.role || "student";
    if (userRole !== role) {
      console.log(`❌ Role mismatch: Expected ${role}, got ${userRole}`);
      return <Navigate to="/unauthorized" replace />;
    }
  }

  // ✅ ৫. সব ঠিক থাকলে children রিটার্ন
  console.log("✅ Access granted for:", user.email);
  return children;
};

export default PrivateRoute;
