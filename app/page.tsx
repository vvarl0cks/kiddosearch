"use client";

import SearchBar from "@/components/SearchBar";
import QuestionCard from "@/components/QuestionCard";
import SearchHistory from "@/components/SearchHistory";
import AboutDialog from "@/components/AboutDialog";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const FEATURED_QUESTIONS = [
  { emoji: "💤", question: "Why do we dream?", color: "#E0E7FF" },
  { emoji: "🌌", question: "How big is the universe?", color: "#FAE8FF" },
  { emoji: "🍂", question: "Why do leaves change color?", color: "#FFEDD5" },
  { emoji: "✈️", question: "How do planes fly?", color: "#E0F2FE" },
  { emoji: "⚡", question: "What is electricity?", color: "#FEF3C7" },
  { emoji: "🐟", question: "How do fish breathe?", color: "#CCFBF1" },
];

export default function Home() {
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    // Basic streak calculator just counting history items for today
    const saved = localStorage.getItem("kiddo_history");
    if (saved) {
      try {
        const history = JSON.parse(saved);
        const today = new Date().toDateString();
        const todaysQuestions = history.filter((item: any) => new Date(item.timestamp).toDateString() === today);
        setStreak(todaysQuestions.length);
      } catch (e) { }
    }
  }, []);

  return (
    <main className="min-h-screen py-8 px-4 flex flex-col items-center">
      <header className="w-full max-w-6xl mx-auto flex justify-between items-center mb-16">
        <div className="flex items-center gap-3">
          <span className="text-4xl">🚀</span>
          <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-teal-500 tracking-tight">
            KiddoSearch
          </h1>
        </div>
        
        <div className="flex items-center gap-4">
          {streak > 0 && (
            <div className="hidden sm:flex items-center gap-2 bg-gradient-to-r from-orange-400 to-red-400 text-white px-4 py-2 rounded-full font-bold shadow-md">
              <span>🔥</span> {streak} today!
            </div>
          )}
          <SearchHistory />
          <AboutDialog />
        </div>
      </header>

        <div className="w-full max-w-4xl mx-auto flex flex-col items-center flex-1">
        <motion.div 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, type: "spring" }}
          className="text-center relative mb-12"
        >
          <h2 className="text-5xl font-extrabold text-purple-900 mb-4 tracking-tight" style={{ textShadow: "2px 2px 0px rgba(255,255,255,0.8)" }}>
            Ask me anything!
          </h2>
          <p className="text-2xl text-teal-700 font-bold bg-white/50 inline-block px-6 py-2 rounded-full border-2 border-white">
            I'll explain it in a fun way 🌟
          </p>
        </motion.div>

        <SearchBar />

        <div className="mt-8 flex flex-wrap justify-center gap-3 w-full max-w-3xl">
          <span className="text-gray-500 font-bold py-2 px-2 mr-2">Try asking about:</span>
          {["Animals 🐾", "Space 🚀", "Science 🔬", "History 📜", "Food 🍕", "Sports ⚽"].map((topic, i) => (
            <motion.button
              key={i}
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                const searchInput = document.querySelector('input[type="text"]') as HTMLInputElement;
                if (searchInput) {
                  const val = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value')!.set;
                  val?.call(searchInput, `Tell me about ${topic.split(' ')[0]}`);
                  searchInput.dispatchEvent(new Event('change', { bubbles: true }));
                }
              }}
              className="bg-white border-2 border-purple-200 text-purple-700 font-bold py-2 px-4 rounded-full shadow-sm hover:border-purple-400 hover:bg-purple-50 transition-colors"
            >
              {topic}
            </motion.button>
          ))}
        </div>

        <div className="mt-20 w-full max-w-5xl">
          <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center w-full">Featured Questions ✨</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {FEATURED_QUESTIONS.map((q, idx) => (
              <QuestionCard key={idx} emoji={q.emoji} question={q.question} color={q.color} />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
