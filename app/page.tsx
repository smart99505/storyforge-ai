```tsx
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
          min-height: 76px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid rgba(255,255,255,0.08);
          position: relative;
        }

        .logo {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 20px;
          font-weight: 800;
        }

        .logoMark {
          width: 34px;
          height: 34px;
          display: grid;
          place-items: center;
          border-radius: 10px;
          background: linear-gradient(135deg, #8b5cf6, #ec4899);
        }

        .navLinks,
        .navActions {
          display: flex;
          align-items: center;
          gap: 30px;
        }

        .navLinks {
          color: #b8b5c7;
          font-size: 14px;
        }

        .navLinks a:hover,
        .signIn:hover {
          color: white;
        }

        .signIn {
          color: #d6d3df;
          padding: 10px;
        }

        .primary {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border: 0;
          cursor: pointer;
          color: white;
          font-weight: 700;
          border-radius: 10px;
          padding: 13px 20px;
          background: linear-gradient(135deg, #7c3aed, #db2777);
          box-shadow: 0 12px 35px rgba(124, 58, 237, 0.25);
          transition: transform 0.2s ease;
        }

        .primary:hover {
          transform: translateY(-2px);
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
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border: 1px solid rgba(255,255,255,0.13);
          background: rgba(255,255,255,0.045);
          color: white;
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
        }

        .window {
          border-radius: 15px;
          min-height: 390px;
          padding: 25px;
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
         
