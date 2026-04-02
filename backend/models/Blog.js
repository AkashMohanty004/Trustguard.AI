const mongoose = require('mongoose');

const BlogSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: String, default: 'TrustGuard Team' },
    tags: [{ type: String }],
    thumbnailUrl: { type: String },
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Blog', BlogSchema);
