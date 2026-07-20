import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Provider/AuthContext";

const Login = () => {
  const { signInUser, signInGoogle } = useAuth();
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const email = e.target.email.value.trim();
    const password = e.target.password.value.trim();

    console.log("Trying to login with:", email, password); // কনসোলে চেক করুন ঠিকঠাক পাস হচ্ছে কিনা

    try {
      const result = await signInUser(email, password);
      console.log("Login Success:", result.user);
      // ... আপনার রিডাইরেক্ট কোড
    } catch (err) {
      console.error("Firebase Login Error Code:", err.code);
      console.error("Firebase Login Error Message:", err.message);
      setError(`লগইন ব্যর্থ: ${err.message}`);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-8 border rounded-xl shadow-md bg-white">
      <h2 className="text-2xl font-bold mb-6 text-center text-[#004d4d]">
        লগইন করুন
      </h2>

      {error && (
        <p className="mb-4 text-red-500 text-sm bg-red-50 p-3 rounded">
          {error}
        </p>
      )}

      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <label className="block text-gray-700 font-medium mb-1">ইমেইল</label>
          <input
            type="email"
            name="email"
            required
            className="w-full border px-4 py-2 rounded-lg focus:outline-none focus:border-[#004d4d]"
            placeholder="example@tarabiyah.com"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            পাসওয়ার্ড
          </label>
          <input
            type="password"
            name="password"
            required
            className="w-full border px-4 py-2 rounded-lg focus:outline-none focus:border-[#004d4d]"
            placeholder="********"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-[#004d4d] text-white py-3 rounded-lg font-bold hover:bg-teal-700 transition-all"
        >
          লগইন
        </button>
      </form>
    </div>
  );
};

export default Login;
