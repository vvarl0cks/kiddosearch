"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import FunFactBox from "./FunFactBox";
import RelatedQuestions from "./RelatedQuestions";

interface AnswerData {
  answer: string;
  funFact: string;
  relatedQuestions: string[];
  isError?: boolean;
}

export default function AnswerCard({ data }: { data: AnswerData }) {
  const [language, setLanguage] = useState<"EN" | "ID">("EN");
  const [translatedData, setTranslatedData] = useState<AnswerData | null>(null);
  const [isTranslating, setIsTranslating] = useState(false);

  const currentData = language === "EN" ? data : (translatedData || data);

  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(true);

  const handleLanguageToggle = async (lang: "EN" | "ID") => {
    setLanguage(lang);
    if (lang === "ID" && !translatedData) {
      setIsTranslating(true);
      try {
        const res = await fetch("/api/translate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ jsonString: JSON.stringify(data), targetLang: "Bahasa Indonesia" })
        });
        const json = await res.json();
        if (json.translatedData) setTranslatedData(json.translatedData);
      } catch (err) {
        console.error(err);
      } finally {
        setIsTranslating(false);
      }
    }
  };

  useEffect(() => {
    let index = 0;
    setDisplayedText("");
    if (isTranslating) return; // wait until translation is done entirely

    setIsTyping(true);
    const words = currentData.answer.split(" ");
    
    // Typewriter effect per word to be safe with React
    const interval = setInterval(() => {
      if (index < words.length) {
        setDisplayedText(words.slice(0, index + 1).join(" "));
        index++;
      } else {
        setIsTyping(false);
        clearInterval(interval);
      }
    }, 50);

    return () => clearInterval(interval);
  }, [currentData.answer, isTranslating]);

  const handleThumbsUp = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#7C3AED', '#FBBF24', '#0D9488', '#F87171']
    });
  };

  const formatText = (text: string) => {
    return text.split('\n').map((line, i) => {
      // Very basic formatting for lists if any exist in the answer string
      if (line.trim().startsWith('- ') || line.trim().startsWith('* ')) {
        return (
          <li key={i} className="flex gap-2 items-start mb-2">
            <span className="mt-1 flex-shrink-0">⭐</span>
            <span>{line.substring(2)}</span>
          </li>
        );
      }
      return <p key={i} className="mb-4 text-gray-800 text-lg leading-relaxed">{line}</p>;
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto w-full flex flex-col gap-6"
    >
      <div className="flex justify-end w-full">
        <div className="flex bg-white rounded-full p-1 shadow-md border-2 border-purple-200">
          <button 
            onClick={() => handleLanguageToggle("EN")}
            className={`px-4 py-1 rounded-full font-bold transition-colors ${language === "EN" ? "bg-purple-500 text-white" : "text-gray-500 hover:bg-purple-50"}`}
          >
            EN
          </button>
          <button 
            onClick={() => handleLanguageToggle("ID")}
            className={`px-4 py-1 rounded-full font-bold transition-colors ${language === "ID" ? "bg-purple-500 text-white" : "text-gray-500 hover:bg-purple-50"}`}
          >
            ID
          </button>
        </div>
      </div>

      <div className="bg-white rounded-[32px] p-8 shadow-xl border-l-[6px] border-purple-500 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-purple-500 via-teal-400 to-yellow-400"></div>
        
        <div className="text-xl leading-loose font-medium min-h-[150px]">
          {isTranslating ? (
            <div className="flex items-center gap-3 text-purple-600 font-bold">
              <span className="animate-spin text-3xl">🧩</span> Menerjemahkan...
            </div>
          ) : (
            <div className="flex flex-col sm:flex-row gap-6 items-start">
              {currentData.isError && (
                <div className="flex-shrink-0 w-full sm:w-auto flex justify-center mb-4 sm:mb-0">
                  <img src="/error.png" alt="Error Mascot" className="w-32 h-32 object-contain sm:-mt-2 opacity-90 drop-shadow-lg" />
                </div>
              )}
              <div className="flex-1">
                {formatText(displayedText)}
                {isTyping && <span className="inline-block w-2 h-6 bg-purple-500 ml-1 animate-pulse"></span>}
              </div>
            </div>
          )}
        </div>

        {!isTyping && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-end gap-4 mt-8 border-t border-gray-100 pt-4"
          >
            <span className="text-gray-400 font-bold mr-2 mt-2">How did I do?</span>
            <motion.button
              whileHover={{ scale: 1.2, rotate: -10 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleThumbsUp}
              className="text-3xl grayscale hover:grayscale-0 transition-all"
            >
              👍
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.2, rotate: 10 }}
              whileTap={{ scale: 0.9 }}
              className="text-3xl grayscale hover:grayscale-0 transition-all"
            >
              👎
            </motion.button>
          </motion.div>
        )}
      </div>

      {!isTyping && currentData.funFact && (
        <FunFactBox fact={currentData.funFact} />
      )}

      {!isTyping && currentData.relatedQuestions && currentData.relatedQuestions.length > 0 && (
        <RelatedQuestions questions={currentData.relatedQuestions} />
      )}
    </motion.div>
  );
}
