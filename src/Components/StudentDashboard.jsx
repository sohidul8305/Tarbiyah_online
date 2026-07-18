import { useAuth } from "../Provider/AuthContext";

const StudentDashboard = () => {
  const { user } = useAuth();

  return (
    <div style={{ padding: "20px" }}>
      <h1>👋 স্বাগতম, {user?.name}!</h1>
      <p>আপনি ছাত্র হিসেবে লগইন করেছেন</p>
      <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
        <div
          style={{
            padding: "20px",
            background: "#e3f2fd",
            borderRadius: "8px",
            flex: 1,
          }}
        >
          <h3>এনরোলড কোর্স</h3>
          <p style={{ fontSize: "24px" }}>0</p>
        </div>
        <div
          style={{
            padding: "20px",
            background: "#fff3e0",
            borderRadius: "8px",
            flex: 1,
          }}
        >
          <h3>অগ্রগতি</h3>
          <p style={{ fontSize: "24px" }}>0%</p>
        </div>
        <div
          style={{
            padding: "20px",
            background: "#e8f5e9",
            borderRadius: "8px",
            flex: 1,
          }}
        >
          <h3>সার্টিফিকেট</h3>
          <p style={{ fontSize: "24px" }}>0</p>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
