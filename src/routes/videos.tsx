import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Play, Clock, Film } from "lucide-react";
import { Screen } from "@/components/Screen";
import { Skeleton } from "@/components/ui/skeleton";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

export const Route = createFileRoute("/videos")({
  head: () => ({
    meta: [
      { title: "Awareness Videos — CyberSafe" },
      { name: "description", content: "Short awareness videos on phishing, strong passwords, online scams and social media privacy." },
      { property: "og:title", content: "Awareness Videos — CyberSafe" },
      { property: "og:description", content: "Watch bite-size cyber safety awareness videos." },
    ],
  }),
  component: VideosScreen,
});

const videos = [
  { title: "What is Phishing?", duration: "3:20", desc: "How fake messages work and how to check a sender." },
  { title: "Creating Strong Passwords", duration: "4:05", desc: "Passphrases, password managers and 2FA basics." },
  { title: "Spotting Online Scams", duration: "5:12", desc: "Prize, job, romance and tech support scam red flags." },
  { title: "Social Media Privacy Tips", duration: "2:48", desc: "Lock down your profile in a few minutes." },
];

function VideosScreen() {
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState<number | null>(null);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 700);
    return () => clearTimeout(t);
  }, []);

  const active = open === null ? null : videos[open];

  return (
    <Screen title="Awareness Videos" subtitle="Short lessons you can watch anywhere">
      <div className="grid grid-cols-2 gap-3">
        {loading
          ? [0, 1, 2, 3].map((i) => (
              <div key={i} className="space-y-2">
                <Skeleton className="aspect-video w-full rounded-2xl" />
                <Skeleton className="h-3 w-4/5" />
                <Skeleton className="h-3 w-1/3" />
              </div>
            ))
          : videos.map((v, i) => (
              <button
                key={v.title}
                type="button"
                onClick={() => setOpen(i)}
                className="group overflow-hidden rounded-2xl border border-border bg-card text-left shadow-[var(--shadow-card)] transition-transform hover:-translate-y-0.5"
              >
                <span
                  className="grid aspect-video place-items-center text-navy-foreground"
                  style={{ background: "var(--gradient-hero)" }}
                >
                  <Play className="h-8 w-8 transition-transform group-hover:scale-110" />
                </span>
                <span className="block p-3">
                  <span className="block text-xs font-semibold leading-snug">{v.title}</span>
                  <span className="mt-1 flex items-center gap-1 text-[11px] text-muted-foreground">
                    <Clock className="h-3 w-3" /> {v.duration}
                  </span>
                </span>
              </button>
            ))}
      </div>

      <Dialog open={open !== null} onOpenChange={(o) => !o && setOpen(null)}>
        <DialogContent className="max-w-[92vw] sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-base">{active?.title}</DialogTitle>
            <DialogDescription className="text-xs">{active?.desc}</DialogDescription>
          </DialogHeader>
          <div
            className="grid aspect-video place-items-center rounded-xl text-navy-foreground"
            style={{ background: "var(--gradient-hero)" }}
          >
            <div className="flex flex-col items-center gap-2 text-xs text-white/85">
              <Film className="h-8 w-8" />
              Video player placeholder
            </div>
          </div>
          <p className="text-xs text-muted-foreground">Duration {active?.duration} — demo content only.</p>
        </DialogContent>
      </Dialog>
    </Screen>
  );
}
