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
  title?: string;
  content?: string;
  story?: string;
  created_at?: string;
};

export default function DashboardPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [stories, setStories] = useState<Story[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);
  const [notice, setNotice] = useState("");

  useEffect(() => {
    checkUser();
  }, []);

  async function checkUser() {
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (error || !user) {
      router.push("/login");
      return;
    }

    setEmail(user.email || "");

    await fetchStories(user.id);

    setLoading(false);
  }

  async function fetchStories(userId: string) {
    const { data, error } = await supabase
      .from("stories")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching stories:", error.message);
      return;
    }

    setStories(data || []);
  }

  async function logout() {
    await supabase.auth.signOut();
    router.push("/login");
  }

  function openStoryCreator() {
    router.push("/story");
  }

  function openImageCreator() {
    router.push("/images");
  }

  function openImageGallery() {
    router.push("/gallery");
  }

  function openWorlds() {
    setNotice("Creative Worlds is coming soon!");
  }

  async function deleteStory(id: string) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this story?"
    );

    if (!confirmed) return;

    const { error } = await supabase
      .from("stories")
      .delete()
      .eq("id", id);

    if (error) {
      alert("Unable to delete story. Please try again.");
      console.error(error.message);
      return;
    }

    setStories((previous) => previous.filter((story) => story.id !== id));

    if (selectedStory?.id === id) {
      setSelectedStory(null);
    }
  }

  if (loading) {
    return (
      <main style={styles.loadingPage}>
        <div style={styles.loadingText}>Loading your dashboard...</div>
      </main>
    );
  }

  return (
    <main style={styles.page}>
      <div style={styles.container}>
        {/* HEADER */}
        <header style={styles.header}>
          <div>
            <h1 style={styles.logo}>
              StoryForge <span style={styles.logoAccent}>AI</span>
            </h1>
            <p style={styles.headerSubtitle}>Your creative studio</p>
          </div>

          <div style={styles.headerRight}>
            <span style={styles.userEmail}>{email}</span>

            <button onClick={logout} style={styles.logoutButton}>
              Log Out
            </button>
          </div>
        </header>

        {/* WELCOME */}
        <section style={styles.welcome}>
          <div>
            <p style={styles.eyebrow}>YOUR CREATIVE SPACE</p>

            <h2 style={styles.welcomeTitle}>
              Welcome back to <span style={styles.purple}>StoryForge AI</span>
            </h2>

            <p style={styles.welcomeText}>
              Turn your imagination into stories, images and creative worlds.
              What would you like to create today?
            </p>
          </div>

          <button onClick={openStoryCreator} style={styles.primaryButton}>
            + Create a Story
          </button>
        </section>

        {/* NOTICE */}
        {notice && (
          <div style={styles.notice}>
            {notice}
            <button
              onClick={() => setNotice("")}
              style={styles.noticeClose}
            >
              ×
            </button>
          </div>
        )}

        {/* FEATURE CARDS */}
        <section style={styles.cards}>
          {/* AI STORIES */}
          <div style={styles.card}>
            <div style={styles.cardIcon}>📖</div>

            <h3 style={styles.cardTitle}>AI Stories</h3>

            <p style={styles.cardText}>
              Create original stories using your imagination and AI.
              Bring your ideas to life in seconds.
            </p>

            <button
              onClick={openStoryCreator}
              style={styles.primaryButton}
            >
              Create a Story →
            </button>
          </div>

          {/* AI IMAGES */}
          <div style={styles.card}>
            <div style={styles.cardIcon}>🎨</div>

            <h3 style={styles.cardTitle}>AI Images</h3>

            <p style={styles.cardText}>
              Transform your ideas into beautiful AI-generated images.
              Explore different styles and creative possibilities.
            </p>

            <button
              onClick={openImageCreator}
              style={styles.primaryButton}
            >
              Create an Image →
            </button>

            <button
              onClick={openImageGallery}
              style={styles.secondaryButton}
            >
              My Image Gallery →
            </button>
          </div>

          {/* CREATIVE WORLDS */}
          <div style={styles.card}>
            <div style={styles.cardIcon}>🌍</div>

            <h3 style={styles.cardTitle}>Creative Worlds</h3>

            <p style={styles.cardText}>
              Explore new creative possibilities and build imaginative
              worlds. More features are coming soon.
            </p>

            <button
              onClick={openWorlds}
              style={styles.secondaryButton}
            >
              Coming Soon
            </button>
          </div>
        </section>

        {/* SAVED STORIES */}
        <section style={styles.savedSection}>
          <div style={styles.sectionHeading}>
            <div>
              <p style={styles.eyebrow}>YOUR LIBRARY</p>
              <h2 style={styles.sectionTitle}>My Saved Stories</h2>
              <p style={styles.sectionDescription}>
                Your stories are saved here so you can read them whenever
                you want.
              </p>
            </div>

            <span style={styles.storyCount}>
              {stories.length} {stories.length === 1 ? "Story" : "Stories"}
            </span>
          </div>

          {stories.length === 0 ? (
            <div style={styles.emptyState}>
              <div style={styles.emptyIcon}>📚</div>
              <h3>No saved stories yet</h3>
              <p>
                Your creative journey starts here. Create your first story
                and it will appear in this section.
              </p>

              <button
                onClick={openStoryCreator}
                style={styles.primaryButton}
              >
                Create Your First Story
              </button>
            </div>
          ) : (
            <div style={styles.storyGrid}>
              {stories.map((story) => (
                <div key={story.id} style={styles.storyCard}>
                  <div style={styles.storyIcon}>📘</div>

                  <h3 style={styles.storyTitle}>
                    {story.title || "Untitled Story"}
                  </h3>

                  <p style={styles.storyDate}>
                    {story.created_at
                      ? new Date(story.created_at).toLocaleDateString()
                      : "Saved story"}
                  </p>

                  <div style={styles.storyActions}>
                    <button
                      onClick={() => setSelectedStory(story)}
                      style={styles.readButton}
                    >
                      Read Story
                    </button>

                    <button
                      onClick={() => deleteStory(story.id)}
                      style={styles.deleteButton}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* IMAGE GALLERY SHORTCUT */}
        <section style={styles.bottomSection}>
          <div>
            <p style={styles.eyebrow}>YOUR CREATIVE COLLECTION</p>
            <h2 style={styles.bottomTitle}>
              Your imagination has no limits.
            </h2>
            <p style={styles.bottomText}>
              Create more stories and images, and keep all your creations
              together in your personal studio.
            </p>
          </div>

          <div style={styles.bottomButtons}>
            <button
              onClick={openStoryCreator}
              style={styles.primaryButton}
            >
              Start Creating →
            </button>

            <button
              onClick={openImageCreator}
              style={styles.secondaryButton}
            >
              Explore AI Images →
            </button>

            <button
              onClick={openImageGallery}
              style={styles.secondaryButton}
            >
              View My Image Gallery →
            </button>
          </div>
        </section>

        {/* FOOTER */}
        <footer style={styles.footer}>
          <p>© 2026 StoryForge AI. All rights reserved.</p>
        </footer>
      </div>

      {/* READ STORY MODAL */}
      {selectedStory && (
        <div
          style={styles.modalOverlay}
          onClick={() => setSelectedStory(null)}
        >
          <div
            style={styles.modal}
            onClick={(event) => event.stopPropagation()}
          >
            <button
              onClick={() => setSelectedStory(null)}
              style={styles.modalClose}
            >
              ×
            </button>

            <p style={styles.eyebrow}>YOUR SAVED STORY</p>

            <h2 style={styles.modalTitle}>
              {selectedStory.title || "Untitled Story"}
            </h2>

            <div style={styles.modalContent}>
              {selectedStory.content ||
                selectedStory.story ||
                "No story content was found."}
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
    </main>
  );
}

const styles: { [key: string]: CSSProperties } = {
  page: {
    minHeight: "100vh",
    background: "#09090f",
    color: "#ffffff",
    padding: "30px 20px",
    fontFamily: "Arial, sans-serif",
  },

  container: {
    maxWidth: "1200px",
    margin: "0 auto",
  },

  loadingPage: {
    minHeight: "100vh",
    background: "#09090f",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "#ffffff",
    fontFamily: "Arial, sans-serif",
  },

  loadingText: {
    fontSize: "18px",
    color: "#c4b5fd",
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "20px",
    flexWrap: "wrap",
    paddingBottom: "25px",
    borderBottom: "1px solid #272333",
  },

  logo: {
    fontSize: "27px",
    fontWeight: 800,
    margin: 0,
  },

  logoAccent: {
    color: "#a78bfa",
  },

  headerSubtitle: {
    color: "#9993aa",
    fontSize: "13px",
    margin: "5px 0 0",
  },

  headerRight: {
    display: "flex",
    alignItems: "center",
    gap: "15px",
    flexWrap: "wrap",
  },

  userEmail: {
    color: "#c4b5fd",
    fontSize: "13px",
  },

  logoutButton: {
    background: "transparent",
    color: "#ffffff",
    border: "1px solid #51456c",
    borderRadius: "9px",
    padding: "10px 17px",
    cursor: "pointer",
  },

  welcome: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "25px",
    flexWrap: "wrap",
    padding: "55px 0 40px",
  },

  eyebrow: {
    color: "#a78bfa",
    fontSize: "11px",
    fontWeight: 700,
    letterSpacing: "2px",
    marginBottom: "12px",
  },

  welcomeTitle: {
    fontSize: "clamp(27px, 4vw, 39px)",
    lineHeight: 1.2,
    margin: "0 0 14px",
  },

  purple: {
    color: "#a78bfa",
  },

  welcomeText: {
    color: "#aaa4b8",
    fontSize: "15px",
    lineHeight: 1.7,
    maxWidth: "600px",
  },

  primaryButton: {
    background: "linear-gradient(135deg, #8b5cf6, #6d28d9)",
    color: "#ffffff",
    border: "none",
    borderRadius: "10px",
    padding: "13px 20px",
    fontSize: "14px",
    fontWeight: 700,
    cursor: "pointer",
  },

  secondaryButton: {
    background: "#211b30",
    color: "#c4b5fd",
    border: "1px solid #51416e",
    borderRadius: "10px",
    padding: "12px 18px",
    fontSize: "13px",
    fontWeight: 600,
    cursor: "pointer",
    marginTop: "10px",
  },

  notice: {
    background: "#211b30",
    border: "1px solid #51416e",
    borderRadius: "10px",
    padding: "14px 18px",
    color: "#ddd6fe",
    marginBottom: "25px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  noticeClose: {
    background: "transparent",
    color: "#ffffff",
    border: "none",
    fontSize: "22px",
    cursor: "pointer",
  },

  cards: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "20px",
    marginBottom: "65px",
  },

  card: {
    background: "#12111b",
    border: "1px solid #292437",
    borderRadius: "16px",
    padding: "28px",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    minHeight: "270px",
  },

  cardIcon: {
    fontSize: "34px",
    marginBottom: "18px",
  },

  cardTitle: {
    fontSize: "21px",
    margin: "0 0 10px",
  },

  cardText: {
    color: "#aaa4b8",
    fontSize: "14px",
    lineHeight: 1.7,
    marginBottom: "22px",
    flex: 1,
  },

  savedSection: {
    paddingBottom: "65px",
  },

  sectionHeading: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "20px",
    flexWrap: "wrap",
    marginBottom: "25px",
  },

  sectionTitle: {
    fontSize: "27px",
    margin: "0 0 8px",
  },

  sectionDescription: {
    color: "#9993aa",
    fontSize: "14px",
    lineHeight: 1.6,
  },

  storyCount: {
    background: "#211b30",
    color: "#c4b5fd",
    borderRadius: "20px",
    padding: "9px 15px",
    fontSize: "13px",
  },

  emptyState: {
    textAlign: "center",
    padding: "45px 20px",
    background: "#12111b",
    border: "1px solid #292437",
    borderRadius: "16px",
  },

  emptyIcon: {
    fontSize: "40px",
    marginBottom: "10px",
  },

  storyGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
    gap: "18px",
  },

  storyCard: {
    background: "#12111b",
    border: "1px solid #292437",
    borderRadius: "14px",
    padding: "22px",
  },

  storyIcon: {
    fontSize: "27px",
    marginBottom: "12px",
  },

  storyTitle: {
    fontSize: "18px",
    margin: "0 0 10px",
    overflowWrap: "anywhere",
  },

  storyDate: {
    color: "#9993aa",
    fontSize: "12px",
    marginBottom: "18px",
  },

  storyActions: {
    display: "flex",
    gap: "10px",
    flexWrap: "wrap",
  },

  readButton: {
    background: "#6d28d9",
    color: "#ffffff",
    border: "none",
    borderRadius: "8px",
    padding: "9px 14px",
    cursor: "pointer",
  },

  deleteButton: {
    background: "transparent",
    color: "#fca5a5",
    border: "1px solid #7f3030",
    borderRadius: "8px",
    padding: "9px 14px",
    cursor: "pointer",
  },

  bottomSection: {
    background: "linear-gradient(135deg, #171326, #211638)",
    border: "1px solid #3b2d59",
    borderRadius: "18px",
    padding: "35px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "25px",
    flexWrap: "wrap",
    marginBottom: "45px",
  },

  bottomTitle: {
    fontSize: "25px",
    margin: "0 0 10px",
  },

  bottomText: {
    color: "#aaa4b8",
    fontSize: "14px",
    lineHeight: 1.7,
    maxWidth: "550px",
  },

  bottomButtons: {
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
    gap: "5px",
  },

  footer: {
    borderTop: "1px solid #272333",
    paddingTop: "22px",
    textAlign: "center",
    color: "#777184",
    fontSize: "12px",
  },

  modalOverlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.8)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
    zIndex: 1000,
  },

  modal: {
    position: "relative",
    background: "#151321",
    border: "1px solid #403454",
    borderRadius: "16px",
    padding: "35px",
    width: "100%",
    maxWidth: "750px",
    maxHeight: "85vh",
    overflowY: "auto",
  },

  modalClose: {
    position: "absolute",
    top: "15px",
    right: "18px",
    background: "transparent",
    border: "none",
    color: "#ffffff",
    fontSize: "28px",
    cursor: "pointer",
  },

  modalTitle: {
    fontSize: "27px",
    marginBottom: "20px",
    paddingRight: "25px",
  },

  modalContent: {
    color: "#ded9e9",
    fontSize: "15px",
    lineHeight: 1.9,
    whiteSpace: "pre-wrap",
    marginBottom: "25px",
  },
};
