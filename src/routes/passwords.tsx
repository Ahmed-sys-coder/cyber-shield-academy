import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Eye, EyeOff, KeyRound, ShieldCheck, Smartphone } from "lucide-react";
import { Screen } from "@/components/Screen";
import { Input } from "@/components/ui/input";
import { scorePassword } from "@/lib/cybersafe";

export const Route = createFileRoute("/passwords")({
  head: () => ({
    meta: [
      { title: "Password Safety — CyberSafe" },
      { name: "description", content: "Create strong passwords, test strength live, and learn about password managers and 2FA." },
      { property: "og:title", content: "Password Safety — CyberSafe" },
      { property: "og:description", content: "An interactive password strength checker plus practical password tips." },
    ],
  }),
  component: PasswordScreen,
});

const barColors = [
  "bg-destructive",
  "bg-destructive",
  "bg-warning",
  "bg-warning",
  "bg-success",
  "bg-success",
];

function PasswordScreen() {
  const [pw, setPw] = useState("");
  const [show, setShow] = useState(false);
  const { score, label } = useMemo(() => scorePassword(pw), [pw]);
  const pct = pw ? Math.max(8, (score / 5) * 100) : 0;

  return (
    <Screen title="Password Safety" subtitle="Strong, unique, protected">
      <section className="rounded-2xl border border-border bg-card p-4 shadow-[var(--shadow-card)]">
        <div className="flex items-center gap-2 text-primary">
          <KeyRound className="h-5 w-5" />
          <h2 className="text-sm font-semibold text-foreground">What makes a password strong?</h2>
        </div>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-muted-foreground">
          <li>Length first — 12 characters or more, ideally a passphrase.</li>
          <li>Mix upper and lower case, numbers and symbols.</li>
          <li>No names, birthdays, team names or dictionary words alone.</li>
          <li>A different password for every account.</li>
        </ul>
      </section>

      <section className="rounded-2xl border border-border bg-card p-4 shadow-[var(--shadow-card)]">
        <h2 className="text-sm font-semibold">Password strength checker</h2>
        <p className="mt-1 text-xs text-muted-foreground">
          Checked entirely on your device — nothing is sent or stored anywhere.
        </p>
        <div className="relative mt-3">
          <Input
            type={show ? "text" : "password"}
            value={pw}
            onChange={(e) => setPw(e.target.value)}
            placeholder="Type a password to test"
            className="pr-10"
            aria-label="Password to test"
          />
          <button
            type="button"
            onClick={() => setShow((s) => !s)}
            aria-label={show ? "Hide password" : "Show password"}
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md p-1.5 text-muted-foreground hover:text-foreground"
          >
            {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
        <div className="mt-3 h-2 overflow-hidden rounded-full bg-secondary">
          <div
            className={`h-full rounded-full transition-all duration-300 ${barColors[score] ?? "bg-destructive"}`}
            style={{ width: `${pct}%` }}
          />
        </div>
        <p className="mt-2 text-xs font-medium">
          {pw ? label : <span className="text-muted-foreground">Start typing to see the strength</span>}
        </p>
        {pw && score < 3 ? (
          <p className="mt-1 text-xs text-muted-foreground">
            Try making it longer and adding a number or symbol.
          </p>
        ) : null}
      </section>

      <section className="rounded-2xl border border-border bg-card p-4 shadow-[var(--shadow-card)]">
        <div className="flex items-center gap-2 text-primary">
          <ShieldCheck className="h-5 w-5" />
          <h2 className="text-sm font-semibold text-foreground">Password managers</h2>
        </div>
        <p className="mt-2 text-sm text-muted-foreground">
          A reputable password manager creates and remembers long, unique passwords for you, so you only memorise one
          strong master passphrase. Most also warn you when a saved password appears in a known data breach.
        </p>
      </section>

      <section className="rounded-2xl border border-border bg-secondary/60 p-4">
        <div className="flex items-center gap-2 text-primary">
          <Smartphone className="h-5 w-5" />
          <h2 className="text-sm font-semibold text-foreground">Two-factor authentication (2FA)</h2>
        </div>
        <p className="mt-2 text-sm text-muted-foreground">
          2FA asks for a second proof — an app code or security key — after your password. Prefer an authenticator app
          over SMS where possible, and never share a code with anyone who contacts you.
        </p>
      </section>
    </Screen>
  );
}
