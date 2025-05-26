import { CookingPot, ArrowLeftCircle, ArrowRightCircle } from "lucide-react";
import React, { useState } from "react";

// Example enums from database
const commonIngredients = [
  "chicken",
  "fish",
  "onion",
  "garlic",
  "tomatoes",
  "rice",
  "pasta",
  "potatoes",
  "olive oil",
  "salt",
  "pepper",
];

const Step2Ingredients = ({ nextStep, prevStep, updateFormData, formData }) => {
  const [input, setInput] = useState("");
  const [ingredients, setIngredients] = useState(formData.ingredients || []);

  const addIngredient = (ingredient) => {
    if (!ingredients.includes(ingredient)) {
      setIngredients([...ingredients, ingredient]);
    }
    setInput("");
  };

  const removeIngredient = (ingredient) => {
    setIngredients(ingredients.filter((i) => i !== ingredient));
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleInputKeyDown = (e) => {
    if (e.key === "Enter" && input.trim()) {
      addIngredient(input.trim());
      e.preventDefault();
    }
  };

  const handleTagClick = (ingredient) => {
    addIngredient(ingredient);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateFormData({ ingredients });
    nextStep();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-5xl w-3/4 bg-white z-10 rounded-lg shadow-md p-8 flex flex-col gap-2"
    >
      <div className="flex flex-row items-center gap-2">
        <CookingPot className="text-orange-500" />
        <h2 className="text-2xl font-bold">
          What ingredients do you have?
        </h2>
      </div>
      <div className="flex flex-wrap gap-2 mb-4">
        {ingredients.map((ingredient) => (
          <span
            key={ingredient}
            className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full flex items-center gap-2"
          >
            {ingredient}
            <button
              type="button"
              onClick={() => removeIngredient(ingredient)}
              className="ml-1 text-xs"
            >
              ✕
            </button>
          </span>
        ))}
      </div>
      <input
        type="text"
        className="w-full border rounded-md p-2 mb-2"
        placeholder="Add more ingredients..."
        value={input}
        onChange={handleInputChange}
        onKeyDown={handleInputKeyDown}
      />
      <div className="mb-4">
        <label className="block font-semibold mb-2">Common ingredients</label>
        <div className="flex flex-wrap gap-2">
          {commonIngredients.map((ingredient) => (
            <button
              type="button"
              key={ingredient}
              className={`px-3 py-1 rounded-full border ${
                ingredients.includes(ingredient)
                  ? "bg-orange-200 border-orange-500"
                  : "bg-gray-100 border-gray-300"
              }`}
              onClick={() => handleTagClick(ingredient)}
            >
              {ingredient}
            </button>
          ))}
        </div>
      </div>
      <div className="flex justify-between">
        <button
          type="button"
          onClick={prevStep}
          className="px-4 py-2 flex items-center gap-2 rounded-md bg-gray-200 text-gray-900"
        >
          <ArrowLeftCircle className="w-4 h-4" />
          Previous
        </button>
        <button
          type="submit"
          className="px-4 py-2 flex items-center gap-2 rounded-md bg-primary-purple shadow-primary-button-shadow text-white"
        >
          Next
          <ArrowRightCircle className="w-4 h-4" />
        </button>
      </div>
    </form>
  );
};

export default Step2Ingredients;
