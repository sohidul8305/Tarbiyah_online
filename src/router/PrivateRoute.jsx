import { Navigate } from "react-router-dom";
import { useAuth } from "../Provider/AuthContext";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <div className="animate-spin inline-block w-12 h-12 border-4 border-[#004d4d] border-t-transparent rounded-full"></div>
        <p className="mt-4 text-gray-600 font-medium">Loading...</p>
      </div>
    );
  }

  if (!user) {
    console.log("🔒 No user, redirecting to login");
    return <Navigate to="/login" replace />;
  }

  console.log("✅ User authenticated:", user.email, "Role:", user.role);
  return children;
};

export default PrivateRoute;
