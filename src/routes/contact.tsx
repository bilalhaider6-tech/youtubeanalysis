import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { Container, Section } from "@/components/Container";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact TubePilot — We'd Love to Hear From You" },
      { name: "description", content: "Question, feature request, or partnership? Send us a note — we read every message." },
      { property: "og:title", content: "Contact TubePilot" },
      { property: "og:description", content: "Get in touch with the TubePilot team." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [sending, setSending] = useState(false);
  return (
    <>
      <section className="surface-soft">
        <Container className="py-16 sm:py-20">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold sm:text-5xl">Get in touch</h1>
            <p className="mt-4 text-muted-foreground">Question, feature request, partnership? We respond within two business days.</p>
          </div>
        </Container>
      </section>
      <Section>
        <Container>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSending(true);
              setTimeout(() => { setSending(false); toast.success("Message sent — we'll get back to you soon."); (e.target as HTMLFormElement).reset(); }, 600);
            }}
            className="mx-auto grid max-w-xl gap-4 rounded-2xl border border-border bg-card p-6 sm:p-8"
          >
            <label className="block">
              <span className="mb-1.5 block text-sm font-medium">Name</span>
              <input required maxLength={100} className="w-full rounded-lg border border-input bg-background px-3 py-2.5 outline-none ring-focus" />
            </label>
            <label className="block">
              <span className="mb-1.5 block text-sm font-medium">Email</span>
              <input required type="email" maxLength={255} className="w-full rounded-lg border border-input bg-background px-3 py-2.5 outline-none ring-focus" />
            </label>
            <label className="block">
              <span className="mb-1.5 block text-sm font-medium">Message</span>
              <textarea required rows={6} maxLength={2000} className="w-full rounded-lg border border-input bg-background px-3 py-2.5 outline-none ring-focus" />
            </label>
            <button disabled={sending} className="rounded-lg gradient-primary px-5 py-3 text-sm font-semibold text-primary-foreground disabled:opacity-70">
              {sending ? "Sending…" : "Send message"}
            </button>
          </form>
        </Container>
      </Section>
    </>
  );
}
