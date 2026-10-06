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
            radial-gradient(circle at 50% 0%, rgba(124, 58, 237, 0.22), transparent 35%),
            #09090f;
        }

        .container {
          width: min(1180px, calc(100% - 40px));
          margin: 0 auto;
        }

        .navbar {
          height: 76px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid rgba(255,255,255,0.08);
        }

        .logo {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 20px;
          font-weight: 800;
          letter-spacing: -0.5px;
        }

        .logoMark {
          width: 34px;
          height: 34px;
          display: grid;
          place-items: center;
          border-radius: 10px;
          background: linear-gradient(135deg, #8b5cf6, #ec4899);
          box-shadow: 0 8px 30px rgba(139, 92, 246, 0.35);
        }

        .navLinks {
          display: flex;
          align-items: center;
          gap: 34px;
          color: #b8b5c7;
          font-size: 14px;
        }

        .navLinks a:hover {
          color: white;
        }

        .navActions {
          display: flex;
          align-items: center;
          gap: 14px;
        }

        .signIn {
          color: #d6d3df;
          padding: 10px 14px;
          font-size: 14px;
        }

        .primary {
          border: 0;
          cursor: pointer;
          color: white;
          font-weight: 700;
          border-radius: 10px;
          padding: 12px 19px;
          background: linear-gradient(135deg, #7c3aed, #db2777);
          box-shadow: 0 12px 35px rgba(124, 58, 237, 0.25);
        }

        .primary:hover {
          transform: translateY(-1px);
        }

        .hero {
          text-align: center;
          padding: 105px 0 90px;
        }

        .badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 8px 13px;
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 999px;
          color: #c9c3d8;
          background: rgba(255,255,255,0.035);
          font-size: 13px;
          margin-bottom: 28px;
        }

        .dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #a78bfa;
          box-shadow: 0 0 15px #a78bfa;
        }

        .hero h1 {
          max-width: 900px;
          margin: 0 auto;
          font-size: clamp(48px, 8vw, 92px);
          line-height: 0.98;
          letter-spacing: -5px;
        }

        .gradientText {
          background: linear-gradient(90deg, #a78bfa, #f472b6, #fb7185);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }

        .hero p {
          max-width: 680px;
          margin: 30px auto 0;
          color: #aaa6b7;
          font-size: 19px;
          line-height: 1.7;
        }

        .heroActions {
          display: flex;
          justify-content: center;
          gap: 14px;
          margin-top: 36px;
        }

        .heroButton {
          padding: 15px 25px;
          border-radius: 12px;
          font-size: 16px;
        }

        .secondary {
          border: 1px solid rgba(255,255,255,0.13);
          background: rgba(255,255,255,0.045);
          color: white;
          cursor: pointer;
          padding: 15px 25px;
          border-radius: 12px;
        }

        .showcase {
          margin: 15px auto 0;
          width: min(1050px, 100%);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 22px;
          background: rgba(255,255,255,0.035);
          padding: 12px;
          box-shadow: 0 40px 100px rgba(0,0,0,0.45);
        }

        .window {
          border-radius: 15px;
          min-height: 390px;
          padding: 25px;
          text-align: left;
          background: linear-gradient(145deg, #15121e, #0e0e16);
        }

        .windowTop {
          display: flex;
          gap: 7px;
          margin-bottom: 30px;
        }

        .windowDot {
          width: 9px;
          height: 9px;
          border-radius: 50%;
          background: #464252;
        }

        .mockGrid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 18px;
        }

        .mockCard {
          min-height: 145px;
          padding: 22px;
          border-radius: 16px;
          border: 1px solid rgba(255,255,255,0.07);
          background: rgba(255,255,255,0.035);
        }

        .mockCard h3 {
          margin: 0 0 10px;
          font-size: 19px;
        }

        .mockCard p {
          margin: 0;
          color: #888495;
          font-size: 14px;
          line-height: 1.6;
        }

        section {
          padding: 100px 0;
        }

        .sectionHeading {
          text-align: center;
          margin-bottom: 55px;
        }

        .eyebrow {
          color: #a78bfa;
          text-transform: uppercase;
          letter-spacing: 2px;
          font-size: 12px;
          font-weight: 800;
          margin-bottom: 14px;
        }

        .sectionHeading h2 {
          margin: 0;
          font-size: clamp(34px, 5vw, 56px);
          letter-spacing: -2px;
        }

        .sectionHeading p {
          max-width: 620px;
          margin: 18px auto 0;
          color: #9995a7;
          line-height: 1.7;
        }

        .features {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 18px;
        }

        .feature {
          padding: 30px;
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 18px;
          background: rgba(255,255,255,0.025);
        }

        .featureIcon {
          width: 48px;
          height: 48px;
          display: grid;
          place-items: center;
          border-radius: 13px;
          background: rgba(139,92,246,0.14);
          font-size: 22px;
          margin-bottom: 24px;
        }

        .feature h3 {
          margin: 0 0 10px;
          font-size: 20px;
        }

        .feature p {
          color: #9692a3;
          line-height: 1.7;
          margin: 0;
        }

        .steps {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }

        .step {
          text-align: center;
          padding: 35px 25px;
        }

        .stepNumber {
          width: 48px;
          height: 48px;
          display: grid;
          place-items: center;
          margin: 0 auto 20px;
          border-radius: 50%;
          background: #181522;
          border: 1px solid rgba(167,139,250,0.3);
          color: #c4b5fd;
          font-weight: 800;
        }

        .step h3 {
          margin-bottom: 10px;
        }

        .step p {
          color: #9692a3;
          line-height: 1.7;
        }

        .cta {
          text-align: center;
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 25px;
          padding: 80px 30px;
          background:
            radial-gradient(circle at 50% 0%, rgba(139,92,246,0.2), transparent 55%),
            rgba(255,255,255,0.025);
        }

        .cta h2 {
          margin: 0;
          font-size: clamp(36px, 6vw, 65px);
          letter-spacing: -3px;
        }

        .cta p {
          color: #9e9aaa;
          max-width: 600px;
          margin: 20px auto 30px;
          line-height: 1.7;
        }

        footer {
          margin-top: 80px;
          padding: 35px 0;
          border-top: 1px solid rgba(255,255,255,0.08);
          color: #777382;
          font-size: 13px;
        }

        .footerInner {
          display: flex;
          justify-content: space-between;
          gap: 20px;
        }

        .mobileButton {
          display: none;
          border: 0;
          background: transparent;
          color: white;
          font-size: 25px;
          cursor: pointer;
        }

        @media (max-width: 760px) {
          .navLinks,
          .navActions {
            display: none;
          }

          .mobileButton {
            display: block;
          }

          .mobileMenu {
            position: absolute;
            top: 76px;
            left: 20px;
            right: 20px;
            padding: 20px;
            border-radius: 15px;
            background: #14121c;
            border: 1px solid rgba(255,255,255,0.1);
            z-index: 10;
          }

          .mobileMenu a,
          .mobileMenu button {
            display: block;
            width: 100%;
            margin: 8px 0;
            text-align: left;
          }

          .hero {
            padding: 75px 0 65px;
          }

          .hero h1 {
            letter-spacing: -3px;
          }

          .heroActions {
            flex-direction: column;
          }

          .mockGrid,
          .features,
          .steps {
            grid-template-columns: 1fr;
          }

          .footerInner {
            flex-direction: column;
          }
        }
      `}</style>

      <div className="container">
        <header className="navbar">
          <a href="#" className="logo">
            <span className="logoMark">✦</span>
            StoryForge AI
          </a>

          <nav className="navLinks">
            <a href="#features">Features</a>
            <a href="#how-it-works">How it works</a>
            <a href="#pricing">Pricing</a>
          </nav>

          <div className="navActions">
            <a href="#" className="signIn">Sign in</a>
            <button className="primary">Get Started</button>
          </div>

          <button
            className="mobileButton"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Open menu"
          >
            ☰
          </button>
        </header>

        {menuOpen && (
          <div className="mobileMenu">
            <a href="#features">Features</a>
            <a href="#how-it-works">How it works</a>
            <a href="#pricing">Pricing</a>
            <a href="#">Sign in</a>
            <button className="primary">Get Started</button>
          </div>
        )}

        <section className="hero">
          <div className="badge">
            <span className="dot"></span>
            AI-powered creative studio
          </div>

          <h1>
            Turn your ideas into{" "}
            <span className="gradientText">incredible worlds.</span>
          </h1>

          <p>
            Create stories, images and creative worlds with AI.
            From your first idea to the finished creation, StoryForge AI
            helps bring your imagination to life.
          </p>

          <div className="heroActions">
            <button className="primary heroButton">
              Start Creating →
            </button>
            <a href="#features" className="secondary">
              Explore Features
            </a>
          </div>
        </section>

        <div className="showcase">
          <div className="window">
            <div className="windowTop">
              <span className="windowDot"></span>
              <span className="windowDot"></span>
              <span className="windowDot"></span>
            </div>

            <div className="mockGrid">
              <div className="mockCard">
                <h3>✍️ AI Stories</h3>
                <p>
                  Generate original stories, characters and worlds from a
                  simple idea.
                </p>
              </div>

              <div className="mockCard">
                <h3>🎨 AI Images</h3>
                <p>
                  Turn your imagination into stunning visual creations.
                </p>
              </div>

              <div className="mockCard">
                <h3>🌎 Creative Worlds</h3>
                <p>
                  Build characters, settings and complete fictional worlds.
                </p>
              </div>

              <div className="mockCard">
                <h3>📁 Your Projects</h3>
                <p>
                  Keep your creations organized and accessible in one place.
                </p>
              </div>
            </div>
          </div>
        </div>

        <section id="features">
          <div className="sectionHeading">
            <div className="eyebrow">Everything you need</div>
            <h2>One creative studio.</h2>
            <p>
              Powerful AI tools designed to help you go from a blank page
              to something you are proud of.
            </p>
          </div>

          <div className="features">
            <div className="feature">
              <div className="featureIcon">✍️</div>
              <h3>Story Creation</h3>
              <p>
                Create stories, scripts, characters and ideas with the help
                of AI.
              </p>
            </div>

            <div className="feature">
              <div className="featureIcon">🎨</div>
              <h3>Image Generation</h3>
              <p>
                Generate beautiful images that bring your stories and ideas
                to life.
              </p>
            </div>

            <div className="feature">
              <div className="featureIcon">✨</div>
              <h3>Creative Assistant</h3>
              <p>
                Brainstorm, rewrite, expand and improve your creative work
                whenever you need it.
              </p>
            </div>
          </div>
        </section>

        <section id="how-it-works">
          <div className="sectionHeading">
            <div className="eyebrow">Simple workflow</div>
            <h2>From idea to creation.</h2>
          </div>

          <div className="steps">
            <div className="step">
              <div className="stepNumber">1</div>
              <h3>Describe your idea</h3>
              <p>
                Tell StoryForge what you want to create using your own words.
              </p>
            </div>

            <div className="step">
              <div className="stepNumber">2</div>
              <h3>Let AI create</h3>
              <p>
                Our creative tools transform your idea into something
                extraordinary.
              </p>
            </div>

            <div className="step">
              <div className="stepNumber">3</div>
              <h3>Make it yours</h3>
              <p>
                Refine, save and continue developing your creation.
              </p>
            </div>
          </div>
        </section>

        <section id="pricing">
          <div className="cta">
            <div className="eyebrow">Start creating</div>
            <h2>Your next great idea starts here.</h2>
            <p>
              Join StoryForge AI and turn your imagination into stories,
              images and worlds.
            </p>
            <button className="primary heroButton">
              Get Started Free →
            </button>
          </div>
        </section>

        <footer>
          <div className="footerInner">
            <div>© 2026 StoryForge AI. All rights reserved.</div>
            <div>Turn ideas into stories, images & worlds.</div>
          </div>
        </footer>
      </div>
    </main>
  );
}
