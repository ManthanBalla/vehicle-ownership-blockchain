# Vehicle Ownership Transfer Using Blockchain

A modern decentralized platform designed to securely register, verify, and transfer vehicle titles on an Ethereum-compatible blockchain network.

---

## 📌 Project Overview

Vehicle title fraud, tampered history records, and delayed ownership transfers are common problems in traditional vehicle registries. This college mini-project addresses these challenges by leveraging blockchain technology to create an immutable, transparent, and tamper-proof ledger for vehicle ownership records.

---

## 🚀 Current Development Phase

**Phase 3: Smart Contract Deployment & Blockchain Configuration**
- Developed core `VehicleOwnership.sol` smart contract (vehicle registration, ownership transfer, history audit logs).
- Configured Hardhat development framework (`hardhat.config.cjs`).
- Implemented contract compilation, local node, deployment (`scripts/deploy.cjs`), and interaction scripts (`scripts/interact.cjs`).
- Created automated unit test suite (`test/VehicleOwnership.test.cjs`).
- Configured automatic export of Contract ABI, address, and network details (`src/config/contractConfig.js`) for upcoming Phase 4 Web3 integration.

---

## 🛠️ Technology Stack

| Component | Technology / Tool | Status |
| :--- | :--- | :--- |
| **Frontend UI** | React.js (Vite) | ✅ Active (Phase 1) |
| **Icons** | Lucide React | ✅ Active (Phase 1) |
| **Styling** | Custom Vanilla CSS (Dark/Glassmorphism) | ✅ Active (Phase 1) |
| **Smart Contracts** | Solidity (`^0.8.20`) | ✅ Completed (Phase 2/3) |
| **Blockchain Network** | Hardhat Local Node (`http://127.0.0.1:8545`) | ✅ Configured (Phase 3) |
| **Development Tooling** | Hardhat, Ethers.js v6 | ✅ Configured (Phase 3) |
| **Web3 Wallet Connection** | MetaMask & Ethers Provider | ⏳ Phase 4 |

---

## 📁 Project Structure

```text
vehicle-ownership-blockchain/
├── contracts/             # Solidity smart contracts
│   └── VehicleOwnership.sol
├── scripts/               # Blockchain deployment & verification scripts
│   ├── deploy.cjs         # Deploys contract & updates src/config/contractConfig.js
│   └── interact.cjs       # Tests basic contract interactions on local node
├── test/                  # Smart contract unit tests
│   └── VehicleOwnership.test.cjs
├── public/                # Static public assets
├── src/
│   ├── config/            # Contract ABI & address configuration (generated)
│   │   └── contractConfig.js
│   ├── components/        # UI components (Navbar, Footer, PhaseBanner, etc.)
│   ├── pages/             # Main feature pages (Dashboard, Register, Transfer, History, Verify)
│   ├── App.jsx            # Application shell & page routing state
│   ├── App.css            # Component layout & UI styling
│   ├── main.jsx           # React entry point
│   └── index.css          # Global styling & CSS variables
├── .env.example           # Environment template (No secrets!)
├── .gitignore             # Ignored build artifacts, cache & environment files
├── hardhat.config.cjs     # Hardhat compiler & network configuration
├── index.html             # Main HTML entry point
├── package.json           # Project dependencies & npm scripts
└── vite.config.js         # Vite bundler configuration
```

---

## ⚙️ Phase 3 — Smart Contract Deployment & Blockchain Configuration

### 1. Required Software
- **Node.js** (v18 or higher recommended)
- **npm** (v9 or higher)
- **Hardhat** (Solidity development environment)
- **Ethers.js v6** (Blockchain interaction library)

### 2. Installation Commands
To install all project dependencies including Hardhat development tools:
```bash
npm install
```

### 3. How to Start the Local Blockchain Node
Start a standalone local Ethereum node provided by Hardhat:
```bash
npm run node
```
*This starts an RPC server listening on `http://127.0.0.1:8545` with 20 pre-funded test accounts.*

### 4. How to Compile the Smart Contract
Compile the Solidity smart contract (`contracts/VehicleOwnership.sol`):
```bash
npm run compile
```

### 5. How to Deploy the Smart Contract
To deploy the contract to your running local blockchain node and export configuration:
```bash
npm run deploy
```
*Note: Ensure `npm run node` is running in a separate terminal before running `npm run deploy`.*

Alternatively, deploy to an in-memory ephemeral network without running a persistent node:
```bash
npm run deploy:local
```

### 6. How to Run Smart Contract Unit Tests
Execute the comprehensive unit test suite:
```bash
npm run test
```

### 7. How to Test Deployed Contract Interactions
Verify vehicle registration, title transfer, and history retrieval against the deployed contract:
```bash
npm run interact
```

### 8. Storage Location of Contract Address & ABI
- **Contract Address & ABI Configuration**: Automatically stored in [src/config/contractConfig.js](file:///c:/BLockchain%20project/vehicle-ownership-blockchain/src/config/contractConfig.js)
- **Compiled Hardhat Artifacts**: Stored in `artifacts/contracts/VehicleOwnership.sol/VehicleOwnership.json`

### 9. How Future Frontend Phases (Phase 4) Will Use the Contract
In Phase 4 (MetaMask & Web3 Connection), frontend pages will connect using Ethers.js:
```javascript
import { ethers } from "ethers";
import { CONTRACT_ADDRESS, CONTRACT_ABI } from "../config/contractConfig.js";

// Connect to MetaMask provider
const provider = new ethers.BrowserProvider(window.ethereum);
const signer = await provider.getSigner();

// Instantiate contract
const vehicleContract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

// Call smart contract functions
const tx = await vehicleContract.registerVehicle(vin, make, model, year, plate, ownerAddr);
```

### 10. ⚠️ Security Warning
> **IMPORTANT SECURITY NOTICE**:
> - **NEVER** commit real private keys, seed phrases, or sensitive API credentials to GitHub or any version control system.
> - Always keep local secrets in `.env` (which is excluded via `.gitignore`).
> - Use `.env.example` as a template for team collaborators.

---

## 💻 How to Run the React Frontend Locally

### 1. Run Development Server
Start the local Vite development server:
```bash
npm run dev
```

### 2. Access the Application
Open your browser and navigate to:
```text
http://localhost:5173
```

---

## 📋 Roadmap

- [x] **Phase 1**: Initial project setup, folder structure, responsive React UI dashboard & navigation placeholders.
- [x] **Phase 2**: Smart contract development (`VehicleOwnership.sol`).
- [x] **Phase 3**: Smart contract compilation, local blockchain node deployment, interaction testing & ABI export configuration.
- [ ] **Phase 4**: MetaMask wallet integration, network detection, and live contract function binding to React components.
