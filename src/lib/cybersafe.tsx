import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";

export type QuizQuestion = {
  id: number;
  topic: string;
  question: string;
  options: string[];
  answer: number;
  explanation: string;
};

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    topic: "Phishing",
    question: "An email says your account will be closed in 1 hour unless you click a link. What is this a sign of?",
    options: ["A normal reminder", "A phishing attempt using urgency", "A software update", "A billing receipt"],
    answer: 1,
    explanation: "Creating panic and urgency is one of the most common phishing tactics.",
  },
  {
    id: 2,
    topic: "Phishing",
    question: "Which detail most reliably helps you spot a fake sender?",
    options: ["The email signature", "A slightly misspelled sender domain", "The font used", "The time it was sent"],
    answer: 1,
    explanation: "Look-alike domains such as 'paypa1.com' are a classic warning sign.",
  },
  {
    id: 3,
    topic: "Passwords",
    question: "Which of these is the strongest password practice?",
    options: [
      "One strong password reused everywhere",
      "Your birthday plus your name",
      "A long unique passphrase per account",
      "Adding '123' to a short word",
    ],
    answer: 2,
    explanation: "Length plus uniqueness per account beats complexity tricks.",
  },
  {
    id: 4,
    topic: "Passwords",
    question: "What does two-factor authentication (2FA) add?",
    options: [
      "A second proof of identity beyond the password",
      "A faster login",
      "A backup of your files",
      "A stronger Wi-Fi signal",
    ],
    answer: 0,
    explanation: "Even if a password leaks, the second factor blocks most account takeovers.",
  },
  {
    id: 5,
    topic: "Social Media",
    question: "A new profile with no posts and 3 friends messages you asking for money. You should:",
    options: ["Send a small amount", "Share your number", "Report and block the profile", "Post about it publicly"],
    answer: 2,
    explanation: "Empty, brand-new profiles asking for money are almost always fake.",
  },
  {
    id: 6,
    topic: "Social Media",
    question: "Which post is safest to share publicly?",
    options: [
      "Your boarding pass photo",
      "Your home address",
      "A sunset photo with no location tag",
      "Your school ID card",
    ],
    answer: 2,
    explanation: "Avoid sharing documents, tickets, or anything revealing your location.",
  },
  {
    id: 7,
    topic: "Scams",
    question: "You get a message: 'You won a prize! Pay a small fee to claim it.' This is:",
    options: ["A real lottery", "An advance-fee scam", "A bank policy", "A discount offer"],
    answer: 1,
    explanation: "Genuine prizes never require you to pay a fee first.",
  },
  {
    id: 8,
    topic: "Scams",
    question: "A caller claims to be tech support and asks to install remote-access software. You should:",
    options: ["Install it quickly", "Hang up and contact the company directly", "Give your password", "Pay by gift card"],
    answer: 1,
    explanation: "Verify independently using an official number you looked up yourself.",
  },
  {
    id: 9,
    topic: "Safe Browsing",
    question: "On public Wi-Fi, the safest habit is to:",
    options: [
      "Do online banking freely",
      "Avoid sensitive logins or use a trusted VPN",
      "Turn off your screen lock",
      "Share files with everyone",
    ],
    answer: 1,
    explanation: "Public networks can be monitored; keep sensitive activity off them.",
  },
  {
    id: 10,
    topic: "Malware",
    question: "Which habit best reduces malware risk?",
    options: [
      "Installing apps from unknown links",
      "Ignoring update prompts",
      "Keeping software updated and using official stores",
      "Disabling antivirus for speed",
    ],
    answer: 2,
    explanation: "Updates patch the flaws that malware relies on.",
  },
];

type QuizState = {
  answers: (number | null)[];
  lastScore: number | null;
  setAnswer: (index: number, option: number) => void;
  reset: () => void;
  finish: () => number;
};

const QuizContext = createContext<QuizState | null>(null);

export function CyberSafeProvider({ children }: { children: ReactNode }) {
  const [answers, setAnswers] = useState<(number | null)[]>(() => QUIZ_QUESTIONS.map(() => null));
  const [lastScore, setLastScore] = useState<number | null>(null);

  const setAnswer = useCallback((index: number, option: number) => {
    setAnswers((prev) => {
      const next = [...prev];
      next[index] = option;
      return next;
    });
  }, []);

  const reset = useCallback(() => {
    setAnswers(QUIZ_QUESTIONS.map(() => null));
  }, []);

  const finish = useCallback(() => {
    let score = 0;
    setAnswers((prev) => {
      score = prev.reduce<number>((acc, a, i) => (a === QUIZ_QUESTIONS[i].answer ? acc + 1 : acc), 0);
      setLastScore(score);
      return prev;
    });
    const computed = answers.reduce<number>((acc, a, i) => (a === QUIZ_QUESTIONS[i].answer ? acc + 1 : acc), 0);
    setLastScore(computed);
    return computed;
  }, [answers]);

  const value = useMemo(
    () => ({ answers, lastScore, setAnswer, reset, finish }),
    [answers, lastScore, setAnswer, reset, finish],
  );

  return <QuizContext.Provider value={value}>{children}</QuizContext.Provider>;
}

export function useCyberSafe() {
  const ctx = useContext(QuizContext);
  if (!ctx) throw new Error("useCyberSafe must be used inside CyberSafeProvider");
  return ctx;
}

export function scorePassword(pw: string) {
  let score = 0;
  if (pw.length >= 8) score++;
  if (pw.length >= 12) score++;
  if (/[A-Z]/.test(pw) && /[a-z]/.test(pw)) score++;
  if (/[0-9]/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;
  if (/^(?:password|12345678|qwerty)/i.test(pw)) score = Math.min(score, 1);
  const labels = ["Very weak", "Weak", "Fair", "Good", "Strong", "Excellent"];
  return { score, label: labels[score] ?? "Very weak" };
}

const ASSISTANT_RULES: { keys: string[]; reply: string }[] = [
  {
    keys: ["phish", "fake email", "suspicious link"],
    reply:
      "Phishing is a message pretending to be someone you trust so you hand over passwords or money. Check the sender domain carefully, hover links before clicking, be suspicious of urgency, and go to the site directly instead of via the link.",
  },
  {
    keys: ["password", "passphrase", "2fa", "two-factor"],
    reply:
      "Strong passwords are long and unique: aim for 12+ characters, ideally a passphrase of unrelated words. Never reuse passwords, store them in a reputable password manager, and turn on two-factor authentication wherever it is offered.",
  },
  {
    keys: ["scam", "prize", "lottery", "job offer", "romance"],
    reply:
      "Most scams share the same red flags: an unexpected offer, pressure to act fast, a request for upfront payment (especially gift cards or crypto), and refusal to meet or verify. Slow down and verify through official channels.",
  },
  {
    keys: ["social", "instagram", "facebook", "privacy setting", "profile"],
    reply:
      "On social media, set your profile to private, review who can tag or message you, avoid posting documents, tickets, or live locations, and be cautious of brand-new accounts with few posts that message you first.",
  },
  {
    keys: ["malware", "virus", "ransomware", "antivirus"],
    reply:
      "Malware usually arrives through unofficial downloads or attachments. Install apps only from official stores, keep your system and browser updated, keep antivirus enabled, and back up important files regularly.",
  },
  {
    keys: ["wifi", "wi-fi", "public network", "vpn"],
    reply:
      "Public Wi-Fi can be monitored. Avoid banking or sensitive logins on it, prefer mobile data or a trusted VPN, turn off auto-connect to open networks, and make sure sites show HTTPS.",
  },
  {
    keys: ["report", "hacked", "compromised", "what should i do"],
    reply:
      "If you think an account was compromised: change the password from a trusted device, sign out of all sessions, enable 2FA, check recovery email and phone settings, and report it to the platform and a trusted adult or your school IT team.",
  },
];

export function getAssistantReply(input: string) {
  const q = input.toLowerCase();
  const hit = ASSISTANT_RULES.find((r) => r.keys.some((k) => q.includes(k)));
  return (
    hit?.reply ??
    "Great question! I cover online safety basics like phishing, passwords, scams, social media privacy, malware, and safe Wi-Fi use. Try asking something like \"How do I spot a phishing email?\" or \"What makes a strong password?\""
  );
}
