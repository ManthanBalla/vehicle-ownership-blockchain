import React, { useState } from 'react';
import { Car, Info, Send } from 'lucide-react';

/**
 * Register Vehicle Page (Placeholder UI)
 * Layout template for registering a new vehicle on the blockchain.
 */
export default function RegisterVehicle() {
  const [formData, setFormData] = useState({
    vin: '',
    makeModel: '',
    year: '',
    licensePlate: '',
    ownerName: '',
    ownerAddress: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Phase 1 Notice: Form submitted in preview mode. Smart contract integration will occur in Phase 2.');
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">
          <Car size={26} style={{ color: 'var(--accent-cyan)' }} /> Register Vehicle
        </h1>
        <p className="page-description">
          Register a new vehicle into the blockchain database to issue an immutable digital title certificate.
        </p>
      </div>

      {/* Phase 1 Notice */}
      <div className="notice-box">
        <Info size={20} className="notice-icon" />
        <div>
          <strong>Phase 1 UI Placeholder:</strong> This form provides the interface layout for vehicle registration. Smart contract minting and wallet signatures will be connected in Phase 2.
        </div>
      </div>

      {/* Registration Form Layout */}
      <div className="form-card">
        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="form-group">
              <label className="form-label" htmlFor="vin-input">Vehicle Identification Number (VIN)</label>
              <input
                id="vin-input"
                type="text"
                name="vin"
                className="form-input"
                placeholder="e.g. 1HGCR2F83HA000000"
                value={formData.vin}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="make-input">Make & Model</label>
              <input
                id="make-input"
                type="text"
                name="makeModel"
                className="form-input"
                placeholder="e.g. Honda Accord Sedan"
                value={formData.makeModel}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="year-input">Manufacturing Year</label>
              <input
                id="year-input"
                type="number"
                name="year"
                className="form-input"
                placeholder="e.g. 2024"
                value={formData.year}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="plate-input">Registration / License Plate</label>
              <input
                id="plate-input"
                type="text"
                name="licensePlate"
                className="form-input"
                placeholder="e.g. ABC-1234"
                value={formData.licensePlate}
                onChange={handleChange}
              />
            </div>

            <div className="form-group full-width">
              <label className="form-label" htmlFor="owner-input">Initial Owner Full Name</label>
              <input
                id="owner-input"
                type="text"
                name="ownerName"
                className="form-input"
                placeholder="e.g. Alex Morgan"
                value={formData.ownerName}
                onChange={handleChange}
              />
            </div>

            <div className="form-group full-width">
              <label className="form-label" htmlFor="address-input">Owner Wallet Address (ETH / Ethereum Format)</label>
              <input
                id="address-input"
                type="text"
                name="ownerAddress"
                className="form-input"
                placeholder="e.g. 0x71C7656EC7ab88b098defB751B7401B5f6d8976F"
                value={formData.ownerAddress}
                onChange={handleChange}
              />
            </div>
          </div>

          <button type="submit" className="btn btn-primary" id="register-submit-btn">
            <Send size={16} /> Register Vehicle (Preview)
          </button>
        </form>
      </div>
    </div>
  );
}
