# CyberSafe — App Documentation

## Overview
CyberSafe is a mobile-first cybersecurity awareness app for students. It teaches phishing, password safety, social media privacy, online scams, malware, and safe browsing through short lessons, an interactive assistant, a password strength checker, and a 10-question quiz.

## Tech Stack
- **Framework:** TanStack Start (React 19 + Vite 7)
- **Styling:** Tailwind CSS v4
- **UI Components:** shadcn/ui primitives
- **Icons:** lucide-react
- **State:** React Context + `useState` (no backend)
- **Routing:** TanStack Router file-based routing

## Project Structure
```
src/
├── components/
│   ├── BottomNav.tsx       # Mobile-style bottom tab bar
│   ├── Screen.tsx          # Reusable page wrapper with header
│   └── ui/                 # shadcn/ui components
├── lib/
│   ├── cybersafe.tsx       # Quiz data, state provider, password scoring, assistant replies
│   └── utils.ts
├── routes/
│   ├── __root.tsx          # App shell, theme wrapper, provider setup
│   ├── index.tsx           # Splash screen
│   ├── home.tsx            # Home dashboard
│   ├── topics.tsx          # Topic grid
│   ├── phishing.tsx        # Phishing lesson
│   ├── passwords.tsx       # Password lesson + strength checker
│   ├── social-media.tsx    # Social media safety
│   ├── scams.tsx           # Scam awareness
│   ├── assistant.tsx       # AI safety assistant chat
│   ├── quiz.tsx            # 10-question quiz
│   ├── results.tsx         # Quiz results
│   └── videos.tsx          # Awareness videos placeholder
├── styles.css              # Theme tokens (navy/teal palette)
└── router.tsx
```

## Core Features

### 1. Splash Screen
- Shows shield logo, app name, and tagline.
- Auto-navigates to `/home` after 2 seconds.

### 2. Home Screen
- Welcome message.
- Current quiz score badge.
- Navigation cards to all sections.

### 3. Cyber Safety Topics
- Grid cards for Phishing, Passwords, Social Media, Scams, Malware, Safe Browsing.
- Each links to its detail screen.

### 4. Phishing Awareness
- Definition of phishing.
- Warning-sign checklist with icons.
- Real-world scenarios (text only).
- Safety tips.

### 5. Password Safety
- Password education.
- Live password strength meter.
- Tips on password managers and 2FA.

### 6. Social Media Safety
- Accordion cards covering privacy, sharing, fake profiles, oversharing.

### 7. Online Scam Awareness
- Expandable cards for fake prizes, phishing emails, fake jobs, romance scams, tech support scams.
- Red-flag indicators.

### 8. AI Cyber Safety Assistant
- Chat UI with mock keyword-based responses.
- Typing indicator.
- Empty-input validation.
- Topics: phishing, passwords, scams, social media, malware, Wi-Fi.

### 9. Quiz
- 10 multiple-choice questions.
- One question per screen.
- Progress bar.
- Next button disabled until answer selected.
- Instant correct/incorrect feedback with explanation.

### 10. Results
- Circular score indicator.
- Verdict message.
- Correct/incorrect breakdown.
- Retake or go home.

### 11. Awareness Videos
- Placeholder video cards with thumbnails and durations.
- Modal placeholder video player.

## State Management
All state lives in `CyberSafeProvider` (`src/lib/cybersafe.tsx`):
- `answers`: array of selected options for each quiz question.
- `lastScore`: most recent completed score.
- `setAnswer(index, option)`: records an answer.
- `reset()`: clears answers for retake.
- `finish()`: calculates final score.

No backend or localStorage is used; state resets on refresh.

## Key Utilities

### Password Scoring (`scorePassword`)
- Checks length, mixed case, numbers, symbols.
- Penalizes common passwords.
- Returns score 0–5 and a label.

### Assistant Replies (`getAssistantReply`)
- Matches user input against keyword groups.
- Returns educational response or friendly fallback.

## Design System
- **Colors:** Navy, teal, white, with success/warning accents.
- **Layout:** Max-width 420px centered phone-style card on desktop, full-width on mobile.
- **Components:** Rounded cards, subtle shadows, shield/lock icons.
- **Bottom Nav:** Home, Topics, Quiz, Assistant, Videos.

## Routes Map

| URL | Screen |
|-----|--------|
| `/` | Splash |
| `/home` | Home |
| `/topics` | Topics |
| `/phishing` | Phishing Awareness |
| `/passwords` | Password Safety |
| `/social-media` | Social Media Safety |
| `/scams` | Scam Awareness |
| `/assistant` | AI Assistant |
| `/quiz` | Quiz |
| `/results` | Results |
| `/videos` | Awareness Videos |

## How to Run
```bash
npm i
npm run dev
```
Then open `http://localhost:8080`.

## Notes for Extension
- New screens go in `src/routes/<name>.tsx` and automatically become routes.
- Shared state goes in `src/lib/cybersafe.tsx`.
- Theme tweaks go in `src/styles.css`.
- The app intentionally has no real backend or API keys — all assistant responses are local mocks.
