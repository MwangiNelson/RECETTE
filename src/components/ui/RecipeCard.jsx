import React from "react";
import { Clock, Users, ChefHat, Utensils, Flame, BookOpen } from "lucide-react";

const RecipeCard = ({ recipe }) => {
  if (!recipe) return null;

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 shadow-lg max-w-[90%]">
      <div className="flex items-center gap-2 mb-4">
        <ChefHat className="w-5 h-5 text-orange-500" />
        <span className="font-medium text-sm text-gray-300">
          Recipe Generated
        </span>
      </div>

      {/* Recipe Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white mb-2">{recipe.title}</h2>
        <p className="text-gray-300 mb-4">{recipe.description}</p>

        {/* Recipe Stats */}
        <div className="flex flex-wrap gap-4 text-sm text-gray-400">
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{recipe.totalTime}</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="w-4 h-4" />
            <span>{recipe.servings} servings</span>
          </div>
          <div className="flex items-center gap-1">
            <Flame className="w-4 h-4" />
            <span>{recipe.difficulty}</span>
          </div>
          {recipe.calories && (
            <div className="flex items-center gap-1">
              <span className="text-orange-500">🔥</span>
              <span>{recipe.calories} cal</span>
            </div>
          )}
        </div>
      </div>

      {/* Tags */}
      {recipe.tags && recipe.tags.length > 0 && (
        <div className="mb-6">
          <h3 className="font-semibold text-white mb-2">Tags</h3>
          <div className="flex flex-wrap gap-2">
            {recipe.tags.map((tag, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-orange-500/20 border border-orange-500/30 text-orange-300 rounded-full text-xs font-medium"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Ingredients */}
      {recipe.ingredients && recipe.ingredients.length > 0 && (
        <div className="mb-6">
          <h3 className="font-semibold text-white mb-3 flex items-center gap-2">
            <Utensils className="w-4 h-4 text-orange-500" />
            Ingredients
          </h3>
          <div className="bg-gray-700/50 rounded-lg p-4 border border-gray-600">
            <ul className="space-y-2">
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></span>
                  <span className="text-gray-200">
                    {typeof ingredient === "string"
                      ? ingredient
                      : `${ingredient.quantity} ${ingredient.unit} ${
                          ingredient.name
                        }${ingredient.notes ? ` (${ingredient.notes})` : ""}`}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Nutrition Info */}
      {recipe.nutrition && (
        <div className="mb-6">
          <h3 className="font-semibold text-white mb-3">
            Nutrition (per serving)
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {Object.entries(recipe.nutrition).map(([key, value]) => (
              <div
                key={key}
                className="bg-gray-700/50 border border-gray-600 rounded-lg p-3 text-center"
              >
                <div className="text-lg font-bold text-orange-500">{value}</div>
                <div className="text-xs text-gray-400 capitalize">{key}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Instructions */}
      {recipe.instructions && recipe.instructions.length > 0 && (
        <div className="mb-6">
          <h3 className="font-semibold text-white mb-3 flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-orange-500" />
            Instructions
          </h3>
          <div className="space-y-4">
            {recipe.instructions.map((instruction, index) => (
              <div key={index} className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <p className="text-gray-200 leading-relaxed">{instruction}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex gap-3 pt-4 border-t border-gray-700">
        <button className="flex-1 bg-orange-500 text-white py-2 px-4 rounded-lg hover:bg-orange-600 transition-colors font-medium">
          Save Recipe
        </button>
        <button className="flex-1 bg-gray-700/50 text-gray-200 py-2 px-4 rounded-lg hover:bg-gray-600/50 transition-colors font-medium border border-gray-600">
          Share Recipe
        </button>
      </div>
    </div>
  );
};

export default RecipeCard;
