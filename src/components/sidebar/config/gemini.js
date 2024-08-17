import {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
} from "/node_modules/.vite/deps/@google_generative-ai.js?v=50dc4ac8";

const apiKey = "AIzaSyAJ7jwG7vKY77ao8CgZ7a7zgOkFWFgYSEw";
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

async function runChat(prompt) {
    const chatSession = model.startChat({
        generationConfig,
        history: [],
    });

    const result = await chatSession.sendMessage(prompt);
    console.log(result.response.text());
    return result.response.text();  // Use 'result' instead of 'response'
}

export default runChat;
