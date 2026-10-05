// src/setupFetchInterceptor.js
// ✅ সব API call-এ নিজে থেকেই department যোগ করে দেয়

const originalFetch = window.fetch;

// ✅ যে endpoint গুলোতে department filter লাগবে
const ENDPOINTS_NEED_FILTER = [
  "/api/students/all",
  "/api/admin-students/all",
  "/api/admin-students/search",
  "/api/admin-students/batch-summary",
  "/api/batches/all",
  "/api/batch-students/all",
  "/api/attendance-report/all",
  "/api/admission-report/all",
  "/api/teacher-attendance/all",
  "/api/teacher-attendance/stats",
  "/api/teacher-attendance/teachers",
  "/api/basic-tazweed/all",
  "/api/najera-batch/all",
  "/api/departments/all",
  "/api/courses/teacher",
  "/api/courses/stats",
];

window.fetch = async function (url, options = {}) {
  try {
    if (typeof url === "string") {
      // Login check
      const isAdminLoggedIn =
        localStorage.getItem("isAdminLoggedIn") === "true";
      const adminDept = localStorage.getItem("adminDepartment");

      if (
        isAdminLoggedIn &&
        adminDept &&
        adminDept.trim() &&
        adminDept !== "All"
      ) {
        // এই URL কি filter লাগবে?
        const needsFilter = ENDPOINTS_NEED_FILTER.some((ep) =>
          url.includes(ep),
        );

        // Already department= আছে কিনা?
        const hasDept = url.includes("department=");

        if (needsFilter && !hasDept) {
          const sep = url.includes("?") ? "&" : "?";
          url = `${url}${sep}department=${encodeURIComponent(adminDept)}`;
          console.log(`🔒 [Dept Filter] Added: ${adminDept} → ${url}`);
        }
      }
    }
  } catch (err) {
    console.error("Interceptor error:", err);
  }

  return originalFetch(url, options);
};

console.log("✅ [Dept Filter] Interceptor installed");
