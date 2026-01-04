require("dotenv").config();
const hre = require("hardhat");
const path = require("path");
const fs = require("fs");

async function main() {
  console.log("💰 Desembolsar Préstamo Aprobado\n");

  const network = "celoSepolia";
  const deploymentFile = path.join(__dirname, "..", "deployments", `${network}-microfinance.json`);
  
  if (!fs.existsSync(deploymentFile)) {
    throw new Error(`Deployment file not found: ${deploymentFile}`);
  }

  const deploymentInfo = JSON.parse(fs.readFileSync(deploymentFile, "utf8"));
  const contractAddress = deploymentInfo.contractAddress;
  
  const loanId = process.env.LOAN_ID || process.argv[2] || "0";
  
  console.log(`📋 Contrato: ${contractAddress}`);
  console.log(`📋 Loan ID: ${loanId}\n`);

  // Get deployer (must be owner)
  const signers = await hre.ethers.getSigners();
  const deployer = signers[0];
  console.log(`👤 Owner: ${deployer.address}\n`);

  // Get contract instance
  const MicrofinancePool = await hre.ethers.getContractFactory("MicrofinancePool");
  const microfinancePool = MicrofinancePool.attach(contractAddress);

  // Verify deployer is owner
  const owner = await microfinancePool.owner();
  if (owner.toLowerCase() !== deployer.address.toLowerCase()) {
    throw new Error(`❌ Deployer is not the owner. Owner: ${owner}`);
  }

  // Get loan details
  const loan = await microfinancePool.getLoan(loanId);
  const poolBalance = await microfinancePool.poolBalance();
  
  console.log(`📊 Estado del préstamo: ${loan.status} (0=Pending, 1=Approved, 2=Active)`);
  console.log(`💰 Monto: ${hre.ethers.formatEther(loan.amount)} cUSD`);
  console.log(`👤 Prestatario: ${loan.borrower}`);
  console.log(`💰 Pool Balance: ${hre.ethers.formatEther(poolBalance)} cUSD\n`);

  if (loan.status !== 1) {
    throw new Error(`❌ El préstamo no está aprobado. Estado: ${loan.status}`);
  }

  if (poolBalance < loan.amount) {
    console.log("⚠️  ADVERTENCIA: Pool no tiene fondos suficientes");
    console.log(`   Pool: ${hre.ethers.formatEther(poolBalance)} cUSD`);
    console.log(`   Necesario: ${hre.ethers.formatEther(loan.amount)} cUSD\n`);
    console.log("💡 Opciones:");
    console.log("   1. Agregar fondos al pool primero");
    console.log("   2. O modificar el contrato para permitir desembolso sin fondos (solo para testing)");
    return;
  }

  // Disburse loan
  console.log("🔄 Desembolsando préstamo...");
  const tx = await microfinancePool.disburseLoan(loanId);
  console.log(`📤 Transaction hash: ${tx.hash}`);
  console.log("⏳ Waiting for confirmation...\n");

  const receipt = await tx.wait();
  console.log(`✅ Transaction confirmed in block: ${receipt.blockNumber}\n`);

  // Verify loan status
  const updatedLoan = await microfinancePool.getLoan(loanId);
  console.log(`✅ Nuevo estado del préstamo: ${updatedLoan.status} (2=Active)\n`);

  // Check borrower balance
  const cUSDAddress = await microfinancePool.cUSD();
  const cUSD = new hre.ethers.Contract(
    cUSDAddress,
    ["function balanceOf(address) view returns (uint256)"],
    hre.ethers.provider
  );
  const borrowerBalance = await cUSD.balanceOf(loan.borrower);
  console.log(`💰 Balance del prestatario: ${hre.ethers.formatEther(borrowerBalance)} cUSD\n`);

  console.log("🔗 View transaction:");
  console.log(`   https://sepolia.celoscan.io/tx/${tx.hash}\n`);

  console.log("✅ Préstamo desembolsado exitosamente!");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("\n❌ Error:", error.message);
    process.exit(1);
  });


