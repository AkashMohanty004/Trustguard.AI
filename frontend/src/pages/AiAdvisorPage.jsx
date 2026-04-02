import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Button from '../components/Button';
import { Send, Bot } from 'lucide-react';

const AiAdvisorPage = () => {
  const [messages, setMessages] = useState([
    { text: "Hello! I am the TrustGuard AI Advisor. You can ask me about suspicious emails, texts, or job offers, and I'll help you recognize if it's a scam.", sender: 'bot' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMsg = { text: input, sender: 'user' };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/analyze/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMsg.text })
      });
      const data = await response.json();
      setMessages(prev => [...prev, { text: data.reply, sender: 'bot' }]);
    } catch(err) {
      setMessages(prev => [...prev, { text: "Sorry, I am having trouble connecting.", sender: 'bot' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ maxWidth: '800px', margin: '0 auto', height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div style={{ textAlign: 'center', marginBottom: '30px' }}>
        <h1 style={{ fontSize: '3rem', marginBottom: '10px' }}>AI <span className="text-gradient">Advisor</span></h1>
        <p style={{ color: 'var(--text-muted)' }}>Chat with our AI to get immediate advice on potential scams.</p>
      </div>

      <div className="glass-panel" style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', height: '60vh', padding: '20px' }}>
        <div style={{ flexGrow: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '15px', paddingRight: '10px' }}>
          {messages.map((msg, idx) => (
            <div key={idx} style={{
              alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
              background: msg.sender === 'user' ? 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))' : 'rgba(255,255,255,0.05)',
              padding: '12px 18px',
              borderRadius: '16px',
              borderBottomRightRadius: msg.sender === 'user' ? '4px' : '16px',
              borderBottomLeftRadius: msg.sender === 'bot' ? '4px' : '16px',
              maxWidth: '80%',
              display: 'flex', gap: '10px'
            }}>
              {msg.sender === 'bot' && <Bot size={20} style={{ marginTop: '2px', color: 'var(--accent-primary)' }} />}
              <span style={{ lineHeight: '1.5' }}>{msg.text}</span>
            </div>
          ))}
          {loading && (
             <div style={{ alignSelf: 'flex-start', background: 'rgba(255,255,255,0.05)', padding: '12px 18px', borderRadius: '16px', borderBottomLeftRadius: '4px' }}>
               Typing...
             </div>
          )}
        </div>
        
        <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
          <input 
            type="text" 
            className="input-glass" 
            placeholder="Type your question..." 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          />
          <Button variant="primary" onClick={handleSend} style={{ padding: '0 20px' }}>
            <Send size={18} />
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default AiAdvisorPage;
