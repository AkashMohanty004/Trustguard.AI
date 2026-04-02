import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Button from '../components/Button';

const ReportScamPage = () => {
  const [formData, setFormData] = useState({
    title: '',
    type: 'Phishing',
    url: '',
    description: '',
    realWorldExamples: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('http://localhost:5000/api/scams', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    }).then(() => setSubmitted(true));
  };

  if (submitted) {
    return (
      <div style={{ textAlign: 'center', marginTop: '100px' }}>
        <h2>Report Submitted Successfully!</h2>
        <p style={{ color: 'var(--text-muted)' }}>Thank you for helping keep the community safe.</p>
        <Button variant="primary" onClick={() => window.location.href='/scam-watch'} style={{ marginTop: '20px' }}>
          Back to Scam Watch
        </Button>
      </div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ maxWidth: '600px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '10px', textAlign: 'center' }}>Report a <span className="text-gradient">Scam</span></h1>
      <p style={{ color: 'var(--text-muted)', textAlign: 'center', marginBottom: '30px' }}>Your report will be analyzed and added to the community watch list.</p>

      <form onSubmit={handleSubmit} className="glass-panel" style={{ padding: '30px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '8px' }}>Title</label>
          <input type="text" required className="input-glass" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} />
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: '8px' }}>Scam Type</label>
          <select className="input-glass" value={formData.type} onChange={e => setFormData({...formData, type: e.target.value})}>
            <option value="Phishing">Phishing</option>
            <option value="Job Scam">Job Scam</option>
            <option value="Fake Store">Fake Store</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: '8px' }}>Associated URL (Optional)</label>
          <input type="text" className="input-glass" value={formData.url} onChange={e => setFormData({...formData, url: e.target.value})} />
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: '8px' }}>Description</label>
          <textarea required className="input-glass" rows={4} value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})}></textarea>
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: '8px' }}>Real World Example (Optional)</label>
          <textarea className="input-glass" rows={3} value={formData.realWorldExamples} onChange={e => setFormData({...formData, realWorldExamples: e.target.value})}></textarea>
        </div>
        <Button variant="primary" type="submit" style={{ marginTop: '10px' }}>Submit Report</Button>
      </form>
    </motion.div>
  );
};

export default ReportScamPage;
