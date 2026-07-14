<<<<<<< HEAD
import React, { useContext } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../../Provider/AuthProvider";

const Login = () => {
  const { signInUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    signInUser(email, password)
      .then((result) => {
        console.log("Logged In", result.user);
        navigate("/dashboard");
      })
      .catch((error) => console.error(error));
  };

  return (
    <form onSubmit={handleLogin}>
      <input type="email" name="email" placeholder="Email" required />
      <input type="password" name="password" placeholder="Password" required />
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
=======
import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { AuthContext } from '../../Provider/AuthProvider';

const Login = () => {
  const { register, handleSubmit } = useForm();
  const { signInUser, signInGoogle } = useContext(AuthContext);
  const navigate = useNavigate();

  const onSubmit = (data) => {
    signInUser(data.email, data.password)
      .then(() => navigate('/dashboard'))
      .catch(err => console.error(err));
  };

  const handleGoogleLogin = () => {
    signInGoogle()
      .then(() => navigate('/dashboard'))
      .catch(err => console.error(err));
  };

  return (
    // ... ফর্মের কোড
    <button onClick={handleGoogleLogin} className="w-full flex items-center justify-center gap-3 border py-2 rounded-md hover:bg-gray-100">
        Login with Google
    </button>
  );
};
>>>>>>> 8a244edf2be928f2d8c87acdf199ba27d8dbbae2
