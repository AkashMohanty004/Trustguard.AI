const Groq = require('groq-sdk');
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY }); 

async function askGroqJSON(systemPrompt, userPrompt) {
    const chatCompletion = await groq.chat.completions.create({
        messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: userPrompt }
        ],
        model: "llama-3.1-8b-instant",
        temperature: 0.1,
        response_format: { type: "json_object" },
    });
    return JSON.parse(chatCompletion.choices[0]?.message?.content || "{}");
}

exports.analyzeUrl = async (url) => {
    try {
        const systemPrompt = `You are a cybersecurity expert analyzing URLs. Do NOT flag standard personal websites, portfolios (e.g. yourname.com), or normal domains as scams just because they are unfamiliar. Only flag URLs if they show clear signs of typo-squatting, malicious extensions, random alphanumeric patterns, or brand impersonation. Provide output ONLY as JSON with exactly these keys: "trustScore" (integer 0-100), "riskLevel" ("Low", "Medium", "High", or "Critical"), and "flags" (an array of string explanations).`;
        const userPrompt = `Analyze this URL for phishing or suspicious patterns: ${url}`;
        const result = await askGroqJSON(systemPrompt, userPrompt);
        return {
            url,
            trustScore: result.trustScore ?? 50,
            riskLevel: result.riskLevel || "Medium",
            flags: result.flags || result.details || ["Unable to extract detailed analysis."]
        };
    } catch (error) {
        console.error("Groq AI Error (analyzeUrl):", error);
        return { url, trustScore: 0, riskLevel: "Critical", flags: ["AI Analysis Failed. Please check API Key and connection."] };
    }
};

exports.analyzeText = async (text) => {
    try {
        const systemPrompt = `You are a cybersecurity expert analyzing text messages for scams or phishing. Provide output ONLY as JSON with these keys: "trustScore" (integer 0-100), "riskLevel" ("Low", "Medium", "High", or "Critical"), and "flags" (array of string explanations detailing why it's safe or suspicious).`;
        const userPrompt = `Analyze this text message: "${text}"`;
        const result = await askGroqJSON(systemPrompt, userPrompt);
        return {
            textSnippet: text.substring(0, 50) + (text.length > 50 ? '...' : ''),
            trustScore: result.trustScore ?? 50,
            riskLevel: result.riskLevel || "Medium",
            flags: result.flags || ["Unable to extract detailed analysis."]
        };
    } catch (error) {
        console.error("Groq AI Error (analyzeText):", error);
        return { textSnippet: text.substring(0, 50) + '...', trustScore: 0, riskLevel: "Critical", flags: ["AI Analysis Failed. Please check API Key and connection."] };
    }
};

exports.chat = async (message) => {
    try {
        const systemPrompt = `You are the TrustGuard AI Advisor, an expert in cybersecurity and stopping online scams. Keep your answers concise, helpful, and focused on security. Tone should be friendly but highly vigilant. Do not output JSON, return normal conversational text.`;
        const chatCompletion = await groq.chat.completions.create({
            messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: message }
            ],
            model: "llama-3.1-8b-instant",
            temperature: 0.7,
        });
        return chatCompletion.choices[0]?.message?.content || "I am currently unable to answer that.";
    } catch (error) {
        console.error("Groq AI Error (chat):", error);
        return "Sorry, I am facing an issue connecting to the AI service. Please check the Groq API key configuration.";
    }
};
