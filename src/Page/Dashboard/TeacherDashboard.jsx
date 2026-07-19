import React from "react";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Navbar/Footer/Footer";
import { useAuth } from "../../Provider/AuthProvider";

const TeacherDashboard = () => {
  const { user } = useAuth();

  // TeacherLogin.jsx - handleSubmit ফাংশনটি এইভাবে পরিবর্তন করুন

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const result = await signInUser(email, password);
      const user = result.user;

      console.log("✅ Login successful:", user);

      // Swal দেখানোর আগেই navigate করুন
      navigate("/teacher-dashboard");

      // তারপর Swal দেখান (এটা async হবে)
      await Swal.fire({
        icon: "success",
        title: "Login Successful! 🎉",
        text: `Welcome ${user.displayName || "Teacher"}!`,
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (err) {
      // error handling
      setError(err.message);
      await Swal.fire({
        icon: "error",
        title: "Login Failed ❌",
        text: err.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <div className="flex-grow flex items-center justify-center">
        <div className="bg-white p-8 rounded-2xl shadow-xl text-center">
          <h1 className="text-3xl font-bold text-gray-800">
            👨‍🏫 Teacher Dashboard
          </h1>
          <p className="text-gray-600 mt-2">
            Welcome, {user?.displayName || "Teacher"}!
          </p>
          <p className="text-sm text-gray-500">Email: {user?.email}</p>
          <p className="text-sm text-blue-600 font-semibold">
            Role: {user?.role}
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default TeacherDashboard;
