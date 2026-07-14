import React from 'react';

const BlogCard = ({ category, title, author, date, readTime, comments, desc }) => (
  <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow duration-300">
    <img src="https://images.unsplash.com/photo-1544725176-7c45e5a712c7?q=80&w=600&auto=format&fit=crop" alt={title} className="w-full h-48 object-cover" />
    <div className="p-5">
      <span className="inline-block bg-teal-600 text-white text-xs px-2 py-1 rounded mb-3">{category}</span>
      <p className="text-xs text-gray-500 mb-2">By: {author} | Date: {date}</p>
      <h3 className="font-bold text-gray-800 mb-3 leading-tight">{title}</h3>
      <p className="text-xs text-gray-500 mb-4">{readTime} | {comments}</p>
      <p className="text-sm text-gray-600 mb-4 leading-relaxed line-clamp-3">{desc}</p>
      <a href="#" className="text-teal-600 font-bold text-sm hover:underline">Read More</a>
    </div>
  </div>
);

const BlogSection = () => {
  const posts = [
    { category: "Learning Islam", title: "The Importance Of Environment In Child Development", author: "tarbiyahedu", date: "08/20/2024", readTime: "2 min read", comments: "0 comment", desc: "The environment plays an indispensable role in the development of a child. It holds a significant place in the physical, mental, and social growth of..." },
    { category: "Islamic History", title: "The Conquest Of Mecca And The Lessons Of The Farewell Hajj", author: "tarbiyahedu", date: "08/19/2024", readTime: "1 min read", comments: "0 comment", desc: "ইসলামের ইতিহাসে মক্কা বিজয় এবং বিদায় হজ দুটি অত্যন্ত গুরুত্বপূর্ণ ঘটনা। এই দুটি ঘটনা আমাদেরকে ইসলামের মূলনীতি, নৈতিকতা এবং মানবাধিকার বিষয়ে গুরুত্বপূর্ণ শিক্ষা দেয়। হাদিসের..." },
    { category: "Learning Islam", title: "Accomplished Thinkers Transcend Age Barriers In Attaining Knowledge", author: "tarbiyahedu", date: "08/17/2024", readTime: "7 min read", comments: "0 comment", desc: "Achieving knowledge at a mature age Peace be upon the Companions who accepted Islam. Not all were small; Rather, many of them were older. Age..." },
  ];

  return (
    <section className="py-20 px-6 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-center text-3xl font-bold text-gray-800 mb-12 uppercase tracking-widest">BLOG</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <BlogCard key={index} {...post} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;