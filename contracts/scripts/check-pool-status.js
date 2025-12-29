require("dotenv").config();
const hre = require("hardhat");
const path = require("path");
const fs = require("fs");

async function main() {
  console.log("🔍 Verificando estado del pool...\n");

  // Use celoSepolia by default, or from network parameter
  const network = process.argv[2] || "celoSepolia";
  const deploymentFile = path.join(__dirname, "..", "deployments", `${network}-microfinance.json`);
  
  if (!fs.existsSync(deploymentFile)) {
    throw new Error(`Deployment file not found: ${deploymentFile}`);
  }

  const deploymentInfo = JSON.parse(fs.readFileSync(deploymentFile, "utf8"));
  const contractAddress = deploymentInfo.contractAddress;
  
  const abi = [
    "function poolBalance() view returns (uint256)",
    "function minLoanAmount() view returns (uint256)",
    "function cUSD() view returns (address)",
  ];
  
  const contract = new hre.ethers.Contract(contractAddress, abi, hre.ethers.provider);
  
  const poolBalance = await contract.poolBalance();
  const minLoan = await contract.minLoanAmount();
  const cUSDAddress = await contract.cUSD();
  
  console.log(`📋 Contrato: ${contractAddress}`);
  console.log(`💰 Pool Balance: ${hre.ethers.formatEther(poolBalance)} cUSD`);
  console.log(`💰 Min Loan: ${hre.ethers.formatEther(minLoan)} cUSD`);
  console.log(`💵 cUSD Address: ${cUSDAddress}\n`);
  
  if (poolBalance === 0n) {
    console.log("❌ PROBLEMA: El pool no tiene fondos");
    console.log("   Esto causa que todas las solicitudes de préstamo fallen");
    console.log("   porque el contrato verifica: poolBalance >= _amount\n");
    console.log("💡 SOLUCIÓN:");
    console.log("   Necesitas agregar fondos al pool usando addLiquidity()");
    console.log("   O modificar el contrato para permitir solicitudes sin fondos");
  } else if (poolBalance < minLoan) {
    console.log("⚠️  ADVERTENCIA: El pool tiene menos fondos que el préstamo mínimo");
  } else {
    console.log("✅ El pool tiene fondos suficientes");
  }
}

main().catch(console.error);

