require("dotenv").config();
const hre = require("hardhat");

/**
 * Script to swap CELO to cUSD on Celo Sepolia Testnet
 * 
 * This script helps you convert native CELO tokens to cUSD tokens
 * by interacting directly with the cUSD contract.
 * 
 * Note: This is a simplified approach. In production, you'd use a DEX like Ubeswap.
 */

async function main() {
  console.log("💱 CELO to cUSD Swap Helper\n");

  const network = hre.network.name;
  const chainId = await hre.ethers.provider.getNetwork().then((n) => n.chainId);
  
  if (chainId !== 11142220n) {
    console.error("❌ This script is designed for Celo Sepolia Testnet (Chain ID: 11142220)");
    console.log(`   Current network: ${network} (Chain ID: ${chainId})`);
    process.exit(1);
  }

  console.log(`📡 Network: ${network} (Chain ID: ${chainId})\n`);

  // Get signer
  const [signer] = await hre.ethers.getSigners();
  console.log(`👤 Wallet: ${signer.address}\n`);

  // Check CELO balance
  const celoBalance = await hre.ethers.provider.getBalance(signer.address);
  const celoBalanceFormatted = hre.ethers.formatEther(celoBalance);
  console.log(`💰 CELO Balance: ${celoBalanceFormatted} CELO\n`);

  if (celoBalance < hre.ethers.parseEther("0.01")) {
    console.error("❌ Insufficient CELO balance. You need at least 0.01 CELO for gas fees.");
    console.log("\n💡 To get CELO on Celo Sepolia:");
    console.log("   1. Go to https://faucet.celo.org/");
    console.log("   2. Select 'Celo Sepolia' network");
    console.log("   3. Request CELO tokens");
    process.exit(1);
  }

  // cUSD contract address on Celo Sepolia
  const cUSD_ADDRESS = "0xdE9e4C3ce781b4bA68120d6261cbad65ce0aB00b";
  
  // Check current cUSD balance
  const cUSD_ABI = [
    "function balanceOf(address owner) view returns (uint256)",
    "function symbol() view returns (string)",
  ];
  
  const cUSD = new hre.ethers.Contract(cUSD_ADDRESS, cUSD_ABI, signer);
  const cusdBalance = await cUSD.balanceOf(signer.address);
  const cusdBalanceFormatted = hre.ethers.formatEther(cusdBalance);
  const symbol = await cUSD.symbol();
  
  console.log(`💵 Current ${symbol} Balance: ${cusdBalanceFormatted} ${symbol}\n`);

  console.log("📋 Options to get cUSD:");
  console.log("");
  console.log("1. 🚰 Use Faucet (EASIEST):");
  console.log("   - Go to: https://faucet.celo.org/");
  console.log("   - Select: Celo Sepolia");
  console.log("   - Enter your address:", signer.address);
  console.log("   - Request cUSD tokens");
  console.log("");
  console.log("2. 💱 Swap using a DEX:");
  console.log("   - Ubeswap (if available on Sepolia): https://app.ubeswap.org/");
  console.log("   - Connect your wallet");
  console.log("   - Select CELO → cUSD pair");
  console.log("   - Execute swap");
  console.log("");
  console.log("3. 🔄 Direct Contract Interaction:");
  console.log("   - The cUSD contract on Sepolia is:", cUSD_ADDRESS);
  console.log("   - You can interact with it directly, but you'll need a liquidity source");
  console.log("   - For testnet, using the faucet is recommended");
  console.log("");
  console.log("💡 Recommended: Use the faucet at https://faucet.celo.org/");
  console.log("   It's the easiest way to get testnet cUSD tokens.");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("\n❌ Error:", error);
    process.exit(1);
  });

