import type { NextApiRequest, NextApiResponse } from "next";
import { GoogleGenAI, Type } from "@google/genai";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const apiKey = process.env.GOOGLE_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: "API key missing" });
  }

  try {
    const ai = new GoogleGenAI({ apiKey });

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash", // Ou "gemini-1.5-flash" si pas accès au 2.5
      contents:
        "Donne-moi 3 recettes populaires de cookies au chocolat, avec les quantités des ingrédients.",
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              recipeName: { type: Type.STRING },
              ingredients: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
              },
            },
            propertyOrdering: ["recipeName", "ingredients"],
          },
        },
      },
    });

    // `response.text` contient le JSON sous forme de string
    if (!response.text) {
        return res.status(500).json({ error: "Response text is empty" });
    }
    const json = JSON.parse(response.text);
    res.status(200).json(json);
  } catch (error) {
    console.error("API Gemini error:", error);
    res.status(500).json({ error: "Internal server error", details: error });
  }
}
