const express = require('express');
const router = express.Router();
const Blog = require('../models/Blog');

// Mock data in case DB is not populated
const MOCK_BLOGS = [
    {
        _id: '101',
        title: 'How to Spot a Phishing Email',
        content: 'Phishing emails often contain urgent language and suspicious links. Always verify the sender\'s address and avoid clicking unfamiliar links. For example, check if "paypal.com" is misspelled as "paypaI.com". Look out for generic greetings like "Dear Customer" instead of your actual name.\n\nKey takeaways:\n- Check the sender email carefully.\n- Hover over links before clicking.\n- Use 2FA where possible.',
        author: 'TrustGuard Team',
        tags: ['Phishing', 'Email Security'],
        thumbnailUrl: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80',
        createdAt: new Date().toISOString()
    },
    {
        _id: '102',
        title: 'The Rise of Fake Job Offers',
        content: 'Scammers are using WhatsApp and Telegram to send fake job offers promising high salaries for simply liking YouTube videos or leaving reviews. Once you "earn" some money, they require you to pay a "processing fee" or "upgrade fee" to withdraw it. Never pay to work!\n\nIf it sounds too good to be true, it is. Stay safe by researching the company and looking for verifiable contact information.',
        author: 'Cyber Expert Team',
        tags: ['Job Scam', 'Social Engineering'],
        thumbnailUrl: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&q=80',
        createdAt: new Date().toISOString()
    }
];

router.get('/', async (req, res) => {
    try {
        const blogs = await Blog.find({}).sort({ createdAt: -1 });
        if (blogs.length === 0) {
            return res.json(MOCK_BLOGS);
        }
        res.json(blogs);
    } catch (error) {
        res.json(MOCK_BLOGS);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if (!blog) {
            const mock = MOCK_BLOGS.find(b => b._id === req.params.id);
            if (mock) return res.json(mock);
            return res.status(404).json({ error: 'Blog post not found' });
        }
        res.json(blog);
    } catch (error) {
        const mock = MOCK_BLOGS.find(b => b._id === req.params.id);
        if (mock) return res.json(mock);
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;
