// src/Config/adminUsers.js

// =============================================
// ✅ PREDEFINED ADMIN USERS — Department-wise

export const ADMIN_USERS = [
  // ─────────────────────────────────────────
  // 1️⃣ ELDERS DEPARTMENT
  // ─────────────────────────────────────────
  {
    email: "elders@tarabiyah.com",
    password: "Elders1&h%",
    profile: {
      name: "Elders Department Admin",
      email: "elders@tarabiyah.com",
      phone: "+880 1700 123456",
      designation: "Department Head",
      department: "Elders",
      joinDate: "January 2024",
      bio: "Experienced administrator for the Elders Department.",
      address: "40/1, Safe Garden, Mohammadpur - 1207, Dhaka",
      website: "https://tarabiyahonline.com",
      profileImage: "",
    },
    stats: {},
  },

  // ─────────────────────────────────────────
  // 2️⃣ QURAN STUDIES DEPARTMENT
  // ─────────────────────────────────────────
  {
    email: "quran@tarabiyah.com",
    password: "Quran1&h%",
    profile: {
      name: "Quran Studies Admin",
      email: "quran@tarabiyah.com",
      phone: "+880 1700 234567",
      designation: "Department Head",
      department: "Quran Studies",
      joinDate: "January 2024",
      bio: "Administrator for the Quran Studies Department.",
      address: "40/1, Safe Garden, Mohammadpur - 1207, Dhaka",
      website: "https://tarabiyahonline.com",
      profileImage: "",
    },
    stats: {},
  },

  // ─────────────────────────────────────────
  // 3️⃣ ALIMIYA DEPARTMENT
  // ─────────────────────────────────────────
  {
    email: "alimiya@tarabiyah.com",
    password: "Alimiya1&h%",
    profile: {
      name: "Alimiya Department Admin",
      email: "alimiya@tarabiyah.com",
      phone: "+880 1700 345678",
      designation: "Department Head",
      department: "Alimiya",
      joinDate: "January 2024",
      bio: "Administrator for the Alimiya Department.",
      address: "40/1, Safe Garden, Mohammadpur - 1207, Dhaka",
      website: "https://tarabiyahonline.com",
      profileImage: "",
    },
    stats: {},
  },

  // ─────────────────────────────────────────
  // 4️⃣ DIPLOMA DEPARTMENT
  // ─────────────────────────────────────────
  {
    email: "diploma@tarabiyah.com",

    password: "Diploma1&h%",
    profile: {
      name: "Diploma Department Admin",
      email: "diploma@tarabiyah.com",
      phone: "+880 1700 456789",
      designation: "Department Head",
      department: "Diploma",
      joinDate: "January 2024",
      bio: "Administrator for the Diploma Department.",
      address: "40/1, Safe Garden, Mohammadpur - 1207, Dhaka",
      website: "https://tarabiyahonline.com",
      profileImage: "",
    },
    stats: {},
  },
];

// =============================================
// ✅ Find admin by credentials (email + password)
// =============================================
export const findAdminByCredentials = (email, password) => {
  if (!email || !password) return null;

  const cleanEmail = email.toLowerCase().trim();
  const cleanPassword = password.trim();

  const found = ADMIN_USERS.find(
    (admin) =>
      admin.email.toLowerCase().trim() === cleanEmail &&
      admin.password === cleanPassword,
  );

  return found || null;
};

// =============================================
// ✅ Get admin by email (helper)
// =============================================
export const findAdminByEmail = (email) => {
  if (!email) return null;
  const cleanEmail = email.toLowerCase().trim();
  return (
    ADMIN_USERS.find(
      (admin) => admin.email.toLowerCase().trim() === cleanEmail,
    ) || null
  );
};

// ✅ Get department by email — login পর auto filter এর জন্য
export const getDepartmentByEmail = (email) => {
  const admin = findAdminByEmail(email);
  return admin?.profile?.department || null;
};

// ✅ Department-wise admin info
export const getAdminByDepartment = (department) => {
  if (!department) return null;
  return (
    ADMIN_USERS.find(
      (a) =>
        a.profile.department.toLowerCase() === department.toLowerCase().trim(),
    ) || null
  );
};

// =============================================
// ✅ Get all departments (for UI dropdown etc.)
// =============================================
export const getAllDepartments = () => {
  return ADMIN_USERS.map((a) => a.profile.department);
};
