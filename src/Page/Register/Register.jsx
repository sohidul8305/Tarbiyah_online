<<<<<<< HEAD
import React, { useContext, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import { useNavigate } from "react-router";

const Register = () => {
  const { registerUser } = useContext(AuthContext);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      setError("");
      await registerUser(email, password);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <h2>Register</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleRegister}>
        <input type="email" name="email" placeholder="Email" required />
        <input
          type="password"
          name="password"
          placeholder="Password"
          required
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
=======
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
>>>>>>> 8a244edf2be928f2d8c87acdf199ba27d8dbbae2
