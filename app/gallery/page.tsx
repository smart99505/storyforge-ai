"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

type GalleryImage = {
  id: string;
  prompt: string;
  style: string;
  image_path: string;
  created_at: string;
  image_url?: string;
};

export default function GalleryPage() {
  const router = useRouter();

  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [deleting, setDeleting] = useState("");

  useEffect(() => {
    loadImages();
  }, []);

  async function loadImages() {
    setLoading(true);
    setMessage("");

    try {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        router.push("/login");
        return;
      }

      const { data, error } = await supabase
        .from("generated_images")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (error) throw error;

      const galleryImages = await Promise.all(
        (data || []).map(async (item) => {
          const { data: signedData, error: signedError } =
            await supabase.storage
              .from("storyforge-images")
              .createSignedUrl(item.image_path, 3600);

          if (signedError) {
            console.error(signedError);
          }

          return {
            ...item,
            image_url: signedData?.signedUrl || "",
          };
        })
      );

      setImages(galleryImages);
    } catch (error) {
      const details =
        error instanceof Error ? error.message : "Please try again.";

      setMessage(`Unable to load your gallery: ${details}`);
    } finally {
      setLoading(false);
    }
  }

  async function deleteImage(item: GalleryImage) {
    const confirmed = window.confirm(
      "Are you sure you want to permanently delete this image?"
    );

    if (!confirmed) return;

    setDeleting(item.id);
    setMessage("");

    try {
      const { error: storageError } = await supabase.storage
        .from("storyforge-images")
        .remove([item.image_path]);

      if (storageError) throw storageError;

      const { error: databaseError } = await supabase
        .from("generated_images")
        .delete()
        .eq("id", item.id);

      if (databaseError) throw databaseError;

      setImages((previous) =>
        previous.filter((image) => image.id !== item.id)
      );

      setMessage("Image deleted successfully.");
    } catch (error) {
      const details =
        error instanceof Error ? error.message : "Please try again.";

      setMessage(`Unable to delete image: ${details}`);
    } finally {
      setDeleting("");
    }
  }

  async function downloadImage(item: GalleryImage) {
    if (!item.image_url) {
      setMessage("Image link unavailable. Please refresh the gallery.");
      return;
    }

    try {
      const response = await fetch(item.image_url);

      if (!response.ok) {
        throw new Error("Unable to download image.");
      }

      const blob = await response.blob();
      const objectUrl = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = objectUrl;
      link.download = `storyforge-image-${item.id}.png`;

      document.body.appendChild(link);
      link.click();
      link.remove();

      URL.revokeObjectURL(objectUrl);
    } catch {
      window.open(item.image_url, "_blank");
    }
  }

  return (
    <main style={styles.page}>
      <header style={styles.header}>
        <button
          onClick={() => router.push("/dashboard")}
          style={styles.button}
        >
          ← Dashboard
        </button>

        <h2 style={styles.logo}>
          StoryForge <span style={{ color: "#c084fc" }}>AI</span>
        </h2>

        <button
          onClick={() => router.push("/images")}
          style={styles.button}
        >
          Create Image +
        </button>
      </header>

      <section style={styles.container}>
        <p style={styles.label}>YOUR CREATIVE COLLECTION</p>

        <h1 style={styles.heading}>My Image Gallery</h1>

        <p style={styles.description}>
          All your saved StoryForge AI creations in one place.
        </p>

        {message && <div style={styles.message}>{message}</div>}

        {loading ? (
          <div style={styles.empty}>
            Loading your images...
          </div>
        ) : images.length === 0 ? (
          <div style={styles.empty}>
            <div style={{ fontSize: "55px" }}>🎨</div>

            <h2>Your gallery is waiting</h2>

            <p>
              You haven't saved any images yet.
              Generate your first image and save it here.
            </p>

            <button
              onClick={() => router.push("/images")}
              style={styles.createButton}
            >
              Create Your First Image →
            </button>
          </div>
        ) : (
          <>
            <div style={styles.count}>
              {images.length} saved {images.length === 1 ? "image" : "images"}
            </div>

            <div style={styles.grid}>
              {images.map((item) => (
                <article key={item.id} style={styles.card}>
                  {item.image_url ? (
                    <img
                      src={item.image_url}
                      alt={item.prompt}
                      style={styles.image}
                    />
                  ) : (
                    <div style={styles.imageUnavailable}>
                      Image unavailable
                    </div>
                  )}

                  <div style={styles.cardContent}>
                    <span style={styles.styleTag}>{item.style}</span>

                    <p style={styles.prompt}>{item.prompt}</p>

                    <p style={styles.date}>
                      {new Date(item.created_at).toLocaleDateString()}
                    </p>

                    <button
                      onClick={() => downloadImage(item)}
                      style={styles.downloadButton}
                      disabled={!item.image_url}
                    >
                      Download ↓
                    </button>

                    <button
                      onClick={() => deleteImage(item)}
                      style={styles.deleteButton}
                      disabled={deleting === item.id}
                    >
                      {deleting === item.id
                        ? "Deleting..."
                        : "Delete Image"}
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </>
        )}
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
    gap: "10px",
  },
  logo: {
    fontSize: "22px",
    fontWeight: 800,
  },
  button: {
    background: "rgba(255,255,255,0.08)",
    border: "1px solid rgba(255,255,255,0.15)",
    color: "white",
    padding: "10px 15px",
    borderRadius: "9px",
    cursor: "pointer",
  },
  container: {
    maxWidth: "1200px",
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
    marginBottom: "35px",
  },
  count: {
    color: "#c084fc",
    marginBottom: "20px",
    fontWeight: 700,
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
    gap: "22px",
  },
  card: {
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: "15px",
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "240px",
    objectFit: "cover",
    display: "block",
    background: "#100b19",
  },
  imageUnavailable: {
    height: "240px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#aaa1b8",
  },
  cardContent: {
    padding: "17px",
  },
  styleTag: {
    display: "inline-block",
    background: "rgba(139,92,246,0.2)",
    color: "#d8b4fe",
    padding: "5px 10px",
    borderRadius: "20px",
    fontSize: "11px",
  },
  prompt: {
    color: "#eee",
    fontSize: "13px",
    lineHeight: 1.6,
    minHeight: "42px",
  },
  date: {
    color: "#91869f",
    fontSize: "11px",
  },
  downloadButton: {
    width: "100%",
    padding: "11px",
    border: "none",
    borderRadius: "8px",
    background: "#8b5cf6",
    color: "white",
    fontWeight: 700,
    cursor: "pointer",
    marginTop: "8px",
  },
  deleteButton: {
    width: "100%",
    padding: "11px",
    border: "1px solid rgba(248,113,113,0.4)",
    borderRadius: "8px",
    background: "rgba(248,113,113,0.1)",
    color: "#fca5a5",
    fontWeight: 700,
    cursor: "pointer",
    marginTop: "8px",
  },
  empty: {
    padding: "65px 20px",
    textAlign: "center",
    background: "rgba(255,255,255,0.04)",
    border: "1px dashed #65417f",
    borderRadius: "18px",
    color: "#aaa1b8",
    lineHeight: 1.8,
  },
  createButton: {
    padding: "14px 22px",
    border: "none",
    borderRadius: "9px",
    background: "linear-gradient(135deg, #8b5cf6, #c026d3)",
    color: "white",
    fontWeight: 800,
    cursor: "pointer",
    marginTop: "15px",
  },
  message: {
    marginBottom: "20px",
    padding: "13px",
    borderRadius: "9px",
    background: "rgba(139,92,246,0.12)",
    color: "#e9d5ff",
  },
};
