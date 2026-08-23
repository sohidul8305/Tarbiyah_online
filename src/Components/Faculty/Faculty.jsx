import React from "react";
import { useLanguage } from "../../context/useLanguage"; // আপনার সঠিক পাথ অনুযায়ী এটি ঠিক করে নিবেন

const Faculty = () => {
  const { t } = useLanguage();

  const guestFaculties = [
    {
      name: {
        en: "Professor Dr. Abu Bakr Muhammad Zakaria",
        bn: "প্রফেসর ড. আবু বকর মুহাম্মদ যাকারিয়া",
      },
      title: {
        en: "Professor, Islamic University, Kushtia",
        bn: "প্রফেসর, ইসলামী বিশ্ববিদ্যালয়, কুষ্টিয়া",
      },
      subject: {
        en: "Subject: Comparative Theology",
        bn: "বিষয়: তুলনামূলক ধর্মতত্ত্ব",
      },
      image:
        "https://i.ibb.co.com/WNsqLLQ3/images-q-tbn-ANd9-Gc-QPrj-B86scf-HN0n-Vb1-N5-A9sd3z0y-RT4-OIm-V-d-QDIanuf-A-s-10.jpg",
    },
    {
      name: {
        en: "Prof. Dr. Yuvair Ehsanul Haque",
        bn: "প্রফেসর ড. যুবাইর এহসানুল হক",
      },
      title: {
        en: "Head of Department, Department of Arabic, University of Dhaka",
        bn: "বিভাগীয় প্রধান, আরবি বিভাগ, ঢাকা বিশ্ববিদ্যালয়",
      },
      subject: {
        en: "Subject: Arabic Language",
        bn: "বিষয়: আরবি ভাষা",
      },
      image:
        "https://i.ibb.co.com/WNsqLLQ3/images-q-tbn-ANd9-Gc-QPrj-B86scf-HN0n-Vb1-N5-A9sd3z0y-RT4-OIm-V-d-QDIanuf-A-s-10.jpg",
    },
    {
      name: {
        en: "Prof. Dr. Mir Manzoor Mahmud",
        bn: "প্রফেসর ড. মীর মনজুর মাহমুদ",
      },
      title: {
        en: "Prof. Manarat International University",
        bn: "প্রফেসর, মানারাত ইন্টারন্যাশনাল ইউনিভার্সিটি",
      },
      subject: {
        en: "Subject: Seerah and History of Islam",
        bn: "বিষয়: সীরাত ও ইসলামের ইতিহাস",
      },
      image:
        "https://i.ibb.co.com/KjvMfnBD/images-q-tbn-ANd9-Gc-Qml-K-yr-SR8-Nptoi-I1-Ocq-Qi-D02-JYpbyri-Pi-Qjt-R8-Pbc-A-s-10.jpg",
    },
    {
      name: {
        en: "Dr. Motiul Islam",
        bn: "ড. মতিউল ইসলাম",
      },
      title: {
        en: "Assistant Professor, Bangladesh Islamic University",
        bn: "সহকারী অধ্যাপক, বাংলাদেশ ইসলামী বিশ্ববিদ্যালয়",
      },
      subject: {
        en: "Subject: Hadith Studies",
        bn: "বিষয়: হাদিস স্টাডিজ",
      },
      image:
        "https://i.ibb.co.com/XrpbyQSj/images-q-tbn-ANd9-Gc-SBUj-Eoro-TCvkcp-Ntn8-Xcx2-nl-ZR0-Adi-Pnmuet-Ld-FC5g-s-10.jpg",
    },
    {
      name: {
        en: "Abul Kasem Mohammad Safiullah, CSAA",
        bn: "আবুল কাসেম মোহাম্মদ সফিউল্লাহ, CSAA",
      },
      title: {
        en: "Member, Central Shariah Board for Islamic Banks of Bangladesh",
        bn: "সদস্য, সেন্ট্রাল শরীআহ বোর্ড ফর ইসলামিক ব্যাংকস অব বাংলাদেশ",
      },
      subject: {
        en: "Subject: Fighuz Zakat",
        bn: "বিষয়: ফিকহুল যাকাত",
      },
      image: "https://via.placeholder.com/200",
    },
    {
      name: {
        en: "Ustaz Zakaria Masood",
        bn: "উস্তাজ যাকারিয়া মাসুদ",
      },
      title: {
        en: "Author, Islamic library and thinker",
        bn: "লেখক, ইসলামিক লাইব্রেরি ও চিন্তাবিদ",
      },
      subject: {
        en: "Subject: Seerah",
        bn: "বিষয়: সীরাত",
      },
      image:
        "https://i.ibb.co.com/7N6SMfBS/images-q-tbn-ANd9-Gc-St-ZM3h4-TQbn-UNt-BH78kk-G37-J18-JW6v-FDYwu-Ka4-Dg-CEi-Q-s-10.jpg",
    },
  ];

  return (
    <div className="bg-white py-12 px-4 md:px-20 lg:px-40">
      {/* CHAIRMAN SECTION */}
      <div className="mb-16">
        <h2 className="text-xl font-bold text-blue-600 border-b-2 border-blue-600 pb-2 mb-8">
          {t({ en: "CHAIRMAN & RECTOR", bn: "চেয়ারম্যান ও রেক্টর" })}
        </h2>
        <div className="flex flex-col md:flex-row gap-8 items-start">
          <img
            src="https://i.ibb.co.com/GQRWh4DW/images-q-tbn-ANd9-Gc-Tw-Ke-AUYuda1bjp-PUU-NYup6-M-P-jlxhnq-Z0-Wb-X6hzw-Rj-HCp-Ys-O6-nc-UY-s-10.jpg"
            alt="Chairman"
            className="rounded shadow-md w-full md:w-80 object-cover"
          />
          <div>
            <h3 className="text-2xl font-bold text-gray-800">
              {t({ en: "Professor Mokhter Ahmad", bn: "প্রফেসর মুখতার আহমাদ" })}
            </h3>
            <p className="text-gray-600 mt-4 leading-relaxed">
              {t({
                en: "As ignorance & innovation in the name of religion spread over the land of Bengal, people from all walks of life were craving for an enlightened soul...",
                bn: "বাংলার জমিনে যখন ধর্মের নামে অজ্ঞতা ও বিদআত ছড়িয়ে পড়েছিল, তখন সর্বস্তরের মানুষ একটি আলোকিত আত্মার জন্য আকুল হয়ে উঠেছিল...",
              })}
            </p>
          </div>
        </div>
      </div>

      {/* GUEST FACULTIES SECTION */}
      <div>
        <h2 className="text-xl font-bold text-blue-600 border-b-2 border-blue-600 pb-2 mb-8">
          {t({ en: "GUEST FACULTIES", bn: "অতিথি শিক্ষকবৃন্দ" })}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {guestFaculties.map((faculty, index) => (
            <div
              key={index}
              className="border p-4 rounded shadow-sm hover:shadow-lg transition-shadow"
            >
              <img
                src={faculty.image}
                alt={t(faculty.name)}
                className="mx-auto w-32 h-32 rounded object-cover mb-4"
              />
              <h4 className="font-bold text-blue-900 text-center">
                {t(faculty.name)}
              </h4>
              <p className="text-xs text-gray-500 text-center mt-1">
                {t(faculty.title)}
              </p>
              <p className="text-xs font-semibold text-blue-600 text-center mt-2">
                {t(faculty.subject)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Faculty;
