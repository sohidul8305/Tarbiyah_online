// src/Config/adminUsers.js

const sha256 = async (text) => {
  const data = new TextEncoder().encode(text);
  const buf = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
};

export const ADMIN_USERS = [
  // 1️⃣ ELDERS
  {
    email: "elders@tarabiyah.com",
    hash: "16fd8ac2aa3bb952b7b8173f9c613648858c60f67195746111725f2498c30da7",
    disabled: false,
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

  // 2️⃣ QURAN STUDIES
  {
    email: "quran@tarabiyah.com",
    hash: "4455db8bba0c5a11b30018f42152e69ea36ece83af229c90d8563d189f6e14cd",
    disabled: false,
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

  // 3️⃣ ALIMIYA
  {
    email: "alimiya@tarabiyah.com",
    hash: "7f77b39a913b8a16e0dd2af575f519c42f4f537b27977d0aeecb97f4c3a57918",
    disabled: false,
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

  // 4️⃣ DIPLOMA
  {
    email: "diploma@tarabiyah.com",
    hash: "c0edfe44b70f2895288a4cffa022ece1d9856569150904afcc5c76d9a984d233",
    disabled: false,
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

export const findAdminByCredentials = async (email, password) => {
  if (!email || !password) return null;

  const cleanEmail = email.toLowerCase().trim();
  const inputHash = await sha256(password.trim());

  // 🔥 ডায়াগনস্টিক লগ: ব্রাউজার এই পাসওয়ার্ড থেকে যে হ্যাশ তৈরি করছে তা কনসোলে দেখাবে
  if (cleanEmail === "diploma@tarabiyah.com") {
    console.log("🔑 Generated Input Hash for Diploma:", inputHash);
    console.log("🔑 Typed Password was:", password);
  }

  const found = ADMIN_USERS.find(
    (admin) => admin?.email && admin.email.toLowerCase().trim() === cleanEmail,
  );

  if (!found || found.disabled) return null;
  return found.hash === inputHash ? found : null;
};

export const findAdminByEmail = (email) => {
  if (!email) return null;
  const cleanEmail = email.toLowerCase().trim();
  return (
    ADMIN_USERS.find(
      (admin) =>
        admin?.email && admin.email.toLowerCase().trim() === cleanEmail,
    ) || null
  );
};

export const getDepartmentByEmail = (email) => {
  const admin = findAdminByEmail(email);
  return admin?.profile?.department || null;
};

export const getAdminByDepartment = (department) => {
  if (!department) return null;
  return (
    ADMIN_USERS.find(
      (a) =>
        a?.profile?.department &&
        a.profile.department.toLowerCase() === department.toLowerCase().trim(),
    ) || null
  );
};

export const getAllDepartments = () =>
  ADMIN_USERS.map((a) => a?.profile?.department).filter(Boolean);
