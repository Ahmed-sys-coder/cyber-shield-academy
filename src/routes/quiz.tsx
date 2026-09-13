import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Check, X, AlertCircle } from "lucide-react";
import { Screen } from "@/components/Screen";
import { Button } from "@/components/ui/button";
import { QUIZ_QUESTIONS, useCyberSafe } from "@/lib/cybersafe";

export const Route = createFileRoute("/quiz")({
  head: () => ({
    meta: [
      { title: "Cyber Safety Quiz — CyberSafe" },
      { name: "description", content: "Test your cyber safety knowledge with 10 questions on phishing, passwords, scams and social media." },
      { property: "og:title", content: "Cyber Safety Quiz — CyberSafe" },
      { property: "og:description", content: "Ten quick questions to check your online safety awareness." },
    ],
  }),
  component: QuizScreen,
});

function QuizScreen() {
  const navigate = useNavigate();
  const { answers, setAnswer, finish, reset } = useCyberSafe();
  const [index, setIndex] = useState(0);
  const [warning, setWarning] = useState("");

  const q = QUIZ_QUESTIONS[index]!;
  const selected = answers[index] ?? null;
  const progress = ((index + (selected !== null ? 1 : 0)) / QUIZ_QUESTIONS.length) * 100;

  const choose = (i: number) => {
    if (selected !== null) return;
    setWarning("");
    setAnswer(index, i);
  };

  const next = () => {
    if (selected === null) {
      setWarning("Please select an answer to continue.");
      return;
    }
    if (index === QUIZ_QUESTIONS.length - 1) {
      finish();
      navigate({ to: "/results" });
      return;
    }
    setIndex((i) => i + 1);
  };

  return (
    <Screen title="Cyber Safety Quiz" subtitle={`Question ${index + 1} of ${QUIZ_QUESTIONS.length}`}>
      <div className="h-2 overflow-hidden rounded-full bg-secondary">
        <div className="h-full rounded-full bg-primary transition-all duration-300" style={{ width: `${progress}%` }} />
      </div>

      <div key={q.id} className="animate-in fade-in slide-in-from-right-3 space-y-4 duration-300">
        <div className="rounded-2xl border border-border bg-card p-4 shadow-[var(--shadow-card)]">
          <span className="text-[11px] font-semibold uppercase tracking-wide text-primary">{q.topic}</span>
          <h2 className="mt-1 text-sm font-semibold leading-snug">{q.question}</h2>
        </div>

        <div className="space-y-2">
          {q.options.map((opt, i) => {
            const isCorrect = i === q.answer;
            const chosen = selected === i;
            const revealed = selected !== null;
            const tone = revealed
              ? isCorrect
                ? "border-success bg-success/10"
                : chosen
                  ? "border-destructive bg-destructive/10"
                  : "border-border bg-card opacity-70"
              : "border-border bg-card hover:border-accent";
            return (
              <button
                key={opt}
                type="button"
                onClick={() => choose(i)}
                disabled={revealed}
                className={`grid w-full grid-cols-[minmax(0,1fr)_auto] items-center gap-3 rounded-2xl border p-3.5 text-left text-sm transition-colors ${tone}`}
              >
                <span className="min-w-0">{opt}</span>
                {revealed && isCorrect ? <Check className="h-4 w-4 shrink-0 text-success" /> : null}
                {revealed && chosen && !isCorrect ? <X className="h-4 w-4 shrink-0 text-destructive" /> : null}
              </button>
            );
          })}
        </div>

        {selected !== null ? (
          <p className="rounded-xl bg-secondary/70 p-3 text-xs text-muted-foreground">{q.explanation}</p>
        ) : null}

        {warning ? (
          <p className="flex items-center gap-1.5 text-xs text-destructive">
            <AlertCircle className="h-4 w-4" /> {warning}
          </p>
        ) : null}

        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => {
              reset();
              setIndex(0);
              setWarning("");
            }}
          >
            Restart
          </Button>
          <Button className="flex-1" onClick={next} disabled={selected === null}>
            {index === QUIZ_QUESTIONS.length - 1 ? "See results" : "Next question"}
          </Button>
        </div>
      </div>
    </Screen>
  );
}
