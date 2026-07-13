import React from "react";

const About = () => {
  return (
    <div className="about-wrapper">
      {/* ─── HERO BANNER ─── */}
      <div className="hero">
        <div className="hero-overlay">
          <h1 className="hero-title">About Us</h1>
          <div className="hero-underline"></div>
          <p className="hero-sub">Nurturing faith, knowledge, and character</p>
        </div>
      </div>

      {/* ─── CHAIRMAN'S MESSAGE ─── */}
      <section className="chairman-section">
        <div className="container">
          <div className="chairman-grid">
            <div className="chairman-photo">
              <img
                src="https://ui-avatars.com/api/?name=Ahmadullah&size=200&background=2a7d4f&color=fff&font-size=0.5"
                alt="Ahmadullah - Chairman"
              />
              <div className="photo-border"></div>
            </div>
            <div className="chairman-content">
              <h2 className="section-label">Chairman's Message</h2>
              <h3 className="chairman-tagline">Always More Than Expected</h3>
              <p className="chairman-name">
                <strong>Ahmadullah</strong>
              </p>
              <p className="chairman-message">
                The journey of our dream company Tarbiyah Online is going to
                start with the infinite grace of Almighty Allah. We have been
                planning for a long time an institution where our children will
                develop into religious scholars with personality and knowledge.
                By receiving higher education in the Arab world in addition to
                domestic education, they will devote themselves to the work of
                propagating Dean Islam efficiently at home and abroad, Insha
                Allah.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── VALUES · VISION · OBJECTIVE (VISIBLE TEXT + HOVER ANIMATION) ─── */}
      <section className="pillars-section">
        <div className="container">
          <div className="pillars-grid">
            {/* Values Card */}
            <div className="pillar-card">
              <div className="pillar-icon">⭐</div>
              <h3 className="pillar-title">Values</h3>
              <p className="pillar-text">
                The dream of Tarbiyah Online Madrasa is to provide Muslims
                worldwide with the true teachings of the Quran and Sunnah,
                shaping them into Allah‑fearing, ethical, and ideal individuals,
                so they can play a significant role in society based on the
                light of Islam.
              </p>
            </div>

            {/* Vision Card */}
            <div className="pillar-card vision">
              <div className="pillar-icon">👁️</div>
              <h3 className="pillar-title">Vision</h3>
              <p className="pillar-text">
                The vision of Tarbiyah Online Madrasa is to provide Muslims
                worldwide with the true teachings of the Quran and Sunnah,
                shaping them into Allah‑fearing, ethical, and ideal individuals,
                so they can play a significant role in society based on the
                light of Islam.
              </p>
            </div>

            {/* Objective Card */}
            <div className="pillar-card objective">
              <div className="pillar-icon">🎯</div>
              <h3 className="pillar-title">Objective</h3>
              <p className="pillar-text">
                To provide Muslims worldwide with the true teachings of the
                Quran and Sunnah, shaping them into Allah‑fearing, ethical, and
                ideal individuals, so they can play a significant role in
                society based on the light of Islam.
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
          font-size: 1.2rem;
          color: #e6f0e9;
          font-weight: 400;
          margin: 0;
          letter-spacing: 2px;
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
          font-size: 1.8rem;
          font-weight: 600;
          color: #1e3a2f;
          margin: 0 0 10px 0;
          font-style: italic;
        }

        .chairman-name {
          font-size: 1.2rem;
          color: #2a7d4f;
          margin: 0 0 12px 0;
        }

        .chairman-name strong {
          color: #1e4d34;
          font-weight: 700;
        }

        .chairman-message {
          font-size: 1.05rem;
          line-height: 1.8;
          color: #2d4037;
          margin: 0;
          text-align: justify;
        }

        /* ── Pillars Section (Visible Text Cards with Hover Animation) ── */
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
          transition: transform 0.3s ease, box-shadow 0.4s ease,
            border-color 0.3s ease, background 0.3s ease;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        /* ── HOVER EFFECTS (Text & Card Change) ── */
        .pillar-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 20px 50px rgba(30, 58, 47, 0.15);
          background: #ffffff;
          border-top-color: #c8a96e; /* Gold border on hover */
        }

        /* Title changes color on hover */
        .pillar-card:hover .pillar-title {
          color: #b8860b; /* Golden text */
          transition: color 0.3s ease;
        }

        /* Text changes slightly (darker & better contrast) on hover */
        .pillar-card:hover .pillar-text {
          color: #1a2c24;
          transition: color 0.3s ease;
        }

        /* Icon scales up a bit on hover */
        .pillar-card:hover .pillar-icon {
          transform: scale(1.1);
          transition: transform 0.3s ease;
        }

        .pillar-card.vision {
          border-top-color: #1e6b8a;
        }
        .pillar-card.vision:hover {
          border-top-color: #f5d98f; /* Gold-ish on hover */
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
            font-size: 1rem;
          }
          .chairman-section {
            padding: 40px 0 30px;
          }
          .chairman-tagline {
            font-size: 1.4rem;
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