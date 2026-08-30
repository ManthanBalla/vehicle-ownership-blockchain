import React from 'react';
import { History, Info, CheckCircle2 } from 'lucide-react';

/**
 * Vehicle History Page (Placeholder UI)
 * Layout template displaying immutable vehicle transaction logs & history.
 */
export default function VehicleHistory() {
  const sampleHistory = [
    {
      id: 1,
      vin: '1HGCR2F83HA000001',
      vehicle: '2023 Tesla Model 3',
      previousOwner: '0x1234...5678 (Manufacturer)',
      newOwner: '0x71C7...976F (Alex Morgan)',
      date: '2024-01-15',
      txHash: '0x3a89f...b102',
      status: 'Verified',
    },
    {
      id: 2,
      vin: '1HGCR2F83HA000002',
      vehicle: '2022 Honda Civic',
      previousOwner: '0x71C7...976F (Alex Morgan)',
      newOwner: '0xF39F...2266 (David Smith)',
      date: '2024-03-22',
      txHash: '0x9c41a...d944',
      status: 'Verified',
    },
    {
      id: 3,
      vin: '1HGCR2F83HA000003',
      vehicle: '2024 Ford Mustang EV',
      previousOwner: '0x88A2...11B9 (Dealership)',
      newOwner: '0x992B...44A1 (Sarah Jenkins)',
      date: '2024-06-10',
      txHash: '0x7e221...c881',
      status: 'Verified',
    },
  ];

  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">
          <History size={26} style={{ color: 'var(--accent-cyan)' }} /> Vehicle Ownership History
        </h1>
        <p className="page-description">
          Review transparent, tamper-proof title records and ownership transfer audit logs.
        </p>
      </div>

      {/* Phase 1 Notice */}
      <div className="notice-box">
        <Info size={20} className="notice-icon" />
        <div>
          <strong>Phase 1 UI Placeholder:</strong> Displaying static mock history logs for visual structure. Live smart contract log fetching will be connected in Phase 2.
        </div>
      </div>

      {/* History Table Layout */}
      <div className="card-section">
        <div className="table-responsive">
          <table className="custom-table">
            <thead>
              <tr>
                <th>VIN</th>
                <th>Vehicle Model</th>
                <th>Previous Owner</th>
                <th>New Owner</th>
                <th>Transfer Date</th>
                <th>Tx Hash (Mock)</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {sampleHistory.map((row) => (
                <tr key={row.id}>
                  <td><code>{row.vin}</code></td>
                  <td><strong>{row.vehicle}</strong></td>
                  <td>{row.previousOwner}</td>
                  <td>{row.newOwner}</td>
                  <td>{row.date}</td>
                  <td><code>{row.txHash}</code></td>
                  <td>
                    <span className="status-tag verified">
                      <CheckCircle2 size={12} /> {row.status}
                    </span>
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
