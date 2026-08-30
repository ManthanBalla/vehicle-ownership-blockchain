/**
 * VehicleOwnership.test.js
 * ------------------------
 * Mocha + ethers.js unit tests for the VehicleOwnership smart contract.
 * Uses Hardhat v3's network.create() API for an isolated in-memory blockchain
 * per test group, and loadFixture for fast per-test state snapshots.
 *
 * Run with:
 *   npx hardhat test
 */

import { expect }  from "chai";
import { network } from "hardhat";

// Create a single isolated network connection shared across all tests.
// Each describe/it block can use loadFixture to snapshot & restore state.
const { ethers, networkHelpers } = await network.create();

// -------------------------------------------------------------------------
// Fixture — deploy a fresh contract once, then snapshot for each test.
// loadFixture will reuse the snapshot instead of redeploying every time.
// -------------------------------------------------------------------------
async function deployVehicleOwnershipFixture() {
  const [owner, buyer, stranger] = await ethers.getSigners();

  const vehicleOwnership = await ethers.deployContract("VehicleOwnership");
  await vehicleOwnership.waitForDeployment();

  return { vehicleOwnership, owner, buyer, stranger };
}

// -------------------------------------------------------------------------
// 1. DEPLOYMENT
// -------------------------------------------------------------------------
describe("VehicleOwnership", function () {
  describe("Deployment", function () {
    it("should deploy successfully and start with 0 registered vehicles", async function () {
      const { vehicleOwnership } = await networkHelpers.loadFixture(deployVehicleOwnershipFixture);
      const total = await vehicleOwnership.getTotalVehicles();
      expect(total).to.equal(0n);
    });
  });

  // -------------------------------------------------------------------------
  // 2. VEHICLE REGISTRATION
  // -------------------------------------------------------------------------
  describe("registerVehicle()", function () {
    it("should register a vehicle and assign ID 1", async function () {
      const { vehicleOwnership, owner } = await networkHelpers.loadFixture(deployVehicleOwnershipFixture);

      await expect(
        vehicleOwnership.connect(owner).registerVehicle("MH12AB1234", "Toyota Camry 2022")
      )
        .to.emit(vehicleOwnership, "VehicleRegistered")
        .withArgs(
          1n,
          "MH12AB1234",
          "Toyota Camry 2022",
          owner.address,
          (ts) => ts > 0n,
        );
    });

    it("should increment the total vehicle count after each registration", async function () {
      const { vehicleOwnership, owner, buyer } = await networkHelpers.loadFixture(deployVehicleOwnershipFixture);

      await vehicleOwnership.connect(owner).registerVehicle("MH12AB1234", "Toyota Camry 2022");
      await vehicleOwnership.connect(buyer).registerVehicle("DL01CD5678", "Honda Civic 2021");

      expect(await vehicleOwnership.getTotalVehicles()).to.equal(2n);
    });

    it("should revert when the same plate number is used twice", async function () {
      const { vehicleOwnership, owner, buyer } = await networkHelpers.loadFixture(deployVehicleOwnershipFixture);

      await vehicleOwnership.connect(owner).registerVehicle("MH12AB1234", "Toyota Camry 2022");

      await expect(
        vehicleOwnership.connect(buyer).registerVehicle("MH12AB1234", "Honda Civic 2021")
      ).to.be.revertedWith("Vehicle number is already registered");
    });

    it("should revert when vehicle number is empty", async function () {
      const { vehicleOwnership, owner } = await networkHelpers.loadFixture(deployVehicleOwnershipFixture);

      await expect(
        vehicleOwnership.connect(owner).registerVehicle("", "Toyota Camry 2022")
      ).to.be.revertedWith("Vehicle number cannot be empty");
    });

    it("should revert when vehicle model is empty", async function () {
      const { vehicleOwnership, owner } = await networkHelpers.loadFixture(deployVehicleOwnershipFixture);

      await expect(
        vehicleOwnership.connect(owner).registerVehicle("MH12AB1234", "")
      ).to.be.revertedWith("Vehicle model cannot be empty");
    });
  });

  // -------------------------------------------------------------------------
  // 3. VEHICLE LOOKUP BY ID
  // -------------------------------------------------------------------------
  describe("getVehicleById()", function () {
    it("should return correct vehicle data by ID", async function () {
      const { vehicleOwnership, owner } = await networkHelpers.loadFixture(deployVehicleOwnershipFixture);

      await vehicleOwnership.connect(owner).registerVehicle("MH12AB1234", "Toyota Camry 2022");

      const [id, vNumber, vModel, currentOwner] = await vehicleOwnership.getVehicleById(1n);

      expect(id).to.equal(1n);
      expect(vNumber).to.equal("MH12AB1234");
      expect(vModel).to.equal("Toyota Camry 2022");
      expect(currentOwner).to.equal(owner.address);
    });

    it("should revert for a non-existent vehicle ID", async function () {
      const { vehicleOwnership } = await networkHelpers.loadFixture(deployVehicleOwnershipFixture);

      await expect(vehicleOwnership.getVehicleById(999n)).to.be.revertedWith(
        "Vehicle does not exist",
      );
    });
  });

  // -------------------------------------------------------------------------
  // 4. VEHICLE LOOKUP BY PLATE NUMBER
  // -------------------------------------------------------------------------
  describe("getVehicleByNumber()", function () {
    it("should return correct vehicle data by plate number", async function () {
      const { vehicleOwnership, owner } = await networkHelpers.loadFixture(deployVehicleOwnershipFixture);

      await vehicleOwnership.connect(owner).registerVehicle("DL01CD5678", "Honda Civic 2021");

      const [id, vNumber, vModel, currentOwner] =
        await vehicleOwnership.getVehicleByNumber("DL01CD5678");

      expect(id).to.equal(1n);
      expect(vNumber).to.equal("DL01CD5678");
      expect(vModel).to.equal("Honda Civic 2021");
      expect(currentOwner).to.equal(owner.address);
    });

    it("should revert for an unregistered plate number", async function () {
      const { vehicleOwnership } = await networkHelpers.loadFixture(deployVehicleOwnershipFixture);

      await expect(
        vehicleOwnership.getVehicleByNumber("UNKNOWN99"),
      ).to.be.revertedWith("Vehicle with this number not found");
    });
  });

  // -------------------------------------------------------------------------
  // 5. PLATE NUMBER REGISTRATION CHECK
  // -------------------------------------------------------------------------
  describe("isVehicleNumberRegistered()", function () {
    it("should return false before registration", async function () {
      const { vehicleOwnership } = await networkHelpers.loadFixture(deployVehicleOwnershipFixture);

      expect(await vehicleOwnership.isVehicleNumberRegistered("MH12AB1234")).to.be.false;
    });

    it("should return true after registration", async function () {
      const { vehicleOwnership, owner } = await networkHelpers.loadFixture(deployVehicleOwnershipFixture);

      await vehicleOwnership.connect(owner).registerVehicle("MH12AB1234", "Toyota Camry 2022");
      expect(await vehicleOwnership.isVehicleNumberRegistered("MH12AB1234")).to.be.true;
    });
  });

  // -------------------------------------------------------------------------
  // 6. CURRENT OWNERSHIP
  // -------------------------------------------------------------------------
  describe("getCurrentOwner()", function () {
    it("should return the registrant as the initial owner", async function () {
      const { vehicleOwnership, owner } = await networkHelpers.loadFixture(deployVehicleOwnershipFixture);

      await vehicleOwnership.connect(owner).registerVehicle("MH12AB1234", "Toyota Camry 2022");
      expect(await vehicleOwnership.getCurrentOwner(1n)).to.equal(owner.address);
    });
  });

  // -------------------------------------------------------------------------
  // 7. OWNERSHIP TRANSFER
  // -------------------------------------------------------------------------
  describe("transferOwnership()", function () {
    // Inner fixture — extends the base fixture with a registered vehicle
    async function deployAndRegisterFixture() {
      const { vehicleOwnership, owner, buyer, stranger } =
        await networkHelpers.loadFixture(deployVehicleOwnershipFixture);

      await vehicleOwnership.connect(owner).registerVehicle("MH12AB1234", "Toyota Camry 2022");

      return { vehicleOwnership, owner, buyer, stranger };
    }

    it("should transfer ownership to a new address", async function () {
      const { vehicleOwnership, owner, buyer } =
        await networkHelpers.loadFixture(deployAndRegisterFixture);

      await vehicleOwnership.connect(owner).transferOwnership(1n, buyer.address);
      expect(await vehicleOwnership.getCurrentOwner(1n)).to.equal(buyer.address);
    });

    it("should emit an OwnershipTransferred event with correct args", async function () {
      const { vehicleOwnership, owner, buyer } =
        await networkHelpers.loadFixture(deployAndRegisterFixture);

      await expect(vehicleOwnership.connect(owner).transferOwnership(1n, buyer.address))
        .to.emit(vehicleOwnership, "OwnershipTransferred")
        .withArgs(1n, owner.address, buyer.address, (ts) => ts > 0n);
    });

    it("should revert when called by a non-owner", async function () {
      const { vehicleOwnership, buyer, stranger } =
        await networkHelpers.loadFixture(deployAndRegisterFixture);

      await expect(
        vehicleOwnership.connect(stranger).transferOwnership(1n, buyer.address),
      ).to.be.revertedWith("Only the current owner can perform this action");
    });

    it("should revert when transferring to the zero address", async function () {
      const { vehicleOwnership, owner } =
        await networkHelpers.loadFixture(deployAndRegisterFixture);

      await expect(
        vehicleOwnership.connect(owner).transferOwnership(1n, ethers.ZeroAddress),
      ).to.be.revertedWith("New owner cannot be the zero address");
    });

    it("should revert when transferring to the same owner", async function () {
      const { vehicleOwnership, owner } =
        await networkHelpers.loadFixture(deployAndRegisterFixture);

      await expect(
        vehicleOwnership.connect(owner).transferOwnership(1n, owner.address),
      ).to.be.revertedWith("New owner must be a different address");
    });

    it("should revert when vehicle ID does not exist", async function () {
      const { vehicleOwnership, owner, buyer } =
        await networkHelpers.loadFixture(deployAndRegisterFixture);

      await expect(
        vehicleOwnership.connect(owner).transferOwnership(999n, buyer.address),
      ).to.be.revertedWith("Vehicle does not exist");
    });
  });

  // -------------------------------------------------------------------------
  // 8. OWNERSHIP HISTORY
  // -------------------------------------------------------------------------
  describe("getOwnershipHistory()", function () {
    it("should have one entry (the registrant) right after registration", async function () {
      const { vehicleOwnership, owner } = await networkHelpers.loadFixture(deployVehicleOwnershipFixture);

      await vehicleOwnership.connect(owner).registerVehicle("MH12AB1234", "Toyota Camry 2022");

      const history = await vehicleOwnership.getOwnershipHistory(1n);
      expect(history.length).to.equal(1);
      expect(history[0].owner).to.equal(owner.address);
    });

    it("should grow the history after each transfer in the correct order", async function () {
      const { vehicleOwnership, owner, buyer, stranger } =
        await networkHelpers.loadFixture(deployVehicleOwnershipFixture);

      await vehicleOwnership.connect(owner).registerVehicle("MH12AB1234", "Toyota Camry 2022");

      // owner → buyer
      await vehicleOwnership.connect(owner).transferOwnership(1n, buyer.address);
      // buyer → stranger
      await vehicleOwnership.connect(buyer).transferOwnership(1n, stranger.address);

      const history = await vehicleOwnership.getOwnershipHistory(1n);

      // 3 entries: original registration + 2 transfers
      expect(history.length).to.equal(3);
      expect(history[0].owner).to.equal(owner.address);
      expect(history[1].owner).to.equal(buyer.address);
      expect(history[2].owner).to.equal(stranger.address);
    });

    it("should revert for a non-existent vehicle", async function () {
      const { vehicleOwnership } = await networkHelpers.loadFixture(deployVehicleOwnershipFixture);

      await expect(vehicleOwnership.getOwnershipHistory(999n)).to.be.revertedWith(
        "Vehicle does not exist",
      );
    });
  });
});
