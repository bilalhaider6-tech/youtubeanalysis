import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { Container, Section } from "@/components/Container";
import { extractYouTubeId, getThumbnails } from "@/lib/youtube";

export const Route = createFileRoute("/thumbnail-downloader")({
  validateSearch: (s: Record<string, unknown>) => ({ v: typeof s.v === "string" ? s.v : undefined }),
  head: () => ({
    meta: [
      { title: "YouTube Thumbnail Downloader — Free HD & Max Resolution | TubePilot" },
      { name: "description", content: "Download any public YouTube thumbnail in Max Resolution (1280×720), HD, SD and more. Free, instant, no sign-up." },
      { property: "og:title", content: "YouTube Thumbnail Downloader — TubePilot" },
      { property: "og:description", content: "Free HD YouTube thumbnail downloader. Paste any URL, get every size." },
    ],
    scripts: [
      { type: "application/ld+json", children: JSON.stringify({
        "@context": "https://schema.org", "@type": "WebApplication",
        name: "TubePilot Thumbnail Downloader",
        applicationCategory: "MultimediaApplication",
        offers: { "@type": "Offer", price: "0" },
        operatingSystem: "Any",
      })},
    ],
  }),
  component: ThumbnailDownloaderPage,
});

function ThumbnailDownloaderPage() {
  const search = Route.useSearch();
  const [url, setUrl] = useState("");
  const [videoId, setVideoId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (search.v) {
      setUrl(`https://youtu.be/${search.v}`);
      setVideoId(search.v);
    }
  }, [search.v]);

  const thumbs = useMemo(() => (videoId ? getThumbnails(videoId) : []), [videoId]);

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    const id = extractYouTubeId(url);
    if (!id) { toast.error("That doesn't look like a YouTube URL"); return; }
    setLoading(true);
    setVideoId(id);
    setTimeout(() => setLoading(false), 350);
  };

  const download = async (src: string, filename: string) => {
    try {
      const res = await fetch(src);
      if (!res.ok) throw new Error("Thumbnail unavailable at this size");
      const blob = await res.blob();
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(link.href);
      toast.success("Thumbnail saved");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Download failed");
    }
  };

  const copyUrl = async (src: string) => {
    try { await navigator.clipboard.writeText(src); toast.success("URL copied"); }
    catch { toast.error("Couldn't copy"); }
  };

  return (
    <>
      <section className="surface-soft">
        <Container className="py-16 sm:py-20">
          <div className="mx-auto max-w-3xl text-center">
            <span className="text-xs font-semibold uppercase tracking-wider text-primary">Thumbnail Downloader</span>
            <h1 className="mt-3 text-4xl font-bold sm:text-5xl">Download any YouTube thumbnail</h1>
            <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
              Paste a YouTube link to grab the public thumbnail in every available size — Max, HD, SD and more.
            </p>
            <form onSubmit={handleSubmit} className="mx-auto mt-8 flex max-w-2xl flex-col gap-2 rounded-2xl border border-border bg-background p-2 shadow-[var(--shadow-soft)] sm:flex-row">
              <input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://www.youtube.com/watch?v=…"
                className="w-full flex-1 rounded-xl bg-transparent px-4 py-3 outline-none ring-focus placeholder:text-muted-foreground"
                aria-label="YouTube URL"
              />
              <button type="submit" disabled={loading} className="rounded-xl gradient-primary px-5 py-3 text-sm font-semibold text-primary-foreground disabled:opacity-70">
                {loading ? "Loading…" : "Get thumbnails"}
              </button>
            </form>
          </div>
        </Container>
      </section>

      <Section>
        <Container>
          {!videoId && (
            <div className="mx-auto max-w-2xl rounded-2xl border border-dashed border-border bg-card p-10 text-center text-muted-foreground">
              Drop a YouTube URL above to preview every available thumbnail size.
            </div>
          )}
          {videoId && (
            <div className="grid gap-6 lg:grid-cols-2">
              {thumbs.map((t) => (
                <article key={t.label} className="overflow-hidden rounded-2xl border border-border bg-card">
                  <div className="aspect-video bg-muted">
                    <img
                      src={t.url}
                      alt={`${t.label} YouTube thumbnail`}
                      loading="lazy"
                      className="h-full w-full object-cover"
                      onError={(e) => { (e.currentTarget.parentElement as HTMLElement).innerHTML = '<div class="grid h-full w-full place-items-center text-sm text-muted-foreground">Not available at this size</div>'; }}
                    />
                  </div>
                  <div className="flex flex-wrap items-center justify-between gap-3 p-5">
                    <div>
                      <h2 className="font-semibold">{t.label}</h2>
                      <p className="text-sm text-muted-foreground">{t.size}</p>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => copyUrl(t.url)} className="rounded-lg border border-border px-3 py-2 text-sm font-medium hover:bg-secondary">Copy URL</button>
                      <button onClick={() => download(t.url, t.filename)} className="rounded-lg gradient-primary px-3 py-2 text-sm font-semibold text-primary-foreground">Download</button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
          <div className="mx-auto mt-12 max-w-2xl rounded-2xl border border-border bg-surface p-6 text-sm text-muted-foreground">
            <strong className="font-semibold text-foreground">Use responsibly.</strong> Thumbnails are the property of their original creators. Use them for personal study, reference, or content where you have permission to remix.
          </div>
        </Container>
      </Section>

      <Section className="bg-surface">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold">Want better thumbnails of your own?</h2>
            <p className="mt-3 text-muted-foreground">Read our practical guide to designing thumbnails that double your CTR.</p>
            <Link to="/blog/$slug" params={{ slug: "thumbnail-design-principles" }} className="mt-5 inline-flex items-center rounded-lg gradient-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground">
              Read the guide →
            </Link>
          </div>
        </Container>
      </Section>
    </>
  );
}
