import { NutOff, ArrowRightCircle } from "lucide-react";
import React, { useState } from "react";

const dietaryOptions = [
  "Vegetarian",
  "Vegan",
  "Gluten-free",
  "Dairy-free",
  "Keto",
  "Paleo",
  "Low-carb",
  "High-protein",
  "Nut-free",
  "Halal",
  "Kosher",
];
const cookingTimes = ["< 15 min", "15-30 min", "30-60 min", "1+ hour"];
const difficulties = ["Beginner", "Intermediate", "Expert"];
const cuisineTypes = [
  "Italian",
  "Mexican",
  "Indian",
  "Chinese",
  "Mediterranean",
  "American",
  "Other",
];

const Step3Preferences = ({ nextStep, prevStep, updateFormData, formData }) => {
  const [dietary, setDietary] = useState(formData.dietary || []);
  const [cookingTime, setCookingTime] = useState(formData.cookingTime || "");
  const [difficulty, setDifficulty] = useState(formData.difficulty || "");
  const [servings, setServings] = useState(formData.servings || 4);
  const [cuisine, setCuisine] = useState(formData.cuisine || "");

  const toggleDietary = (option) => {
    setDietary((prev) =>
      prev.includes(option)
        ? prev.filter((d) => d !== option)
        : [...prev, option]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateFormData({ dietary, cookingTime, difficulty, servings, cuisine });
    nextStep();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full z-10 max-w-5xl w-3/4 bg-white rounded-lg shadow-md p-8 py-5 flex flex-col gap-2"
    >
      <div className="flex flex-row items-center gap-2">
        <NutOff className="text-orange-500" />
        <h2 className="text-2xl font-bold">
          Dietary Restrictions & Preferences
        </h2>
      </div>
      <div>
        <label className="block font-semibold mb-2">Dietary Restrictions</label>
        <div className="flex flex-wrap gap-2 mb-4">
          {dietaryOptions.map((option) => (
            <button
              type="button"
              key={option}
              className={`px-3 py-1 rounded-full border ${
                dietary.includes(option)
                  ? "bg-orange-200 border-orange-500"
                  : "bg-gray-100 border-gray-300"
              }`}
              onClick={() => toggleDietary(option)}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
      <div className="flex gap-4 mb-4">
        <div className="flex-1">
          <label className="block font-semibold mb-2">Cooking Time</label>
          <select
            className="w-full border rounded-md p-2"
            value={cookingTime}
            onChange={(e) => setCookingTime(e.target.value)}
          >
            <option value="">Select cooking time</option>
            {cookingTimes.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>
        <div className="flex-1">
          <label className="block font-semibold mb-2">Difficulty Level</label>
          <select
            className="w-full border rounded-md p-2"
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
          >
            <option value="">Select difficulty</option>
            {difficulties.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="mb-4">
        <label className="block font-semibold mb-2">Number of Servings</label>
        <input
          type="range"
          min={1}
          max={12}
          value={servings}
          onChange={(e) => setServings(Number(e.target.value))}
          className="w-full"
        />
        <div className="text-center mt-1">
          {servings} {servings === 1 ? "person" : "servings"}
        </div>
      </div>
      <div className="mb-4">
        <label className="block font-semibold mb-2">Cuisine Type</label>
        <select
          className="w-full border rounded-md p-2"
          value={cuisine}
          onChange={(e) => setCuisine(e.target.value)}
        >
          <option value="">Select cuisine type</option>
          {cuisineTypes.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>
      <div className="flex justify-between">
        <button
          type="button"
          onClick={prevStep}
          className="px-4 py-2 rounded-md bg-gray-200 text-gray-700"
        >
          Previous
        </button>
        <button
          type="submit"
          className="px-4 py-2 rounded-md bg-[#ff5400] text-white flex flex-row items-center gap-2 shadow-primary-button-shadow"
        >
          Generate Recipe
          <ArrowRightCircle className="w-4 h-4" />
        </button>
      </div>
    </form>
  );
};

export default Step3Preferences;
