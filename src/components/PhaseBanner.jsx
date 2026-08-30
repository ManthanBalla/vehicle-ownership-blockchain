import React from 'react';
import { Info, Layers } from 'lucide-react';

/**
 * PhaseBanner Component
 * Displays a notice indicating Phase 1 scope (Frontend UI & Architecture).
 */
export default function PhaseBanner() {
  return (
    <div className="phase-banner">
      <div className="phase-banner-content">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <span className="phase-badge">
            <Layers size={12} /> Phase 1 Only
          </span>
          <span className="phase-text">
            Frontend UI & Navigation Layout Setup. Smart contracts and Web3 wallet connections will be enabled in Phase 2.
          </span>
        </div>
      </div>
    </div>
  );
}
