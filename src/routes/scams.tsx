import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ChevronDown, Flag, Gift, Mail, Briefcase, Heart, Headphones } from "lucide-react";
import { Screen } from "@/components/Screen";

export const Route = createFileRoute("/scams")({
  head: () => ({
    meta: [
      { title: "Online Scam Awareness — CyberSafe" },
      { name: "description", content: "Fake prizes, phishing emails, fake job offers, romance scams and tech support scams — and the red flags that give them away." },
      { property: "og:title", content: "Online Scam Awareness — CyberSafe" },
      { property: "og:description", content: "Learn the most common online scams and their red flags." },
    ],
  }),
  component: ScamsScreen,
});

const scams = [
  {
    icon: Gift,
    title: "Fake prize or lottery",
    desc: "A message says you have won something you never entered, and asks for a fee or your details to release it.",
    flags: ["You never entered", "Upfront 'processing fee'", "Pressure to claim within hours"],
  },
  {
    icon: Mail,
    title: "Phishing emails",
    desc: "A message imitating a bank, school or service, pushing you to a login page that only collects your credentials.",
    flags: ["Look-alike sender domain", "Generic greeting", "Link text does not match the real URL"],
  },
  {
    icon: Briefcase,
    title: "Fake job offers",
    desc: "A 'recruiter' offers easy, well-paid remote work, then asks for a registration fee or your bank details.",
    flags: ["Hired without an interview", "Payment requested from you", "Only chat-app contact, no company email"],
  },
  {
    icon: Heart,
    title: "Romance scams",
    desc: "Someone builds a fast online relationship, avoids video calls, then describes an emergency needing money.",
    flags: ["Never meets or video calls", "Moves chat off-platform quickly", "Requests money, crypto or gift cards"],
  },
  {
    icon: Headphones,
    title: "Tech support scams",
    desc: "A pop-up or caller claims your device is infected and asks to install remote-access tools or take payment.",
    flags: ["Unsolicited contact", "Asks for remote access", "Demands unusual payment methods"],
  },
];

function ScamsScreen() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <Screen title="Online Scam Awareness" subtitle="Know the pattern, avoid the trap">
      {scams.map((s, i) => {
        const Icon = s.icon;
        const isOpen = open === i;
        return (
          <article key={s.title} className="overflow-hidden rounded-2xl border border-border bg-card shadow-[var(--shadow-card)]">
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="grid w-full grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 p-4 text-left"
            >
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-secondary text-primary">
                <Icon className="h-5 w-5" />
              </span>
              <span className="min-w-0 text-sm font-semibold">{s.title}</span>
              <ChevronDown className={`h-4 w-4 shrink-0 text-muted-foreground transition-transform ${isOpen ? "rotate-180" : ""}`} />
            </button>
            {isOpen ? (
              <div className="animate-in fade-in slide-in-from-top-1 space-y-3 border-t border-border px-4 py-3 duration-200">
                <p className="text-sm text-muted-foreground">{s.desc}</p>
                <ul className="space-y-1.5">
                  {s.flags.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-xs text-muted-foreground">
                      <Flag className="mt-0.5 h-3.5 w-3.5 shrink-0 text-destructive" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </article>
        );
      })}
    </Screen>
  );
}
