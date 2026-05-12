import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { toast } from "sonner";
import { Container, Section } from "@/components/Container";
import { getPost, getRelated, type BlogPost } from "@/lib/blog";

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }): { post: BlogPost; related: BlogPost[] } => {
    const post = getPost(params.slug);
    if (!post) throw notFound();
    return { post, related: getRelated(params.slug) };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [{ title: "Article — TubePilot" }] };
    const { post } = loaderData;
    return {
      meta: [
        { title: `${post.title} — TubePilot` },
        { name: "description", content: post.description },
        { property: "og:type", content: "article" },
        { property: "og:title", content: post.title },
        { property: "og:description", content: post.description },
        { name: "twitter:title", content: post.title },
        { name: "twitter:description", content: post.description },
        { name: "author", content: post.author },
        { property: "article:published_time", content: post.date },
        { property: "article:section", content: post.category },
      ],
      scripts: [
        { type: "application/ld+json", children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Article",
          headline: post.title,
          description: post.description,
          author: { "@type": "Person", name: post.author },
          datePublished: post.date,
          articleSection: post.category,
        })},
      ],
    };
  },
  notFoundComponent: () => (
    <Section>
      <Container>
        <div className="mx-auto max-w-md text-center">
          <h1 className="text-3xl font-bold">Article not found</h1>
          <p className="mt-3 text-muted-foreground">It may have been moved or unpublished.</p>
          <Link to="/blog" className="mt-6 inline-flex rounded-lg gradient-primary px-4 py-2 text-sm font-semibold text-primary-foreground">Back to blog</Link>
        </div>
      </Container>
    </Section>
  ),
  component: PostPage,
});

function PostPage() {
  const { post, related } = Route.useLoaderData() as { post: BlogPost; related: BlogPost[] };
  const shareUrl = typeof window !== "undefined" ? window.location.href : "";
  const share = (where: "twitter" | "linkedin" | "copy") => {
    if (where === "copy") { navigator.clipboard.writeText(shareUrl).then(() => toast.success("Link copied")); return; }
    const u = where === "twitter"
      ? `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(post.title)}`
      : `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;
    window.open(u, "_blank", "noopener,noreferrer");
  };

  return (
    <>
      <section className="surface-soft">
        <Container className="py-12 sm:py-16">
          <nav className="text-sm text-muted-foreground" aria-label="Breadcrumb">
            <Link to="/" className="hover:text-primary">Home</Link>
            <span className="mx-2">/</span>
            <Link to="/blog" className="hover:text-primary">Blog</Link>
            <span className="mx-2">/</span>
            <span className="text-foreground">{post.category}</span>
          </nav>
          <div className="mt-6 max-w-3xl">
            <span className="text-xs font-semibold uppercase tracking-wide text-primary">{post.category}</span>
            <h1 className="mt-3 text-3xl font-bold sm:text-4xl lg:text-5xl">{post.title}</h1>
            <p className="mt-4 text-lg text-muted-foreground">{post.description}</p>
            <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
              <span>By <strong className="text-foreground">{post.author}</strong></span>
              <span>·</span>
              <time dateTime={post.date}>{new Date(post.date).toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" })}</time>
              <span>·</span>
              <span>{post.readMinutes} min read</span>
            </div>
          </div>
        </Container>
      </section>

      <Section>
        <Container>
          <div className={`mb-12 aspect-[21/9] w-full rounded-3xl bg-gradient-to-br ${post.cover}`} aria-hidden />
          <div className="grid gap-12 lg:grid-cols-[220px_1fr_220px]">
            <aside className="lg:sticky lg:top-24 lg:self-start">
              <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">On this page</h2>
              <ul className="mt-3 space-y-2 text-sm">
                {post.toc.map((s) => (
                  <li key={s.id}><a href={`#${s.id}`} className="text-muted-foreground hover:text-primary">{s.label}</a></li>
                ))}
              </ul>
            </aside>

            <article className="prose prose-neutral max-w-none">
              {post.body.map((sec) => (
                <section key={sec.id} id={sec.id} className="scroll-mt-24">
                  <h2 className="mt-10 text-2xl font-bold">{sec.heading}</h2>
                  {sec.paragraphs.map((p, i) => (
                    <p key={i} className="mt-4 text-base leading-7 text-muted-foreground">{p}</p>
                  ))}
                </section>
              ))}
              <div className="mt-12 rounded-2xl border border-border bg-surface p-6">
                <div className="flex items-center gap-4">
                  <div className="grid h-12 w-12 place-items-center rounded-full gradient-primary font-bold text-primary-foreground">{post.author.split(" ").map((n) => n[0]).join("")}</div>
                  <div>
                    <p className="font-semibold">{post.author}</p>
                    <p className="text-sm text-muted-foreground">Writes about YouTube growth and creator strategy.</p>
                  </div>
                </div>
              </div>
            </article>

            <aside className="lg:sticky lg:top-24 lg:self-start">
              <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">Share</h2>
              <div className="mt-3 flex flex-wrap gap-2">
                <button onClick={() => share("twitter")} className="rounded-md border border-border px-3 py-1.5 text-sm hover:bg-secondary">Twitter</button>
                <button onClick={() => share("linkedin")} className="rounded-md border border-border px-3 py-1.5 text-sm hover:bg-secondary">LinkedIn</button>
                <button onClick={() => share("copy")} className="rounded-md border border-border px-3 py-1.5 text-sm hover:bg-secondary">Copy link</button>
              </div>
            </aside>
          </div>
        </Container>
      </Section>

      <Section className="bg-surface">
        <Container>
          <h2 className="text-2xl font-bold">Related articles</h2>
          <div className="mt-6 grid gap-6 md:grid-cols-3">
            {related.map((p) => (
              <Link key={p.slug} to="/blog/$slug" params={{ slug: p.slug }} className="group overflow-hidden rounded-2xl border border-border bg-card transition hover:-translate-y-0.5 hover:shadow-[var(--shadow-soft)]">
                <div className={`aspect-[16/9] bg-gradient-to-br ${p.cover}`} aria-hidden />
                <div className="p-5">
                  <span className="text-xs font-semibold uppercase tracking-wide text-primary">{p.category}</span>
                  <h3 className="mt-2 line-clamp-2 font-semibold group-hover:text-primary">{p.title}</h3>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
