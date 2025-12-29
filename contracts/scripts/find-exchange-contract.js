require("dotenv").config();
const hre = require("hardhat");

/**
 * Script to find the Exchange contract address on Celo Sepolia
 * and attempt to swap CELO for cUSD
 */

async function main() {
  console.log("🔍 Finding Exchange Contract and Attempting Swap\n");

  const network = hre.network.name;
  const chainId = await hre.ethers.provider.getNetwork().then((n) => n.chainId);
  
  if (chainId !== 11142220n) {
    console.error("❌ This script is designed for Celo Sepolia Testnet (Chain ID: 11142220)");
    process.exit(1);
  }

  console.log(`📡 Network: ${network} (Chain ID: ${chainId})\n`);

  const [signer] = await hre.ethers.getSigners();
  console.log(`👤 Wallet: ${signer.address}\n`);

  // Check CELO balance
  const celoBalance = await hre.ethers.provider.getBalance(signer.address);
  const celoBalanceFormatted = hre.ethers.formatEther(celoBalance);
  console.log(`💰 CELO Balance: ${celoBalanceFormatted} CELO\n`);

  // Known Exchange contract addresses (may need to be verified)
  // These are common addresses, but may differ for Sepolia
  const POSSIBLE_EXCHANGE_ADDRESSES = [
    "0x67316300f17f063085Ca8bD4F3e513cfc515B444", // Common Exchange address
    "0xE3D8bd6Aed8F8bA2d6f3f8b8F8b8F8b8F8b8F8b8", // Placeholder - needs verification
  ];

  // Exchange contract ABI (simplified)
  const EXCHANGE_ABI = [
    "function exchange(uint256 sellAmount, bool sellGold, uint256 minBuyAmount) external payable returns (uint256)",
    "function getBuyTokenAmount(uint256 sellAmount, bool sellGold) external view returns (uint256)",
    "function getSellTokenAmount(uint256 buyAmount, bool sellGold) external view returns (uint256)",
  ];

  // cUSD address
  const cUSD_ADDRESS = "0xdE9e4C3ce781b4bA68120d6261cbad65ce0aB00b";
  const cUSD_ABI = [
    "function balanceOf(address owner) view returns (uint256)",
    "function symbol() view returns (string)",
  ];

  const cUSD = new hre.ethers.Contract(cUSD_ADDRESS, cUSD_ABI, signer);
  const cusdBalance = await cUSD.balanceOf(signer.address);
  const cusdBalanceFormatted = hre.ethers.formatEther(cusdBalance);
  const symbol = await cUSD.symbol();
  
  console.log(`💵 Current ${symbol} Balance: ${cusdBalanceFormatted} ${symbol}\n`);

  console.log("🔍 Searching for Exchange contract...\n");

  // Try to find the Exchange contract
  for (const exchangeAddress of POSSIBLE_EXCHANGE_ADDRESSES) {
    try {
      console.log(`📋 Trying Exchange contract: ${exchangeAddress}`);
      const exchange = new hre.ethers.Contract(exchangeAddress, EXCHANGE_ABI, signer);
      
      // Try to call a view function to verify it's the right contract
      const amountCELO = hre.ethers.parseEther("0.1");
      try {
        const estimatedCUSD = await exchange.getBuyTokenAmount(amountCELO, true);
        console.log(`✅ Found working Exchange contract!`);
        console.log(`📊 Estimated cUSD: ${hre.ethers.formatEther(estimatedCUSD)} ${symbol}\n`);
        
        // Execute swap
        console.log("🔄 Executing swap...");
        const tx = await exchange.exchange(
          amountCELO,
          true, // sellGold = true (selling CELO)
          0,    // minBuyAmount = 0 (no minimum)
          { value: amountCELO }
        );
        
        console.log(`📤 Transaction hash: ${tx.hash}`);
        console.log("⏳ Waiting for confirmation...\n");
        
        const receipt = await tx.wait();
        console.log("✅ Swap completed!");
        console.log(`📋 Block: ${receipt.blockNumber}\n`);
        
        // Check new balance
        const newCusdBalance = await cUSD.balanceOf(signer.address);
        console.log(`💵 New ${symbol} Balance: ${hre.ethers.formatEther(newCusdBalance)} ${symbol}\n`);
        
        return; // Success, exit
      } catch (err) {
        console.log(`   ⚠️  Contract exists but function failed: ${err.message}\n`);
      }
    } catch (err) {
      console.log(`   ❌ Not a valid Exchange contract\n`);
    }
  }

  console.log("❌ Could not find a working Exchange contract.\n");
  console.log("💡 Alternative solutions:");
  console.log("   1. Find the Exchange contract address on CeloScan");
  console.log("   2. Use a DEX like Ubeswap (if available)");
  console.log("   3. Wait for faucet to have cUSD available");
  console.log("   4. Use Alfajores testnet instead");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("\n❌ Error:", error);
    process.exit(1);
  });

