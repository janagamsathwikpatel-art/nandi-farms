import type { Metadata } from "next";
import { Cormorant_Garamond, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-serif",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Nandi Farms | Grown with care. Rooted in nature.",
  description: "Experience organic farming, community living, and fresh-from-the-farm harvests delivered directly to your doorstep.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${cormorant.variable} ${jakarta.variable} scroll-smooth`}>
      <body className="font-sans antialiased bg-[#fbf9f5] text-[#222e23] selection:bg-[#c58b4a] selection:text-white">
        {children}
      </body>
    </html>
  );
}
