import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Pages
import HomePage from './pages/HomePage';
import AnalyzerPage from './pages/AnalyzerPage';
import ScamWatchPage from './pages/ScamWatchPage';
import BlogPage from './pages/BlogPage';
import BlogPostPage from './pages/BlogPostPage';
import AiAdvisorPage from './pages/AiAdvisorPage';
import ReportScamPage from './pages/ReportScamPage';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <main className="page-wrapper container" style={{ marginTop: '40px' }}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/analyze" element={<AnalyzerPage />} />
            <Route path="/scam-watch" element={<ScamWatchPage />} />
            <Route path="/blogs" element={<BlogPage />} />
            <Route path="/blogs/:id" element={<BlogPostPage />} />
            <Route path="/advisor" element={<AiAdvisorPage />} />
            <Route path="/report" element={<ReportScamPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
