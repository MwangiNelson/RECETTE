import { createContext, useState } from "react";
import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";

const ModelContext = createContext();

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

const safetySettings = [
  {
    category: HarmCategory.HARM_CATEGORY_HARASSMENT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
];

const parseRecipe = (text) => {
  console.log("Text parsed as", text);
  // Try to parse JSON from the model, fallback to plain text if needed
  try {
    const recipe = JSON.parse(text);
    return recipe;
  } catch {
    // fallback: return as a single description
    return {
      title: "Generated Recipe",
      description: text,
      totalTime: "-",
      servings: "-",
      difficulty: "-",
      calories: "-",
      tags: [],
      ingredients: [],
      nutrition: {},
      instructions: [text],
    };
  }
};

const ModelProvider = ({ children }) => {
  const [model, setModel] = useState(null);
  const [response, setResponse] = useState(null); // State to store the recipe object
  const [loading, setLoading] = useState(false);

  const generateRecipe = async (formData) => {
    setLoading(true);
    setResponse(null);
    try {
      // Compose a prompt for Gemini
      const prompt = `Generate a recipe in JSON format with the following structure: { title, description, totalTime, servings, difficulty, calories, tags, ingredients, nutrition, instructions }. Use these preferences: ${JSON.stringify(
        formData
      )}.`;
      const chatSession = model.startChat({
        generationConfig,
        safetySettings,
        history: [
          {
            role: "user",
            parts: [
              { text: "Generate a recipe based on the following orders." },
            ],
          },
        ],
      });
      const result = await chatSession.sendMessage(prompt);
      const text = await result.response.text();
      console.log("Model response", text);
      const recipe = parseRecipe(text);
      setResponse(recipe);
    } catch (error) {
      setResponse({ title: "Error", description: error.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <ModelContext.Provider
      value={{
        model,
        setModel,
        response,
        setResponse,
        loading,
        setLoading,
        generateRecipe,
      }}
    >
      {children}
    </ModelContext.Provider>
  );
};

export { ModelContext, ModelProvider }; // Export the context and provider
