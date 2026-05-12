import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Container, Section } from "@/components/Container";
import { POSTS, CATEGORIES } from "@/lib/blog";

export const Route = createFileRoute("/blog")({
  validateSearch: (s: Record<string, unknown>) => ({
    q: typeof s.q === "string" ? s.q : undefined,
    cat: typeof s.cat === "string" ? s.cat : undefined,
    page: typeof s.page === "string" ? Number(s.page) || 1 : 1,
  }),
  head: () => ({
    meta: [
      { title: "YouTube Growth & SEO Blog — TubePilot" },
      { name: "description", content: "Tactical guides on YouTube SEO, thumbnails, the algorithm, audience retention and monetization." },
      { property: "og:title", content: "YouTube Growth & SEO Blog — TubePilot" },
      { property: "og:description", content: "Tactical guides on YouTube SEO, thumbnails and growth." },
    ],
  }),
  component: BlogPage,
});

const PER_PAGE = 6;

function BlogPage() {
  const search = Route.useSearch();
  const [q, setQ] = useState(search.q ?? "");
  const [cat, setCat] = useState(search.cat ?? "All");
  const [page, setPage] = useState(search.page ?? 1);

  const filtered = useMemo(() => {
    const ql = q.toLowerCase();
    return POSTS.filter((p) => {
      const okCat = cat === "All" || p.category === cat;
      const okQ = !ql || p.title.toLowerCase().includes(ql) || p.description.toLowerCase().includes(ql);
      return okCat && okQ;
    });
  }, [q, cat]);

  const pages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const current = Math.min(page, pages);
  const items = filtered.slice((current - 1) * PER_PAGE, current * PER_PAGE);

  return (
    <>
      <section className="surface-soft">
        <Container className="py-16 sm:py-20">
          <div className="mx-auto max-w-3xl text-center">
            <span className="text-xs font-semibold uppercase tracking-wider text-primary">Blog</span>
            <h1 className="mt-3 text-4xl font-bold sm:text-5xl">YouTube growth, SEO & strategy</h1>
            <p className="mx-auto mt-4 max-w-xl text-muted-foreground">Practical guides for serious creators. New post every Friday.</p>
          </div>
        </Container>
      </section>
      <Section>
        <Container>
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-wrap gap-2">
              {["All", ...CATEGORIES].map((c) => (
                <button
                  key={c}
                  onClick={() => { setCat(c); setPage(1); }}
                  className={`rounded-full border px-4 py-1.5 text-sm font-medium transition ${cat === c ? "border-primary bg-primary-soft text-primary" : "border-border hover:bg-secondary"}`}
                >
                  {c}
                </button>
              ))}
            </div>
            <input
              value={q}
              onChange={(e) => { setQ(e.target.value); setPage(1); }}
              placeholder="Search articles…"
              aria-label="Search articles"
              className="w-full rounded-lg border border-input bg-background px-4 py-2 text-sm outline-none ring-focus md:w-72"
            />
          </div>

          {items.length === 0 ? (
            <p className="mt-16 text-center text-muted-foreground">No articles match. Try a different search.</p>
          ) : (
            <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {items.map((p) => (
                <Link key={p.slug} to="/blog/$slug" params={{ slug: p.slug }} className="group overflow-hidden rounded-2xl border border-border bg-card transition hover:-translate-y-0.5 hover:shadow-[var(--shadow-soft)]">
                  <div className={`aspect-[16/9] bg-gradient-to-br ${p.cover}`} aria-hidden />
                  <div className="p-5">
                    <span className="text-xs font-semibold uppercase tracking-wide text-primary">{p.category}</span>
                    <h2 className="mt-2 line-clamp-2 text-lg font-semibold group-hover:text-primary">{p.title}</h2>
                    <p className="mt-1.5 line-clamp-2 text-sm text-muted-foreground">{p.description}</p>
                    <p className="mt-4 text-xs text-muted-foreground">{p.author} · {p.readMinutes} min read</p>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {pages > 1 && (
            <div className="mt-12 flex items-center justify-center gap-1">
              {Array.from({ length: pages }, (_, i) => i + 1).map((n) => (
                <button
                  key={n}
                  onClick={() => setPage(n)}
                  className={`grid h-9 w-9 place-items-center rounded-md text-sm font-medium ${n === current ? "gradient-primary text-primary-foreground" : "border border-border hover:bg-secondary"}`}
                >
                  {n}
                </button>
              ))}
            </div>
          )}
        </Container>
      </Section>
    </>
  );
}
