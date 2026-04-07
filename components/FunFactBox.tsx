"use client";

import { motion } from "framer-motion";

export default function FunFactBox({ fact }: { fact: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.5, type: "spring" }}
      className="bg-yellow-100 border-4 border-yellow-300 rounded-3xl p-6 mt-8 shadow-md relative"
    >
      <div className="absolute -top-6 -left-4 text-4xl bg-white rounded-full p-2 shadow-sm border-2 border-yellow-300">
        💡
      </div>
      <h3 className="text-xl font-bold text-yellow-800 mb-2 pl-6">Did You Know?</h3>
      <p className="text-lg text-gray-800 font-medium pl-6">{fact}</p>
    </motion.div>
  );
}
