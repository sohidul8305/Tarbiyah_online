import React from "react";
// Swiper এর স্টাইল ইমপোর্ট করুন
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

const Banner = () => {
  return (
    <div className="my-10">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={30}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        className="h-[400px] w-full"
      >
        {/* ৪টি স্লাইড */}
        <SwiperSlide>
          <img
            src="https://static.vecteezy.com/system/resources/thumbnails/009/262/862/small/mandala-for-print-invitation-card-poster-cover-brochure-flyer-banner-luxurious-arabic-mandala-background-with-golden-elements-arabic-islamic-oriental-style-ramadan-style-decorative-mandala-vector.jpg"
            alt="Slider 1"
            className="w-full h-full object-cover"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="https://static.vecteezy.com/system/resources/previews/010/979/157/non_2x/madrasa-admission-social-media-banner-template-free-vector.jpg"
            alt="Slider 2"
            className="w-full h-full object-cover"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="https://t4.ftcdn.net/jpg/02/63/14/87/360_F_263148731_URqK7TVJz0a1jaV3IuAdTBuXmoi4lcA6.jpg"
            alt="Slider 3"
            className="w-full h-full object-cover"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="https://t4.ftcdn.net/jpg/05/75/17/05/360_F_575170515_uKi7DvPF3AZpLXVP2AG342sqsSbK6pS2.jpg"
            alt="Slider 4"
            className="w-full h-full object-cover"
          />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Banner;
