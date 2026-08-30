/**
 * deploy.js
 * ---------
 * Deployment script for the VehicleOwnership smart contract (Hardhat v3 / ESM).
 *
 * Usage — deploy to the built-in Hardhat network (ephemeral):
 *   npx hardhat run scripts/deploy.js
 *
 * Usage — deploy to a live local Hardhat node:
 *   1. Terminal 1:  npx hardhat node
 *   2. Terminal 2:  npx hardhat run scripts/deploy.js --network localhost
 */

import hre from "hardhat";

async function main() {
  console.log("----------------------------------------------------");
  console.log("Deploying VehicleOwnership contract...");
  console.log("----------------------------------------------------");

  // Create a network connection to the configured network
  const { ethers } = await hre.network.connect();

  // Get the deployer account (first Hardhat test account)
  const [deployer] = await ethers.getSigners();
  console.log("Deploying with account:", deployer.address);

  // Show the deployer's balance (useful sanity check on testnets)
  const balance = await ethers.provider.getBalance(deployer.address);
  console.log("Account balance:", ethers.formatEther(balance), "ETH");

  // Deploy the contract — no constructor arguments required
  const vehicleOwnership = await ethers.deployContract("VehicleOwnership");
  await vehicleOwnership.waitForDeployment();

  const contractAddress = await vehicleOwnership.getAddress();
  console.log("----------------------------------------------------");
  console.log("VehicleOwnership deployed to:", contractAddress);
  console.log("----------------------------------------------------");

  // Quick smoke-test: confirm the contract is live and starts with 0 vehicles
  const totalVehicles = await vehicleOwnership.getTotalVehicles();
  console.log("Total vehicles registered (should be 0):", totalVehicles.toString());
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Deployment failed:", error);
    process.exit(1);
  });
