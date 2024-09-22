require('dotenv').config();
const { ethers } = require('ethers');
const fetch = require('node-fetch');

// Environment Variables
const ETH_RPC_URL = process.env.ETH_RPC_URL;
const BASE_RPC_URL = process.env.BASE_RPC_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const ETH_TOKEN_MESSENGER_CONTRACT_ADDRESS = process.env.ETH_TOKEN_MESSENGER_CONTRACT_ADDRESS;
const BASE_MESSAGE_TRANSMITTER_CONTRACT_ADDRESS = process.env.BASE_MESSAGE_TRANSMITTER_CONTRACT_ADDRESS;
const USDC_ETH_CONTRACT_ADDRESS = process.env.USDC_ETH_CONTRACT_ADDRESS;
const CIRCLE_API_URL = "https://iris-api-sandbox.circle.com";

// USDC contract ABI (minimal for balanceOf and approve methods)
const USDC_ABI = [
    "function balanceOf(address owner) view returns (uint256)",
    "function approve(address spender, uint256 value) returns (bool)"
];

// TokenMessenger contract ABI (minimal for depositForBurn)
const TOKEN_MESSENGER_ABI = [
    "function depositForBurn(uint256 amount, uint32 destinationDomain, bytes32 mintRecipient, address burnToken) returns (bytes)"
];

// MessageTransmitter contract ABI (minimal for receiveMessage)
const MESSAGE_TRANSMITTER_ABI = [
    "function receiveMessage(bytes message, bytes attestation) returns (bool)"
];

// Helper function to convert address to bytes32
const addressToBytes32 = (address) => {
    return ethers.utils.hexZeroPad(ethers.utils.getAddress(address), 32);
};

// Main function to perform cross-chain transfer
async function transferUSDC(amount) {
    // Set up providers and wallet
    const ethProvider = new ethers.providers.JsonRpcProvider(ETH_RPC_URL);
    const baseProvider = new ethers.providers.JsonRpcProvider(BASE_RPC_URL);
    const wallet = new ethers.Wallet(PRIVATE_KEY, ethProvider);
    const recipientAddress = wallet.address; // Address to receive USDC on Base

    // Initialize USDC contract and TokenMessenger on Ethereum
    const usdcEthContract = new ethers.Contract(USDC_ETH_CONTRACT_ADDRESS, USDC_ABI, wallet);
    const tokenMessengerContract = new ethers.Contract(ETH_TOKEN_MESSENGER_CONTRACT_ADDRESS, TOKEN_MESSENGER_ABI, wallet);

    console.log(`Approving USDC transfer of ${amount} on Ethereum Sepolia...`);
    const approveTx = await usdcEthContract.approve(ETH_TOKEN_MESSENGER_CONTRACT_ADDRESS, amount);
    await approveTx.wait();
    console.log("USDC transfer approved.");

    console.log(`Burning ${amount} USDC on Ethereum Sepolia...`);
    const destinationDomain = 125; // Base Sepolia domain ID
    const recipientInBytes32 = addressToBytes32(recipientAddress);
    const burnTx = await tokenMessengerContract.depositForBurn(amount, destinationDomain, recipientInBytes32, USDC_ETH_CONTRACT_ADDRESS);
    const burnReceipt = await burnTx.wait();
    console.log("USDC burned on Ethereum Sepolia.");

    // Extract the message from the burn transaction logs
    const eventTopic = ethers.utils.id("MessageSent(bytes)");
    const log = burnReceipt.logs.find(l => l.topics[0] === eventTopic);
    const messageBytes = ethers.utils.defaultAbiCoder.decode(["bytes"], log.data)[0];
    const messageHash = ethers.utils.keccak256(messageBytes);
    console.log(`Message hash: ${messageHash}`);

    // Poll Circle's attestation service for the burn event
    console.log("Fetching Circle attestation...");
    let attestationResponse = { status: 'pending' };
    while (attestationResponse.status !== 'complete') {
        const response = await fetch(`${CIRCLE_API_URL}/attestations/${messageHash}`);
        attestationResponse = await response.json();
        await new Promise(resolve => setTimeout(resolve, 2000));
    }
    console.log("Attestation received from Circle.");

    // Now mint USDC on Base Sepolia
    const baseWallet = wallet.connect(baseProvider);
    const messageTransmitterContract = new ethers.Contract(BASE_MESSAGE_TRANSMITTER_CONTRACT_ADDRESS, MESSAGE_TRANSMITTER_ABI, baseWallet);

    console.log("Minting USDC on Base Sepolia...");
    const mintTx = await messageTransmitterContract.receiveMessage(messageBytes, attestationResponse.attestation);
    await mintTx.wait();
    console.log(`Successfully minted ${amount} USDC on Base Sepolia.`);
}

// Execute the transfer
const amountToTransfer = ethers.utils.parseUnits("10", 6); // Amount in USDC (6 decimals)
transferUSDC(amountToTransfer).catch(console.error);
