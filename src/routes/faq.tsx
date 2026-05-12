import { createFileRoute } from "@tanstack/react-router";
import { Container, Section } from "@/components/Container";

const FAQS = [
  { q: "What is TubePilot?", a: "TubePilot is a free toolkit for YouTube creators — thumbnail downloads, SEO generators, embed builders and growth content. Everything is compliant with YouTube's Terms of Service." },
  { q: "Is TubePilot free?", a: "Yes. The core tools are free and don't require an account. Some advanced analytics features may require an API key in the future." },
  { q: "Do you support video downloading?", a: "No. We deliberately don't build any video, audio, or stream-extraction tools. Those violate YouTube's Terms of Service." },
  { q: "Can I download thumbnails of any video?", a: "Thumbnails are public images on YouTube's CDN. You can download them via TubePilot for personal study, reference or content where you have permission to use them." },
  { q: "How accurate are the SEO generators?", a: "They're idea generators based on proven heuristics — not magic. Always tailor the output to your audience and double-check trends." },
  { q: "Do you store my data?", a: "We don't store URLs you paste into the tools. Most tools run entirely in your browser." },
  { q: "Is there a mobile app?", a: "Not yet — but every tool is fully responsive and works great on mobile browsers." },
  { q: "How do I report a bug?", a: "Use the Contact page. We read every message and usually reply within two business days." },
];

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQ — TubePilot" },
      { name: "description", content: "Answers to the most common questions about TubePilot's tools, pricing and policies." },
      { property: "og:title", content: "TubePilot FAQ" },
      { property: "og:description", content: "Answers about TubePilot's tools, pricing and policies." },
    ],
    scripts: [
      { type: "application/ld+json", children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: FAQS.map((f) => ({
          "@type": "Question", name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      })},
    ],
  }),
  component: FAQPage,
});

function FAQPage() {
  return (
    <>
      <section className="surface-soft">
        <Container className="py-16 sm:py-20">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold sm:text-5xl">Frequently asked questions</h1>
            <p className="mt-4 text-muted-foreground">Everything you might want to know before you start.</p>
          </div>
        </Container>
      </section>
      <Section>
        <Container>
          <div className="mx-auto max-w-3xl divide-y divide-border rounded-2xl border border-border bg-card">
            {FAQS.map((f) => (
              <details key={f.q} className="group p-6">
                <summary className="flex cursor-pointer items-center justify-between text-base font-semibold">
                  {f.q}
                  <span className="ml-4 text-primary transition group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 text-sm text-muted-foreground">{f.a}</p>
              </details>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
