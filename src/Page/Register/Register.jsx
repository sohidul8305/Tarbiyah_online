import React, { useContext, useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { Eye, EyeOff, Upload, X, User, Camera } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Provider/AuthProvider";
import Swal from "sweetalert2";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Navbar/Footer/Footer";

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
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const password = watch("password");

  if (!authContext) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin inline-block w-12 h-12 border-4 border-[#004d4d] border-t-transparent rounded-full"></div>
            <p className="mt-4 text-gray-600 font-medium">Loading...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const { registerUser, updateUserProfile } = authContext;

  // ImageBB তে ইমেজ আপলোড
  const uploadImageToImageBB = async (file) => {
    const formData = new FormData();
    formData.append("image", file);

    const apiKey = import.meta.env.VITE_IMAGEBB_API_KEY;

    if (!apiKey) {
      throw new Error("ImageBB API Key not found in environment variables.");
    }

    const response = await fetch(
      `https://api.imgbb.com/1/upload?key=${apiKey}`,
      {
        method: "POST",
        body: formData,
      },
    );

    const data = await response.json();

    if (data.success) {
      return data.data.url;
    } else {
      throw new Error(data.error?.message || "Image upload failed");
    }
  };

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

  const onSubmit = async (data) => {
    setLoading(true);
    setUploadProgress(0);

    try {
      console.log("📝 Registering with:", data.email);
      const result = await registerUser(data.email, data.password);

      if (!result || !result.user) {
        throw new Error("Failed to create user. Please try again.");
      }

      const user = result.user;
      console.log("✅ User registered:", user.uid);

      // ১. ইমেজ আপলোড (যদি সিলেক্ট করা থাকে)
      let photoURL = "";
      if (profileImage) {
        try {
          setUploadProgress(50);
          photoURL = await uploadImageToImageBB(profileImage);
          setUploadProgress(100);
          console.log("✅ Image uploaded:", photoURL);
        } catch (imgError) {
          console.error("Image upload error:", imgError);
          // Optional: decide if you want image failure to block registration or continue without photo
          // For now, it will proceed with empty photoURL or you can throw to stop.
        }
      }

      // ২. ইউজারের প্রফাইল আপডেট (নাম ও ছবি যুক্ত করা)
      const fullName = `${data.firstName} ${data.lastName}`;
      await updateUserProfile(fullName, photoURL);
      console.log("✅ Profile updated successfully");

      // ৩. সফল মেসেজ ও রিডাইরেক্ট
      await Swal.fire({
        icon: "success",
        title: "Registration Successful! 🎉",
        text: `Welcome ${data.firstName}! Your account has been created.`,
        timer: 2000,
        showConfirmButton: true,
        confirmButtonColor: "#004d4d",
      });

      navigate("/dashboard");
    } catch (error) {
      console.error("Firebase Auth Error Details:", error);

      let errorMessage = "Registration failed. Please try again.";
      if (error.code === "auth/email-already-in-use") {
        errorMessage = "This email is already registered. Please log in.";
      } else if (error.code === "auth/weak-password") {
        errorMessage = "Password should be at least 6 characters.";
      } else {
        errorMessage = error.message || errorMessage;
      }

      Swal.fire({
        icon: "error",
        title: "Registration Failed ❌",
        text: errorMessage,
        confirmButtonColor: "#004d4d",
      });
    } finally {
      setLoading(false);
      setUploadProgress(0);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

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

            {/* Form */}
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
                        disabled={loading}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1.5 hover:bg-red-600 transition-colors shadow-lg hover:scale-110 transform disabled:opacity-50"
                      >
                        <X className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        disabled={loading}
                        className="absolute bottom-0 right-0 bg-[#004d4d] text-white rounded-full p-2 hover:bg-[#003d3d] transition-colors shadow-lg hover:scale-110 transform disabled:opacity-50"
                      >
                        <Camera className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <div
                      onClick={() => !loading && fileInputRef.current?.click()}
                      className={`w-24 h-24 sm:w-28 sm:h-28 rounded-full border-4 border-dashed border-gray-300 flex flex-col items-center justify-center cursor-pointer hover:border-[#004d4d] transition-all hover:bg-gray-50 group bg-gray-50 ${
                        loading ? "opacity-50 cursor-not-allowed" : ""
                      }`}
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
                    disabled={loading}
                    className="hidden"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  JPG, PNG, GIF • Max 5MB
                </p>
                {uploadProgress > 0 && uploadProgress < 100 && (
                  <div className="w-full mt-2 bg-gray-200 rounded-full h-2.5">
                    <div
                      className="bg-[#004d4d] h-2.5 rounded-full transition-all duration-300"
                      style={{ width: `${uploadProgress}%` }}
                    ></div>
                  </div>
                )}
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
                    type="text"
                    autoComplete="given-name"
                    disabled={loading}
                    className="appearance-none relative block w-full px-3 py-2.5 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-[#004d4d] focus:border-[#004d4d] sm:text-sm disabled:bg-gray-100 disabled:cursor-not-allowed"
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
                    type="text"
                    autoComplete="family-name"
                    disabled={loading}
                    className="appearance-none relative block w-full px-3 py-2.5 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-[#004d4d] focus:border-[#004d4d] sm:text-sm disabled:bg-gray-100 disabled:cursor-not-allowed"
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
                    type="email"
                    autoComplete="email"
                    disabled={loading}
                    className="appearance-none relative block w-full px-3 py-2.5 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-[#004d4d] focus:border-[#004d4d] sm:text-sm disabled:bg-gray-100 disabled:cursor-not-allowed"
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
                    type={showPass ? "text" : "password"}
                    autoComplete="new-password"
                    disabled={loading}
                    className="appearance-none relative block w-full px-3 py-2.5 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-[#004d4d] focus:border-[#004d4d] sm:text-sm disabled:bg-gray-100 disabled:cursor-not-allowed"
                    placeholder="Password (min 6 characters) *"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass(!showPass)}
                    disabled={loading}
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
                    type={showConfirmPass ? "text" : "password"}
                    autoComplete="new-password"
                    disabled={loading}
                    className="appearance-none relative block w-full px-3 py-2.5 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-[#004d4d] focus:border-[#004d4d] sm:text-sm disabled:bg-gray-100 disabled:cursor-not-allowed"
                    placeholder="Confirm Password *"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPass(!showConfirmPass)}
                    disabled={loading}
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
                    type="checkbox"
                    disabled={loading}
                    className="h-4 w-4 text-[#004d4d] focus:ring-[#004d4d] border-gray-300 rounded mt-0.5 disabled:opacity-50"
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

      <Footer />
    </div>
  );
};

export class ErrorBoundary extends React.Component {
  state = { hasError: false };
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  render() {
    if (this.state.hasError) return <h2>Something went wrong.</h2>;
    return this.props.children;
  }
}

export default Register;
