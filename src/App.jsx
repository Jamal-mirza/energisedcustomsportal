import React, { useState } from 'react';
import Login from './components/Login';
import DashboardOverview from './components/DashboardOverview';
import AISourcing from './components/AISourcing';
import AutomationConsole from './components/AutomationConsole';
import Analytics from './components/Analytics';
import { LayoutDashboard, Bot, Zap, BarChart3, LogOut, ShieldAlert } from 'lucide-react';
import './App.css';

export default function App() {
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');

  const handleLogin = (matchedUser) => {
    setUser(matchedUser);
    setActiveTab('overview');
  };

  const handleLogout = () => {
    setUser(null);
  };

  if (!user) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="admin-container">
      {/* Sidebar Navigation */}
      <aside className="admin-sidebar">
        <div className="sidebar-logo">
          <div className="sidebar-logo-icon">E</div>
          <div className="sidebar-logo-text">
            ENERGIZED<span>CUSTOMS</span>
          </div>
        </div>

        <nav className="sidebar-menu">
          <button 
            onClick={() => setActiveTab('overview')}
            className={`menu-item ${activeTab === 'overview' ? 'active' : ''}`}
          >
            <LayoutDashboard size={18} />
            Overview
          </button>
          
          <button 
            onClick={() => setActiveTab('sourcing')}
            className={`menu-item ${activeTab === 'sourcing' ? 'active' : ''}`}
          >
            <Bot size={18} />
            AI Sourcing Queue
          </button>
          
          <button 
            onClick={() => setActiveTab('automation')}
            className={`menu-item ${activeTab === 'automation' ? 'active' : ''}`}
          >
            <Zap size={18} />
            Fulfillment Auto
          </button>
          
          <button 
            onClick={() => setActiveTab('analytics')}
            className={`menu-item ${activeTab === 'analytics' ? 'active' : ''}`}
          >
            <BarChart3 size={18} />
            BI & Analytics
          </button>
        </nav>

        <div className="sidebar-footer">
          {/* User Profile Info */}
          <div className="user-profile">
            <div className="user-avatar">
              {user.avatar}
            </div>
            <div className="user-info">
              <span className="user-name">{user.name}</span>
              <span className="user-role">{user.role}</span>
            </div>
          </div>

          {/* Logout Button */}
          <button 
            onClick={handleLogout}
            className="menu-item" 
            style={{ color: 'var(--error-color)', paddingLeft: '0.5rem' }}
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Panel Content */}
      <main className="admin-main">
        {activeTab === 'overview' && (
          <DashboardOverview 
            user={user} 
            onTabChange={setActiveTab} 
          />
        )}
        {activeTab === 'sourcing' && (
          <AISourcing />
        )}
        {activeTab === 'automation' && (
          <AutomationConsole />
        )}
        {activeTab === 'analytics' && (
          <Analytics />
        )}
      </main>
    </div>
  );
}
