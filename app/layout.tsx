import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "StoryForge AI",
  description: "Turn ideas into stories, images & worlds."
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
