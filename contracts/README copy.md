# Enerpay Smart Contracts

Smart contracts para Enerpay en Celo blockchain.

## 📋 Contratos

### EnerpayRemittance.sol

Contrato principal para manejo de remesas usando cUSD.

**Características:**
- Envío de remesas con fees de plataforma (1.5% por defecto)
- Soporte para wallet-to-wallet (transferencia inmediata)
- Soporte para otros tipos de destino (requiere aprobación del owner)
- Historial de remesas por usuario
- Sistema de estados (Pending, Completed, Failed, Refunded)

## 🚀 Setup

### Instalar dependencias

```bash
npm install --save-dev @openzeppelin/contracts
npm install --save-dev hardhat @nomicfoundation/hardhat-toolbox
```

### Configuración Hardhat

Crea `hardhat.config.js`:

```javascript
require("@nomicfoundation/hardhat-toolbox");

module.exports = {
  solidity: {
    version: "0.8.20",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  networks: {
    alfajores: {
      url: "https://alfajores-forno.celo-testnet.org",
      accounts: [process.env.PRIVATE_KEY],
      chainId: 44787,
    },
    celo: {
      url: "https://forno.celo.org",
      accounts: [process.env.PRIVATE_KEY],
      chainId: 42220,
    },
  },
};
```

## 📝 Deploy

### Variables de entorno

```bash
export PRIVATE_KEY=tu_private_key
export CUSD_ADDRESS=0x765DE816845861e75A25fCA122bb6898B8B1282a  # Celo Mainnet
export TREASURY_ADDRESS=tu_treasury_address
```

### Script de deploy

```javascript
// scripts/deploy.js
const hre = require("hardhat");

async function main() {
  const cUSDAddress = process.env.CUSD_ADDRESS;
  const treasuryAddress = process.env.TREASURY_ADDRESS;

  const EnerpayRemittance = await hre.ethers.getContractFactory("EnerpayRemittance");
  const remittance = await EnerpayRemittance.deploy(cUSDAddress, treasuryAddress);

  await remittance.waitForDeployment();

  console.log("EnerpayRemittance deployed to:", await remittance.getAddress());
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
```

### Ejecutar deploy

```bash
# Testnet (Alfajores)
npx hardhat run scripts/deploy.js --network alfajores

# Mainnet (Celo)
npx hardhat run scripts/deploy.js --network celo
```

## 🔧 Uso del Contrato

### Enviar Remesa

```javascript
// Wallet-to-wallet (transferencia inmediata)
await remittance.sendRemittance(
  beneficiaryAddress,
  ethers.parseUnits("100", 18), // 100 cUSD
  "wallet",
  beneficiaryAddress
);

// Otro tipo de destino (requiere aprobación)
await remittance.sendRemittance(
  beneficiaryAddress,
  ethers.parseUnits("100", 18),
  "bank",
  "account_number_123"
);
```

### Completar Remesa (Owner)

```javascript
// Marcar como completada
await remittance.completeRemittance(
  remittanceId,
  1 // RemittanceStatus.Completed
);

// Marcar como fallida
await remittance.completeRemittance(
  remittanceId,
  2 // RemittanceStatus.Failed
);

// Reembolsar
await remittance.completeRemittance(
  remittanceId,
  3 // RemittanceStatus.Refunded
);
```

### Consultar Historial

```javascript
// Obtener IDs de remesas del usuario
const remittanceIds = await remittance.getRemittanceHistory(userAddress);

// Obtener detalles de una remesa
const remittance = await remittance.getRemittance(remittanceId);
```

## 📊 Estados de Remesa

- `0` - Pending: Remesa creada pero no completada
- `1` - Completed: Remesa completada exitosamente
- `2` - Failed: Remesa fallida
- `3` - Refunded: Remesa reembolsada al remitente

## 🔐 Seguridad

- ✅ ReentrancyGuard para prevenir ataques de reentrancy
- ✅ Ownable para funciones administrativas
- ✅ Validación de inputs
- ✅ Safe math (Solidity 0.8.20 tiene overflow protection)

## 📚 Direcciones de Celo

### Mainnet
- cUSD: `0x765DE816845861e75A25fCA122bb6898B8B1282a`
- cREAL: `0xe8537a3d056DA446677B9E2d2516b1ee149eE628`
- cEUR: `0xD8763CBa276a3738E6DE85b4b3bF5FDed6D6cA73`

### Alfajores (Testnet)
- cUSD: `0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1`

## 🧪 Testing

```bash
npx hardhat test
```

## 📄 Licencia

MIT

