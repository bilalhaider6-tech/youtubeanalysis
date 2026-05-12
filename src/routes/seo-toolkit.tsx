import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { Container, Section } from "@/components/Container";
import { extractYouTubeId, formatTimestamp } from "@/lib/youtube";

export const Route = createFileRoute("/seo-toolkit")({
  head: () => ({
    meta: [
      { title: "YouTube SEO Toolkit — Title, Tag, Hashtag & Description Generator | TubePilot" },
      { name: "description", content: "Free YouTube SEO toolkit: generate titles, tags, hashtags and descriptions, score CTR, and build embeds — all in one place." },
      { property: "og:title", content: "YouTube SEO Toolkit — TubePilot" },
      { property: "og:description", content: "Generate titles, tags, hashtags, descriptions and embeds." },
    ],
  }),
  component: SEOToolkitPage,
});

const TOOLS = [
  { id: "title", label: "Title Generator" },
  { id: "tags", label: "Tag Generator" },
  { id: "hashtags", label: "Hashtag Generator" },
  { id: "description", label: "Description Builder" },
  { id: "analyzer", label: "CTR Analyzer" },
  { id: "embed", label: "Embed Generator" },
  { id: "timestamp", label: "Timestamp Link" },
  { id: "subscribe", label: "Subscribe Link" },
] as const;

type ToolId = typeof TOOLS[number]["id"];

function copy(text: string) {
  navigator.clipboard.writeText(text).then(
    () => toast.success("Copied to clipboard"),
    () => toast.error("Couldn't copy"),
  );
}

function SEOToolkitPage() {
  const [active, setActive] = useState<ToolId>("title");
  return (
    <>
      <section className="surface-soft">
        <Container className="py-16 sm:py-20">
          <div className="mx-auto max-w-3xl text-center">
            <span className="text-xs font-semibold uppercase tracking-wider text-primary">SEO Toolkit</span>
            <h1 className="mt-3 text-4xl font-bold sm:text-5xl">Everything you need to optimize a video</h1>
            <p className="mx-auto mt-4 max-w-xl text-muted-foreground">Eight focused SEO tools that work entirely in your browser. No accounts, no waiting.</p>
          </div>
        </Container>
      </section>
      <Section>
        <Container>
          <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
            <aside className="lg:sticky lg:top-24 lg:self-start">
              <nav className="flex gap-2 overflow-x-auto rounded-xl border border-border bg-card p-2 lg:flex-col">
                {TOOLS.map((t) => {
                  const isActive = active === t.id;
                  return (
                    <button
                      key={t.id}
                      id={t.id}
                      onClick={() => setActive(t.id)}
                      className={`whitespace-nowrap rounded-lg px-3 py-2 text-left text-sm font-medium transition ${isActive ? "bg-primary-soft text-primary" : "text-muted-foreground hover:bg-secondary hover:text-foreground"}`}
                    >
                      {t.label}
                    </button>
                  );
                })}
              </nav>
            </aside>
            <div>
              {active === "title" && <TitleGen />}
              {active === "tags" && <TagGen />}
              {active === "hashtags" && <HashtagGen />}
              {active === "description" && <DescriptionGen />}
              {active === "analyzer" && <Analyzer />}
              {active === "embed" && <EmbedGen />}
              {active === "timestamp" && <TimestampGen />}
              {active === "subscribe" && <SubscribeGen />}
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}

function Card({ title, desc, children }: { title: string; desc: string; children: React.ReactNode }) {
  return (
    <section className="rounded-2xl border border-border bg-card p-6 sm:p-8">
      <header>
        <h2 className="text-2xl font-bold">{title}</h2>
        <p className="mt-1 text-sm text-muted-foreground">{desc}</p>
      </header>
      <div className="mt-6">{children}</div>
    </section>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium">{label}</span>
      {children}
    </label>
  );
}

const inputCls = "w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm outline-none ring-focus placeholder:text-muted-foreground";

const POWER_WORDS = ["Ultimate", "Proven", "Secret", "Insane", "Stop", "Why", "How", "Best", "Easy", "Fastest", "Hidden", "Brutal", "Honest", "Complete"];
const TITLE_FORMATS = (kw: string, year: string) => [
  `The Ultimate ${kw} Guide for ${year}`,
  `${kw}: 7 Things Nobody Tells You`,
  `I Tried ${kw} for 30 Days — Here's What Happened`,
  `Stop Doing ${kw} Wrong (Do This Instead)`,
  `Why ${kw} Isn't Working for You — and the Fix`,
  `${kw} in ${year}: A Beginner's Roadmap`,
  `The Honest Truth About ${kw}`,
  `${kw} — Explained in Under 10 Minutes`,
];

function TitleGen() {
  const [kw, setKw] = useState("YouTube growth");
  const year = new Date().getFullYear().toString();
  const titles = useMemo(() => TITLE_FORMATS(kw.trim() || "Your Topic", year), [kw, year]);
  return (
    <Card title="Title Generator" desc="Generate click-worthy YouTube titles tuned for CTR and search.">
      <Field label="Topic or main keyword">
        <input className={inputCls} value={kw} onChange={(e) => setKw(e.target.value)} placeholder="e.g. iPhone 16 review" />
      </Field>
      <ul className="mt-6 space-y-2">
        {titles.map((t) => (
          <li key={t} className="flex items-center justify-between gap-3 rounded-lg border border-border bg-background p-3">
            <span className="text-sm">{t}</span>
            <button onClick={() => copy(t)} className="rounded-md border border-border px-2.5 py-1 text-xs font-medium hover:bg-secondary">Copy</button>
          </li>
        ))}
      </ul>
    </Card>
  );
}

function generateTags(seed: string): string[] {
  const base = seed.toLowerCase().split(/[\s,]+/).filter(Boolean);
  const modifiers = ["tutorial", "guide", "tips", "tricks", "review", "explained", "for beginners", "2025", "best", "how to", "top 10", "latest", "in depth", "comparison"];
  const out = new Set<string>();
  base.forEach((b) => out.add(b));
  base.forEach((b) => modifiers.forEach((m) => out.add(`${b} ${m}`)));
  base.forEach((b) => modifiers.forEach((m) => out.add(`${m} ${b}`)));
  return Array.from(out).slice(0, 30);
}

function TagGen() {
  const [seed, setSeed] = useState("youtube seo");
  const tags = useMemo(() => generateTags(seed.trim() || "youtube"), [seed]);
  return (
    <Card title="Tag Generator" desc="Build a relevant tag list around your topic. Aim for 8–15 tags, most relevant first.">
      <Field label="Topic / keywords (comma or space separated)">
        <input className={inputCls} value={seed} onChange={(e) => setSeed(e.target.value)} />
      </Field>
      <div className="mt-6 flex flex-wrap gap-2">
        {tags.map((t) => (
          <button key={t} onClick={() => copy(t)} className="rounded-full border border-border bg-background px-3 py-1 text-xs font-medium hover:bg-primary-soft hover:text-primary">{t}</button>
        ))}
      </div>
      <button onClick={() => copy(tags.join(", "))} className="mt-6 rounded-lg gradient-primary px-4 py-2 text-sm font-semibold text-primary-foreground">Copy all</button>
    </Card>
  );
}

function HashtagGen() {
  const [seed, setSeed] = useState("youtube growth");
  const hashtags = useMemo(() => {
    const words = seed.toLowerCase().replace(/[^a-z0-9 ]/g, "").split(/\s+/).filter(Boolean);
    const combos = ["tips", "shorts", "creator", "2025", "tutorial", "viral", "trending", "guide"];
    const set = new Set<string>();
    words.forEach((w) => set.add(`#${w}`));
    words.forEach((w) => combos.forEach((c) => set.add(`#${w}${c}`)));
    return Array.from(set).slice(0, 20);
  }, [seed]);
  return (
    <Card title="Hashtag Generator" desc="Use 3–5 hashtags max in descriptions. The first one shows above your title.">
      <Field label="Topic">
        <input className={inputCls} value={seed} onChange={(e) => setSeed(e.target.value)} />
      </Field>
      <div className="mt-6 flex flex-wrap gap-2">
        {hashtags.map((h) => (
          <button key={h} onClick={() => copy(h)} className="rounded-full border border-border bg-background px-3 py-1 text-xs font-medium hover:bg-primary-soft hover:text-primary">{h}</button>
        ))}
      </div>
    </Card>
  );
}

function DescriptionGen() {
  const [topic, setTopic] = useState("YouTube SEO basics");
  const [keywords, setKeywords] = useState("youtube seo, ranking, tags");
  const [channel, setChannel] = useState("Your Channel");
  const [link, setLink] = useState("https://yourwebsite.com");
  const desc = useMemo(() => {
    const kws = keywords.split(",").map((k) => k.trim()).filter(Boolean);
    return `In this video, we break down ${topic} — everything you need to know to start ranking better on YouTube today.

🔑 Key topics: ${kws.join(", ") || "the essentials"}

🔗 Useful links:
${link}

📺 Subscribe to ${channel} for weekly tutorials.

⏱ Chapters
0:00 Intro
0:45 The basics
3:20 Common mistakes
6:00 The framework
9:30 Recap

#${(kws[0] || topic).replace(/\s+/g, "")} #${channel.replace(/\s+/g, "")} #youtube`;
  }, [topic, keywords, channel, link]);
  return (
    <Card title="Description Builder" desc="SEO-rich descriptions with keywords, links and chapters.">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Video topic"><input className={inputCls} value={topic} onChange={(e) => setTopic(e.target.value)} /></Field>
        <Field label="Channel name"><input className={inputCls} value={channel} onChange={(e) => setChannel(e.target.value)} /></Field>
        <Field label="Keywords (comma separated)"><input className={inputCls} value={keywords} onChange={(e) => setKeywords(e.target.value)} /></Field>
        <Field label="Primary link"><input className={inputCls} value={link} onChange={(e) => setLink(e.target.value)} /></Field>
      </div>
      <textarea readOnly value={desc} rows={14} className="mt-6 w-full rounded-lg border border-border bg-background p-4 font-mono text-xs" />
      <button onClick={() => copy(desc)} className="mt-3 rounded-lg gradient-primary px-4 py-2 text-sm font-semibold text-primary-foreground">Copy description</button>
    </Card>
  );
}

function Analyzer() {
  const [title, setTitle] = useState("");
  const score = useMemo(() => {
    const t = title.trim();
    if (!t) return null;
    let s = 50;
    const len = t.length;
    if (len >= 30 && len <= 60) s += 20; else if (len > 60) s -= 10; else s -= 5;
    if (/\d/.test(t)) s += 8;
    if (POWER_WORDS.some((p) => t.toLowerCase().includes(p.toLowerCase()))) s += 12;
    if (/[?!]/.test(t)) s += 4;
    if (/\b(this|that|amazing|crazy)\b/i.test(t)) s += 3;
    if (t === t.toUpperCase()) s -= 15;
    return Math.max(0, Math.min(100, s));
  }, [title]);
  return (
    <Card title="CTR Headline Analyzer" desc="Score your title for length, power words and clarity.">
      <Field label="Your title">
        <input className={inputCls} value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Type a title to analyze…" />
      </Field>
      {score !== null && (
        <div className="mt-6">
          <div className="flex items-center justify-between text-sm font-medium">
            <span>CTR Score</span>
            <span className="text-primary">{score} / 100</span>
          </div>
          <div className="mt-2 h-2 overflow-hidden rounded-full bg-muted">
            <div className="h-full gradient-primary transition-all" style={{ width: `${score}%` }} />
          </div>
          <ul className="mt-6 grid gap-2 text-sm sm:grid-cols-2">
            <li className="rounded-lg border border-border bg-background p-3"><strong>Length:</strong> {title.length} chars (sweet spot 30–60)</li>
            <li className="rounded-lg border border-border bg-background p-3"><strong>Numbers:</strong> {/\d/.test(title) ? "Yes ✓" : "Add a number for +CTR"}</li>
            <li className="rounded-lg border border-border bg-background p-3"><strong>Power word:</strong> {POWER_WORDS.some((p) => title.toLowerCase().includes(p.toLowerCase())) ? "Yes ✓" : "Try one of: " + POWER_WORDS.slice(0, 4).join(", ")}</li>
            <li className="rounded-lg border border-border bg-background p-3"><strong>All caps:</strong> {title === title.toUpperCase() && title.length > 6 ? "Avoid — feels spammy" : "OK ✓"}</li>
          </ul>
        </div>
      )}
    </Card>
  );
}

function EmbedGen() {
  const [url, setUrl] = useState("");
  const [autoplay, setAutoplay] = useState(false);
  const [controls, setControls] = useState(true);
  const [start, setStart] = useState(0);
  const id = extractYouTubeId(url);
  const code = id
    ? `<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/${id}?${[
        autoplay ? "autoplay=1" : null,
        controls ? null : "controls=0",
        start ? `start=${start}` : null,
      ].filter(Boolean).join("&")}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`
    : "Paste a YouTube URL to generate the embed code.";
  return (
    <Card title="Embed Generator" desc="Build clean, privacy-friendly iframe embed codes (uses youtube-nocookie.com).">
      <Field label="YouTube URL"><input className={inputCls} value={url} onChange={(e) => setUrl(e.target.value)} placeholder="https://youtu.be/…" /></Field>
      <div className="mt-4 flex flex-wrap gap-4 text-sm">
        <label className="flex items-center gap-2"><input type="checkbox" checked={autoplay} onChange={(e) => setAutoplay(e.target.checked)} /> Autoplay</label>
        <label className="flex items-center gap-2"><input type="checkbox" checked={controls} onChange={(e) => setControls(e.target.checked)} /> Show controls</label>
        <label className="flex items-center gap-2">Start at <input type="number" min={0} value={start} onChange={(e) => setStart(Number(e.target.value))} className="w-20 rounded-md border border-input bg-background px-2 py-1" /> sec</label>
      </div>
      <textarea readOnly rows={5} value={code} className="mt-4 w-full rounded-lg border border-border bg-background p-3 font-mono text-xs" />
      {id && <button onClick={() => copy(code)} className="mt-3 rounded-lg gradient-primary px-4 py-2 text-sm font-semibold text-primary-foreground">Copy embed code</button>}
    </Card>
  );
}

function TimestampGen() {
  const [url, setUrl] = useState("");
  const [h, setH] = useState(0); const [m, setM] = useState(0); const [s, setS] = useState(0);
  const id = extractYouTubeId(url);
  const t = formatTimestamp(h, m, s);
  const link = id ? `https://youtu.be/${id}?t=${t}` : "Paste a URL to build a timestamp link.";
  return (
    <Card title="Timestamp Link Generator" desc="Create deep links that jump straight to a moment in the video.">
      <Field label="YouTube URL"><input className={inputCls} value={url} onChange={(e) => setUrl(e.target.value)} /></Field>
      <div className="mt-4 grid grid-cols-3 gap-3">
        <Field label="Hours"><input type="number" min={0} className={inputCls} value={h} onChange={(e) => setH(Number(e.target.value))} /></Field>
        <Field label="Minutes"><input type="number" min={0} max={59} className={inputCls} value={m} onChange={(e) => setM(Number(e.target.value))} /></Field>
        <Field label="Seconds"><input type="number" min={0} max={59} className={inputCls} value={s} onChange={(e) => setS(Number(e.target.value))} /></Field>
      </div>
      <div className="mt-4 rounded-lg border border-border bg-background p-3 font-mono text-sm">{link}</div>
      {id && <button onClick={() => copy(link)} className="mt-3 rounded-lg gradient-primary px-4 py-2 text-sm font-semibold text-primary-foreground">Copy link</button>}
    </Card>
  );
}

function SubscribeGen() {
  const [handle, setHandle] = useState("");
  const clean = handle.trim().replace(/^@/, "");
  const link = clean ? `https://www.youtube.com/@${clean}?sub_confirmation=1` : "Enter a channel handle to generate a one-click subscribe link.";
  return (
    <Card title="Subscribe Link Generator" desc="One-click subscribe URLs that pop the YouTube confirmation dialog.">
      <Field label="Channel handle (without @)"><input className={inputCls} value={handle} onChange={(e) => setHandle(e.target.value)} placeholder="MrBeast" /></Field>
      <div className="mt-4 rounded-lg border border-border bg-background p-3 font-mono text-sm">{link}</div>
      {clean && <button onClick={() => copy(link)} className="mt-3 rounded-lg gradient-primary px-4 py-2 text-sm font-semibold text-primary-foreground">Copy link</button>}
    </Card>
  );
}
