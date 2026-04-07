"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import AnswerCard from "@/components/AnswerCard";
import LoadingAnimation from "@/components/LoadingAnimation";
import { motion } from "framer-motion";
import SearchHistory from "@/components/SearchHistory";
import AboutDialog from "@/components/AboutDialog";
import { isSafeQuery } from "@/lib/safety";

function SearchContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const query = searchParams.get("q");

  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!query) {
      router.push("/");
      return;
    }

    const fetchData = async () => {
      setLoading(true);
      try {
        // ... inside the try block of fetchData
        if (!isSafeQuery(query)) {
          throw new Error("Oops! That's a silly word. Let's ask about space or animals instead! 🌟🐾");
        }

        const res = await fetch("/api/search", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ query }),
        });
        
        const json = await res.json();
        
        if (json.error) {
          throw new Error(json.error);
        }
        
        setData(json);

        // Save to history
        const saved = localStorage.getItem("kiddo_history");
        const history = saved ? JSON.parse(saved) : [];
        const newHistory = [{ query, timestamp: Date.now() }, ...history.filter((h: any) => h.query !== query)].slice(0, 20);
        localStorage.setItem("kiddo_history", JSON.stringify(newHistory));

      } catch (err: any) {
        setError(err.message || "Something went wrong! 😵‍💫");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [query, router]);

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col items-center">
      <div className="w-full text-center mb-10">
        <h2 className="text-4xl md:text-5xl font-extrabold text-purple-900 tracking-tight flex items-center justify-center gap-4">
          <span className="text-5xl">🤔</span> {query}
        </h2>
      </div>

      {loading && <LoadingAnimation />}
      
      {error && !loading && (
        <div className="text-center p-8 bg-white rounded-3xl border-4 border-red-300 shadow-lg">
          <div className="text-6xl mb-4">😵</div>
          <p className="text-xl font-bold text-red-600">{error}</p>
        </div>
      )}

      {data && !loading && !error && (
        <AnswerCard data={data} />
      )}
    </div>
  );
}

export default function SearchPage() {
  const router = useRouter();

  return (
    <main className="min-h-screen py-8 px-4 flex flex-col">
      <header className="w-full max-w-6xl mx-auto flex justify-between items-center mb-12">
        <motion.button
          whileHover={{ scale: 1.05, x: -5 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => router.push("/")}
          className="text-lg font-bold text-teal-800 bg-white border-2 border-teal-200 py-2 px-6 rounded-full shadow-sm hover:bg-teal-50 flex items-center gap-2"
        >
          ← Ask another question
        </motion.button>
        <div className="flex items-center gap-4">
          <SearchHistory />
          <AboutDialog />
        </div>
      </header>

      <Suspense fallback={<LoadingAnimation />}>
        <SearchContent />
      </Suspense>
    </main>
  );
}
