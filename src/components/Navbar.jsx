import React from 'react';
import { ShieldCheck, LayoutDashboard, Car, ArrowRightLeft, History, Search, Wallet } from 'lucide-react';

/**
 * Navbar Component
 * Displays application branding and navigation links for Phase 1.
 */
export default function Navbar({ activeTab, setActiveTab }) {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'register', label: 'Register Vehicle', icon: Car },
    { id: 'transfer', label: 'Transfer Ownership', icon: ArrowRightLeft },
    { id: 'history', label: 'Vehicle History', icon: History },
    { id: 'verify', label: 'Verify Vehicle', icon: Search },
  ];

  return (
    <header className="app-header">
      <div className="nav-container">
        {/* Brand Logo & Title */}
        <div className="brand-section" onClick={() => setActiveTab('dashboard')} style={{ cursor: 'pointer' }}>
          <div className="brand-icon">
            <ShieldCheck size={26} />
          </div>
          <div>
            <h1 className="brand-title">Vehicle Ownership Transfer</h1>
            <span className="brand-subtitle">Blockchain Title Registry System</span>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav>
          <ul className="nav-links">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <li key={item.id}>
                  <button
                    id={`nav-btn-${item.id}`}
                    className={`nav-button ${isActive ? 'active' : ''}`}
                    onClick={() => setActiveTab(item.id)}
                  >
                    <Icon size={18} />
                    <span>{item.label}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </header>
  );
}
