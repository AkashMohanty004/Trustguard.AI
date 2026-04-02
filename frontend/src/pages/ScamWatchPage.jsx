import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, AlertTriangle } from 'lucide-react';

const ScamWatchPage = () => {
  const [scams, setScams] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5000/api/scams')
      .then(res => res.json())
      .then(data => {
        setScams(data);
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
        <h1 style={{ fontSize: '3rem', marginBottom: '15px' }}>Community <span className="text-gradient">Scam Watch</span></h1>
        <p style={{ color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto' }}>
          Browse verified scams reported by our community. Learn from real-world examples to protect yourself.
        </p>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center' }}>Loading scam data...</div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '20px', maxWidth: '800px', margin: '0 auto' }}>
          {scams.map(scam => (
            <motion.div 
              key={scam._id}
              whileHover={{ scale: 1.01 }}
              className="glass-panel"
              style={{ padding: '25px', borderLeft: scam.riskLevel === 'Critical' ? '4px solid var(--danger)' : '4px solid var(--warning)' }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '15px' }}>
                <div>
                  <h3 style={{ margin: '0 0 5px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <AlertTriangle color={scam.riskLevel === 'Critical' ? 'var(--danger)' : 'var(--warning)'} size={20} />
                    {scam.title}
                  </h3>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Type: {scam.type}</span>
                </div>
                <div style={{ background: 'rgba(255,255,255,0.05)', padding: '5px 10px', borderRadius: '8px', fontSize: '0.8rem' }}>
                  Risk: <strong style={{ color: scam.riskLevel === 'Critical' ? 'var(--danger)' : 'var(--warning)' }}>{scam.riskLevel}</strong>
                </div>
              </div>
              
              <div style={{ background: 'rgba(0,0,0,0.2)', padding: '15px', borderRadius: '8px', marginBottom: '15px' }}>
                <strong style={{ display: 'block', marginBottom: '5px', color: 'var(--accent-primary)' }}>Description:</strong>
                <p style={{ margin: 0, fontSize: '0.95rem' }}>{scam.description}</p>
              </div>

              {scam.realWorldExamples && (
                <div style={{ background: 'rgba(0,210,255,0.05)', padding: '15px', borderRadius: '8px' }}>
                  <strong style={{ display: 'block', marginBottom: '5px', color: '#fff' }}>Real-world Example:</strong>
                  <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-muted)' }}>{scam.realWorldExamples}</p>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default ScamWatchPage;
