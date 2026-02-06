import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://fertility-collapse.com'),
  title: "Fertility Collapse as Phase Transition",
  description: "A Binary Classification Model Across 62 Countries — Interactive research on the global fertility collapse",
  icons: {
    icon: '/icon.svg',
  },
  openGraph: {
    title: "Fertility Collapse as Phase Transition",
    description: "62 countries. 79% accuracy. 1 unexplained anomaly. An interactive exploration of the global fertility collapse.",
    type: "website",
    images: [{ url: '/og-image.svg', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Fertility Collapse as Phase Transition",
    description: "62 countries. 79% accuracy. 1 unexplained anomaly. An interactive exploration of the global fertility collapse.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`dark ${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="text-text-primary font-sans antialiased" style={{ backgroundColor: '#0a0a1a' }}>
        {children}
      </body>
    </html>
  );
}
