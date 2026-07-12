import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Eye, EyeOff } from 'lucide-react';
import { Link } from 'react-router';

const Register = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-[#004d4d] mb-6 text-center">Create an Account</h2>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* First Name & Last Name */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">First Name</label>
              <input {...register("firstName", { required: true })} type="text" className="w-full mt-1 p-2 border rounded-md focus:ring-2 focus:ring-[#004d4d] outline-none" placeholder="First Name" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Last Name</label>
              <input {...register("lastName", { required: true })} type="text" className="w-full mt-1 p-2 border rounded-md focus:ring-2 focus:ring-[#004d4d] outline-none" placeholder="Last Name" />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Email Address</label>
            <input {...register("email", { required: true })} type="email" className="w-full mt-1 p-2 border rounded-md focus:ring-2 focus:ring-[#004d4d] outline-none" placeholder="yourname@example.com" />
          </div>

          {/* Password */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input {...register("password", { required: true })} type={showPass ? "text" : "password"} className="w-full mt-1 p-2 border rounded-md focus:ring-2 focus:ring-[#004d4d] outline-none" placeholder="••••••••" />
            <button type="button" className="absolute right-3 top-9 text-gray-500" onClick={() => setShowPass(!showPass)}>
              {showPass ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {/* Confirm Password */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
            <input {...register("confirmPassword", { required: true })} type={showConfirmPass ? "text" : "password"} className="w-full mt-1 p-2 border rounded-md focus:ring-2 focus:ring-[#004d4d] outline-none" placeholder="••••••••" />
            <button type="button" className="absolute right-3 top-9 text-gray-500" onClick={() => setShowConfirmPass(!showConfirmPass)}>
              {showConfirmPass ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          <button type="submit" className="w-full bg-[#004d4d] text-white py-2 rounded-md hover:bg-teal-900 transition duration-300 font-semibold mt-4">
            Register
          </button>
        </form>

        {/* Login Link */}
        <p className="text-sm text-center text-gray-600 mt-4 hover:underline">
          Already have an account? <a href="/login" className="text-[#004d4d] font-bold hover:underline"><Link className='hover:underline' to="/login"><button>Login here</button></Link></a>
        </p>
      </div>
    </div>
  );
};

export default Register;