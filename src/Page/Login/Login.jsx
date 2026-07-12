import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Eye, EyeOff } from 'lucide-react';

const Login = () => {
  const { register, handleSubmit } = useForm();
  const [showPass, setShowPass] = useState(false);

  const onSubmit = (data) => {
    console.log("Login Data:", data);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-[#004d4d] mb-6 text-center">Login to your Account</h2>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Email Address</label>
            <input 
              {...register("email", { required: true })} 
              type="email" 
              className="w-full mt-1 p-2 border rounded-md focus:ring-2 focus:ring-[#004d4d] outline-none" 
              placeholder="yourname@example.com" 
              required
            />
          </div>

          {/* Password */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input 
              {...register("password", { required: true })}
              type={showPass ? "text" : "password"} 
              className="w-full mt-1 p-2 border rounded-md focus:ring-2 focus:ring-[#004d4d] outline-none" 
              placeholder="••••••••" 
              required
            />
            <button type="button" className="absolute right-3 top-9 text-gray-500" onClick={() => setShowPass(!showPass)}>
              {showPass ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {/* Submit Button */}
          <button type="submit" className="w-full bg-[#004d4d] text-white py-2 rounded-md hover:bg-teal-900 transition duration-300 font-semibold mt-4">
            Login
          </button>
        </form>

        {/* Divider */}
        <div className="my-6 flex items-center justify-center gap-2 text-gray-500 text-sm">
          <hr className="w-full" /> <span>OR</span> <hr className="w-full" />
        </div>

        {/* Google Login */}
        <button className="w-full flex items-center justify-center gap-3 border py-2 rounded-md hover:bg-gray-100 transition duration-300">
          <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-5 h-5" />
          <span className="font-semibold text-gray-700">Login with Google</span>
        </button>

        {/* Register Link */}
        <p className="text-sm text-center text-gray-600 mt-6">
          Don't have an account? <a href="/register" className="text-[#004d4d] font-bold hover:underline">Register here</a>
        </p>
      </div>
    </div>
  );
};

export default Login;