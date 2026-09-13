import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Bot, Send, ShieldCheck, User } from "lucide-react";
import { Screen } from "@/components/Screen";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { getAssistantReply } from "@/lib/cybersafe";

export const Route = createFileRoute("/assistant")({
  head: () => ({
    meta: [
      { title: "AI Cyber Safety Assistant — CyberSafe" },
      { name: "description", content: "Ask cyber safety questions and get short educational answers about phishing, passwords, scams and privacy." },
      { property: "og:title", content: "AI Cyber Safety Assistant — CyberSafe" },
      { property: "og:description", content: "A friendly assistant answering student cyber safety questions." },
    ],
  }),
  component: AssistantScreen,
});

type Msg = { role: "user" | "bot"; text: string };

const suggestions = [
  "How do I spot a phishing email?",
  "What makes a strong password?",
  "Is public wifi safe?",
  "How do I avoid scams?",
];

function AssistantScreen() {
  const [messages, setMessages] = useState<Msg[]>([
    {
      role: "bot",
      text: "Hi! I'm your cyber safety assistant. Ask me about phishing, passwords, scams, social media privacy, malware or Wi-Fi safety.",
    },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [error, setError] = useState("");
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  const send = (value: string) => {
    const text = value.trim();
    if (!text) {
      setError("Please type a question first.");
      return;
    }
    setError("");
    setInput("");
    setMessages((m) => [...m, { role: "user", text }]);
    setTyping(true);
    setTimeout(() => {
      setMessages((m) => [...m, { role: "bot", text: getAssistantReply(text) }]);
      setTyping(false);
    }, 900);
  };

  return (
    <Screen title="AI Cyber Safety Assistant" subtitle="Educational answers, offline demo">
      <div className="flex items-center gap-2 rounded-xl bg-secondary/70 px-3 py-2 text-xs text-muted-foreground">
        <ShieldCheck className="h-4 w-4 shrink-0 text-primary" />
        Answers are pre-written awareness guidance — no personal data leaves your device.
      </div>

      <div className="space-y-3">
        {messages.map((m, i) => (
          <div key={i} className={`flex gap-2 ${m.role === "user" ? "justify-end" : "justify-start"}`}>
            {m.role === "bot" ? (
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-secondary text-primary">
                <Bot className="h-4 w-4" />
              </span>
            ) : null}
            <p
              className={`max-w-[75%] rounded-2xl px-3 py-2 text-sm ${
                m.role === "user"
                  ? "bg-primary text-primary-foreground"
                  : "border border-border bg-card text-card-foreground"
              }`}
            >
              {m.text}
            </p>
            {m.role === "user" ? (
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-secondary text-primary">
                <User className="h-4 w-4" />
              </span>
            ) : null}
          </div>
        ))}

        {typing ? (
          <div className="flex items-center gap-2">
            <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-secondary text-primary">
              <Bot className="h-4 w-4" />
            </span>
            <span className="flex items-center gap-1 rounded-2xl border border-border bg-card px-3 py-3">
              {[0, 1, 2].map((d) => (
                <span
                  key={d}
                  className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground"
                  style={{ animationDelay: `${d * 120}ms` }}
                />
              ))}
            </span>
          </div>
        ) : null}
        <div ref={endRef} />
      </div>

      <div className="flex flex-wrap gap-2">
        {suggestions.map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => send(s)}
            className="rounded-full border border-border bg-card px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:border-accent hover:text-foreground"
          >
            {s}
          </button>
        ))}
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          send(input);
        }}
        className="sticky bottom-2 space-y-1"
      >
        <div className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              if (error) setError("");
            }}
            placeholder="Ask a cyber safety question..."
            aria-label="Your question"
          />
          <Button type="submit" size="icon" disabled={typing} aria-label="Send question">
            <Send className="h-4 w-4" />
          </Button>
        </div>
        {error ? <p className="px-1 text-xs text-destructive">{error}</p> : null}
      </form>
    </Screen>
  );
}
