import React from "react";
// Swiper এর স্টাইল ইমপোর্ট করুন
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import DiplomaBanner from "../../image/Course-Thumb.png";
import Alemiyah from "../../image/alemiyahkidsbanner.png";
import Najeraadealts from "../../image/najerabanner.jpg";
import HifjulBanner from "../../image/hifjulbanner.png";
import Quidanuraniyah from "../../image/quidanuraniyahbanner.png";

const Banner = () => {
  return (
    <div className="w-full mt-0 mb-30 px-2 sm:px-4 md:px-6">
      {/* কাস্টম অ্যানিমেশনের জন্য স্টাইল ট্যাগ */}
      <style>{`
        @keyframes autoZoom {
          0% {
            transform: scale(1);
          }
          100% {
            transform: scale(1.05);
          }
        }
        .swiper-slide-active .auto-zoom-img {
          animation: autoZoom 4s infinite alternate ease-in-out;
        }
      `}</style>

      {/* বাম-ডানে বড় করার জন্য উইডথ বাড়িয়ে দেওয়া হয়েছে */}
      <div className="w-full max-w-[100%] xl:max-w-[100%] mx-auto rounded-xl overflow-hidden shadow-lg">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={0}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          className="h-[250px] sm:h-[350px] md:h-[450px] lg:h-[500px] w-full bg-black"
        >
          {/* স্লাইড ১ (DiplomaBanner - object-fill দিয়ে পুরো ফ্রেমে ফিট করা হয়েছে) */}
          <SwiperSlide>
            <div className="w-full h-full overflow-hidden bg-black flex items-center justify-center">
              <img
                src={DiplomaBanner}
                alt="Diploma Banner"
                className="w-full h-full object-fill auto-zoom-img"
              />
            </div>
          </SwiperSlide>

          {/* স্লাইড ২ */}
          <SwiperSlide>
            <div className="w-full h-full overflow-hidden bg-black flex items-center justify-center">
              <img
                src={Alemiyah}
                alt="Alemiyah Banner"
                className="w-full h-full object-cover auto-zoom-img"
              />
            </div>
          </SwiperSlide>

          {/* স্লাইড ৩ */}
          <SwiperSlide>
            <div className="w-full h-full overflow-hidden bg-black flex items-center justify-center">
              <img
                src={Najeraadealts}
                alt="Nazera Banner"
                className="w-full h-full object-cover auto-zoom-img"
              />
            </div>
          </SwiperSlide>

          {/* স্লাইড ৪ */}
          <SwiperSlide>
            <div className="w-full h-full overflow-hidden bg-black flex items-center justify-center">
              <img
                src={Quidanuraniyah}
                alt="Qaida Nuraniyah Banner"
                className="w-full h-full object-cover auto-zoom-img"
              />
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
};

export default Banner;
