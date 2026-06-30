import React, { useState, useEffect, useRef } from 'react';
import { Play, RefreshCw, Terminal, CheckCircle2, AlertCircle, Info, Cpu, Zap, ShoppingCart, Truck, Mail } from 'lucide-react';
import { automationLogSteps } from '../data/mockData';

export default function AutomationConsole() {
  const [isRunning, setIsRunning] = useState(false);
  const [logs, setLogs] = useState([]);
  const [activeNode, setActiveNode] = useState(0); // 0: Idle, 1: Trigger, 2: Security, 3: Inventory, 4: Shipping, 5: Notify
  const logEndRef = useRef(null);

  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  const startSimulation = () => {
    setIsRunning(true);
    setLogs([]);
    setActiveNode(1); // Shopify Trigger

    // Run steps in sequence
    automationLogSteps.forEach(step => {
      setTimeout(() => {
        // Append log
        setLogs(prev => [...prev, step]);
        
        // Update active visual node based on log message
        if (step.message.includes('fraud')) {
          setActiveNode(2); // Security Node
        } else if (step.message.includes('warehouse')) {
          setActiveNode(3); // Inventory Node
        } else if (step.message.includes('DPD')) {
          setActiveNode(4); // Shipping Node
        } else if (step.message.includes('SMS')) {
          setActiveNode(5); // Notification Node
        } else if (step.message.includes('fully automated')) {
          setActiveNode(6); // Success Node
          setIsRunning(false);
        }
      }, step.timeOffset);
    });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      
      {/* Header */}
      <div>
        <h2 style={{ fontSize: '1.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Zap size={28} style={{ color: 'var(--brand-color)' }} />
          Fulfillment Automation Console
        </h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginTop: '0.15rem' }}>
          Simulate the automated order dispatch pipeline. Watch Shopify checkout data trigger DPD label creation and customer SMS notifications.
        </p>
      </div>

      {/* Visual Pipeline Map */}
      <div 
        style={{ 
          backgroundColor: 'var(--bg-secondary)', 
          border: '1px solid var(--border-color)', 
          borderRadius: 'var(--radius-lg)', 
          padding: '2rem',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <h3 style={{ fontSize: '1rem', marginBottom: '2rem', textAlign: 'center' }}>Automated Dispatch Workflow</h3>
        
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem', flexWrap: 'wrap', position: 'relative' }}>
          
          {/* Node 1: Trigger */}
          <div 
            style={{ 
              flex: 1, 
              minWidth: '130px', 
              backgroundColor: activeNode === 1 ? 'rgba(243, 112, 33, 0.1)' : 'var(--bg-tertiary)',
              border: activeNode === 1 ? '1px solid var(--brand-color)' : '1px solid var(--border-color)',
              padding: '1rem', 
              borderRadius: 'var(--radius-md)', 
              textAlign: 'center',
              boxShadow: activeNode === 1 ? 'var(--shadow-brand)' : 'none',
              transition: 'var(--transition-smooth)'
            }}
          >
            <ShoppingCart size={20} style={{ color: activeNode === 1 ? 'var(--brand-color)' : 'var(--text-secondary)', margin: '0 auto 0.5rem' }} />
            <div style={{ fontSize: '0.8rem', fontWeight: 'bold' }}>1. Shopify Webhook</div>
            <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', marginTop: '0.15rem' }}>Order Trigger</div>
          </div>

          <div style={{ width: '20px', height: '2px', backgroundColor: activeNode > 1 ? 'var(--brand-color)' : 'var(--border-color)', transition: 'var(--transition-smooth)' }} />

          {/* Node 2: Fraud Check */}
          <div 
            style={{ 
              flex: 1, 
              minWidth: '130px', 
              backgroundColor: activeNode === 2 ? 'rgba(243, 112, 33, 0.1)' : 'var(--bg-tertiary)',
              border: activeNode === 2 ? '1px solid var(--brand-color)' : '1px solid var(--border-color)',
              padding: '1rem', 
              borderRadius: 'var(--radius-md)', 
              textAlign: 'center',
              boxShadow: activeNode === 2 ? 'var(--shadow-brand)' : 'none',
              transition: 'var(--transition-smooth)'
            }}
          >
            <Cpu size={20} style={{ color: activeNode === 2 ? 'var(--brand-color)' : 'var(--text-secondary)', margin: '0 auto 0.5rem' }} />
            <div style={{ fontSize: '0.8rem', fontWeight: 'bold' }}>2. Fraud Analysis</div>
            <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', marginTop: '0.15rem' }}>Risk Evaluation</div>
          </div>

          <div style={{ width: '20px', height: '2px', backgroundColor: activeNode > 2 ? 'var(--brand-color)' : 'var(--border-color)', transition: 'var(--transition-smooth)' }} />

          {/* Node 3: ERP Check */}
          <div 
            style={{ 
              flex: 1, 
              minWidth: '130px', 
              backgroundColor: activeNode === 3 ? 'rgba(243, 112, 33, 0.1)' : 'var(--bg-tertiary)',
              border: activeNode === 3 ? '1px solid var(--brand-color)' : '1px solid var(--border-color)',
              padding: '1rem', 
              borderRadius: 'var(--radius-md)', 
              textAlign: 'center',
              boxShadow: activeNode === 3 ? 'var(--shadow-brand)' : 'none',
              transition: 'var(--transition-smooth)'
            }}
          >
            <Cpu size={20} style={{ color: activeNode === 3 ? 'var(--brand-color)' : 'var(--text-secondary)', margin: '0 auto 0.5rem' }} />
            <div style={{ fontSize: '0.8rem', fontWeight: 'bold' }}>3. Warehouse Stock</div>
            <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', marginTop: '0.15rem' }}>ERP Reservation</div>
          </div>

          <div style={{ width: '20px', height: '2px', backgroundColor: activeNode > 3 ? 'var(--brand-color)' : 'var(--border-color)', transition: 'var(--transition-smooth)' }} />

          {/* Node 4: DPD Booking */}
          <div 
            style={{ 
              flex: 1, 
              minWidth: '130px', 
              backgroundColor: activeNode === 4 ? 'rgba(243, 112, 33, 0.1)' : 'var(--bg-tertiary)',
              border: activeNode === 4 ? '1px solid var(--brand-color)' : '1px solid var(--border-color)',
              padding: '1rem', 
              borderRadius: 'var(--radius-md)', 
              textAlign: 'center',
              boxShadow: activeNode === 4 ? 'var(--shadow-brand)' : 'none',
              transition: 'var(--transition-smooth)'
            }}
          >
            <Truck size={20} style={{ color: activeNode === 4 ? 'var(--brand-color)' : 'var(--text-secondary)', margin: '0 auto 0.5rem' }} />
            <div style={{ fontSize: '0.8rem', fontWeight: 'bold' }}>4. DPD Shipping API</div>
            <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', marginTop: '0.15rem' }}>Label Generation</div>
          </div>

          <div style={{ width: '20px', height: '2px', backgroundColor: activeNode > 4 ? 'var(--brand-color)' : 'var(--border-color)', transition: 'var(--transition-smooth)' }} />

          {/* Node 5: Twilio SMS */}
          <div 
            style={{ 
              flex: 1, 
              minWidth: '130px', 
              backgroundColor: activeNode === 5 ? 'rgba(243, 112, 33, 0.1)' : 'var(--bg-tertiary)',
              border: activeNode === 5 ? '1px solid var(--brand-color)' : '1px solid var(--border-color)',
              padding: '1rem', 
              borderRadius: 'var(--radius-md)', 
              textAlign: 'center',
              boxShadow: activeNode === 5 ? 'var(--shadow-brand)' : 'none',
              transition: 'var(--transition-smooth)'
            }}
          >
            <Mail size={20} style={{ color: activeNode === 5 ? 'var(--brand-color)' : 'var(--text-secondary)', margin: '0 auto 0.5rem' }} />
            <div style={{ fontSize: '0.8rem', fontWeight: 'bold' }}>5. Twilio Notify</div>
            <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', marginTop: '0.15rem' }}>SMS Dispatch Alert</div>
          </div>

        </div>
      </div>

      {/* Terminal Logs & Trigger */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '2rem', alignItems: 'start' }}>
        
        {/* Terminal Logger */}
        <div style={{ backgroundColor: '#000000', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-lg)', padding: '1.5rem', fontFamily: 'monospace' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', borderBottom: '1px solid #222', paddingBottom: '0.75rem', marginBottom: '1rem', color: 'var(--text-secondary)', fontSize: '0.8rem' }}>
            <Terminal size={14} />
            <span>Operational Automation Log</span>
            {isRunning && <RefreshCw className="spin" size={12} style={{ marginLeft: 'auto', color: 'var(--brand-color)' }} />}
          </div>
          
          <div style={{ minHeight: '240px', maxHeight: '240px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.8rem', lineHeight: '1.4' }}>
            {logs.length > 0 ? (
              logs.map((log, idx) => {
                let color = '#fff';
                if (log.type === 'success') color = 'var(--success-color)';
                if (log.type === 'complete') color = 'var(--brand-color)';
                return (
                  <div key={idx} style={{ color }}>
                    {log.message}
                  </div>
                );
              })
            ) : (
              <div style={{ color: '#555', textAlign: 'center', padding: '5rem 0' }}>
                System Idle. Click "Trigger Simulated Order" to run pipeline.
              </div>
            )}
            <div ref={logEndRef} />
          </div>
        </div>

        {/* Controls and Information */}
        <div style={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-lg)', padding: '1.75rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <h3 style={{ fontSize: '1.1rem' }}>Automation Controller</h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
            Triggering this simulation runs a mock transaction through our backend API pipeline. It simulates the exact automated data flow that replaces manual staff copy-pasting.
          </p>

          <button 
            onClick={startSimulation}
            disabled={isRunning}
            className="btn-primary btn" 
            style={{ width: '100%', height: '44px', display: 'flex', gap: '0.5rem', justifyContent: 'center' }}
          >
            <Play size={16} />
            {isRunning ? 'Running Dispatch...' : 'Trigger Simulated Order'}
          </button>
          
          <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1rem', fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <div style={{ display: 'flex', gap: '0.35rem', alignItems: 'center' }}>
              <CheckCircle2 size={14} style={{ color: 'var(--success-color)' }} />
              <span>Shopify API Hook: ACTIVE</span>
            </div>
            <div style={{ display: 'flex', gap: '0.35rem', alignItems: 'center' }}>
              <CheckCircle2 size={14} style={{ color: 'var(--success-color)' }} />
              <span>DPD Shipping API: CONNECTED</span>
            </div>
            <div style={{ display: 'flex', gap: '0.35rem', alignItems: 'center' }}>
              <CheckCircle2 size={14} style={{ color: 'var(--success-color)' }} />
              <span>Twilio SMS API: ACTIVE</span>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
