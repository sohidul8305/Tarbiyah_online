import React from 'react';
import StatsSection from '../../Components/Navbar/StatsSection/StatsSection';
import VideoSection from '../../Components/Navbar/VideoSection/VideoSection';
import SpecialBundleCourse from '../../Components/Navbar/SpecialBundleCourse/SpecialBundleCourse';
import CourseSection from '../../Components/Navbar/CourseSection/CourseSection';
import ContactSection from '../../Components/Navbar/ContactSection/ContactSection';
import FeaturesSection from '../../Components/Navbar/FeaturesSection/FeaturesSection';
import FivePillars from '../../Components/FivePillars/FivePillars';
import SeminarSection from '../../Components/SeminarSection/SeminarSection';
import BlogSection from '../../Components/BlogSection/BlogSection';
import KhutbatulJuma from '../../Components/KhutbatulJuma/KhutbatulJuma';
import Testimonials from '../../Components/Testimonials/Testimonials';
import FAQSection from '../../Components/FAQSection/FAQSection';

const Home = () => {
    return (
        <div>
        <StatsSection></StatsSection>
        <VideoSection></VideoSection>
        <SpecialBundleCourse></SpecialBundleCourse>
        <CourseSection></CourseSection>
        <ContactSection></ContactSection>
        <FeaturesSection></FeaturesSection>
        <FivePillars></FivePillars>
        <SeminarSection></SeminarSection>
        <BlogSection></BlogSection>
        <KhutbatulJuma></KhutbatulJuma>
        <Testimonials></Testimonials>
        <FAQSection></FAQSection>
        </div>
    );
};

export default Home;