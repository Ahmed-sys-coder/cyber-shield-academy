import { createFileRoute, Link } from "@tanstack/react-router";
import { Fish, KeyRound, Users, AlertTriangle, Bug, Globe, ArrowRight } from "lucide-react";
import { Screen } from "@/components/Screen";

export const Route = createFileRoute("/topics")({
  head: () => ({
    meta: [
      { title: "Cyber Safety Topics — CyberSafe" },
      { name: "description", content: "Browse core cyber safety topics: phishing, passwords, social media, scams, malware and safe browsing." },
      { property: "og:title", content: "Cyber Safety Topics — CyberSafe" },
      { property: "og:description", content: "Six beginner-friendly cyber safety topics explained for students." },
    ],
  }),
  component: TopicsScreen,
});

const topics = [
  { to: "/phishing", title: "Phishing", desc: "Spot fake messages that try to steal your details.", icon: Fish },
  { to: "/passwords", title: "Passwords", desc: "Build strong, unique passwords and enable 2FA.", icon: KeyRound },
  { to: "/social-media", title: "Social Media", desc: "Privacy settings, safe sharing and fake profiles.", icon: Users },
  { to: "/scams", title: "Scams", desc: "Recognise prize, job, romance and support scams.", icon: AlertTriangle },
  { to: "/videos", title: "Malware Basics", desc: "How malware spreads and simple habits that stop it.", icon: Bug },
  { to: "/assistant", title: "Safe Browsing", desc: "HTTPS, public Wi-Fi and safer downloads.", icon: Globe },
] as const;

function TopicsScreen() {
  return (
    <Screen title="Cyber Safety Topics" subtitle="Pick a topic to learn more">
      {topics.map(({ to, title, desc, icon: Icon }) => (
        <article key={title} className="rounded-2xl border border-border bg-card p-4 shadow-[var(--shadow-card)]">
          <div className="flex min-w-0 items-start gap-3">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-secondary text-primary">
              <Icon className="h-5 w-5" />
            </span>
            <div className="min-w-0">
              <h2 className="text-sm font-semibold">{title}</h2>
              <p className="mt-0.5 text-xs text-muted-foreground">{desc}</p>
              <Link to={to} className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-primary">
                Learn more <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </article>
      ))}
    </Screen>
  );
}
