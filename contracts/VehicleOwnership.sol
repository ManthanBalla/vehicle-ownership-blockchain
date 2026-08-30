// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title VehicleOwnership
 * @author Vehicle Ownership Transfer Project
 * @notice Manages vehicle registration and ownership transfers on the blockchain.
 *         Each vehicle record is stored permanently and tamper-proof.
 *         Designed as a college mini-project — kept simple and readable.
 */
contract VehicleOwnership {

    // -------------------------------------------------------------------------
    // DATA STRUCTURES
    // -------------------------------------------------------------------------

    /**
     * @dev Represents a single ownership record in the vehicle's history.
     *      Every time ownership changes hands, one of these is pushed to the
     *      vehicle's history array.
     */
    struct OwnershipRecord {
        address owner;          // Wallet address of the owner at this point
        uint256 timestamp;      // Block timestamp when the transfer happened
    }

    /**
     * @dev Core vehicle data stored on-chain.
     *      Sensitive personal documents (e.g. ID scans) are NOT stored here —
     *      only the minimum information needed to prove ownership.
     */
    struct Vehicle {
        uint256 vehicleId;          // Unique numeric ID assigned at registration
        string  vehicleNumber;      // e.g. "MH12AB1234" — the license/plate number
        string  vehicleModel;       // e.g. "Toyota Camry 2022"
        address currentOwner;       // Wallet address of the current owner
        uint256 registeredAt;       // Block timestamp when the vehicle was registered
        bool    exists;             // Guard flag — lets us check if a vehicle exists
    }

    // -------------------------------------------------------------------------
    // STATE VARIABLES
    // -------------------------------------------------------------------------

    /// @dev Auto-incrementing counter used to assign unique vehicle IDs.
    uint256 private nextVehicleId;

    /**
     * @dev Primary lookup: vehicleId → Vehicle struct.
     *      Use this when you already know the vehicle ID.
     */
    mapping(uint256 => Vehicle) private vehicles;

    /**
     * @dev Secondary lookup: vehicleNumber (plate) → vehicleId.
     *      Lets the UI look up a vehicle by its plate number without
     *      needing the internal numeric ID.
     */
    mapping(string => uint256) private vehicleNumberToId;

    /**
     * @dev Ownership history per vehicle.
     *      vehicleId → array of OwnershipRecord (oldest first).
     *      The first entry is always the original registrant.
     */
    mapping(uint256 => OwnershipRecord[]) private ownershipHistory;

    // -------------------------------------------------------------------------
    // EVENTS
    // -------------------------------------------------------------------------

    /**
     * @dev Emitted when a new vehicle is registered on the blockchain.
     * @param vehicleId      The unique ID assigned to this vehicle.
     * @param vehicleNumber  The license/plate number.
     * @param vehicleModel   Make and model string.
     * @param owner          Wallet address of the registrant (first owner).
     * @param timestamp      Block timestamp of registration.
     */
    event VehicleRegistered(
        uint256 indexed vehicleId,
        string  vehicleNumber,
        string  vehicleModel,
        address indexed owner,
        uint256 timestamp
    );

    /**
     * @dev Emitted when ownership of a vehicle is transferred to a new wallet.
     * @param vehicleId   The vehicle that changed hands.
     * @param fromOwner   Previous owner's wallet address.
     * @param toOwner     New owner's wallet address.
     * @param timestamp   Block timestamp of the transfer.
     */
    event OwnershipTransferred(
        uint256 indexed vehicleId,
        address indexed fromOwner,
        address indexed toOwner,
        uint256 timestamp
    );

    // -------------------------------------------------------------------------
    // MODIFIERS
    // -------------------------------------------------------------------------

    /**
     * @dev Reverts if the vehicle with the given ID does not exist.
     *      Used to protect lookup and transfer functions.
     */
    modifier vehicleExists(uint256 vehicleId) {
        require(vehicles[vehicleId].exists, "Vehicle does not exist");
        _;
    }

    /**
     * @dev Reverts if the caller is NOT the current owner of the vehicle.
     *      Only the current owner can initiate a transfer.
     */
    modifier onlyCurrentOwner(uint256 vehicleId) {
        require(
            vehicles[vehicleId].currentOwner == msg.sender,
            "Only the current owner can perform this action"
        );
        _;
    }

    // -------------------------------------------------------------------------
    // CONSTRUCTOR
    // -------------------------------------------------------------------------

    constructor() {
        // Vehicle IDs start at 1 so that ID 0 can serve as a "not found" sentinel
        nextVehicleId = 1;
    }

    // -------------------------------------------------------------------------
    // WRITE FUNCTIONS
    // -------------------------------------------------------------------------

    /**
     * @notice Register a new vehicle on the blockchain.
     * @dev    The caller (msg.sender) becomes the first owner.
     *         Reverts if the vehicle number is already registered.
     * @param vehicleNumber  License / plate number (must be unique).
     * @param vehicleModel   Make and model description (e.g. "Honda Civic 2021").
     * @return vehicleId     The unique ID assigned to the newly registered vehicle.
     */
    function registerVehicle(
        string memory vehicleNumber,
        string memory vehicleModel
    ) external returns (uint256 vehicleId) {
        // Basic input validation
        require(bytes(vehicleNumber).length > 0, "Vehicle number cannot be empty");
        require(bytes(vehicleModel).length  > 0, "Vehicle model cannot be empty");

        // Prevent duplicate registrations using the same plate number
        require(
            vehicleNumberToId[vehicleNumber] == 0,
            "Vehicle number is already registered"
        );

        vehicleId = nextVehicleId;
        nextVehicleId++;

        // Store vehicle data
        vehicles[vehicleId] = Vehicle({
            vehicleId:     vehicleId,
            vehicleNumber: vehicleNumber,
            vehicleModel:  vehicleModel,
            currentOwner:  msg.sender,
            registeredAt:  block.timestamp,
            exists:        true
        });

        // Map plate number → ID for reverse lookup
        vehicleNumberToId[vehicleNumber] = vehicleId;

        // Record the first ownership entry in history
        ownershipHistory[vehicleId].push(OwnershipRecord({
            owner:     msg.sender,
            timestamp: block.timestamp
        }));

        emit VehicleRegistered(
            vehicleId,
            vehicleNumber,
            vehicleModel,
            msg.sender,
            block.timestamp
        );
    }

    /**
     * @notice Transfer ownership of a vehicle to a new wallet address.
     * @dev    Only the current owner can call this function.
     *         Reverts if the new owner is the zero address or the same owner.
     * @param vehicleId  The ID of the vehicle to transfer.
     * @param newOwner   Wallet address of the new owner.
     */
    function transferOwnership(
        uint256 vehicleId,
        address newOwner
    )
        external
        vehicleExists(vehicleId)
        onlyCurrentOwner(vehicleId)
    {
        require(newOwner != address(0),          "New owner cannot be the zero address");
        require(newOwner != msg.sender,           "New owner must be a different address");

        address previousOwner = vehicles[vehicleId].currentOwner;

        // Update the current owner
        vehicles[vehicleId].currentOwner = newOwner;

        // Append the new owner to the history trail
        ownershipHistory[vehicleId].push(OwnershipRecord({
            owner:     newOwner,
            timestamp: block.timestamp
        }));

        emit OwnershipTransferred(
            vehicleId,
            previousOwner,
            newOwner,
            block.timestamp
        );
    }

    // -------------------------------------------------------------------------
    // READ FUNCTIONS (view — cost no gas when called externally)
    // -------------------------------------------------------------------------

    /**
     * @notice Retrieve all stored details for a vehicle by its numeric ID.
     * @param vehicleId     The unique vehicle ID.
     * @return id           The unique vehicle ID.
     * @return vehicleNumber The license / plate number.
     * @return vehicleModel  The make and model string.
     * @return currentOwner  The current owner's wallet address.
     * @return registeredAt  The block timestamp of registration.
     */
    function getVehicleById(uint256 vehicleId)
        external
        view
        vehicleExists(vehicleId)
        returns (
            uint256 id,
            string  memory vehicleNumber,
            string  memory vehicleModel,
            address currentOwner,
            uint256 registeredAt
        )
    {
        Vehicle storage v = vehicles[vehicleId];
        return (
            v.vehicleId,
            v.vehicleNumber,
            v.vehicleModel,
            v.currentOwner,
            v.registeredAt
        );
    }

    /**
     * @notice Look up a vehicle using its license / plate number.
     * @dev    Internally converts the plate to an ID and delegates to getVehicleById.
     * @param vehicleNumber  The plate number string (case-sensitive).
     * @return id            The unique vehicle ID.
     * @return vNumber       The license / plate number.
     * @return vehicleModel  The make and model string.
     * @return currentOwner  The current owner's wallet address.
     * @return registeredAt  The block timestamp of registration.
     */
    function getVehicleByNumber(string memory vehicleNumber)
        external
        view
        returns (
            uint256 id,
            string  memory vNumber,
            string  memory vehicleModel,
            address currentOwner,
            uint256 registeredAt
        )
    {
        uint256 vehicleId = vehicleNumberToId[vehicleNumber];
        require(vehicleId != 0, "Vehicle with this number not found");

        Vehicle storage v = vehicles[vehicleId];
        return (
            v.vehicleId,
            v.vehicleNumber,
            v.vehicleModel,
            v.currentOwner,
            v.registeredAt
        );
    }

    /**
     * @notice Get just the current owner's wallet address for a vehicle.
     * @param vehicleId  The unique vehicle ID.
     * @return           Current owner address.
     */
    function getCurrentOwner(uint256 vehicleId)
        external
        view
        vehicleExists(vehicleId)
        returns (address)
    {
        return vehicles[vehicleId].currentOwner;
    }

    /**
     * @notice Get the full ownership history trail for a vehicle.
     * @dev    Returns an array of OwnershipRecord structs — oldest entry first.
     *         The first record is always the original registrant.
     * @param vehicleId  The unique vehicle ID.
     * @return           Array of OwnershipRecord (owner address + timestamp).
     */
    function getOwnershipHistory(uint256 vehicleId)
        external
        view
        vehicleExists(vehicleId)
        returns (OwnershipRecord[] memory)
    {
        return ownershipHistory[vehicleId];
    }

    /**
     * @notice Check if a vehicle number is already registered.
     * @param vehicleNumber  The plate number to check.
     * @return               True if registered, false otherwise.
     */
    function isVehicleNumberRegistered(string memory vehicleNumber)
        external
        view
        returns (bool)
    {
        return vehicleNumberToId[vehicleNumber] != 0;
    }

    /**
     * @notice Returns the total number of vehicles registered so far.
     * @return  Count of registered vehicles.
     */
    function getTotalVehicles() external view returns (uint256) {
        // nextVehicleId starts at 1, so subtract 1 to get the actual count
        return nextVehicleId - 1;
    }
}
