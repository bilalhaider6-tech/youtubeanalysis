import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Container, Section } from "@/components/Container";
import { POSTS } from "@/lib/blog";
import { extractYouTubeId } from "@/lib/youtube";
import { toast } from "sonner";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "TubePilot — The Premium Toolkit for YouTube Creators" },
      { name: "description", content: "Free YouTube creator tools: thumbnail downloader, SEO toolkit, tag & title generators, embed builders, and growth insights. Fully compliant with YouTube's Terms." },
      { property: "og:title", content: "TubePilot — The Premium Toolkit for YouTube Creators" },
      { property: "og:description", content: "Free, fast, and compliant tools to grow your channel." },
      { rel: "canonical", href: "https://tubepilot.app/" } as never,
    ],
    scripts: [
      { type: "application/ld+json", children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: "TubePilot",
        url: "https://tubepilot.app/",
        potentialAction: {
          "@type": "SearchAction",
          target: "https://tubepilot.app/blog?q={search_term_string}",
          "query-input": "required name=search_term_string",
        },
      })},
    ],
  }),
  component: HomePage,
});

const TOOL_CARDS = [
  { to: "/thumbnail-downloader", title: "Thumbnail Downloader", desc: "Grab any public YouTube thumbnail in HD, SD and Max resolution.", icon: "🖼" },
  { to: "/seo-toolkit", title: "Title Generator", desc: "Craft click-worthy titles tuned for CTR and search intent.", icon: "✨", hash: "#title" },
  { to: "/seo-toolkit", title: "Tag & Hashtag Generator", desc: "Generate keyword-rich tags and hashtags for any topic.", icon: "🏷", hash: "#tags" },
  { to: "/seo-toolkit", title: "Description Builder", desc: "SEO-friendly descriptions with keywords, links and chapters.", icon: "📝", hash: "#description" },
  { to: "/seo-toolkit", title: "Embed & Link Generator", desc: "Custom iframes, timestamp links, playlists and Shorts links.", icon: "🔗", hash: "#embed" },
  { to: "/seo-toolkit", title: "CTR Headline Analyzer", desc: "Score your titles for impact, length and keyword strength.", icon: "📈", hash: "#analyzer" },
];

const FEATURES = [
  { title: "Lightning fast", desc: "Built on a modern edge stack — every tool runs instantly in your browser." },
  { title: "100% compliant", desc: "Only public data and official APIs. Nothing that violates YouTube's Terms." },
  { title: "Mobile-first", desc: "Every tool is fully responsive and tuned for thumb-friendly usage." },
  { title: "No sign-up", desc: "Open the site, paste a URL, get the result. That's it." },
  { title: "Privacy-friendly", desc: "Tools run client-side wherever possible. We never store your URLs." },
  { title: "Always free core", desc: "The essentials stay free, forever. Upgrade only when you need more." },
];

const FAQS = [
  { q: "Is TubePilot free to use?", a: "Yes. Every tool listed on this site is free to use, with no sign-up required for the core features." },
  { q: "Does this site download YouTube videos?", a: "No. We deliberately do not offer video downloading, stream extraction, or audio ripping. Those features violate YouTube's Terms of Service." },
  { q: "Are the thumbnails legal to download?", a: "Thumbnails are public images served by YouTube's CDN. Use them responsibly — for personal reference, study, or content you have permission to remix." },
  { q: "Do I need an API key for the SEO tools?", a: "No. Our generators run entirely in your browser. Channel analytics features use the official YouTube Data API." },
  { q: "Is TubePilot mobile-friendly?", a: "Every page and tool is built mobile-first and fully responsive across phone, tablet and desktop." },
  { q: "How do you make money?", a: "Optional premium features and unobtrusive sponsorships. Core tools stay free." },
];

function HomePage() {
  const [url, setUrl] = useState("");
  const handleGo = () => {
    const id = extractYouTubeId(url);
    if (!id) { toast.error("Please paste a valid YouTube URL"); return; }
    window.location.href = `/thumbnail-downloader?v=${id}`;
  };
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden surface-soft">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -top-32 left-1/2 h-96 w-[60rem] -translate-x-1/2 rounded-full bg-primary/15 blur-3xl" />
        </div>
        <Container className="py-20 sm:py-28 lg:py-32">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-3 py-1 text-xs font-medium text-muted-foreground shadow-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              The premium YouTube creator toolkit
            </span>
            <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Grow your channel with <span className="gradient-text">tools that actually work</span>
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-lg text-muted-foreground">
              Thumbnails, SEO, embeds, and analytics — everything serious creators need, in one fast, beautiful workspace. 100% compliant with YouTube's Terms.
            </p>
            <div className="mx-auto mt-8 max-w-2xl">
              <div className="flex flex-col gap-2 rounded-2xl border border-border bg-background p-2 shadow-[var(--shadow-soft)] sm:flex-row">
                <input
                  type="url"
                  inputMode="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleGo()}
                  placeholder="Paste a YouTube URL to grab the thumbnail…"
                  aria-label="YouTube URL"
                  className="w-full flex-1 rounded-xl bg-transparent px-4 py-3 text-base outline-none ring-focus placeholder:text-muted-foreground"
                />
                <button
                  onClick={handleGo}
                  className="rounded-xl gradient-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition hover:opacity-95"
                >
                  Get thumbnails
                </button>
              </div>
              <p className="mt-3 text-xs text-muted-foreground">Tip: works with youtube.com, youtu.be and Shorts links.</p>
            </div>
          </div>
        </Container>
      </section>

      {/* Tool categories */}
      <Section>
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold sm:text-4xl">A complete toolkit for creators</h2>
            <p className="mt-3 text-muted-foreground">Six focused tools, zero clutter. Each one designed to do one job exceptionally well.</p>
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {TOOL_CARDS.map((t) => (
              <Link
                key={t.title}
                to={t.to}
                hash={t.hash?.replace("#", "")}
                className="group rounded-2xl border border-border bg-card p-6 transition hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-[var(--shadow-soft)]"
              >
                <div className="grid h-11 w-11 place-items-center rounded-xl bg-primary-soft text-xl">{t.icon}</div>
                <h3 className="mt-4 text-lg font-semibold">{t.title}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground">{t.desc}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary">
                  Open tool <span className="transition group-hover:translate-x-0.5">→</span>
                </span>
              </Link>
            ))}
          </div>
        </Container>
      </Section>

      {/* Features */}
      <Section className="bg-surface">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:items-center">
            <div>
              <h2 className="text-3xl font-bold sm:text-4xl">Built for the way creators actually work</h2>
              <p className="mt-3 text-muted-foreground">Open the tool, get the result, get back to creating. No friction, no fluff.</p>
              <Link to="/tools" className="mt-6 inline-flex items-center gap-2 rounded-lg gradient-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground">
                Explore all tools →
              </Link>
            </div>
            <ul className="grid gap-4 sm:grid-cols-2">
              {FEATURES.map((f) => (
                <li key={f.title} className="rounded-xl border border-border bg-card p-5">
                  <div className="flex items-center gap-2">
                    <span className="grid h-6 w-6 place-items-center rounded-md gradient-primary text-xs text-primary-foreground">✓</span>
                    <h3 className="font-semibold">{f.title}</h3>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">{f.desc}</p>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </Section>

      {/* How it works */}
      <Section>
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold sm:text-4xl">How it works</h2>
            <p className="mt-3 text-muted-foreground">Three steps from idea to publish-ready asset.</p>
          </div>
          <ol className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              { n: "01", t: "Paste a link or topic", d: "Drop a YouTube URL or type the topic of your next video." },
              { n: "02", t: "Pick a tool", d: "Thumbnails, titles, tags, descriptions, embeds — all one click away." },
              { n: "03", t: "Ship faster", d: "Copy, download, or embed the result and get back to creating." },
            ].map((s) => (
              <li key={s.n} className="rounded-2xl border border-border bg-card p-6">
                <span className="text-sm font-semibold text-primary">{s.n}</span>
                <h3 className="mt-2 text-lg font-semibold">{s.t}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground">{s.d}</p>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      {/* Blog preview */}
      <Section className="bg-surface">
        <Container>
          <div className="flex items-end justify-between gap-4">
            <div>
              <h2 className="text-3xl font-bold sm:text-4xl">From the blog</h2>
              <p className="mt-3 text-muted-foreground">Tactical guides on growth, SEO, thumbnails and monetization.</p>
            </div>
            <Link to="/blog" className="hidden text-sm font-semibold text-primary hover:underline sm:inline">View all →</Link>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {POSTS.slice(0, 3).map((p) => (
              <Link key={p.slug} to="/blog/$slug" params={{ slug: p.slug }} className="group overflow-hidden rounded-2xl border border-border bg-card transition hover:-translate-y-0.5 hover:shadow-[var(--shadow-soft)]">
                <div className={`aspect-[16/9] bg-gradient-to-br ${p.cover}`} aria-hidden />
                <div className="p-5">
                  <span className="text-xs font-semibold uppercase tracking-wide text-primary">{p.category}</span>
                  <h3 className="mt-2 line-clamp-2 text-lg font-semibold group-hover:text-primary">{p.title}</h3>
                  <p className="mt-1.5 line-clamp-2 text-sm text-muted-foreground">{p.description}</p>
                  <p className="mt-4 text-xs text-muted-foreground">{p.author} · {p.readMinutes} min read</p>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </Section>

      {/* FAQ */}
      <Section>
        <Container>
          <div className="mx-auto max-w-3xl">
            <h2 className="text-center text-3xl font-bold sm:text-4xl">Frequently asked questions</h2>
            <div className="mt-10 divide-y divide-border rounded-2xl border border-border bg-card">
              {FAQS.map((f) => (
                <details key={f.q} className="group p-5">
                  <summary className="flex cursor-pointer items-center justify-between text-base font-semibold">
                    {f.q}
                    <span className="ml-4 text-primary transition group-open:rotate-45">+</span>
                  </summary>
                  <p className="mt-3 text-sm text-muted-foreground">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* Newsletter */}
      <Section className="bg-surface">
        <Container>
          <div className="overflow-hidden rounded-3xl gradient-primary p-8 text-center text-primary-foreground sm:p-12">
            <h2 className="text-3xl font-bold sm:text-4xl">Get one growth tip every Friday</h2>
            <p className="mx-auto mt-3 max-w-xl text-primary-foreground/90">Join thousands of creators getting our short, tactical newsletter. No spam, unsubscribe anytime.</p>
            <form
              onSubmit={(e) => { e.preventDefault(); toast.success("You're on the list!"); (e.target as HTMLFormElement).reset(); }}
              className="mx-auto mt-6 flex max-w-md flex-col gap-2 sm:flex-row"
            >
              <input type="email" required placeholder="you@channel.com" className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-primary-foreground placeholder:text-white/70 outline-none ring-focus" />
              <button className="rounded-xl bg-background px-5 py-3 text-sm font-semibold text-primary transition hover:opacity-95">Subscribe</button>
            </form>
          </div>
        </Container>
      </Section>
    </>
  );
}
