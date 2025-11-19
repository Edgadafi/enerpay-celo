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

  const filePath = path.join(deploymentsDir, `${network}.json`);
  fs.writeFileSync(filePath, JSON.stringify(deploymentInfo, null, 2));
  console.log(`💾 Deployment info saved to: ${filePath}`);
}

async function main() {
  console.log("🚀 Starting deployment of EnerpayRemittance...\n");

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
  console.log(`💰 Account balance: ${balanceFormatted} CELO`);

  // Check if balance is sufficient (at least 0.1 CELO recommended)
  if (balance < hre.ethers.parseEther("0.1")) {
    console.warn(
      `⚠️  Warning: Low balance! You may not have enough CELO for deployment.`
    );
  }
  console.log();

  // cUSD addresses for different networks
  const CUSD_ADDRESSES = {
    celoSepolia: "0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1", // Celo Sepolia Testnet
    alfajores: "0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1",
    celo: "0x765DE816845861e75A25fCA122bb6898B8B1282a",
    hardhat: "0x0000000000000000000000000000000000000000", // Mock for local testing
    localhost: "0x0000000000000000000000000000000000000000", // Mock for local testing
  };

  // Treasury address (use deployer as default if not set)
  const treasuryAddress =
    process.env.TREASURY_ADDRESS || deployer.address;

  // Validate treasury address
  if (!isValidAddress(treasuryAddress)) {
    throw new Error(`Invalid treasury address: ${treasuryAddress}`);
  }

  // Get cUSD address for current network
  let cUSDAddress = CUSD_ADDRESSES[network] || process.env.CUSD_ADDRESS;

  // For hardhat/localhost, allow deployment without cUSD (for testing)
  if (!cUSDAddress && (network === "hardhat" || network === "localhost")) {
    console.warn(
      "⚠️  No cUSD address provided. Using zero address for local testing."
    );
    cUSDAddress = "0x0000000000000000000000000000000000000000";
  }

  if (!cUSDAddress) {
    throw new Error(
      `cUSD address not found for network "${network}". Please set CUSD_ADDRESS in .env or use a supported network (celoSepolia, alfajores, celo)`
    );
  }

  // Validate cUSD address
  if (!isValidAddress(cUSDAddress)) {
    throw new Error(`Invalid cUSD address: ${cUSDAddress}`);
  }

  console.log(`📋 Configuration:`);
  console.log(`   - cUSD Address: ${cUSDAddress}`);
  console.log(`   - Treasury Address: ${treasuryAddress}`);
  console.log(`   - Platform Fee: 150 basis points (1.5%)\n`);

  // Deploy contract
  console.log("📦 Deploying EnerpayRemittance contract...");
  const EnerpayRemittance = await hre.ethers.getContractFactory(
    "EnerpayRemittance"
  );

  console.log("   ⏳ Waiting for deployment transaction...");
  const remittance = await EnerpayRemittance.deploy(
    cUSDAddress,
    treasuryAddress
  );

  await remittance.waitForDeployment();
  const contractAddress = await remittance.getAddress();

  // Wait for a few confirmations
  console.log("   ⏳ Waiting for confirmations...");
  if (network !== "hardhat" && network !== "localhost") {
    await remittance.deploymentTransaction()?.wait(2);
  }

  console.log(`✅ EnerpayRemittance deployed to: ${contractAddress}\n`);

  // Verify deployment by reading contract state
  console.log("🔍 Verifying deployment...");
  try {
    const cUSD = await remittance.cUSD();
    const treasury = await remittance.treasuryAddress();
    const fee = await remittance.platformFee();
    const owner = await remittance.owner();
    const remittanceCount = await remittance.remittanceCount();

    console.log(`   ✅ cUSD: ${cUSD}`);
    console.log(`   ✅ Treasury: ${treasury}`);
    console.log(
      `   ✅ Platform Fee: ${fee} basis points (${Number(fee) / 100}%)`
    );
    console.log(`   ✅ Owner: ${owner}`);
    console.log(`   ✅ Remittance Count: ${remittanceCount}\n`);

    // Verify addresses match
    if (cUSD.toLowerCase() !== cUSDAddress.toLowerCase()) {
      throw new Error("cUSD address mismatch!");
    }
    if (treasury.toLowerCase() !== treasuryAddress.toLowerCase()) {
      throw new Error("Treasury address mismatch!");
    }
    if (owner.toLowerCase() !== deployer.address.toLowerCase()) {
      throw new Error("Owner address mismatch!");
    }
  } catch (error) {
    console.error("   ❌ Verification failed:", error.message);
    throw error;
  }

  // Get deployment transaction details
  const deploymentTx = remittance.deploymentTransaction();
  const receipt = deploymentTx
    ? await hre.ethers.provider.getTransactionReceipt(deploymentTx.hash)
    : null;

  // Save deployment info
  const blockNumber = await hre.ethers.provider.getBlockNumber();
  const deploymentInfo = {
    network: network,
    chainId: chainId.toString(),
    contractAddress: contractAddress,
    deployer: deployer.address,
    cUSDAddress: cUSDAddress,
    treasuryAddress: treasuryAddress,
    platformFee: "150",
    timestamp: new Date().toISOString(),
    blockNumber: blockNumber,
    transactionHash: deploymentTx?.hash || "N/A",
    gasUsed: receipt?.gasUsed?.toString() || "N/A",
  };

  // Save to file
  saveDeploymentInfo(network, deploymentInfo);

  console.log("📄 Deployment Summary:");
  console.log(JSON.stringify(deploymentInfo, null, 2));

  // Instructions for next steps
  console.log("\n📝 Next Steps:");
  console.log("1. ✅ Save the contract address above");
  console.log("2. 📝 Update your frontend with the new contract address");
  if (network === "celo") {
    console.log("3. 🔍 Verify the contract on CeloScan:");
    console.log(
      `   npx hardhat verify --network ${network} ${contractAddress} ${cUSDAddress} ${treasuryAddress}`
    );
    console.log(`   Or visit: https://celoscan.io/address/${contractAddress}`);
  } else if (network === "celoSepolia") {
    console.log("3. 🔍 Verify the contract on Celo Sepolia Explorer:");
    console.log(
      `   npx hardhat verify --network ${network} ${contractAddress} ${cUSDAddress} ${treasuryAddress}`
    );
    console.log(
      `   Or visit: https://explorer.celo.org/sepolia/address/${contractAddress}`
    );
  } else if (network === "alfajores") {
    console.log("3. 🔍 Verify the contract on Alfajores CeloScan:");
    console.log(
      `   npx hardhat verify --network ${network} ${contractAddress} ${cUSDAddress} ${treasuryAddress}`
    );
    console.log(
      `   Or visit: https://alfajores.celoscan.io/address/${contractAddress}`
    );
  }
  console.log("4. 🧪 Test the contract with a small transaction");
  console.log("5. 📊 Monitor the contract on the block explorer");

  return contractAddress;
}

main()
  .then((address) => {
    console.log(`\n🎉 Deployment successful! Contract at: ${address}`);
    process.exit(0);
  })
  .catch((error) => {
    console.error("\n❌ Deployment failed:");
    console.error(error);
    process.exit(1);
  });

