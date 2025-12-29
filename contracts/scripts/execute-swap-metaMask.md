# 🔄 Guía Paso a Paso: Swap CELO → cUSD usando MetaMask

## 📋 Información de tu Wallet

- **Dirección**: `0xfCb8226A19ee56EBC79127CC4662a8F1a85D2d77`
- **Red**: Celo Sepolia (Chain ID: 11142220)
- **Contrato cUSD**: `0xdE9e4C3ce781b4bA68120d6261cbad65ce0aB00b`

## 🎯 Método 1: Usar MetaMask Swap (Si está disponible)

### Paso 1: Abre MetaMask
1. Abre la extensión de MetaMask
2. Asegúrate de estar en **Celo Sepolia**
3. Ve a la pestaña **"Swap"** (si está disponible en tu versión)

### Paso 2: Configura el Swap
1. **From**: Selecciona **CELO**
2. **To**: Selecciona **cUSD** (puede aparecer como "USDm" o "Celo Dollar")
3. **Amount**: Ingresa la cantidad (ej: `0.1` CELO)
4. Revisa la tasa de cambio estimada
5. Click en **"Swap"**

### Paso 3: Confirma la Transacción
1. Revisa los detalles del swap
2. Confirma en MetaMask
3. Espera la confirmación

## 🎯 Método 2: Interacción Directa con Contrato usando CeloScan

### Paso 1: Abre CeloScan
1. Ve a: https://sepolia.celoscan.io/
2. Conecta tu wallet (MetaMask)
3. Asegúrate de estar en Celo Sepolia

### Paso 2: Busca el Contrato de cUSD
1. Busca: `0xdE9e4C3ce781b4bA68120d6261cbad65ce0aB00b`
2. Ve a la página del contrato
3. Click en la pestaña **"Contract"**
4. Click en **"Write Contract"**
5. Conecta tu wallet

### Paso 3: Busca Funciones de Swap
1. Revisa las funciones disponibles
2. Busca funciones como:
   - `swap`
   - `exchange`
   - `mint` (si el contrato lo permite)
   - `buy`

### Paso 4: Ejecuta la Función
1. Ingresa los parámetros necesarios
2. Confirma la transacción
3. Espera la confirmación

## 🎯 Método 3: Usar un DEX con Liquidez Mínima

### Paso 1: Intenta Ubeswap con Cantidad Pequeña
1. Ve a: https://app.ubeswap.org/
2. Conecta tu wallet
3. Cambia a **Celo Sepolia**
4. Intenta un swap de **0.01 CELO** (cantidad muy pequeña)
5. Si funciona, repite con más cantidad

### Paso 2: Intenta Moola Market
1. Ve a: https://app.moola.market/
2. Conecta tu wallet
3. Cambia a **Celo Sepolia**
4. Intenta hacer un swap o préstamo

## 🎯 Método 4: Usar Script de Node.js (Más Control)

### Paso 1: Crea el Script

Crea un archivo `swap.js`:

```javascript
const { ethers } = require("hardhat");
require("dotenv").config();

async function main() {
  // Configuración
  const provider = new ethers.JsonRpcProvider("https://forno.celo-sepolia.celo-testnet.org");
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
  
  console.log("👤 Wallet:", wallet.address);
  
  // Verifica balance de CELO
  const celoBalance = await provider.getBalance(wallet.address);
  console.log("💰 CELO Balance:", ethers.formatEther(celoBalance), "CELO");
  
  // Contrato cUSD
  const cUSD_ADDRESS = "0xdE9e4C3ce781b4bA68120d6261cbad65ce0aB00b";
  
  // Para hacer un swap, necesitas:
  // 1. Dirección del contrato de swap (Mento, Ubeswap, etc.)
  // 2. ABI del contrato
  // 3. Función específica de swap
  
  console.log("\n⚠️  Para hacer el swap, necesitas un contrato de swap.");
  console.log("   En testnet, esto puede no estar disponible.");
  console.log("\n💡 Alternativas:");
  console.log("   1. Usar el faucet cuando tenga cUSD disponible");
  console.log("   2. Usar Alfajores testnet (más liquidez)");
  console.log("   3. Solicitar cUSD a otro desarrollador");
}

main().catch(console.error);
```

### Paso 2: Ejecuta el Script

```bash
cd contracts
node swap.js
```

## 🎯 Método 5: Solicitar cUSD Directamente (Más Rápido)

### Opción A: Faucet con GitHub
1. Ve a: https://faucet.celo.org/celo-sepolia
2. Conecta con GitHub (da más tokens)
3. Solicita cUSD
4. Espera unos minutos

### Opción B: Solicitar a Otro Desarrollador
1. Comparte tu dirección: `0xfCb8226A19ee56EBC79127CC4662a8F1a85D2d77`
2. Pide que te envíen cUSD de testnet
3. Puedes devolverles CELO si quieres

## 💡 Recomendación Final

Dado que:
- El faucet solo tiene CELO
- Los DEXs no tienen liquidez
- Los swaps directos requieren contratos específicos

**La mejor opción es:**
1. **Esperar** a que el faucet tenga cUSD disponible (puede tardar horas)
2. **Usar Alfajores** testnet en su lugar (más establecido, más liquidez)
3. **Solicitar** cUSD a otro desarrollador de la comunidad

## 🔗 Enlaces Útiles

- **CeloScan Sepolia**: https://sepolia.celoscan.io/
- **Faucet**: https://faucet.celo.org/celo-sepolia
- **Ubeswap**: https://app.ubeswap.org/
- **Moola Market**: https://app.moola.market/
- **Documentación Celo**: https://docs.celo.org/

