const express = require('express');
const router = express.Router();
const Scam = require('../models/Scam');

// Provide some mock initial data in case the db is empty or disconnected
const MOCK_SCAMS = [
    {
        _id: '1',
        title: 'Fake Job Offer SMS',
        type: 'Job Scam',
        url: 'http://fake-job-portal-123.com',
        description: 'Users report receiving SMS messages offering part-time jobs with huge daily salaries.',
        realWorldExamples: 'Many users get WhatsApp texts asking to like YouTube videos for money.',
        riskLevel: 'Critical',
        reportCount: 154,
        createdAt: new Date().toISOString()
    },
    {
        _id: '2',
        title: 'Bank Phishing Email',
        type: 'Phishing',
        url: 'http://secure-update-bnk.com',
        description: 'An email claiming your bank account is locked and requiring immediate login.',
        realWorldExamples: 'Emails using generic greetings and urgent language, usually containing bad spelling.',
        riskLevel: 'High',
        reportCount: 89,
        createdAt: new Date().toISOString()
    }
];

router.get('/', async (req, res) => {
    try {
        const scams = await Scam.find({}).sort({ createdAt: -1 });
        if (scams.length === 0) {
            return res.json(MOCK_SCAMS);
        }
        res.json(scams);
    } catch (error) {
        // Fallback to mock data if db is down
        res.json(MOCK_SCAMS);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const scam = await Scam.findById(req.params.id);
        if (!scam) {
            const mock = MOCK_SCAMS.find(s => s._id === req.params.id);
            if (mock) return res.json(mock);
            return res.status(404).json({ error: 'Scam not found' });
        }
        res.json(scam);
    } catch (error) {
        const mock = MOCK_SCAMS.find(s => s._id === req.params.id);
        if (mock) return res.json(mock);
        res.status(500).json({ error: 'Server error' });
    }
});

router.post('/', async (req, res) => {
    try {
        const newScam = new Scam(req.body);
        const saved = await newScam.save();
        res.status(201).json(saved);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create scam report', mockSaved: true });
    }
});

module.exports = router;
