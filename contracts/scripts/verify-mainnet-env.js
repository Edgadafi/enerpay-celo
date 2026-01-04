// Load .env.mainnet with override to ensure it takes precedence
require("dotenv").config({ path: ".env.mainnet", override: true });
const hre = require("hardhat");

async function main() {
  console.log("🔍 Verificando configuración de .env.mainnet para Mainnet\n");
  console.log("=".repeat(60));

  let allChecksPassed = true;

  // 1. Check if .env.mainnet exists
  const fs = require("fs");
  const path = require("path");
  const envMainnetPath = path.join(__dirname, "..", ".env.mainnet");

  if (!fs.existsSync(envMainnetPath)) {
    console.error("❌ .env.mainnet file not found!");
    console.error("   Create it with: cp .env .env.mainnet");
    process.exit(1);
  }
  console.log("✅ .env.mainnet file exists\n");

  // 2. Check network
  console.log("1️⃣  Checking Network Configuration...");
  const network = hre.network.name;
  const chainId = await hre.ethers.provider.getNetwork().then((n) => n.chainId);

  if (network !== "celo" || chainId !== 42220n) {
    console.error("❌ Network is not Celo Mainnet!");
    console.error(`   Current: ${network} (Chain ID: ${chainId})`);
    console.error("   Expected: celo (Chain ID: 42220)");
    allChecksPassed = false;
  } else {
    console.log("✅ Network: Celo Mainnet (Chain ID: 42220)");
  }

  // 3. Check private key
  console.log("\n2️⃣  Checking Private Key...");
  const privateKey = process.env.PRIVATE_KEY;
  if (!privateKey) {
    console.error("❌ PRIVATE_KEY not found in .env.mainnet");
    allChecksPassed = false;
  } else {
    // Check format
    if (privateKey.length !== 66 || !privateKey.startsWith("0x")) {
      console.error("❌ PRIVATE_KEY format appears invalid");
      console.error(`   Length: ${privateKey.length} (expected 66)`);
      console.error(`   Starts with 0x: ${privateKey.startsWith("0x")}`);
      allChecksPassed = false;
    } else {
      console.log("✅ Private key format is valid");
    }
  }

  // 4. Check deployer account and balance
  console.log("\n3️⃣  Checking Deployer Account...");
  try {
    // Use PRIVATE_KEY from .env.mainnet explicitly
    const privateKey = process.env.PRIVATE_KEY;
    if (!privateKey) {
      throw new Error("PRIVATE_KEY not found in .env.mainnet");
    }
    
    // Create wallet from private key to ensure we use the correct one
    const deployer = new hre.ethers.Wallet(privateKey, hre.ethers.provider);
    console.log(`✅ Deployer: ${deployer.address}`);

    const balance = await hre.ethers.provider.getBalance(deployer.address);
    const balanceFormatted = hre.ethers.formatEther(balance);
    console.log(`💰 Balance: ${balanceFormatted} CELO`);

    const minBalance = hre.ethers.parseEther("2");
    if (balance < minBalance) {
      console.warn("⚠️  Warning: Balance is less than 2 CELO (recommended minimum)");
      console.warn("   You need CELO to deploy contracts!");
      console.warn("   Options:");
      console.warn("   - Buy CELO on an exchange");
      console.warn("   - Bridge from another network");
      console.warn("   - Swap other tokens for CELO");
    } else {
      console.log("✅ Balance is sufficient for deployment");
    }
  } catch (err) {
    console.error(`❌ Error checking deployer: ${err.message}`);
    allChecksPassed = false;
  }

  // 5. Check treasury address
  console.log("\n4️⃣  Checking Treasury Address...");
  const treasuryAddress = process.env.TREASURY_ADDRESS;
  if (!treasuryAddress) {
    console.warn("⚠️  TREASURY_ADDRESS not set, will use deployer address");
  } else if (!/^0x[a-fA-F0-9]{40}$/.test(treasuryAddress)) {
    console.error("❌ Invalid TREASURY_ADDRESS format");
    console.error(`   Value: ${treasuryAddress}`);
    allChecksPassed = false;
  } else {
    console.log(`✅ Treasury: ${treasuryAddress}`);
  }

  // 6. Check cUSD address
  console.log("\n5️⃣  Checking cUSD Address...");
  const cusdMainnet = "0x765DE816845861e75A25fCA122bb6898B8B1282a";
  const cusdEnv = process.env.CUSD_ADDRESS;
  
  if (cusdEnv && cusdEnv !== cusdMainnet) {
    console.warn(`⚠️  CUSD_ADDRESS in .env.mainnet (${cusdEnv}) differs from mainnet address`);
    console.warn(`   Mainnet address should be: ${cusdMainnet}`);
  } else {
    console.log(`✅ cUSD Mainnet: ${cusdMainnet}`);
  }

  // Verify it's a contract
  try {
    const code = await hre.ethers.provider.getCode(cusdMainnet);
    if (code === "0x") {
      console.error("❌ cUSD address is not a contract!");
      allChecksPassed = false;
    } else {
      console.log("✅ cUSD address is a valid contract");
    }
  } catch (err) {
    console.warn(`⚠️  Could not verify cUSD contract: ${err.message}`);
  }

  // 7. Check contracts compile
  console.log("\n6️⃣  Checking Contract Compilation...");
  try {
    await hre.run("compile");
    console.log("✅ Contracts compiled successfully");
  } catch (err) {
    console.error(`❌ Compilation failed: ${err.message}`);
    allChecksPassed = false;
  }

  // 8. Summary
  console.log("\n" + "=".repeat(60));
  console.log("\n📊 SUMMARY:\n");

  if (allChecksPassed) {
    console.log("✅ All critical checks passed!");
    console.log("\n⚠️  IMPORTANT REMINDERS:");
    console.log("   1. Run tests: npm test");
    console.log("   2. Review contracts one more time");
    console.log("   3. Ensure you have sufficient CELO (2-5 CELO recommended)");
    console.log("   4. Have treasury address ready");
    console.log("\n🚀 Ready to deploy when you are!");
  } else {
    console.error("❌ Some checks failed. Please fix issues before deploying.");
    console.error("\n⚠️  DO NOT deploy to mainnet until all checks pass!");
    process.exit(1);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("\n❌ Error:", error.message);
    process.exit(1);
  });

