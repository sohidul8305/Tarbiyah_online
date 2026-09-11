import React from "react";
import { useLanguage } from "../../context/useLanguage";
import Banner from "../../Components/Banner/Banner";
import StatsSection from "../../Components/Navbar/StatsSection/StatsSection";
import VideoSection from "../../Components/Navbar/VideoSection/VideoSection";
import ContactSection from "../../Components/Navbar/ContactSection/ContactSection";
import FeaturesSection from "../../Components/Navbar/FeaturesSection/FeaturesSection";
import FivePillars from "../../Components/FivePillars/FivePillars";
import SeminarSection from "../../Components/SeminarSection/SeminarSection";
import BlogSection from "../../Components/BlogSection/BlogSection";
import Our_video from "../../Components/Our_video/Our_video";
import Live_course from "../Live_course/Live_course";
import Our_record_course from "../../Components/Our_record_course/Our_record_course";

const Home = () => {
  const { language, t } = useLanguage();

  return (
    <div>
      <Banner />
      <StatsSection />
      <VideoSection />
      <Live_course></Live_course>
      <Our_record_course></Our_record_course>
      <ContactSection />
      <FeaturesSection />
      <FivePillars />
      <SeminarSection />
      <BlogSection />
      <Our_video></Our_video>
    </div>
  );
};

export default Home;
