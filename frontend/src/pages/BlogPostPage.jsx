import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, User } from 'lucide-react';

const BlogPostPage = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:5000/api/blogs/${id}`)
      .then(res => res.json())
      .then(data => {
        setBlog(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (!blog || blog.error) return <div>Blog not found.</div>;

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ maxWidth: '800px', margin: '0 auto' }}>
      <Link to="/blogs" style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', color: 'var(--accent-primary)', marginBottom: '20px' }}>
        <ArrowLeft size={16} /> Back to Blogs
      </Link>
      
      {blog.thumbnailUrl && (
        <img 
          src={blog.thumbnailUrl} 
          alt={blog.title} 
          style={{ width: '100%', height: '350px', objectFit: 'cover', borderRadius: '16px', marginBottom: '30px' }} 
        />
      )}
      
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        {blog.tags.map(tag => (
          <span key={tag} style={{ background: 'rgba(0,210,255,0.1)', color: 'var(--accent-primary)', padding: '5px 12px', borderRadius: '20px', fontSize: '0.85rem' }}>
            {tag}
          </span>
        ))}
      </div>
      
      <h1 style={{ fontSize: '2.5rem', marginBottom: '15px' }}>{blog.title}</h1>
      
      <div style={{ display: 'flex', gap: '20px', color: 'var(--text-muted)', marginBottom: '40px', fontSize: '0.9rem', borderBottom: '1px solid var(--border-light)', paddingBottom: '20px' }}>
        <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><User size={16} /> {blog.author}</span>
        <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Calendar size={16} /> {new Date(blog.createdAt).toLocaleDateString()}</span>
      </div>
      
      <div style={{ lineHeight: '1.8', fontSize: '1.1rem', color: '#e2e8f0', whiteSpace: 'pre-wrap' }}>
        {blog.content}
      </div>
    </motion.div>
  );
};

export default BlogPostPage;
