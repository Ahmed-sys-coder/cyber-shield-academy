import { Link } from "@tanstack/react-router";
import { ChevronLeft } from "lucide-react";
import type { ReactNode } from "react";

export function Screen({
  title,
  subtitle,
  back = true,
  children,
}: {
  title: string;
  subtitle?: string;
  back?: boolean;
  children: ReactNode;
}) {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
      <header className="sticky top-0 z-10 border-b border-border bg-card/90 px-4 py-3 backdrop-blur">
        <div className="grid grid-cols-[auto_minmax(0,1fr)] items-center gap-3">
          {back ? (
            <Link
              to="/home"
              aria-label="Back to home"
              className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-secondary text-secondary-foreground transition-colors hover:bg-accent/30"
            >
              <ChevronLeft className="h-5 w-5" />
            </Link>
          ) : (
            <span className="h-9 w-0" />
          )}
          <div className="min-w-0">
            <h1 className="truncate text-base font-semibold">{title}</h1>
            {subtitle ? <p className="truncate text-xs text-muted-foreground">{subtitle}</p> : null}
          </div>
        </div>
      </header>
      <div className="space-y-4 px-4 py-4">{children}</div>
    </div>
  );
}
