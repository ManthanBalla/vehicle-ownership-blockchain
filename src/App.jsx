import React, { useState } from 'react';
import Navbar from './components/Navbar';
import PhaseBanner from './components/PhaseBanner';
import Footer from './components/Footer';

// Pages
import Dashboard from './pages/Dashboard';
import RegisterVehicle from './pages/RegisterVehicle';
import TransferOwnership from './pages/TransferOwnership';
import VehicleHistory from './pages/VehicleHistory';
import VerifyVehicle from './pages/VerifyVehicle';

import './App.css';

/**
 * Main Application Shell
 * Manages active navigation tab and renders top-level views for Phase 1.
 */
function App() {
  // Navigation active tab state: 'dashboard' | 'register' | 'transfer' | 'history' | 'verify'
  const [activeTab, setActiveTab] = useState('dashboard');

  // Render current view based on active tab
  const renderCurrentPage = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard setActiveTab={setActiveTab} />;
      case 'register':
        return <RegisterVehicle />;
      case 'transfer':
        return <TransferOwnership />;
      case 'history':
        return <VehicleHistory />;
      case 'verify':
        return <VerifyVehicle />;
      default:
        return <Dashboard setActiveTab={setActiveTab} />;
    }
  };

  return (
    <div className="app-container">
      {/* Top Banner indicating Phase 1 context */}
      <PhaseBanner />

      {/* Top Navigation Bar with Title & Links */}
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Page Body */}
      <main className="main-content">
        {renderCurrentPage()}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
