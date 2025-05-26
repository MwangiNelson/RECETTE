import React, { useState } from "react";
import Step1GeneralPrompt from "./RecipeSteps/Step1GeneralPrompt";
import Step2Ingredients from "./RecipeSteps/Step2Ingredients";
import Step3Preferences from "./RecipeSteps/Step3Preferences";
import Step4Results from "./RecipeSteps/Step4Results";
import Burger from "../../assets/burger.png";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY });

function parseGeminiRecipeResponse(response) {
  try {
    let text = response.candidates?.[0]?.content?.parts?.[0]?.text || "";

    console.log("Text parsed as", text);

    text = text.trim();
    if (text.startsWith("```json")) {
      text = text
        .replace(/^```json/, "")
        .replace(/```$/, "")
        .trim();
    } else if (text.startsWith("```")) {
      text = text.replace(/^```/, "").replace(/```$/, "").trim();
    }
    return JSON.parse(text);
  } catch (e) {
    return {
      title: "Error",
      description: "Failed to parse recipe: " + e.message,
    };
  }
}

const RecipeGenerator = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [recipe, setRecipe] = useState(null);

  const nextStep = async () => {
    if (step === 3) {
      // About to go to step 4, trigger Gemini
      setLoading(true);
      setRecipe(null);
      try {
        const prompt = `Generate a recipe in JSON format with the following structure: { title, description, totalTime, servings, difficulty, calories, tags, ingredients, nutrition, instructions }. Use these preferences: ${JSON.stringify(
          formData
        )}.
        STRICTLY FOLLOW THE JSON FORMAT. 
        STRICTLY use the ingredients that are provided in the ingredients array. If you want to suggest extra ingredients, at the end of the instructions, suggest them as a part of instructions as NOTE : extras 
        on the instructions array.
        - STRICTLY FOLLOW THE JSON FORMAT.
        `;
        const response = await ai.models.generateContent({
          model: "gemini-2.0-flash",
          contents: prompt,
        });
        const recipeObj = parseGeminiRecipeResponse(response);
        console.log("Recipe parsed as", recipeObj);
        setRecipe(recipeObj);
      } catch (error) {
        setRecipe({ title: "Error", description: error.message });
      } finally {
        setLoading(false);
      }
    }
    setStep((prev) => Math.min(prev + 1, 4));
  };

  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));
  const updateFormData = (data) =>
    setFormData((prev) => ({ ...prev, ...data }));

  return (
    <div className="w-full h-fit min-h-[calc(100vh-100px)] flex flex-col items-center justify-center px-3 md:px-0 py-10 relative ">
      {step === 1 && (
        <Step1GeneralPrompt
          nextStep={nextStep}
          updateFormData={updateFormData}
          formData={formData}
        />
      )}
      {step === 2 && (
        <Step2Ingredients
          nextStep={nextStep}
          prevStep={prevStep}
          updateFormData={updateFormData}
          formData={formData}
        />
      )}
      {step === 3 && (
        <Step3Preferences
          nextStep={nextStep}
          prevStep={prevStep}
          updateFormData={updateFormData}
          formData={formData}
        />
      )}
      {step === 4 && (
        <Step4Results
          prevStep={prevStep}
          formData={formData}
          recipe={recipe}
          loading={loading}
        />
      )}

      <img
        src={Burger}
        alt=""
        className="absolute hidden md:block animate-floating -left-14 p-10 h-3/4 object-contain z-0 "
      />
    </div>
  );
};

export default RecipeGenerator;
