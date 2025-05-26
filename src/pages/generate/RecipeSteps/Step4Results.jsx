import { Sparkles } from "lucide-react";
import React, { useContext, useEffect } from "react";
import { ModelContext } from "../../../modules/contexts/ModelContext";

const LoadingSkeleton = () => (
  <div className="animate-pulse space-y-4">
    <div className="h-8 bg-orange-100 rounded w-1/2 mb-2" />
    <div className="h-4 bg-orange-100 rounded w-3/4 mb-2" />
    <div className="h-4 bg-orange-100 rounded w-1/3 mb-2" />
    <div className="h-6 bg-orange-100 rounded w-full mb-2" />
    <div className="h-6 bg-orange-100 rounded w-5/6 mb-2" />
    <div className="h-6 bg-orange-100 rounded w-2/3 mb-2" />
    <div className="h-10 bg-orange-100 rounded w-full mb-2" />
    <div className="h-10 bg-orange-100 rounded w-1/2 mb-2" />
  </div>
);

const Step4Results = ({ prevStep, formData, recipe, loading }) => {
  if (loading) {
    return (
      <div className="w-full max-w-5xl w-3/4 bg-white z-10 rounded-lg shadow-md p-8 flex flex-col gap-3">
        <LoadingSkeleton />
      </div>
    );
  }

  if (!recipe) {
    console.log("Recipe parsed as", recipe);
    return <div>No recipe found</div>;
  }

  return (
    <div className="w-full max-w-5xl w-3/4 bg-white z-10 rounded-lg shadow-md p-8 flex flex-col gap-3">
      <div className="flex flex-row items-center gap-2">
        <Sparkles className="w-6 h-6 text-orange-500" />
        <h2 className="text-3xl font-bold mb-2">{recipe.title}</h2>
      </div>{" "}
      <p className="mb-2 text-gray-700">{recipe.description}</p>
      <div className="flex gap-4">
        <div className="bg-orange-100 text-sm px-2 py-1 rounded-md font-semibold flex items-center gap-2">
          Total Time
          <span className="font-bold">{recipe.totalTime}</span>
        </div>
        <div className="bg-orange-100 text-sm px-2 py-1 rounded-md font-semibold flex items-center gap-2">
          Servings
          <span className="font-bold">{recipe.servings}</span>
        </div>
        <div className="bg-orange-100 text-sm px-2 py-1 rounded-md font-semibold flex items-center gap-2">
          Difficulty
          <span className="font-bold">{recipe.difficulty}</span>
        </div>
        <div className="bg-orange-100 text-sm px-2 py-1 rounded-md font-semibold flex items-center gap-2">
          Calories
          <span className="font-bold">{recipe.calories}</span>
        </div>
      </div>
      <div className="flex flex-wrap gap-2 mb-4">
        {recipe.tags &&
          recipe.tags.map((tag) => (
            <span
              key={tag}
              className="bg-orange-200 text-orange-800 px-3 py-1 rounded-full text-xs font-semibold"
            >
              {tag}
            </span>
          ))}
      </div>
      <div className="flex gap-8">
        <div className="flex-1">
          <h3 className="font-bold mb-2">Ingredients</h3>
          <ul className="list-disc list-inside text-gray-700">
            {recipe.ingredients &&
              recipe.ingredients.map((ing, idx) => {
                if (typeof ing === "string") {
                  return <li key={ing}>{ing}</li>;
                } else if (typeof ing === "object" && ing !== null) {
                  return (
                    <li key={ing.name || idx}>
                      <span className="font-semibold">{ing.name}</span>
                      {ing.quantity && (
                        <>
                          : <span>{ing.quantity}</span>
                        </>
                      )}
                      {ing.unit && (
                        <>
                          {" "}
                          <span>{ing.unit}</span>
                        </>
                      )}
                      {ing.notes && (
                        <span className="text-gray-500"> ({ing.notes})</span>
                      )}
                    </li>
                  );
                } else {
                  return null;
                }
              })}
          </ul>
        </div>
        <div className="flex-1">
          <h3 className="font-bold mb-2">Nutrition (per serving)</h3>
          <ul className="text-gray-700">
            <li>Calories: {recipe.nutrition?.calories}</li>
            <li>Protein: {recipe.nutrition?.protein}</li>
            <li>Carbohydrates: {recipe.nutrition?.carbs}</li>
            <li>Fat: {recipe.nutrition?.fat}</li>
            <li>Fiber: {recipe.nutrition?.fiber}</li>
          </ul>
        </div>
      </div>
      <div>
        <h3 className="font-bold mb-2">Instructions</h3>
        <ol className="list-decimal list-inside text-gray-700 space-y-2">
          {recipe.instructions &&
            recipe.instructions.map((step, idx) => <li key={idx}>{step}</li>)}
        </ol>
      </div>
      <div className="bg-gray-50 rounded-md p-4 mt-4">
        <h4 className="font-semibold mb-1">
          Recipe Generated Based On Your Preferences
        </h4>
        <div className="text-sm text-gray-600">
          Meal Type: {formData.prompt || formData.mealType}
        </div>
        <div className="text-sm text-gray-600">
          Ingredients Used:{" "}
          {formData.ingredients && formData.ingredients.join(", ")}
        </div>
      </div>
      <div className="flex flex-row justify-between">
        <button
          onClick={prevStep}
          className="mt-4 px-4 py-2 rounded-md bg-gray-200 text-gray-900"
        >
          Previous
        </button>
        <button
          onClick={nextStep}
          className="mt-4 px-4 py-2 rounded-md bg-primary-purple shadow-primary-button-shadow text-white"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Step4Results;
