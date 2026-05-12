import { Link } from "@tanstack/react-router";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link to="/" className={`flex items-center gap-2 font-display ${className}`} aria-label="TubePilot home">
      <span className="grid h-8 w-8 place-items-center rounded-lg gradient-primary shadow-[var(--shadow-glow)]">
        <svg viewBox="0 0 24 24" className="h-4 w-4 text-primary-foreground" fill="currentColor" aria-hidden>
          <path d="M9.5 7.5v9l7-4.5-7-4.5z" />
        </svg>
      </span>
      <span className="text-lg font-bold tracking-tight">TubePilot</span>
    </Link>
  );
}
