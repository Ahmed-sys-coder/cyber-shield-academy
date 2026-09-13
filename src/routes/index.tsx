import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { ShieldCheck } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "CyberSafe — Cyber Safety Learning for Students" },
      {
        name: "description",
        content:
          "CyberSafe teaches students to spot phishing, build strong passwords, stay private on social media, and avoid online scams.",
      },
      { property: "og:title", content: "CyberSafe — Cyber Safety Learning for Students" },
      {
        property: "og:description",
        content: "Learn phishing awareness, password safety, scam spotting and more in a mobile-friendly app.",
      },
    ],
  }),
  component: Splash,
});

function Splash() {
  const navigate = useNavigate();

  useEffect(() => {
    const t = setTimeout(() => navigate({ to: "/home" }), 2000);
    return () => clearTimeout(t);
  }, [navigate]);

  return (
    <div
      className="flex min-h-[100dvh] flex-col items-center justify-center gap-4 px-8 text-center text-navy-foreground"
      style={{ background: "var(--gradient-hero)" }}
    >
      <div className="animate-in zoom-in duration-700 grid h-24 w-24 place-items-center rounded-3xl bg-white/15 backdrop-blur">
        <ShieldCheck className="h-12 w-12" />
      </div>
      <h1 className="animate-in fade-in duration-1000 text-3xl font-bold tracking-tight">CyberSafe</h1>
      <p className="animate-in fade-in duration-1000 max-w-xs text-sm text-white/80">
        Learn to stay safe online — phishing, passwords, scams and privacy made simple.
      </p>
      <div className="mt-4 h-1 w-28 overflow-hidden rounded-full bg-white/25">
        <div className="h-full w-1/3 animate-[pulse_1.2s_ease-in-out_infinite] rounded-full bg-white/80" />
      </div>
    </div>
  );
}
