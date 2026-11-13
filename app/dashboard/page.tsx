"use client";

import { useEffect, useState } from "react";
import type { CSSProperties } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

type Story = {
  id: string;
  prompt: string;
  genre: string;
  length: string;
  story: string;
  created_at: string;
};

export default function DashboardPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);
  const [loggingOut, setLoggingOut] = useState(false);
  const [notice, setNotice] = useState("");

  const [stories, setStories] = useState<Story[]>([]);
  const [loadingStories, setLoadingStories] = useState(true);
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);
  const [deletingId, setDeletingId] = useState("");

  useEffect(() => {
    async function loadDashboard() {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();

      if (error || !user) {
        router.replace("/login");
        return;
      }

      setEmail(user.email ?? "");

      const { data, error: storiesError } = await supabase
        .from("stories")
        .select("*")
        .order("created_at", { ascending: false });

      if (storiesError) {
        setNotice(
          "We couldn't load your saved stories. Please check your database setup."
        );
      } else {
        setStories((data ?? []) as Story[]);
      }

      setLoadingStories(false);
      setLoading(false);
    }

    loadDashboard();
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

  async function deleteStory(storyId: string) {
    const confirmed = window.confirm(
      "Are you sure you want to permanently delete this story?"
    );

    if (!confirmed) return;

    setDeletingId(storyId);
    setNotice("");

    const { error } = await supabase
      .from("stories")
      .delete()
      .eq("id", storyId);

    if (error) {
      setNotice("Unable to delete this story. Please try again.");
      setDeletingId("");
      return;
    }

    setStories((previous) =>
      previous.filter((story) => story.id !== storyId)
    );

    if (selectedStory?.id === storyId) {
      setSelectedStory(null);
    }

    setNotice("Your story has been deleted.");
    setDeletingId("");
  }

  function formatDate(date: string) {
    return new Date(date).toLocaleDateString(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
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

        {/* MY SAVED STORIES */}

        <section style={styles.savedSection}>
          <div style={styles.savedHeader}>
            <div>
              <p style={styles.label}>YOUR LIBRARY</p>

              <h2 style={styles.savedHeading}>
                My Saved Stories
              </h2>

              <p style={styles.savedDescription}>
                All your creative work, together in one place.
              </p>
            </div>

            <span style={styles.storyCount}>
              {stories.length} {stories.length === 1 ? "Story" : "Stories"}
            </span>
          </div>

          {loadingStories ? (
            <div style={styles.emptyState}>
              Loading your saved stories...
            </div>
          ) : stories.length === 0 ? (
            <div style={styles.emptyState}>
              <div style={{ fontSize: "45px" }}>📚</div>

              <h3 style={{ marginBottom: "8px" }}>
                Your library is empty.
              </h3>

              <p style={{ color: "#aaa1b8", lineHeight: 1.7 }}>
                The stories you create and save will appear here.
                Start creating your first story today.
              </p>

              <button
                onClick={openStoryCreator}
                style={styles.primaryButton}
              >
                Create your first story →
              </button>
            </div>
          ) : (
            <div style={styles.storyGrid}>
              {stories.map((item) => (
                <div key={item.id} style={styles.storyCard}>
                  <div style={styles.storyIcon}>📖</div>

                  <span style={styles.genre}>
                    {item.genre}
                  </span>

                  <h3 style={styles.storyTitle}>
                    {item.prompt.length > 65
                      ? item.prompt.substring(0, 65) + "..."
                      : item.prompt}
                  </h3>

                  <p style={styles.storyMeta}>
                    {item.length} story
                  </p>

                  <p style={styles.storyDate}>
                    Created {formatDate(item.created_at)}
                  </p>

                  <button
                    onClick={() => setSelectedStory(item)}
                    style={styles.readButton}
                  >
                    Read Story →
                  </button>

                  <button
                    onClick={() => deleteStory(item.id)}
                    disabled={deletingId === item.id}
                    style={styles.deleteButton}
                  >
                    {deletingId === item.id
                      ? "Deleting..."
                      : "Delete Story"}
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* FULL STORY VIEW */}

        {selectedStory && (
          <div style={styles.modalOverlay}>
            <div style={styles.modal}>
              <button
                onClick={() => setSelectedStory(null)}
                style={styles.modalClose}
              >
                ×
              </button>

              <p style={styles.label}>
                {selectedStory.genre.toUpperCase()} STORY
              </p>

              <h2 style={styles.modalHeading}>
                {selectedStory.prompt}
              </h2>

              <p style={styles.storyDate}>
                Created {formatDate(selectedStory.created_at)}
              </p>

              <div style={styles.fullStory}>
                {selectedStory.story}
              </div>

              <button
                onClick={() => setSelectedStory(null)}
                style={styles.primaryButton}
              >
                Close Story
              </button>
            </div>
          </div>
        )}

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

const styles: { [key: string]: CSSProperties } = {
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
    minHeight: "72px",
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

  savedSection: {
    marginTop: "65px",
  },

  savedHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "20px",
    flexWrap: "wrap",
    marginBottom: "25px",
  },

  savedHeading: {
    fontSize: "29px",
    margin: "5px 0 10px",
  },

  savedDescription: {
    color: "#aaa1b8",
    margin: 0,
    lineHeight: 1.6,
  },

  storyCount: {
    background: "rgba(192,132,252,0.15)",
    border: "1px solid rgba(192,132,252,0.3)",
    color: "#e9d5ff",
    padding: "10px 16px",
    borderRadius: "20px",
    fontSize: "13px",
  },

  emptyState: {
    textAlign: "center",
    padding: "45px 25px",
    borderRadius: "20px",
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.1)",
  },

  storyGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "20px",
  },

  storyCard: {
    padding: "23px",
    borderRadius: "18px",
    background: "rgba(255,255,255,0.06)",
    border: "1px solid rgba(255,255,255,0.1)",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
  },

  storyIcon: {
    fontSize: "30px",
    marginBottom: "12px",
  },

  genre: {
    color: "#c084fc",
    fontSize: "11px",
    fontWeight: 800,
    letterSpacing: "1px",
    textTransform: "uppercase",
  },

  storyTitle: {
    fontSize: "17px",
    lineHeight: 1.5,
    margin: "10px 0",
  },

  storyMeta: {
    color: "#aaa1b8",
    fontSize: "13px",
    margin: "0 0 8px",
  },

  storyDate: {
    color: "#888",
    fontSize: "12px",
  },

  readButton: {
    width: "100%",
    padding: "12px",
    border: "none",
    borderRadius: "9px",
    background: "#8b5cf6",
    color: "white",
    fontWeight: 700,
    cursor: "pointer",
    marginTop: "15px",
  },

  deleteButton: {
    width: "100%",
    padding: "11px",
    border: "1px solid rgba(248,113,113,0.35)",
    borderRadius: "9px",
    background: "rgba(248,113,113,0.08)",
    color: "#fca5a5",
    fontWeight: 700,
    cursor: "pointer",
    marginTop: "10px",
  },

  modalOverlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.85)",
    zIndex: 1000,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px",
  },

  modal: {
    position: "relative",
    width: "100%",
    maxWidth: "800px",
    maxHeight: "85vh",
    overflowY: "auto",
    background: "#100b19",
    border: "1px solid #49305e",
    borderRadius: "20px",
    padding: "35px",
    boxSizing: "border-box",
  },

  modalClose: {
    position: "absolute",
    top: "15px",
    right: "20px",
    background: "transparent",
    border: "none",
    color: "white",
    fontSize: "30px",
    cursor: "pointer",
  },

  modalHeading: {
    fontSize: "24px",
    lineHeight: 1.5,
    paddingRight: "25px",
  },

  fullStory: {
    whiteSpace: "pre-wrap",
    color: "#e5e5e5",
    fontSize: "16px",
    lineHeight: 1.9,
    marginTop: "25px",
    marginBottom: "25px",
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
