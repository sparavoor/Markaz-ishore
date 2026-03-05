import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ishore Educational Institution | Empowering Knowledge with Values",
  description: "A center of excellence dedicated to nurturing intellectual growth, moral values, and leadership.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Lexend:wght@300;400;500;600;700;800&display=swap" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-25..0&display=swap" />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
