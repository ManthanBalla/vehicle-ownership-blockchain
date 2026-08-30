// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title VehicleOwnership
 * @dev Smart contract for managing vehicle registration, ownership transfer, and title history.
 */
contract VehicleOwnership {
    
    // Struct representing vehicle details
    struct Vehicle {
        string vin;
        string make;
        string model;
        uint256 year;
        string licensePlate;
        address currentOwner;
        uint256 registrationTimestamp;
        bool isRegistered;
    }

    // Struct representing an ownership transfer event log
    struct TransferRecord {
        address previousOwner;
        address newOwner;
        uint256 timestamp;
        string notes;
    }

    // Mapping from VIN to Vehicle struct
    mapping(string => Vehicle) private vehicles;

    // Mapping from VIN to list of ownership transfer records
    mapping(string => TransferRecord[]) private ownershipHistory;

    // Array of registered VINs for enumeration
    string[] private allVins;

    // Events
    event VehicleRegistered(
        string indexed vin,
        address indexed owner,
        string make,
        string model,
        uint256 year,
        string licensePlate,
        uint256 timestamp
    );

    event OwnershipTransferred(
        string indexed vin,
        address indexed previousOwner,
        address indexed newOwner,
        uint256 timestamp,
        string notes
    );

    // Modifiers
    modifier onlyVehicleOwner(string memory vin) {
        require(vehicles[vin].isRegistered, "Vehicle is not registered");
        require(vehicles[vin].currentOwner == msg.sender, "Caller is not the current vehicle owner");
        _;
    }

    modifier vehicleExists(string memory vin) {
        require(vehicles[vin].isRegistered, "Vehicle does not exist in registry");
        _;
    }

    /**
     * @dev Register a new vehicle on the blockchain.
     * @param vin Vehicle Identification Number (unique string)
     * @param make Vehicle manufacturer/make
     * @param model Vehicle model
     * @param year Manufacturing year
     * @param licensePlate Registration/License plate number
     * @param ownerAddress Address of initial owner (defaults to msg.sender if address(0))
     */
    function registerVehicle(
        string memory vin,
        string memory make,
        string memory model,
        uint256 year,
        string memory licensePlate,
        address ownerAddress
    ) public {
        require(bytes(vin).length > 0, "VIN cannot be empty");
        require(!vehicles[vin].isRegistered, "Vehicle with this VIN is already registered");
        
        address initialOwner = ownerAddress == address(0) ? msg.sender : ownerAddress;
        require(initialOwner != address(0), "Invalid owner address");

        vehicles[vin] = Vehicle({
            vin: vin,
            make: make,
            model: model,
            year: year,
            licensePlate: licensePlate,
            currentOwner: initialOwner,
            registrationTimestamp: block.timestamp,
            isRegistered: true
        });

        allVins.push(vin);

        // Record initial registration in history
        ownershipHistory[vin].push(TransferRecord({
            previousOwner: address(0),
            newOwner: initialOwner,
            timestamp: block.timestamp,
            notes: "Initial Vehicle Registration"
        }));

        emit VehicleRegistered(
            vin,
            initialOwner,
            make,
            model,
            year,
            licensePlate,
            block.timestamp
        );
    }

    /**
     * @dev Transfer ownership of a registered vehicle to a new owner address.
     * @param vin Vehicle Identification Number
     * @param newOwner Address of the recipient/buyer
     * @param notes Optional transfer notes or agreement reference
     */
    function transferOwnership(
        string memory vin,
        address newOwner,
        string memory notes
    ) public onlyVehicleOwner(vin) {
        require(newOwner != address(0), "New owner address cannot be zero address");
        require(newOwner != msg.sender, "New owner cannot be the current owner");

        address previousOwner = vehicles[vin].currentOwner;
        vehicles[vin].currentOwner = newOwner;

        ownershipHistory[vin].push(TransferRecord({
            previousOwner: previousOwner,
            newOwner: newOwner,
            timestamp: block.timestamp,
            notes: notes
        }));

        emit OwnershipTransferred(
            vin,
            previousOwner,
            newOwner,
            block.timestamp,
            notes
        );
    }

    /**
     * @dev Retrieve vehicle details by VIN.
     * @param vin Vehicle Identification Number
     */
    function getVehicle(string memory vin)
        public
        view
        vehicleExists(vin)
        returns (
            string memory,
            string memory,
            string memory,
            uint256,
            string memory,
            address,
            uint256,
            bool
        )
    {
        Vehicle memory v = vehicles[vin];
        return (
            v.vin,
            v.make,
            v.model,
            v.year,
            v.licensePlate,
            v.currentOwner,
            v.registrationTimestamp,
            v.isRegistered
        );
    }

    /**
     * @dev Check if a vehicle is registered by VIN.
     * @param vin Vehicle Identification Number
     */
    function isVehicleRegistered(string memory vin) public view returns (bool) {
        return vehicles[vin].isRegistered;
    }

    /**
     * @dev Get complete ownership transfer history for a vehicle.
     * @param vin Vehicle Identification Number
     */
    function getOwnershipHistory(string memory vin)
        public
        view
        vehicleExists(vin)
        returns (TransferRecord[] memory)
    {
        return ownershipHistory[vin];
    }

    /**
     * @dev Get total count of registered vehicles.
     */
    function getVehicleCount() public view returns (uint256) {
        return allVins.length;
    }

    /**
     * @dev Get list of all registered VINs.
     */
    function getAllVins() public view returns (string[] memory) {
        return allVins;
    }
}
