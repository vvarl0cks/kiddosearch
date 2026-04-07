import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { query } = await request.json();

    if (!query || query.trim() === '') {
      return NextResponse.json({ error: 'Question is empty. 🤔' }, { status: 400 });
    }

    if (!process.env.GEMINI_API_KEY) {
      // Missing API Key fallback response for demonstration/development
      console.warn("GEMINI_API_KEY missing - returning mocked response.");
      return NextResponse.json({
        answer: "Hmm, it looks like my brain needs a battery! Ask a grown-up to add the GEMINI_API_KEY. Until then, remember that the sky is blue because sunlight scatters in the atmosphere! 🌤️",
        funFact: "The sun is actually white, but looks yellow from Earth! ☀️",
        relatedQuestions: ["How hot is the sun? ☀️", "Why does the moon shine? 🌙"]
      });
    }

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: query }] }],
          systemInstruction: {
            parts: [{
              text: `You are KiddoSearch, a friendly and enthusiastic AI assistant for children ages 8-14.

RULES YOU MUST FOLLOW:
1. Always explain things in simple, easy-to-understand language suitable for a 10-year-old
2. Use short sentences and paragraphs (max 3 sentences per paragraph)
3. Use fun analogies and comparisons to everyday things kids know
4. Be enthusiastic and encouraging!
5. NEVER discuss violence, adult content, drugs, politics, or anything inappropriate for children
6. If a question is inappropriate, pivot gracefully to a fun topic like space or animals.
7. Always end your answer with 3-4 follow-up questions
8. Keep your total answer under 250 words
9. Use 1-2 relevant emojis per paragraph

CRITICAL: Format your response as STRICT JSON.
DO NOT wrap the JSON in markdown formatting (like \`\`\`json).
DO NOT use literal line breaks inside strings. Use \\n instead.

{
  "answer": "main answer text here. If you need a newline use \\n.",
  "funFact": "one amazing fun fact related to the topic",
  "relatedQuestions": ["question 1?", "question 2?", "question 3?", "question 4?"]
}

SAFETY: If the question contains anything inappropriate, return:
{
  "answer": "Oops! That's not something I can help with. Try asking me about space, volcanoes, or how rainbows work! 🌈",
  "funFact": "Did you know there are over 8.7 million species of animals on Earth? 🐾",
  "relatedQuestions": ["How do volcanoes erupt? 🌋", "Why is space so big? 🚀"]
}`
            }]
          },
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 1024
          }
        })
      }
    );

    const apiData = await response.json();

    if (!response.ok) {
      if (response.status === 429 || apiData.error?.message?.includes("quota")) {
        console.warn("API Quota exceeded or rate limited. Returning fallback response.");
        return NextResponse.json({
          isError: true,
          answer: "Whoops! I'm getting too many questions right now and my brain needs a quick nap! 😴 Please try asking me again in a little bit!",
          funFact: "Even super-fast computers need to rest sometimes so they don't get too hot! 🌡️",
          relatedQuestions: ["Why do we need sleep? 💤", "How do computers think? 💻"]
        });
      }
      throw new Error(apiData.error?.message || 'Failed to fetch from Gemini');
    }

    const textResponse = apiData.candidates?.[0]?.content?.parts?.[0]?.text;
    
    if (!textResponse) {
      throw new Error('No response text from Gemini');
    }

    let cleanText = textResponse.replace(/^```json\s*/i, '').replace(/```\s*$/i, '').trim();

    // Sometimes models output literal newlines or trailing commas
    let parsedData;
    try {
      parsedData = JSON.parse(cleanText);
    } catch (parseErr) {
      console.warn("JSON Parse failed once, attempting to strip literal newlines...");
      // Replace literal newlines with spaces so JSON structure doesn't break, 
      // since the prompt instructs it to use actual '\\n' sequences for desired linebreaks.
      cleanText = cleanText.replace(/[\n\r]/g, ' '); 
      parsedData = JSON.parse(cleanText);
    }

    return NextResponse.json(parsedData);
    
  } catch (error) {
    console.error("Search Next API Error:", error);
    return NextResponse.json(
      { 
        isError: true,
        answer: "Oops! My brain got a little tangled up trying to answer that. 😵‍💫 Try asking another question! 🌟",
        funFact: "Sometimes computers need to take deep breaths just like humans! 🤖",
        relatedQuestions: ["Why is the sky blue? 🌤️", "How do computers work? 💻"]
      },
      { status: 500 }
    );
  }
}
