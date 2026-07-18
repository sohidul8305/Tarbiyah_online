import { Outlet, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../Provider/AuthContext"; // ← সঠিকভাবে ইম্পোর্ট করুন

const DashboardLayout = () => {
  const { user, logOut } = useAuth(); // ← logOut ব্যবহার করুন (logOut নামটা মনে রাখুন)
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  // ড্যাশবোর্ড মেনু আইটেম
  const getMenuItems = () => {
    const baseItems = [{ path: "/dashboard", label: "📊 ড্যাশবোর্ড" }];

    // Firebase user এর role নির্ধারণ করা দরকার
    // যদি আপনার Firebase এ role না থাকে, তাহলে ডিফল্ট student ধরে নিন
    const userRole = user?.role || "student";

    if (userRole === "student") {
      return [
        ...baseItems,
        { path: "/dashboard/my-courses", label: "📚 আমার কোর্স" },
        { path: "/dashboard/my-assignments", label: "📝 অ্যাসাইনমেন্ট" },
        { path: "/dashboard/my-quizzes", label: "❓ কুইজ" },
        { path: "/dashboard/certificates", label: "🏆 সার্টিফিকেট" },
      ];
    }

    if (userRole === "teacher") {
      return [
        ...baseItems,
        { path: "/dashboard/my-courses", label: "📚 আমার কোর্স" },
        { path: "/dashboard/create-course", label: "➕ কোর্স তৈরি" },
        { path: "/dashboard/assignments", label: "📝 অ্যাসাইনমেন্ট চেক" },
        { path: "/dashboard/students", label: "👨‍🎓 শিক্ষার্থীরা" },
      ];
    }

    if (userRole === "admin") {
      return [
        ...baseItems,
        { path: "/dashboard/users", label: "👥 ইউজার ম্যানেজ" },
        { path: "/dashboard/courses", label: "📚 কোর্স ম্যানেজ" },
        { path: "/dashboard/teachers", label: "👨‍🏫 টিচার ম্যানেজ" },
        { path: "/dashboard/reports", label: "📊 রিপোর্ট" },
      ];
    }

    return baseItems;
  };

  // লোডিং চেক
  if (!user) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <div className="animate-spin inline-block w-12 h-12 border-4 border-[#004d4d] border-t-transparent rounded-full"></div>
          <p className="mt-4 text-gray-600 font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      {/* সাইডবার */}
      <div
        style={{
          width: "250px",
          background: "#1a1a2e",
          color: "white",
          padding: "20px",
          minHeight: "100vh",
          position: "sticky",
          top: 0,
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "20px" }}>
          {user?.photoURL && (
            <img
              src={user.photoURL}
              alt="Profile"
              style={{
                width: "60px",
                height: "60px",
                borderRadius: "50%",
                objectFit: "cover",
                border: "2px solid #fff",
                marginBottom: "10px",
              }}
            />
          )}
          <h3 style={{ margin: 0, fontSize: "16px" }}>
            {user?.displayName || "User"}
          </h3>
          <p style={{ margin: 0, fontSize: "12px", opacity: 0.7 }}>
            {user?.email}
          </p>
        </div>
        <hr style={{ borderColor: "#333" }} />
        <nav>
          {getMenuItems().map((item) => (
            <Link
              key={item.path}
              to={item.path}
              style={{
                display: "block",
                color: "white",
                padding: "12px 15px",
                margin: "5px 0",
                textDecoration: "none",
                borderRadius: "5px",
                transition: "background 0.3s",
              }}
              onMouseEnter={(e) => (e.target.style.background = "#2a2a4e")}
              onMouseLeave={(e) => (e.target.style.background = "transparent")}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <hr style={{ borderColor: "#333" }} />
        <button
          onClick={handleLogout}
          style={{
            width: "100%",
            padding: "12px",
            background: "#e74c3c",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontSize: "16px",
            marginTop: "20px",
          }}
        >
          🚪 লগআউট
        </button>
      </div>

      {/* কন্টেন্ট এরিয়া */}
      <div style={{ flex: 1, padding: "30px", background: "#f5f5f5" }}>
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
