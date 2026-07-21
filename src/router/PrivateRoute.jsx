// PrivateRoute.jsx - সম্পূর্ণ ঠিক করা
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../Provider/AuthProvider";

const PrivateRoute = ({ children, role }) => {
  const { user, loading } = useAuth();

  // লোকাল স্টোরেজ থেকে স্টুডেন্ট লগইন স্ট্যাটাস চেক
  const isStudentLoggedIn =
    localStorage.getItem("isStudentLoggedIn") === "true";

  console.log("🔍 PrivateRoute Check:", {
    isStudentLoggedIn,
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

  // ✅ ২. ইউজার লগইন নাই
  if (!user) {
    console.log("🔒 No user, redirecting to login");
    const loginRedirect = role === "student" ? "/student-login" : "/login";
    return <Navigate to={loginRedirect} replace />;
  }

  // ✅ ৩. রোল চেক - যদি role প্রোভাইড করা থাকে
  if (role) {
    const userRole = user.role || "student";
    if (userRole !== role) {
      console.log(`❌ Role mismatch: Expected ${role}, got ${userRole}`);
      return <Navigate to="/unauthorized" replace />;
    }
  }

  // ✅ ৪. সব ঠিক থাকলে children রিটার্ন
  console.log("✅ Access granted for:", user.email);
  return children;
};

export default PrivateRoute;
