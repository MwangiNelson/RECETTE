import React, { useState, useRef, useEffect } from "react";
import {
  Send,
  ChefHat,
  CookingPot,
  NutOff,
  Sparkles,
  MessageSquare,
  X,
  Check,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import Burger from "../../assets/burger.png";
import { GoogleGenAI } from "@google/genai";
import RecipeCard from "../../components/ui/RecipeCard";

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

const IngredientSelector = ({
  options,
  onConfirm,
  selectedIngredients = [],
}) => {
  const [selected, setSelected] = useState(selectedIngredients);
  const [inputValue, setInputValue] = useState("");

  const toggleIngredient = (ingredient) => {
    if (selected.includes(ingredient)) {
      setSelected(selected.filter((item) => item !== ingredient));
    } else {
      setSelected([...selected, ingredient]);
    }
  };

  const handleConfirm = () => {
    onConfirm(selected);
  };

  const removeIngredient = (ingredient) => {
    setSelected(selected.filter((item) => item !== ingredient));
  };

  return (
    <div className="space-y-3">
      {/* Selected ingredients display */}
      {selected.length > 0 && (
        <div className="bg-orange-50 border border-orange-200 rounded-lg p-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-orange-800">
              Selected Ingredients:
            </span>
            <span className="text-xs text-orange-600">
              {selected.length} selected
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {selected.map((ingredient) => (
              <span
                key={ingredient}
                className="inline-flex items-center gap-1 px-2 py-1 bg-orange-100 text-orange-700 rounded-full text-xs"
              >
                {ingredient}
                <button
                  onClick={() => removeIngredient(ingredient)}
                  className="ml-1 hover:bg-orange-200 rounded-full p-0.5"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Ingredient selection pills */}
      <div className="flex flex-wrap gap-2">
        {options.map((ingredient) => (
          <button
            key={ingredient}
            onClick={() => toggleIngredient(ingredient)}
            className={`px-3 py-1 rounded-full text-xs border transition-all ${
              selected.includes(ingredient)
                ? "bg-orange-500 border-orange-500 text-white"
                : "bg-gray-100 border-gray-300 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {ingredient}
          </button>
        ))}
      </div>

      {/* Custom ingredient input */}
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Add custom ingredient..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === "Enter" && inputValue.trim()) {
              if (!selected.includes(inputValue.trim())) {
                setSelected([...selected, inputValue.trim()]);
              }
              setInputValue("");
            }
          }}
          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
        <button
          onClick={() => {
            if (inputValue.trim() && !selected.includes(inputValue.trim())) {
              setSelected([...selected, inputValue.trim()]);
              setInputValue("");
            }
          }}
          className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
        >
          Add
        </button>
      </div>

      {/* Confirm button */}
      <div className="flex justify-end">
        <button
          onClick={handleConfirm}
          disabled={selected.length === 0}
          className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Check className="w-4 h-4" />
          Confirm Selection ({selected.length})
        </button>
      </div>
    </div>
  );
};

const PreferencesSelector = ({
  options,
  onConfirm,
  selectedPreferences = [],
}) => {
  const [selected, setSelected] = useState(selectedPreferences);
  const [isOpen, setIsOpen] = useState(false);

  const togglePreference = (preference) => {
    if (selected.includes(preference)) {
      setSelected(selected.filter((item) => item !== preference));
    } else {
      setSelected([...selected, preference]);
    }
  };

  const handleConfirm = () => {
    onConfirm(selected);
    setIsOpen(false);
  };

  const removePreference = (preference) => {
    setSelected(selected.filter((item) => item !== preference));
  };

  return (
    <div className="space-y-3">
      {/* Selected preferences display */}
      {selected.length > 0 && (
        <div className="bg-orange-50 border border-orange-200 rounded-lg p-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-orange-800">
              Selected Preferences:
            </span>
            <span className="text-xs text-orange-600">
              {selected.length} selected
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {selected.map((preference) => (
              <span
                key={preference}
                className="inline-flex items-center gap-1 px-2 py-1 bg-orange-100 text-orange-700 rounded-full text-xs"
              >
                {preference}
                <button
                  onClick={() => removePreference(preference)}
                  className="ml-1 hover:bg-orange-200 rounded-full p-0.5"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Dropdown toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-gray-200 hover:bg-gray-600/50 transition-colors"
      >
        <span className="text-sm">
          {selected.length > 0
            ? `${selected.length} preference(s) selected`
            : "Select dietary preferences..."}
        </span>
        {isOpen ? (
          <ChevronUp className="w-4 h-4" />
        ) : (
          <ChevronDown className="w-4 h-4" />
        )}
      </button>

      {/* Dropdown options */}
      {isOpen && (
        <div className="bg-gray-700/50 border border-gray-600 rounded-lg p-3 space-y-2">
          <div className="grid grid-cols-2 gap-2">
            {options.map((preference) => (
              <button
                key={preference}
                onClick={() => togglePreference(preference)}
                className={`p-2 rounded-lg text-xs border transition-all text-left ${
                  selected.includes(preference)
                    ? "bg-orange-500 border-orange-500 text-white"
                    : "bg-gray-600/50 border-gray-500 text-gray-200 hover:bg-gray-500/50"
                }`}
              >
                {preference}
              </button>
            ))}
          </div>

          {/* Confirm button */}
          <div className="flex justify-end pt-2 border-t border-gray-600">
            <button
              onClick={handleConfirm}
              className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
            >
              <Check className="w-4 h-4" />
              Confirm ({selected.length})
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const ErrorMessage = ({ error }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-red-900/50 border border-red-700 rounded-2xl p-4">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-red-400">⚠️</span>
            <span className="font-medium text-red-200">
              Recipe Generation Failed
            </span>
          </div>
          <p className="text-red-100 text-sm mb-3">
            Sorry, I couldn't generate a recipe. Please try again later.
          </p>

          {isExpanded && (
            <div className="mt-3 p-3 bg-red-800/30 rounded-lg border border-red-600">
              <p className="text-red-200 text-xs font-mono break-words">
                {error}
              </p>
            </div>
          )}
        </div>

        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="ml-2 p-1 text-red-400 hover:text-red-200 transition-colors"
        >
          {isExpanded ? (
            <ChevronUp className="w-4 h-4" />
          ) : (
            <ChevronDown className="w-4 h-4" />
          )}
        </button>
      </div>

      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="text-red-300 hover:text-red-200 text-xs transition-colors"
      >
        {isExpanded ? "Hide details" : "View error details"}
      </button>
    </div>
  );
};

const MessageBubble = ({
  message,
  isUser,
  onSelect,
  selectedOptions = [],
  error = null,
}) => {
  const isInteractive =
    message.type === "options" ||
    message.type === "ingredients" ||
    message.type === "preferences" ||
    message.type === "quickPrompts";

  return (
    <div
      className={`flex ${
        isUser ? "justify-end" : "justify-start"
      } mb-4 animate-slide-in`}
    >
      <div className={`max-w-[80%] ${isUser ? "order-2" : "order-1"}`}>
        <div
          className={`rounded-2xl px-4 py-3 ${
            isUser
              ? "bg-white/10 backdrop-blur-sm border border-white/20 text-white"
              : "bg-white/10 backdrop-blur-sm border border-white/20 text-white"
          }`}
        >
          <div className="flex items-center gap-2 mb-2">
            {!isUser && message.icon && <span>{message.icon}</span>}
            <span className="font-medium text-sm">
              {isUser ? "You" : message.sender || "Recipe Assistant"}
            </span>
          </div>
          <p className="text-sm">{message.text}</p>

          {error && <ErrorMessage error={error} />}

          {isInteractive && (
            <div className="mt-3 space-y-2">
              {message.type === "options" && (
                <div className="grid grid-cols-2 gap-2">
                  {message.options.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => onSelect(option.value)}
                      className={`p-2 rounded-lg text-xs border transition-all ${
                        selectedOptions.includes(option.value)
                          ? "bg-orange-500 border-orange-500 text-white"
                          : "bg-white/10 border-white/20 text-white hover:bg-white/20"
                      }`}
                    >
                      <div className="flex items-center gap-1">
                        {option.icon}
                        <span>{option.label}</span>
                      </div>
                    </button>
                  ))}
                </div>
              )}

              {message.type === "ingredients" && (
                <IngredientSelector
                  options={message.options}
                  onConfirm={(selected) => onSelect(selected)}
                  selectedIngredients={selectedOptions}
                />
              )}

              {message.type === "preferences" && (
                <PreferencesSelector
                  options={message.options}
                  onConfirm={(selected) => onSelect(selected)}
                  selectedPreferences={selectedOptions}
                />
              )}

              {message.type === "quickPrompts" && (
                <div className="flex flex-wrap gap-2">
                  {message.options.map((prompt) => (
                    <button
                      key={prompt}
                      onClick={() => onSelect(prompt)}
                      className={`px-3 py-1 rounded-full text-xs border transition-all ${
                        selectedOptions.includes(prompt)
                          ? "bg-orange-500 border-orange-500 text-white"
                          : "bg-white/10 border-white/20 text-white hover:bg-white/20"
                      }`}
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const ChatHistoryItem = ({ title, date, onClick, isActive }) => (
  <button
    onClick={onClick}
    className={`w-full text-left p-3 rounded-lg transition-colors ${
      isActive
        ? "bg-white/20 text-white"
        : "bg-white/10 text-white hover:bg-white/20"
    }`}
  >
    <div className="flex items-center gap-2 mb-1">
      <MessageSquare className="w-4 h-4" />
      <span className="font-medium text-sm truncate">{title}</span>
    </div>
    <span className="text-xs opacity-70">{date}</span>
  </button>
);

const RecipeGenerator = () => {
  const [messages, setMessages] = useState([]);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [recipe, setRecipe] = useState(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [activeChatId, setActiveChatId] = useState(null);
  const [showSidebar, setShowSidebar] = useState(true);
  const [error, setError] = useState(null);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Initialize with welcome message
    const welcomeMessage = {
      id: 1,
      text: "👋 Hi! I'm your AI recipe assistant. I'll help you create delicious recipes based on your preferences and available ingredients. Let's start by choosing what type of meal you'd like to cook!",
      sender: "Recipe Assistant",
      icon: <ChefHat className="w-4 h-4 text-white" />,
      type: "options",
      options: [
        {
          label: "Breakfast",
          value: "breakfast",
          icon: <span>☀️</span>,
        },
        {
          label: "Lunch",
          value: "lunch",
          icon: <span>🍽️</span>,
        },
        {
          label: "Dinner",
          value: "dinner",
          icon: <span>🌙</span>,
        },
        {
          label: "Snack",
          value: "snack",
          icon: <span>🍪</span>,
        },
      ],
    };

    setMessages([welcomeMessage]);
    const chatId = Date.now();
    setActiveChatId(chatId);
    setChatHistory([
      {
        id: chatId,
        title: "New Recipe Chat",
        date: new Date().toLocaleDateString(),
        messages: [welcomeMessage],
      },
    ]);
  }, []);

  const addMessage = (
    text,
    isUser = false,
    options = null,
    type = null,
    errorMsg = null
  ) => {
    const newMessage = {
      id: Date.now(),
      text,
      isUser,
      sender: isUser ? "You" : "Recipe Assistant",
      icon: !isUser ? <ChefHat className="w-4 h-4 text-white" /> : null,
      type,
      options,
      error: errorMsg,
    };
    setMessages((prev) => [...prev, newMessage]);

    // Update chat history
    setChatHistory((prev) =>
      prev.map((chat) =>
        chat.id === activeChatId
          ? { ...chat, messages: [...chat.messages, newMessage] }
          : chat
      )
    );
  };

  const handleSelection = (selection) => {
    // Add user's selection as a message
    addMessage(selection, true);

    // Update form data based on current step
    const updatedFormData = { ...formData };

    switch (currentStep) {
      case 0: // Meal type
        updatedFormData.mealType = selection;
        setFormData(updatedFormData);

        // Ask for ingredients
        setTimeout(() => {
          addMessage(
            "Great choice! What ingredients do you have available? You can select multiple:",
            false,
            [
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
              "eggs",
              "cheese",
              "milk",
              "butter",
              "flour",
              "sugar",
              "lemon",
            ],
            "ingredients"
          );
          setCurrentStep(1);
        }, 500);
        break;

      case 1: // Ingredients
        if (!updatedFormData.ingredients) updatedFormData.ingredients = [];
        if (Array.isArray(selection)) {
          updatedFormData.ingredients = selection;
        } else {
          if (!updatedFormData.ingredients.includes(selection)) {
            updatedFormData.ingredients.push(selection);
          }
        }
        setFormData(updatedFormData);

        // If they've selected ingredients, ask for preferences
        if (updatedFormData.ingredients.length >= 2) {
          setTimeout(() => {
            addMessage(
              "Perfect! Now let's customize your recipe. Any dietary restrictions or preferences?",
              false,
              [
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
              ],
              "preferences"
            );
            setCurrentStep(2);
          }, 500);
        }
        break;

      case 2: // Dietary preferences
        if (!updatedFormData.dietary) updatedFormData.dietary = [];
        if (Array.isArray(selection)) {
          updatedFormData.dietary = selection;
        } else {
          if (!updatedFormData.dietary.includes(selection)) {
            updatedFormData.dietary.push(selection);
          }
        }
        setFormData(updatedFormData);

        // Ask for cooking time
        setTimeout(() => {
          addMessage(
            "How much time do you have for cooking?",
            false,
            [
              { label: "< 15 min", value: "< 15 min", icon: <span>⚡</span> },
              { label: "15-30 min", value: "15-30 min", icon: <span>⏱️</span> },
              { label: "30-60 min", value: "30-60 min", icon: <span>🕐</span> },
              { label: "1+ hour", value: "1+ hour", icon: <span>⏰</span> },
            ],
            "options"
          );
          setCurrentStep(3);
        }, 500);
        break;

      case 3: // Cooking time
        updatedFormData.cookingTime = selection;
        setFormData(updatedFormData);

        // Ask for difficulty
        setTimeout(() => {
          addMessage(
            "What's your cooking skill level?",
            false,
            [
              { label: "Beginner", value: "Beginner", icon: <span>🌱</span> },
              {
                label: "Intermediate",
                value: "Intermediate",
                icon: <span>👨‍🍳</span>,
              },
              { label: "Expert", value: "Expert", icon: <span>👑</span> },
            ],
            "options"
          );
          setCurrentStep(4);
        }, 500);
        break;

      case 4: // Difficulty
        updatedFormData.difficulty = selection;
        setFormData(updatedFormData);

        // Ask for cuisine type
        setTimeout(() => {
          addMessage(
            "What cuisine type are you in the mood for?",
            false,
            [
              { label: "Italian", value: "Italian", icon: <span>🍝</span> },
              { label: "Mexican", value: "Mexican", icon: <span>🌮</span> },
              { label: "Indian", value: "Indian", icon: <span>🍛</span> },
              { label: "Chinese", value: "Chinese", icon: <span>🥢</span> },
              {
                label: "Mediterranean",
                value: "Mediterranean",
                icon: <span>🥗</span>,
              },
              { label: "American", value: "American", icon: <span>🍔</span> },
              { label: "African", value: "African", icon: <span>🌍</span> },
              { label: "Other", value: "Other", icon: <span>🌎</span> },
            ],
            "options"
          );
          setCurrentStep(5);
        }, 500);
        break;

      case 5: // Cuisine type
        updatedFormData.cuisine = selection;
        setFormData(updatedFormData);

        // Show summary and generate button
        setTimeout(() => {
          const summary = `Perfect! Here's what I have:
• Meal: ${updatedFormData.mealType}
• Ingredients: ${updatedFormData.ingredients?.join(", ")}
• Dietary: ${updatedFormData.dietary?.join(", ") || "None"}
• Time: ${updatedFormData.cookingTime}
• Skill: ${updatedFormData.difficulty}
• Cuisine: ${updatedFormData.cuisine}

Ready to generate your recipe? Just type 'generate' or press Enter!`;

          addMessage(
            summary,
            false,
            [
              {
                label: "Generate Recipe",
                value: "generate",
                icon: <span>✨</span>,
              },
              { label: "Start Over", value: "reset", icon: <span>🔄</span> },
            ],
            "options"
          );
          setCurrentStep(6);
        }, 500);
        break;

      case 6: // Final step - handle generate or reset
        if (selection === "generate") {
          generateRecipe();
        } else if (selection === "reset") {
          resetChat();
        }
        break;
    }
  };

  const generateRecipe = async () => {
    setLoading(true);
    setError(null);
    addMessage("Generating your recipe...", false);

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

      // Add recipe as a message
      addMessage(`Here's your recipe: ${recipeObj.title}`, false);
    } catch (error) {
      const errorMessage = error.message || "Unknown error occurred";
      addMessage(
        "Sorry, I couldn't generate a recipe. Please try again later.",
        false,
        null,
        null,
        errorMessage
      );
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleInputSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim() && currentStep === 6 && !loading) {
      generateRecipe();
      setInputValue("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleInputSubmit(e);
    }
  };

  const resetChat = () => {
    setMessages([]);
    setFormData({});
    setRecipe(null);
    setCurrentStep(0);
    setLoading(false);
    setError(null);

    // Create new chat
    const chatId = Date.now();
    setActiveChatId(chatId);
    const newChat = {
      id: chatId,
      title: "New Recipe Chat",
      date: new Date().toLocaleDateString(),
      messages: [],
    };
    setChatHistory((prev) => [newChat, ...prev]);
  };

  const loadChat = (chatId) => {
    const chat = chatHistory.find((c) => c.id === chatId);
    if (chat) {
      setMessages(chat.messages);
      setActiveChatId(chatId);
      setCurrentStep(0);
      setRecipe(null);
      setLoading(false);
      setError(null);
    }
  };

  return (
    <div className="w-full h-full max-h-[90vh] flex bg-[#ff5400]">
      {/* Sidebar */}
      <div
        className={`${
          showSidebar ? "w-80" : "w-0"
        } transition-all duration-300 bg-white/10 backdrop-blur-sm border-r border-white/20 flex flex-col`}
      >
        <div className="p-4 border-b border-white/20">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-white">Chat History</h2>
            <button
              onClick={() => setShowSidebar(false)}
              className="p-1 text-white/70 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <button
            onClick={resetChat}
            className="w-full px-4 py-2 bg-white/20 text-white rounded-lg hover:bg-white/30 transition-colors flex items-center gap-2"
          >
            <MessageSquare className="w-4 h-4" />
            New Chat
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {chatHistory.map((chat) => (
            <ChatHistoryItem
              key={chat.id}
              title={chat.title}
              date={chat.date}
              onClick={() => loadChat(chat.id)}
              isActive={chat.id === activeChatId}
            />
          ))}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        

        {/* Messages Container */}
        <div className="flex-1 overflow-y-auto p-4">
          <div className="max-w-4xl mx-auto space-y-4">
            {messages.map((message) => (
              <MessageBubble
                key={message.id}
                message={message}
                isUser={message.isUser}
                onSelect={handleSelection}
                selectedOptions={
                  message.isUser
                    ? []
                    : message.type === "ingredients"
                    ? formData.ingredients || []
                    : message.type === "preferences"
                    ? formData.dietary || []
                    : message.type === "options"
                    ? currentStep === 2
                      ? formData.dietary || []
                      : []
                    : []
                }
                error={message.error}
              />
            ))}

            {loading && (
              <div className="flex justify-start mb-4">
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl px-4 py-3">
                  <div className="flex items-center gap-2">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
                      <div
                        className="w-2 h-2 bg-white rounded-full animate-bounce"
                        style={{ animationDelay: "0.1s" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-white rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                    </div>
                    <span className="text-sm text-white/80">
                      Cooking up your recipe...
                    </span>
                  </div>
                </div>
              </div>
            )}

            {recipe && (
              <div className="flex justify-start mb-4">
                <RecipeCard recipe={recipe} />
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input Area */}
        <div className="bg-white/10 backdrop-blur-sm border-t border-white/20 p-4">
          <div className="max-w-4xl mx-auto">
            <form onSubmit={handleInputSubmit} className="flex gap-2">
              <input
                type="text"
                placeholder={
                  currentStep === 6
                    ? "Type 'generate' or press Enter to create your recipe..."
                    : "Type your message..."
                }
                className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                disabled={loading || currentStep !== 6}
              />
              {currentStep === 6 && !loading && (
                <button
                  type="submit"
                  className="px-6 py-3 bg-white/20 text-white rounded-lg hover:bg-white/30 transition-colors flex items-center gap-2 disabled:opacity-50"
                  disabled={!inputValue.trim()}
                >
                  <Send className="w-4 h-4" />
                  Generate
                </button>
              )}
            </form>
          </div>
        </div>
      </div>

      {/* Background Image */}
      <img
        src={Burger}
        alt=""
        className="fixed hidden md:block animate-floating -left-14 p-10 h-3/4 object-contain z-0 opacity-10"
      />
    </div>
  );
};

export default RecipeGenerator;
