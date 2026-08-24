import React from "react";
import { useLanguage } from "../../context/useLanguage"; // আপনার সঠিক পাথ অনুযায়ী এটি ঠিক করে নিবেন

const Terms = () => {
  const { t } = useLanguage();

  return (
    <div className="max-w-5xl mx-auto py-12 px-6 text-gray-800 leading-relaxed">
      <h1 className="text-4xl font-bold text-[#004d4d] mb-8 border-b pb-4">
        {t({
          en: "Terms & Conditions",
          bn: "শর্তাবলী ও নীতিমালা (Terms & Conditions)",
        })}
      </h1>

      <div className="space-y-8">
        {/* ১. সাধারণ নিয়ম */}
        <section>
          <h2 className="text-2xl font-semibold text-[#004d4d] mb-3">
            {t({
              en: "1. General Rules",
              bn: "১. সাধারণ নিয়মাবলী",
            })}
          </h2>
          <p>
            {t({
              en: "By using our platform, you agree to comply with all our prescribed rules and terms. We reserve the right to modify or update these terms at any time without notice.",
              bn: "আমাদের প্ল্যাটফর্ম ব্যবহার করার মাধ্যমে আপনি আমাদের নির্ধারিত সকল নিয়ম ও শর্তাবলী মেনে নিতে সম্মত হচ্ছেন। আমরা যেকোনো সময় নোটিশ ছাড়াই এই শর্তাবলী পরিবর্তন বা আপডেট করার অধিকার রাখি।",
            })}
          </p>
        </section>

        {/* ২. কোর্স ও পেমেন্ট */}
        <section>
          <h2 className="text-2xl font-semibold text-[#004d4d] mb-3">
            {t({
              en: "2. Course & Payment Policy",
              bn: "২. কোর্স ও পেমেন্ট নীতিমালা",
            })}
          </h2>
          <ul className="list-disc ml-6 space-y-2">
            <li>
              {t({
                en: "Enrollment will be considered confirmed only after paying the course fee.",
                bn: "কোর্স ফি পরিশোধের পরেই এনরোলমেন্ট নিশ্চিত বলে গণ্য হবে।",
              })}
            </li>
            <li>
              {t({
                en: "For any payment-related complications, you must contact the official support channel.",
                bn: "পেমেন্ট সংক্রান্ত যেকোনো জটিলতার জন্য অফিসিয়াল সাপোর্ট চ্যানেলে যোগাযোগ করতে হবে।",
              })}
            </li>
            <li>
              {t({
                en: "Course fees are generally non-refundable. However, refund policies may apply under special consideration by the authorities.",
                bn: "কোর্স ফি সাধারণত অফেরতযোগ্য (Non-refundable)। তবে কর্তৃপক্ষের বিশেষ বিবেচনায় রিফান্ড পলিসি প্রযোজ্য হতে পারে।",
              })}
            </li>
          </ul>
        </section>

        {/* ৩. ব্যবহারকারীর আচরণবিধি */}
        <section>
          <h2 className="text-2xl font-semibold text-[#004d4d] mb-3">
            {t({
              en: "3. User Code of Conduct",
              bn: "৩. ব্যবহারকারীর আচরণবিধি (Code of Conduct)",
            })}
          </h2>
          <p>
            {t({
              en: "The use of decent language in live classes or group discussions during the course is mandatory. Any type of offensive comment, religious hatred, or harassing other students is a punishable offense. Engaging in such activities may result in the authority canceling the account without prior warning.",
              bn: "কোর্স চলাকালীন লাইভ ক্লাসে বা গ্রুপ ডিসকাশনে শালীন ভাষা ব্যবহার করা বাধ্যতামূলক। কোনো ধরনের আপত্তিকর মন্তব্য, ধর্মীয় বিদ্বেষ বা অন্য শিক্ষার্থীকে উত্ত্যক্ত করা শাস্তিযোগ্য অপরাধ। এমন কর্মকাণ্ডে লিপ্ত হলে কর্তৃপক্ষ পূর্ব সতর্কতা ছাড়াই অ্যাকাউন্ট বাতিল করতে পারে।",
            })}
          </p>
        </section>

        {/* ৪. গোপনীয়তা নীতিমালা */}
        <section>
          <h2 className="text-2xl font-semibold text-[#004d4d] mb-3">
            {t({
              en: "4. Privacy Policy",
              bn: "৪. গোপনীয়তা নীতিমালা (Privacy Policy)",
            })}
          </h2>
          <p>
            {t({
              en: "We are committed to protecting the privacy of your personal information. Your name, email, or phone number will be used exclusively for the academic needs of our institution. Under no circumstances will your information be sold or shared with any third party.",
              bn: "আমরা আপনার ব্যক্তিগত তথ্যের গোপনীয়তা রক্ষায় বদ্ধপরিকর। আপনার নাম, ইমেইল বা ফোন নম্বর শুধুমাত্র আমাদের প্রতিষ্ঠানের একাডেমিক প্রয়োজনে ব্যবহৃত হবে। কোনো অবস্থাতেই আপনার তথ্য তৃতীয় কোনো পক্ষের কাছে বিক্রয় বা শেয়ার করা হবে না।",
            })}
          </p>
        </section>

        {/* ৫. ইন্টেলেকচুয়াল প্রপার্টি */}
        <section>
          <h2 className="text-2xl font-semibold text-[#004d4d] mb-3">
            {t({
              en: "5. Content Copyright",
              bn: "৫. কন্টেন্টের স্বত্বাধিকার",
            })}
          </h2>
          <p>
            {t({
              en: "All videos, audio, PDF notes, and other content on this website are the intellectual property of 'Tarbiyah Online'. Copying, downloading for re-distribution, or using them for commercial purposes without permission is strictly prohibited.",
              bn: "এই ওয়েবসাইটের সকল ভিডিও, অডিও, পিডিএফ নোট এবং অন্যান্য কন্টেন্ট 'তারবিয়াহ অনলাইন'-এর মেধাস্বত্ব। অনুমতি ছাড়া এগুলো কপি করা, ডাউনলোড করে পুনরায় প্রচার করা বা বাণিজ্যিক উদ্দেশ্যে ব্যবহার করা কঠোরভাবে নিষিদ্ধ।",
            })}
          </p>
        </section>

        {/* ৬. যোগাযোগ */}
        <section>
          <h2 className="text-2xl font-semibold text-[#004d4d] mb-3">
            {t({
              en: "6. Contact",
              bn: "৬. যোগাযোগ",
            })}
          </h2>
          <p>
            {t({
              en: "If you have any questions about our rules, you can email us directly at:",
              bn: "আমাদের নিয়মাবলী সম্পর্কে আপনার কোনো প্রশ্ন থাকলে সরাসরি ইমেইল করতে পারেন:",
            })}
            <a
              href="mailto:info@tarbiyahonline.com"
              className="text-[#004d4d] font-bold underline ml-1"
            >
              info@tarbiyahonline.com
            </a>
          </p>
        </section>
      </div>

      {/* ফুটার আপডেট */}
      {/* <div className="mt-12 p-6 bg-gray-50 rounded-lg border border-gray-200">
        <p className="text-sm text-gray-500 text-center">
          {t({
            en: "Latest Update: July 19, 2026. By using this website, you agree to the stated terms.",
            bn: "সর্বশেষ আপডেট: ১৯ জুলাই, ২০২৬। এই ওয়েবসাইট ব্যবহারের মাধ্যমে আপনি উল্লেখিত শর্তসমূহে সম্মত হয়েছেন।",
          })}
        </p>
      </div> */}
    </div>
  );
};

export default Terms;
