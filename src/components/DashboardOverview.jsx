import React from 'react';
import { ShoppingBag, Hourglass, Zap, Sparkles, CheckCircle2, AlertTriangle, ArrowUpRight } from 'lucide-react';
import { mockOrders } from '../data/mockData';

export default function DashboardOverview({ user, onTabChange }) {
  // Stats calculations
  const totalOrders = mockOrders.length;
  const autoDispatched = mockOrders.filter(o => o.status === 'Auto-Dispatched').length;
  const awaitingSourcing = mockOrders.filter(o => o.status === 'Awaiting Sourcing').length;
  
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      
      {/* Welcome Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: '1.75rem' }}>Welcome back, <span style={{ color: 'var(--brand-color)' }}>{user.name}</span>!</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginTop: '0.15rem' }}>
            System Role: <strong>{user.role}</strong> &bull; Telford Warehouse Portal
          </p>
        </div>
        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', backgroundColor: 'var(--bg-secondary)', padding: '0.5rem 1rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)' }}>
          Active Session &bull; Secure connection
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem' }}>
        
        {/* Card 1: Orders */}
        <div style={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-lg)', padding: '1.5rem', display: 'flex', justifySelf: 'stretch', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', textTransform: 'uppercase', fontWeight: 600 }}>Total Orders Today</span>
            <h3 style={{ fontSize: '2rem', marginTop: '0.25rem' }}>142</h3>
            <span style={{ fontSize: '0.7rem', color: 'var(--success-color)', display: 'flex', alignItems: 'center', gap: '0.15rem', marginTop: '0.25rem' }}>
              <ArrowUpRight size={12} /> +12.4% vs yesterday
            </span>
          </div>
          <div style={{ backgroundColor: 'rgba(var(--brand-color-rgb), 0.1)', color: 'var(--brand-color)', padding: '0.75rem', borderRadius: 'var(--radius-md)' }}>
            <ShoppingBag size={24} />
          </div>
        </div>

        {/* Card 2: Sourcing Queue */}
        <div 
          onClick={() => onTabChange('sourcing')}
          style={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-lg)', padding: '1.5rem', display: 'flex', justifySelf: 'stretch', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', transition: 'var(--transition-smooth)' }}
          className="kpi-interactive-card"
        >
          <div>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', textTransform: 'uppercase', fontWeight: 600 }}>Sourcing Queue</span>
            <h3 style={{ fontSize: '2rem', marginTop: '0.25rem', color: awaitingSourcing > 0 ? '#ffb800' : 'var(--text-primary)' }}>
              {awaitingSourcing}
            </h3>
            <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', display: 'block', marginTop: '0.25rem' }}>
              Awaiting supplier match
            </span>
          </div>
          <div style={{ backgroundColor: 'rgba(255, 184, 0, 0.1)', color: '#ffb800', padding: '0.75rem', borderRadius: 'var(--radius-md)' }}>
            <Hourglass size={24} />
          </div>
        </div>

        {/* Card 3: Shipping Automation Rate */}
        <div 
          onClick={() => onTabChange('automation')}
          style={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-lg)', padding: '1.5rem', display: 'flex', justifySelf: 'stretch', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', transition: 'var(--transition-smooth)' }}
          className="kpi-interactive-card"
        >
          <div>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', textTransform: 'uppercase', fontWeight: 600 }}>Shipping Auto-Rate</span>
            <h3 style={{ fontSize: '2rem', marginTop: '0.25rem', color: 'var(--success-color)' }}>94.2%</h3>
            <span style={{ fontSize: '0.7rem', color: 'var(--success-color)', display: 'block', marginTop: '0.25rem' }}>
              Auto-dispatched via DPD
            </span>
          </div>
          <div style={{ backgroundColor: 'rgba(16, 185, 129, 0.1)', color: 'var(--success-color)', padding: '0.75rem', borderRadius: 'var(--radius-md)' }}>
            <Zap size={24} />
          </div>
        </div>

        {/* Card 4: Hours Saved */}
        <div style={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-lg)', padding: '1.5rem', display: 'flex', justifySelf: 'stretch', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', textTransform: 'uppercase', fontWeight: 600 }}>Staff Hours Saved</span>
            <h3 style={{ fontSize: '2rem', marginTop: '0.25rem', color: 'var(--brand-color)' }}>42.5 hrs</h3>
            <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', display: 'block', marginTop: '0.25rem' }}>
              This week (via automation)
            </span>
          </div>
          <div style={{ backgroundColor: 'rgba(var(--brand-color-rgb), 0.1)', color: 'var(--brand-color)', padding: '0.75rem', borderRadius: 'var(--radius-md)' }}>
            <Sparkles size={24} />
          </div>
        </div>

      </div>

      {/* Recent Orders Table */}
      <div style={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-lg)', padding: '1.75rem' }}>
        <h3 style={{ fontSize: '1.1rem', marginBottom: '1.25rem' }}>Recent Incoming Orders</h3>
        
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-secondary)', fontWeight: 600 }}>
                <th style={{ padding: '0.75rem 1rem' }}>Order ID</th>
                <th style={{ padding: '0.75rem 1rem' }}>Customer</th>
                <th style={{ padding: '0.75rem 1rem' }}>Vehicle Model</th>
                <th style={{ padding: '0.75rem 1rem' }}>Component Ordered</th>
                <th style={{ padding: '0.75rem 1rem', textAlign: 'right' }}>Total</th>
                <th style={{ padding: '0.75rem 1rem', textAlign: 'center' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {mockOrders.map(order => (
                <tr key={order.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '1rem', fontWeight: 700, color: 'var(--text-primary)' }}>{order.id}</td>
                  <td style={{ padding: '1rem' }}>{order.customer}</td>
                  <td style={{ padding: '1rem', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>{order.vehicle}</td>
                  <td style={{ padding: '1rem', fontSize: '0.85rem' }}>{order.parts}</td>
                  <td style={{ padding: '1rem', textAlign: 'right', fontWeight: 600 }}>£{order.total.toFixed(2)}</td>
                  <td style={{ padding: '1rem', textAlign: 'center' }}>
                    {order.status === 'Auto-Dispatched' ? (
                      <span className="badge badge-success" style={{ padding: '0.2rem 0.5rem', fontSize: '0.7rem' }}>
                        <CheckCircle2 size={10} />
                        Auto-Dispatched
                      </span>
                    ) : (
                      <span className="badge" style={{ padding: '0.2rem 0.5rem', fontSize: '0.7rem', backgroundColor: 'rgba(255, 184, 0, 0.15)', color: '#ffb800', border: '1px solid rgba(255, 184, 0, 0.3)' }}>
                        <AlertTriangle size={10} />
                        Awaiting Sourcing
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
