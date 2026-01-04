require("dotenv").config();
const hre = require("hardhat");

async function main() {
  console.log("💰 Checking wallet balance...\n");

  const network = hre.network.name;
  const chainId = await hre.ethers.provider.getNetwork().then((n) => n.chainId);
  console.log(`📡 Network: ${network} (Chain ID: ${chainId})\n`);

  const signers = await hre.ethers.getSigners();
  if (!signers || signers.length === 0) {
    throw new Error("No signers available. Please check your PRIVATE_KEY in .env file.");
  }

  const deployer = signers[0];
  console.log(`👤 Wallet Address: ${deployer.address}\n`);

  // Check CELO balance
  const balance = await hre.ethers.provider.getBalance(deployer.address);
  const balanceFormatted = hre.ethers.formatEther(balance);
  console.log(`💵 CELO Balance: ${balanceFormatted} CELO`);

  // Check if balance is sufficient
  const minBalance = hre.ethers.parseEther("0.1");
  if (balance < minBalance) {
    console.log(`\n⚠️  WARNING: Low balance! You need at least 0.1 CELO for deployment.`);
    console.log(`   Current: ${balanceFormatted} CELO`);
    console.log(`   Recommended: 2-5 CELO for safe deployment`);
  } else {
    console.log(`\n✅ Balance is sufficient for deployment`);
  }

  // Estimate gas price
  try {
    const feeData = await hre.ethers.provider.getFeeData();
    if (feeData.gasPrice) {
      const gasPriceGwei = hre.ethers.formatUnits(feeData.gasPrice, "gwei");
      console.log(`\n⛽ Current Gas Price: ${gasPriceGwei} gwei`);
    }
  } catch (error) {
    console.log(`\n⚠️  Could not fetch gas price: ${error.message}`);
  }

  console.log("\n📝 Next Steps:");
  console.log("1. If balance is low, transfer CELO to this address");
  console.log("2. Run deployment script when ready");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("\n❌ Error:", error);
    process.exit(1);
  });


