"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function DashboardPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);
  const [loggingOut, setLoggingOut] = useState(false);
  const [notice, setNotice] = useState("");

  useEffect(() => {
    async function loadUser() {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();

      if (error || !user) {
        router.replace("/login");
        return;
      }

      setEmail(user.email ?? "");
      setLoading(false);
    }

    loadUser();
  }, [router]);

  async function handleLogout() {
    setLoggingOut(true);

    const { error } = await supabase.auth.signOut();

    if (error) {
      setNotice(error.message);
      setLoggingOut(false);
      return;
    }

    router.replace("/login");
  }

  function openStoryCreator() {
    router.push("/story");
  }

  function showComingSoon(feature: string) {
    setNotice(
      `${feature} is coming soon. We're working on bringing this feature to StoryForge AI.`
    );
  }

  if (loading) {
    return (
      <main style={styles.loading}>
        Loading your workspace...
      </main>
    );
  }

  return (
    <main style={styles.page}>
      <header style={styles.header}>
        <a href="/dashboard" style={styles.logo}>
          StoryForge <span style={{ color: "#c084fc" }}>AI</span>
        </a>

        <button
          onClick={handleLogout}
          disabled={loggingOut}
          style={styles.logout}
        >
          {loggingOut ? "Logging out..." : "Log out"}
        </button>
      </header>

      <section style={styles.container}>
        <p style={styles.label}>YOUR CREATIVE WORKSPACE</p>

        <h1 style={styles.heading}>
          Welcome to StoryForge AI.
        </h1>

        <p style={styles.email}>
          Signed in as {email}
        </p>

        <p style={styles.description}>
          Turn your ideas into stories, images and entire creative worlds
          from one powerful workspace.
        </p>

        {notice && (
          <div style={styles.notice}>
            <span>{notice}</span>
            <button
              onClick={() => setNotice("")}
              style={styles.closeNotice}
              aria-label="Dismiss message"
            >
              ×
            </button>
          </div>
        )}

        <h2 style={styles.sectionHeading}>
          What would you like to create?
        </h2>

        <div style={styles.grid}>
          <div style={styles.card}>
            <div style={styles.icon}>✍️</div>

            <h2 style={styles.cardTitle}>AI Stories</h2>

            <p style={styles.cardDescription}>
              Create stories, scripts, characters and creative concepts
              with AI.
            </p>

            <button
              onClick={openStoryCreator}
              style={styles.primaryButton}
            >
              Create a story →
            </button>
          </div>

          <div style={styles.card}>
            <div style={styles.icon}>🎨</div>

            <h2 style={styles.cardTitle}>AI Images</h2>

            <p style={styles.cardDescription}>
              Turn your ideas into stunning AI-generated visual concepts.
            </p>

            <button
              onClick={() => showComingSoon("AI Image Generation")}
              style={styles.secondaryButton}
            >
              Create an image →
            </button>

            <span style={styles.comingSoon}>COMING SOON</span>
          </div>

          <div style={styles.card}>
            <div style={styles.icon}>🌎</div>

            <h2 style={styles.cardTitle}>Creative Worlds</h2>

            <p style={styles.cardDescription}>
              Build characters, settings and interconnected fictional worlds.
            </p>

            <button
              onClick={() => showComingSoon("Creative Worlds")}
              style={styles.secondaryButton}
            >
              Build a world →
            </button>

            <span style={styles.comingSoon}>COMING SOON</span>
          </div>
        </div>

        <section style={styles.bottomSection}>
          <h2 style={styles.bottomHeading}>
            Your imagination starts here.
          </h2>

          <p style={styles.bottomDescription}>
            Start with a simple idea. Let StoryForge AI help you turn it
            into something extraordinary.
          </p>

          <button
            onClick={openStoryCreator}
            style={styles.primaryButton}
          >
            Start creating →
          </button>
        </section>
      </section>
    </main>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  page: {
    minHeight: "100vh",
    background:
      "radial-gradient(circle at top right, #24104d 0%, #08050f 45%, #050308 100%)",
    color: "white",
    fontFamily: "Arial, sans-serif",
  },

  loading: {
    minHeight: "100vh",
    background: "#08050f",
    color: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "Arial, sans-serif",
  },

  header: {
    height: "72px",
    borderBottom: "1px solid rgba(255,255,255,0.1)",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 6%",
  },

  logo: {
    fontSize: "22px",
    fontWeight: 800,
    color: "white",
    textDecoration: "none",
  },

  logout: {
    border: "1px solid rgba(255,255,255,0.18)",
    background: "rgba(255,255,255,0.06)",
    color: "white",
    padding: "10px 18px",
    borderRadius: "10px",
    cursor: "pointer",
  },

  container: {
    maxWidth: "1100px",
    margin: "0 auto",
    padding: "60px 24px",
  },

  label: {
    color: "#c084fc",
    fontWeight: 700,
    marginBottom: "10px",
    letterSpacing: "1.5px",
    fontSize: "12px",
  },

  heading: {
    fontSize: "clamp(32px, 5vw, 46px)",
    lineHeight: 1.1,
    margin: "0 0 12px",
  },

  email: {
    color: "#c084fc",
    fontSize: "14px",
    marginBottom: "12px",
  },

  description: {
    color: "#aaa1b8",
    maxWidth: "650px",
    lineHeight: 1.7,
    marginBottom: "45px",
  },

  sectionHeading: {
    fontSize: "23px",
    marginBottom: "22px",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
    gap: "20px",
  },

  card: {
    padding: "28px",
    borderRadius: "20px",
    background: "rgba(255,255,255,0.06)",
    border: "1px solid rgba(255,255,255,0.1)",
  },

  icon: {
    fontSize: "36px",
    marginBottom: "16px",
  },

  cardTitle: {
    fontSize: "21px",
    marginBottom: "10px",
  },

  cardDescription: {
    color: "#aaa1b8",
    lineHeight: 1.6,
    minHeight: "68px",
    fontSize: "14px",
  },

  primaryButton: {
    width: "100%",
    padding: "13px",
    border: "none",
    borderRadius: "10px",
    background: "linear-gradient(135deg, #8b5cf6, #c026d3)",
    color: "white",
    fontWeight: 700,
    cursor: "pointer",
    marginTop: "12px",
  },

  secondaryButton: {
    width: "100%",
    padding: "13px",
    border: "1px solid rgba(255,255,255,0.15)",
    borderRadius: "10px",
    background: "rgba(255,255,255,0.08)",
    color: "white",
    fontWeight: 700,
    cursor: "pointer",
    marginTop: "12px",
  },

  comingSoon: {
    display: "block",
    color: "#c084fc",
    fontSize: "10px",
    fontWeight: 700,
    letterSpacing: "1px",
    marginTop: "15px",
  },

  notice: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "15px",
    padding: "15px",
    marginBottom: "30px",
    borderRadius: "10px",
    border: "1px solid rgba(192,132,252,0.3)",
    background: "rgba(139,92,246,0.12)",
    color: "#e9d5ff",
    fontSize: "14px",
  },

  closeNotice: {
    background: "transparent",
    border: "none",
    color: "white",
    fontSize: "22px",
    cursor: "pointer",
  },

  bottomSection: {
    marginTop: "65px",
    padding: "40px 25px",
    borderRadius: "20px",
    textAlign: "center",
    border: "1px solid rgba(192,132,252,0.2)",
    background: "rgba(139,92,246,0.08)",
  },

  bottomHeading: {
    fontSize: "27px",
    marginBottom: "12px",
  },

  bottomDescription: {
    color: "#aaa1b8",
    lineHeight: 1.7,
    marginBottom: "20px",
  },
};
