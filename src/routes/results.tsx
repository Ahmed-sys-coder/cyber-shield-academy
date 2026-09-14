import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Check, X, Trophy } from "lucide-react";
import { Screen } from "@/components/Screen";
import { Button } from "@/components/ui/button";
import { QUIZ_QUESTIONS, useCyberSafe } from "@/lib/cybersafe";

export const Route = createFileRoute("/results")({
  head: () => ({
    meta: [
      { title: "Quiz Results — CyberSafe" },
      { name: "description", content: "See your cyber safety quiz score, a breakdown of your answers and where to improve." },
      { property: "og:title", content: "Quiz Results — CyberSafe" },
      { property: "og:description", content: "Your cyber safety awareness score and answer breakdown." },
    ],
  }),
  component: ResultsScreen,
});

function ResultsScreen() {
  const navigate = useNavigate();
  const { answers, lastScore, reset } = useCyberSafe();
  const total = QUIZ_QUESTIONS.length;
  const score = lastScore ?? 0;
  const pct = (score / total) * 100;
  const verdict = score >= 9 ? "Cyber Safety Expert" : score >= 6 ? "Good Awareness" : "Needs Improvement";
  const blurb =
    score >= 9
      ? "Excellent! You can spot the common tricks with confidence."
      : score >= 6
        ? "Solid work — review the topics you missed to sharpen your instincts."
        : "Good start. Revisit the topic screens and try the quiz again.";

  const radius = 52;
  const circumference = 2 * Math.PI * radius;

  if (lastScore === null) {
    return (
      <Screen title="Quiz Results" subtitle="No attempt yet">
        <p className="text-sm text-muted-foreground">You haven't finished the quiz yet.</p>
        <Button asChild>
          <Link to="/quiz">Start the quiz</Link>
        </Button>
      </Screen>
    );
  }

  return (
    <Screen title="Quiz Results" subtitle={verdict}>
      <section className="flex flex-col items-center rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)]">
        <div className="relative h-36 w-36">
          <svg viewBox="0 0 120 120" className="h-full w-full -rotate-90">
            <circle cx="60" cy="60" r={radius} fill="none" strokeWidth="10" className="stroke-secondary" />
            <circle
              cx="60"
              cy="60"
              r={radius}
              fill="none"
              strokeWidth="10"
              strokeLinecap="round"
              className="stroke-primary transition-all duration-700"
              strokeDasharray={circumference}
              strokeDashoffset={circumference - (pct / 100) * circumference}
            />
          </svg>
          <div className="absolute inset-0 grid place-items-center">
            <span className="text-3xl font-bold">
              {score}
              <span className="text-base text-muted-foreground">/{total}</span>
            </span>
          </div>
        </div>
        <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-secondary px-3 py-1.5 text-sm font-semibold">
          <Trophy className="h-4 w-4 text-primary" /> {verdict}
        </div>
        <p className="mt-2 text-center text-sm text-muted-foreground">{blurb}</p>
      </section>

      <section className="space-y-2">
        <h2 className="px-1 text-sm font-semibold">Answer breakdown</h2>
        {QUIZ_QUESTIONS.map((q, i) => {
          const correct = answers[i] === q.answer;
          return (
            <article key={q.id} className="rounded-2xl border border-border bg-card p-3 shadow-[var(--shadow-card)]">
              <div className="grid grid-cols-[auto_minmax(0,1fr)] items-start gap-2">
                <span
                  className={`mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full ${
                    correct ? "bg-success/15 text-success" : "bg-destructive/15 text-destructive"
                  }`}
                >
                  {correct ? <Check className="h-3.5 w-3.5" /> : <X className="h-3.5 w-3.5" />}
                </span>
                <div className="min-w-0">
                  <p className="text-xs font-medium">{q.question}</p>
                  {!correct ? (
                    <p className="mt-1 text-xs text-muted-foreground">Correct answer: {q.options[q.answer]}</p>
                  ) : null}
                </div>
              </div>
            </article>
          );
        })}
      </section>

      <div className="flex gap-2 pb-2">
        <Button
          className="flex-1"
          onClick={() => {
            reset();
            navigate({ to: "/quiz" });
          }}
        >
          Retake quiz
        </Button>
        <Button variant="outline" className="flex-1" asChild>
          <Link to="/home">Go home</Link>
        </Button>
      </div>
    </Screen>
  );
}
