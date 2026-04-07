export const BAD_WORDS = [
  // General profanity
  "fuck", "shit", "bitch", "cunt", "damn", "ass", "asshole", "dick", "pussy", "bastard", "slut", "whore", "crap",
  // Mean words / insults
  "stupid", "idiot", "dumb", "moron", "loser", "ugly", "fat", "retard", "shut up", "hate you", 
  // Violence and scary topics
  "kill", "murder", "suicide", "shooting", "gun", "bomb", "stab", "blood", "death", "die", "terrorist", "cut myself",
  // Adult / explicit content
  "porn", "sex", "naked", "nude", "boobs", "penis", "vagina", "masturbate", "stripper",
  // Substance abuse
  "drugs", "weed", "cocaine", "heroin", "meth", "alcohol", "beer", "wine", "vodka", "drunk", "vape", "cigar", "smoke"
];

export function isSafeQuery(query: string): boolean {
  const normalized = query.toLowerCase();
  hasBadWord: for (const word of BAD_WORDS) {
    if (normalized.includes(word)) {
      return false;
    }
  }
  return true;
}
