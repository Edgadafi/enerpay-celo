require("dotenv").config();
const hre = require("hardhat");

async function main() {
  console.log("🔍 Verificando direcciones de cUSD en Celo Sepolia...\n");

  const provider = new hre.ethers.JsonRpcProvider("https://forno.celo-sepolia.celo-testnet.org");
  
  // Dirección de cUSD que está usando el contrato
  const contractCUSD = "0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1";
  // Dirección correcta de Sepolia
  const correctCUSD = "0xdE9e4C3ce781b4bA68120d6261cbad65ce0aB00b";
  
  console.log("📋 Direcciones a verificar:");
  console.log(`   1. Contrato actual: ${contractCUSD}`);
  console.log(`   2. Dirección correcta: ${correctCUSD}\n`);
  
  // Verificar si la dirección del contrato es un contrato válido
  const code1 = await provider.getCode(contractCUSD);
  const code2 = await provider.getCode(correctCUSD);
  
  console.log("🔍 Resultados:");
  console.log(`   Dirección en contrato: ${code1 !== "0x" ? "✅ Es un contrato" : "❌ No es un contrato"}`);
  console.log(`   Dirección correcta: ${code2 !== "0x" ? "✅ Es un contrato" : "❌ No es un contrato"}\n`);
  
  // Intentar leer el símbolo del token
  if (code1 !== "0x") {
    try {
      const token1 = new hre.ethers.Contract(
        contractCUSD,
        ["function symbol() view returns (string)"],
        provider
      );
      const symbol1 = await token1.symbol();
      console.log(`   Símbolo del token en contrato: ${symbol1}`);
    } catch (err) {
      console.log(`   ⚠️  Error al leer símbolo: ${err.message}`);
    }
  }
  
  if (code2 !== "0x") {
    try {
      const token2 = new hre.ethers.Contract(
        correctCUSD,
        ["function symbol() view returns (string)"],
        provider
      );
      const symbol2 = await token2.symbol();
      console.log(`   Símbolo del token correcto: ${symbol2}`);
    } catch (err) {
      console.log(`   ⚠️  Error al leer símbolo: ${err.message}`);
    }
  }
  
  console.log("\n📊 Conclusión:");
  if (code1 === "0x" && code2 !== "0x") {
    console.log("   ❌ PROBLEMA: La dirección en el contrato NO es válida en Sepolia");
    console.log("   💡 Necesitas redesplegar el contrato con la dirección correcta");
  } else if (code1 !== "0x" && code2 !== "0x") {
    console.log("   ⚠️  Ambas direcciones son contratos.");
    console.log("   💡 Verifica cuál es la dirección oficial de cUSD en Sepolia");
  } else if (code1 !== "0x" && code2 === "0x") {
    console.log("   ✅ La dirección en el contrato es válida");
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("\n❌ Error:", error);
    process.exit(1);
  });

