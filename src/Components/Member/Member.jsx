import React from "react";
import { useLanguage } from "../../context/useLanguage";
import ShakilImg from "../../image/Shakil.png";
import BariImg from "../../image/bari.png";
import SohanImg from "../../image/sohan.png";
import SohelImg from "../../image/sohel.png";
import Mahfujur from "../../image/mahfuz.png";
import Murad from "../../image/muradshek.png";
import Sowrab from "../../image/surav.png";
import Shohidul from "../../image/sohid.png";
import Kawsar from "../../image/kawser.png";
import Ashik from "../../image/ashik.png";
import yasin from "../../image/yasin.png";
const Members = () => {
  const { t } = useLanguage();

  const membersList = [
    {
      name: { en: "Shakil Ahmmed", bn: "শাকিল আহমেদ" },
      designation: { en: "Incharge", bn: "ইনচার্জ" },
      department: { en: "Management", bn: "ম্যানেজমেন্ট" },
      image: ShakilImg,
    },
    {
      name: { en: "Abdul Bari", bn: "আব্দুল বারি" },
      designation: { en: "Senior Admin", bn: "সিনিয়র অ্যাডমিন" },
      department: {
        en: "Diploma In Islamic Studies",
        bn: "ডিপ্লোমা ইন ইসলামিক স্টাডিজ",
      },
      image: BariImg,
    },
    {
      name: { en: "Sohanur Rahman", bn: "সোহানুর রাহমান " },
      designation: { en: "Junior Admin", bn: "জুনিয়র অ্যাডমিন" },
      department: { en: "Quran Studies", bn: "কুরআন স্টাডিজ" },
      image: SohanImg,
    },
    {
      name: { en: "MD Sohel Rana", bn: "মো. সোহেল রানা" },
      designation: { en: "Junior Admin", bn: "জুনিয়র অ্যাডমিন" },
      department: { en: "Allimiyah", bn: "আলিমিয়াহ" },
      image: SohelImg,
    },
    {
      name: { en: "Mahfujur Rahman", bn: "মাহফুজুর রহমান" },
      designation: { en: "Junior Admin", bn: "জুনিয়র অ্যাডমিন" },
      department: { en: "Quran For Elders", bn: "কুরআন ফর এল্ডার্স" },
      image: Mahfujur,
    },
    {
      name: { en: "Murad Sheikh", bn: "মুরাদ শেখ" },
      designation: { en: "Media Head", bn: "মিডিয়া হেড" },
      department: { en: "Media", bn: "মিডিয়া" },
      image: Murad,
    },
    {
      name: { en: "Sowrab Ahmad", bn: "সৌরভ আহমেদ" },
      designation: { en: "Senior Editor", bn: "সিনিয়র এডিটর" },
      department: { en: "Media", bn: "মিডিয়া" },
      image: Sowrab,
    },
    {
      name: { en: "Ashikur Rahman", bn: "আশিকুর রহমান" },
      designation: { en: "Junior Editor", bn: "জুনিয়র এডিটর" },
      department: { en: "Media", bn: "মিডিয়া" },
      image: Ashik,
    },
    {
      name: { en: "Shohidul Islam", bn: "শহিদুল ইসলাম" },
      designation: { en: "Junior Web Developer", bn: "জুনিয়র ওয়েব ডেভেলপার" },
      department: { en: "Web Development", bn: "ওয়েব ডেভেলপমেন্ট" },
      image: Shohidul,
    },
    {
      name: { en: "Yasin Ahmad Omar ", bn: "ইয়াসিন আহমদ ওমর" },
      designation: { en: "Junior Editor", bn: "জুনিয়র এডিটর" },
      department: { en: "Junior Editor", bn: "জুনিয়র এডিটর" },
      image: yasin,
    },
    {
      name: { en: "Kawsar Ahmad", bn: "কাওসার আহমেদ" },
      designation: { en: "Office Assistant", bn: "অফিস অ্যাসিস্ট্যান্ট" },
      department: { en: "Office", bn: "অফিস" },
      image: Kawsar,
    },
  ];

  return (
    <div className="bg-white py-12 px-4 md:px-20 lg:px-40">
      <div className="mb-8 text-center">
        <h2 className="text-2xl sm:text-3xl font-bold text-blue-600 mb-2">
          {t({ en: "OUR TEAM MEMBERS", bn: "আমাদের টিম মেম্বারবৃন্দ" })}
        </h2>
        <p className="text-gray-600 text-sm sm:text-base">
          {t({
            en: "Our dedicated management and administrative team",
            bn: "আমাদের নিবেদিত প্রাণ ব্যবস্থাপনা ও প্রশাসনিক টিম",
          })}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {membersList.map((member, index) => (
          <div
            key={index}
            className="border p-5 rounded-xl shadow-sm hover:shadow-md transition-shadow flex flex-col items-center text-center bg-white"
          >
            <div className="w-28 h-28 bg-gray-100 rounded-xl overflow-hidden mb-4 flex items-center justify-center border border-gray-100">
              {member.image ? (
                <img
                  src={member.image}
                  alt={t(member.name)}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-gray-400 text-xs font-medium">
                  No Image
                </span>
              )}
            </div>
            <h4 className="font-bold text-gray-900 text-lg">
              {t(member.name)}
            </h4>
            <p className="text-xs text-blue-600 font-semibold mt-1">
              {t(member.designation)}
            </p>
            <p className="text-xs text-gray-500 mt-1 font-medium">
              {t(member.department)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Members;
