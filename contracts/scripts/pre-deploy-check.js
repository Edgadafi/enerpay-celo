require("dotenv").config();
const hre = require("hardhat");
const fs = require("fs");
const path = require("path");

async function main() {
  console.log("🔍 Pre-Deployment Check for Celo Mainnet\n");
  console.log("=" .repeat(60));
  
  let allChecksPassed = true;
  
  // 1. Check network configuration
  console.log("\n1️⃣  Checking Network Configuration...");
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
  
  // 2. Check private key
  console.log("\n2️⃣  Checking Private Key...");
  const privateKey = process.env.PRIVATE_KEY;
  if (!privateKey) {
    console.error("❌ PRIVATE_KEY not found in .env file");
    allChecksPassed = false;
  } else if (privateKey.length !== 66 || !privateKey.startsWith("0x")) {
    console.error("❌ PRIVATE_KEY format appears invalid");
    allChecksPassed = false;
  } else {
    console.log("✅ Private key found");
  }
  
  // 3. Check deployer account and balance
  console.log("\n3️⃣  Checking Deployer Account...");
  try {
    const signers = await hre.ethers.getSigners();
    if (!signers || signers.length === 0) {
      throw new Error("No signers available");
    }
    const deployer = signers[0];
    console.log(`✅ Deployer: ${deployer.address}`);
    
    const balance = await hre.ethers.provider.getBalance(deployer.address);
    const balanceFormatted = hre.ethers.formatEther(balance);
    console.log(`💰 Balance: ${balanceFormatted} CELO`);
    
    if (balance < hre.ethers.parseEther("2")) {
      console.warn("⚠️  Warning: Balance is less than 2 CELO (recommended minimum)");
    }
  } catch (err) {
    console.error(`❌ Error checking deployer: ${err.message}`);
    allChecksPassed = false;
  }
  
  // 4. Check treasury address
  console.log("\n4️⃣  Checking Treasury Address...");
  const treasuryAddress = process.env.TREASURY_ADDRESS;
  if (!treasuryAddress) {
    console.warn("⚠️  TREASURY_ADDRESS not set, will use deployer address");
  } else if (!/^0x[a-fA-F0-9]{40}$/.test(treasuryAddress)) {
    console.error("❌ Invalid TREASURY_ADDRESS format");
    allChecksPassed = false;
  } else {
    console.log(`✅ Treasury: ${treasuryAddress}`);
  }
  
  // 5. Check cUSD address
  console.log("\n5️⃣  Checking cUSD Address...");
  const cusdMainnet = "0x765DE816845861e75A25fCA122bb6898B8B1282a";
  console.log(`✅ cUSD Mainnet: ${cusdMainnet}`);
  
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
  
  // 6. Check contracts compile
  console.log("\n6️⃣  Checking Contract Compilation...");
  try {
    await hre.run("compile");
    console.log("✅ Contracts compiled successfully");
  } catch (err) {
    console.error(`❌ Compilation failed: ${err.message}`);
    allChecksPassed = false;
  }
  
  // 7. Check tests
  console.log("\n7️⃣  Checking Tests...");
  console.log("⚠️  Skipping test execution (run manually: npm test)");
  console.log("   Make sure all tests pass before deploying!");
  
  // 8. Check .env is not committed
  console.log("\n8️⃣  Checking .env Security...");
  const envPath = path.join(__dirname, "..", ".env");
  const envMainnetPath = path.join(__dirname, "..", ".env.mainnet");
  
  if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, "utf8");
    if (envContent.includes("PRIVATE_KEY=") && envContent.includes("0x") && envContent.length > 20) {
      console.warn("⚠️  .env file contains what looks like a private key");
      console.warn("   Make sure .env is in .gitignore!");
    }
  }
  
  if (fs.existsSync(envMainnetPath)) {
    console.log("✅ .env.mainnet file exists");
  } else {
    console.warn("⚠️  .env.mainnet file not found (create it for mainnet deployment)");
  }
  
  // 9. Check git status
  console.log("\n9️⃣  Checking Git Status...");
  try {
    const { execSync } = require("child_process");
    const gitStatus = execSync("git status --porcelain", { encoding: "utf8" });
    if (gitStatus.trim()) {
      console.warn("⚠️  You have uncommitted changes");
      console.warn("   Consider committing before deploying to mainnet");
    } else {
      console.log("✅ Working directory is clean");
    }
  } catch (err) {
    console.warn("⚠️  Could not check git status");
  }
  
  // 10. Final summary
  console.log("\n" + "=".repeat(60));
  console.log("\n📊 SUMMARY:");
  
  if (allChecksPassed) {
    console.log("✅ All critical checks passed!");
    console.log("\n⚠️  IMPORTANT REMINDERS:");
    console.log("   1. Run tests: npm test");
    console.log("   2. Review contracts one more time");
    console.log("   3. Ensure you have sufficient CELO (2-5 CELO recommended)");
    console.log("   4. Have treasury address ready");
    console.log("   5. Consider security audit before mainnet deployment");
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


