"use client";

import { motion } from "framer-motion";

export default function LoadingAnimation() {
  return (
    <div className="flex flex-col items-center justify-center p-12 gap-6">
      <motion.div
        animate={{
          y: [0, -20, 0],
          rotate: [0, -10, 10, 0]
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="text-6xl"
      >
        🧠
      </motion.div>
      <div className="flex gap-2 text-2xl font-bold text-purple-600">
        Hmm, let me think
        <motion.span
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, times: [0, 0.5, 1] }}
        >
          .
        </motion.span>
        <motion.span
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, delay: 0.3, times: [0, 0.5, 1] }}
        >
          .
        </motion.span>
        <motion.span
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, delay: 0.6, times: [0, 0.5, 1] }}
        >
          .
        </motion.span>
      </div>
    </div>
  );
}
