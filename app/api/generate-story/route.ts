import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { prompt, genre, length } = await request.json();

    if (!prompt || !prompt.trim()) {
      return NextResponse.json(
        { error: "Please provide a story idea." },
        { status: 400 }
      );
    }

    const idea = prompt.trim();
    const storyGenre = genre || "Fantasy";

    const title = `The Mystery of ${
      idea.split(" ").slice(0, 5).join(" ")
    }`;

    const shortStory = `
${title}

Genre: ${storyGenre}

CHAPTER ONE: THE BEGINNING

Every extraordinary story begins with an unexpected moment.

It all started when someone least expected it. ${idea}

At first, nobody understood what was happening. The world seemed ordinary, but beneath the surface, something extraordinary was taking shape.

The first signs appeared quietly. Strange events began unfolding, and questions that had remained unanswered for years suddenly demanded attention.

CHAPTER TWO: THE DISCOVERY

As the days passed, the situation became increasingly complicated.

Our protagonist discovered that the truth was much bigger than anyone had imagined. Every new discovery revealed another secret.

There were obstacles, unexpected friendships, and decisions that could change everything.

CHAPTER THREE: THE TURNING POINT

Just when everything seemed to be falling into place, an unexpected revelation changed the direction of the entire journey.

The protagonist had to make a difficult choice.

There was no guarantee of success, but giving up was no longer an option.

CHAPTER FOUR: THE ENDING

After everything that had happened, the final pieces of the mystery began to fall into place.

The journey had changed everyone involved.

And although the immediate danger had passed, one important question remained unanswered.

Some stories end with a conclusion.

Others are only beginning.
`;

    let story = shortStory;

    if (length === "Medium") {
      story += `

CHAPTER FIVE: NEW BEGINNINGS

The consequences of the previous events continued to unfold.

New challenges emerged, and the protagonist discovered that every victory came with a price.

The people they trusted became important allies, while unexpected enemies revealed themselves.

In the end, the greatest challenge was not defeating an opponent, but understanding what truly mattered.
`;
    }

    if (length === "Long") {
      story += `

CHAPTER FIVE: THE HIDDEN TRUTH

Beyond the events already experienced, another mystery waited to be uncovered.

Old secrets resurfaced. Relationships were tested, and the protagonist began to understand that the events of the past were connected in ways nobody had imagined.

CHAPTER SIX: THE FINAL CHALLENGE

The greatest confrontation was approaching.

Every decision mattered. Every sacrifice carried consequences.

With courage and determination, the protagonist faced the challenge that would determine the future.

CHAPTER SEVEN: A NEW DESTINY

When the dust finally settled, nothing was quite the same.

The journey had revealed unexpected truths about friendship, courage, loyalty and sacrifice.

Yet somewhere in the distance, another adventure was waiting.
`;
    }

    return NextResponse.json({
      success: true,
      mode: "demo",
      story
    });

  } catch (error) {
    console.error("Story generation error:", error);

    return NextResponse.json(
      { error: "Unable to generate your story." },
      { status: 500 }
    );
  }
}
