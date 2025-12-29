# 💱 Guía Completa: Swap CELO → cUSD en Celo Sepolia

## 📋 Tu Información

- **Wallet**: `0xfCb8226A19ee56EBC79127CC4662a8F1a85D2d77`
- **CELO Balance**: 8.04 CELO ✅
- **cUSD Balance**: 0.094 USDm ⚠️
- **Red**: Celo Sepolia (Chain ID: 11142220)
- **Contrato cUSD**: `0xdE9e4C3ce781b4bA68120d6261cbad65ce0aB00b`

## 🎯 Método 1: Usar CeloScan para Interactuar con Contratos (RECOMENDADO)

### Paso 1: Abre CeloScan
1. Ve a: **https://sepolia.celoscan.io/**
2. Conecta tu wallet (MetaMask)
3. Verifica que estés en **Celo Sepolia**

### Paso 2: Busca el Contrato de cUSD
1. En el buscador superior, ingresa: `0xdE9e4C3ce781b4bA68120d6261cbad65ce0aB00b`
2. Click en el contrato
3. Ve a la pestaña **"Contract"**
4. Click en **"Write Contract"**
5. Conecta tu wallet (botón "Connect to Web3")

### Paso 3: Busca Funciones de Swap
1. Revisa todas las funciones disponibles
2. Busca funciones como:
   - `swap`
   - `exchange`
   - `mint` (si el contrato lo permite)
   - `buy`
   - `exchangeCELOforToken`

### Paso 4: Si NO hay funciones de swap
El contrato de cUSD es solo un token ERC20, no tiene funciones de swap.
Necesitas encontrar un **contrato de swap** o **DEX**.

## 🎯 Método 2: Buscar Contratos de Swap en CeloScan

### Paso 1: Buscar Contratos Verificados
1. Ve a: https://sepolia.celoscan.io/
2. Click en **"Verified Contracts"** (en el menú)
3. Busca contratos con nombres como:
   - "Swap"
   - "Exchange"
   - "Mento"
   - "Ubeswap"
   - "Router"

### Paso 2: Revisar el Código del Contrato
1. Click en un contrato que parezca relevante
2. Ve a **"Contract"** > **"Code"**
3. Busca funciones de swap
4. Si encuentras una, ve a **"Write Contract"** y úsala

## 🎯 Método 3: Usar MetaMask para Enviar CELO Directamente

### Paso 1: Abre MetaMask
1. Abre la extensión de MetaMask
2. Asegúrate de estar en **Celo Sepolia**

### Paso 2: Intenta el Swap de MetaMask
1. Si tu versión de MetaMask tiene la función "Swap":
   - Click en **"Swap"** (si está disponible)
   - Selecciona **CELO** → **cUSD**
   - Ingresa cantidad
   - Confirma

2. Si NO tiene función Swap:
   - Ve al **Método 4** (interacción manual)

## 🎯 Método 4: Interacción Manual con Contrato de Swap

### Paso 1: Encuentra un Contrato de Swap
Necesitas la dirección de un contrato de swap. Opciones:

**A. Buscar en CeloScan:**
- Ve a: https://sepolia.celoscan.io/
- Busca "swap" o "exchange" en contratos verificados

**B. Usar un DEX conocido:**
- Ubeswap Router (si está en Sepolia)
- Mento Exchange (si está en Sepolia)

### Paso 2: Prepara la Transacción

Necesitas:
- **To**: Dirección del contrato de swap
- **Value**: Cantidad de CELO (en Wei)
- **Data**: Datos codificados de la función de swap

### Paso 3: Usa MetaMask para Enviar

1. Abre MetaMask
2. Click en **"Send"**
3. **To**: Dirección del contrato de swap
4. **Amount**: Cantidad de CELO (ej: 0.1)
5. **Hex Data**: Datos codificados (necesitas el ABI y parámetros)
6. Confirma

## 🎯 Método 5: Usar un Script de Node.js

### Paso 1: Crea el Script

Crea `contracts/scripts/swap-celo-cusd.js`:

```javascript
const { ethers } = require("hardhat");
require("dotenv").config();

async function main() {
  const provider = new ethers.JsonRpcProvider("https://forno.celo-sepolia.celo-testnet.org");
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
  
  console.log("👤 Wallet:", wallet.address);
  
  // Verifica balance
  const balance = await provider.getBalance(wallet.address);
  console.log("💰 CELO Balance:", ethers.formatEther(balance), "CELO");
  
  // IMPORTANTE: Necesitas la dirección del contrato de swap
  // Esto es un ejemplo - necesitas encontrar la dirección real
  const SWAP_CONTRACT = "0x..."; // Dirección del contrato de swap
  
  // ABI del contrato de swap (ejemplo)
  const SWAP_ABI = [
    "function swapExactETHForTokens(uint amountOutMin, address[] calldata path, address to, uint deadline) external payable returns (uint[] memory amounts)"
  ];
  
  const swapContract = new ethers.Contract(SWAP_CONTRACT, SWAP_ABI, wallet);
  
  // Parámetros del swap
  const amountOutMin = 0; // Cantidad mínima de cUSD a recibir
  const path = [
    "0x471EcE3750Da237f93B8E339c536989b8978a438", // CELO (Wrapped)
    "0xdE9e4C3ce781b4bA68120d6261cbad65ce0aB00b"  // cUSD
  ];
  const to = wallet.address; // Tu dirección
  const deadline = Math.floor(Date.now() / 1000) + 60 * 20; // 20 minutos
  
  // Cantidad de CELO a intercambiar
  const amountCELO = ethers.parseEther("0.1");
  
  try {
    console.log("\n🔄 Ejecutando swap...");
    const tx = await swapContract.swapExactETHForTokens(
      amountOutMin,
      path,
      to,
      deadline,
      { value: amountCELO }
    );
    
    console.log("📤 Transaction hash:", tx.hash);
    console.log("⏳ Esperando confirmación...");
    
    const receipt = await tx.wait();
    console.log("✅ Swap completado!");
    console.log("📋 Transaction receipt:", receipt);
  } catch (error) {
    console.error("❌ Error:", error.message);
  }
}

main().catch(console.error);
```

### Paso 2: Ejecuta el Script

```bash
cd contracts
node scripts/swap-celo-cusd.js
```

**⚠️ Nota**: Necesitas encontrar la dirección real del contrato de swap primero.

## 💡 Alternativa: Usar Alfajores Testnet

Si Celo Sepolia no tiene liquidez, usa Alfajores:

1. **Cambia a Alfajores** en MetaMask
2. **Obtén tokens** del faucet: https://celo.org/developers/faucet
3. **Usa Ubeswap** en Alfajores (más liquidez)
4. **Prueba tu app** en Alfajores

## 🔍 Cómo Encontrar Contratos de Swap

1. **CeloScan Verified Contracts**:
   - https://sepolia.celoscan.io/verifiedcontracts
   - Busca "swap", "exchange", "router"

2. **Documentación de Celo**:
   - https://docs.celo.org/
   - Busca información sobre DEXs en Sepolia

3. **GitHub de Proyectos Celo**:
   - Busca repositorios de Ubeswap, Mento, etc.
   - Revisa las direcciones de contratos en Sepolia

## ⚠️ Solución Rápida (Recomendada)

Dado que los swaps son complejos sin liquidez:

1. **Espera** a que el faucet tenga cUSD (puede tardar horas)
2. **Usa Alfajores** testnet en su lugar
3. **Solicita** cUSD a otro desarrollador
4. **Usa tu cUSD actual** (0.094) para probar con montos pequeños

## 📞 Próximos Pasos

1. Intenta el **Método 1** (CeloScan) primero
2. Si no funciona, busca contratos de swap
3. Como último recurso, usa Alfajores o espera al faucet

