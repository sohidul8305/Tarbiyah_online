import React from "react";

const Faculty = () => {
  const guestFaculties = [
    {
      name: "Professor Dr. Abu Bakr Muhammad Zakaria",
      title: "Professor, Islamic University, Kushtia",
      subject: "Subject: Comparative Theology",
      image:
        "https://i.ibb.co.com/WNsqLLQ3/images-q-tbn-ANd9-Gc-QPrj-B86scf-HN0n-Vb1-N5-A9sd3z0y-RT4-OIm-V-d-QDIanuf-A-s-10.jpg",
    },
    {
      name: "Prof. Dr. Yuvair Ehsanul Haque",
      title: "Head of Department, Department of Arabic, University of Dhaka",
      subject: "Subject: Arabic Language",
      image:
        "https://i.ibb.co.com/WNsqLLQ3/images-q-tbn-ANd9-Gc-QPrj-B86scf-HN0n-Vb1-N5-A9sd3z0y-RT4-OIm-V-d-QDIanuf-A-s-10.jpg",
    },
    {
      name: "Prof. Dr. Mir Manzoor Mahmud",
      title: "Prof. Manarat International University",
      subject: "Subject: Seerah and History of Islam",
      image:
        "https://i.ibb.co.com/KjvMfnBD/images-q-tbn-ANd9-Gc-Qml-K-yr-SR8-Nptoi-I1-Ocq-Qi-D02-JYpbyri-Pi-Qjt-R8-Pbc-A-s-10.jpg",
    },
    {
      name: "Dr. Motiul Islam",
      title: "Assistant Professor, Bangladesh Islamic University",
      subject: "Subject: Hadith Studies",
      image:
        "https://i.ibb.co.com/XrpbyQSj/images-q-tbn-ANd9-Gc-SBUj-Eoro-TCvkcp-Ntn8-Xcx2-nl-ZR0-Adi-Pnmuet-Ld-FC5g-s-10.jpg",
    },
    {
      name: "Abul Kasem Mohammad Safiullah, CSAA",
      title: "Member, Central Shariah Board for Islamic Banks of Bangladesh",
      subject: "Subject: Fighuz Zakat",
      image: "https://via.placeholder.com/200",
    },
    {
      name: "Ustaz Zakaria Masood",
      title: "Author, Islamic library and thinker",
      subject: "Subject: Seerah",
      image:
        "https://i.ibb.co.com/7N6SMfBS/images-q-tbn-ANd9-Gc-St-ZM3h4-TQbn-UNt-BH78kk-G37-J18-JW6v-FDYwu-Ka4-Dg-CEi-Q-s-10.jpg",
    },
  ];

  return (
    <div className="bg-white py-12 px-4 md:px-20 lg:px-40">
      {/* CHAIRMAN SECTION */}
      <div className="mb-16">
        <h2 className="text-xl font-bold text-blue-600 border-b-2 border-blue-600 pb-2 mb-8">
          CHAIRMAN & RECTOR
        </h2>
        <div className="flex flex-col md:flex-row gap-8 items-start">
          <img
            src="https://i.ibb.co.com/GQRWh4DW/images-q-tbn-ANd9-Gc-Tw-Ke-AUYuda1bjp-PUU-NYup6-M-P-jlxhnq-Z0-Wb-X6hzw-Rj-HCp-Ys-O6-nc-UY-s-10.jpg"
            alt="Chairman"
            className="rounded shadow-md w-full md:w-80"
          />
          <div>
            <h3 className="text-2xl font-bold text-gray-800">
              Professor Mokhter Ahmad
            </h3>
            <p className="text-gray-600 mt-4 leading-relaxed">
              As ignorance & innovation in the name of religion spread over the
              land of Bengal, people from all walks of life were craving for an
              enlightened soul...
            </p>
          </div>
        </div>
      </div>

      {/* GUEST FACULTIES SECTION */}
      <div>
        <h2 className="text-xl font-bold text-blue-600 border-b-2 border-blue-600 pb-2 mb-8">
          GUEST FACULTIES
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {guestFaculties.map((faculty, index) => (
            <div
              key={index}
              className="border p-4 rounded shadow-sm hover:shadow-lg transition-shadow"
            >
              <img
                src={faculty.image}
                alt={faculty.name}
                className="mx-auto w-32 h-32 rounded object-cover mb-4"
              />
              <h4 className="font-bold text-blue-900 text-center">
                {faculty.name}
              </h4>
              <p className="text-xs text-gray-500 text-center mt-1">
                {faculty.title}
              </p>
              <p className="text-xs font-semibold text-blue-600 text-center mt-2">
                {faculty.subject}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Faculty;
