import React, { useState } from 'react';
import { ShieldAlert, LogIn, Key, Mail, ShieldCheck } from 'lucide-react';
import { users } from '../data/mockData';

export default function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    const matchedUser = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    
    if (matchedUser) {
      onLogin(matchedUser);
    } else {
      setError('Invalid email or password. Try using one of the demo logins below.');
    }
  };

  const handleQuickLogin = (demoEmail) => {
    setEmail(demoEmail);
    setPassword('password123');
    const matchedUser = users.find(u => u.email === demoEmail);
    if (matchedUser) {
      onLogin(matchedUser);
    }
  };

  return (
    <div 
      style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        minHeight: '80vh', 
        padding: '2rem' 
      }}
    >
      <div 
        className="login-card"
        style={{
          maxWidth: '440px',
          width: '100%',
          backgroundColor: 'var(--bg-secondary)',
          border: '1px solid var(--border-color)',
          borderRadius: 'var(--radius-lg)',
          padding: '2.5rem',
          boxShadow: 'var(--shadow-lg)',
          position: 'relative'
        }}
      >
        {/* Decorative top border */}
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '4px', background: 'linear-gradient(to right, var(--brand-color), #ff8c42)', borderRadius: 'var(--radius-lg) var(--radius-lg) 0 0' }} />

        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div 
            style={{ 
              display: 'inline-flex', 
              background: 'linear-gradient(135deg, var(--brand-color) 0%, #ff8c42 100%)',
              padding: '0.5rem',
              borderRadius: 'var(--radius-md)',
              color: '#fff',
              marginBottom: '1rem',
              boxShadow: 'var(--shadow-brand)'
            }}
          >
            <ShieldCheck size={32} />
          </div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 800 }}>ENERGIZED CUSTOMS</h1>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginTop: '0.25rem' }}>
            Internal Operations & AI Portal
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
            <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: 600 }}>Staff Email</label>
            <div style={{ position: 'relative' }}>
              <Mail size={16} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <input 
                type="email" 
                required 
                placeholder="nathan@energizedcustoms.co.uk"
                className="search-input" 
                style={{ padding: '0.65rem 1rem 0.65rem 2.5rem', width: '100%' }}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
            <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: 600 }}>Password</label>
            <div style={{ position: 'relative' }}>
              <Key size={16} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <input 
                type="password" 
                required 
                placeholder="••••••••"
                className="search-input" 
                style={{ padding: '0.65rem 1rem 0.65rem 2.5rem', width: '100%' }}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          {error && (
            <div style={{ display: 'flex', gap: '0.5rem', color: 'var(--error-color)', fontSize: '0.8rem', alignItems: 'center' }}>
              <ShieldAlert size={14} />
              <span>{error}</span>
            </div>
          )}

          <button 
            type="submit" 
            className="btn-primary btn" 
            style={{ width: '100%', height: '44px', display: 'flex', gap: '0.5rem', justifyContent: 'center', marginTop: '0.5rem' }}
          >
            <LogIn size={16} />
            Secure Login
          </button>
        </form>

        {/* Demo Accounts Quick Click */}
        <div style={{ marginTop: '2.5rem', borderTop: '1px solid var(--border-color)', paddingTop: '1.5rem' }}>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.75rem', textAlign: 'center', fontWeight: 600 }}>
            DEMO SIGN IN (Click to log in instantly)
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <button 
              onClick={() => handleQuickLogin('nathan@energizedcustoms.co.uk')}
              className="btn-glass btn" 
              style={{ width: '100%', fontSize: '0.8rem', padding: '0.5rem', textTransform: 'none', display: 'flex', justifyContent: 'space-between' }}
            >
              <span>Login as <strong>Nathan</strong></span>
              <span style={{ color: 'var(--brand-color)', fontWeight: 'bold' }}>Director</span>
            </button>
            <button 
              onClick={() => handleQuickLogin('jamal@energizedcustoms.co.uk')}
              className="btn-glass btn" 
              style={{ width: '100%', fontSize: '0.8rem', padding: '0.5rem', textTransform: 'none', display: 'flex', justifyContent: 'space-between' }}
            >
              <span>Login as <strong>Jamal</strong></span>
              <span style={{ color: 'var(--brand-color)', fontWeight: 'bold' }}>Associate</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
