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

  useEffect(() => {
    async function loadUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.replace("/login");
        return;
      }

      setEmail(user.email ?? "");
      setLoading(false);
    }

    loadUser();
  }, [router]);

  async function handleLogout() {
    await supabase.auth.signOut();
    router.replace("/login");
  }

  if (loading) {
    return (
      <main
        style={{
          minHeight: "100vh",
          background: "#08050f",
          color: "white",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "Arial, sans-serif",
        }}
      >
        Loading your workspace...
      </main>
    );
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle at top right, #24104d 0%, #08050f 45%, #050308 100%)",
        color: "white",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <header
        style={{
          height: "72px",
          borderBottom: "1px solid rgba(255,255,255,0.1)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 32px",
        }}
      >
        <div
          style={{
            fontSize: "22px",
            fontWeight: 800,
          }}
        >
          StoryForge <span style={{ color: "#c084fc" }}>AI</span>
        </div>

        <button
          onClick={handleLogout}
          style={{
            border: "1px solid rgba(255,255,255,0.18)",
            background: "rgba(255,255,255,0.06)",
            color: "white",
            padding: "10px 18px",
            borderRadius: "10px",
            cursor: "pointer",
          }}
        >
          Log out
        </button>
      </header>

      <section
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          padding: "60px 24px",
        }}
      >
        <p
          style={{
            color: "#c084fc",
            fontWeight: 700,
            marginBottom: "10px",
          }}
        >
          YOUR CREATIVE WORKSPACE
        </p>

        <h1
          style={{
            fontSize: "42px",
            lineHeight: 1.1,
            margin: "0 0 12px",
          }}
        >
          Welcome to StoryForge AI.
        </h1>

        <p
          style={{
            color: "#aaa1b8",
            fontSize: "17px",
            marginBottom: "8px",
          }}
        >
          Signed in as {email}
        </p>

        <p
          style={{
            color: "#aaa1b8",
            maxWidth: "650px",
            lineHeight: 1.6,
            marginBottom: "40px",
          }}
        >
          Turn your ideas into stories, images and entire creative worlds
          from one powerful workspace.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "20px",
          }}
        >
          <div
            style={{
              padding: "28px",
              borderRadius: "20px",
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            <div style={{ fontSize: "34px", marginBottom: "16px" }}>✍️</div>

            <h2 style={{ marginBottom: "10px" }}>AI Stories</h2>

            <p
              style={{
                color: "#aaa1b8",
                lineHeight: 1.5,
                marginBottom: "20px",
              }}
            >
              Create stories, scripts, characters and creative concepts with
              AI.
            </p>

            <button
              style={{
                width: "100%",
                padding: "12px",
                border: "none",
                borderRadius: "10px",
                background: "linear-gradient(135deg, #8b5cf6, #c026d3)",
                color: "white",
                fontWeight: 700,
                cursor: "pointer",
              }}
            >
              Create a story
            </button>
          </div>

          <div
            style={{
              padding: "28px",
              borderRadius: "20px",
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            <div style={{ fontSize: "34px", marginBottom: "16px" }}>🎨</div>

            <h2 style={{ marginBottom: "10px" }}>AI Images</h2>

            <p
              style={{
                color: "#aaa1b8",
                lineHeight: 1.5,
                marginBottom: "20px",
              }}
            >
              Turn your ideas into stunning AI-generated visual concepts.
            </p>

            <button
              style={{
                width: "100%",
                padding: "12px",
                border: "none",
                borderRadius: "10px",
                background: "rgba(255,255,255,0.1)",
                color: "white",
                fontWeight: 700,
                cursor: "pointer",
              }}
            >
              Create an image
            </button>
          </div>

          <div
            style={{
              padding: "28px",
              borderRadius: "20px",
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            <div style={{ fontSize: "34px", marginBottom: "16px" }}>🌎</div>

            <h2 style={{ marginBottom: "10px" }}>Creative Worlds</h2>

            <p
              style={{
                color: "#aaa1b8",
                lineHeight: 1.5,
                marginBottom: "20px",
              }}
            >
              Build characters, settings and interconnected fictional worlds.
            </p>

            <button
              style={{
                width: "100%",
                padding: "12px",
                border: "none",
                borderRadius: "10px",
                background: "rgba(255,255,255,0.1)",
                color: "white",
                fontWeight: 700,
                cursor: "pointer",
              }}
            >
              Build a world
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
