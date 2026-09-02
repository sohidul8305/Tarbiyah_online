import React from "react";
import { useLanguage } from "../../context/useLanguage";
import ProfessorImg from "../../image/profile.jpg";
import MujahidImg from "../../image/Mujahid.png";
import AbunumanImg from "../../image/Abunoman.jpg";
import SalmanImg from "../../image/salman.png";
import Jaber from "../../image/jubair.png";
import MahmudulImg from "../../image/mahmudul.png";
import JUbayer from "../../image/jubayer.png";
import HidoyImg from "../../image/Hridoy-Ustaz-01.png";
import drABM from "../../image/DRABMjakariya.png";
import Jubair from "../../image/Zubair.jpeg";
import Ubauddin from "../../image/Ubaydullah.png";
import Motiul from "../../image/Motiul Islam .jpeg";
import JakariyahmasudImg from "../../image/jakariyah.png";
import Aldullahalmamun from "../../image/Abdullah AL Mamun.jpeg";
import abdullahkafi from "../../image/Abdullah Kafi.png";
import AlminImg from "../../image/Alamin.png";
import TorikImg from "../../image/Torikul Islam.jpg";
import Atiqullah from "../../image/atikullah.png";
import Avator from "../../image/arartor.png";
import Avatorboys from "../../image/Avatorboys.png";
import Ahmedjaber from "../../image/Ahamed jabe.png";
import ImamhossainImg from "../../image/Emam Hussain.png";
import MonjurImg from "../../image/Monjur.png";
const Faculty = () => {
  const { t } = useLanguage();

  const facultyMembers = [
    {
      name: { en: "Prof. Mokhtar Ahmad", bn: "প্রফেসর মুখতার আহমাদ" },
      designation: { en: "Chairman", bn: "চেয়ারম্যান" },
      department: { en: "Management", bn: "ম্যানেজমেন্ট" },
      image: ProfessorImg,
    },
    {
      name: { en: "Dr ABM Zakariya", bn: "ডা. এবিএম জাকারিয়া" },
      designation: { en: "Senior Faculty", bn: "সিনিয়র ফ্যাকাল্টি" },
      department: {
        en: "Diploma In Islamic Studies",
        bn: "ডিপ্লোমা ইন ইসলামিক স্টাডিজ",
      },
      image: drABM,
    },
    {
      name: { en: "Dr Zubayer Ahsanul Haque", bn: "ডা. জুবায়ের আহসানুল হক" },
      designation: { en: "Senior Faculty", bn: "সিনিয়র ফ্যাকাল্টি" },
      department: {
        en: "Diploma In Islamic Studies",
        bn: "ডিপ্লোমা ইন ইসলামিক স্টাডিজ",
      },
      image: Jubair,
    },
    {
      name: { en: "Dr Meer Monjur Mahmud", bn: "ডা. মীর মনজুর মাহমুদ" },
      designation: { en: "Senior Faculty", bn: "সিনিয়র ফ্যাকাল্টি" },
      department: {
        en: "Diploma In Islamic Studies",
        bn: "ডিপ্লোমা ইন ইসলামিক স্টাডিজ",
      },
      image: MonjurImg,
    },
    {
      name: { en: "Dr Mohammad Ubaidullah", bn: "ডা. মোহাম্মদ উবায়দুল্লাহ" },
      designation: { en: "Senior Faculty", bn: "সিনিয়র ফ্যাকাল্টি" },
      department: {
        en: "Diploma In Islamic Studies",
        bn: "ডিপ্লোমা ইন ইসলামিক স্টাডিজ",
      },
      image: Ubauddin,
    },
    {
      name: { en: "Dr Abdullah Al Kafi", bn: "ডা. আবদুল্লাহ আল কাফি" },
      designation: { en: "Senior Faculty", bn: "সিনিয়র ফ্যাকাল্টি" },
      department: {
        en: "Diploma In Islamic Studies",
        bn: "ডিপ্লোমা ইন ইসলামিক স্টাডিজ",
      },
      image: abdullahkafi,
    },
    {
      name: { en: "Dr Motiul Islam", bn: "ডা. মতিউল ইসলাম" },
      designation: { en: "Senior Faculty", bn: "সিনিয়র ফ্যাকাল্টি" },
      department: {
        en: "Diploma In Islamic Studies",
        bn: "ডিপ্লোমা ইন ইসলামিক স্টাডিজ",
      },
      image: Motiul,
    },
    {
      name: { en: "Hossain Mohammad Hidoy", bn: "হোসাইন মোহাম্মদ হিদয়ত" },
      designation: { en: "Co Ordinator", bn: "কো-অর্ডিনেটর" },
      department: {
        en: "Diploma In Islamic Studies",
        bn: "ডিপ্লোমা ইন ইসলামিক স্টাডিজ",
      },
      image: HidoyImg,
    },
    {
      name: { en: "Jakariya Masud", bn: "জাকারিয়া মাসুদ" },
      designation: { en: "Senior Faculty", bn: "সিনিয়র ফ্যাকাল্টি" },
      department: {
        en: "Diploma In Islamic Studies",
        bn: "ডিপ্লোমা ইন ইসলামিক স্টাডিজ",
      },
      image: JakariyahmasudImg,
    },
    {
      name: { en: "Abdullah Al Mamun", bn: "আবদুল্লাহ আল মামুন" },
      designation: { en: "Co Ordinator", bn: "কো-অর্ডিনেটর" },
      department: { en: "Allimiyah", bn: "আলিমিয়াহ" },
      image: Aldullahalmamun,
    },
    {
      name: { en: "Marjan Ahmad", bn: "মারজান আহমেদ" },
      designation: { en: "Senior Teacher", bn: "সিনিয়র শিক্ষক" },
      department: { en: "Allimiyah", bn: "আলিমিয়াহ" },
      image: Avatorboys,
    },
    {
      name: { en: "Atiqullah Sahid", bn: "আতিকুল্লাহ সাহিদ" },
      designation: { en: "Junior Teacher", bn: "জুনিয়র শিক্ষক" },
      department: { en: "Allimiyah", bn: "আলিমিয়াহ" },
      image: Atiqullah,
    },
    {
      name: { en: "Emam Hussain", bn: "ইমাম হুসাইন" },
      designation: { en: "Junior Faculty", bn: "জুনিয়র ফ্যাকাল্টি" },
      department: {
        en: "Diploma In Islamic Studies",
        bn: "ডিপ্লোমা ইন ইসলামিক স্টাডিজ",
      },
      image: ImamhossainImg,
    },
    {
      name: { en: "Al Amin", bn: "আল আমিন" },
      designation: { en: "Junior Teacher", bn: "জুনিয়র শিক্ষক" },
      department: { en: "Allimiyah", bn: "আলিমিয়াহ" },
      image: AlminImg,
    },
    {
      name: { en: "Jubair Hussain", bn: "জুবাইর হুসাইন" },
      designation: { en: "Junior Teacher", bn: "জুনিয়র শিক্ষক" },
      department: { en: "Allimiyah", bn: "আলিমিয়াহ" },
      image: Jaber,
    },
    {
      name: { en: "Mujahudul Islam", bn: "মুজাহিদুল ইসলাম" },
      designation: { en: "Senior Teacher", bn: "সিনিয়র শিক্ষক" },
      department: { en: "Quran Studies", bn: "কুরআন স্টাডিজ" },
      image: MujahidImg,
    },
    {
      name: { en: "Abu Noman", bn: "আবু নোমান" },
      designation: { en: "Senior Teacher", bn: "সিনিয়র শিক্ষক" },
      department: { en: "Quran Studies", bn: "কুরআন স্টাডিজ" },
      image: AbunumanImg,
    },
    {
      name: { en: "Salman Ahmad", bn: "সালমান আহমেদ" },
      designation: { en: "Senior Teacher", bn: "সিনিয়র শিক্ষক" },
      department: { en: "Quran Studies", bn: "কুরআন স্টাডিজ" },
      image: SalmanImg,
    },
    {
      name: { en: "Jubayer Ahmad", bn: "যুবায়ের আহমেদ" },
      designation: { en: "Senior Teacher", bn: "সিনিয়র শিক্ষক" },
      department: { en: "Quran For Elders", bn: "কুরআন ফর এল্ডার্স" },
      image: JUbayer,
    },
    {
      name: { en: "Ahmad Jaber", bn: "আহমেদ জাবের" },
      designation: { en: "Junior Teacher", bn: "জুনিয়র শিক্ষক" },
      department: { en: "Quran Studies", bn: "কুরআন স্টাডিজ" },
      image: Ahmedjaber,
    },
    {
      name: { en: "Mahmudur Rahman", bn: "মাহমুদুর রহমান" },
      designation: { en: "Junior Teacher", bn: "জুনিয়র শিক্ষক" },
      department: { en: "Quran Studies", bn: "কুরআন স্টাডিজ" },
      image: MahmudulImg,
    },
    {
      name: { en: "Sarder Al Mahmud", bn: "সর্দার আল মাহমুদ" },
      designation: { en: "Faculty", bn: "ফ্যাকাল্টি" },
      department: {
        en: "Diploma In Islamic Studies",
        bn: "ডিপ্লোমা ইন ইসলামিক স্টাডিজ",
      },
      image: Avatorboys,
    },
    {
      name: { en: "Sayed Al Amin", bn: "সায়েদ আল আমিন" },
      designation: { en: "Junior Faculty", bn: "জুনিয়র ফ্যাকাল্টি" },
      department: {
        en: "Diploma In Islamic Studies",
        bn: "ডিপ্লোমা ইন ইসলামিক স্টাডিজ",
      },
      image: Avatorboys,
    },
    {
      name: { en: "Suraiya Akhtar", bn: "সুরাইয়া আক্তার" },
      designation: { en: "Junior Teacher", bn: "জুনিয়র শিক্ষক" },
      department: { en: "Quran Studies", bn: "কুরআন স্টাডিজ" },
      image: Avator,
    },
    {
      name: { en: "Sumaiya Afrin Mim", bn: "সুমাইয়া আফরিন মিম" },
      designation: { en: "Junior Teacher", bn: "জুনিয়র শিক্ষক" },
      department: { en: "Quran For Elders", bn: "কুরআন ফর এল্ডার্স" },
      image: Avator,
    },
    {
      name: { en: "Tarikul Islam", bn: "তরিকুল ইসলাম" },
      designation: { en: "Senior Admin", bn: "সিনিয়র অ্যাডমিন" },
      department: { en: "Institute", bn: "ইন্সটিটিউট" },
      image: TorikImg,
    },
  ];

  return (
    <div className="bg-white py-12 px-4 md:px-20 lg:px-40">
      <div className="mb-8 text-center">
        <h2 className="text-2xl sm:text-3xl font-bold text-blue-600 mb-2">
          {t({ en: "TEACHERS & FACULTIES", bn: "শিক্ষক ও ফ্যাকাল্টিবৃন্দ" })}
        </h2>
        <p className="text-gray-600 text-sm sm:text-base">
          {t({
            en: "Our honourable teachers and faculty members",
            bn: "আমাদের সম্মানিত শিক্ষক ও ফ্যাকাল্টিবৃন্দ",
          })}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {facultyMembers.map((faculty, index) => (
          <div
            key={index}
            className="border p-5 rounded-xl shadow-sm hover:shadow-md transition-shadow flex flex-col items-center text-center bg-white"
          >
            <div className="w-28 h-28 bg-gray-100 rounded-xl overflow-hidden mb-4 flex items-center justify-center border border-gray-100">
              {faculty.image ? (
                <img
                  src={faculty.image}
                  alt={t(faculty.name)}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-gray-400 text-xs font-medium">
                  No Image
                </span>
              )}
            </div>
            <h4 className="font-bold text-gray-900 text-lg">
              {t(faculty.name)}
            </h4>
            <p className="text-xs text-blue-600 font-semibold mt-1">
              {t(faculty.designation)}
            </p>
            <p className="text-xs text-gray-500 mt-1 font-medium">
              {t(faculty.department)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Faculty;
