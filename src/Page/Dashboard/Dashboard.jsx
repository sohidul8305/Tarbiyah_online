import React, { useContext } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const { user, logOut } = useContext(AuthContext);

  const handleLogout = async () => {
    try {
      await logOut();
      window.location.href = "/login";
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-2">Welcome back!</p>
        </div>

        <div className="border-t border-gray-200 pt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-50 rounded-lg p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-2">
                User Info
              </h2>
              <p className="text-gray-600">
                <span className="font-medium">Name:</span>{" "}
                {user?.displayName || "N/A"}
              </p>
              <p className="text-gray-600">
                <span className="font-medium">Email:</span>{" "}
                {user?.email || "N/A"}
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-2">
                Quick Actions
              </h2>
              <button
                onClick={handleLogout}
                className="w-full bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition duration-150"
              >
                Logout
              </button>
            </div>
          </div>
        </div>

        <div className="mt-6 text-center">
          <Link to="/" className="text-[#004d4d] hover:text-[#003d3d]">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
