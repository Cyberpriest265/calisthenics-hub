import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CalisthenicsHub — Master Bodyweight Training",
  description: "Learn calisthenics from expert coaches. Master pull-ups, muscle-ups, handstands and more with our structured video courses.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
