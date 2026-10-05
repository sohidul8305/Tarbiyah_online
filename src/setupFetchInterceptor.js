// src/setupFetchInterceptor.js
// ✅ সব API call-এ নিজে থেকেই department যোগ করে

const originalFetch = window.fetch;

window.fetch = async function (url, options = {}) {
  try {
    if (typeof url === "string") {
      const isAdminLoggedIn =
        localStorage.getItem("isAdminLoggedIn") === "true";
      const adminDept = localStorage.getItem("adminDepartment");

      if (
        isAdminLoggedIn &&
        adminDept &&
        adminDept.trim() &&
        adminDept !== "All"
      ) {
        // ✅ API URL কিনা চেক
        const isApiCall =
          url.includes("tarbiyahonline.com/api") || url.startsWith("/api/");

        // ✅ Skip: auth, login, register, migration
        const shouldSkip =
          url.includes("/auth/") ||
          url.includes("/login") ||
          url.includes("/register") ||
          url.includes("/migrate/") ||
          url.includes("/admin-profile/") ||
          url.includes("/support/") ||
          url.includes("/payment/");

        // ✅ Skip: already has department param
        const hasDept = url.includes("department=");

        if (isApiCall && !shouldSkip && !hasDept) {
          const sep = url.includes("?") ? "&" : "?";
          url = `${url}${sep}department=${encodeURIComponent(adminDept)}`;
          console.log(`🔒 [Dept Filter] ${adminDept}`);
        }
      }
    }
  } catch (err) {
    console.error("Interceptor error:", err);
  }

  return originalFetch(url, options);
};

console.log("✅ [Dept Filter] Active");
