import React, { useState } from 'react';
import { ArrowRightLeft, Info, Send } from 'lucide-react';

/**
 * Transfer Ownership Page (Placeholder UI)
 * Layout template for initiating a vehicle ownership transfer.
 */
export default function TransferOwnership() {
  const [transferData, setTransferData] = useState({
    vin: '',
    currentOwner: '',
    newOwnerAddress: '',
    transferNotes: '',
  });

  const handleChange = (e) => {
    setTransferData({ ...transferData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Phase 1 Notice: Transfer form preview submitted. Blockchain transaction execution will occur in Phase 2.');
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">
          <ArrowRightLeft size={26} style={{ color: 'var(--accent-cyan)' }} /> Transfer Ownership
        </h1>
        <p className="page-description">
          Initiate a peer-to-peer title transfer to assign vehicle ownership to a new Ethereum address.
        </p>
      </div>

      {/* Phase 1 Notice */}
      <div className="notice-box">
        <Info size={20} className="notice-icon" />
        <div>
          <strong>Phase 1 UI Placeholder:</strong> Transfer request form layout. In Phase 2, this will prompt MetaMask signature approval from the seller's wallet.
        </div>
      </div>

      {/* Transfer Form Layout */}
      <div className="form-card">
        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="form-group full-width">
              <label className="form-label" htmlFor="transfer-vin-input">Vehicle VIN / Asset ID</label>
              <input
                id="transfer-vin-input"
                type="text"
                name="vin"
                className="form-input"
                placeholder="Enter VIN (e.g. 1HGCR2F83HA000000)"
                value={transferData.vin}
                onChange={handleChange}
              />
            </div>

            <div className="form-group full-width">
              <label className="form-label" htmlFor="current-owner-input">Current Owner Address / ID</label>
              <input
                id="current-owner-input"
                type="text"
                name="currentOwner"
                className="form-input"
                placeholder="e.g. 0x71C7656EC7ab88b098defB751B7401B5f6d8976F"
                value={transferData.currentOwner}
                onChange={handleChange}
              />
            </div>

            <div className="form-group full-width">
              <label className="form-label" htmlFor="new-owner-input">New Owner Wallet Address (Buyer)</label>
              <input
                id="new-owner-input"
                type="text"
                name="newOwnerAddress"
                className="form-input"
                placeholder="e.g. 0xF39Fd6e51aad88F6F4ce6aB8827279cffFb92266"
                value={transferData.newOwnerAddress}
                onChange={handleChange}
              />
            </div>

            <div className="form-group full-width">
              <label className="form-label" htmlFor="notes-input">Transfer Agreement Remarks / Notes</label>
              <input
                id="notes-input"
                type="text"
                name="transferNotes"
                className="form-input"
                placeholder="Optional sale notes or bill of sale reference"
                value={transferData.transferNotes}
                onChange={handleChange}
              />
            </div>
          </div>

          <button type="submit" className="btn btn-primary" id="transfer-submit-btn">
            <Send size={16} /> Submit Transfer Request (Preview)
          </button>
        </form>
      </div>
    </div>
  );
}
