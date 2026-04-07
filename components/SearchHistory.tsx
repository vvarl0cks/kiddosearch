"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

interface HistoryItem {
  query: string;
  timestamp: number;
}

export default function SearchHistory() {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const saved = localStorage.getItem("kiddo_history");
    if (saved) {
      try {
        setHistory(JSON.parse(saved));
      } catch (e) { }
    }
  }, [isOpen]);

  const clearHistory = () => {
    if (window.confirm("Are you sure you want to clear your history? 🗑️")) {
      localStorage.removeItem("kiddo_history");
      setHistory([]);
    }
  };

  const timeAgo = (ts: number) => {
    const diff = Math.floor((Date.now() - ts) / 1000 / 60); // minutes
    if (diff < 1) return "Just now";
    if (diff < 60) return `${diff}m ago`;
    if (diff < 1440) return `${Math.floor(diff / 60)}h ago`;
    return `${Math.floor(diff / 1440)}d ago`;
  };

  return (
    <div className="relative z-50">
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-12 h-12 bg-white rounded-full shadow-md flex items-center justify-center text-2xl border-2 border-purple-200"
      >
        🕒
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute right-0 top-16 w-80 bg-white rounded-3xl shadow-2xl border-4 border-purple-100 overflow-hidden"
          >
            <div className="p-4 bg-purple-50 border-b border-purple-100 flex justify-between items-center">
              <h3 className="font-bold text-purple-800 text-lg">Your Past Questions</h3>
              {history.length > 0 && (
                <button onClick={clearHistory} className="text-sm text-red-500 font-bold hover:underline">
                  Clear All
                </button>
              )}
            </div>
            
            <div className="max-h-80 overflow-y-auto">
              {history.length === 0 ? (
                <div className="p-8 text-center text-gray-500">
                  <span className="text-4xl mb-2 block">👻</span>
                  Nothing here yet!
                </div>
              ) : (
                history.map((item, i) => (
                  <div
                    key={i}
                    onClick={() => {
                      setIsOpen(false);
                      router.push(`/search?q=${encodeURIComponent(item.query)}`);
                    }}
                    className="p-4 border-b border-gray-50 hover:bg-teal-50 cursor-pointer flex items-center gap-3 transition-colors"
                  >
                    <span className="text-2xl">🔍</span>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-gray-800 truncate">{item.query}</p>
                      <p className="text-xs text-gray-400 font-bold">{timeAgo(item.timestamp)}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
