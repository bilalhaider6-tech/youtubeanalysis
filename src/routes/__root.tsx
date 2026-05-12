import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
  Link,
} from "@tanstack/react-router";
import { Toaster } from "sonner";

import appCss from "../styles.css?url";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex flex-1 items-center justify-center px-4">
        <div className="max-w-md text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-primary">404</p>
          <h1 className="mt-2 text-4xl font-bold">Page not found</h1>
          <p className="mt-3 text-muted-foreground">The page you're looking for doesn't exist or moved.</p>
          <Link to="/" className="mt-6 inline-flex items-center rounded-lg gradient-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground">
            Back home
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-2xl font-bold">Something went wrong</h1>
        <p className="mt-2 text-sm text-muted-foreground">{error.message || "Please try again."}</p>
        <div className="mt-6 flex justify-center gap-2">
          <button
            onClick={() => { router.invalidate(); reset(); }}
            className="rounded-lg gradient-primary px-4 py-2 text-sm font-semibold text-primary-foreground"
          >
            Try again
          </button>
          <a href="/" className="rounded-lg border border-border px-4 py-2 text-sm font-semibold">Home</a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Youtube Analysis — The Premium Toolkit for YouTube Creators" },
      { name: "description", content: "Free YouTube creator tools: thumbnail downloader, SEO toolkit, tag & title generators, embed builders, and growth insights. 100% compliant with YouTube's Terms of Service." },
      { name: "author", content: "TubePilot" },
      { name: "theme-color", content: "#e11d48" },
      { property: "og:site_name", content: "TubePilot" },
      { property: "og:title", content: "Youtube Analysis — The Premium Toolkit for YouTube Creators" },
      { property: "og:description", content: "Free YouTube creator tools: thumbnail downloader, SEO toolkit, tag & title generators, embed builders, and growth insights. 100% compliant with YouTube's Terms of Service." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:site", content: "@tubepilot" },
      { name: "twitter:title", content: "Youtube Analysis — The Premium Toolkit for YouTube Creators" },
      { name: "twitter:description", content: "Free YouTube creator tools: thumbnail downloader, SEO toolkit, tag & title generators, embed builders, and growth insights. 100% compliant with YouTube's Terms of Service." },
      { property: "og:image", content: "https://storage.googleapis.com/gpt-engineer-file-uploads/attachments/og-images/a4bd778f-22c6-4334-a06c-aa648bcb8858" },
      { name: "twitter:image", content: "https://storage.googleapis.com/gpt-engineer-file-uploads/attachments/og-images/a4bd778f-22c6-4334-a06c-aa648bcb8858" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://i.ytimg.com" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">
          <Outlet />
        </main>
        <Footer />
      </div>
      <Toaster position="top-right" richColors closeButton />
    </QueryClientProvider>
  );
}
