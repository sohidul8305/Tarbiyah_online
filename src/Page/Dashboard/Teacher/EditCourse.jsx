const EditCourse = () => {
  return (
    <div style={{ padding: "20px" }}>
      <h1>✏️ কোর্স সম্পাদনা</h1>
      <p>কোর্সের তথ্য পরিবর্তন করুন</p>
      <div style={{ marginTop: "20px" }}>
        <p style={{ color: "#666" }}>
          কোর্স আইডি: {window.location.pathname.split("/").pop()}
        </p>
      </div>
    </div>
  );
};
export default EditCourse;
