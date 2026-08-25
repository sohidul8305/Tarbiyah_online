import React from "react";
import { useLanguage } from "../../../context/useLanguage"; // আপনার সঠিক পাথ অনুযায়ী এটি ঠিক করে নিবেন

const About = () => {
  const { t } = useLanguage();

  return (
    <div className="about-wrapper">
      {/* ─── HERO BANNER ─── */}
      <div className="hero">
        <div className="hero-overlay">
          <h1 className="hero-title">
            {t({ en: "About Us", bn: "আমাদের সম্পর্কে" })}
          </h1>
          <div className="hero-underline"></div>
          <p className="hero-sub">
            {t({
              en: "Tarbiyah Online Madrasah",
              bn: "তারবিয়াহ অনলাইন মাদ্রাসা",
            })}
          </p>
          <p className="hero-tagline-sub">
            {t({
              en: "Authentic Knowledge. Tarbiyah. Transformation.",
              bn: "সহীহ ইলম। তারবিয়াহ। আত্মশুদ্ধি ও রূপান্তর।",
            })}
          </p>
        </div>
      </div>

      {/* ─── CHAIRMAN'S MESSAGE ─── */}
      <section className="chairman-section">
        <div className="container">
          <div className="chairman-grid">
            <div className="chairman-photo">
              <img
                src="https://i.ibb.co.com/GQRWh4DW/images-q-tbn-ANd9-Gc-Tw-Ke-AUYuda1bjp-PUU-NYup6-M-P-jlxhnq-Z0-Wb-X6hzw-Rj-HCp-Ys-O6-nc-UY-s-10.jpg"
                alt="Ahmadullah - Chairman"
              />
              <div className="photo-border"></div>
            </div>
            <div className="chairman-content">
              <h2 className="section-label">
                {t({ en: "Chairman's Message", bn: "চেয়ারম্যানের বাণী" })}
              </h2>
              <h3 className="chairman-tagline">
                {t({
                  en: "Assalamu Alaikum wa Rahmatullahi wa Barakatuh",
                  bn: "আসসালামু আলাইকুম ওয়া রাহমাতুল্লাহি ওয়া বারাকাতুহ",
                })}
              </h3>
              <p className="chairman-message">
                {t({
                  en: "Alhamdulillah, Tarbiyah Online Madrasah was founded with a vision to make authentic, structured and accessible Islamic education available to learners around the world. We believe true education goes beyond knowledge it nurtures faith, character and action, transforming knowledge into a meaningful way of life. May Allah accept this humble effort and make Tarbiyah a source of beneficial knowledge and lasting transformation.",
                  bn: "আলহামদুলিল্লাহ, বিশ্বজুড়ে শিক্ষার্থীদের জন্য সহীহ, সুবিন্যস্ত ও সহজলভ্য ইসলামী শিক্ষা পৌঁছে দেওয়ার লক্ষ্যে 'তারবিয়াহ অনলাইন মাদ্রাসা' প্রতিষ্ঠিত হয়েছে। আমরা বিশ্বাস করি, প্রকৃত শিক্ষা কেবল জ্ঞানার্জনের মধ্যে সীমাবদ্ধ নয়; বরং এটি ঈমান, চরিত্র ও আমলকে পরিশুদ্ধ করে এবং জ্ঞানকে জীবনের একটি অর্থবহ উপায়ে রূপান্তরিত করে। মহান আল্লাহ আমাদের এই ক্ষুদ্র প্রচেষ্টা কবুল করুন এবং তারবিয়াহকে উপকারী ইলম ও স্থায়ী রূপান্তরের মাধ্যম বানিয়ে দিন।",
                })}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── VALUES · VISION · OBJECTIVE (VISIBLE TEXT + HOVER ANIMATION) ─── */}
      <section className="pillars-section">
        <div className="container">
          <div className="pillars-grid">
            {/* Vision Card */}
            <div className="pillar-card vision">
              <div className="pillar-icon">👁️</div>
              <h3 className="pillar-title">
                {t({ en: "Vision", bn: "ভিশন" })}
              </h3>
              <p className="pillar-text">
                {t({
                  en: "To build a globally connected generation rooted in authentic Islamic knowledge, faith, noble character, and purposeful living—empowering individuals to become positive contributors to their families, communities, and society.",
                  bn: "সহীহ ইসলামী জ্ঞান, ঈমান, উন্নত চরিত্র এবং উদ্দেশ্যমূলক জীবনের ভিত্তির ওপর প্রতিষ্ঠিত একটি বিশ্বব্যাপী সংযুক্ত প্রজন্ম গড়ে তোলা—যা প্রতিটি মানুষকে তাদের পরিবার, সম্প্রদায় ও সমাজের জন্য ইতিবাচক অবদান রাখতে সক্ষম করে তুলবে।",
                })}
              </p>
            </div>

            {/* Mission Card */}
            <div className="pillar-card objective">
              <div className="pillar-icon">🎯</div>
              <h3 className="pillar-title">
                {t({ en: "Mission", bn: "মিশন" })}
              </h3>
              <p className="pillar-text">
                {t({
                  en: "To provide authentic, structured, and accessible Islamic education for learners of all ages through qualified educators, research-based curricula, personalized learning, and technology-enabled education—making meaningful Islamic learning accessible anytime, anywhere.",
                  bn: "যোগ্য শিক্ষকমণ্ডলী, গবেষণাভিত্তিক সিলেবাস, পার্সোনালাইজড লার্নিং এবং প্রযুক্তিনির্ভর শিক্ষার মাধ্যমে সকল বয়সের শিক্ষার্থীর জন্য সহীহ, সুশৃঙ্খল ও সহজলভ্য ইসলামী শিক্ষা প্রদান করা—যাতে যেকোনো সময়, যেকোনো স্থান থেকে অর্থপূর্ণ ইসলামী শিক্ষা গ্রহণ করা সম্ভব হয়।",
                })}
              </p>
            </div>

            {/* Values Card */}
            <div className="pillar-card">
              <div className="pillar-icon">⭐</div>
              <h3 className="pillar-title">
                {t({ en: "Values", bn: "মূল্যবোধ" })}
              </h3>
              <p className="pillar-text">
                {t({
                  en: "We uphold Authenticity, Excellence, Integrity, Compassion, Continuous Learning, and Transformation. We believe that true education goes beyond acquiring knowledge—it should nurture faith, develop character, inspire action, and create lasting positive change.",
                  bn: "আমরা সত্যনিষ্ঠা, উৎকর্ষ, সততা, সহমর্মিতা, নিরবচ্ছিন্ন শিক্ষা এবং আত্মিক রূপান্তরকে ধারণ করি। আমরা বিশ্বাস করি প্রকৃত শিক্ষা কেবল জ্ঞান অর্জন নয়—এটি ঈমানকে পোক্ত করে, চরিত্র গঠন করে, আমলের তাড়না তৈরি করে এবং দীর্ঘস্থায়ী ইতিবাচক পরিবর্তন আনে।",
                })}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── STYLES ─── */}
      <style jsx>{`
        /* ── Base ── */
        .about-wrapper {
          font-family: "Segoe UI", "Poppins", system-ui, sans-serif;
          background: #f7f9f8;
          color: #1e2e26;
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 24px;
        }

        /* ── Hero Banner ── */
        .hero {
          background: linear-gradient(135deg, #1e4d34, #2a7d4f);
          padding: 80px 20px 70px;
          text-align: center;
          position: relative;
          overflow: hidden;
        }

        .hero::before {
          content: "☪";
          position: absolute;
          right: 5%;
          top: 10%;
          font-size: 12rem;
          opacity: 0.08;
          color: #f5e7b2;
          transform: rotate(15deg);
        }

        .hero-overlay {
          position: relative;
          z-index: 2;
        }

        .hero-title {
          font-size: 3.6rem;
          font-weight: 700;
          color: #fff;
          margin: 0;
          letter-spacing: 2px;
          text-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        }

        .hero-underline {
          width: 100px;
          height: 4px;
          background: #f5d98f;
          margin: 16px auto 12px;
          border-radius: 4px;
        }

        .hero-sub {
          font-size: 1.3rem;
          color: #ffffff;
          font-weight: 600;
          margin: 0 0 6px 0;
          letter-spacing: 1px;
        }

        .hero-tagline-sub {
          font-size: 1.1rem;
          color: #e6f0e9;
          font-weight: 400;
          margin: 0;
          letter-spacing: 1.5px;
        }

        /* ── Chairman Section ── */
        .chairman-section {
          padding: 70px 0 50px;
          background: #ffffff;
          border-bottom: 1px solid #e8edea;
        }

        .chairman-grid {
          display: grid;
          grid-template-columns: 220px 1fr;
          gap: 48px;
          align-items: center;
        }

        .chairman-photo {
          position: relative;
          text-align: center;
        }

        .chairman-photo img {
          width: 100%;
          max-width: 200px;
          border-radius: 50%;
          border: 6px solid #2a7d4f;
          box-shadow: 0 10px 30px rgba(42, 125, 79, 0.2);
          display: block;
          margin: 0 auto;
        }

        .photo-border {
          position: absolute;
          inset: -10px;
          border: 2px dashed #c8a96e;
          border-radius: 50%;
          opacity: 0.4;
          pointer-events: none;
        }

        .chairman-content {
          padding: 8px 0;
        }

        .section-label {
          font-size: 1rem;
          text-transform: uppercase;
          letter-spacing: 3px;
          color: #2a7d4f;
          margin: 0 0 4px 0;
          font-weight: 600;
        }

        .chairman-tagline {
          font-size: 1.5rem;
          font-weight: 600;
          color: #1e3a2f;
          margin: 0 0 14px 0;
        }

        .chairman-message {
          font-size: 1.05rem;
          line-height: 1.8;
          color: #2d4037;
          margin: 0;
          text-align: justify;
        }

        /* ── Pillars Section ── */
        .pillars-section {
          padding: 70px 0 80px;
          background: #f7f9f8;
        }

        .pillars-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 30px;
        }

        .pillar-card {
          background: #ffffff;
          border-radius: 24px;
          padding: 36px 28px 40px;
          text-align: center;
          box-shadow: 0 8px 28px rgba(30, 58, 47, 0.06);
          border-top: 6px solid #2a7d4f;
          transition:
            transform 0.3s ease,
            box-shadow 0.4s ease,
            border-color 0.3s ease,
            background 0.3s ease;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .pillar-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 20px 50px rgba(30, 58, 47, 0.15);
          background: #ffffff;
          border-top-color: #c8a96e;
        }

        .pillar-card:hover .pillar-title {
          color: #b8860b;
          transition: color 0.3s ease;
        }

        .pillar-card:hover .pillar-text {
          color: #1a2c24;
          transition: color 0.3s ease;
        }

        .pillar-card:hover .pillar-icon {
          transform: scale(1.1);
          transition: transform 0.3s ease;
        }

        .pillar-card.vision {
          border-top-color: #1e6b8a;
        }
        .pillar-card.vision:hover {
          border-top-color: #f5d98f;
        }

        .pillar-card.objective {
          border-top-color: #b8860b;
        }
        .pillar-card.objective:hover {
          border-top-color: #c8a96e;
        }

        .pillar-icon {
          font-size: 2.8rem;
          margin-bottom: 12px;
          display: block;
          transition: transform 0.3s ease;
        }

        .pillar-title {
          font-size: 1.6rem;
          font-weight: 700;
          color: #1e3a2f;
          margin: 0 0 16px 0;
          transition: color 0.3s ease;
        }

        .pillar-text {
          font-size: 1rem;
          line-height: 1.75;
          color: #3d5047;
          margin: 0;
          text-align: justify;
          transition: color 0.3s ease;
        }

        /* ── Responsive ── */
        @media (max-width: 1024px) {
          .hero-title {
            font-size: 3rem;
          }
          .chairman-grid {
            gap: 30px;
          }
        }

        @media (max-width: 820px) {
          .hero {
            padding: 60px 20px 50px;
          }
          .hero-title {
            font-size: 2.4rem;
          }
          .chairman-grid {
            grid-template-columns: 1fr;
            text-align: center;
            gap: 24px;
          }
          .chairman-photo img {
            max-width: 160px;
          }
          .chairman-message {
            text-align: left;
          }
          .pillars-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 24px;
          }
        }

        @media (max-width: 600px) {
          .hero {
            padding: 48px 16px 40px;
          }
          .hero-title {
            font-size: 2rem;
          }
          .hero-sub {
            font-size: 1.1rem;
          }
          .hero-tagline-sub {
            font-size: 0.95rem;
          }
          .chairman-section {
            padding: 40px 0 30px;
          }
          .chairman-tagline {
            font-size: 1.2rem;
          }
          .chairman-message {
            font-size: 0.95rem;
          }
          .pillars-section {
            padding: 40px 0 50px;
          }
          .pillars-grid {
            grid-template-columns: 1fr;
            gap: 20px;
          }
          .pillar-card {
            padding: 28px 20px 32px;
          }
          .pillar-title {
            font-size: 1.3rem;
          }
          .pillar-text {
            font-size: 0.95rem;
          }
        }

        @media (max-width: 380px) {
          .hero-title {
            font-size: 1.6rem;
          }
          .chairman-photo img {
            max-width: 130px;
          }
          .pillar-card {
            padding: 22px 16px 26px;
          }
        }
      `}</style>
    </div>
  );
};

export default About;
