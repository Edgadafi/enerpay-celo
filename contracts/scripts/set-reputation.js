require("dotenv").config();
const hre = require("hardhat");
const path = require("path");
const fs = require("fs");

async function main() {
  console.log("🎯 Asignar Reputación Manualmente\n");

  // Get network information
  const network = hre.network.name;
  const chainId = await hre.ethers.provider.getNetwork().then((n) => n.chainId);
  console.log(`📡 Network: ${network} (Chain ID: ${chainId})\n`);

  // Get deployer account (must be owner)
  const signers = await hre.ethers.getSigners();
  if (!signers || signers.length === 0) {
    throw new Error("No signers available. Please check your PRIVATE_KEY in .env file.");
  }
  const deployer = signers[0];
  console.log(`👤 Deploying with account: ${deployer.address}\n`);

  // Load deployment info
  const deploymentsDir = path.join(__dirname, "..", "deployments");
  const deploymentFile = path.join(deploymentsDir, `${network}-microfinance.json`);

  if (!fs.existsSync(deploymentFile)) {
    throw new Error(`Deployment file not found: ${deploymentFile}`);
  }

  const deploymentInfo = JSON.parse(fs.readFileSync(deploymentFile, "utf8"));
  const contractAddress = deploymentInfo.contractAddress;
  console.log(`📋 Contract Address: ${contractAddress}\n`);

  // Get contract instance
  const MicrofinancePool = await hre.ethers.getContractFactory("MicrofinancePool");
  const microfinancePool = MicrofinancePool.attach(contractAddress);

  // Verify deployer is owner
  const owner = await microfinancePool.owner();
  if (owner.toLowerCase() !== deployer.address.toLowerCase()) {
    throw new Error(`❌ Deployer is not the owner. Owner: ${owner}`);
  }
  console.log(`✅ Verified: Deployer is the owner\n`);

  // Get user address and reputation score from environment variables or command line
  // Try environment variables first, then command line arguments
  const userAddress = process.env.USER_ADDRESS || process.argv[2];
  const reputationScore = process.env.REPUTATION_SCORE || process.argv[3];

  if (!userAddress || !reputationScore) {
    console.log("📋 Usage:");
    console.log(`   Option 1: Using environment variables`);
    console.log(`   USER_ADDRESS=0x... REPUTATION_SCORE=200 npx hardhat run scripts/set-reputation.js --network ${network}`);
    console.log(`\n   Option 2: Using command line (may not work with Hardhat)`);
    console.log(`   node scripts/set-reputation.js 0x... 200`);
    console.log("\n📝 Example:");
    console.log(`   USER_ADDRESS=0xfCb8226A19ee56EBC79127CC4662a8F1a85D2d77 REPUTATION_SCORE=200 npx hardhat run scripts/set-reputation.js --network ${network}`);
    console.log("\n💡 Notes:");
    console.log("   - Reputation score must be between 0 and 1000");
    console.log("   - Minimum required for loans: 100");
    console.log("   - Recommended for testing: 200-500");
    process.exit(1);
  }

  // Validate address
  if (!/^0x[a-fA-F0-9]{40}$/.test(userAddress)) {
    throw new Error("Invalid user address format");
  }

  // Validate reputation score
  const score = parseInt(reputationScore);
  if (isNaN(score) || score < 0 || score > 1000) {
    throw new Error("Reputation score must be between 0 and 1000");
  }

  // Get current reputation
  const currentReputation = await microfinancePool.reputationScores(userAddress);
  console.log(`📊 Current reputation for ${userAddress}: ${currentReputation}/1000\n`);

  // Set new reputation
  console.log(`🔄 Setting reputation to ${score}/1000...`);
  const tx = await microfinancePool.setReputationScore(userAddress, score);
  console.log(`📤 Transaction hash: ${tx.hash}`);
  console.log("⏳ Waiting for confirmation...\n");

  const receipt = await tx.wait();
  console.log(`✅ Transaction confirmed in block: ${receipt.blockNumber}\n`);

  // Verify new reputation
  const newReputation = await microfinancePool.reputationScores(userAddress);
  console.log(`✅ New reputation for ${userAddress}: ${newReputation}/1000\n`);

  // Check minimum required
  const minReputation = await microfinancePool.minReputationScore();
  if (newReputation >= minReputation) {
    console.log(`✅ User can now request loans (minimum required: ${minReputation})`);
  } else {
    console.log(`⚠️  User still cannot request loans (minimum required: ${minReputation})`);
  }

  // Explorer link
  const explorers = {
    celoSepolia: "https://sepolia.celoscan.io",
    alfajores: "https://alfajores.celoscan.io",
    celo: "https://celoscan.io",
  };

  const explorer = explorers[network];
  if (explorer) {
    console.log(`\n🔗 View transaction: ${explorer}/tx/${tx.hash}`);
  }

  console.log("\n✅ Reputation set successfully!");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("\n❌ Error:", error.message);
    process.exit(1);
  });

