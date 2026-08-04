import React from "react";
// Swiper এর স্টাইল ইমপোর্ট করুন
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import DiplomaBanner from "../../image/Diplomabanner.png";
import NajeraBanner from "../../image/najerabanner.png";
import NuraniyahBanner from "../../image/nuranibanner.jpg";
import HifjulBanner from "../../image/hifjulbanner.png";

const Banner = () => {
  return (
    <div className="w-full my-15 mr-10">
      {/* কাস্টম অ্যানিমেশনের জন্য স্টাইল ট্যাগ */}
      <style>{`
        @keyframes autoZoom {
          0% {
            transform: scale(1);
          }
          100% {
            transform: scale(1.08);
          }
        }
        .swiper-slide-active .auto-zoom-img {
          animation: autoZoom 4s infinite alternate ease-in-out;
        }
      `}</style>

      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={0}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        className="h-[350px] sm:h-[400px] md:h-[450px] w-full"
      >
        {/* ৪টি স্লাইড */}
        <SwiperSlide>
          <div className="w-full h-full overflow-hidden bg-black">
            <img
              src={DiplomaBanner}
              alt="Slider 1"
              className="w-full h-full object-cover auto-zoom-img"
            />
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="w-full h-full overflow-hidden bg-black">
            <img
              src={NajeraBanner}
              alt="Slider 2"
              className="w-full h-full object-cover auto-zoom-img"
            />
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="w-full h-full overflow-hidden bg-black">
            <img
              src={NuraniyahBanner}
              alt="Slider 3"
              className="w-full h-full object-cover auto-zoom-img"
            />
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="w-full h-full overflow-hidden bg-black">
            <img
              src={HifjulBanner}
              alt="Slider 4"
              className="w-full h-full object-cover auto-zoom-img"
            />
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Banner;
