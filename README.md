# Vehicle Ownership Transfer Using Blockchain

A decentralized platform designed to securely register, verify, and transfer vehicle ownership using an Ethereum-compatible blockchain network.

---

## 📌 Project Overview

Vehicle title fraud, tampered ownership records, and delayed ownership transfers are common problems in traditional vehicle registries.

This college mini-project uses blockchain technology to create a transparent, tamper-resistant, and traceable ledger for vehicle ownership records.

The system uses Solidity smart contracts to manage vehicle registration, ownership transfers, and ownership history.

---

## 🎯 Project Objectives

- Register vehicles securely.
- Maintain the current vehicle owner.
- Transfer vehicle ownership using a smart contract.
- Maintain a history of previous owners.
- Provide transparent and traceable ownership records.
- Prevent unauthorized ownership transfers.
- Verify vehicle ownership information.
- Prepare the system for Web3 wallet integration.

---

## 🚀 Development Status

### Phase 1 — Project Setup & React Frontend ✅

- Initialized React application using Vite.
- Created modular project structure.
- Created responsive frontend UI.
- Added navigation for major project modules.
- Created pages for:
  - Dashboard
  - Register Vehicle
  - Transfer Ownership
  - Vehicle History
  - Verify Vehicle

### Phase 2 — Smart Contract Development ✅

- Developed `VehicleOwnership.sol`.
- Implemented vehicle registration.
- Implemented vehicle information retrieval.
- Implemented ownership transfer.
- Implemented ownership history.
- Added ownership verification.
- Added access-control checks.
- Added Solidity events for important operations.
- Added unit tests for smart contract functionality.

### Phase 3 — Smart Contract Deployment & Blockchain Configuration ✅

- Configured Hardhat development environment.
- Configured Solidity compilation.
- Configured local Hardhat blockchain.
- Created smart contract deployment script.
- Created smart contract interaction verification script.
- Created automated unit test suite.
- Generated contract ABI.
- Generated contract address configuration for the frontend.
- Verified vehicle registration.
- Verified ownership transfer.
- Verified ownership history retrieval.

### Phase 4 — MetaMask & Web3 Integration ⏳

Planned features:

- MetaMask wallet connection.
- Wallet address display.
- Network detection.
- Frontend-to-smart-contract connection.
- Live blockchain transactions from the React application.

---

## 🛠️ Technology Stack

| Component | Technology | Status |
|---|---|---|
| Frontend | React.js + Vite | ✅ |
| Styling | CSS | ✅ |
| Icons | Lucide React | ✅ |
| Smart Contract | Solidity | ✅ |
| Blockchain Development | Hardhat | ✅ |
| Blockchain Interaction | Ethers.js v6 | ✅ |
| Local Blockchain | Hardhat Network | ✅ |
| Wallet | MetaMask | ⏳ Phase 4 |
| Web3 Integration | Ethers.js + MetaMask | ⏳ Phase 4 |

---

## 📁 Project Structure

```text
vehicle-ownership-blockchain/
│
├── contracts/
│   └── VehicleOwnership.sol
│
├── scripts/
│   ├── deploy.cjs
│   └── interact.cjs
│
├── test/
│   └── VehicleOwnership.test.cjs
│
├── src/
│   ├── config/
│   │   └── contractConfig.js
│   │
│   ├── components/
│   ├── pages/
│   │
│   ├── App.jsx
│   ├── App.css
│   ├── main.jsx
│   └── index.css
│
├── public/
│
├── .env.example
├── .gitignore
├── hardhat.config.js
├── package.json
├── package-lock.json
├── index.html
└── vite.config.js