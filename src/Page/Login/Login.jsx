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