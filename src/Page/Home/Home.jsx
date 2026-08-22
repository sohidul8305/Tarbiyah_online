import React from "react";
import { useLanguage } from "../../context/useLanguage"; // আপনার সঠিক পাথ দিয়ে নিবেন
import Banner from "../../Components/Banner/Banner";
import StatsSection from "../../Components/Navbar/StatsSection/StatsSection";
import VideoSection from "../../Components/Navbar/VideoSection/VideoSection";
import SpecialBundleCourse from "../../Components/Navbar/SpecialBundleCourse/SpecialBundleCourse";
import CourseSection from "../../Components/Navbar/CourseSection/CourseSection";
import ContactSection from "../../Components/Navbar/ContactSection/ContactSection";
import FeaturesSection from "../../Components/Navbar/FeaturesSection/FeaturesSection";
import FivePillars from "../../Components/FivePillars/FivePillars";
import SeminarSection from "../../Components/SeminarSection/SeminarSection";
import BlogSection from "../../Components/BlogSection/BlogSection";
import Testimonials from "../../Components/Testimonials/Testimonials";
import FAQSection from "../../Components/FAQSection/FAQSection";

const Home = () => {
  // কনটেক্সট থেকে language এবং t ফাংশনটি নিয়ে নিলাম
  const { language, t } = useLanguage();

  return (
    <div>
      {/* উদাহরণস্বরূপ হোম পেজের গ্লোবাল কোনো টেক্সট বা হেডিং দিতে চাইলে এভাবে দিতে পারেন */}
      {/* বাকি সেকশনগুলো আপনার কোড অনুযায়ী যথারীতি থাকবে */}
      <Banner />
      <StatsSection />
      <VideoSection />
      <CourseSection />
      <ContactSection />
      <FeaturesSection />
      <FivePillars />
      <SeminarSection />
      <BlogSection />
    </div>
  );
};

export default Home;
