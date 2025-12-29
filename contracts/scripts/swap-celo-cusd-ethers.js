require("dotenv").config();
const hre = require("hardhat");

/**
 * Script to swap CELO to cUSD on Celo Sepolia using ethers.js
 * 
 * This script uses the Exchange contract (Mento) to swap CELO for cUSD
 * without requiring celocli installation.
 */

async function main() {
  console.log("💱 CELO to cUSD Swap using ethers.js\n");

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

  // Exchange contract address (Mento Protocol)
  // Note: This is the Exchange contract address for Celo Sepolia
  // You may need to find the correct address for Sepolia
  const EXCHANGE_ADDRESS = "0x67316300f17f063085Ca8bD4F3e513cfc515B444"; // Exchange contract (may need verification)
  
  // cUSD contract address
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

  // Exchange contract ABI (simplified - you may need the full ABI)
  const EXCHANGE_ABI = [
    "function exchange(uint256 sellAmount, bool sellGold, uint256 minBuyAmount) external payable returns (uint256)",
    "function getBuyTokenAmount(uint256 sellAmount, bool sellGold) external view returns (uint256)",
  ];

  try {
    const exchange = new hre.ethers.Contract(EXCHANGE_ADDRESS, EXCHANGE_ABI, signer);
    
    // Amount to swap (0.1 CELO)
    const amountCELO = hre.ethers.parseEther("0.1");
    
    // Get estimated cUSD amount
    console.log("🔍 Getting estimated cUSD amount...");
    try {
      const estimatedCUSD = await exchange.getBuyTokenAmount(amountCELO, true); // true = selling CELO (gold)
      console.log(`📊 Estimated cUSD to receive: ${hre.ethers.formatEther(estimatedCUSD)} ${symbol}\n`);
    } catch (err) {
      console.log("⚠️  Could not get estimate (contract may not have this function)\n");
    }
    
    // Execute swap
    console.log("🔄 Executing swap...");
    console.log(`   Selling: ${celoBalanceFormatted} CELO`);
    console.log(`   Min buy: 0 ${symbol} (no minimum)\n`);
    
    const tx = await exchange.exchange(
      amountCELO,        // sellAmount
      true,              // sellGold (true = selling CELO)
      0,                 // minBuyAmount (0 = no minimum)
      { value: amountCELO } // Send CELO with the transaction
    );
    
    console.log(`📤 Transaction hash: ${tx.hash}`);
    console.log("⏳ Waiting for confirmation...\n");
    
    const receipt = await tx.wait();
    console.log("✅ Swap completed!");
    console.log(`📋 Block: ${receipt.blockNumber}`);
    console.log(`⛽ Gas used: ${receipt.gasUsed.toString()}\n`);
    
    // Check new balances
    const newCeloBalance = await hre.ethers.provider.getBalance(signer.address);
    const newCusdBalance = await cUSD.balanceOf(signer.address);
    
    console.log("📊 New Balances:");
    console.log(`   CELO: ${hre.ethers.formatEther(newCeloBalance)} CELO`);
    console.log(`   ${symbol}: ${hre.ethers.formatEther(newCusdBalance)} ${symbol}\n`);
    
  } catch (error) {
    console.error("❌ Error executing swap:", error.message);
    console.log("\n💡 Alternative: The Exchange contract address may be incorrect for Sepolia.");
    console.log("   Try using celocli or find the correct Exchange contract address.");
    console.log("\n📋 To find the Exchange contract:");
    console.log("   1. Go to https://sepolia.celoscan.io/");
    console.log("   2. Search for 'Exchange' or 'Mento' contracts");
    console.log("   3. Use the verified contract address");
    process.exit(1);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("\n❌ Error:", error);
    process.exit(1);
  });

