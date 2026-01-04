const hre = require("hardhat");
const fs = require("fs");
const path = require("path");

/**
 * Script para generar datos de verificación para Celoscan
 * Genera el Standard JSON Input y los constructor arguments ABI-encoded
 */
async function main() {
  console.log("🔧 Generando datos de verificación para Celoscan...\n");

  // Constructor arguments
  const cUSDAddress = "0x765DE816845861e75A25fCA122bb6898B8B1282a";
  const treasuryAddress = "0x856Ff827A04Ee1dE5576e3d21e1985BD76fB24E7";

  console.log("📋 Constructor Arguments:");
  console.log(`   cUSD: ${cUSDAddress}`);
  console.log(`   Treasury: ${treasuryAddress}\n`);

  // ABI encode constructor arguments
  const { ethers } = hre;
  const iface = new ethers.Interface([
    "constructor(address _cUSD, address _treasuryAddress)"
  ]);
  
  const encodedArgs = iface.encodeDeploy([cUSDAddress, treasuryAddress]);
  // Remove the function selector (first 10 chars: 0x + 8 chars)
  const constructorArgs = encodedArgs.slice(2);
  
  console.log("🔑 Constructor Arguments (ABI-encoded):");
  console.log(`   ${constructorArgs}\n`);

  // Compile contract to get exact bytecode
  console.log("📦 Compilando contrato con configuración exacta...");
  await hre.run("compile");
  
  // Get compiled contract info
  const artifactPath = path.join(
    __dirname,
    "../artifacts/contracts/EnerpayRemittance.sol/EnerpayRemittance.json"
  );
  
  if (!fs.existsSync(artifactPath)) {
    throw new Error(`Artifact not found at ${artifactPath}`);
  }

  const artifact = JSON.parse(fs.readFileSync(artifactPath, "utf8"));
  
  console.log("✅ Compilación completada\n");
  
  // Get bytecode
  const bytecode = artifact.bytecode;
  const deployedBytecode = artifact.deployedBytecode;
  
  console.log("📊 Información del bytecode:");
  console.log(`   Bytecode length: ${bytecode.length} chars`);
  console.log(`   Deployed bytecode length: ${deployedBytecode.length} chars\n`);

  // Save verification data
  const verificationData = {
    contractAddress: "0xB35aB84408E28D0B81205293Dd2ed1d6E8566f1e",
    compilerVersion: "0.8.20",
    optimizer: {
      enabled: true,
      runs: 200
    },
    constructorArguments: constructorArgs,
    constructorArgsFormatted: `0x${constructorArgs}`,
    license: "MIT",
    sourceCode: fs.readFileSync(
      path.join(__dirname, "../contracts/EnerpayRemittance.sol"),
      "utf8"
    )
  };

  const outputPath = path.join(__dirname, "../verification-data.json");
  fs.writeFileSync(
    outputPath,
    JSON.stringify(verificationData, null, 2)
  );

  console.log("💾 Datos de verificación guardados en:");
  console.log(`   ${outputPath}\n`);

  console.log("📋 RESUMEN PARA CELOSCAN:");
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.log("Compiler Version: 0.8.20");
  console.log("License: MIT");
  console.log("Optimization: Yes (200 runs)");
  console.log(`Constructor Arguments: ${constructorArgs}`);
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");

  // Try to get Standard JSON Input
  try {
    const compilationOutput = await hre.artifacts.getBuildInfo(
      "contracts/EnerpayRemittance.sol:EnerpayRemittance"
    );
    
    if (compilationOutput) {
      const standardJsonPath = path.join(__dirname, "../standard-json-input.json");
      fs.writeFileSync(
        standardJsonPath,
        JSON.stringify(compilationOutput.input, null, 2)
      );
      console.log("✅ Standard JSON Input generado:");
      console.log(`   ${standardJsonPath}\n`);
    }
  } catch (error) {
    console.log("⚠️  No se pudo generar Standard JSON Input automáticamente");
    console.log(`   Error: ${error.message}\n`);
  }

  console.log("💡 RECOMENDACIÓN:");
  console.log("   Usa Sourcify (https://sourcify.dev) para verificación");
  console.log("   Es más flexible con bytecode mismatches\n");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

