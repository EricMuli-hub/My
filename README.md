 Blockchain Academic Credential Verification System

Decentralized, AI-secured credential verification with RBAC, IPFS, and anomaly detection.

 Tech Stack
- Solidity / Hardhat (Blockchain)
- React (Frontend)
- Node.js / Express (Backend)
- IPFS (Storage)

Quick Start
```bash
npm install
npm start


🔹 Smart Contracts Folder (`/smart-contracts`)

`smart-contracts/package.json`
```json
{
  "name": "credential-contracts",
  "version": "1.0.0",
  "scripts": {
    "compile": "hardhat compile",
    "deploy": "hardhat run scripts/deploy.js --network localhost"
  },
  "devDependencies": {
    "@nomicfoundation/hardhat-toolbox": "^4.0.0",
    "hardhat": "^2.19.0"
  },
  "dependencies": {
    "@openzeppelin/contracts": "^5.0.0"
  }
}