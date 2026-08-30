# Vehicle Ownership Transfer Using Blockchain

A modern decentralized platform designed to securely register, verify, and transfer vehicle titles on an Ethereum-compatible blockchain network.

---

## 📌 Project Overview

Vehicle title fraud, tampered history records, and delayed ownership transfers are common problems in traditional vehicle registries. This college mini-project addresses these challenges by leveraging blockchain technology to create an immutable, transparent, and tamper-proof ledger for vehicle ownership records.

---

## 🚀 Current Development Phase

**Phase 1: Project Setup & React Frontend UI**
- Initialized React application structure using Vite.
- Established clean, modular folder hierarchy (`contracts/`, `scripts/`, `test/`, `src/`).
- Built responsive UI components and navigation placeholders for core modules:
  - **Dashboard**
  - **Register Vehicle**
  - **Transfer Ownership**
  - **Vehicle History**
  - **Verify Vehicle**
- *Note:* Smart contract integration, Web3 connectivity, and wallet bindings are reserved for **Phase 2**.

---

## 🛠️ Technology Stack

| Component | Technology / Tool | Status |
| :--- | :--- | :--- |
| **Frontend UI** | React.js (Vite) | ✅ Active (Phase 1) |
| **Icons** | Lucide React | ✅ Active (Phase 1) |
| **Styling** | Custom Vanilla CSS (Dark/Glassmorphism) | ✅ Active (Phase 1) |
| **Smart Contracts** | Solidity | ⏳ Phase 2 |
| **Blockchain Network** | Ethereum / Local Testnet (Hardhat / Ganache) | ⏳ Phase 2 |
| **Web3 Connection** | Ethers.js & MetaMask | ⏳ Phase 2 |

---

## 📁 Project Structure

```text
vehicle-ownership-blockchain/
├── contracts/             # Solidity smart contracts (Phase 2)
│   └── README.md
├── scripts/               # Blockchain deployment scripts (Phase 2)
│   └── README.md
├── test/                  # Smart contract unit tests (Phase 2)
│   └── README.md
├── public/                # Static public assets
├── src/
│   ├── components/        # UI components (Navbar, Footer, PhaseBanner, etc.)
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   └── PhaseBanner.jsx
│   ├── pages/             # Main feature pages
│   │   ├── Dashboard.jsx
│   │   ├── RegisterVehicle.jsx
│   │   ├── TransferOwnership.jsx
│   │   ├── VehicleHistory.jsx
│   │   └── VerifyVehicle.jsx
│   ├── App.jsx            # Application shell & page routing state
│   ├── App.css            # Component layout & UI styling
│   ├── main.jsx           # React entry point
│   └── index.css          # Global styling & CSS variables
├── .gitignore             # Ignored files and build artifacts
├── index.html             # Main HTML entry point
├── package.json           # Project dependencies & scripts
├── README.md              # Project documentation
└── vite.config.js         # Vite bundler configuration
```

---

## 💻 How to Run the Project Locally

Follow these steps to run the Phase 1 React frontend on your local computer:

### 1. Prerequisites
Ensure you have **Node.js** (v16 or higher) installed on your system.

### 2. Install Dependencies
Open your terminal in the project root directory and run:
```bash
npm install
```

### 3. Run Development Server
Start the local Vite development server:
```bash
npm run dev
```

### 4. Access the Application
Open your browser and navigate to:
```text
http://localhost:5173
```

---

## 📋 Roadmap

- [x] **Phase 1**: Initial project setup, folder structure, responsive React UI dashboard & navigation placeholders.
- [ ] **Phase 2**: Write Solidity smart contract (`VehicleOwnership.sol`), deploy to local testnet, integrate MetaMask & `ethers.js`.
