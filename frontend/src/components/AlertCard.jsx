import React from 'react';
import { AlertCircle, CheckCircle, Info } from 'lucide-react';
import { motion } from 'framer-motion';

const AlertCard = ({ title, description, type = 'info' }) => {
  let color = 'var(--accent-primary)';
  let bg = 'rgba(0, 210, 255, 0.1)';
  let Icon = Info;

  if (type === 'danger' || type === 'critical') {
    color = 'var(--danger)';
    bg = 'rgba(255, 75, 75, 0.1)';
    Icon = AlertCircle;
  } else if (type === 'warning') {
    color = 'var(--warning)';
    bg = 'rgba(255, 184, 0, 0.1)';
    Icon = AlertCircle;
  } else if (type === 'success' || type === 'low') {
    color = 'var(--success)';
    bg = 'rgba(0, 230, 118, 0.1)';
    Icon = CheckCircle;
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="glass-panel"
      style={{
        padding: '20px',
        borderLeft: `4px solid ${color}`,
        display: 'flex',
        gap: '15px',
        alignItems: 'flex-start',
        background: bg
      }}
    >
      <Icon color={color} size={24} style={{ marginTop: '2px' }} />
      <div>
        <h4 style={{ margin: '0 0 5px 0', color: '#fff' }}>{title}</h4>
        <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.95rem' }}>{description}</p>
      </div>
    </motion.div>
  );
};

export default AlertCard;
