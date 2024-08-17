import { createContext, useState } from "react";
import runChat from "../components/sidebar/config/gemini";

export const Context = createContext();

const ContextProvider = (props) => {
    const [input, setInput] = useState("");
    const [recentPrompt, setRecentPrompt] = useState("");
    const [previousPrompt, setPreviousPrompt] = useState([]);
    const [showResults, setShowResults] = useState(false);
    const [loading, setLoading] = useState(false);
    const [resultData, setResultData] = useState("");

    const delePara = (index, nextWord) => {
        setTimeout(() => {
            setResultData((prev) => prev + nextWord);
        }, 50 * index);
    };

    const onSent = async (prompt) => {
        setResultData("");
        setLoading(true);
        setPreviousPrompt((prev) => [...prev, input]);
        setShowResults(true);
        setRecentPrompt(input);
        const response = await runChat(input);

        // Splitting the response to handle bold text and line breaks
        let responseArray = response.split("**");
        let newResponse = "";

        for (let i = 0; i < responseArray.length; i++) {
            if (i % 2 === 0) {
                newResponse += responseArray[i]; // Normal text
            } else {
                newResponse += "<b>" + responseArray[i] + "</b>"; // Bold text
            }
        }

        // Replace '*' with '<br />' for line breaks
        newResponse = newResponse.split("*").join("<br />");

        // Break the response into words and display it word by word
        let newResponseArray = newResponse.split(" ");
        for (let i = 0; i < newResponseArray.length; i++) {
            let nextWord = newResponseArray[i];
            delePara(i, nextWord + " ");
        }

        setLoading(false);
        setInput("");
    };

    const contextValue = {
        previousPrompt,
        setPreviousPrompt,
        onSent,
        setRecentPrompt,
        recentPrompt,
        input,
        loading,
        showResults,
        resultData,
        setInput,
    };

    return <Context.Provider value={contextValue}>{props.children}</Context.Provider>;
};

export default ContextProvider;
