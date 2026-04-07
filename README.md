# 🚀 KiddoSearch V1.0

A fun, safe, and wildly engaging AI-powered search engine built just for kids! 

KiddoSearch answers children's questions using Google's cutting-edge **Gemini 3** AI, explaining complex topics using playful analogies, simple sentences, and enthusiastic emojis.

---

## ✨ Features

- **🧠 Kid-Friendly AI Explanations**: Specially engineered system prompts ensuring language is suited for ages 8-14.
- **🛡️ Comprehensive Safety Filters**: Pre-search blocklist (`lib/safety.ts`) and AI guardrails prevent inappropriate content, gracefully pivoting to fun topics like space or science.
- **🎙️ Voice Search**: Uses the browser Web Speech API so kids can easily speak their questions.
- **🇮🇩 Bilingual Support**: One-click **EN | ID** translation toggle that translates the answer, fun fact, and related questions without losing formatting or emojis.
- **🔥 Daily Streaks**: Keeps track of daily learning activity stored safely in `localStorage`.
- **🎉 Interactive & Dynamic UI**: Bouncing characters, typewriter text effects, glassmorphic UI, and confetti celebrations built with `framer-motion` and `canvas-confetti`.

---

## 📈 Recent Updates

- **Robust JSON Support:** Updated the API (`/api/search/route.ts`) to enforce strictly formatted JSON from Gemini using `responseMimeType: "application/json"`. This prevents random `SyntaxError: Unterminated string` errors when generating dynamic text or complex emojis in Production/Vercel.

---

## 🛠️ Technology Stack

- **Framework**: [Next.js 15 (App Router)](https://nextjs.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **AI Backend**: [Google Gemini Pro AI](https://aistudio.google.com/app/apikey) via the `@google/genai` standards.
- **Deployment**: Vercel ready!

---

## 🚀 Getting Started

### 1. Clone the repository
\`\`\`bash
git clone https://github.com/vvarl0cks/kiddosearch.git
cd kiddosearch
\`\`\`

### 2. Install dependencies
\`\`\`bash
npm install
\`\`\`

### 3. Setup Environment Variables
Create a \`.env.local\` file in the root directory and add your Google Gemini API key:
\`\`\`env
GEMINI_API_KEY=your_gemini_api_key_here
\`\`\`
*(You can get a free API key from [Google AI Studio](https://aistudio.google.com/app/apikey))*

### 4. Run the development server
\`\`\`bash
npm run dev
\`\`\`
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📁 Project Structure

- \`app/\`: Next.js core App Router (Home Page, Search Page, API Routes)
- \`components/\`: All reusable functional UI components (\`AnswerCard\`, \`AboutDialog\`, \`SearchBar\`, etc.)
- \`lib/\`: Helper utilities such as the `safety.ts` query moderation.
- \`public/\`: Static assets (SVG icons, Error graphics).

---

## 💖 Credits

Designed and engineered with passion.
**Made with 💖 by [Warl0cks](https://github.com/vvarl0cks)**
