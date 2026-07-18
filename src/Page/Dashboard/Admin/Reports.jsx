const Reports = () => {
  return (
    <div style={{ padding: "20px" }}>
      <h1>📊 রিপোর্ট</h1>
      <p>সমস্ত রিপোর্ট দেখুন</p>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "20px",
          marginTop: "20px",
        }}
      >
        <div
          style={{
            padding: "20px",
            background: "#e3f2fd",
            borderRadius: "10px",
          }}
        >
          <h3>মোট ইউজার</h3>
          <p style={{ fontSize: "24px", fontWeight: "bold" }}>0</p>
        </div>
        <div
          style={{
            padding: "20px",
            background: "#e8f5e9",
            borderRadius: "10px",
          }}
        >
          <h3>মোট কোর্স</h3>
          <p style={{ fontSize: "24px", fontWeight: "bold" }}>0</p>
        </div>
        <div
          style={{
            padding: "20px",
            background: "#fff3e0",
            borderRadius: "10px",
          }}
        >
          <h3>মোট আয়</h3>
          <p style={{ fontSize: "24px", fontWeight: "bold" }}>$0</p>
        </div>
      </div>
    </div>
  );
};
export default Reports;
