import type { Metadata } from "next";
import { Rajdhani, Inter, Share_Tech_Mono } from "next/font/google";
import "./globals.css";

const rajdhani = Rajdhani({
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-rajdhani",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const mono = Share_Tech_Mono({
  weight: "400",
  variable: "--font-share-tech-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CyberPhunk — Connect. Collaborate. Create.",
  description: "The premier Web3 community platform for builders, innovators, and digital sovereignty advocates.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${rajdhani.variable} ${inter.variable} ${mono.variable} font-body antialiased bg-background text-foreground min-h-screen`}
      >
        {children}
      </body>
    </html>
  );
}
