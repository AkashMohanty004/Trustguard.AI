import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import BlogCard from '../components/BlogCard';

const BlogPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5000/api/blogs')
      .then(res => res.json())
      .then(data => {
        setBlogs(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div style={{ textAlign: 'center', marginBottom: '50px' }}>
        <h1 style={{ fontSize: '3rem', marginBottom: '15px' }}>Cybersecurity <span className="text-gradient">Knowledge Hub</span></h1>
        <p style={{ color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto' }}>
          Stay ahead of the curve. Learn how to spot phishing, job scams, and protect your digital identity with our expert resources.
        </p>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center' }}>Loading blogs...</div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
          {blogs.map(blog => (
            <BlogCard 
              key={blog._id}
              id={blog._id}
              title={blog.title}
              brief={blog.content.substring(0, 120) + '...'}
              date={blog.createdAt}
              tags={blog.tags}
              imageUrl={blog.thumbnailUrl || 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80'}
            />
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default BlogPage;
