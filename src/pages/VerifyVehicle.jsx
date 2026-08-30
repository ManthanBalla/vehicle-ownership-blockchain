import React, { useState } from 'react';
import { Search, Info, ShieldCheck, CheckCircle2 } from 'lucide-react';

/**
 * Verify Vehicle Page (Placeholder UI)
 * Search interface layout to verify vehicle title authenticity.
 */
export default function VerifyVehicle() {
  const [searchVin, setSearchVin] = useState('');
  const [searched, setSearched] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchVin.trim()) {
      setSearched(true);
    }
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">
          <Search size={26} style={{ color: 'var(--accent-cyan)' }} /> Verify Vehicle Authenticity
        </h1>
        <p className="page-description">
          Search the blockchain registry by Vehicle Identification Number (VIN) to verify title validity.
        </p>
      </div>

      {/* Phase 1 Notice */}
      <div className="notice-box">
        <Info size={20} className="notice-icon" />
        <div>
          <strong>Phase 1 UI Placeholder:</strong> Search interface demo. Live contract state queries (`view` function calls) will be integrated in Phase 2.
        </div>
      </div>

      {/* Search Input Box */}
      <div className="form-card">
        <form onSubmit={handleSearch}>
          <div className="form-group full-width" style={{ marginBottom: '1.2rem' }}>
            <label className="form-label" htmlFor="verify-vin-input">Enter Vehicle VIN or Title Certificate ID</label>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <input
                id="verify-vin-input"
                type="text"
                className="form-input"
                style={{ flex: 1 }}
                placeholder="e.g. 1HGCR2F83HA000001"
                value={searchVin}
                onChange={(e) => setSearchVin(e.target.value)}
              />
              <button type="submit" className="btn btn-primary" id="verify-search-btn">
                <Search size={16} /> Search
              </button>
            </div>
          </div>
        </form>

        {/* Verification Result Preview Card */}
        {searched && (
          <div
            style={{
              marginTop: '1.5rem',
              padding: '1.25rem',
              borderRadius: 'var(--radius-md)',
              background: 'var(--bg-dark)',
              border: '1px solid var(--border-focus)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--status-emerald)' }}>
                <ShieldCheck size={22} />
                <strong style={{ fontSize: '1rem' }}>Title Verified on Blockchain (Sample Result)</strong>
              </div>
              <span className="status-tag verified">
                <CheckCircle2 size={12} /> Active Title
              </span>
            </div>

            <div className="form-grid" style={{ marginBottom: 0 }}>
              <div>
                <span className="form-label">VIN:</span>
                <p style={{ color: 'var(--text-main)', fontWeight: 600 }}>{searchVin || '1HGCR2F83HA000001'}</p>
              </div>
              <div>
                <span className="form-label">Registered Owner Address:</span>
                <p style={{ color: 'var(--text-main)', fontFamily: 'monospace' }}>0x71C7656EC7ab88b098defB751B7401B5f6d8976F</p>
              </div>
              <div>
                <span className="form-label">Vehicle Make & Model:</span>
                <p style={{ color: 'var(--text-main)' }}>2023 Tesla Model 3 Long Range</p>
              </div>
              <div>
                <span className="form-label">Registration Status:</span>
                <p style={{ color: 'var(--status-emerald)', fontWeight: 600 }}>Clean Title / No Liens</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
