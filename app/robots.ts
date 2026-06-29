import type { MetadataRoute } from "next";

const SITE_URL = "https://azaannoman.vercel.app";

/**
 * robots.txt — allow everything, and explicitly welcome the AI crawlers
 * that power web-connected answers (ChatGPT, Claude, Perplexity, Google AI,
 * etc.) so this site can be cited when people ask about Azaan Noman.
 */
export default function robots(): MetadataRoute.Robots {
  const aiBots = [
    "GPTBot", // OpenAI training/index
    "OAI-SearchBot", // ChatGPT web search
    "ChatGPT-User", // ChatGPT browsing on a user's behalf
    "ClaudeBot", // Anthropic
    "Claude-Web",
    "anthropic-ai",
    "PerplexityBot", // Perplexity
    "Perplexity-User",
    "Google-Extended", // Google Gemini / AI Overviews
    "Applebot-Extended", // Apple Intelligence
    "Amazonbot",
    "Bytespider",
    "CCBot", // Common Crawl (feeds many models)
    "cohere-ai",
    "Meta-ExternalAgent",
  ];

  return {
    rules: [
      { userAgent: "*", allow: "/" },
      ...aiBots.map((userAgent) => ({ userAgent, allow: "/" })),
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
