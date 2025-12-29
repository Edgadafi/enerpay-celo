require("dotenv").config();
const hre = require("hardhat");

async function main() {
  const provider = new hre.ethers.JsonRpcProvider("https://forno.celo-sepolia.celo-testnet.org");
  
  // Nuevo contrato
  const newContract = "0x86c3C8e2cf4F4E76850a276D9E94bb024B07F40B";
  // Contrato antiguo
  const oldContract = "0x79Cdf63629bB1a9c5199416Fcc72Ab9FCD8bBea2";
  
  const userAddress = "0xfCb8226A19ee56EBC79127CC4662a8F1a85D2d77";
  
  const abi = ["function reputationScores(address) view returns (uint256)"];
  
  console.log("🔍 Verificando reputación en ambos contratos...\n");
  
  // Verificar en nuevo contrato
  try {
    const newContractInstance = new hre.ethers.Contract(newContract, abi, provider);
    const newReputation = await newContractInstance.reputationScores(userAddress);
    console.log(`✅ Nuevo contrato (0x86c3...): ${newReputation}/1000`);
  } catch (err) {
    console.log(`❌ Nuevo contrato: Error - ${err.message}`);
  }
  
  // Verificar en contrato antiguo
  try {
    const oldContractInstance = new hre.ethers.Contract(oldContract, abi, provider);
    const oldReputation = await oldContractInstance.reputationScores(userAddress);
    console.log(`📋 Contrato antiguo (0x79Cd...): ${oldReputation}/1000`);
  } catch (err) {
    console.log(`❌ Contrato antiguo: Error - ${err.message}`);
  }
}

main().catch(console.error);

