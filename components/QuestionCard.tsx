"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

interface QuestionCardProps {
  emoji: string;
  question: string;
  color: string;
}

export default function QuestionCard({ emoji, question, color }: QuestionCardProps) {
  const router = useRouter();

  return (
    <motion.div
      whileHover={{ scale: 1.05, y: -5 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => router.push(`/search?q=${encodeURIComponent(question)}`)}
      className="cursor-pointer rounded-3xl p-6 shadow-md border-2 border-white/50 flex flex-col items-center text-center gap-4 transition-shadow hover:shadow-xl"
      style={{ backgroundColor: color }}
    >
      <div className="text-5xl">{emoji}</div>
      <h3 className="text-xl font-bold text-gray-800">{question}</h3>
    </motion.div>
  );
}
