import React, { useState, useEffect } from "react";
import { Link } from "react-router";
import {
  FaShareAlt,
  FaHeart,
  FaStar,
  FaCheckCircle,
  FaArrowRight,
  FaPlay,
  FaClock,
  FaYoutube,
  FaBookOpen,
} from "react-icons/fa";
import { useLanguage } from "../../context/useLanguage";
import chollisCoverImg from "../../image/40radiscover.jpg";
import Navbar from "../Navbar/Navbar";
import Footer from "../Navbar/Footer/Footer";

// YouTube Playlist ID
const PLAYLIST_ID = "PL5NEyrYiCAFFMOCS6O8fTR0nS2PEuAAl8";
// Replace with your actual YouTube Data API key
const YOUTUBE_API_KEY = "YOUR_YOUTUBE_API_KEY";

const Imam_nabawi_details = () => {
  const languageContext = useLanguage();
  const t = languageContext ? languageContext.t : (key) => key;
  const language = languageContext ? languageContext.language : "en";

  const [activeTab, setActiveTab] = useState("overview");
  const [videos, setVideos] = useState([]);
  const [loadingVideos, setLoadingVideos] = useState(false);
  const [videoError, setVideoError] = useState(null);

  // Fetch playlist videos from YouTube API
  useEffect(() => {
    const fetchPlaylistVideos = async () => {
      setLoadingVideos(true);
      setVideoError(null);
      try {
        const response = await fetch(
          `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=${PLAYLIST_ID}&key=${YOUTUBE_API_KEY}`,
        );
        if (!response.ok) {
          throw new Error(`API error: ${response.status}`);
        }
        const data = await response.json();
        if (data.items) {
          setVideos(data.items);
        } else {
          setVideos([]);
        }
      } catch (err) {
        console.error("Error fetching YouTube playlist:", err);
        setVideoError(
          language === "bn"
            ? "ভিডিও লোড করতে সমস্যা হয়েছে। দয়া করে পরে আবার চেষ্টা করুন।"
            : "Failed to load videos. Please try again later.",
        );
      } finally {
        setLoadingVideos(false);
      }
    };

    // Fetch videos on mount or when active tab changes so both curriculum and videos have access
    fetchPlaylistVideos();
  }, [language]);

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <Navbar></Navbar>
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Top Banner Section */}
        <div className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100 p-4 sm:p-6">
          <div className="w-full h-56 sm:h-80 rounded-xl overflow-hidden shadow-inner bg-teal-50 flex items-center justify-center">
            <img
              // src={chollisCoverImg}
              alt="Imam Nabawi 40 Hadiths"
              className="w-full h-full object-cover rounded-xl"
            />
          </div>

          <div className="mt-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <div className="flex items-center gap-4 text-sm text-gray-500 mb-2">
                <button className="flex items-center gap-1 hover:text-teal-600 transition-colors">
                  <FaShareAlt /> {language === "bn" ? "শেয়ার" : "Share"}
                </button>
                <button className="flex items-center gap-1 hover:text-red-500 transition-colors">
                  <FaHeart /> {language === "bn" ? "উইশলিস্ট" : "Wishlist"}
                </button>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-teal-800">
                {language === "bn"
                  ? "ইমাম নববীর ৪০ হাদিস কোর্স"
                  : "Imam Nabawi's 40 Hadiths Course"}
              </h1>
            </div>

            <div className="flex items-center gap-1 text-yellow-500 bg-yellow-50 px-3 py-1.5 rounded-lg border border-yellow-100">
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
              <span className="text-gray-700 text-sm font-bold ml-1">
                ৫.০ (৫ রেটিং)
              </span>
            </div>
          </div>
        </div>

        {/* Main Content & Sidebar Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left / Main Details (2 Columns) */}
          <div className="lg:col-span-2 space-y-8">
            {/* Tabs */}
            <div className="flex border-b border-gray-200 gap-8 overflow-x-auto">
              <button
                onClick={() => setActiveTab("overview")}
                className={`pb-3 font-bold text-base transition-colors border-b-2 whitespace-nowrap ${
                  activeTab === "overview"
                    ? "border-teal-600 text-teal-700"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                {language === "bn" ? "কোর্স ওভারভিউ" : "Overview"}
              </button>
              <button
                onClick={() => setActiveTab("curriculum")}
                className={`pb-3 font-bold text-base transition-colors border-b-2 whitespace-nowrap ${
                  activeTab === "curriculum"
                    ? "border-teal-600 text-teal-700"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                {language === "bn"
                  ? "সিলাবাস (৪০ হাদিস)"
                  : "Curriculum (40 Hadiths)"}
              </button>
              <button
                onClick={() => setActiveTab("videos")}
                className={`pb-3 font-bold text-base transition-colors border-b-2 whitespace-nowrap ${
                  activeTab === "videos"
                    ? "border-teal-600 text-teal-700"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                <FaYoutube className="inline mr-1 text-red-500" />
                {language === "bn" ? "ভিডিও লেসন" : "Video Lessons"}
              </button>
            </div>

            {/* Overview Tab Content */}
            {activeTab === "overview" && (
              <>
                <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100 space-y-4">
                  <h2 className="text-xl font-bold text-teal-800 border-b pb-2">
                    {language === "bn" ? "কোর্স সম্পর্কে" : "ABOUT COURSE"}
                  </h2>
                  <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                    {language === "bn"
                      ? "ইমাম নববীর ৪০ হাদিস ইসলামী শরীয়তের অন্যতম মৌলিক ও সর্বজনস্বীকৃত সংকলন। এতে দ্বীনের মূল ভিত্তি, আখলাক, আমল ও মুআমালাতের অত্যন্ত গুরুত্বপূর্ণ ৪০টি হাদিস স্থান পেয়েছে। এই কোর্সটির মাধ্যমে শিক্ষার্থীরা খুব সহজেই হাদিসগুলো অর্থ, ব্যাখ্যা ও আমলী শিক্ষা সহ আয়ত্ত করতে পারবেন।"
                      : "Imam Nabawi's 40 Hadiths is one of the most fundamental and universally accepted collections in Islamic Shariah. It covers the core foundations of faith, ethics, actions, and daily practices. This course helps students easily learn and memorize these essential narrations with proper explanations."}
                  </p>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100 space-y-4">
                  <h2 className="text-xl font-bold text-teal-800 border-b pb-2">
                    {language === "bn"
                      ? "যা অর্জন করবেন"
                      : "WHAT YOU WILL GAIN"}
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                      language === "bn"
                        ? "ইমাম নববীর ৪০টি হাদিস মুখস্থ ও অর্থসহ আত্মস্থকরণ"
                        : "Memorize & understand the 40 Hadiths",
                      language === "bn"
                        ? "হাদিসগুলোর প্র্যাকটিক্যাল লাইফ ইমপ্লিমেন্টেশন"
                        : "Practical implementation in daily life",
                      language === "bn"
                        ? "ইসলামের মৌলিক বিধান ও সুন্নাহর গভীর জ্ঞান"
                        : "Deep knowledge of Islamic core laws",
                      language === "bn"
                        ? "সহিহ উচ্চারণ ও সুন্দরভাবে রিডিং পড়ার দক্ষতা"
                        : "Proper pronunciation and recitation skills",
                    ].map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-2 text-gray-700 text-sm"
                      >
                        <span className="text-teal-600 font-bold">»</span>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100 space-y-4">
                  <h2 className="text-xl font-bold text-teal-800 border-b pb-2">
                    {language === "bn"
                      ? "কার জন্য এই কোর্স"
                      : "TARGET AUDIENCE"}
                  </h2>
                  <div className="space-y-2">
                    {[
                      language === "bn"
                        ? "যারা হাদিস শেখার প্রাথমিক ভিত্তি মজবুত করতে চান"
                        : "Those who want a strong foundation in Hadith studies",
                      language === "bn"
                        ? "শিশু, কিশোর ও যেকোনো বয়সের দ্বীনপ্রিয় শিক্ষার্থী"
                        : "Kids, teens, and learners of all ages",
                      language === "bn"
                        ? "সহজ পদ্ধতিতে সহিহ হাদিস মুখস্থ করতে ইচ্ছুক ব্যক্তিবর্গ"
                        : "Anyone willing to easily memorize authentic hadiths",
                    ].map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-2 text-gray-700 text-sm"
                      >
                        <span className="text-orange-500 font-bold">✓</span>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100 space-y-4">
                  <h2 className="text-xl font-bold text-teal-800 border-b pb-2">
                    {language === "bn"
                      ? "কোর্স ম্যাটেরিয়ালস"
                      : "MATERIALS INCLUDED"}
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                      language === "bn"
                        ? "রেগুলার ক্লাসের পিডিএফ নোটস"
                        : "Regular PDF Notes",
                      language === "bn"
                        ? "রেকর্ডেড ক্লাসের আনলিমিটেড অ্যাক্সেস"
                        : "Unlimited Recorded Access",
                      language === "bn"
                        ? "কোর্স শেষে ভেরিফাইড সার্টিফিকেট"
                        : "Verified Certificate",
                      language === "bn"
                        ? "সাপ্তাহিক লাইভ সেশন ও প্রশ্নোত্তর"
                        : "Weekly Live Q&A Sessions",
                    ].map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-2 text-gray-700 text-sm"
                      >
                        <FaCheckCircle className="text-teal-600 text-sm" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100 space-y-4">
                  <h2 className="text-xl font-bold text-teal-800 border-b pb-2">
                    {language === "bn" ? "ফি স্ট্রাকচার" : ""}
                  </h2>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1 bg-teal-50 border border-teal-100 p-4 rounded-xl text-center">
                      <p className="text-sm text-gray-600">
                        {language === "bn" ? "ভর্তি ফি" : "Admission Fee"}
                      </p>
                    </div>
                    <div className="flex-1 bg-emerald-50 border border-emerald-100 p-4 rounded-xl text-center">
                      <p className="text-sm text-gray-600">
                        {language === "bn" ? "মাসিক ফি" : "Monthly Fee"}
                      </p>
                      <p className="text-xl font-bold text-emerald-800">
                        ১০০০ টাকা
                      </p>
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* Curriculum Tab Content (40 Hadiths Dynamic List) */}
            {activeTab === "curriculum" && (
              <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100 space-y-6">
                <div className="flex items-center justify-between border-b pb-2">
                  <h2 className="text-xl font-bold text-teal-800">
                    {language === "bn"
                      ? "৪০ হাদিস সিলেবাস ও লেসন লিস্ট"
                      : "40 Hadiths Curriculum & Lessons"}
                  </h2>
                  <span className="text-sm bg-teal-50 text-teal-700 px-3 py-1 rounded-full font-medium border border-teal-100">
                    {language === "bn"
                      ? `মোট ${videos.length > 0 ? videos.length : 40} লেসন`
                      : `Total ${videos.length > 0 ? videos.length : 40} Lessons`}
                  </span>
                </div>

                {loadingVideos ? (
                  <div className="flex justify-center items-center py-12">
                    <div className="animate-spin rounded-full h-10 w-10 border-4 border-teal-600 border-t-transparent"></div>
                  </div>
                ) : videos.length > 0 ? (
                  <div className="space-y-3">
                    {videos.map((item, index) => {
                      const snippet = item.snippet;
                      const videoId = snippet.resourceId.videoId;
                      const title = snippet.title;
                      return (
                        <a
                          key={videoId}
                          href={`https://www.youtube.com/watch?v=${videoId}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-between p-4 rounded-xl bg-gray-50 hover:bg-teal-50/50 border border-gray-100 hover:border-teal-200 transition-all group"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-lg bg-teal-100 text-teal-800 font-bold flex items-center justify-center text-sm group-hover:bg-teal-600 group-hover:text-white transition-colors">
                              {index + 1}
                            </div>
                            <div>
                              <h4 className="font-medium text-gray-800 text-sm sm:text-base group-hover:text-teal-700 transition-colors line-clamp-1">
                                {title}
                              </h4>
                              <p className="text-xs text-gray-500 mt-0.5 flex items-center gap-1">
                                <FaBookOpen
                                  size={11}
                                  className="text-teal-600"
                                />
                                {language === "bn"
                                  ? `হাদিস ক্লাস ${index + 1}`
                                  : `Hadith Class ${index + 1}`}
                              </p>
                            </div>
                          </div>
                          <span className="text-xs bg-white border border-gray-200 text-red-600 px-3 py-1.5 rounded-lg flex items-center gap-1 group-hover:bg-red-600 group-hover:text-white group-hover:border-red-600 transition-colors">
                            <FaPlay size={10} />
                            {language === "bn" ? "শুরু করুন" : "Start"}
                          </span>
                        </a>
                      );
                    })}
                  </div>
                ) : (
                  <div className="space-y-3">
                    {/* Fallback list if API fails or hasn't loaded yet */}
                    {[...Array(40)].map((_, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-4 rounded-xl bg-gray-50 border border-gray-100"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-lg bg-teal-100 text-teal-800 font-bold flex items-center justify-center text-sm">
                            {index + 1}
                          </div>
                          <h4 className="font-medium text-gray-800 text-sm sm:text-base">
                            {language === "bn"
                              ? `হাদিস নং ${index + 1}: ইমাম নববীর ৪০ হাদিস লেসন`
                              : `Hadith No ${index + 1}: Imam Nabawi 40 Hadiths Lesson`}
                          </h4>
                        </div>
                        <span className="text-xs text-gray-500 bg-white px-3 py-1.5 rounded-lg border border-gray-200">
                          {language === "bn" ? "আসন্ন" : "Upcoming"}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Videos Tab Content */}
            {activeTab === "videos" && (
              <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100 space-y-4">
                <div className="flex items-center justify-between border-b pb-2">
                  <h2 className="text-xl font-bold text-teal-800">
                    {language === "bn"
                      ? "সমস্ত ভিডিও লেসন"
                      : "All Video Lessons"}
                  </h2>
                  <a
                    href={`https://www.youtube.com/playlist?list=${PLAYLIST_ID}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-red-500 hover:text-red-700 font-medium flex items-center gap-1"
                  >
                    <FaYoutube />
                    {language === "bn" ? "প্লেলিস্ট দেখুন" : "View Playlist"}
                  </a>
                </div>

                {loadingVideos ? (
                  <div className="flex justify-center items-center py-12">
                    <div className="animate-spin rounded-full h-10 w-10 border-4 border-teal-600 border-t-transparent"></div>
                  </div>
                ) : videoError ? (
                  <div className="text-center py-8 text-red-500">
                    {videoError}
                  </div>
                ) : videos.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    {language === "bn"
                      ? "কোন ভিডিও পাওয়া যায়নি।"
                      : "No videos found."}
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {videos.map((item, index) => {
                      const snippet = item.snippet;
                      const videoId = snippet.resourceId.videoId;
                      const title = snippet.title;
                      const thumbnails = snippet.thumbnails;
                      const thumbnailUrl =
                        thumbnails.medium?.url || thumbnails.default?.url || "";
                      const publishedAt = snippet.publishedAt
                        ? new Date(snippet.publishedAt).toLocaleDateString(
                            language === "bn" ? "bn-BD" : "en-US",
                            { year: "numeric", month: "short", day: "numeric" },
                          )
                        : "";

                      return (
                        <a
                          key={videoId}
                          href={`https://www.youtube.com/watch?v=${videoId}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group block bg-gray-50 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-gray-100"
                        >
                          <div className="relative aspect-video bg-gray-200">
                            {thumbnailUrl ? (
                              <img
                                src={thumbnailUrl}
                                alt={title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                loading="lazy"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center bg-gray-300 text-gray-500">
                                <FaYoutube size={40} />
                              </div>
                            )}
                            <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                              <div className="bg-red-600 rounded-full p-3 shadow-lg">
                                <FaPlay className="text-white text-xl ml-0.5" />
                              </div>
                            </div>
                            <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
                              {language === "bn"
                                ? `ক্লাস ${index + 1}`
                                : `Class ${index + 1}`}
                            </div>
                          </div>
                          <div className="p-3">
                            <h3 className="font-medium text-gray-800 text-sm line-clamp-2 group-hover:text-teal-700 transition-colors">
                              {title}
                            </h3>
                            <div className="flex items-center justify-between mt-1 text-xs text-gray-500">
                              <span>{publishedAt}</span>
                              <span className="flex items-center gap-1">
                                <FaClock size={10} />
                                {language === "bn" ? "ভিডিও" : "Video"}
                              </span>
                            </div>
                          </div>
                        </a>
                      );
                    })}
                  </div>
                )}

                {videos.length > 0 && (
                  <div className="text-center pt-4">
                    <a
                      href={`https://www.youtube.com/playlist?list=${PLAYLIST_ID}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 rounded-lg transition-colors"
                    >
                      <FaYoutube />
                      {language === "bn"
                        ? "সমস্ত ভিডিও দেখুন (YouTube)"
                        : "Watch All Videos (YouTube)"}
                    </a>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Right Sidebar (1 Column) */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sticky top-6 text-center space-y-6">
              <div className="rounded-xl overflow-hidden shadow-sm h-44 bg-teal-50 flex items-center justify-center">
                <img
                  src={chollisCoverImg}
                  alt="Banner Sidebar"
                  className="w-full h-full object-cover rounded-xl"
                />
              </div>

              <div className="space-y-2">
                <span className="text-xs uppercase tracking-wider font-semibold text-teal-600 bg-teal-50 px-3 py-1 rounded-full border border-teal-100">
                  {language === "bn" ? "রেজিস্ট্রেশন চলছে" : "Enrollment Open"}
                </span>
                <h3 className="text-xl font-bold text-gray-800">
                  {language === "bn"
                    ? "কোর্সটিতে জয়েন করুন"
                    : "Join This Course"}
                </h3>
              </div>

              <Link to="/admission" className="block w-full">
                <button className="w-full bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white font-bold py-3.5 px-6 rounded-xl shadow-lg transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2">
                  <span>{language === "bn" ? "এপ্লাই করুন" : "Apply Now"}</span>
                  <FaArrowRight className="text-xs" />
                </button>
              </Link>

              <div className="pt-4 border-t border-gray-100 text-left space-y-3 text-sm text-gray-600">
                <div className="flex justify-between">
                  <span className="font-medium">
                    {language === "bn" ? "কোর্স লেভেল:" : "Level:"}
                  </span>
                  <span>{language === "bn" ? "সকলের জন্য" : "All Levels"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">
                    {language === "bn" ? "মোট ক্লাস:" : "Total Classes:"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">
                    {language === "bn" ? "ভাষা:" : "Language:"}
                  </span>
                  <span>বাংলা</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default Imam_nabawi_details;
