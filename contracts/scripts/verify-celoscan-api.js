require("dotenv").config({ path: ".env.mainnet", override: true });
const hre = require("hardhat");
const fs = require("fs");
const path = require("path");
const https = require("https");

async function main() {
  console.log("🔍 Verificación Programática usando Celoscan API\n");
  console.log("=".repeat(60));

  const contractAddress = "0xB35aB84408E28D0B81205293Dd2ed1d6E8566f1e";
  const apiKey = process.env.CELOSCAN_API_KEY || "PW8GY73YCAPSY8UKS2S6EKYYRV9SGH7SFP";
  const apiUrl = "https://api.celoscan.io/api";

  console.log(`📋 Contrato: ${contractAddress}`);
  console.log(`🔑 API Key: ${apiKey.substring(0, 10)}...`);
  console.log();

  // Leer el archivo JSON de compilación
  const buildInfoPath = path.join(__dirname, "..", "artifacts", "build-info");
  const buildInfoFiles = fs.readdirSync(buildInfoPath)
    .filter(f => f.endsWith(".json"))
    .map(f => ({
      name: f,
      path: path.join(buildInfoPath, f),
      time: fs.statSync(path.join(buildInfoPath, f)).mtime
    }))
    .sort((a, b) => b.time - a.time);

  if (buildInfoFiles.length === 0) {
    throw new Error("No se encontraron archivos de build-info");
  }

  const latestBuildInfo = buildInfoFiles[0];
  console.log(`📁 Usando archivo: ${latestBuildInfo.name}`);
  
  const buildInfo = JSON.parse(fs.readFileSync(latestBuildInfo.path, "utf8"));
  
  // Encontrar EnerpayRemittance
  const contractKey = Object.keys(buildInfo.output.contracts).find(
    k => k.includes("EnerpayRemittance")
  );

  if (!contractKey) {
    throw new Error("No se encontró EnerpayRemittance en el build-info");
  }

  const contract = buildInfo.output.contracts[contractKey].EnerpayRemittance;
  const sourceCode = buildInfo.input;
  
  // Parámetros del constructor
  const cusd = "0x765DE816845861e75A25fCA122bb6898B8B1282a";
  const treasury = "0x856Ff827A04Ee1dE5576e3d21e1985BD76fB24E7";
  
  // Preparar datos para la API
  const verificationData = {
    apikey: apiKey,
    module: "contract",
    action: "verifysourcecode",
    contractaddress: contractAddress,
    codeformat: "solidity-standard-json-input",
    contractname: "contracts/EnerpayRemittance.sol:EnerpayRemittance",
    compilerversion: `v${buildInfo.solcVersion}`,
    optimizationused: buildInfo.input.settings.optimizer.enabled ? 1 : 0,
    runs: buildInfo.input.settings.optimizer.runs || 200,
    constructorArguements: "000000000000000000000000765de816845861e75a25fca122bb6898b8b1282a000000000000000000000000856ff827a04ee1de5576e3d21e1985bd76fb24e7",
    sourceCode: JSON.stringify(sourceCode)
  };

  console.log("📤 Enviando solicitud de verificación...");
  console.log(`   Compiler: ${verificationData.compilerversion}`);
  console.log(`   Optimization: ${verificationData.optimizationused ? 'Yes' : 'No'} (${verificationData.runs} runs)`);
  console.log();

  // Enviar solicitud a la API
  const postData = JSON.stringify(verificationData);
  
  const options = {
    hostname: "api.celoscan.io",
    path: "/api",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Content-Length": postData.length
    }
  };

  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let data = "";

      res.on("data", (chunk) => {
        data += chunk;
      });

      res.on("end", () => {
        try {
          const response = JSON.parse(data);
          
          if (response.status === "1" && response.result) {
            console.log("✅ Verificación enviada exitosamente!");
            console.log(`📋 GUID: ${response.result}`);
            console.log();
            console.log("⏳ La verificación puede tardar unos minutos.");
            console.log("🔍 Verifica el estado en:");
            console.log(`   https://celoscan.io/address/${contractAddress}`);
            console.log();
            console.log("💡 Para verificar el estado, ejecuta:");
            console.log(`   npx hardhat verify --network celo ${contractAddress} ${cusd} ${treasury}`);
          } else {
            console.error("❌ Error en la verificación:");
            console.error(JSON.stringify(response, null, 2));
            reject(new Error(response.message || "Error desconocido"));
          }
        } catch (err) {
          console.error("❌ Error al procesar respuesta:");
          console.error(data);
          reject(err);
        }
      });
    });

    req.on("error", (err) => {
      console.error("❌ Error en la solicitud:");
      console.error(err.message);
      reject(err);
    });

    req.write(postData);
    req.end();
  });
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("\n❌ Error:", error.message);
    process.exit(1);
  });

