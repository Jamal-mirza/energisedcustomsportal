import React, { useState } from 'react';
import { Bot, RefreshCw, Send, CheckCircle, Search, Percent, AlertTriangle, User, Mail, Car, HelpCircle, ShieldAlert } from 'lucide-react';
import { initialSourcingQueue } from '../data/mockData';

export default function AISourcing() {
  const [queue, setQueue] = useState(initialSourcingQueue);
  const [loadingId, setLoadingId] = useState(null);
  const [loadingStep, setLoadingStep] = useState(0);

  const steps = [
    'Analyzing vehicle fitment parameters...',
    'Scanning supplier databases (GSF, Euro Car Parts, LKQ)...',
    'Matching OEM numbers & calculating margin...',
    'Drafting customer quote email...'
  ];

  const runAiMatch = (id) => {
    setLoadingId(id);
    setLoadingStep(0);

    // Progress through loading steps
    const interval = setInterval(() => {
      setLoadingStep(prev => {
        if (prev < steps.length - 1) {
          return prev + 1;
        } else {
          clearInterval(interval);
          completeMatch(id);
          return prev;
        }
      });
    }, 650);
  };

  const completeMatch = (id) => {
    setQueue(prevQueue => {
      return prevQueue.map(item => {
        if (item.id === id) {
          // Mock different results based on the vehicle
          if (item.vehicle.includes('Tesla')) {
            return {
              ...item,
              status: 'Matched',
              matchedPart: 'BOSCH Active Charcoal Cabin Filter (M3-2022)',
              supplierCost: 11.40,
              retailPrice: 22.99,
              margin: 50.4,
              emailDraft: `Hi ${item.customer},\n\nWe have successfully sourced the cabin filter for your 2022 Tesla Model 3. We can supply this for £22.99 with free next-day shipping. Click the link below to pay and secure your order.`
            };
          } else {
            // Range Rover
            return {
              ...item,
              status: 'Matched',
              matchedPart: 'Energized Gloss Black Rear Diffuser (Upgrade)',
              supplierCost: 35.00,
              retailPrice: 79.99,
              margin: 56.2,
              emailDraft: `Hi ${item.customer},\n\nWe have successfully sourced the Gloss Black Rear Bumper Diffuser Upgrade for your 2020 Land Rover Range Rover Velar. We can supply this for £79.99 with free next-day shipping. Click the link below to pay and secure your order.`
            };
          }
        }
        return item;
      });
    });
    setLoadingId(null);
  };

  const sendQuote = (id) => {
    setQueue(prevQueue => {
      return prevQueue.map(item => {
        if (item.id === id) {
          return {
            ...item,
            status: 'Quote Sent'
          };
        }
        return item;
      });
    });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      
      {/* Header */}
      <div>
        <h2 style={{ fontSize: '1.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Bot size={28} style={{ color: 'var(--brand-color)' }} />
          AI Sourcing Queue
        </h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginTop: '0.15rem' }}>
          Automatically match unstocked customer requests with supplier inventory using AI procurement mapping.
        </p>
      </div>

      {/* Sourcing Cards Queue */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {queue.map(item => (
          <div 
            key={item.id}
            style={{ 
              backgroundColor: 'var(--bg-secondary)', 
              border: '1px solid var(--border-color)', 
              borderRadius: 'var(--radius-lg)', 
              padding: '1.75rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.5rem',
              position: 'relative'
            }}
          >
            {/* Top Row: Customer Info */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
              <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
                <div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', textTransform: 'uppercase', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                    <User size={12} /> Customer
                  </div>
                  <div style={{ fontWeight: 'bold', fontSize: '0.95rem', marginTop: '0.15rem' }}>{item.customer}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{item.email}</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', textTransform: 'uppercase', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                    <Car size={12} /> Vehicle
                  </div>
                  <div style={{ fontWeight: 'bold', fontSize: '0.95rem', marginTop: '0.15rem' }}>{item.vehicle}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Received {item.timeReceived}</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', textTransform: 'uppercase', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                    <HelpCircle size={12} /> Part Requested
                  </div>
                  <div style={{ fontWeight: 'bold', fontSize: '0.95rem', marginTop: '0.15rem', color: 'var(--brand-color)' }}>{item.partRequested}</div>
                </div>
              </div>

              {/* Status Badge */}
              <div>
                {item.status === 'Pending AI Match' && (
                  <span className="badge" style={{ backgroundColor: 'rgba(243, 112, 33, 0.1)', color: 'var(--brand-color)', border: '1px solid rgba(243, 112, 33, 0.2)' }}>
                    <Bot size={12} className="spin" style={{ animationDuration: '3s' }} />
                    Pending AI Match
                  </span>
                )}
                {item.status === 'Matched' && (
                  <span className="badge" style={{ backgroundColor: 'rgba(255, 184, 0, 0.1)', color: '#ffb800', border: '1px solid rgba(255, 184, 0, 0.2)' }}>
                    <Search size={12} />
                    Sourcing Matched
                  </span>
                )}
                {item.status === 'Quote Sent' && (
                  <span className="badge badge-success">
                    <CheckCircle size={12} />
                    Quote Sent & Emailed
                  </span>
                )}
              </div>
            </div>

            {/* Middle Row: AI Processing or AI Result */}
            {loadingId === item.id && (
              <div style={{ backgroundColor: 'var(--bg-primary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <h4 style={{ fontSize: '0.85rem', color: 'var(--brand-color)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <RefreshCw className="spin" size={14} />
                  Running AI Procurement Matcher...
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {steps.map((step, idx) => (
                    <div 
                      key={idx} 
                      style={{ 
                        fontSize: '0.8rem', 
                        color: idx < loadingStep ? 'var(--success-color)' : idx === loadingStep ? 'var(--text-primary)' : 'var(--text-muted)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem'
                      }}
                    >
                      {idx < loadingStep ? <CheckCircle size={12} /> : idx === loadingStep ? <div className="loading-spinner-small" style={{ width: '12px', height: '12px' }} /> : <div style={{ width: '12px', height: '12px', borderRadius: '50%', border: '1px solid var(--border-color)' }} />}
                      <span>{step}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {item.status !== 'Pending AI Match' && item.matchedPart && (
              <div 
                style={{ 
                  backgroundColor: 'var(--bg-primary)', 
                  border: '1px solid var(--border-color)', 
                  borderRadius: 'var(--radius-md)', 
                  padding: '1.5rem',
                  display: 'grid',
                  gridTemplateColumns: '1.2fr 0.8fr',
                  gap: '2rem'
                }}
              >
                {/* Left Column: Sourced Part Details */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div>
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', textTransform: 'uppercase', fontWeight: 600 }}>Sourced Supplier Part</span>
                    <h4 style={{ fontSize: '1rem', fontWeight: 'bold', color: 'var(--text-primary)', marginTop: '0.15rem' }}>{item.matchedPart}</h4>
                  </div>

                  <div style={{ display: 'flex', gap: '2rem' }}>
                    <div>
                      <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Supplier Cost</span>
                      <div style={{ fontSize: '1.1rem', fontWeight: 'bold', marginTop: '0.15rem' }}>£{item.supplierCost.toFixed(2)}</div>
                    </div>
                    <div>
                      <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Recommended Retail</span>
                      <div style={{ fontSize: '1.1rem', fontWeight: 'bold', color: 'var(--brand-color)', marginTop: '0.15rem' }}>£{item.retailPrice.toFixed(2)}</div>
                    </div>
                    <div>
                      <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Gross Margin</span>
                      <div style={{ fontSize: '1.1rem', fontWeight: 'bold', color: 'var(--success-color)', display: 'flex', alignItems: 'center', gap: '0.15rem', marginTop: '0.15rem' }}>
                        <Percent size={14} /> {item.margin.toFixed(1)}%
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column: Email Draft */}
                <div style={{ borderLeft: '1px solid var(--border-color)', paddingLeft: '2rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', textTransform: 'uppercase', fontWeight: 600 }}>Generated Email Draft</span>
                  <textarea 
                    readOnly
                    value={item.emailDraft}
                    style={{ 
                      width: '100%', 
                      height: '80px', 
                      backgroundColor: 'var(--bg-tertiary)', 
                      border: '1px solid var(--border-color)', 
                      borderRadius: 'var(--radius-sm)', 
                      padding: '0.5rem', 
                      fontSize: '0.75rem', 
                      resize: 'none',
                      color: 'var(--text-secondary)'
                    }}
                  />
                  {item.status === 'Matched' && (
                    <button 
                      onClick={() => sendQuote(item.id)}
                      className="btn-primary btn" 
                      style={{ width: '100%', height: '36px', fontSize: '0.8rem', display: 'flex', gap: '0.5rem', justifyContent: 'center' }}
                    >
                      <Send size={14} />
                      Approve & Send Quote
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* Bottom Row: Actions */}
            {item.status === 'Pending AI Match' && loadingId !== item.id && (
              <div style={{ display: 'flex', justifyContent: 'flex-end', borderTop: '1px solid var(--border-color)', paddingTop: '1rem' }}>
                <button 
                  onClick={() => runAiMatch(item.id)}
                  className="btn-primary btn" 
                  style={{ display: 'flex', gap: '0.5rem', height: '38px', fontSize: '0.8rem' }}
                >
                  <Bot size={16} />
                  Run AI Supplier Match
                </button>
              </div>
            )}

          </div>
        ))}
      </div>

    </div>
  );
}
