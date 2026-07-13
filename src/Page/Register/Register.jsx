import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Eye, EyeOff } from 'lucide-react';
import { Link, useNavigate } from 'react-router';
import { AuthContext } from '../../Provider/AuthProvider'; // আপনার পাথ অনুযায়ী ঠিক করুন

const Register = () => {
  const { register, handleSubmit } = useForm();
  const { registerUser, updateUserProfile } = useContext(AuthContext);
  const [showPass, setShowPass] = useState(false);
  const navigate = useNavigate();

  const onSubmit = (data) => {
    registerUser(data.email, data.password)
      .then(() => {
        updateUserProfile(data.firstName + " " + data.lastName)
          .then(() => {
            alert("Registration Successful!");
            navigate('/dashboard'); // ড্যাশবোর্ডে রিডাইরেক্ট
          });
      })
      .catch(error => console.error(error));
  };

  return (
    // ... আপনার আগের JSX কোড ঠিক থাকবে, শুধু ফর্মের onSubmit={handleSubmit(onSubmit)} ঠিক আছে
    // Login link-এ <a> ট্যাগ সরিয়ে শুধু <Link> ব্যবহার করুন
    <p className="text-sm text-center text-gray-600 mt-4">
      Already have an account? <Link to="/login" className="text-[#004d4d] font-bold hover:underline">Login here</Link>
    </p>
  );
};