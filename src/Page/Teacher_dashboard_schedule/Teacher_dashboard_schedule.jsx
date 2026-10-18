// src/Page/Teacher/Teacher_dashboard_schedule.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import TeacherLayout from "./TeacherLayout";
import TeacherProfile from "../Teacher_profile/Teacher_profile";

const Teacher_dashboard_schedule = () => {
  const navigate = useNavigate();
  const email =
    localStorage.getItem("teacherEmail") ||
    JSON.parse(localStorage.getItem("teacherInfo") || "{}")?.email ||
    "";

  return (
    <TeacherLayout activeMenu="schedule">
      <TeacherProfile
        teacherEmail={email}
        initialTab="schedule"
        onTabChange={(tab) => navigate(`/teacher-dashboard/${tab}`)}
      />
    </TeacherLayout>
  );
};

export default Teacher_dashboard_schedule;
