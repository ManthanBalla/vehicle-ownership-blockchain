const hre = require("hardhat");
const fs = require("fs");
const path = require("path");

async function main() {
  console.log("==================================================");
  console.log("Starting Smart Contract Interaction Verification...");
  console.log("==================================================");

  // Read config file to get contract address
  const configPath = path.join(__dirname, "../src/config/contractConfig.js");
  if (!fs.existsSync(configPath)) {
    throw new Error("contractConfig.js not found. Please deploy the contract first.");
  }

  const configContent = fs.readFileSync(configPath, "utf8");
  const addressMatch = configContent.match(/export const CONTRACT_ADDRESS = "([^"]+)";/);
  if (!addressMatch || !addressMatch[1]) {
    throw new Error("Could not parse CONTRACT_ADDRESS from contractConfig.js");
  }

  const contractAddress = addressMatch[1];
  console.log(`Target Deployed Contract Address: ${contractAddress}`);

  const [owner, buyer] = await hre.ethers.getSigners();
  console.log(`Original Owner Address: ${owner.address}`);
  console.log(`New Owner Address:      ${buyer.address}`);

  const VehicleOwnership = await hre.ethers.getContractFactory("VehicleOwnership");
  const contract = VehicleOwnership.attach(contractAddress);

  const testVin = "TESTVIN" + Date.now().toString().slice(-6);

  console.log(`\n1. Registering Vehicle (VIN: ${testVin})...`);
  const regTx = await contract.registerVehicle(
    testVin,
    "Tesla",
    "Model Y",
    2025,
    "EV-7788",
    owner.address
  );
  await regTx.wait();
  console.log("   Vehicle registered successfully!");

  console.log("\n2. Fetching Registered Vehicle Details...");
  const vehicle = await contract.getVehicle(testVin);
  console.log(`   VIN:            ${vehicle[0]}`);
  console.log(`   Make & Model:   ${vehicle[1]} ${vehicle[2]}`);
  console.log(`   Year:           ${vehicle[3].toString()}`);
  console.log(`   License Plate:  ${vehicle[4]}`);
  console.log(`   Current Owner:  ${vehicle[5]}`);
  console.log(`   Registered:     ${vehicle[7]}`);

  console.log("\n3. Transferring Ownership to New Owner...");
  const transferTx = await contract.transferOwnership(
    testVin,
    buyer.address,
    "Verified sale transaction"
  );
  await transferTx.wait();
  console.log("   Ownership transferred successfully!");

  console.log("\n4. Verifying Updated Owner & Ownership History...");
  const updatedVehicle = await contract.getVehicle(testVin);
  console.log(`   Updated Current Owner: ${updatedVehicle[5]}`);

  const history = await contract.getOwnershipHistory(testVin);
  console.log(`   Total Transfer History Logs: ${history.length}`);
  history.forEach((record, index) => {
    console.log(`   Record #${index + 1}:`);
    console.log(`     From:  ${record.previousOwner}`);
    console.log(`     To:    ${record.newOwner}`);
    console.log(`     Notes: ${record.notes}`);
  });

  console.log("==================================================");
  console.log("Contract Interaction Test Completed Successfully!");
  console.log("==================================================");
}

main().catch((error) => {
  console.error("Interaction test failed:", error);
  process.exitCode = 1;
});
