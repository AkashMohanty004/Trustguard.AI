import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Button from '../components/Button';
import AlertCard from '../components/AlertCard';

const AnalyzerPage = () => {
  const [tab, setTab] = useState('link'); // 'link', 'text', 'image'
  const [inputData, setInputData] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    if (!inputData) return;
    setLoading(true);
    setResult(null);
    try {
      const endpoint = tab === 'link' ? 'analyze/link' : 'analyze/text';
      const bodyKey = tab === 'link' ? 'url' : 'text';
      
      // Artificial delay for better UX
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const response = await fetch(`http://localhost:5000/api/${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ [bodyKey]: inputData })
      });
      const data = await response.json();
      setResult(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1 style={{ fontSize: '3rem', marginBottom: '15px' }}>AI Threat <span className="text-gradient">Analyzer</span></h1>
        <p style={{ color: 'var(--text-muted)' }}>Analyze suspicious links, messages, or screenshots instantly.</p>
      </div>

      <div className="glass-panel" style={{ padding: '30px', marginBottom: '30px' }}>
        <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', borderBottom: '1px solid var(--border-light)', paddingBottom: '15px' }}>
          {['link', 'text', 'image'].map(t => (
            <button 
              key={t}
              onClick={() => { setTab(t); setResult(null); setInputData(''); }}
              style={{
                background: tab === t ? 'rgba(0, 210, 255, 0.1)' : 'transparent',
                color: tab === t ? 'var(--accent-primary)' : 'var(--text-muted)',
                border: 'none', padding: '10px 20px', borderRadius: '8px', cursor: 'pointer', fontWeight: '600'
              }}
            >
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>

        {tab === 'image' ? (
          <div style={{ textAlign: 'center', padding: '40px', border: '2px dashed var(--border-light)', borderRadius: '12px' }}>
            <p>Upload a screenshot of a suspicious message.</p>
            <Button variant="secondary" style={{ marginTop: '15px' }}>Upload Image (Coming Soon)</Button>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            {tab === 'link' ? (
              <input 
                type="text" 
                className="input-glass" 
                placeholder="Enter URL (e.g. http://secure-update-bnk.com)" 
                value={inputData}
                onChange={(e) => setInputData(e.target.value)}
              />
            ) : (
              <textarea 
                className="input-glass" 
                placeholder="Paste the suspicious text message or email here..." 
                rows={5}
                value={inputData}
                onChange={(e) => setInputData(e.target.value)}
              />
            )}
            <Button variant="primary" onClick={handleAnalyze} disabled={loading || !inputData}>
              {loading ? 'Analyzing...' : 'Analyze Now'}
            </Button>
          </div>
        )}
      </div>

      {result && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h3 style={{ marginBottom: '15px' }}>Analysis Results</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
            <div className="glass-panel" style={{ padding: '20px', textAlign: 'center' }}>
              <div style={{ fontSize: '3rem', fontWeight: 'bold', color: result.trustScore < 50 ? 'var(--danger)' : 'var(--success)' }}>
                {result.trustScore}%
              </div>
              <div style={{ color: 'var(--text-muted)' }}>Trust Score</div>
            </div>
            <div className="glass-panel" style={{ padding: '20px', textAlign: 'center' }}>
              <div style={{ fontSize: '3rem', fontWeight: 'bold', color: result.riskLevel === 'Critical' || result.riskLevel === 'High' ? 'var(--danger)' : 'var(--warning)' }}>
                {result.riskLevel}
              </div>
              <div style={{ color: 'var(--text-muted)' }}>Risk Level</div>
            </div>
          </div>
          
          <AlertCard 
            title="Analysis Summary" 
            type={result.trustScore < 50 ? 'danger' : 'info'}
            description={(result.details || result.flags)?.join(' | ') || 'Analysis complete.'} 
          />
        </motion.div>
      )}
    </motion.div>
  );
};

export default AnalyzerPage;
