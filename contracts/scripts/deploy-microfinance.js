require("dotenv").config();
const hre = require("hardhat");
const fs = require("fs");
const path = require("path");

// Helper function to validate Ethereum address
function isValidAddress(address) {
  return /^0x[a-fA-F0-9]{40}$/.test(address);
}

// Helper function to save deployment info to file
function saveDeploymentInfo(network, deploymentInfo) {
  const deploymentsDir = path.join(__dirname, "..", "deployments");
  if (!fs.existsSync(deploymentsDir)) {
    fs.mkdirSync(deploymentsDir, { recursive: true });
  }

  const filePath = path.join(deploymentsDir, `${network}-microfinance.json`);
  fs.writeFileSync(filePath, JSON.stringify(deploymentInfo, null, 2));
  console.log(`💾 Deployment info saved to: ${filePath}`);
}

async function main() {
  console.log("🚀 Starting deployment of MicrofinancePool...\n");

  // Get network information
  const network = hre.network.name;
  const chainId = await hre.ethers.provider.getNetwork().then((n) => n.chainId);
  console.log(`📡 Network: ${network} (Chain ID: ${chainId})`);

  // Validate network
  const supportedNetworks = ["celoSepolia", "alfajores", "celo", "hardhat", "localhost"];
  if (!supportedNetworks.includes(network) && chainId !== 11142220n && chainId !== 44787n && chainId !== 42220n) {
    console.warn(
      `⚠️  Warning: Network "${network}" may not be configured correctly.`
    );
  }

  // Get deployer account
  const signers = await hre.ethers.getSigners();
  if (!signers || signers.length === 0) {
    throw new Error(
      "No signers available. Please check your PRIVATE_KEY in .env file."
    );
  }
  const deployer = signers[0];
  console.log(`👤 Deploying with account: ${deployer.address}`);

  // Check balance
  const balance = await hre.ethers.provider.getBalance(deployer.address);
  const balanceFormatted = hre.ethers.formatEther(balance);
  console.log(`💰 Deployer balance: ${balanceFormatted} CELO`);

  if (balance < hre.ethers.parseEther("0.01")) {
    console.warn("⚠️  Warning: Low balance. Deployment may fail.");
  }

  // cUSD addresses for different networks
  const CUSD_ADDRESSES = {
    celoSepolia: "0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1",
    alfajores: "0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1",
    celo: "0x765DE816845861e75A25fCA122bb6898B8B1282a",
    hardhat: "0x0000000000000000000000000000000000000000",
    localhost: "0x0000000000000000000000000000000000000000",
  };

  // Get cUSD address
  let cUSDAddress = CUSD_ADDRESSES[network] || process.env.CUSD_ADDRESS;
  
  if (!cUSDAddress || cUSDAddress === "0x0000000000000000000000000000000000000000") {
    if (network === "hardhat" || network === "localhost") {
      console.log("📝 Using mock address for local testing");
      cUSDAddress = "0x0000000000000000000000000000000000000000";
    } else {
      throw new Error(`cUSD address not found for network: ${network}`);
    }
  }

  console.log(`💵 cUSD Address: ${cUSDAddress}`);

  // Get treasury address (use deployer if not set)
  const treasuryAddress = process.env.TREASURY_ADDRESS || deployer.address;
  if (!isValidAddress(treasuryAddress)) {
    throw new Error("Invalid TREASURY_ADDRESS in .env file");
  }
  console.log(`🏦 Treasury Address: ${treasuryAddress}`);

  // Deploy contract
  console.log("\n📦 Deploying MicrofinancePool contract...");
  const MicrofinancePool = await hre.ethers.getContractFactory("MicrofinancePool");
  const microfinancePool = await MicrofinancePool.deploy(cUSDAddress, treasuryAddress);
  
  await microfinancePool.waitForDeployment();
  const contractAddress = await microfinancePool.getAddress();
  
  console.log(`✅ MicrofinancePool deployed to: ${contractAddress}`);

  // Wait for confirmations
  console.log("⏳ Waiting for confirmations...");
  await new Promise((resolve) => setTimeout(resolve, 2000));

  // Verify deployment
  console.log("\n🔍 Verifying deployment...");
  try {
    const deployedCUSD = await microfinancePool.cUSD();
    const deployedTreasury = await microfinancePool.treasuryAddress();
    const minLoanAmount = await microfinancePool.minLoanAmount();
    const maxLoanAmount = await microfinancePool.maxLoanAmount();
    const baseInterestRate = await microfinancePool.baseInterestRate();

    console.log("✅ Contract verification:");
    console.log(`   - cUSD: ${deployedCUSD}`);
    console.log(`   - Treasury: ${deployedTreasury}`);
    console.log(`   - Min Loan: ${hre.ethers.formatEther(minLoanAmount)} cUSD`);
    console.log(`   - Max Loan: ${hre.ethers.formatEther(maxLoanAmount)} cUSD`);
    console.log(`   - Base Interest Rate: ${Number(baseInterestRate) / 100}% APR`);

    if (String(deployedCUSD).toLowerCase() !== String(cUSDAddress).toLowerCase()) {
      throw new Error("cUSD address mismatch");
    }
    if (String(deployedTreasury).toLowerCase() !== String(treasuryAddress).toLowerCase()) {
      throw new Error("Treasury address mismatch");
    }
  } catch (error) {
    console.error("❌ Verification failed:", error.message);
    throw error;
  }

  // Save deployment info
  const deploymentInfo = {
    network: network,
    chainId: chainId.toString(),
    contractName: "MicrofinancePool",
    contractAddress: contractAddress,
    deployer: deployer.address,
    cUSDAddress: cUSDAddress,
    treasuryAddress: treasuryAddress,
    deployedAt: new Date().toISOString(),
    transactionHash: microfinancePool.deploymentTransaction()?.hash || "N/A",
  };

  saveDeploymentInfo(network, deploymentInfo);

  // Explorer links
  const explorers = {
    celoSepolia: "https://explorer.celo.org/sepolia",
    alfajores: "https://alfajores.celoscan.io",
    celo: "https://celoscan.io",
  };

  const explorer = explorers[network];
  if (explorer) {
    console.log(`\n🔗 View on explorer: ${explorer}/address/${contractAddress}`);
    console.log(`\n📝 To verify the contract, run:`);
    console.log(`   npx hardhat verify --network ${network} ${contractAddress} "${cUSDAddress}" "${treasuryAddress}"`);
  }

  console.log("\n✅ Deployment completed successfully!");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("\n❌ Deployment failed:");
    console.error(error);
    process.exit(1);
  });

