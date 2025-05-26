import { Tag } from "antd";
import { Coffee, Utensils, Moon, Cookie, ChefHat } from "lucide-react";
import React, { useState } from "react";

const quickPrompts = [
  "Something healthy and light",
  "Comfort food for a cozy night",
  "Quick 15-minute meal",
  "Vegetarian pasta dish",
  "Protein-rich post-workout meal",
  "Kid-friendly dinner",
  "Romantic dinner for two",
  "Meal prep for the week",
];

const mealTypes = [
  {
    label: "Breakfast",
    value: "breakfast",
    icon: <Coffee className="text-orange-500" />,
    description: "Start your day right.",
  },
  {
    label: "Lunch",
    value: "lunch",
    icon: <Utensils className="text-orange-500" />,
    description: "Midday fuel to keep you going.",
  },
  {
    label: "Dinner",
    value: "dinner",
    icon: <Moon className="text-orange-500" />,
    description: "Evening feast.",
  },
  {
    label: "Snack",
    value: "snack",
    icon: <Cookie className="text-orange-500" />,
    description: "Quick bite.",
  },
];

const Step1GeneralPrompt = ({ nextStep, updateFormData, formData }) => {
  const [mealType, setMealType] = useState(formData.mealType || "");
  const [prompt, setPrompt] = useState(formData.prompt || "");

  const handleSubmit = (e) => {
    e.preventDefault();
    updateFormData({ mealType, prompt });
    nextStep();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-5xl w-3/4 z-10 bg-white rounded-lg shadow-md p-8 flex flex-col gap-2"
    >
      <div className="flex flex-row items-center gap-2">
        <ChefHat className="w-6 h-6 text-orange-500" />
        <h2 className="text-2xl font-bold ">What would you like to cook?</h2>
      </div>
      <div>
        <label className="block font-semibold mb-2">What type of meal?</label>
        <div className="flex gap-4 mb-4">
          {mealTypes.map((type) => (
            <div
              type="button"
              key={type.value}
              className={`px-4 py-2 rounded-md border w-full cursor-pointer hover:bg-orange-100 hover:border-orange-500 text-white flex items-center justify-center flex-col ${
                mealType === type.value
                  ? "bg-orange-200 border-orange-500 text-orange-500"
                  : " border-gray-500"
              }`}
              onClick={() => setMealType(type.value)}
            >
              {type.icon}
              <h3
                className={
                  mealType === type.value
                    ? "text-lg font-semibold mt-2 text-orange-500"
                    : "text-lg  font-semibold mt-2 text-black"
                }
              >
                {type.label}
              </h3>
              <small className="text-xs text-black/50">
                {type.description}
              </small>
            </div>
          ))}
        </div>
      </div>
      <div>
        <label className="block font-semibold mb-2">
          Or choose a quick prompt
        </label>
        <div className="flex flex-wrap gap-2 mb-4">
          {quickPrompts.map((q) => (
            <Tag
              type="button"
              key={q}
              color={prompt === q ? "orange" : "default"}
              closable
              onClose={() => setPrompt(q)}
              className={`rounded-full cursor-pointer py-1 text-xs border ${
                prompt === q
                  ? "bg-orange-200 border-orange-500"
                  : "bg-gray-100 border-gray-300"
              }`}
              onClick={() => setPrompt(q)}
            >
              {q}
            </Tag>
          ))}
        </div>
      </div>
      <div>
        <label className="block font-semibold mb-2">
          Describe what you want to cook
        </label>
        <textarea
          className="w-full border rounded-md p-2"
          rows={3}
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Be as specific as you'd like! Include cuisine type, cooking method, or any special requirements."
        />
      </div>
      <div className="flex flex-row w-full items-end justify-end">
        <button
          type="submit"
          className="w-fit px-10 py-2 rounded-md bg-primary-purple shadow-primary-button-shadow text-white font-semibold"
        >
          Next
        </button>
      </div>
    </form>
  );
};

export default Step1GeneralPrompt;
