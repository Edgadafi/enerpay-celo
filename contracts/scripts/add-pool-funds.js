require("dotenv").config();
const hre = require("hardhat");
const path = require("path");
const fs = require("fs");

async function main() {
  console.log("💰 Agregar Fondos al Pool\n");

  const network = "celoSepolia";
  const deploymentFile = path.join(__dirname, "..", "deployments", `${network}-microfinance.json`);
  
  if (!fs.existsSync(deploymentFile)) {
    throw new Error(`Deployment file not found: ${deploymentFile}`);
  }

  const deploymentInfo = JSON.parse(fs.readFileSync(deploymentFile, "utf8"));
  const contractAddress = deploymentInfo.contractAddress;
  const cUSDAddress = "0xdE9e4C3ce781b4bA68120d6261cbad65ce0aB00b";
  
  const amount = process.env.AMOUNT || "100"; // Default 100 cUSD
  
  console.log(`📋 Contrato: ${contractAddress}`);
  console.log(`💵 cUSD Address: ${cUSDAddress}`);
  console.log(`💰 Monto a agregar: ${amount} cUSD\n`);

  // Get deployer
  const signers = await hre.ethers.getSigners();
  const deployer = signers[0];
  console.log(`👤 Deployer: ${deployer.address}\n`);

  // Get cUSD contract
  const cUSD = new hre.ethers.Contract(
    cUSDAddress,
    [
      "function balanceOf(address) view returns (uint256)",
      "function approve(address, uint256) returns (bool)",
      "function allowance(address, address) view returns (uint256)",
    ],
    deployer
  );

  // Check balance
  const balance = await cUSD.balanceOf(deployer.address);
  console.log(`💰 Balance de cUSD: ${hre.ethers.formatEther(balance)} cUSD\n`);

  const amountWei = hre.ethers.parseEther(amount);
  if (balance < amountWei) {
    throw new Error(`❌ Balance insuficiente. Necesitas ${amount} cUSD`);
  }

  // Check allowance
  const allowance = await cUSD.allowance(deployer.address, contractAddress);
  console.log(`📊 Allowance actual: ${hre.ethers.formatEther(allowance)} cUSD`);

  if (allowance < amountWei) {
    console.log("🔄 Aprobando cUSD para el contrato...");
    const approveTx = await cUSD.approve(contractAddress, hre.ethers.MaxUint256);
    await approveTx.wait();
    console.log("✅ Aprobación completada\n");
  }

  // Get MicrofinancePool contract
  const MicrofinancePool = await hre.ethers.getContractFactory("MicrofinancePool");
  const microfinancePool = MicrofinancePool.attach(contractAddress);

  // Check if contract has addLiquidity function
  // If not, we'll need to transfer directly to the contract
  try {
    console.log("🔄 Agregando fondos al pool...");
    // Try to call addLiquidity if it exists
    const tx = await microfinancePool.addLiquidity(amountWei);
    console.log(`📤 Transaction hash: ${tx.hash}`);
    await tx.wait();
    console.log("✅ Fondos agregados exitosamente\n");
  } catch (err) {
    // If addLiquidity doesn't exist, transfer directly
    console.log("⚠️  addLiquidity no existe, transfiriendo directamente...");
    const tx = await cUSD.transfer(contractAddress, amountWei);
    console.log(`📤 Transaction hash: ${tx.hash}`);
    await tx.wait();
    console.log("✅ Fondos transferidos al contrato\n");
    console.log("💡 NOTA: Necesitas actualizar poolBalance manualmente o usar una función del owner");
  }

  // Check new pool balance
  const poolBalance = await microfinancePool.poolBalance();
  console.log(`💰 Nuevo pool balance: ${hre.ethers.formatEther(poolBalance)} cUSD\n`);

  console.log("✅ Proceso completado!");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("\n❌ Error:", error.message);
    process.exit(1);
  });

