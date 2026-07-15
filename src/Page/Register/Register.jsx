import React, { useContext, useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { Eye, EyeOff, Upload, X, User, Camera } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Provider/AuthProvider";
import Swal from "sweetalert2";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const authContext = useContext(AuthContext);
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const password = watch("password");

  if (!authContext) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin inline-block w-12 h-12 border-4 border-[#004d4d] border-t-transparent rounded-full"></div>
          <p className="mt-4 text-gray-600 font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  const { registerUser, updateUserProfile } = authContext;

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        Swal.fire({
          icon: "error",
          title: "Invalid File",
          text: "Please upload an image file (JPG, PNG, GIF)",
        });
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        Swal.fire({
          icon: "error",
          title: "File Too Large",
          text: "Image size should be less than 5MB",
        });
        return;
      }

      setProfileImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setProfileImage(null);
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const getImageBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const result = await registerUser(data.email, data.password);

      let photoURL = "";
      if (profileImage) {
        try {
          photoURL = await getImageBase64(profileImage);
        } catch (error) {
          console.error("Image upload error:", error);
        }
      }

      const fullName = data.firstName + " " + data.lastName;
      await updateUserProfile(fullName, photoURL);

      await Swal.fire({
        icon: "success",
        title: "Registration Successful! 🎉",
        text: `Welcome ${data.firstName}! Your account has been created.`,
        timer: 2000,
        showConfirmButton: true,
        confirmButtonColor: "#004d4d",
      });

      navigate("/");
    } catch (error) {
      console.error("Registration error:", error);
      let errorMessage = "Registration failed. Please try again.";

      if (error.code === "auth/email-already-in-use") {
        errorMessage = "This email is already registered. Please login.";
      } else if (error.code === "auth/weak-password") {
        errorMessage =
          "Password is too weak. Use at least 6 characters with letters and numbers.";
      } else if (error.code === "auth/invalid-email") {
        errorMessage = "Invalid email format. Please enter a valid email.";
      } else if (error.code === "auth/network-request-failed") {
        errorMessage = "Network error. Please check your internet connection.";
      }

      await Swal.fire({
        icon: "error",
        title: "Registration Failed",
        text: errorMessage,
        confirmButtonColor: "#004d4d",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Main Content - Flex Grow to push footer down */}
      <div className="flex-grow flex items-center justify-center py-8 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md">
          <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-xl">
            {/* Header */}
            <div className="text-center">
              <div className="mx-auto h-12 w-12 bg-[#004d4d] rounded-full flex items-center justify-center">
                <User className="h-6 w-6 text-white" />
              </div>
              <h2 className="mt-4 text-2xl sm:text-3xl font-extrabold text-gray-900">
                Create Account
              </h2>
              <p className="mt-2 text-sm text-gray-600">
                Join us and start learning today!
              </p>
              <p className="mt-1 text-sm text-gray-600">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="font-medium text-[#004d4d] hover:text-[#003d3d] transition-colors"
                >
                  Sign in
                </Link>
              </p>
            </div>

            <form className="mt-6 space-y-5" onSubmit={handleSubmit(onSubmit)}>
              {/* Profile Image Upload */}
              <div className="flex flex-col items-center">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Profile Photo
                </label>
                <div className="relative group">
                  {imagePreview ? (
                    <div className="relative">
                      <img
                        src={imagePreview}
                        alt="Profile preview"
                        className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover border-4 border-[#004d4d] shadow-lg"
                      />
                      <button
                        type="button"
                        onClick={removeImage}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1.5 hover:bg-red-600 transition-colors shadow-lg hover:scale-110 transform"
                      >
                        <X className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="absolute bottom-0 right-0 bg-[#004d4d] text-white rounded-full p-2 hover:bg-[#003d3d] transition-colors shadow-lg hover:scale-110 transform"
                      >
                        <Camera className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <div
                      onClick={() => fileInputRef.current?.click()}
                      className="w-24 h-24 sm:w-28 sm:h-28 rounded-full border-4 border-dashed border-gray-300 flex flex-col items-center justify-center cursor-pointer hover:border-[#004d4d] transition-all hover:bg-gray-50 group bg-gray-50"
                    >
                      <Upload className="w-8 h-8 text-gray-400 group-hover:text-[#004d4d] transition-colors" />
                      <span className="text-xs text-gray-500 mt-1 group-hover:text-[#004d4d]">
                        Upload
                      </span>
                    </div>
                  )}
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleImageUpload}
                    accept="image/*"
                    className="hidden"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  JPG, PNG, GIF • Max 5MB
                </p>
              </div>

              {/* Form Fields */}
              <div className="space-y-3">
                <div>
                  <input
                    {...register("firstName", {
                      required: "First name is required",
                      minLength: {
                        value: 2,
                        message: "First name must be at least 2 characters",
                      },
                    })}
                    id="firstName"
                    name="firstName"
                    type="text"
                    autoComplete="given-name"
                    className="appearance-none relative block w-full px-3 py-2.5 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-[#004d4d] focus:border-[#004d4d] sm:text-sm"
                    placeholder="First Name *"
                  />
                  {errors.firstName && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.firstName.message}
                    </p>
                  )}
                </div>

                <div>
                  <input
                    {...register("lastName", {
                      required: "Last name is required",
                      minLength: {
                        value: 2,
                        message: "Last name must be at least 2 characters",
                      },
                    })}
                    id="lastName"
                    name="lastName"
                    type="text"
                    autoComplete="family-name"
                    className="appearance-none relative block w-full px-3 py-2.5 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-[#004d4d] focus:border-[#004d4d] sm:text-sm"
                    placeholder="Last Name *"
                  />
                  {errors.lastName && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.lastName.message}
                    </p>
                  )}
                </div>

                <div>
                  <input
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Please enter a valid email address",
                      },
                    })}
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    className="appearance-none relative block w-full px-3 py-2.5 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-[#004d4d] focus:border-[#004d4d] sm:text-sm"
                    placeholder="Email address *"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div className="relative">
                  <input
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 6,
                        message: "Password must be at least 6 characters",
                      },
                      pattern: {
                        value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
                        message:
                          "Password must contain uppercase, lowercase and number",
                      },
                    })}
                    id="password"
                    name="password"
                    type={showPass ? "text" : "password"}
                    autoComplete="new-password"
                    className="appearance-none relative block w-full px-3 py-2.5 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-[#004d4d] focus:border-[#004d4d] sm:text-sm"
                    placeholder="Password (min 6 characters) *"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass(!showPass)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    {showPass ? (
                      <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                    )}
                  </button>
                  {errors.password && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.password.message}
                    </p>
                  )}
                </div>

                <div className="relative">
                  <input
                    {...register("confirmPassword", {
                      required: "Please confirm your password",
                      validate: (value) =>
                        value === password || "Passwords do not match",
                    })}
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPass ? "text" : "password"}
                    autoComplete="new-password"
                    className="appearance-none relative block w-full px-3 py-2.5 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-[#004d4d] focus:border-[#004d4d] sm:text-sm"
                    placeholder="Confirm Password *"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPass(!showConfirmPass)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    {showConfirmPass ? (
                      <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                    )}
                  </button>
                  {errors.confirmPassword && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.confirmPassword.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Terms and Conditions */}
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    {...register("terms", {
                      required: "You must accept the terms and conditions",
                    })}
                    id="terms"
                    name="terms"
                    type="checkbox"
                    className="h-4 w-4 text-[#004d4d] focus:ring-[#004d4d] border-gray-300 rounded mt-0.5"
                  />
                </div>
                <label
                  htmlFor="terms"
                  className="ml-2 block text-sm text-gray-700"
                >
                  I agree to the{" "}
                  <a
                    href="#"
                    className="font-medium text-[#004d4d] hover:text-[#003d3d]"
                  >
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a
                    href="#"
                    className="font-medium text-[#004d4d] hover:text-[#003d3d]"
                  >
                    Privacy Policy
                  </a>
                </label>
              </div>
              {errors.terms && (
                <p className="text-red-500 text-xs">{errors.terms.message}</p>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-2.5 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#004d4d] hover:bg-[#003d3d] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#004d4d] disabled:opacity-50 disabled:cursor-not-allowed transition duration-150"
              >
                {loading ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Creating Account...
                  </>
                ) : (
                  "Create Account"
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">
                    Already have an account?
                  </span>
                </div>
              </div>

              <div className="mt-4">
                <Link
                  to="/login"
                  className="w-full flex items-center justify-center gap-2 border-2 border-[#004d4d] py-2 px-4 rounded-md hover:bg-[#004d4d] hover:text-white transition-colors duration-200 text-[#004d4d] font-medium"
                >
                  <User className="w-4 h-4" />
                  Sign in to your account
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
