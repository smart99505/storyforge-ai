export default function Home() {
  return (
    <main style={{
      minHeight: "100vh",
      background: "#0b0b12",
      color: "white",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "Arial, sans-serif",
      padding: "40px"
    }}>
      <div style={{
        maxWidth: "900px",
        textAlign: "center"
      }}>
        <div style={{
          fontSize: "18px",
          fontWeight: "700",
          letterSpacing: "2px",
          marginBottom: "25px"
        }}>
          STORYFORGE AI
        </div>

        <h1 style={{
          fontSize: "clamp(45px, 8vw, 90px)",
          lineHeight: "1",
          margin: "0 0 25px"
        }}>
          Turn ideas into
          <br />
          stories, images & worlds.
        </h1>

        <p style={{
          fontSize: "20px",
          color: "#b8b8c5",
          maxWidth: "650px",
          margin: "0 auto 40px"
        }}>
          Create unforgettable stories and visual worlds with AI.
          StoryForge AI brings your imagination to life.
        </p>

        <button style={{
          border: "none",
          borderRadius: "12px",
          padding: "16px 30px",
          fontSize: "17px",
          fontWeight: "700",
          cursor: "pointer"
        }}>
          Start Creating
        </button>
      </div>
    </main>
  );
}
