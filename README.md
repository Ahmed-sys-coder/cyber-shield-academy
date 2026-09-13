# Cyber Shield Academy

Build a mobile-style web application called "CyberSafe" — a cybersecurity awareness and education app for students, built with React, Tailwind, and shadcn-ui. Design it mobile-first (max-width ~420px centered card layout, like a phone screen) since it will be demoed on mobile and desktop.

PURPOSE: Educate users about phishing, password safety, social media safety, and online scams. Educational and awareness only — never include real attack instructions, exploit code, or hacking techniques anywhere in the app content.

SCREENS (use client-side routing, all screens should have smooth transitions):

1. Splash Screen — app logo/shield icon, app name "CyberSafe", tagline, auto-navigates to Home after 2 seconds.

2. Home — welcome message, user's current quiz score badge, grid of navigation cards linking to: Cyber Safety Topics, Phishing Awareness, Password Safety, Social Media Safety, Online Scam Awareness, AI Assistant, Quiz, Awareness Videos.

3. Cyber Safety Topics — list/grid of cybersecurity topic cards (Phishing, Passwords, Social Media, Scams, Malware Basics, Safe Browsing), each with icon, short description, and "Learn More" that links to the relevant detail screen.

4. Phishing Awareness — educational content: what phishing is, common warning signs (as a checklist with icons), 3-4 real-world example scenarios described in text (no real attack code), tips to stay safe.

5. Password Safety — content on creating strong passwords, a live interactive "Password Strength Checker" (input field + real-time strength meter with color feedback, calculated client-side using simple rules like length/uppercase/numbers/symbols), tips on password managers and 2FA.

6. Social Media Safety — content on privacy settings, safe sharing habits, recognizing fake profiles, oversharing risks — presented as short cards or an accordion.

7. Online Scam Awareness — common scam types (fake prizes, phishing emails, fake job offers, romance scams, tech support scams) as expandable cards with description and red-flag indicators.

8. AI Cyber Safety Assistant — a chat interface where users type cybersecurity questions and get educational answers. Use MOCK responses only (no real API key/backend) — implement a simple local function that matches keywords (phishing, password, scam, social media, malware, wifi, etc.) to pre-written educational answers, with a friendly fallback response for unmatched questions. Show a typing/loading indicator before the mock reply appears.

9. Quiz — 10 multiple-choice questions covering phishing, passwords, scams, and social media safety, one question per screen with a progress bar at top, Next button disabled until an option is selected, instant highlight of correct/incorrect after selecting.

10. Results — shows final score out of 10 as a circular progress indicator, a message based on performance (e.g. "Cyber Safety Expert", "Good Awareness", "Needs Improvement"), a breakdown of correct/incorrect answers, buttons to Retake Quiz or go Home.

11. Awareness Videos — grid of video placeholder cards (thumbnail placeholder image, title, duration text) for topics like "What is Phishing?", "Creating Strong Passwords", "Spotting Online Scams", "Social Media Privacy Tips" — clicking opens a modal with a placeholder video player area (no real video files needed).

GLOBAL REQUIREMENTS:

- Clean, modern, trustworthy design: use a blue/teal/dark navy color scheme with white space, rounded cards, subtle shadows, shield/lock icons for the security theme.

- Bottom navigation bar (mobile-style) with icons for Home, Topics, Quiz, AI Assistant, Videos.

- Loading states (skeleton or spinner) wherever content or the AI response is "loading".

- Basic error handling (e.g. empty input in AI assistant, no answer selected in quiz shows a gentle warning).

- Persist quiz score and progress in local state (no backend/database needed).

- Fully responsive on mobile and desktop.

Build this as a complete, working single-page application with all screens functional and navigable.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/358a4ea1-82c7-4a2c-91b3-2f3bbc4fd6f6).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
