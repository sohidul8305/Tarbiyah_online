import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Provider/AuthProvider";
import Swal from "sweetalert2";

const Dashboard = () => {
  const { user, logOut } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logOut();
      await Swal.fire({
        icon: "success",
        title: "Logged Out",
        text: "You have been logged out successfully",
        timer: 1500,
        showConfirmButton: false,
      });
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
      await Swal.fire({
        icon: "error",
        title: "Logout Failed",
        text: error.message,
      });
    }
  };

  // User না থাকলে Loading দেখান
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin inline-block w-12 h-12 border-4 border-[#004d4d] border-t-transparent rounded-full"></div>
          <p className="mt-4 text-gray-600">Loading user data...</p>
        </div>
      </div>
    );
  }

  console.log("Dashboard User:", user); // Console এ ইউজার ডেটা দেখুন

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-[#004d4d] px-6 py-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-white">Dashboard</h1>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-150 text-sm"
            >
              Logout
            </button>
          </div>

          {/* Content */}
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* User Info Card */}
              <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  👤 User Information
                </h2>
                <div className="space-y-3">
                  {/* Profile Image */}
                  <div className="flex items-center gap-4">
                    {user?.photoURL ? (
                      <img
                        src={user.photoURL}
                        alt={user.displayName || "User"}
                        className="w-20 h-20 rounded-full object-cover border-4 border-[#004d4d]"
                      />
                    ) : (
                      <div className="w-20 h-20 rounded-full bg-[#004d4d] text-white flex items-center justify-center text-3xl font-bold">
                        {user?.displayName?.charAt(0) ||
                          user?.email?.charAt(0).toUpperCase() ||
                          "U"}
                      </div>
                    )}
                    <div>
                      <p className="font-semibold text-gray-900 text-lg">
                        {user?.displayName || "User"}
                      </p>
                      <p className="text-gray-600">{user?.email}</p>
                    </div>
                  </div>

                  {/* User Details */}
                  <div className="border-t border-gray-200 pt-3 space-y-2">
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">📧 Email:</span>{" "}
                      {user?.email || "Not available"}
                    </p>
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">👤 Name:</span>{" "}
                      {user?.displayName || "Not set"}
                    </p>
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">🆔 User ID:</span>{" "}
                      {user?.uid?.slice(0, 20)}...
                    </p>
                  </div>
                </div>
              </div>

              {/* Quick Actions Card */}
              <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  ⚡ Quick Actions
                </h2>
                <div className="space-y-3">
                  <Link
                    to="/"
                    className="w-full block text-center bg-[#004d4d] text-white py-2.5 px-4 rounded-md hover:bg-[#003d3d] transition duration-150"
                  >
                    🏠 Go to Home
                  </Link>
                  <Link to="/">
                    <button
                      onClick={handleLogout}
                      className="w-full bg-red-500 text-white py-2.5 px-4 rounded-md hover:bg-red-600 transition duration-150"
                    >
                      🚪 Logout
                    </button>
                  </Link>
                </div>
              </div>
            </div>

            {/* Welcome Message */}
            <div className="mt-6 bg-[#004d4d] bg-opacity-10 rounded-lg p-4 border border-[#004d4d] border-opacity-20">
              <p className="text-center text-[#004d4d] font-medium">
                🎉 Welcome {user?.displayName || "User"}! You are now logged in.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
