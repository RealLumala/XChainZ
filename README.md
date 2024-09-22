

# XChainZ Privacy-Focused Cross-Chain Stable-Token Transfer Protocol

## Overview

This project is a decentralized application (DApp) designed to enable privacy-preserving cross-chain stablecoin transfers, with a focus on providing secure and anonymous transactions for users. The protocol leverages Circle’s Cross-Chain Transfer Protocol (CCTP), Worldcoin for identity verification, and Reown for wallet connections, ensuring seamless transfers while preserving user privacy and security.

## Key Features

- **Cross-Chain USDC Transfers**: Leverages Circle's CCTP to facilitate seamless cross-chain stablecoin transfers between supported blockchains.
- **Privacy-Centric**: User privacy is prioritized through self-sovereign identity verification using Worldcoin’s World ID, ensuring that users' identities are protected while maintaining compliance.
- **Zero-Knowledge Proofs**: The protocol ensures confidentiality using zero-knowledge proofs to obscure user data and transfer details, enhancing transaction privacy.
- **Programmable Wallets**: Integrated with Reown AppKit for smart wallet management and connection, enabling programmable wallet actions tied to verifiable identity and privacy.
- **Cross-Chain Payment Mechanism**: Enables payment flows across different chains, ensuring liquidity and stable transfers of USDC, with a focus on privacy.
- **Stablecoin Security**: Utilizes USDC for its price stability and reliability in remittance and payment transfers.
- **Conditional Transaction Execution**: Transactions can only be executed if the user has successfully authenticated via Worldcoin, ensuring a trusted and secure environment.

## How It Works

1. **World ID Verification**: Users authenticate using Worldcoin's World ID system. This ensures that only verified users can initiate transactions.
   
2. **Wallet Connection via Reown**: Wallet connection is managed using the Reown AppKit, which integrates Wagmi and Ethers for seamless wallet management and interaction.
   
3. **Stablecoin Transfer via CCTP**: Once authenticated, users can initiate cross-chain transfers of USDC using Circle’s CCTP. This protocol ensures that the transfer is routed across supported blockchains while maintaining privacy.
   
4. **Privacy & Security**: Zero-knowledge proofs are utilized to ensure that transaction details, including sender and receiver identities, are obscured, protecting user privacy.

## Technology Stack

- **Backend**: Node.js and Express for server-side logic
- **Identity**: Worldcoin for self-sovereign identity verification (via @worldcoin/idkit)
- **Wallet**: Reown AppKit for wallet connection, using Wagmi and Ethers.js
- **Blockchain Networks**: Base Sepolia and Sepolia testnets for transaction testing and cross-chain transfers
- Circle CCTP for cross-chain stablecoin transfers

## Usage

1. **World ID Authentication**: The user must verify their identity using Worldcoin's World ID for any transaction to proceed.

2. **Connect Wallet**: Users connect their wallets via Reown's integrated wallet connection system.

3. **Transfer USDC**: Once authenticated and connected, users can initiate a cross-chain USDC transfer, which will be routed through Circle’s CCTP.
