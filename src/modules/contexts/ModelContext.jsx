import { createContext, useState, useContext } from "react";

const ModelContext = createContext();

const ModelProvider = ({ children }) => {
    const [model, setModel] = useState(null);
    const [response, setResponse] = useState(null); // State to store the response
    const [loading, setLoading] = useState(false);
    return (
        <ModelContext.Provider value={{ model, setModel, response, setResponse, loading, setLoading }}>
            {children}
        </ModelContext.Provider>
    )
}

export { ModelContext, ModelProvider }; // Export the context and provider

