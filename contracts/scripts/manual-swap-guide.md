# 💱 Guía Paso a Paso: Swap CELO → cUSD en Celo Sepolia

## 📋 Información Necesaria

- **Tu Wallet**: `0xfCb8226A19ee56EBC79127CC4662a8F1a85D2d77`
- **Contrato cUSD**: `0xdE9e4C3ce781b4bA68120d6261cbad65ce0aB00b`
- **Red**: Celo Sepolia (Chain ID: 11142220)
- **RPC URL**: `https://forno.celo-sepolia.celo-testnet.org`
- **Explorer**: `https://sepolia.celoscan.io/`

## 🎯 Opción A: Usar CeloScan para Interactuar con Contratos

### Paso 1: Abre CeloScan
1. Ve a: https://sepolia.celoscan.io/
2. Conecta tu wallet (MetaMask)
3. Asegúrate de estar en Celo Sepolia

### Paso 2: Busca un Contrato de Swap
1. Busca contratos de swap disponibles en Sepolia
2. O usa el contrato de cUSD directamente si tiene función de mint/swap

### Paso 3: Interactúa con el Contrato
1. Ve a la página del contrato
2. Click en "Contract" > "Write Contract"
3. Conecta tu wallet
4. Busca funciones de swap o exchange

## 🎯 Opción B: Usar MetaMask para Enviar CELO y Recibir cUSD

### Paso 1: Abre MetaMask
1. Abre MetaMask
2. Asegúrate de estar en Celo Sepolia
3. Ve a la pestaña "Swap" (si está disponible)

### Paso 2: Configura el Swap
1. Selecciona CELO como "From"
2. Selecciona cUSD como "To"
3. Ingresa la cantidad (ej: 0.1 CELO)
4. Revisa la tasa de cambio
5. Confirma la transacción

## 🎯 Opción C: Interacción Directa con Contrato (Avanzado)

### Paso 1: Prepara los Datos de la Transacción

Necesitas:
- **To**: Dirección del contrato de swap (si existe)
- **Data**: Datos codificados de la función de swap
- **Value**: Cantidad de CELO a intercambiar (en Wei)

### Paso 2: Usa MetaMask para Enviar la Transacción

1. Abre MetaMask
2. Click en "Send"
3. En "To", ingresa la dirección del contrato de swap
4. En "Amount", ingresa la cantidad de CELO
5. En "Hex Data", ingresa los datos codificados de la función
6. Confirma la transacción

## 🎯 Opción D: Usar un Script de Node.js (Más Control)

### Paso 1: Crea un Script de Swap

```javascript
const { ethers } = require("hardhat");

async function swapCELOtoCUSD() {
  // Tu wallet
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY);
  const provider = new ethers.JsonRpcProvider("https://forno.celo-sepolia.celo-testnet.org");
  const signer = wallet.connect(provider);
  
  // Contrato cUSD
  const cUSD_ADDRESS = "0xdE9e4C3ce781b4bA68120d6261cbad65ce0aB00b";
  
  // Cantidad a intercambiar (0.1 CELO)
  const amountCELO = ethers.parseEther("0.1");
  
  // Aquí necesitarías la dirección del contrato de swap
  // Por ahora, esto es un ejemplo
  console.log("Para hacer el swap, necesitas:");
  console.log("1. Dirección del contrato de swap");
  console.log("2. ABI del contrato de swap");
  console.log("3. Función de swap específica");
}
```

### Paso 2: Ejecuta el Script

```bash
cd contracts
npx hardhat run scripts/swap-script.js --network celoSepolia
```

## 💡 Alternativa: Usar Alfajores Testnet

Si Celo Sepolia no tiene suficiente liquidez, puedes usar Alfajores:

1. Cambia a Alfajores en MetaMask
2. Obtén tokens del faucet: https://celo.org/developers/faucet
3. Usa Ubeswap en Alfajores (más liquidez)
4. O prueba tu aplicación en Alfajores

## 🔍 Buscar Contratos de Swap Disponibles

Para encontrar contratos de swap en Celo Sepolia:

1. Ve a: https://sepolia.celoscan.io/
2. Busca "swap" o "exchange" en el buscador
3. Revisa contratos verificados
4. Lee el código fuente para entender cómo funcionan

## ⚠️ Nota Importante

En testnet, la liquidez suele ser limitada. Si no puedes hacer el swap:
- Espera a que el faucet tenga cUSD disponible
- Usa Alfajores testnet en su lugar
- Solicita cUSD a otro desarrollador
- Usa un bridge desde otra testnet

