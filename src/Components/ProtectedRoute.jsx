import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import Swal from "sweetalert2";

const ProtectedRoute = ({ children }) => {
  const isLoggedIn = localStorage.getItem("isStudentLoggedIn") === "true";

  useEffect(() => {
    if (!isLoggedIn) {
      Swal.fire({
        icon: "warning",
        title: "আপনি লগইন করেননি!",
        text: "দয়া করে প্রথমে লগইন করুন।",
        timer: 2000,
        showConfirmButton: false,
      });
    }
  }, [isLoggedIn]);

  if (!isLoggedIn) {
    return <Navigate to="/student-login" replace />;
  }

  return children;
};

export default ProtectedRoute;
