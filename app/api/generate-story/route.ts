import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { prompt, genre, length } = body;

    if (!prompt || !prompt.trim()) {
      return NextResponse.json(
        { error: "Please provide a story idea." },
        { status: 400 }
      );
    }

    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: "AI service is not configured yet." },
        { status: 500 }
      );
    }

    const response = await fetch(
      "https://api.openai.com/v1/responses",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "gpt-5-mini",
          input: [
            {
              role: "system",
              content:
                "You are StoryForge AI, a professional creative writing assistant. Create engaging, original stories with strong characters, vivid scenes, natural dialogue, and a satisfying narrative arc.",
            },
            {
              role: "user",
              content: `Create a ${length.toLowerCase()} ${genre} story based on this idea:

${prompt}

Write the complete story. Give it a compelling title. Do not explain your process.`,
            },
          ],
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error("OpenAI API error:", data);

      return NextResponse.json(
        {
          error:
            data?.error?.message ||
            "The AI service could not generate the story.",
        },
        { status: response.status }
      );
    }

    const story =
      data.output_text ||
      data.output
        ?.flatMap((item: any) => item.content || [])
        ?.map((content: any) => content.text || "")
        ?.join("") ||
      "";

    if (!story) {
      return NextResponse.json(
        { error: "The AI returned an empty story." },
        { status: 500 }
      );
    }

    return NextResponse.json({ story });
  } catch (error) {
    console.error("Story generation error:", error);

    return NextResponse.json(
      { error: "Something went wrong while generating the story." },
      { status: 500 }
    );
  }
}
