// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract CredentialVerification is AccessControl, Pausable, ReentrancyGuard {
    bytes32 public constant ADMIN_ROLE = keccak256("ADMIN_ROLE");
    bytes32 public constant REGISTRAR_ROLE = keccak256("REGISTRAR_ROLE");
    bytes32 public constant VERIFIER_ROLE = keccak256("VERIFIER_ROLE");
    bytes32 public constant STUDENT_ROLE = keccak256("STUDENT_ROLE");

    struct Credential {
        string studentId;
        string cid;
        string name;
        string degree;
        string institution;
        uint256 issuanceDate;
        bool revoked;
        address issuer;
    }

    mapping(bytes32 => Credential) public credentials;
    mapping(address => bool) public registeredInstitutions;
    mapping(address => bool) public registeredVerifiers;

    event CredentialIssued(bytes32 indexed hash, address indexed issuer, string cid);
    event CredentialVerified(bytes32 indexed hash, address indexed verifier, bool valid);
    event CredentialRevoked(bytes32 indexed hash, address indexed revoker);

    constructor() {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(ADMIN_ROLE, msg.sender);
        _setRoleAdmin(REGISTRAR_ROLE, ADMIN_ROLE);
        _setRoleAdmin(VERIFIER_ROLE, ADMIN_ROLE);
    }

    modifier onlyRegisteredInstitution() {
        require(registeredInstitutions[msg.sender], "Not registered");
        _;
    }

    function registerInstitution() external payable nonReentrant {
        require(msg.value >= 0.1 ether, "Fee: 0.1 ETH");
        require(!registeredInstitutions[msg.sender], "Already registered");
        registeredInstitutions[msg.sender] = true;
        _grantRole(REGISTRAR_ROLE, msg.sender);
    }

    function registerVerifier() external payable nonReentrant {
        require(msg.value >= 0.5 ether, "Fee: 0.5 ETH");
        require(!registeredVerifiers[msg.sender], "Already registered");
        registeredVerifiers[msg.sender] = true;
        _grantRole(VERIFIER_ROLE, msg.sender);
    }

    function issueCredential(
        string memory studentId,
        string memory cid,
        string memory name,
        string memory degree,
        string memory institution
    ) external onlyRole(REGISTRAR_ROLE) onlyRegisteredInstitution nonReentrant {
        bytes32 hash = keccak256(abi.encodePacked(studentId, cid));
        require(credentials[hash].issuer == address(0), "Exists");
        credentials[hash] = Credential({
            studentId: studentId,
            cid: cid,
            name: name,
            degree: degree,
            institution: institution,
            issuanceDate: block.timestamp,
            revoked: false,
            issuer: msg.sender
        });
        emit CredentialIssued(hash, msg.sender, cid);
    }

    function verifyCredential(string memory studentId, string memory cid)
        external
        view
        returns (bool exists, bool revoked, string memory name, string memory degree, string memory institution, uint256 date)
    {
        bytes32 hash = keccak256(abi.encodePacked(studentId, cid));
        Credential memory cred = credentials[hash];
        require(cred.issuer != address(0), "Not found");
        return (true, cred.revoked, cred.name, cred.degree, cred.institution, cred.issuanceDate);
    }

    function revokeCredential(string memory studentId, string memory cid)
        external
        onlyRole(REGISTRAR_ROLE)
        nonReentrant
    {
        bytes32 hash = keccak256(abi.encodePacked(studentId, cid));
        require(credentials[hash].issuer != address(0), "Not found");
        require(!credentials[hash].revoked, "Already revoked");
        credentials[hash].revoked = true;
        emit CredentialRevoked(hash, msg.sender);
    }

    function withdraw() external onlyRole(ADMIN_ROLE) nonReentrant {
        payable(msg.sender).transfer(address(this).balance);
    }
}