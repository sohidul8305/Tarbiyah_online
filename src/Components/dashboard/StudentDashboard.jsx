import { useState, useEffect } from "react";
import { useAuth } from "../../Provider/AuthContext";
import API from "../../services/api";

const StudentDashboard = () => {
  const { user } = useAuth();
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEnrolledCourses = async () => {
      try {
        const response = await API.get("/users/enrolled-courses");
        setEnrolledCourses(response.data.courses);
      } catch (error) {
        console.error("কোর্স লোড করতে সমস্যা:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchEnrolledCourses();
  }, []);

  if (loading) return <div>লোড হচ্ছে...</div>;

  return (
    <div className="student-dashboard">
      <h1>স্বাগতম, {user?.name}!</h1>

      <div className="dashboard-stats">
        <div className="stat-card">
          <h3>এনরোলড কোর্স</h3>
          <p>{enrolledCourses.length}</p>
        </div>
        <div className="stat-card">
          <h3>অগ্রগতি</h3>
          <p>৭৫%</p>
        </div>
      </div>

      <h2>আমার কোর্সসমূহ</h2>
      <div className="course-grid">
        {enrolledCourses.map((course) => (
          <div key={course._id} className="course-card">
            <img src={course.thumbnail} alt={course.title} />
            <h3>{course.title}</h3>
            <p>{course.description.slice(0, 100)}...</p>
            <button>চালিয়ে যান</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentDashboard;
