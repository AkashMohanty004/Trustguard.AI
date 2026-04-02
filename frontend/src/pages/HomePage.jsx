import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ShieldAlert, BookOpen, MessageSquare, List } from 'lucide-react';
import Button from '../components/Button';
import FeatureCard from '../components/FeatureCard';
import BlogCard from '../components/BlogCard';

const HomePage = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    // Fetch mock blogs from our backend
    fetch('http://localhost:5000/api/blogs')
      .then(res => res.json())
      .then(data => setBlogs(data.slice(0, 3)))
      .catch(err => console.error(err));
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '60px' }}>
      {/* Hero Section */}
      <section style={{ textAlign: 'center', marginTop: '40px' }}>
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7 }}>
          <h1 style={{ fontSize: '4rem', marginBottom: '20px' }}>
            Stay Safe with <span className="text-gradient">TrustGuard AI</span>
          </h1>
          <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto 30px' }}>
            Advanced AI-powered protection against scams, phishing links, and fraudulent job offers. Community-driven, real-time insights.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
            <Button variant="primary" onClick={() => window.location.href='/analyze'}>Try Analyzer</Button>
            <Button variant="secondary" onClick={() => window.location.href='/scam-watch'}>View Scam Watch</Button>
          </div>
        </motion.div>
      </section>

      {/* Features Grid */}
      <section>
        <h2 style={{ textAlign: 'center', marginBottom: '40px' }}>Core Features</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
          <FeatureCard 
            icon={<ShieldAlert size={28} />}
            title="Link & Text Analyzer"
            description="Paste suspicious links or messages to detect phishing and fraud with AI heuristics."
            delay={0.1}
          />
          <FeatureCard 
            icon={<List size={28} />}
            title="Scam Watch"
            description="Browse community-reported scams with real-world examples and risk ratings."
            delay={0.2}
          />
          <FeatureCard 
            icon={<BookOpen size={28} />}
            title="Cybersecurity Knowledge"
            description="Read our latest blogs to educate yourself on common attack vectors and stay safe."
            delay={0.3}
          />
          <FeatureCard 
            icon={<MessageSquare size={28} />}
            title="AI Advisor"
            description="Chat directly with our AI to ask questions about suspicious offers or scenarios."
            delay={0.4}
          />
        </div>
      </section>

      {/* Recent Blogs */}
      <section>
        <h2 style={{ textAlign: 'center', marginBottom: '40px' }}>Latest Cybersecurity Insights</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
          {blogs.map(blog => (
            <BlogCard 
              key={blog._id}
              id={blog._id}
              title={blog.title}
              brief={blog.content.substring(0, 100) + '...'}
              date={blog.createdAt}
              tags={blog.tags}
              imageUrl={blog.thumbnailUrl || 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80'}
            />
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: '30px' }}>
          <Button variant="secondary" onClick={() => window.location.href='/blogs'}>Read More Blogs</Button>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
