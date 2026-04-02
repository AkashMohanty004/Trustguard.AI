const express = require('express');
const router = express.Router();
const aiService = require('../services/aiService');

router.post('/link', async (req, res) => {
    try {
        const { url } = req.body;
        const result = await aiService.analyzeUrl(url);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: 'Failed to analyze URL' });
    }
});

router.post('/text', async (req, res) => {
    try {
        const { text } = req.body;
        const result = await aiService.analyzeText(text);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: 'Failed to analyze text' });
    }
});

router.post('/chat', async (req, res) => {
    try {
        const { message } = req.body;
        const reply = await aiService.chat(message);
        res.json({ reply });
    } catch (error) {
        res.status(500).json({ error: 'Chat service failed' });
    }
});

module.exports = router;
