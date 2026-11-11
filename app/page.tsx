"use client";

import { useState } from "react";

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <main className="site">
      <style jsx global>{`
        * {
          box-sizing: border-box;
        }

        html {
          scroll-behavior: smooth;
        }

        body {
          margin: 0;
          background: #09090f;
          color: #ffffff;
          font-family: Arial, Helvetica, sans-serif;
        }

        a {
          color: inherit;
          text-decoration: none;
        }

        button {
          font: inherit;
        }

        .site {
          min-height: 100vh;
          overflow: hidden;
          background:
            radial-gradient(
              circle at 15% 10%,
              rgba(111, 55, 255, 0.16),
              transparent 30%
            ),
            radial-gradient(
              circle at 85% 35%,
              rgba(219, 39, 119, 0.09),
              transparent 28%
            ),
            #09090f;
        }

        .container {
          width: min(1160px, 90%);
          margin: 0 auto;
        }

        .navbar {
          height: 82px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid rgba(255, 255, 255, 0.07);
          position: relative;
          z-index: 20;
        }

        .logo {
          display: flex;
          align-items: center;
          gap: 11px;
          font-size: 21px;
          font-weight: 800;
          letter-spacing: -0.7px;
        }

        .logo-icon {
          width: 38px;
          height: 38px;
          display: grid;
          place-items: center;
          border-radius: 12px;
          background: linear-gradient(135deg, #8b5cf6, #ec4899);
          font-size: 21px;
          box-shadow: 0 5px 25px rgba(139, 92, 246, 0.3);
        }

        .logo span:last-child {
          background: linear-gradient(90deg, #ffffff, #c4b5fd);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }

        .nav-links {
          display: flex;
          align-items: center;
          gap: 34px;
        }

        .nav-links a {
          color: #aaa6bb;
          font-size: 14px;
          transition: color 0.2s;
        }

        .nav-links a:hover {
          color: #ffffff;
        }

        .nav-actions {
          display: flex;
          align-items: center;
          gap: 22px;
        }

        .sign-in {
          color: #d1cbdc;
          font-size: 14px;
        }

        .sign-in:hover {
          color: #ffffff;
        }

        .button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 9px;
          padding: 13px 22px;
          border: none;
          border-radius: 10px;
          background: linear-gradient(110deg, #8b5cf6, #d946ef);
          color: white;
          font-size: 14px;
          font-weight: 700;
          cursor: pointer;
          transition:
            transform 0.2s,
            box-shadow 0.2s;
          box-shadow: 0 7px 25px rgba(139, 92, 246, 0.2);
        }

        .button:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 30px rgba(139, 92, 246, 0.35);
        }

        .button-outline {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 13px 22px;
          border: 1px solid rgba(255, 255, 255, 0.16);
          border-radius: 10px;
          color: #ffffff;
          font-size: 14px;
          font-weight: 600;
          transition: background 0.2s;
        }

        .button-outline:hover {
          background: rgba(255, 255, 255, 0.08);
        }

        .menu-button {
          display: none;
          background: transparent;
          border: 0;
          color: white;
          font-size: 27px;
          cursor: pointer;
        }

        .mobile-menu {
          display: none;
        }

        .hero {
          padding: 105px 0 90px;
          text-align: center;
          position: relative;
        }

        .badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 9px 15px;
          border: 1px solid rgba(167, 139, 250, 0.25);
          border-radius: 30px;
          background: rgba(139, 92, 246, 0.09);
          color: #c4b5fd;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 1px;
          text-transform: uppercase;
          margin-bottom: 27px;
        }

        .badge-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #c084fc;
          box-shadow: 0 0 12px #c084fc;
        }

        .hero h1 {
          max-width: 900px;
          margin: 0 auto;
          font-size: clamp(43px, 7vw, 78px);
          line-height: 1.08;
          letter-spacing: -4px;
          font-weight: 800;
        }

        .gradient-text {
          background: linear-gradient(
            100deg,
            #a78bfa 10%,
            #e879f9 55%,
            #fb7185 100%
          );
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }

        .hero-description {
          max-width: 650px;
          margin: 25px auto 0;
          color: #aaa6bb;
          font-size: 17px;
          line-height: 1.8;
        }

        .hero-buttons {
          display: flex;
          justify-content: center;
          gap: 14px;
          margin-top: 35px;
          flex-wrap: wrap;
        }

        .hero-note {
          margin-top: 22px;
          color: #777386;
          font-size: 12px;
        }

        .showcase {
          padding: 25px 0 105px;
        }

        .showcase-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
        }

        .showcase-card {
          min-height: 205px;
          padding: 24px;
          border: 1px solid rgba(255, 255, 255, 0.09);
          border-radius: 17px;
          background: linear-gradient(
            145deg,
            rgba(255, 255, 255, 0.065),
            rgba(255, 255, 255, 0.018)
          );
          transition:
            transform 0.25s,
            border-color 0.25s;
        }

        .showcase-card:hover {
          transform: translateY(-5px);
          border-color: rgba(167, 139, 250, 0.45);
        }

        .card-icon {
          width: 48px;
          height: 48px;
          display: grid;
          place-items: center;
          border-radius: 13px;
          margin-bottom: 22px;
          font-size: 23px;
          background: rgba(139, 92, 246, 0.16);
        }

        .showcase-card:nth-child(2) .card-icon {
          background: rgba(236, 72, 153, 0.14);
        }

        .showcase-card:nth-child(3) .card-icon {
          background: rgba(14, 165, 233, 0.14);
        }

        .showcase-card:nth-child(4) .card-icon {
          background: rgba(34, 197, 94, 0.13);
        }

        .showcase-card h3 {
          margin: 0 0 10px;
          font-size: 17px;
        }

        .showcase-card p {
          margin: 0;
          color: #9994a9;
          font-size: 13px;
          line-height: 1.7;
        }

        .section {
          padding: 85px 0;
        }

        .section-heading {
          max-width: 650px;
          margin: 0 auto 50px;
          text-align: center;
        }

        .section-label {
          color: #c4b5fd;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 2px;
          text-transform: uppercase;
        }

        .section-heading h2 {
          margin: 15px 0;
          font-size: clamp(30px, 4vw, 45px);
          letter-spacing: -1.5px;
        }

        .section-heading p {
          color: #9994a9;
          font-size: 15px;
          line-height: 1.8;
        }

        .features-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 18px;
        }

        .feature-card {
          padding: 29px;
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 16px;
          background: rgba(255, 255, 255, 0.025);
        }

        .feature-card .card-icon {
          margin-bottom: 20px;
        }

        .feature-card h3 {
          margin: 0 0 12px;
          font-size: 18px;
        }

        .feature-card p {
          margin: 0;
          color: #9994a9;
          font-size: 14px;
          line-height: 1.8;
        }

        .steps {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 25px;
        }

        .step {
          text-align: center;
          padding: 25px;
        }

        .step-number {
          width: 54px;
          height: 54px;
          display: grid;
          place-items: center;
          margin: 0 auto 22px;
          border: 1px solid rgba(167, 139, 250, 0.35);
          border-radius: 16px;
          background: rgba(139, 92, 246, 0.13);
          color: #c4b5fd;
          font-size: 20px;
          font-weight: 800;
        }

        .step h3 {
          margin: 0 0 12px;
          font-size: 18px;
        }

        .step p {
          margin: 0;
          color: #9994a9;
          font-size: 14px;
          line-height: 1.8;
        }

        .pricing-box {
          max-width: 700px;
          margin: 0 auto;
          padding: 42px;
          border: 1px solid rgba(167, 139, 250, 0.25);
          border-radius: 20px;
          background: linear-gradient(
            135deg,
            rgba(139, 92, 246, 0.12),
            rgba(236, 72, 153, 0.06)
          );
          text-align: center;
        }

        .pricing-box h3 {
          margin: 0 0 12px;
          font-size: 25px;
        }

        .pricing-box p {
          color: #aaa6bb;
          font-size: 14px;
          line-height: 1.8;
        }

        .cta {
          padding: 75px 25px;
          border: 1px solid rgba(167, 139, 250, 0.18);
          border-radius: 22px;
          background:
            radial-gradient(
              circle at 50% 100%,
              rgba(139, 92, 246, 0.2),
              transparent 60%
            ),
            rgba(255, 255, 255, 0.025);
          text-align: center;
        }

        .cta h2 {
          max-width: 650px;
          margin: 0 auto 17px;
          font-size: clamp(32px, 5vw, 48px);
          letter-spacing: -1.5px;
        }

        .cta p {
          max-width: 550px;
          margin: 0 auto 28px;
          color: #aaa6bb;
          font-size: 15px;
          line-height: 1.8;
        }

        .footer {
          margin-top: 100px;
          padding: 35px 0;
          border-top: 1px solid rgba(255, 255, 255, 0.07);
        }

        .footer-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 20px;
          flex-wrap: wrap;
        }

        .footer p {
          margin: 0;
          color: #777386;
          font-size: 12px;
        }

        .footer-links {
          display: flex;
          gap: 22px;
        }

        .footer-links a {
          color: #9994a9;
          font-size: 12px;
        }

        .footer-links a:hover {
          color: white;
        }

        @media (max-width: 850px) {
          .nav-links {
            gap: 18px;
          }

          .showcase-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .features-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 650px) {
          .navbar {
            height: 72px;
          }

          .nav-links,
          .nav-actions {
            display: none;
          }

          .menu-button {
            display: block;
          }

          .mobile-menu {
            position: absolute;
            top: 72px;
            left: 0;
            right: 0;
            display: flex;
            flex-direction: column;
            gap: 20px;
            padding: 25px 5%;
            background: #11101a;
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          }

          .mobile-menu a {
            color: #d1cbdc;
            font-size: 14px;
          }

          .mobile-menu .button {
            color: white;
          }

          .hero {
            padding: 80px 0 65px;
          }

          .hero h1 {
            letter-spacing: -2px;
          }

          .hero-description {
            font-size: 15px;
          }

          .showcase {
            padding-bottom: 65px;
          }

          .showcase-grid,
          .features-grid,
          .steps {
            grid-template-columns: 1fr;
          }

          .section {
            padding: 65px 0;
          }

          .pricing-box {
            padding: 30px 20px;
          }

          .footer-content {
            flex-direction: column;
            text-align: center;
          }
        }
      `}</style>

      <div className="container">
        <header className="navbar">
          <a href="/" className="logo">
            <span className="logo-icon">✦</span>
            <span>StoryForge AI</span>
          </a>

          <nav className="nav-links">
            <a href="#features">Features</a>
            <a href="#how-it-works">How it works</a>
            <a href="#pricing">Pricing</a>
          </nav>

          <div className="nav-actions">
            <a href="/login" className="sign-in">
              Sign in
            </a>
            <a href="/signup" className="button">
              Get Started <span>→</span>
            </a>
          </div>

          <button
            className="menu-button"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle navigation menu"
            aria-expanded={menuOpen}
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        </header>

        {menuOpen && (
          <nav className="mobile-menu">
            <a href="#features" onClick={() => setMenuOpen(false)}>
              Features
            </a>
            <a href="#how-it-works" onClick={() => setMenuOpen(false)}>
              How it works
            </a>
            <a href="#pricing" onClick={() => setMenuOpen(false)}>
              Pricing
            </a>
            <a href="/login" onClick={() => setMenuOpen(false)}>
              Sign in
            </a>
            <a
              href="/signup"
              className="button"
              onClick={() => setMenuOpen(false)}
            >
              Get Started →
            </a>
          </nav>
        )}

        <section className="hero">
          <div className="badge">
            <span className="badge-dot"></span>
            AI-powered creative studio
          </div>

          <h1>
            Turn your ideas into <span className="gradient-text">incredible worlds.</span>
          </h1>

          <p className="hero-description">
            Create stories, images and creative worlds with AI.
            StoryForge AI brings your imagination to life with powerful
            creative tools in one place.
          </p>

          <div className="hero-buttons">
            <a href="/signup" className="button">
              Start Creating <span>→</span>
            </a>
            <a href="#features" className="button-outline">
              Explore Features
            </a>
          </div>

          <p className="hero-note">
            Your imagination. Your stories. Your creative universe.
          </p>
        </section>

        <section className="showcase">
          <div className="showcase-grid">
            <div className="showcase-card">
              <div className="card-icon">✍️</div>
              <h3>AI Stories</h3>
              <p>
                Turn simple ideas into engaging stories, scripts and
                unforgettable adventures.
              </p>
            </div>

            <div className="showcase-card">
              <div className="card-icon">🎨</div>
              <h3>AI Images</h3>
              <p>
                Bring your imagination to life with creative AI-generated
                visual concepts.
              </p>
            </div>

            <div className="showcase-card">
              <div className="card-icon">🌌</div>
              <h3>Creative Worlds</h3>
              <p>
                Build characters, explore ideas and create worlds that
                feel uniquely yours.
              </p>
            </div>

            <div className="showcase-card">
              <div className="card-icon">📁</div>
              <h3>Your Projects</h3>
              <p>
                Keep your creative work organised and return to your
                projects whenever you want.
              </p>
            </div>
          </div>
        </section>

        <section className="section" id="features">
          <div className="section-heading">
            <span className="section-label">What you can create</span>
            <h2>
              One studio. <span className="gradient-text">Endless possibilities.</span>
            </h2>
            <p>
              Everything you need to explore ideas, create content and
              bring your imagination to life.
            </p>
          </div>

          <div className="features-grid">
            <div className="feature-card">
              <div className="card-icon">📖</div>
              <h3>Story Generation</h3>
              <p>
                Create original stories, exciting plots, characters and
                scripts from your own ideas.
              </p>
            </div>

            <div className="feature-card">
              <div className="card-icon">🖼️</div>
              <h3>Creative Images</h3>
              <p>
                Explore visual ideas and turn your imagination into
                beautiful creative concepts.
              </p>
            </div>

            <div className="feature-card">
              <div className="card-icon">✨</div>
              <h3>AI Creativity</h3>
              <p>
                Get help developing concepts, expanding ideas and
                discovering new creative directions.
              </p>
            </div>

            <div className="feature-card">
              <div className="card-icon">🎭</div>
              <h3>Characters</h3>
              <p>
                Develop memorable characters with unique personalities,
                backgrounds and stories.
              </p>
            </div>

            <div className="feature-card">
              <div className="card-icon">🚀</div>
              <h3>Fast Creation</h3>
              <p>
                Move from a simple idea to a creative starting point
                without complicated tools.
              </p>
            </div>

            <div className="feature-card">
              <div className="card-icon">📚</div>
              <h3>Project Library</h3>
              <p>
                Keep your creative projects together and build on your
                ideas over time.
              </p>
            </div>
          </div>
        </section>

        <section className="section" id="how-it-works">
          <div className="section-heading">
            <span className="section-label">Simple creative process</span>
            <h2>
              From idea to <span className="gradient-text">creation.</span>
            </h2>
            <p>
              You do not need to be an expert. Start with an idea and
              let StoryForge AI help you develop it.
            </p>
          </div>

          <div className="steps">
            <div className="step">
              <div className="step-number">01</div>
              <h3>Bring your idea</h3>
              <p>
                Describe the story, character, image or creative project
                you want to make.
              </p>
            </div>

            <div className="step">
              <div className="step-number">02</div>
              <h3>Let AI help</h3>
              <p>
                Use AI-powered creative tools to develop your idea and
                explore new possibilities.
              </p>
            </div>

            <div className="step">
              <div className="step-number">03</div>
              <h3>Create and save</h3>
              <p>
                Build on your results and keep your creative projects
                organised.
              </p>
            </div>
          </div>
        </section>

        <section className="section" id="pricing">
          <div className="section-heading">
            <span className="section-label">Get started</span>
            <h2>
              Creativity starts <span className="gradient-text">here.</span>
            </h2>
            <p>
              Create an account and explore the StoryForge AI creative
              studio.
            </p>
          </div>

          <div className="pricing-box">
            <h3>Start creating with StoryForge AI</h3>
            <p>
              Sign up to access your creative workspace and begin
              developing your ideas.
            </p>
            <a href="/signup" className="button">
              Get Started Free →
            </a>
          </div>
        </section>

        <section className="cta">
          <h2>
            Your next great idea <span className="gradient-text">starts here.</span>
          </h2>
          <p>
            Stop waiting for inspiration. Bring your ideas to StoryForge
            AI and start creating something extraordinary.
          </p>
          <a href="/signup" className="button">
            Create Your Account →
          </a>
        </section>

        <footer className="footer">
          <div className="footer-content">
            <a href="/" className="logo">
              <span className="logo-icon">✦</span>
              <span>StoryForge AI</span>
            </a>

            <p>© 2026 StoryForge AI. All rights reserved.</p>

            <div className="footer-links">
              <a href="#features">Features</a>
              <a href="#how-it-works">How it works</a>
              <a href="/login">Sign in</a>
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
}
