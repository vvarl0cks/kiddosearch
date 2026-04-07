"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function AboutDialog() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        className="w-12 h-12 bg-white rounded-full shadow-md flex items-center justify-center text-2xl border-2 border-blue-200"
      >
        ℹ️
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-white rounded-3xl shadow-2xl overflow-hidden w-full max-w-md border-4 border-blue-100 flex flex-col"
            >
              <div className="bg-gradient-to-r from-purple-500 to-teal-400 p-6 flex justify-between items-center text-white">
                <h2 className="text-2xl font-bold flex items-center gap-2">
                  <span>🚀</span> KiddoSearch v1.0
                </h2>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="text-white hover:text-red-200 text-3xl transition-colors font-bold"
                >
                  &times;
                </button>
              </div>
              
              <div className="p-6 text-gray-700 flex-1 overflow-y-auto">
                <p className="mb-4 text-lg font-bold text-purple-800">
                  A fun, safe, and friendly AI search assistant designed for kids!
                </p>
                <ul className="space-y-3 mb-6">
                  <li className="flex gap-3 items-center">
                    <span className="text-2xl">🧠</span>
                    <span>Powered by advanced AI perfectly tuned to explain things simply.</span>
                  </li>
                  <li className="flex gap-3 items-center">
                    <span className="text-2xl">🛡️</span>
                    <span>Safety-first approach with word filters to keep learning fun and clean.</span>
                  </li>
                  <li className="flex gap-3 items-center">
                    <span className="text-2xl">🎙️</span>
                    <span>Voice search enabled so you don't always have to type!</span>
                  </li>
                  <li className="flex gap-3 items-center">
                    <span className="text-2xl">🔥</span>
                    <span>Keep a daily streak to discover new things every day!</span>
                  </li>
                </ul>
              </div>

              <div className="bg-gray-50 border-t-2 border-gray-100 p-4 flex flex-col items-center justify-center gap-2">
                <p className="text-gray-600 font-bold text-sm">made with 💖 by Warl0cks</p>
                <a 
                  href="https://github.com/vvarl0cks" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-black transition-colors"
                >
                  <svg height="24" viewBox="0 0 16 16" width="24" fill="currentColor">
                    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path>
                  </svg>
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
