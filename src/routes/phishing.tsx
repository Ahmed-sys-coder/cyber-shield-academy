import { createFileRoute } from "@tanstack/react-router";
import { AlertTriangle, CheckCircle2, Mail } from "lucide-react";
import { Screen } from "@/components/Screen";

export const Route = createFileRoute("/phishing")({
  head: () => ({
    meta: [
      { title: "Phishing Awareness — CyberSafe" },
      { name: "description", content: "Learn what phishing is, the warning signs to look for, and safe habits that protect your accounts." },
      { property: "og:title", content: "Phishing Awareness — CyberSafe" },
      { property: "og:description", content: "Warning signs, real-world examples and safety tips for spotting phishing." },
    ],
  }),
  component: PhishingScreen,
});

const signs = [
  "Urgent threats: 'your account closes in 1 hour'",
  "Sender address that almost matches a real company",
  "Generic greetings like 'Dear customer'",
  "Links whose preview URL differs from the text",
  "Unexpected attachments or login pages",
  "Requests for passwords, OTP codes or payment details",
];

const examples = [
  {
    title: "The 'bank alert'",
    body: "A text says unusual activity was detected and asks you to verify your account through a link. The real bank would ask you to log in through its official app instead.",
  },
  {
    title: "The 'exam results' email",
    body: "A message claims your results are ready and asks you to sign in with your school email on an unfamiliar page. The page only exists to collect your login.",
  },
  {
    title: "The 'delivery fee'",
    body: "A parcel notice asks for a small customs fee. The payment page collects your full card details for later misuse.",
  },
  {
    title: "The 'IT helpdesk' message",
    body: "Someone posing as staff asks for your one-time code to 'fix' your account. No real support team ever needs your OTP.",
  },
];

const tips = [
  "Go to websites directly instead of clicking links in messages.",
  "Check the sender domain letter by letter.",
  "Never share OTP codes — not even with support staff.",
  "Turn on two-factor authentication for email and social accounts.",
  "If unsure, ask a teacher, parent or IT team before acting.",
];

function PhishingScreen() {
  return (
    <Screen title="Phishing Awareness" subtitle="Spot the fake before it costs you">
      <section className="rounded-2xl border border-border bg-card p-4 shadow-[var(--shadow-card)]">
        <div className="flex items-center gap-2 text-primary">
          <Mail className="h-5 w-5" />
          <h2 className="text-sm font-semibold">What is phishing?</h2>
        </div>
        <p className="mt-2 text-sm text-muted-foreground">
          Phishing is when someone pretends to be a person or organisation you trust — a bank, a school, a delivery
          service — to trick you into giving up passwords, codes, or money. It usually arrives by email, text, or
          direct message.
        </p>
      </section>

      <section className="rounded-2xl border border-border bg-card p-4 shadow-[var(--shadow-card)]">
        <div className="flex items-center gap-2 text-warning">
          <AlertTriangle className="h-5 w-5" />
          <h2 className="text-sm font-semibold text-foreground">Warning signs checklist</h2>
        </div>
        <ul className="mt-3 space-y-2">
          {signs.map((s) => (
            <li key={s} className="flex items-start gap-2 text-sm text-muted-foreground">
              <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-warning" />
              <span>{s}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="px-1 text-sm font-semibold">Real-world examples</h2>
        {examples.map((e) => (
          <article key={e.title} className="rounded-2xl border border-border bg-card p-4 shadow-[var(--shadow-card)]">
            <h3 className="text-sm font-semibold">{e.title}</h3>
            <p className="mt-1 text-xs text-muted-foreground">{e.body}</p>
          </article>
        ))}
      </section>

      <section className="rounded-2xl border border-border bg-secondary/60 p-4">
        <h2 className="text-sm font-semibold">Tips to stay safe</h2>
        <ul className="mt-3 space-y-2">
          {tips.map((t) => (
            <li key={t} className="flex items-start gap-2 text-sm text-muted-foreground">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" />
              <span>{t}</span>
            </li>
          ))}
        </ul>
      </section>
    </Screen>
  );
}
