import { Link, useRouterState } from "@tanstack/react-router";
import { Home, LayoutGrid, HelpCircle, Bot, PlayCircle } from "lucide-react";

const items = [
  { to: "/home", label: "Home", icon: Home },
  { to: "/topics", label: "Topics", icon: LayoutGrid },
  { to: "/quiz", label: "Quiz", icon: HelpCircle },
  { to: "/assistant", label: "Assistant", icon: Bot },
  { to: "/videos", label: "Videos", icon: PlayCircle },
] as const;

export function BottomNav() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <nav className="sticky bottom-0 z-20 border-t border-border bg-card/95 backdrop-blur">
      <ul className="grid grid-cols-5">
        {items.map(({ to, label, icon: Icon }) => {
          const active = pathname === to || (to !== "/home" && pathname.startsWith(to));
          return (
            <li key={to}>
              <Link
                to={to}
                className={`flex flex-col items-center gap-1 py-2.5 text-[11px] font-medium transition-colors ${
                  active ? "text-primary" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Icon className={`h-5 w-5 ${active ? "scale-110" : ""} transition-transform`} />
                {label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
