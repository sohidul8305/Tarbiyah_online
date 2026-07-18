import { Link } from "react-router-dom";

const Unauthorized = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        textAlign: "center",
      }}
    >
      <h1 style={{ fontSize: "72px", color: "#f44336" }}>⛔</h1>
      <h2>অনুমতি নেই!</h2>
      <p>এই পৃষ্ঠাটি দেখার জন্য আপনার যথেষ্ট অনুমতি নেই।</p>
      <Link
        to="/"
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          background: "#4CAF50",
          color: "white",
          textDecoration: "none",
          borderRadius: "5px",
        }}
      >
        হোম পেজে ফিরে যান
      </Link>
    </div>
  );
};

export default Unauthorized;
