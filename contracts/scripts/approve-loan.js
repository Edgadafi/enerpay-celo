require("dotenv").config();
const hre = require("hardhat");
const path = require("path");
const fs = require("fs");

async function main() {
  console.log("✅ Aprobar Préstamo\n");

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

  // Get loan details before approval
  const loan = await microfinancePool.getLoan(loanId);
  
  console.log(`📊 Estado actual: ${loan.status} (0=Pending, 1=Approved, 2=Active)`);
  console.log(`💰 Monto: ${hre.ethers.formatEther(loan.amount)} cUSD`);
  console.log(`👤 Prestatario: ${loan.borrower}`);
  console.log(`📈 Tasa de interés: ${Number(loan.interestRate) / 100}% APR`);
  console.log(`⏱️  Duración: ${loan.duration} meses\n`);

  if (loan.status !== 0n && loan.status !== 0) {
    throw new Error(`❌ El préstamo no está en estado Pending. Estado actual: ${loan.status}`);
  }

  // Approve loan
  console.log("🔄 Aprobando préstamo...");
  const tx = await microfinancePool.approveLoan(loanId);
  console.log(`📤 Transaction hash: ${tx.hash}`);
  console.log("⏳ Waiting for confirmation...\n");

  const receipt = await tx.wait();
  console.log(`✅ Transaction confirmed in block: ${receipt.blockNumber}\n`);

  // Verify loan status
  const updatedLoan = await microfinancePool.getLoan(loanId);
  console.log(`✅ Nuevo estado del préstamo: ${updatedLoan.status} (1=Approved)\n`);

  console.log("🔗 View transaction:");
  console.log(`   https://sepolia.celoscan.io/tx/${tx.hash}\n`);

  console.log("✅ Préstamo aprobado exitosamente!");
  console.log("\n💡 Próximo paso: Desembolsar el préstamo usando disburse-loan.js");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("\n❌ Error:", error.message);
    process.exit(1);
  });

