import type { ReactNode } from "react";

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 ${className}`}>{children}</div>;
}

export function Section({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <section className={`py-16 sm:py-20 lg:py-24 ${className}`}>{children}</section>;
}
