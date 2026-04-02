// Mock implementation for AI Analysis

exports.analyzeUrl = async (url) => {
    // Simple heuristic-based mock checking
    const suspiciousKeywords = ['free', 'win', 'urgent', 'update', 'login', 'verify'];
    const isSuspicious = suspiciousKeywords.some(keyword => url.toLowerCase().includes(keyword));
    const isHttp = url.startsWith('http://');

    let riskLevel = 'Low';
    let trustScore = 90;

    if (isSuspicious) {
        trustScore -= 30;
        riskLevel = 'Medium';
    }
    if (isHttp) {
        trustScore -= 20;
    }
    if (trustScore < 50) {
        riskLevel = 'High';
    }

    return {
        url,
        trustScore,
        riskLevel,
        details: [
            isHttp ? 'Uses insecure HTTP protocol' : 'Uses secure HTTPS',
            isSuspicious ? 'Contains suspicious keywords commonly used in phishing' : 'No suspicious keywords found'
        ]
    };
};

exports.analyzeText = async (text) => {
    // Basic heuristic NLP
    const urgentWords = ['urgent', 'immediate', 'act now', 'suspended', 'locked'];
    const moneyWords = ['lottery', 'winner', 'cash', 'prize', 'claim'];
    
    let score = 95;
    let flags = [];
    const lowerText = text.toLowerCase();

    if (urgentWords.some(w => lowerText.includes(w))) {
        score -= 25;
        flags.push('High sense of urgency detected (typical in phishing/scams).');
    }
    if (moneyWords.some(w => lowerText.includes(w))) {
        score -= 30;
        flags.push('Promises of unexpected money or prizes detected.');
    }
    if (lowerText.includes('password') || lowerText.includes('ssn') || lowerText.includes('bank account')) {
        score -= 40;
        flags.push('Requests sensitive personal or financial information.');
    }

    let riskLevel = 'Low';
    if (score < 70) riskLevel = 'Medium';
    if (score < 40) riskLevel = 'Critical';

    return {
        textSnippet: text.substring(0, 50) + '...',
        trustScore: score,
        riskLevel,
        flags: flags.length > 0 ? flags : ['Text appears to be safe.']
    };
};

exports.chat = async (message) => {
    // Simple rule-based mock advisor
    const lowerMsg = message.toLowerCase();
    
    if (lowerMsg.includes('job') && (lowerMsg.includes('telegram') || lowerMsg.includes('whatsapp'))) {
        return "Many job scams start on WhatsApp or Telegram offering money for doing simple tasks like liking videos. This is very likely a scam. Do not pay any 'fee' to withdraw your 'earnings'.";
    }
    
    if (lowerMsg.includes('bank') && lowerMsg.includes('link')) {
        return "A bank will never text or email you a link to enter your password or PIN. Always navigate directly to the bank's official website or app.";
    }

    if (lowerMsg.includes('hello') || lowerMsg.includes('hi')) {
        return "Hello! I am the TrustGuard AI Advisor. You can ask me about suspicious emails, texts, or job offers, and I'll help you recognize if it's a scam.";
    }

    return "That's a good question. To be safe online, avoid sharing sensitive info, never send money to unverified contacts, and always double-check the source. Is there a specific link or message you'd like me to look at?";
};
