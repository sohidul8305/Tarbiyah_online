import React from 'react';
import { BookOpen, UserCheck, Video, Smartphone, Headset, Award } from 'lucide-react';

const features = [
  { icon: <BookOpen size={40} className="text-teal-600" />, title: "STUDY MATERIAL", desc: "Courses have been carefully designed to take students to a level of mastery delivered through engaging video modules, PDFs, short quizzes and final exams." },
  { icon: <UserCheck size={40} className="text-teal-600" />, title: "CERTIFIED INSTRUCTOR", desc: "We have qualified and experienced Shari'ah scholars graduated from world renowned universities & certified by the experts in their respective fields." },
  { icon: <Video size={40} className="text-teal-600" />, title: "LIVE AND INTERACTIVE SESSIONS", desc: "Our live interactive sessions will give you an opportunity to communicate with our lecturers, network with your fellow learners and to participate in Q & A sessions." },
  { icon: <Smartphone size={40} className="text-orange-500" />, title: "STUDY ON THE GO", desc: "Courses are completely on-demand, so that students can learn at their own pace. Courses are designed to give students maximum impact for their limited time." },
  { icon: <Headset size={40} className="text-teal-600" />, title: "ONLINE SUPPORT", desc: "24/7 online access to the course material including video recordings, presentations, course notes and assessments." },
  { icon: <Award size={40} className="text-orange-500" />, title: "CERTIFICATE", desc: "Certificates will be awarded upon successful completion of the courses to recognise your achievement." },
];

const FeaturesSection = () => {
  return (
    <section className="py-20 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-y-12">
          {features.map((item, index) => (
            <div 
              key={index} 
              className={`flex flex-col items-center text-center px-8 
                ${index < 3 ? 'md:border-b border-gray-100 pb-12' : ''} 
                ${index % 3 !== 2 ? 'md:border-r border-gray-100' : ''}`}
            >
              <div className="mb-4">{item.icon}</div>
              <h3 className="font-bold text-gray-800 mb-2">{item.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed max-w-xs">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;