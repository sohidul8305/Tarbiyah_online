import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // ইউজার লগইন করলে কোথায় যাবে তা নির্ধারণ
  const getDashboardPath = (role) => {
    switch (role) {
      case "admin":
        return "/admin/dashboard";
      case "teacher":
        return "/teacher/dashboard";
      default:
        return "/student/dashboard";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await login(email, password);
      const dashboardPath = getDashboardPath(user.role);
      navigate(dashboardPath);
    } catch (err) {
      setError(err.response?.data?.message || "লগইন করতে সমস্যা হয়েছে।");
    }
  };

  return (
    <div className="login-container">
      <h2>তারবিয়াহ - লগইন</h2>
      {error && <div className="error">{error}</div>}
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="ইমেইল"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="পাসওয়ার্ড"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">লগইন করুন</button>
      </form>
    </div>
  );
};

export default Login;
