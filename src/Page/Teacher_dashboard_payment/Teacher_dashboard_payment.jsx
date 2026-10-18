// src/Page/Teacher/Teacher_dashboard_payment.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import TeacherLayout from "./TeacherLayout";
import TeacherProfile from "../Teacher_profile/Teacher_profile";

const Teacher_dashboard_payment = () => {
  const navigate = useNavigate();
  const email =
    localStorage.getItem("teacherEmail") ||
    JSON.parse(localStorage.getItem("teacherInfo") || "{}")?.email ||
    "";

  return (
    <TeacherLayout activeMenu="payment">
      <TeacherProfile
        teacherEmail={email}
        initialTab="payment"
        onTabChange={(tab) => navigate(`/teacher-dashboard/${tab}`)}
      />
    </TeacherLayout>
  );
};

export default Teacher_dashboard_payment;
