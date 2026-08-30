const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("VehicleOwnership Smart Contract", function () {
  let vehicleOwnership;
  let owner;
  let buyer;
  let unauthorizedAccount;

  const sampleVin = "1HGCR2F83HA123456";
  const sampleMake = "Honda";
  const sampleModel = "Accord";
  const sampleYear = 2024;
  const samplePlate = "ABC-1234";

  beforeEach(async function () {
    [owner, buyer, unauthorizedAccount] = await ethers.getSigners();
    const VehicleOwnershipFactory = await ethers.getContractFactory("VehicleOwnership");
    vehicleOwnership = await VehicleOwnershipFactory.deploy();
    await vehicleOwnership.waitForDeployment();
  });

  describe("1. Vehicle Registration", function () {
    it("Should register a vehicle successfully and emit VehicleRegistered event", async function () {
      await expect(
        vehicleOwnership.registerVehicle(
          sampleVin,
          sampleMake,
          sampleModel,
          sampleYear,
          samplePlate,
          owner.address
        )
      )
        .to.emit(vehicleOwnership, "VehicleRegistered")
        .withArgs(
          sampleVin,
          owner.address,
          sampleMake,
          sampleModel,
          sampleYear,
          samplePlate,
          (timestamp) => timestamp > 0
        );

      const vehicle = await vehicleOwnership.getVehicle(sampleVin);
      expect(vehicle[0]).to.equal(sampleVin);
      expect(vehicle[1]).to.equal(sampleMake);
      expect(vehicle[2]).to.equal(sampleModel);
      expect(vehicle[3]).to.equal(BigInt(sampleYear));
      expect(vehicle[4]).to.equal(samplePlate);
      expect(vehicle[5]).to.equal(owner.address);
      expect(vehicle[7]).to.be.true;
    });

    it("Should default owner to msg.sender if ownerAddress is zero address", async function () {
      await vehicleOwnership.connect(owner).registerVehicle(
        "VIN_DEFAULT_OWNER",
        "Toyota",
        "Camry",
        2023,
        "DEF-5678",
        ethers.ZeroAddress
      );

      const vehicle = await vehicleOwnership.getVehicle("VIN_DEFAULT_OWNER");
      expect(vehicle[5]).to.equal(owner.address);
    });

    it("Should revert if registering duplicate VIN", async function () {
      await vehicleOwnership.registerVehicle(
        sampleVin,
        sampleMake,
        sampleModel,
        sampleYear,
        samplePlate,
        owner.address
      );

      await expect(
        vehicleOwnership.registerVehicle(
          sampleVin,
          "Ford",
          "Mustang",
          2022,
          "XYZ-9999",
          owner.address
        )
      ).to.be.revertedWith("Vehicle with this VIN is already registered");
    });

    it("Should revert if VIN is empty", async function () {
      await expect(
        vehicleOwnership.registerVehicle("", sampleMake, sampleModel, sampleYear, samplePlate, owner.address)
      ).to.be.revertedWith("VIN cannot be empty");
    });
  });

  describe("2. Ownership Verification & Retrieval", function () {
    beforeEach(async function () {
      await vehicleOwnership.registerVehicle(
        sampleVin,
        sampleMake,
        sampleModel,
        sampleYear,
        samplePlate,
        owner.address
      );
    });

    it("Should return true for isVehicleRegistered on existing vehicle", async function () {
      expect(await vehicleOwnership.isVehicleRegistered(sampleVin)).to.be.true;
    });

    it("Should return false for isVehicleRegistered on non-existing vehicle", async function () {
      expect(await vehicleOwnership.isVehicleRegistered("NON_EXISTING_VIN")).to.be.false;
    });

    it("Should track total vehicle count accurately", async function () {
      expect(await vehicleOwnership.getVehicleCount()).to.equal(1n);
      await vehicleOwnership.registerVehicle("VIN2", "Nissan", "Altima", 2021, "ALT-1111", owner.address);
      expect(await vehicleOwnership.getVehicleCount()).to.equal(2n);
    });
  });

  describe("3. Ownership Transfer", function () {
    beforeEach(async function () {
      await vehicleOwnership.registerVehicle(
        sampleVin,
        sampleMake,
        sampleModel,
        sampleYear,
        samplePlate,
        owner.address
      );
    });

    it("Should allow current owner to transfer ownership and emit OwnershipTransferred event", async function () {
      await expect(
        vehicleOwnership.connect(owner).transferOwnership(sampleVin, buyer.address, "Private Sale")
      )
        .to.emit(vehicleOwnership, "OwnershipTransferred")
        .withArgs(
          sampleVin,
          owner.address,
          buyer.address,
          (timestamp) => timestamp > 0,
          "Private Sale"
        );

      const vehicle = await vehicleOwnership.getVehicle(sampleVin);
      expect(vehicle[5]).to.equal(buyer.address);
    });

    it("Should revert when non-owner attempts to transfer ownership", async function () {
      await expect(
        vehicleOwnership.connect(unauthorizedAccount).transferOwnership(sampleVin, buyer.address, "Unauthorized")
      ).to.be.revertedWith("Caller is not the current vehicle owner");
    });

    it("Should revert when transferring to zero address", async function () {
      await expect(
        vehicleOwnership.connect(owner).transferOwnership(sampleVin, ethers.ZeroAddress, "Invalid Transfer")
      ).to.be.revertedWith("New owner address cannot be zero address");
    });

    it("Should revert when transferring to self", async function () {
      await expect(
        vehicleOwnership.connect(owner).transferOwnership(sampleVin, owner.address, "Self Transfer")
      ).to.be.revertedWith("New owner cannot be the current owner");
    });
  });

  describe("4. Ownership History Audit", function () {
    it("Should record initial registration and subsequent transfers in ownership history", async function () {
      await vehicleOwnership.registerVehicle(
        sampleVin,
        sampleMake,
        sampleModel,
        sampleYear,
        samplePlate,
        owner.address
      );

      await vehicleOwnership.connect(owner).transferOwnership(sampleVin, buyer.address, "First Transfer");
      await vehicleOwnership.connect(buyer).transferOwnership(sampleVin, unauthorizedAccount.address, "Second Transfer");

      const history = await vehicleOwnership.getOwnershipHistory(sampleVin);
      expect(history.length).to.equal(3);

      expect(history[0].previousOwner).to.equal(ethers.ZeroAddress);
      expect(history[0].newOwner).to.equal(owner.address);
      expect(history[0].notes).to.equal("Initial Vehicle Registration");

      expect(history[1].previousOwner).to.equal(owner.address);
      expect(history[1].newOwner).to.equal(buyer.address);
      expect(history[1].notes).to.equal("First Transfer");

      expect(history[2].previousOwner).to.equal(buyer.address);
      expect(history[2].newOwner).to.equal(unauthorizedAccount.address);
      expect(history[2].notes).to.equal("Second Transfer");
    });
  });
});
