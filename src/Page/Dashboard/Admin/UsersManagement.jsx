const UsersManagement = () => {
  return (
    <div style={{ padding: "20px" }}>
      <h1>👥 ইউজার ম্যানেজমেন্ট</h1>
      <p>সব ইউজার দেখুন ও পরিচালনা করুন</p>
      <div style={{ marginTop: "20px" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "#f5f5f5" }}>
              <th style={{ padding: "10px", border: "1px solid #ddd" }}>নাম</th>
              <th style={{ padding: "10px", border: "1px solid #ddd" }}>
                ইমেইল
              </th>
              <th style={{ padding: "10px", border: "1px solid #ddd" }}>রোল</th>
              <th style={{ padding: "10px", border: "1px solid #ddd" }}>
                অ্যাকশন
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td
                colSpan="4"
                style={{ textAlign: "center", padding: "20px", color: "#666" }}
              >
                কোন ইউজার নেই।
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default UsersManagement;
