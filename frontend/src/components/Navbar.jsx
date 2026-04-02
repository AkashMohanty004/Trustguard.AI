import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Shield, Menu, X, Search, BookOpen, AlertTriangle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const location = useLocation();

  const links = [
    { name: 'Home', path: '/' },
    { name: 'Analyzer', path: '/analyze', icon: <Search size={18} /> },
    { name: 'Scam Watch', path: '/scam-watch', icon: <AlertTriangle size={18} /> },
    { name: 'Blogs', path: '/blogs', icon: <BookOpen size={18} /> },
  ];

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="glass-panel" style={{
      position: 'fixed', top: '15px', left: '20px', right: '20px', zIndex: 50,
      padding: '15px 30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center'
    }}>
      <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <Shield size={32} color="var(--accent-primary)" />
        <h2 className="text-gradient" style={{ margin: 0, fontSize: '1.5rem' }}>TrustGuard AI</h2>
      </Link>

      <div className="desktop-links" style={{ display: 'flex', gap: '30px', alignItems: 'center' }}>
        {links.map((link) => (
          <Link key={link.name} to={link.path} style={{
            display: 'flex', alignItems: 'center', gap: '6px',
            color: location.pathname === link.path ? 'var(--accent-primary)' : 'var(--text-main)',
            fontWeight: location.pathname === link.path ? '600' : '400',
            transition: 'color 0.2s ease'
          }}>
            {link.icon}
            {link.name}
          </Link>
        ))}
        <Link to="/report" className="btn btn-primary" style={{ padding: '8px 16px', fontSize: '0.9rem' }}>Report Scam</Link>
      </div>
      
      {/* Mobile Menu Icon (simple implementation without full responsive breakpoint styles yet) */}
      <div className="mobile-toggle" style={{ display: 'none' }}>
         <Menu />
      </div>
    </nav>
  );
};

export default Navbar;
