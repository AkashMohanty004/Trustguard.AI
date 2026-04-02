import React from 'react';
import { Shield, Mail, Globe } from 'lucide-react';

const Footer = () => {
  return (
    <footer style={{
      borderTop: '1px solid var(--border-light)',
      padding: '40px 20px',
      marginTop: 'auto',
      backgroundColor: 'rgba(6, 9, 19, 0.8)'
    }}>
      <div className="container" style={{
        display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '20px'
      }}>
        <div style={{ flex: '1', minWidth: '250px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '15px' }}>
            <Shield size={24} color="var(--accent-primary)" />
            <h3 style={{ margin: 0, fontSize: '1.2rem' }}>TrustGuard AI</h3>
          </div>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', maxWidth: '300px' }}>
            Empowering users with AI-driven cybersecurity insights to detect scams, phishing, and fraudulent job offers.
          </p>
        </div>
        
        <div style={{ display: 'flex', gap: '40px', flexWrap: 'wrap' }}>
          <div>
            <h4 style={{ marginBottom: '15px', color: '#fff' }}>Platform</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, color: 'var(--text-muted)' }}>
              <li style={{ marginBottom: '10px' }}><a href="/analyze">Analyzer</a></li>
              <li style={{ marginBottom: '10px' }}><a href="/scam-watch">Scam Watch</a></li>
              <li style={{ marginBottom: '10px' }}><a href="/blogs">Cybersecurity Blogs</a></li>
            </ul>
          </div>
          <div>
            <h4 style={{ marginBottom: '15px', color: '#fff' }}>Connect</h4>
            <div style={{ display: 'flex', gap: '15px' }}>
              <a href="#" style={{ color: 'var(--text-muted)' }}><Globe /></a>
              <a href="#" style={{ color: 'var(--text-muted)' }}><Mail /></a>
            </div>
          </div>
        </div>
      </div>
      <div style={{
        textAlign: 'center', marginTop: '40px', paddingTop: '20px',
        borderTop: '1px solid rgba(255, 255, 255, 0.05)', color: 'var(--text-muted)', fontSize: '0.85rem'
      }}>
        &copy; {new Date().getFullYear()} TrustGuard AI. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
