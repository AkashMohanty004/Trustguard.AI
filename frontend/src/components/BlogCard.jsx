import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const BlogCard = ({ id, title, brief, date, tags, imageUrl }) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="glass-panel"
      style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column', height: '100%' }}
    >
      <div style={{ height: '200px', background: `url(${imageUrl}) center/cover no-repeat` }}></div>
      <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
        <div style={{ display: 'flex', gap: '8px', marginBottom: '10px', flexWrap: 'wrap' }}>
          {tags && tags.map(tag => (
            <span key={tag} style={{ 
              fontSize: '0.75rem', padding: '4px 8px', borderRadius: '4px',
              background: 'rgba(0, 210, 255, 0.15)', color: 'var(--accent-primary)', fontWeight: '500'
            }}>
              {tag}
            </span>
          ))}
        </div>
        <h3 style={{ margin: '0 0 10px 0', fontSize: '1.25rem', color: '#fff' }}>{title}</h3>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '20px', flexGrow: 1 }}>
          {brief}
        </p>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            {new Date(date).toLocaleDateString()}
          </span>
          <Link to={`/blogs/${id}`} className="text-gradient" style={{ fontWeight: '600', fontSize: '0.9rem' }}>
            Read More &rarr;
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default BlogCard;
