// src/Config/adminUsers.js

export const ADMIN_USERS = [
  {
    email: "elders@tarabiyah.com",
    password: "Elders1&h%",
    profile: {
      name: "Mahfujur Rahaman",
      email: "elders@tarabiyah.com",
      phone: "+880 1700 000000",
      designation: "Administrator",
      department: "Elders",
      joinDate: "January 2024",
      bio: "Administrator of Elders Department at Tarbiyah Online Madrasha.",
      address: "Dhaka, Bangladesh",
      website: "https://tarabiyahonline.com",
      profileImage: "",
    },
    stats: {
      totalDepartments: 3,
      todayClasses: 5,
      totalStudents: 42,
      newAdmissions: 4,
      totalTeachers: 8,
      totalIncome: 45000,
      pendingFees: 12000,
      notifications: 3,
    },
  },

  // ✅ ভবিষ্যতে নতুন admin যোগ করতে এখানে object add করো
  // {
  //   email: "boys@tarabiyah.com",
  //   password: "Boys1&h%",
  //   profile: {
  //     name: "Another Admin",
  //     department: "Boys",
  //     designation: "Administrator",
  //     ...
  //   },
  //   stats: { ... },
  // },
];

export const findAdminByCredentials = (email, password) => {
  if (!email || !password) return null;
  return (
    ADMIN_USERS.find(
      (u) =>
        u.email.toLowerCase() === email.toLowerCase().trim() &&
        u.password === password,
    ) || null
  );
};
