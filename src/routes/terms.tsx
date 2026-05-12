import { createFileRoute } from "@tanstack/react-router";
import { Container, Section } from "@/components/Container";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms & Conditions — TubePilot" },
      { name: "description", content: "Terms of use for the TubePilot website and tools." },
    ],
  }),
  component: () => (
    <Section>
      <Container>
        <article className="mx-auto max-w-3xl">
          <h1 className="text-4xl font-bold">Terms & Conditions</h1>
          <p className="mt-2 text-sm text-muted-foreground">Last updated: {new Date().toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" })}</p>
          <div className="mt-8 space-y-6 text-base leading-7 text-muted-foreground">
            <p>By using TubePilot, you agree to the terms below. If you do not agree, please don't use the site.</p>
            <h2 className="text-xl font-bold text-foreground">Acceptable use</h2>
            <p>TubePilot tools are provided for legitimate creator workflows. You agree not to use the site to violate YouTube's Terms of Service, infringe copyright, or harm any third party.</p>
            <h2 className="text-xl font-bold text-foreground">No warranty</h2>
            <p>The site is provided "as is", without warranties of any kind. We strive for accuracy but cannot guarantee uninterrupted or error-free service.</p>
            <h2 className="text-xl font-bold text-foreground">Third-party content</h2>
            <p>Thumbnails, channel data and embeds remain the property of their owners. TubePilot is not affiliated with, endorsed by, or sponsored by YouTube or Google LLC.</p>
            <h2 className="text-xl font-bold text-foreground">Limitation of liability</h2>
            <p>TubePilot shall not be liable for any indirect, incidental, or consequential damages arising from your use of the site.</p>
            <h2 className="text-xl font-bold text-foreground">Changes</h2>
            <p>We may update these terms occasionally. Continued use of the site after changes are posted constitutes acceptance of the updated terms.</p>
          </div>
        </article>
      </Container>
    </Section>
  ),
});
