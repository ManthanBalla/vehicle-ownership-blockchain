import { defineConfig } from "hardhat/config";
import hardhatToolboxMochaEthers from "@nomicfoundation/hardhat-toolbox-mocha-ethers";

/**
 * Hardhat v3 configuration for the Vehicle Ownership Transfer project.
 *
 * Plugins included via hardhat-toolbox-mocha-ethers:
 *  - hardhat-ethers        (ethers.js integration)
 *  - hardhat-mocha         (Mocha test runner)
 *  - hardhat-ethers-chai-matchers  (.to.emit, .to.be.revertedWith, etc.)
 *  - hardhat-network-helpers (loadFixture, time helpers)
 *
 * The "hardhat" network is the built-in in-memory blockchain.
 * No extra setup needed for local testing.
 */
export default defineConfig({
  plugins: [hardhatToolboxMochaEthers],

  solidity: {
    version: "0.8.20",
    settings: {
      optimizer: {
        enabled: true,  // Reduces deployed bytecode size
        runs: 200,      // Optimised for ~200 calls per function
      },
    },
  },

  networks: {
    // Built-in simulated Ethereum network — used by `npx hardhat test`
    hardhat: {
      type: "edr-simulated",
      chainType: "l1",
    },

    // Uncomment to deploy to the Sepolia public testnet:
    // sepolia: {
    //   type: "http",
    //   chainType: "l1",
    //   url: process.env.SEPOLIA_RPC_URL ?? "",
    //   accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
    // },
  },

  paths: {
    sources:   "./contracts",
    tests:     "./test",
    cache:     "./cache",
    artifacts: "./artifacts",
  },
});
