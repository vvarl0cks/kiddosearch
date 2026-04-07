import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { jsonString, targetLang } = await request.json();

    if (!jsonString) {
      return NextResponse.json({ error: 'No data provided' }, { status: 400 });
    }

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json({ 
        translatedData: {
          answer: "Terjemahan memerlukan API Key aktif. 🤖",
          funFact: "API Key belum disetel! 🔑",
          relatedQuestions: ["Apakah kamu mau mencoba lagi nanti?"]
        } 
      });
    }

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: `Translate all the values in this JSON to ${targetLang}. Keep the EXACT SAME keys and array structures. Only translate the text content and preserve the exact tone and emojis.\n\nJSON:\n${jsonString}` }] }],
          generationConfig: {
            temperature: 0.3,
            maxOutputTokens: 1024
          }
        })
      }
    );

    const apiData = await response.json();

    if (!response.ok) {
      throw new Error(apiData.error?.message || 'Failed to translate');
    }

    const textResponse = apiData.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!textResponse) {
      throw new Error('No response text from Gemini in translation');
    }

    let cleanText = textResponse.replace(/^```json\s*/i, '').replace(/```\s*$/i, '').trim();
    let parsedData;
    try {
      parsedData = JSON.parse(cleanText);
    } catch (e) {
      cleanText = cleanText.replace(/[\n\r]/g, ' '); 
      parsedData = JSON.parse(cleanText);
    }

    return NextResponse.json({ translatedData: parsedData });
    
  } catch (error) {
    console.error("Translation API Error:", error);
    return NextResponse.json(
      { 
        translatedData: {
          isError: true,
          answer: "Oops! Gagal menerjemahkan saat ini. 😢",
          funFact: "",
          relatedQuestions: []
        }
      },
      { status: 500 }
    );
  }
}
