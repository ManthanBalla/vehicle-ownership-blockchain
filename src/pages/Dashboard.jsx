import React from 'react';
import { Car, ArrowRightLeft, History, Search, ShieldCheck, Cpu, Database, FileText } from 'lucide-react';

/**
 * Dashboard Page (Homepage)
 * Provides an overview of the system, quick statistics, and shortcuts.
 */
export default function Dashboard({ setActiveTab }) {
  const stats = [
    { label: 'Registered Vehicles', value: '1,240+', icon: Car },
    { label: 'Successful Transfers', value: '850+', icon: ArrowRightLeft },
    { label: 'Verified Title Records', value: '100%', icon: ShieldCheck },
    { label: 'Current Phase', value: 'Phase 1 (UI)', icon: Cpu },
  ];

  const features = [
    {
      id: 'register',
      title: 'Register Vehicle',
      desc: 'Create an immutable vehicle registration record linked to the owner.',
      icon: Car,
    },
    {
      id: 'transfer',
      title: 'Transfer Ownership',
      desc: 'Seamlessly transfer vehicle ownership between verified addresses.',
      icon: ArrowRightLeft,
    },
    {
      id: 'history',
      title: 'Vehicle History',
      desc: 'View complete lifecycle audit trails and ownership change logs.',
      icon: History,
    },
    {
      id: 'verify',
      title: 'Verify Vehicle',
      desc: 'Validate vehicle authenticity and certificate status instantly.',
      icon: Search,
    },
  ];

  return (
    <div className="page-container">
      {/* Hero Section */}
      <section className="hero-card">
        <h1 className="hero-title">
          Vehicle Ownership Transfer <br />
          <span className="hero-gradient">Using Blockchain</span>
        </h1>
        <p className="hero-subtitle">
          A decentralized title registry designed to eliminate vehicle history fraud, prevent duplicate registrations, 
          and streamline peer-to-peer ownership transfers with immutable blockchain records.
        </p>

        <div className="hero-actions">
          <button className="btn btn-primary" onClick={() => setActiveTab('register')}>
            <Car size={18} /> Register New Vehicle
          </button>
          <button className="btn btn-secondary" onClick={() => setActiveTab('verify')}>
            <Search size={18} /> Verify Vehicle Status
          </button>
        </div>
      </section>

      {/* Quick Statistics */}
      <section className="stats-grid">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div key={idx} className="stat-card">
              <div className="stat-icon">
                <Icon size={24} />
              </div>
              <div>
                <div className="stat-value">{stat.value}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            </div>
          );
        })}
      </section>

      {/* Feature Modules */}
      <section className="card-section">
        <h2 className="section-title">
          <Database size={20} style={{ color: 'var(--accent-cyan)' }} /> Platform Modules
        </h2>
        <div className="features-grid">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.id}
                className="feature-item"
                onClick={() => setActiveTab(feature.id)}
              >
                <div className="feature-header">
                  <Icon size={22} />
                  <h3 className="feature-title">{feature.title}</h3>
                </div>
                <p className="feature-desc">{feature.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Project Overview Note */}
      <section className="card-section">
        <h2 className="section-title">
          <FileText size={20} style={{ color: 'var(--accent-cyan)' }} /> Project Architecture Overview
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', leading: '1.6' }}>
          This college mini-project is structured into two main phases. In <strong>Phase 1</strong>, the project establishes the clean React frontend application structure, responsive UI dashboards, and navigation paths. In <strong>Phase 2</strong>, Solidity smart contracts, MetaMask wallet connections, and Ethereum testnet interactions will be integrated to execute real blockchain transactions.
        </p>
      </section>
    </div>
  );
}
