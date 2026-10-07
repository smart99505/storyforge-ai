"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function StoryPage() {
  const router = useRouter();

  const [prompt, setPrompt] = useState("");
  const [genre, setGenre] = useState("Fantasy");
  const [length, setLength] = useState("Short");
  const [loading, setLoading] = useState(false);
  const [story, setStory] = useState("");
  const [error, setError] = useState("");

  async function generateStory() {
    if (!prompt.trim()) {
      setError("Please describe the story you want to create.");
      return;
    }

    setLoading(true);
    setError("");
    setStory("");

    try {
      const response = await fetch("/api/generate-story", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt,
          genre,
          length,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong.");
      }

      setStory(data.story);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to generate your story."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle at top, #211033 0%, #08050f 45%, #05030a 100%)",
        color: "white",
        fontFamily: "Arial, sans-serif",
        padding: "30px",
      }}
    >
      <header
        style={{
          maxWidth: "1100px",
          margin: "0 auto 40px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <button
          onClick={() => router.push("/dashboard")}
          style={{
            background: "transparent",
            border: "1px solid #3b2850",
            color: "#ddd",
            padding: "10px 16px",
            borderRadius: "10px",
            cursor: "pointer",
          }}
        >
          ← Dashboard
        </button>

        <div
          style={{
            fontSize: "24px",
            fontWeight: "800",
          }}
        >
          StoryForge <span style={{ color: "#c084fc" }}>AI</span>
        </div>
      </header>

      <section
        style={{
          maxWidth: "900px",
          margin: "0 auto",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "35px" }}>
          <p
            style={{
              color: "#c084fc",
              fontWeight: "700",
              letterSpacing: "2px",
              fontSize: "13px",
            }}
          >
            AI STORY STUDIO
          </p>

          <h1
            style={{
              fontSize: "46px",
              margin: "10px 0",
            }}
          >
            Turn an idea into a story.
          </h1>

          <p
            style={{
              color: "#aaa",
              fontSize: "17px",
            }}
          >
            Describe your idea and let StoryForge AI bring it to life.
          </p>
        </div>

        <div
          style={{
            background: "#100b19",
            border: "1px solid #2d203b",
            borderRadius: "20px",
            padding: "28px",
          }}
        >
          <label
            style={{
              display: "block",
              marginBottom: "10px",
              fontWeight: "700",
            }}
          >
            What should the story be about?
          </label>

          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Example: A young Nigerian girl discovers a mysterious door hidden beneath her grandmother's house..."
            rows={7}
            style={{
              width: "100%",
              boxSizing: "border-box",
              background: "#08050f",
              color: "white",
              border: "1px solid #3b2850",
              borderRadius: "12px",
              padding: "16px",
              fontSize: "16px",
              resize: "vertical",
              outline: "none",
            }}
          />

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "18px",
              marginTop: "20px",
            }}
          >
            <div>
              <label
                style={{
                  display: "block",
                  marginBottom: "8px",
                  fontWeight: "700",
                }}
              >
                Genre
              </label>

              <select
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
                style={{
                  width: "100%",
                  background: "#08050f",
                  color: "white",
                  border: "1px solid #3b2850",
                  borderRadius: "10px",
                  padding: "13px",
                  fontSize: "15px",
                }}
              >
                <option>Fantasy</option>
                <option>Romance</option>
                <option>Thriller</option>
                <option>Science Fiction</option>
                <option>Adventure</option>
                <option>Horror</option>
                <option>Mystery</option>
                <option>Children</option>
                <option>Drama</option>
              </select>
            </div>

            <div>
              <label
                style={{
                  display: "block",
                  marginBottom: "8px",
                  fontWeight: "700",
                }}
              >
                Story Length
              </label>

              <select
                value={length}
                onChange={(e) => setLength(e.target.value)}
                style={{
                  width: "100%",
                  background: "#08050f",
                  color: "white",
                  border: "1px solid #3b2850",
                  borderRadius: "10px",
                  padding: "13px",
                  fontSize: "15px",
                }}
              >
                <option>Short</option>
                <option>Medium</option>
                <option>Long</option>
              </select>
            </div>
          </div>

          {error && (
            <p
              style={{
                color: "#f87171",
                marginTop: "20px",
              }}
            >
              {error}
            </p>
          )}

          <button
            onClick={generateStory}
            disabled={loading}
            style={{
              width: "100%",
              marginTop: "25px",
              padding: "15px",
              borderRadius: "12px",
              border: "none",
              background: loading ? "#6b3c88" : "#a855f7",
              color: "white",
              fontSize: "17px",
              fontWeight: "800",
              cursor: loading ? "not-allowed" : "pointer",
            }}
          >
            {loading ? "Creating your story..." : "✨ Generate Story"}
          </button>
        </div>

        {story && (
          <div
            style={{
              marginTop: "30px",
              background: "#100b19",
              border: "1px solid #2d203b",
              borderRadius: "20px",
              padding: "30px",
              lineHeight: "1.8",
            }}
          >
            <h2
              style={{
                marginTop: 0,
                color: "#c084fc",
              }}
            >
              Your Story
            </h2>

            <div
              style={{
                whiteSpace: "pre-wrap",
                color: "#e5e5e5",
                fontSize: "16px",
              }}
            >
              {story}
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
