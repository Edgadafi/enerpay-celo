require("dotenv").config();
const hre = require("hardhat");

/**
 * Script to directly swap CELO to cUSD on Celo Sepolia Testnet
 * 
 * This script provides a step-by-step guide to swap CELO to cUSD
 * by interacting with the cUSD contract or using a swap mechanism.
 */

async function main() {
  console.log("💱 Direct CELO to cUSD Swap - Step by Step\n");

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

  if (celoBalance < hre.ethers.parseEther("0.1")) {
    console.error("❌ Insufficient CELO balance. You need at least 0.1 CELO for the swap.");
    process.exit(1);
  }

  // cUSD contract address on Celo Sepolia
  const cUSD_ADDRESS = "0xdE9e4C3ce781b4bA68120d6261cbad65ce0aB00b";
  
  // Check current cUSD balance
  const cUSD_ABI = [
    "function balanceOf(address owner) view returns (uint256)",
    "function symbol() view returns (string)",
    "function decimals() view returns (uint8)",
  ];
  
  const cUSD = new hre.ethers.Contract(cUSD_ADDRESS, cUSD_ABI, signer);
  const cusdBalance = await cUSD.balanceOf(signer.address);
  const cusdBalanceFormatted = hre.ethers.formatEther(cusdBalance);
  const symbol = await cUSD.symbol();
  
  console.log(`💵 Current ${symbol} Balance: ${cusdBalanceFormatted} ${symbol}\n`);

  console.log("📋 STEP-BY-STEP: Direct Swap CELO → cUSD\n");
  console.log("=" .repeat(60));
  console.log("\n⚠️  IMPORTANT: Direct swaps require liquidity or a swap contract.");
  console.log("   On testnet, the easiest way is usually through a DEX or bridge.\n");
  console.log("=" .repeat(60));
  console.log("\n");

  // Option 1: Try to find a swap contract or use a DEX
  console.log("🔍 Option 1: Using a DEX (Recommended if available)\n");
  console.log("   1. Go to: https://app.ubeswap.org/");
  console.log("   2. Connect your wallet");
  console.log("   3. Switch to Celo Sepolia network");
  console.log("   4. If liquidity is low, try a smaller amount");
  console.log("   5. Or try: https://app.moola.market/ (if available on Sepolia)");
  console.log("\n");

  // Option 2: Manual contract interaction
  console.log("📝 Option 2: Manual Contract Interaction\n");
  console.log("   This requires finding a swap contract or liquidity pool.\n");
  console.log("   Steps:");
  console.log("   1. Find a swap contract address on Celo Sepolia");
  console.log("   2. Or use a bridge from another testnet");
  console.log("   3. Or wait for faucet to have cUSD available\n");
  console.log("\n");

  // Option 3: Use MetaMask to send CELO and receive cUSD
  console.log("💡 Option 3: Alternative Methods\n");
  console.log("   A. Request from another testnet user who has cUSD");
  console.log("   B. Use a bridge from Ethereum Sepolia (if you have tokens there)");
  console.log("   C. Wait for the faucet to have cUSD available again");
  console.log("   D. Use a different testnet (Alfajores) which might have more liquidity\n");
  console.log("\n");

  // Option 4: Create a simple swap script using web3
  console.log("🔧 Option 4: Create a Custom Swap Script\n");
  console.log("   If you have access to a swap contract, you can create a script like this:\n");
  console.log("   ```javascript");
  console.log("   // Example swap function");
  console.log("   async function swapCELOtoCUSD(amountCELO) {");
  console.log("     // 1. Get swap contract address");
  console.log("     const swapContract = '0x...'; // Swap contract address");
  console.log("     ");
  console.log("     // 2. Approve if needed");
  console.log("     // 3. Call swap function");
  console.log("     // 4. Wait for transaction");
  console.log("   }");
  console.log("   ```\n");
  console.log("\n");

  // Practical solution: Use MetaMask to interact with a known swap contract
  console.log("🎯 PRACTICAL SOLUTION: Use MetaMask + Contract Interaction\n");
  console.log("   Since DEXs don't have liquidity, let's try a direct approach:\n");
  console.log("   1. Open MetaMask");
  console.log("   2. Go to 'Send' or 'Swap'");
  console.log("   3. If MetaMask has a swap feature, use it");
  console.log("   4. Or use Etherscan/CeloScan to interact with contracts directly\n");
  console.log("\n");

  // Provide contract details for manual interaction
  console.log("📋 Contract Details for Manual Interaction:\n");
  console.log(`   cUSD Contract: ${cUSD_ADDRESS}`);
  console.log(`   Your Wallet: ${signer.address}`);
  console.log(`   Network: Celo Sepolia (Chain ID: 11142220)`);
  console.log(`   RPC URL: https://forno.celo-sepolia.celo-testnet.org`);
  console.log(`   Explorer: https://sepolia.celoscan.io/\n`);
  console.log("\n");

  // Final recommendation
  console.log("=" .repeat(60));
  console.log("\n💡 RECOMMENDATION:\n");
  console.log("   Since direct swaps are complex without liquidity, try:");
  console.log("   1. Wait a few hours and try the faucet again");
  console.log("   2. Use Alfajores testnet instead (more liquidity)");
  console.log("   3. Request cUSD from another developer");
  console.log("   4. Use a bridge from Ethereum Sepolia if you have tokens there\n");
  console.log("=" .repeat(60));
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("\n❌ Error:", error);
    process.exit(1);
  });

