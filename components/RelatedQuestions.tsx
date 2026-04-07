"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function RelatedQuestions({ questions }: { questions: string[] }) {
  const router = useRouter();

  return (
    <div className="mt-10">
      <h3 className="text-2xl font-bold text-teal-800 mb-4 flex items-center gap-2">
        Want to learn more? 🌟
      </h3>
      <div className="flex flex-wrap gap-3">
        {questions.map((q, idx) => (
          <motion.button
            key={idx}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => router.push(`/search?q=${encodeURIComponent(q)}`)}
            className="bg-white border-2 border-teal-300 text-teal-800 font-bold py-3 px-6 rounded-full shadow-sm hover:shadow-md hover:bg-teal-50 transition-all text-left"
          >
            {q}
          </motion.button>
        ))}
      </div>
    </div>
  );
}
