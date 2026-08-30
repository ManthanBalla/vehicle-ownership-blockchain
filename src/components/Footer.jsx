import React from 'react';

/**
 * Footer Component
 * Displays copyright and project technical info.
 */
export default function Footer() {
  return (
    <footer className="app-footer">
      <div className="footer-content">
        <div>
          <p><strong>Vehicle Ownership Transfer Using Blockchain</strong> — College Mini Project</p>
        </div>
        <div>
          <span>Phase 1: <span className="footer-tag">React.js & Vite UI</span></span>
        </div>
      </div>
    </footer>
  );
}
