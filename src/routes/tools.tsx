import { createFileRoute, Link } from "@tanstack/react-router";
import { Container, Section } from "@/components/Container";

export const Route = createFileRoute("/tools")({
  head: () => ({
    meta: [
      { title: "All Creator Tools — TubePilot" },
      { name: "description", content: "Browse the full TubePilot toolkit: thumbnail downloader, title and tag generators, embed builder, SEO analyzer, and more." },
      { property: "og:title", content: "All Creator Tools — TubePilot" },
      { property: "og:description", content: "Every TubePilot tool in one place." },
    ],
  }),
  component: ToolsPage,
});

const TOOLS = [
  { to: "/thumbnail-downloader", title: "Thumbnail Downloader", desc: "Download any public YouTube thumbnail in HD, SD and Max resolution.", category: "Assets" },
  { to: "/seo-toolkit", hash: "title", title: "Title Generator", desc: "Generate click-worthy titles optimized for CTR.", category: "SEO" },
  { to: "/seo-toolkit", hash: "tags", title: "Tag Generator", desc: "Get a relevant tag list for any topic in seconds.", category: "SEO" },
  { to: "/seo-toolkit", hash: "hashtags", title: "Hashtag Generator", desc: "Discover hashtags that boost discoverability.", category: "SEO" },
  { to: "/seo-toolkit", hash: "description", title: "Description Builder", desc: "Create SEO-rich descriptions with chapters and links.", category: "SEO" },
  { to: "/seo-toolkit", hash: "analyzer", title: "CTR Headline Analyzer", desc: "Score your title for length, power words and clarity.", category: "SEO" },
  { to: "/seo-toolkit", hash: "embed", title: "Embed Generator", desc: "Build custom iframe embed codes with parameters.", category: "Embeds" },
  { to: "/seo-toolkit", hash: "timestamp", title: "Timestamp Link Generator", desc: "Create deep links to a specific moment in any video.", category: "Embeds" },
  { to: "/seo-toolkit", hash: "subscribe", title: "Subscribe Link Generator", desc: "Generate one-click subscribe URLs for your channel.", category: "Embeds" },
];

function ToolsPage() {
  return (
    <>
      <section className="surface-soft">
        <Container className="py-16 sm:py-20">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold sm:text-5xl">All tools</h1>
            <p className="mt-4 text-muted-foreground">Every TubePilot tool, organized by what you're trying to do.</p>
          </div>
        </Container>
      </section>
      <Section>
        <Container>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {TOOLS.map((t) => (
              <Link
                key={t.title}
                to={t.to}
                hash={t.hash}
                className="group rounded-2xl border border-border bg-card p-6 transition hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-[var(--shadow-soft)]"
              >
                <span className="text-xs font-semibold uppercase tracking-wide text-primary">{t.category}</span>
                <h2 className="mt-2 text-lg font-semibold">{t.title}</h2>
                <p className="mt-1.5 text-sm text-muted-foreground">{t.desc}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary">Open →</span>
              </Link>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
