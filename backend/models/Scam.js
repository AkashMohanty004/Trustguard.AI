const mongoose = require('mongoose');

const ScamSchema = new mongoose.Schema({
    url: { type: String },
    type: { type: String, required: true }, // e.g. "Phishing", "Job Scam", "Fake Store"
    title: { type: String, required: true },
    description: { type: String },
    realWorldExamples: { type: String },
    screenshots: [{ type: String }],
    reportCount: { type: Number, default: 1 },
    riskLevel: { type: String, enum: ['Low', 'Medium', 'High', 'Critical'], default: 'Medium' },
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Scam', ScamSchema);
