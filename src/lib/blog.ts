export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  category: string;
  author: string;
  date: string;
  readMinutes: number;
  cover: string; // gradient class
  toc: { id: string; label: string }[];
  body: { id: string; heading: string; paragraphs: string[] }[];
};

export const POSTS: BlogPost[] = [
  {
    slug: "youtube-seo-checklist-2025",
    title: "The Complete YouTube SEO Checklist for 2025",
    description: "A practical, step-by-step SEO checklist creators can apply to every upload to rank higher and earn more impressions.",
    category: "SEO",
    author: "Maya Chen",
    date: "2025-03-12",
    readMinutes: 8,
    cover: "from-rose-500 via-red-500 to-orange-500",
    toc: [
      { id: "keywords", label: "Keyword research" },
      { id: "titles", label: "Writing click-worthy titles" },
      { id: "thumbnails", label: "Thumbnails that convert" },
      { id: "metadata", label: "Tags, descriptions & chapters" },
    ],
    body: [
      { id: "keywords", heading: "Keyword research", paragraphs: [
        "Strong YouTube SEO begins with intent-driven keyword research. Start with the core problem your video solves, then expand into adjacent search terms using YouTube Suggest, Google Trends, and competitor analysis.",
        "Aim for keywords with healthy monthly search volume but moderate competition. Long-tail variants (4–6 words) are easier to rank and often convert better.",
      ]},
      { id: "titles", heading: "Writing click-worthy titles", paragraphs: [
        "Your title is the single biggest CTR lever. Lead with the keyword, add a curiosity hook, and stay under 60 characters so nothing gets cut off in feeds.",
        "Avoid clickbait you can't deliver on — retention drops will hurt the video far more than CTR helps it.",
      ]},
      { id: "thumbnails", heading: "Thumbnails that convert", paragraphs: [
        "Design for mobile first. Use high contrast, a clear focal subject, and at most three words of supporting text.",
        "A/B test variants with YouTube's built-in thumbnail testing once you have a baseline that works.",
      ]},
      { id: "metadata", heading: "Tags, descriptions & chapters", paragraphs: [
        "Write the first 150 characters of your description as a true summary — that's the snippet Google indexes.",
        "Add chapter timestamps starting at 0:00 to unlock key moments in search and improve session time.",
      ]},
    ],
  },
  {
    slug: "thumbnail-design-principles",
    title: "5 Thumbnail Design Principles That Doubled Our CTR",
    description: "How a small visual systems overhaul lifted average CTR from 4.1% to 8.7% across a 200-video catalog.",
    category: "Thumbnails",
    author: "Jordan Pillai",
    date: "2025-02-20",
    readMinutes: 6,
    cover: "from-red-600 via-pink-500 to-rose-500",
    toc: [
      { id: "contrast", label: "Lead with contrast" },
      { id: "subject", label: "One clear subject" },
      { id: "text", label: "Text as a hook, not a caption" },
      { id: "system", label: "Design as a system" },
    ],
    body: [
      { id: "contrast", heading: "Lead with contrast", paragraphs: [
        "On a small mobile screen, contrast wins attention before composition does. Pair warm subjects with cool backgrounds, or punch a bright accent against muted scenery.",
      ]},
      { id: "subject", heading: "One clear subject", paragraphs: [
        "If a viewer can't identify the subject in 0.4 seconds, you've lost them. Crop in tight, remove background noise, and let one element carry the frame.",
      ]},
      { id: "text", heading: "Text as a hook, not a caption", paragraphs: [
        "Use 2–4 words that sharpen — not duplicate — the title. Numbers and contrast words ('Why', 'Stop', 'Finally') outperform descriptive labels.",
      ]},
      { id: "system", heading: "Design as a system", paragraphs: [
        "Lock a font, an accent color, and a recurring visual motif. Channel-level recognition compounds CTR over time.",
      ]},
    ],
  },
  {
    slug: "youtube-algorithm-2025",
    title: "How the YouTube Algorithm Actually Ranks Videos in 2025",
    description: "Cutting through the myths: what the algorithm rewards, what it ignores, and how to optimize for it without gaming it.",
    category: "Growth",
    author: "Priya Anand",
    date: "2025-01-30",
    readMinutes: 10,
    cover: "from-orange-500 via-red-500 to-rose-600",
    toc: [
      { id: "signals", label: "The signals that matter" },
      { id: "retention", label: "Retention is everything" },
      { id: "sessions", label: "Session time over single-video time" },
      { id: "myths", label: "Myths to ignore" },
    ],
    body: [
      { id: "signals", heading: "The signals that matter", paragraphs: [
        "Click-through rate, average view duration, and satisfaction signals (likes, shares, survey responses) form the core of YouTube's recommendation stack.",
      ]},
      { id: "retention", heading: "Retention is everything", paragraphs: [
        "A 60% average retention on a 10-minute video routinely outperforms a 90% retention on a 2-minute video for total watch time and recommendations.",
      ]},
      { id: "sessions", heading: "Session time over single-video time", paragraphs: [
        "End screens, playlists, and pinned next-watch comments tell YouTube your channel is keeping users in the app — a much stronger signal than any single metric.",
      ]},
      { id: "myths", heading: "Myths to ignore", paragraphs: [
        "Posting at exact times, hashtag stuffing, and 'shadowbans' are noise. Focus on packaging and delivery and the rest falls into place.",
      ]},
    ],
  },
  {
    slug: "monetization-beyond-adsense",
    title: "Monetization Beyond AdSense: 7 Revenue Streams for Creators",
    description: "Diversify your channel income with sponsorships, products, memberships, affiliate deals, and more.",
    category: "Monetization",
    author: "Daniel Okafor",
    date: "2025-01-08",
    readMinutes: 9,
    cover: "from-rose-600 via-red-500 to-orange-400",
    toc: [
      { id: "sponsorships", label: "Sponsorships" },
      { id: "products", label: "Digital & physical products" },
      { id: "memberships", label: "Memberships & community" },
      { id: "affiliate", label: "Affiliate revenue" },
    ],
    body: [
      { id: "sponsorships", heading: "Sponsorships", paragraphs: [
        "Sponsorship CPMs typically dwarf AdSense CPMs. Build a one-page media kit with audience demographics, average views, and past brand integrations.",
      ]},
      { id: "products", heading: "Digital & physical products", paragraphs: [
        "Templates, presets, courses, and merch convert your most engaged viewers into customers without relying on ad pricing cycles.",
      ]},
      { id: "memberships", heading: "Memberships & community", paragraphs: [
        "Channel memberships and Patreon work best when you offer something the public videos don't — process, archives, or community access.",
      ]},
      { id: "affiliate", heading: "Affiliate revenue", paragraphs: [
        "Pick affiliate partners you'd already recommend. A handful of evergreen review videos can compound into reliable monthly income.",
      ]},
    ],
  },
  {
    slug: "audience-retention-tactics",
    title: "12 Audience Retention Tactics That Actually Work",
    description: "Concrete editing, pacing, and storytelling moves to keep viewers watching longer.",
    category: "Growth",
    author: "Maya Chen",
    date: "2024-12-15",
    readMinutes: 7,
    cover: "from-pink-500 via-red-500 to-orange-500",
    toc: [
      { id: "hook", label: "The first 15 seconds" },
      { id: "pattern", label: "Pattern interrupts" },
      { id: "payoff", label: "Promise and payoff" },
    ],
    body: [
      { id: "hook", heading: "The first 15 seconds", paragraphs: [
        "Open with the most compelling moment in the video, then pivot to context. Don't introduce yourself before you've earned the next click.",
      ]},
      { id: "pattern", heading: "Pattern interrupts", paragraphs: [
        "A B-roll cut, sound effect, or angle change every 8–12 seconds keeps the brain engaged without feeling frantic.",
      ]},
      { id: "payoff", heading: "Promise and payoff", paragraphs: [
        "Every promise made in the title, thumbnail, and intro must be paid off explicitly. Viewers leave the moment they suspect the answer isn't coming.",
      ]},
    ],
  },
  {
    slug: "shorts-strategy-for-long-form-channels",
    title: "A Shorts Strategy for Long-Form Channels",
    description: "How to use Shorts as a top-of-funnel without cannibalizing your long-form watch time.",
    category: "Strategy",
    author: "Jordan Pillai",
    date: "2024-11-22",
    readMinutes: 6,
    cover: "from-red-500 via-rose-500 to-pink-600",
    toc: [
      { id: "purpose", label: "Set the purpose" },
      { id: "cadence", label: "Cadence and batching" },
      { id: "handoff", label: "The Shorts → long-form handoff" },
    ],
    body: [
      { id: "purpose", heading: "Set the purpose", paragraphs: [
        "Shorts are a discovery surface. Treat them like trailers — the goal is brand recognition and a subscribe, not the full story.",
      ]},
      { id: "cadence", heading: "Cadence and batching", paragraphs: [
        "Batch 6–10 Shorts in a single afternoon, then schedule them across two weeks. Consistency beats per-video polish here.",
      ]},
      { id: "handoff", heading: "The Shorts → long-form handoff", paragraphs: [
        "Pin a comment with a clear next-watch link, and use end-of-Short callouts to a long-form video that pays off the same hook.",
      ]},
    ],
  },
];

export const CATEGORIES = Array.from(new Set(POSTS.map((p) => p.category)));

export function getPost(slug: string): BlogPost | undefined {
  return POSTS.find((p) => p.slug === slug);
}

export function getRelated(slug: string, limit = 3): BlogPost[] {
  const current = getPost(slug);
  if (!current) return POSTS.slice(0, limit);
  return POSTS.filter((p) => p.slug !== slug && p.category === current.category)
    .concat(POSTS.filter((p) => p.slug !== slug && p.category !== current.category))
    .slice(0, limit);
}
