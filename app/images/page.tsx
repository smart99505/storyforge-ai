"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

declare global {
  interface Window {
    puter?: {
      ai: {
        txt2img: (
          prompt: string,
          options: boolean | Record<string, unknown>
        ) => Promise<HTMLImageElement>;
      };
    };
  }
}

export default function ImagesPage() {
  const router = useRouter();

  const [prompt, setPrompt] = useState("");
  const [style, setStyle] = useState("Photorealistic");
  const [ratio, setRatio] = useState("1:1");
  const [testMode, setTestMode] = useState(true);
  const [image, setImage] = useState("");
  const [generating, setGenerating] = useState(false);
  const [message, setMessage] = useState("");
  const [scriptReady, setScriptReady] = useState(false);

  useEffect(() => {
    if (window.puter) {
      setScriptReady(true);
      return;
    }

    const existing = document.querySelector(
      'script[src="https://js.puter.com/v2/"]'
    ) as HTMLScriptElement | null;

    if (existing) {
      existing.addEventListener("load", () => setScriptReady(true));
      return;
    }

    const script = document.createElement("script");
    script.src = "https://js.puter.com/v2/";
    script.async = true;

    script.onload = () => setScriptReady(true);
    script.onerror = () =>
      setMessage("Unable to load the image service. Please refresh.");

    document.body.appendChild(script);

    return () => {
      script.onload = null;
      script.onerror = null;
    };
  }, []);

  async function generateImage() {
    if (!prompt.trim()) {
      setMessage("Please describe the image you want to create.");
      return;
    }

    if (!window.puter) {
      setMessage("Image service is still loading. Please wait.");
      return;
    }

    setGenerating(true);
    setMessage("");
    setImage("");

    const fullPrompt = `${prompt.trim()}. Visual style: ${style}.`;

    try {
      let result: HTMLImageElement;

      if (testMode) {
        result = await window.puter.ai.txt2img(fullPrompt, true);
      } else {
        const dimensions =
          ratio === "16:9"
            ? { w: 16, h: 9 }
            : ratio === "9:16"
            ? { w: 9, h: 16 }
            : { w: 1, h: 1 };

        result = await window.puter.ai.txt2img(fullPrompt, {
          ratio: dimensions,
        });
      }

      setImage(result.src);
      setMessage(
        testMode
          ? "Your free test preview is ready. It is a sample, not a prompt-specific AI image."
          : "Your AI image has been generated successfully!"
      );
    } catch (error) {
      const details =
        error instanceof Error ? error.message : "Please try again.";

      setMessage(`Image generation failed: ${details}`);
    } finally {
      setGenerating(false);
    }
  }

  function downloadImage() {
    if (!image) return;

    const link = document.createElement("a");
    link.href = image;
    link.download = "storyforge-ai-image.png";
    document.body.appendChild(link);
    link.click();
    link.remove();
  }

  return (
    <main style={styles.page}>
      <header style={styles.header}>
        <button
          onClick={() => router.push("/dashboard")}
          style={styles.backButton}
        >
          ← Dashboard
        </button>

        <a href="/dashboard" style={styles.logo}>
          StoryForge <span style={{ color: "#c084fc" }}>AI</span>
        </a>
      </header>

      <section style={styles.container}>
        <p style={styles.label}>STORYFORGE AI CREATIVE STUDIO</p>

        <h1 style={styles.heading}>AI Image Generator</h1>

        <p style={styles.description}>
          Bring your imagination to life. Describe an image, choose
          your preferred style and create something extraordinary.
        </p>

        <div style={styles.workspace}>
          <div style={styles.controls}>
            <label style={styles.fieldLabel}>
              Describe your image
            </label>

            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Example: A beautiful futuristic city at sunset, flying cars, glowing buildings and cinematic lighting..."
              style={styles.textarea}
            />

            <label style={styles.fieldLabel}>
              Choose an image style
            </label>

            <select
              value={style}
              onChange={(e) => setStyle(e.target.value)}
              style={styles.select}
            >
              <option>Photorealistic</option>
              <option>Anime</option>
              <option>Fantasy</option>
              <option>3D Render</option>
              <option>Digital Art</option>
              <option>Oil Painting</option>
              <option>Watercolor</option>
              <option>Cinematic</option>
            </select>

            <label style={styles.fieldLabel}>
              Image dimensions
            </label>

            <select
              value={ratio}
              onChange={(e) => setRatio(e.target.value)}
              style={styles.select}
            >
              <option value="1:1">Square (1:1)</option>
              <option value="16:9">Landscape (16:9)</option>
              <option value="9:16">Portrait (9:16)</option>
            </select>

            <div style={styles.modeBox}>
              <label style={styles.modeLabel}>
                <input
                  type="checkbox"
                  checked={testMode}
                  onChange={(e) => setTestMode(e.target.checked)}
                />

                Free test preview
              </label>

              <p style={styles.modeDescription}>
                {testMode
                  ? "Free sample mode. No AI image credits are used, but the sample will not match your prompt."
                  : "Real AI generation. Your Puter account handles any applicable usage charges or free allowance."}
              </p>
            </div>

            <button
              onClick={generateImage}
              disabled={generating || !scriptReady}
              style={{
                ...styles.generateButton,
                opacity: generating || !scriptReady ? 0.6 : 1,
              }}
            >
              {generating
                ? "Creating your image..."
                : !scriptReady
                ? "Loading image service..."
                : testMode
                ? "Generate Free Test Preview →"
                : "Generate AI Image →"}
            </button>

            {!testMode && (
              <p style={styles.warning}>
                Actual image generation may use your Puter account's
                free allowance or incur charges. Check the model and
                account terms before generating.
              </p>
            )}
          </div>

          <div style={styles.preview}>
            <h2 style={styles.previewHeading}>Image Preview</h2>

            {generating ? (
              <div style={styles.placeholder}>
                <div style={{ fontSize: "45px" }}>✨</div>
                <p>Creating your image...</p>
                <p style={styles.smallText}>
                  Please wait while the image service works.
                </p>
              </div>
            ) : image ? (
              <div>
                <img
                  src={image}
                  alt="Generated StoryForge image"
                  style={styles.generatedImage}
                />

                <button
                  onClick={downloadImage}
                  style={styles.downloadButton}
                >
                  Download Image ↓
                </button>
              </div>
            ) : (
              <div style={styles.placeholder}>
                <div style={{ fontSize: "55px" }}>🎨</div>
                <h3>Your image will appear here</h3>
                <p style={styles.smallText}>
                  Enter a description and click the generate button
                  to get started.
                </p>
              </div>
            )}

            {message && (
              <div style={styles.message}>
                {message}
              </div>
            )}
          </div>
        </div>

        <section style={styles.tips}>
          <h2>Tips for better images</h2>
          <p>
            Describe your subject, background, lighting, colours,
            atmosphere and camera angle. More detail can help produce
            better results.
          </p>
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

  backButton: {
    background: "rgba(255,255,255,0.08)",
    border: "1px solid rgba(255,255,255,0.15)",
    color: "white",
    padding: "10px 15px",
    borderRadius: "9px",
    cursor: "pointer",
  },

  container: {
    maxWidth: "1150px",
    margin: "0 auto",
    padding: "55px 24px",
  },

  label: {
    color: "#c084fc",
    fontSize: "12px",
    fontWeight: 800,
    letterSpacing: "1.5px",
  },

  heading: {
    fontSize: "clamp(32px, 5vw, 46px)",
    margin: "15px 0",
  },

  description: {
    color: "#aaa1b8",
    lineHeight: 1.7,
    maxWidth: "650px",
    marginBottom: "35px",
  },

  workspace: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "25px",
  },

  controls: {
    padding: "25px",
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: "18px",
  },

  fieldLabel: {
    display: "block",
    fontSize: "14px",
    fontWeight: 700,
    marginBottom: "10px",
    marginTop: "18px",
  },

  textarea: {
    width: "100%",
    minHeight: "150px",
    resize: "vertical",
    boxSizing: "border-box",
    padding: "14px",
    borderRadius: "10px",
    border: "1px solid #49305e",
    background: "#100b19",
    color: "white",
    fontSize: "14px",
    lineHeight: 1.6,
  },

  select: {
    width: "100%",
    padding: "13px",
    borderRadius: "10px",
    border: "1px solid #49305e",
    background: "#100b19",
    color: "white",
  },

  modeBox: {
    marginTop: "22px",
    padding: "15px",
    borderRadius: "10px",
    background: "rgba(139,92,246,0.1)",
    border: "1px solid rgba(192,132,252,0.25)",
  },

  modeLabel: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    fontWeight: 700,
    fontSize: "14px",
    cursor: "pointer",
  },

  modeDescription: {
    color: "#aaa1b8",
    fontSize: "12px",
    lineHeight: 1.6,
    marginBottom: 0,
  },

  generateButton: {
    width: "100%",
    padding: "15px",
    border: "none",
    borderRadius: "10px",
    background: "linear-gradient(135deg, #8b5cf6, #c026d3)",
    color: "white",
    fontWeight: 800,
    cursor: "pointer",
    marginTop: "22px",
  },

  warning: {
    color: "#fbbf24",
    fontSize: "12px",
    lineHeight: 1.6,
  },

  preview: {
    padding: "25px",
    borderRadius: "18px",
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.1)",
    minHeight: "430px",
  },

  previewHeading: {
    fontSize: "20px",
    marginTop: 0,
    marginBottom: "20px",
  },

  placeholder: {
    minHeight: "340px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    borderRadius: "12px",
    border: "1px dashed #65417f",
    padding: "20px",
    color: "#ddd",
  },

  smallText: {
    color: "#aaa1b8",
    fontSize: "13px",
    lineHeight: 1.7,
    maxWidth: "300px",
  },

  generatedImage: {
    display: "block",
    width: "100%",
    maxHeight: "500px",
    objectFit: "contain",
    borderRadius: "12px",
    background: "#08050f",
  },

  downloadButton: {
    width: "100%",
    padding: "13px",
    border: "none",
    borderRadius: "10px",
    background: "#8b5cf6",
    color: "white",
    fontWeight: 700,
    cursor: "pointer",
    marginTop: "15px",
  },

  message: {
    marginTop: "18px",
    padding: "13px",
    borderRadius: "9px",
    background: "rgba(139,92,246,0.12)",
    color: "#e9d5ff",
    fontSize: "13px",
    lineHeight: 1.6,
  },

  tips: {
    marginTop: "40px",
    padding: "25px",
    borderRadius: "15px",
    background: "rgba(139,92,246,0.08)",
    border: "1px solid rgba(192,132,252,0.2)",
    color: "#aaa1b8",
    lineHeight: 1.7,
  },
};
