import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { profile } from "@/data/profile";
import { contact } from "@/data/contact";
import "./globals.css";

const SITE_URL = "https://azaannoman.vercel.app";
const socials = contact.channels
  .filter((c) => c.href.startsWith("http"))
  .map((c) => c.href);

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${profile.name} — ${profile.tagline}`,
    template: `%s — ${profile.name}`,
  },
  description: profile.summary,
  applicationName: `${profile.name} — Portfolio`,
  keywords: [
    "Azaan Noman",
    "Azaan Noman portfolio",
    "Azaan Noman developer",
    "Systems Builder",
    "AI Explorer",
    "Problem Solver",
    "AI engineer",
    "Automation",
    "Software Engineer",
  ],
  authors: [{ name: profile.name, url: SITE_URL }],
  creator: profile.name,
  publisher: profile.name,
  alternates: { canonical: "/" },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "profile",
    siteName: `${profile.name} — Portfolio`,
    url: SITE_URL,
    title: `${profile.name} — ${profile.tagline}`,
    description: profile.summary,
    locale: "en_US",
    images: [
      {
        url: "/photos/portrait.jpg",
        width: 720,
        height: 720,
        alt: profile.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${profile.name} — ${profile.tagline}`,
    description: profile.summary,
    images: ["/photos/portrait.jpg"],
  },
  category: "technology",
};

export const viewport: Viewport = {
  themeColor: "#f4ede2",
  width: "device-width",
  initialScale: 1,
};

// Structured data so Google rich results & AI assistants can identify Azaan.
const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  url: SITE_URL,
  image: `${SITE_URL}/photos/portrait.jpg`,
  jobTitle: "Systems Builder",
  description: profile.summary,
  email: `mailto:${contact.email}`,
  knowsAbout: [
    "Artificial Intelligence",
    "Automation",
    "Systems Design",
    "Software Engineering",
  ],
  sameAs: socials,
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: `${profile.name} — Portfolio`,
  url: SITE_URL,
  inLanguage: "en",
  about: { "@type": "Person", name: profile.name },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable} ${GeistMono.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
      </head>
      <body className="min-h-screen bg-background font-sans text-foreground antialiased">
        {children}
      </body>
    </html>
  );
}
