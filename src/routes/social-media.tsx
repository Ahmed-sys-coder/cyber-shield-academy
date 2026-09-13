import { createFileRoute } from "@tanstack/react-router";
import { Screen } from "@/components/Screen";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const Route = createFileRoute("/social-media")({
  head: () => ({
    meta: [
      { title: "Social Media Safety — CyberSafe" },
      { name: "description", content: "Privacy settings, safe sharing habits, spotting fake profiles and avoiding oversharing." },
      { property: "og:title", content: "Social Media Safety — CyberSafe" },
      { property: "og:description", content: "Practical social media privacy advice for students." },
    ],
  }),
  component: SocialScreen,
});

const sections = [
  {
    title: "Privacy settings",
    body: "Set your account to private, limit who can tag you or comment, hide your friends list, and review app permissions every few months. Check what a logged-out visitor can see by viewing your public profile.",
  },
  {
    title: "Safe sharing habits",
    body: "Post after the moment, not during it. Avoid sharing school uniforms with badges, house numbers, number plates, tickets, or documents. Turn off automatic location tagging.",
  },
  {
    title: "Recognising fake profiles",
    body: "Warning signs: brand-new account, few posts, stock-looking photos, copied bio, instant friendliness, quick move to private chat, and any request for money, photos or personal details.",
  },
  {
    title: "Oversharing risks",
    body: "Small details add up. Your pet's name, school, birthday and favourite team are often the exact answers to account recovery questions — and useful to anyone impersonating you.",
  },
  {
    title: "If something goes wrong",
    body: "Stop replying, screenshot the conversation, block and report the account in the app, then tell a trusted adult, teacher or your school's IT team.",
  },
];

function SocialScreen() {
  return (
    <Screen title="Social Media Safety" subtitle="Share smart, stay private">
      <div className="rounded-2xl border border-border bg-card p-2 shadow-[var(--shadow-card)]">
        <Accordion type="single" collapsible defaultValue="item-0">
          {sections.map((s, i) => (
            <AccordionItem key={s.title} value={`item-${i}`}>
              <AccordionTrigger className="px-2 text-left text-sm font-semibold">{s.title}</AccordionTrigger>
              <AccordionContent className="px-2 text-sm text-muted-foreground">{s.body}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </Screen>
  );
}
