import React from "react";
import { Link } from "react-router-dom"; // Change to "next/link" if using Next.js
import { useLanguage } from "../../context/useLanguage";

const BlogCard = ({
  slug,
  category,
  title,
  author,
  date,
  readTime,
  comments,
  desc,
  readMoreText,
  byText,
  dateText,
}) => (
  <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow duration-300">
    <div className="p-5">
      <span className="inline-block bg-teal-600 text-white text-xs px-2 py-1 rounded mb-3">
        {category}
      </span>
      <p className="text-xs text-gray-500 mb-2">
        {byText}: {author} | {dateText}: {date}
      </p>
      <h3 className="font-bold text-gray-800 mb-3 leading-tight">{title}</h3>
      <p className="text-xs text-gray-500 mb-4">
        {readTime} | {comments}
      </p>
      <p className="text-sm text-gray-600 mb-4 leading-relaxed line-clamp-3">
        {desc}
      </p>
      {/* Dynamic route based on slug */}
      <Link
        to={`/blog/${slug}`}
        className="text-teal-600 font-bold text-sm hover:underline inline-block"
      >
        {readMoreText}
      </Link>
    </div>
  </div>
);

const BlogSection = () => {
  const { t } = useLanguage();

  const posts = [
    {
      slug: "importance-of-environment-in-child-development",
      category: t({ en: "Learning Islam", bn: "ইসলাম শিক্ষা" }),
      title: t({
        en: "The Importance Of Environment In Child Development",
        bn: "শিশুর বিকাশ ও গঠনে পরিবেশের গুরুত্ব",
      }),
      author: "tarbiyahedu",
      date: "08/20/2024",
      readTime: t({ en: "2 min read", bn: "২ মিনিট পঠন" }),
      comments: t({ en: "0 comment", bn: "০ মন্তব্য" }),
      desc: t({
        en: "The environment plays an indispensable role in the development of a child. It holds a significant place in the physical, mental, and social growth of...",
        bn: "শিশুর মানসিক ও শারীরিক বৃদ্ধিতে পরিবেশ এক অনন্য ও অপরিহার্য ভূমিকা পালন করে। শিশুর সামগ্রিক বিকাশের জন্য একটি উপযুক্ত পরিবেশ...",
      }),
    },
    {
      slug: "conquest-of-mecca-and-farewell-hajj",
      category: t({ en: "Islamic History", bn: "ইসলামিক ইতিহাস" }),
      title: t({
        en: "The Conquest Of Mecca And The Lessons Of The Farewell Hajj",
        bn: "মক্কা বিজয় এবং বিদায় হজের শিক্ষা",
      }),
      author: "tarbiyahedu",
      date: "08/19/2024",
      readTime: t({ en: "1 min read", bn: "১ মিনিট পঠন" }),
      comments: t({ en: "0 comment", bn: "০ মন্তব্য" }),
      desc: t({
        en: "The conquest of Mecca and the Farewell Hajj are two extremely important events in Islamic history. These two events give us important lessons about Islamic principles, morality, and human rights.",
        bn: "ইসলামের ইতিহাসে মক্কা বিজয় এবং বিদায় হজ দুটি অত্যন্ত গুরুত্বপূর্ণ ঘটনা। এই দুটি ঘটনা আমাদেরকে ইসলামের মূলনীতি, নৈতিকতা এবং মানবাধিকার বিষয়ে গুরুত্বপূর্ণ শিক্ষা দেয়।",
      }),
    },
    {
      slug: "accomplished-thinkers-transcend-age-barriers",
      category: t({ en: "Learning Islam", bn: "ইসলাম শিক্ষা" }),
      title: t({
        en: "Accomplished Thinkers Transcend Age Barriers In Attaining Knowledge",
        bn: "জ্ঞান অর্জনে বয়স কোনো বাধা নয়",
      }),
      author: "tarbiyahedu",
      date: "08/17/2024",
      readTime: t({ en: "7 min read", bn: "৭ মিনিট পঠন" }),
      comments: t({ en: "0 comment", bn: "০ মন্তব্য" }),
      desc: t({
        en: "Achieving knowledge at a mature age. Peace be upon the Companions who accepted Islam. Not all were small; Rather, many of them were older. Age is never a barrier...",
        bn: "প্রৌঢ় বা পরিপক্ব বয়সে জ্ঞান অর্জন করা। সাহাবিগণের যুগে অনেকেই বয়সের পরে ইসলাম গ্রহণ করেছিলেন। জ্ঞান অর্জনের ক্ষেত্রে বয়স কখনোই বাধা হতে পারে না...",
      }),
    },
  ];

  return (
    <section className="py-20 px-6 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-center text-3xl font-bold text-gray-800 mb-12 uppercase tracking-widest">
          {t({ en: "BLOG", bn: "ব্লগ" })}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <BlogCard
              key={index}
              {...post}
              readMoreText={t({ en: "Read More", bn: "আরও পড়ুন" })}
              byText={t({ en: "By", bn: "লিখেছেন" })}
              dateText={t({ en: "Date", bn: "তারিখ" })}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
