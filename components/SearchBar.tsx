"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const EXAMPLES = [
  "Why is the sky blue? 🌤️",
  "How do volcanoes work? 🌋",
  "What do dolphins eat? 🐬",
  "How are rainbows made? 🌈"
];

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const router = useRouter();
  
  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex((prev) => (prev + 1) % EXAMPLES.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!query.trim()) return;
    router.push(`/search?q=${encodeURIComponent(query.trim())}`);
  };

  const startVoiceSearch = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert("Oops! Voice search isn't supported in your browser yet. 😢");
      return;
    }
    
    setIsRecording(true);
    // @ts-ignore
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    
    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setQuery(transcript);
      setIsRecording(false);
      // Optional: auto-submit after voice
    };
    
    recognition.onerror = () => {
      setIsRecording(false);
    };
    
    recognition.onend = () => {
      setIsRecording(false);
    };
    
    recognition.start();
  };

  return (
    <form onSubmit={handleSearch} className="w-full max-w-3xl mx-auto relative flex flex-col items-center z-10">
      <div className="relative w-full flex items-center shadow-xl rounded-[32px] bg-white border-4 border-purple-400 focus-within:border-teal-400 transition-colors duration-300">
        <div className="absolute inset-y-0 left-6 right-48 flex items-center pointer-events-none overflow-hidden">
          {!query && (
            <AnimatePresence mode="wait">
              <motion.span
                key={placeholderIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 0.5, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="text-xl text-gray-400 absolute whitespace-nowrap truncate w-full"
              >
                {EXAMPLES[placeholderIndex]}
              </motion.span>
            </AnimatePresence>
          )}
        </div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value.slice(0, 200))}
          className="w-full bg-transparent outline-none py-5 px-6 text-xl rounded-[32px] z-10 font-bold text-gray-800"
          style={{ paddingLeft: query ? '24px' : '24px' }}
        />
        <div className="absolute right-4 flex items-center gap-2 z-20">
          <motion.button
            type="button"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={startVoiceSearch}
            className={`p-3 rounded-full text-2xl transition-colors ${
              isRecording ? 'bg-red-100 animate-pulse' : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            🎙️
          </motion.button>
          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 bg-gradient-to-r from-purple-500 to-teal-400 text-white font-bold rounded-full shadow-md text-xl flex items-center gap-2"
          >
            Search 🔍
          </motion.button>
        </div>
      </div>
      <div className="flex justify-between w-full px-4 mt-2 text-sm text-gray-500 font-bold">
        <span>{query.length}/200 characters</span>
      </div>
    </form>
  );
}
