import type { NextApiRequest, NextApiResponse } from "next";
import { GoogleGenAI, Type } from "@google/genai";

interface QCMQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

interface QCMResponse {
  title: string;
  questions: QCMQuestion[];
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const apiKey = process.env.GOOGLE_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: "API key missing" });
  }

  const { courseNotes, numberOfQuestions = 5 } = req.body;

  if (!courseNotes) {
    return res.status(400).json({ error: "Course notes are required" });
  }

  if (typeof courseNotes !== 'string' || courseNotes.trim().length === 0) {
    return res.status(400).json({ error: "Course notes must be a non-empty string" });
  }

  try {
    const ai = new GoogleGenAI({ apiKey });

    const prompt = `
    Basé sur les notes de cours suivantes, génère un QCM de ${numberOfQuestions} questions à choix multiples.
    Chaque question doit avoir 4 options possibles avec une seule bonne réponse.
    Les questions doivent couvrir les concepts clés des notes de cours.
    
    Notes de cours :
    ${courseNotes}
    
    Instructions :
    - Crée des questions pertinentes qui testent la compréhension des concepts
    - Assure-toi que les options incorrectes sont plausibles mais clairement fausses
    - Fournis une explication claire pour chaque bonne réponse
    - Varie les types de questions (définitions, applications, analyses)
    `;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: {
              type: Type.STRING,
              description: "Titre du QCM basé sur le contenu des notes"
            },
            questions: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  question: {
                    type: Type.STRING,
                    description: "La question du QCM"
                  },
                  options: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING },
                    description: "4 options de réponse"
                  },
                  correctAnswer: {
                    type: Type.NUMBER,
                    description: "Index de la bonne réponse (0-3)"
                  },
                  explanation: {
                    type: Type.STRING,
                    description: "Explication de pourquoi cette réponse est correcte"
                  }
                },
                required: ["question", "options", "correctAnswer", "explanation"],
                propertyOrdering: ["question", "options", "correctAnswer", "explanation"]
              }
            }
          },
          required: ["title", "questions"],
          propertyOrdering: ["title", "questions"]
        }
      }
    });

    if (!response.text) {
      return res.status(500).json({ error: "Response text is empty" });
    }

    const qcmData: QCMResponse = JSON.parse(response.text);

    // Validation basique de la réponse
    if (!qcmData.questions || !Array.isArray(qcmData.questions)) {
      return res.status(500).json({ error: "Invalid response format" });
    }

    // Vérification que chaque question a bien 4 options
    for (const question of qcmData.questions) {
      if (!question.options || question.options.length !== 4) {
        return res.status(500).json({ error: "Each question must have exactly 4 options" });
      }
      if (question.correctAnswer < 0 || question.correctAnswer > 3) {
        return res.status(500).json({ error: "Correct answer index must be between 0 and 3" });
      }
    }

    res.status(200).json(qcmData);
  } catch (error) {
    console.error("API Gemini error:", error);
    res.status(500).json({ 
      error: "Internal server error", 
      details: process.env.NODE_ENV === 'development' ? error : undefined 
    });
  }
}