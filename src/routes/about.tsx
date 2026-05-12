import { createFileRoute } from "@tanstack/react-router";
import { Container, Section } from "@/components/Container";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About TubePilot — Tools for YouTube Creators" },
      { name: "description", content: "TubePilot builds fast, beautiful, ToS-compliant tools that help YouTube creators grow their channels." },
      { property: "og:title", content: "About TubePilot" },
      { property: "og:description", content: "Fast, beautiful, ToS-compliant tools for YouTube creators." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <>
      <section className="surface-soft">
        <Container className="py-16 sm:py-20">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold sm:text-5xl">We build the toolkit we wished we had</h1>
            <p className="mt-4 text-lg text-muted-foreground">TubePilot is a small team of creators and engineers building the fastest, cleanest companion tools for YouTube.</p>
          </div>
        </Container>
      </section>
      <Section>
        <Container>
          <div className="mx-auto grid max-w-4xl gap-10 md:grid-cols-2">
            <div>
              <h2 className="text-2xl font-bold">Our philosophy</h2>
              <p className="mt-3 text-muted-foreground">Most "creator tools" are bloated, dishonest, or in a legal grey zone. We took the opposite approach: ship a small set of focused tools that respect the platform, the creators, and the audience.</p>
            </div>
            <div>
              <h2 className="text-2xl font-bold">What we don't do</h2>
              <p className="mt-3 text-muted-foreground">No video downloading, stream extraction, or audio ripping. Those features violate YouTube's Terms of Service and we won't build them — even when users ask.</p>
            </div>
            <div>
              <h2 className="text-2xl font-bold">What we do build</h2>
              <p className="mt-3 text-muted-foreground">Thumbnail downloaders (public assets), SEO generators, embed builders, channel analytics powered by the official YouTube Data API, and a blog full of tactical guides.</p>
            </div>
            <div>
              <h2 className="text-2xl font-bold">Where we're headed</h2>
              <p className="mt-3 text-muted-foreground">Deeper analytics, AI-assisted thumbnail testing, sponsorship workflow tools — all the same approach: focused, fast, respectful.</p>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
