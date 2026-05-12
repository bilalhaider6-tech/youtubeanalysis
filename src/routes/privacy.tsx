import { createFileRoute } from "@tanstack/react-router";
import { Container, Section } from "@/components/Container";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — TubePilot" },
      { name: "description", content: "How TubePilot handles data, cookies, analytics and your privacy." },
    ],
  }),
  component: () => (
    <Section>
      <Container>
        <article className="mx-auto max-w-3xl">
          <h1 className="text-4xl font-bold">Privacy Policy</h1>
          <p className="mt-2 text-sm text-muted-foreground">Last updated: {new Date().toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" })}</p>
          <div className="mt-8 space-y-6 text-base leading-7 text-muted-foreground">
            <p>TubePilot ("we", "our") respects your privacy. This page explains what data we collect when you use our website and tools.</p>
            <h2 className="text-xl font-bold text-foreground">Data we don't collect</h2>
            <p>We don't store the URLs you paste into our tools. Most tools (title generator, tag generator, embed builder, etc.) run entirely in your browser and never reach our servers.</p>
            <h2 className="text-xl font-bold text-foreground">Cookies & analytics</h2>
            <p>We may use privacy-friendly analytics (such as Plausible or Google Analytics) to understand aggregate usage. No personally identifiable information is shared with third parties.</p>
            <h2 className="text-xl font-bold text-foreground">Newsletter</h2>
            <p>If you subscribe to our newsletter, we store your email address solely to send you updates. You can unsubscribe at any time via the link in every email.</p>
            <h2 className="text-xl font-bold text-foreground">Third-party content</h2>
            <p>Thumbnails are loaded from YouTube's public CDN (i.ytimg.com). Embeds use the privacy-enhanced youtube-nocookie.com domain by default.</p>
            <h2 className="text-xl font-bold text-foreground">Contact</h2>
            <p>For privacy questions, reach out via the Contact page.</p>
          </div>
        </article>
      </Container>
    </Section>
  ),
});
