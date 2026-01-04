require("dotenv").config();
const hre = require("hardhat");
const path = require("path");
const fs = require("fs");

async function main() {
  console.log("🔍 Verificando estado del préstamo...\n");

  const network = "celoSepolia";
  const deploymentFile = path.join(__dirname, "..", "deployments", `${network}-microfinance.json`);
  
  if (!fs.existsSync(deploymentFile)) {
    throw new Error(`Deployment file not found: ${deploymentFile}`);
  }

  const deploymentInfo = JSON.parse(fs.readFileSync(deploymentFile, "utf8"));
  const contractAddress = deploymentInfo.contractAddress;
  
  const userAddress = process.env.USER_ADDRESS || "0xfCb8226A19ee56EBC79127CC4662a8F1a85D2d77";
  
  const abi = [
    "function getUserLoans(address) view returns (uint256[])",
    "function getLoan(uint256) view returns (tuple(address borrower, uint256 amount, uint256 interestRate, uint256 duration, uint256 startTime, uint256 dueDate, uint256 amountPaid, uint8 status, string purpose))",
    "function loanCount() view returns (uint256)",
  ];
  
  const contract = new hre.ethers.Contract(contractAddress, abi, hre.ethers.provider);
  
  console.log(`📋 Contrato: ${contractAddress}`);
  console.log(`👤 Usuario: ${userAddress}\n`);
  
  // Get user's loans
  const loanIds = await contract.getUserLoans(userAddress);
  console.log(`📊 Total de préstamos: ${loanIds.length}\n`);
  
  if (loanIds.length === 0) {
    console.log("❌ No se encontraron préstamos para este usuario");
    return;
  }
  
  // Get latest loan
  const latestLoanId = loanIds[loanIds.length - 1];
  const loan = await contract.getLoan(latestLoanId);
  
  const statusNames = ["Pending", "Approved", "Active", "Repaid", "Defaulted", "Liquidated"];
  const status = statusNames[loan.status] || "Unknown";
  
  console.log(`📋 Préstamo ID: ${latestLoanId}`);
  console.log(`💰 Monto: ${hre.ethers.formatEther(loan.amount)} cUSD`);
  console.log(`📈 Tasa de interés: ${Number(loan.interestRate) / 100}% APR`);
  console.log(`⏱️  Duración: ${loan.duration} meses`);
  console.log(`📅 Fecha de vencimiento: ${new Date(Number(loan.dueDate) * 1000).toLocaleString()}`);
  console.log(`💵 Monto pagado: ${hre.ethers.formatEther(loan.amountPaid)} cUSD`);
  console.log(`📊 Estado: ${status} (${loan.status})\n`);
  
  if (loan.status === 0) {
    console.log("⏳ Estado: Pending - Esperando aprobación");
  } else if (loan.status === 1) {
    console.log("✅ Estado: Approved - Aprobado, listo para desembolso");
    console.log("💡 Próximo paso: El owner debe llamar a disburseLoan()");
  } else if (loan.status === 2) {
    console.log("✅ Estado: Active - Activo, siendo pagado");
  } else if (loan.status === 3) {
    console.log("✅ Estado: Repaid - Completamente pagado");
  }
}

main().catch(console.error);


