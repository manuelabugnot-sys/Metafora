import { GoogleGenAI } from "@google/genai";
import { PRODUCTS } from '../constants';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const SYSTEM_INSTRUCTION = `
Eres el "Conserje de Aromas" de Metáfora, una marca de lujo que vende velas orgánicas y jabones.
Tu objetivo es recomendar productos del catálogo proporcionado basándote en el estado de ánimo, ocasión o preferencia del usuario.
RESPONDE SIEMPRE EN ESPAÑOL.

CATÁLOGO:
${JSON.stringify(PRODUCTS.map(p => ({ id: p.id, name: p.name, desc: p.description, scent: p.scentProfile, type: p.category })))}

REGLAS:
1. Sé elegante, conciso y servicial. Usa un tono relajante.
2. Al recomendar, menciona explícitamente el nombre del producto.
3. Si el usuario pregunta sobre algo no relacionado con aromas, velas, jabones o relajación, guíalo suavemente de vuelta a las ofertas de Metáfora.
4. Mantén las respuestas por debajo de 100 palabras.
`;

export const getScentRecommendation = async (userQuery: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: userQuery,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      }
    });
    return response.text || "Mis disculpas, tengo problemas para sentir la atmósfera en este momento. Por favor intenta de nuevo.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Actualmente estoy meditando y no puedo responder. Por favor verifica tu conexión e intenta nuevamente.";
  }
};