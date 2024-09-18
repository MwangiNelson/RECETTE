/*
 * Install the Generative AI SDK
 *
 * $ npm install @google/generative-ai
 *
 * See the getting started guide for more information
 * https://ai.google.dev/gemini-api/docs/get-started/node
 */

import React, { useContext, useState } from 'react';
import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";
import { ModelContext } from './ModelContext'; // Import ModelContext

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
});

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

function run(prompt) {
    // // const { setResponse, setLoading } = useContext(ModelContext);
    // const [response, setResponse] = useState(null); // State to store the response
    // const [loading, setLoading] = useState(false);
let setResponse = () => {};
let setLoading = () => {};
    setLoading(true); // Correct usage
    const chatSession = model.startChat({
        generationConfig,
        safetySettings,
        history: [
            {
                role: "user",
                parts: [
                    { text: "Generate a recipe based on the following orders " },
                ],
            },
        ],
    });

    chatSession.sendMessage(prompt).then(result => {
        console.log(result.response.text());
        setResponse(result.response.text());
        setLoading(false); // Correct usage
    }).catch(error => {
        console.error('Error in generating response:', error);
        setLoading(false); // Correct usage
    });
}

export default run; // Export the run function if needed elsewhere
run();
run();