import React from 'react';
import { motion } from 'framer-motion';

const FeatureCard = ({ title, description, icon, delay = 0 }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      className="glass-panel"
      style={{ padding: '30px', display: 'flex', flexDirection: 'column', gap: '15px' }}
    >
      <div style={{
        width: '50px', height: '50px', borderRadius: '12px',
        background: 'rgba(0, 210, 255, 0.1)', display: 'flex',
        alignItems: 'center', justifyContent: 'center', color: 'var(--accent-primary)'
      }}>
        {icon}
      </div>
      <h3 style={{ margin: 0 }}>{title}</h3>
      <p style={{ color: 'var(--text-muted)', margin: 0 }}>{description}</p>
    </motion.div>
  );
};

export default FeatureCard;
