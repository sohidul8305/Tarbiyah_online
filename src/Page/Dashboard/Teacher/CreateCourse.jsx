const CreateCourse = () => {
  return (
    <div style={{ padding: "20px" }}>
      <h1>➕ নতুন কোর্স তৈরি</h1>
      <form style={{ marginTop: "20px" }}>
        <div style={{ marginBottom: "15px" }}>
          <label>কোর্সের শিরোনাম</label>
          <input
            type="text"
            style={{
              width: "100%",
              padding: "10px",
              marginTop: "5px",
              border: "1px solid #ddd",
              borderRadius: "5px",
            }}
          />
        </div>
        <div style={{ marginBottom: "15px" }}>
          <label>বিবরণ</label>
          <textarea
            style={{
              width: "100%",
              padding: "10px",
              marginTop: "5px",
              border: "1px solid #ddd",
              borderRadius: "5px",
              minHeight: "100px",
            }}
          ></textarea>
        </div>
        <div style={{ marginBottom: "15px" }}>
          <label>ক্যাটাগরি</label>
          <select
            style={{
              width: "100%",
              padding: "10px",
              marginTop: "5px",
              border: "1px solid #ddd",
              borderRadius: "5px",
            }}
          >
            <option>ডিপ্লোমা ইন ইসলামিক স্টুডিজ</option>
            <option>তারবিয়াহ আলেমাইয়াহ প্রোগ্রাম</option>
            <option>তারবিয়াহ স্টুডিস ফর কিডস</option>
            <option>কুরআন ফর এল্ডার্স</option>
          </select>
        </div>
        <button
          style={{
            padding: "10px 20px",
            background: "#4CAF50",
            color: "white",
            border: "none",
            borderRadius: "5px",
          }}
        >
          কোর্স তৈরি করুন
        </button>
      </form>
    </div>
  );
};
export default CreateCourse;
