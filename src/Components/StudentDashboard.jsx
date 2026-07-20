import { useState, useEffect } from "react";
import { useAuth } from "../../Provider/AuthContext";
import API from "../../services/api";

const StudentDashboard = () => {
  const auth = useAuth() || {};
  const user = auth.user;
  const loadingAuth = auth.loading;

  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [loadingCourses, setLoadingCourses] = useState(true);

  useEffect(() => {
    const fetchEnrolledCourses = async () => {
      try {
        const response = await API.get("/users/enrolled-courses");
        setEnrolledCourses(response.data.courses || []);
      } catch (error) {
        console.error("কোর্স লোড করতে সমস্যা:", error);
      } finally {
        setLoadingCourses(false);
      }
    };

    if (user) {
      fetchEnrolledCourses();
    } else if (!loadingAuth) {
      setLoadingCourses(false);
    }
  }, [user, loadingAuth]);

  if (loadingAuth || loadingCourses) {
    return <div className="text-center py-20 font-medium">লোড হচ্ছে...</div>;
  }

  return (
    <div className="student-dashboard max-w-6xl mx-auto py-10 px-6">
      <h1 className="text-3xl font-bold mb-6">
        স্বাগতম, {user?.displayName || user?.name || "শিক্ষার্থী"}!
      </h1>

      <div className="dashboard-stats grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <div className="stat-card bg-teal-50 p-6 rounded-xl border border-teal-100 shadow-sm">
          <h3 className="text-lg font-semibold text-teal-800">এনরোলড কোর্স</h3>
          <p className="text-3xl font-bold text-teal-600 mt-2">
            {enrolledCourses.length}
          </p>
        </div>
        <div className="stat-card bg-teal-50 p-6 rounded-xl border border-teal-100 shadow-sm">
          <h3 className="text-lg font-semibold text-teal-800">অগ্রগতি</h3>
          <p className="text-3xl font-bold text-teal-600 mt-2">৭৫%</p>
        </div>
      </div>

      <h2 className="text-2xl font-bold mb-6">আমার কোর্সসমূহ</h2>
      <div className="course-grid grid grid-cols-1 md:grid-cols-3 gap-6">
        {enrolledCourses.length > 0 ? (
          enrolledCourses.map((course) => (
            <div
              key={course._id}
              className="course-card border rounded-xl overflow-hidden shadow-md p-4"
            >
              <img
                src={course.thumbnail}
                alt={course.title}
                className="w-full h-40 object-cover rounded-lg mb-4"
              />
              <h3 className="text-xl font-bold mb-2">{course.title}</h3>
              <p className="text-gray-600 text-sm mb-4">
                {course.description ? course.description.slice(0, 100) : ""}...
              </p>
              <button className="bg-[#004d4d] text-white px-4 py-2 rounded-lg font-medium hover:bg-teal-700 transition-all w-full">
                চালিয়ে যান
              </button>
            </div>
          ))
        ) : (
          <p className="text-gray-500">আপনার কোনো এনরোল করা কোর্স নেই।</p>
        )}
      </div>
    </div>
  );
};

export_default = StudentDashboard;
export default StudentDashboard;
