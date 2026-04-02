const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

// Routes
const analyzeRoutes = require('./routes/analyzeRoutes');
const scamRoutes = require('./routes/scamRoutes');
const blogRoutes = require('./routes/blogRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// In-Memory Database / Mongoose Fallback Setup
// To avoid requiring a connection string initially, we set up mock data logic if not connected.
mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/trustguard', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error, falling back to mock functions. Error:', err.message));

app.use('/api/analyze', analyzeRoutes);
app.use('/api/scams', scamRoutes);
app.use('/api/blogs', blogRoutes);

app.get('/', (req, res) => {
    res.send('TrustGuard AI Backend running.');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
