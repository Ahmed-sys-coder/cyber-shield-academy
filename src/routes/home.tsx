import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ShieldCheck,
  Fish,
  KeyRound,
  Users,
  AlertTriangle,
  Bot,
  HelpCircle,
  PlayCircle,
  LayoutGrid,
  Trophy,
} from "lucide-react";
import { useCyberSafe, QUIZ_QUESTIONS } from "@/lib/cybersafe";

export const Route = createFileRoute("/home")({
  head: () => ({
    meta: [
      { title: "Home — CyberSafe" },
      { name: "description", content: "Your cyber safety hub: topics, quiz, AI assistant and awareness videos." },
      { property: "og:title", content: "Home — CyberSafe" },
      { property: "og:description", content: "Explore cyber safety topics, test your knowledge and ask the assistant." },
    ],
  }),
  component: HomeScreen,
});

const cards = [
  { to: "/topics", label: "Cyber Safety Topics", icon: LayoutGrid },
  { to: "/phishing", label: "Phishing Awareness", icon: Fish },
  { to: "/passwords", label: "Password Safety", icon: KeyRound },
  { to: "/social-media", label: "Social Media Safety", icon: Users },
  { to: "/scams", label: "Online Scam Awareness", icon: AlertTriangle },
  { to: "/assistant", label: "AI Assistant", icon: Bot },
  { to: "/quiz", label: "Quiz", icon: HelpCircle },
  { to: "/videos", label: "Awareness Videos", icon: PlayCircle },
] as const;

function HomeScreen() {
  const { lastScore } = useCyberSafe();

  return (
    <div className="animate-in fade-in duration-300">
      <section
        className="rounded-b-3xl px-5 pb-8 pt-7 text-navy-foreground"
        style={{ background: "var(--gradient-hero)" }}
      >
        <div className="flex items-center gap-2 text-sm text-white/80">
          <ShieldCheck className="h-5 w-5" />
          CyberSafe
        </div>
        <h1 className="mt-2 text-2xl font-bold">Stay safe online</h1>
        <p className="mt-1 text-sm text-white/80">
          Short lessons, real-world examples and a quiz to check what you know.
        </p>
        <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1.5 text-sm backdrop-blur">
          <Trophy className="h-4 w-4" />
          {lastScore === null
            ? "No quiz score yet — take the quiz!"
            : `Your score: ${lastScore}/${QUIZ_QUESTIONS.length}`}
        </div>
      </section>

      <section className="grid grid-cols-2 gap-3 px-4 py-5">
        {cards.map(({ to, label, icon: Icon }) => (
          <Link
            key={to}
            to={to}
            className="group rounded-2xl border border-border bg-card p-4 shadow-[var(--shadow-card)] transition-transform hover:-translate-y-0.5"
          >
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-secondary text-primary transition-colors group-hover:bg-accent/25">
              <Icon className="h-5 w-5" />
            </span>
            <span className="mt-3 block text-sm font-semibold leading-snug">{label}</span>
          </Link>
        ))}
      </section>
    </div>
  );
}
