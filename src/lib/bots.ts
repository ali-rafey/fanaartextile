/**
 * Crawler policy.
 *
 * Search engines and AI assistants are welcome — they send real readers and
 * surface the brand. What we turn away are commercial SEO scrapers and content
 * harvesters: they crawl aggressively, cost bandwidth, and return nothing.
 *
 * robots.txt is advisory (well-behaved crawlers obey it, scrapers ignore it),
 * so the same list is enforced in middleware for the worst offenders.
 */

/** Search + AI crawlers we explicitly welcome. */
export const ALLOWED_BOTS = [
  // Search engines
  "Googlebot",
  "Googlebot-Image",
  "Bingbot",
  "DuckDuckBot",
  "Slurp",
  "YandexBot",
  "Applebot",
  // AI assistants / agents
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-User",
  "Claude-SearchBot",
  "anthropic-ai",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "Applebot-Extended",
  "CCBot",
  "Meta-ExternalAgent",
  "cohere-ai",
  // Social link unfurlers — these render your share previews
  "facebookexternalhit",
  "Twitterbot",
  "LinkedInBot",
  "WhatsApp",
  "Slackbot",
  "TelegramBot",
  "Discordbot",
];

/**
 * Commercial SEO/backlink scrapers and content harvesters. These are blocked
 * in robots.txt and hard-blocked (403) in middleware.
 */
export const BLOCKED_BOTS = [
  "AhrefsBot",
  "SemrushBot",
  "MJ12bot",
  "DotBot",
  "DataForSeoBot",
  "BLEXBot",
  "PetalBot",
  "SeekportBot",
  "serpstatbot",
  "ZoominfoBot",
  "Barkrowler",
  "ImagesiftBot",
  "Bytespider",
  "SiteAuditBot",
  "MegaIndex",
  "LinkpadBot",
  "Screaming Frog SEO Spider",
  "SEOkicks",
  "Sogou",
  "magpie-crawler",
  "TurnitinBot",
  "Riddler",
  "trendictionbot",
  "Scrapy",
  "python-requests",
  "node-fetch",
  "Go-http-client",
  "libwww-perl",
  "HTTrack",
  "WebCopier",
  "Wget",
];

// Case-insensitive match on any blocked signature.
const BLOCKED_RE = new RegExp(
  BLOCKED_BOTS.map((bot) => bot.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|"),
  "i"
);

export function isBlockedBot(userAgent: string | null): boolean {
  if (!userAgent) return false;
  return BLOCKED_RE.test(userAgent);
}
