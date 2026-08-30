# Vehicle Ownership Transfer Using Blockchain

A modern decentralized platform designed to securely register, verify, and transfer vehicle titles on an Ethereum-compatible blockchain network.

---

## 📌 Project Overview

Vehicle title fraud, tampered history records, and delayed ownership transfers are common problems in traditional vehicle registries. This college mini-project addresses these challenges by leveraging blockchain technology to create an immutable, transparent, and tamper-proof ledger for vehicle ownership records.

---

## 🚀 Current Development Phase

**Phase 2: Smart Contract Development** ✅

- Wrote `VehicleOwnership.sol` — the core Solidity smart contract.
- Configured Hardhat as the local development and testing framework.
- Created a deployment script for local and testnet deployment.
- Wrote a comprehensive unit test suite covering all contract functions.

**Phase 1: Project Setup & React Frontend UI** ✅

- Initialized React application structure using Vite.
- Established clean, modular folder hierarchy.
- Built responsive UI components and navigation placeholders for core modules.

---

## 🛠️ Technology Stack

| Component | Technology / Tool | Status |
| :--- | :--- | :--- |
| **Frontend UI** | React.js (Vite) | ✅ Active (Phase 1) |
| **Icons** | Lucide React | ✅ Active (Phase 1) |
| **Styling** | Custom Vanilla CSS (Dark/Glassmorphism) | ✅ Active (Phase 1) |
| **Smart Contracts** | Solidity ^0.8.20 | ✅ Active (Phase 2) |
| **Blockchain Tooling** | Hardhat v3 + hardhat-toolbox-mocha-ethers | ✅ Active (Phase 2) |
| **Local Test Network** | Hardhat Network (built-in) | ✅ Active (Phase 2) |
| **Web3 Connection** | Ethers.js & MetaMask | ⏳ Phase 3 |

---

## 📁 Project Structure

```text
vehicle-ownership-blockchain/
├── contracts/
│   ├── VehicleOwnership.sol   # Core smart contract (Phase 2)
│   └── README.md
├── scripts/
│   ├── deploy.js              # Deployment script (Phase 2)
│   └── README.md
├── test/
│   ├── VehicleOwnership.test.js   # Unit tests (Phase 2)
│   └── README.md
├── artifacts/                 # Compiled contract output (auto-generated)
├── cache/                     # Hardhat build cache (auto-generated)
├── public/                    # Static public assets
├── src/
│   ├── components/            # UI components (Navbar, Footer, PhaseBanner)
│   ├── pages/                 # Feature pages (Dashboard, Register, Transfer…)
│   ├── App.jsx
│   ├── App.css
│   ├── main.jsx
│   └── index.css
├── hardhat.config.js          # Hardhat v3 configuration (Phase 2)
├── .gitignore
├── index.html
├── package.json
├── README.md
└── vite.config.js
```

---

## 🔗 Smart Contract — `VehicleOwnership.sol`

### Purpose

`VehicleOwnership.sol` is the on-chain backbone of the project. It stores vehicle registration records and a complete, tamper-proof ownership trail directly on the blockchain. No central database is involved — all data lives on-chain and can be verified by anyone.

---

### Data Stored on Blockchain

#### `Vehicle` struct — one per registered vehicle

| Field | Type | Description |
| :--- | :--- | :--- |
| `vehicleId` | `uint256` | Unique auto-incrementing ID (starts at 1) |
| `vehicleNumber` | `string` | License / plate number (e.g. `MH12AB1234`) |
| `vehicleModel` | `string` | Make and model (e.g. `Toyota Camry 2022`) |
| `currentOwner` | `address` | Wallet address of the current owner |
| `registeredAt` | `uint256` | Block timestamp of initial registration |
| `exists` | `bool` | Guard flag to detect unregistered IDs |

#### `OwnershipRecord` struct — one entry per ownership event

| Field | Type | Description |
| :--- | :--- | :--- |
| `owner` | `address` | Wallet address of the owner at this point in time |
| `timestamp` | `uint256` | Block timestamp when this ownership began |

#### Mappings (on-chain indexes)

| Mapping | Key → Value | Purpose |
| :--- | :--- | :--- |
| `vehicles` | `vehicleId → Vehicle` | Primary lookup by numeric ID |
| `vehicleNumberToId` | `plateNumber → vehicleId` | Reverse lookup by plate number |
| `ownershipHistory` | `vehicleId → OwnershipRecord[]` | Full ownership trail (oldest first) |

---

### Events

| Event | When Emitted | Indexed Parameters |
| :--- | :--- | :--- |
| `VehicleRegistered` | New vehicle is registered | `vehicleId`, `owner` |
| `OwnershipTransferred` | Ownership changes hands | `vehicleId`, `fromOwner`, `toOwner` |

Events are the standard Solidity way to log actions permanently. Off-chain apps (and the frontend in Phase 3) can listen for these events to react in real time.

---

### Functions

#### Write Functions (cost gas)

| Function | Access | Description |
| :--- | :--- | :--- |
| `registerVehicle(vehicleNumber, vehicleModel)` | Anyone | Registers a new vehicle. The caller becomes the first owner. Returns the assigned `vehicleId`. |
| `transferOwnership(vehicleId, newOwner)` | Current owner only | Transfers the vehicle to a new wallet address. Appends a record to the ownership history. |

#### Read Functions (free — no gas)

| Function | Description |
| :--- | :--- |
| `getVehicleById(vehicleId)` | Returns all vehicle fields by numeric ID. |
| `getVehicleByNumber(vehicleNumber)` | Returns all vehicle fields by plate number. |
| `getCurrentOwner(vehicleId)` | Returns just the current owner's wallet address. |
| `getOwnershipHistory(vehicleId)` | Returns the full array of `OwnershipRecord` entries. |
| `isVehicleNumberRegistered(vehicleNumber)` | Returns `true` if a plate number is already taken. |
| `getTotalVehicles()` | Returns the total count of registered vehicles. |

---

### Access Control

- **`registerVehicle`** — open to any wallet. The caller automatically becomes the first owner.
- **`transferOwnership`** — restricted to the **current owner** only, enforced by the `onlyCurrentOwner` modifier. Any other caller will have the transaction reverted.

---

## ⚙️ How to Compile the Contract

Make sure you have Node.js installed, then run:

```bash
# Install all dependencies (if not already done)
npm install

# Compile the Solidity contract
npm run compile
```

Or directly with Hardhat:

```bash
npx hardhat compile
```

On success you will see:

```
Compiled 1 Solidity file successfully (evm target: paris).
```

Compiled artifacts (ABI + bytecode) are written to the `artifacts/` folder. These will be imported by `ethers.js` in Phase 3 to talk to the deployed contract.

---

## 🧪 How to Run the Tests

```bash
npm run test:contracts
```

Or directly:

```bash
npx hardhat test
```

The test suite (`test/VehicleOwnership.test.js`) covers:

| Category | What is tested |
| :--- | :--- |
| Deployment | Contract deploys with 0 vehicles |
| Registration | Successful registration, duplicate plate rejection, empty-field rejection, event emission, ID counter |
| Lookup by ID | Correct data returned, revert on missing ID |
| Lookup by plate | Correct data returned, revert on unknown plate |
| Plate check | `isVehicleNumberRegistered` before and after registration |
| Current owner | Registrant is initial owner |
| Transfer | Successful transfer, event emission, non-owner blocked, zero address blocked, same-owner blocked, missing vehicle blocked |
| History | Single entry after registration, grows with each transfer, correct order |

---

## 🚀 How to Deploy Locally

To run the contract on a live local Hardhat node:

```bash
# Terminal 1 — start the local Ethereum node
npm run node

# Terminal 2 — deploy the contract to it
npx hardhat run scripts/deploy.cjs --network localhost
```

The deploy script prints the contract address and confirms `getTotalVehicles()` returns 0.

---

## 💻 How to Run the Frontend (Phase 1)

```bash
npm install
npm run dev
```

Navigate to `http://localhost:5173` in your browser.

---

## ✅ Phase 2 Completion Checklist

Before Phase 2 is considered complete, verify all of the following:

- [ ] `npm run compile` exits with no errors and produces files in `artifacts/`
- [ ] `npm run test:contracts` runs all tests and **all pass** (0 failures)
- [ ] `VehicleOwnership.sol` exists in `contracts/` and contains the full contract
- [ ] `hardhat.config.cjs` exists at the project root
- [ ] `scripts/deploy.js` exists and deploys without errors
- [ ] `test/VehicleOwnership.test.js` exists and covers all functions
- [ ] `package.json` contains `compile`, `test:contracts`, `deploy:local`, and `node` scripts
- [ ] Phase 1 frontend still runs without errors (`npm run dev`)

---

## 📋 Roadmap

- [x] **Phase 1**: Initial project setup, folder structure, responsive React UI.
- [x] **Phase 2**: Solidity smart contract, Hardhat setup, unit tests, deployment script.
- [ ] **Phase 3**: MetaMask wallet integration, connect frontend to deployed contract via `ethers.js`.
