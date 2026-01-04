require("dotenv").config();
const hre = require("hardhat");
const fs = require("fs");
const path = require("path");

async function main() {
  console.log("🔍 Verifying deployment...\n");

  const network = hre.network.name;
  const chainId = await hre.ethers.provider.getNetwork().then((n) => n.chainId);
  console.log(`📡 Network: ${network} (Chain ID: ${chainId})\n`);

  // Try to load deployment info
  const deploymentsDir = path.join(__dirname, "..", "deployments");
  const deploymentFile = path.join(deploymentsDir, `${network}.json`);
  const microfinanceFile = path.join(deploymentsDir, `${network}-microfinance.json`);

  let remittanceAddress = null;
  let microfinanceAddress = null;

  // Load EnerpayRemittance deployment
  if (fs.existsSync(deploymentFile)) {
    const deploymentInfo = JSON.parse(fs.readFileSync(deploymentFile, "utf8"));
    remittanceAddress = deploymentInfo.contractAddress;
    console.log(`📄 Found EnerpayRemittance deployment: ${remittanceAddress}`);
  } else {
    console.log(`⚠️  No deployment file found at: ${deploymentFile}`);
    console.log(`   Please provide contract address manually or deploy first.`);
  }

  // Load MicrofinancePool deployment
  if (fs.existsSync(microfinanceFile)) {
    const deploymentInfo = JSON.parse(fs.readFileSync(microfinanceFile, "utf8"));
    microfinanceAddress = deploymentInfo.contractAddress;
    console.log(`📄 Found MicrofinancePool deployment: ${microfinanceAddress}`);
  } else {
    console.log(`⚠️  No microfinance deployment file found at: ${microfinanceFile}`);
  }

  console.log();

  // Verify EnerpayRemittance
  if (remittanceAddress) {
    try {
      console.log("🔍 Verifying EnerpayRemittance...");
      const EnerpayRemittance = await hre.ethers.getContractFactory("EnerpayRemittance");
      const remittance = EnerpayRemittance.attach(remittanceAddress);

      const cUSD = await remittance.cUSD();
      const treasury = await remittance.treasuryAddress();
      const fee = await remittance.platformFee();
      const owner = await remittance.owner();
      const remittanceCount = await remittance.remittanceCount();

      console.log(`   ✅ Contract is deployed and accessible`);
      console.log(`   ✅ cUSD Address: ${cUSD}`);
      console.log(`   ✅ Treasury Address: ${treasury}`);
      console.log(`   ✅ Platform Fee: ${fee} basis points (${Number(fee) / 100}%)`);
      console.log(`   ✅ Owner: ${owner}`);
      console.log(`   ✅ Remittance Count: ${remittanceCount.toString()}\n`);
    } catch (error) {
      console.error(`   ❌ Error verifying EnerpayRemittance: ${error.message}\n`);
    }
  }

  // Verify MicrofinancePool
  if (microfinanceAddress) {
    try {
      console.log("🔍 Verifying MicrofinancePool...");
      const MicrofinancePool = await hre.ethers.getContractFactory("MicrofinancePool");
      const microfinance = MicrofinancePool.attach(microfinanceAddress);

      const cUSD = await microfinance.cUSD();
      const treasury = await microfinance.treasuryAddress();
      const minLoan = await microfinance.minLoanAmount();
      const maxLoan = await microfinance.maxLoanAmount();
      const baseRate = await microfinance.baseInterestRate();
      const poolBalance = await microfinance.poolBalance();
      const owner = await microfinance.owner();

      console.log(`   ✅ Contract is deployed and accessible`);
      console.log(`   ✅ cUSD Address: ${cUSD}`);
      console.log(`   ✅ Treasury Address: ${treasury}`);
      console.log(`   ✅ Min Loan: ${hre.ethers.formatEther(minLoan)} cUSD`);
      console.log(`   ✅ Max Loan: ${hre.ethers.formatEther(maxLoan)} cUSD`);
      console.log(`   ✅ Base Interest Rate: ${baseRate} basis points (${Number(baseRate) / 100}% APR)`);
      console.log(`   ✅ Pool Balance: ${hre.ethers.formatEther(poolBalance)} cUSD`);
      console.log(`   ✅ Owner: ${owner}\n`);
    } catch (error) {
      console.error(`   ❌ Error verifying MicrofinancePool: ${error.message}\n`);
    }
  }

  if (!remittanceAddress && !microfinanceAddress) {
    console.log("❌ No contracts found to verify.");
    console.log("   Please deploy contracts first or provide addresses manually.");
  } else {
    console.log("✅ Verification complete!");
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("\n❌ Error:", error);
    process.exit(1);
  });


