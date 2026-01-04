# 🚀 Guía de Despliegue a Celo Mainnet - Paso a Paso

> **⚠️ CRÍTICO: Lee esta guía completa antes de desplegar**

---

## 📋 Índice

1. [Pre-requisitos](#pre-requisitos)
2. [Checklist de Seguridad](#checklist-de-seguridad)
3. [Configuración](#configuración)
4. [Despliegue](#despliegue)
5. [Verificación](#verificación)
6. [Post-Despliegue](#post-despliegue)

---

## 🔒 Pre-requisitos

### 1. Seguridad (CRÍTICO)

- [ ] **Auditoría de Contratos**: Recomendado antes de mainnet
- [ ] **Revisión de Código**: Al menos 2 desarrolladores
- [ ] **Tests Completos**: Todos los tests pasando
- [ ] **Testing en Testnet**: Sin errores por al menos 1 semana

### 2. Recursos Necesarios

- [ ] **Balance de CELO**: Mínimo 2-5 CELO en wallet de despliegue
- [ ] **Wallet Dedicada**: Wallet separada solo para despliegue
- [ ] **Treasury Address**: Dirección para recibir fees (preferible multi-sig)
- [ ] **API Key de Celoscan**: Para verificación de contratos (opcional)

### 3. Información de Mainnet

```
Network: Celo Mainnet
Chain ID: 42220
RPC URL: https://forno.celo.org
Explorer: https://celoscan.io
cUSD Address: 0x765DE816845861e75A25fCA122bb6898B8B1282a
```

---

## ✅ Checklist de Seguridad

### Antes de Desplegar

- [ ] Contratos compilan sin errores
- [ ] Todos los tests pasando
- [ ] Revisión de código completada
- [ ] Variables de entorno configuradas
- [ ] Wallet de despliegue preparada
- [ ] Balance de CELO suficiente
- [ ] Treasury address verificada
- [ ] `.env` en `.gitignore`
- [ ] Private keys seguras (nunca en repo)

### Verificaciones de Código

- [ ] `ReentrancyGuard` en funciones críticas
- [ ] `Ownable` o `AccessControl` implementado
- [ ] Validación de inputs en todas las funciones
- [ ] Fees limitados (máx 10%)
- [ ] SafeERC20 para transferencias de tokens

---

## ⚙️ Configuración

### Paso 1: Crear archivo `.env.mainnet`

En `contracts/.env.mainnet`:

```env
# Network
NETWORK=celo

# Private Key (NUNCA commitees esto!)
PRIVATE_KEY=tu_private_key_aqui

# Treasury Address (dirección que recibirá fees)
TREASURY_ADDRESS=0x...

# cUSD Address (mainnet - ya está en el código)
CUSD_ADDRESS=0x765DE816845861e75A25fCA122bb6898B8B1282a

# Celoscan API Key (opcional, para verificación)
CELOSCAN_API_KEY=tu_api_key_aqui
```

**⚠️ IMPORTANTE:**
- NUNCA commitees este archivo
- Usa una wallet dedicada para despliegue
- Almacena private keys de forma segura

### Paso 2: Verificar Configuración

```bash
cd contracts

# Ejecutar pre-deployment check
npx hardhat run scripts/pre-deploy-check.js --network celo
```

Este script verificará:
- ✅ Network correcto (Celo Mainnet)
- ✅ Private key configurada
- ✅ Balance de CELO suficiente
- ✅ Contratos compilan
- ✅ Direcciones correctas

### Paso 3: Compilar Contratos

```bash
cd contracts
npx hardhat compile
```

Verifica que no hay errores de compilación.

### Paso 4: Ejecutar Tests

```bash
cd contracts
npm test
```

**⚠️ CRÍTICO: Todos los tests deben pasar antes de desplegar**

---

## 📦 Despliegue

### Paso 1: Verificación Final

```bash
cd contracts

# Ejecutar pre-deployment check
npx hardhat run scripts/pre-deploy-check.js --network celo
```

Si todos los checks pasan, continúa.

### Paso 2: Desplegar EnerpayRemittance

```bash
cd contracts

# Desplegar contrato de remittances
npx hardhat run scripts/deploy.js --network celo
```

**Output esperado:**
```
🚀 Starting deployment of EnerpayRemittance...
📡 Network: celo (Chain ID: 42220)
👤 Deploying with account: 0x...
💰 Account balance: X.XX CELO
📋 Configuration:
   - cUSD Address: 0x765DE816845861e75A25fCA122bb6898B8B1282a
   - Treasury Address: 0x...
   - Platform Fee: 150 basis points (1.5%)
✅ EnerpayRemittance deployed to: 0x...
```

**📝 GUARDAR:**
- Contract Address: `0x...`
- Transaction Hash: `0x...`
- Block Number: `...`

### Paso 3: Desplegar MicrofinancePool

```bash
cd contracts

# Desplegar contrato de microfinanzas
npx hardhat run scripts/deploy-microfinance.js --network celo
```

**📝 GUARDAR:**
- Contract Address: `0x...`
- Transaction Hash: `0x...`
- Block Number: `...`

### Paso 4: Verificar Despliegue

```bash
cd contracts

# Verificar que los contratos están desplegados
npx hardhat run scripts/verify-deployment.js --network celo
```

---

## 🔍 Verificación

### Paso 1: Verificar en Celoscan

1. Visita: `https://celoscan.io/address/<CONTRACT_ADDRESS>`
2. Verifica que el contrato existe
3. Verifica que las transacciones están confirmadas

### Paso 2: Verificar Código Fuente (Opcional)

```bash
cd contracts

# Verificar EnerpayRemittance
npx hardhat verify --network celo \
  <ENERPAY_REMITTANCE_ADDRESS> \
  "0x765DE816845861e75A25fCA122bb6898B8B1282a" \
  "<TREASURY_ADDRESS>"

# Verificar MicrofinancePool
npx hardhat verify --network celo \
  <MICROFINANCE_POOL_ADDRESS> \
  "0x765DE816845861e75A25fCA122bb6898B8B1282a" \
  "<TREASURY_ADDRESS>"
```

### Paso 3: Verificar Parámetros

Usa el script de verificación:
```bash
npx hardhat run scripts/verify-deployment.js --network celo
```

Verifica:
- ✅ cUSD address correcto
- ✅ Treasury address correcto
- ✅ Owner es la dirección correcta
- ✅ Fees configurados correctamente

---

## 🎨 Actualización del Frontend

### Paso 1: Actualizar Constantes

Editar `frontend/src/lib/celo/constants.ts`:

```typescript
export const CONTRACTS = {
  // EnerpayRemittance Mainnet
  ENERPAY_REMITTANCE_MAINNET: "0x...", // Nueva dirección
  
  // MicrofinancePool Mainnet
  MICROFINANCE_POOL_MAINNET: "0x...",  // Nueva dirección
  
  // ... otros contratos
} as const;
```

### Paso 2: Actualizar Variables de Entorno

En Vercel o tu plataforma de hosting:

```env
# Celo Mainnet
NEXT_PUBLIC_CELO_CHAIN_ID=42220
NEXT_PUBLIC_CELO_RPC_URL=https://forno.celo.org

# Contract Addresses
NEXT_PUBLIC_REMITTANCE_CONTRACT_ADDRESS=0x...
NEXT_PUBLIC_MICROFINANCE_CONTRACT_ADDRESS=0x...

# WalletConnect
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=tu_project_id
```

### Paso 3: Build y Deploy

```bash
cd frontend
npm run build
# Verificar que build es exitoso
vercel --prod
```

---

## 🧪 Post-Despliegue

### Testing Inicial (Con Montos Pequeños)

1. **Test Remittance:**
   - [ ] Enviar remesa pequeña (ej: 1 cUSD)
   - [ ] Verificar que se completa
   - [ ] Verificar fee se cobra correctamente
   - [ ] Verificar en Celoscan

2. **Test Microfinance:**
   - [ ] Solicitar préstamo pequeño (ej: 10 cUSD)
   - [ ] Verificar aprobación
   - [ ] Verificar desembolso
   - [ ] Verificar tasa de interés

### Monitoreo

- [ ] Monitorear transacciones en Celoscan
- [ ] Revisar logs de frontend
- [ ] Verificar balances de treasury
- [ ] Monitorear errores

---

## 📝 Documentación Post-Despliegue

Crear archivo `deployments/celo.json`:

```json
{
  "network": "celo",
  "chainId": "42220",
  "deployedAt": "2025-XX-XX",
  "contracts": {
    "EnerpayRemittance": {
      "address": "0x...",
      "transactionHash": "0x...",
      "blockNumber": 12345678,
      "cUSD": "0x765DE816845861e75A25fCA122bb6898B8B1282a",
      "treasury": "0x...",
      "platformFee": "150"
    },
    "MicrofinancePool": {
      "address": "0x...",
      "transactionHash": "0x...",
      "blockNumber": 12345679,
      "cUSD": "0x765DE816845861e75A25fCA122bb6898B8B1282a",
      "treasury": "0x...",
      "minLoan": "10",
      "maxLoan": "10000",
      "baseInterestRate": "500"
    }
  }
}
```

---

## ⚠️ Advertencias Importantes

1. **NUNCA** commitees private keys
2. **SIEMPRE** verifica direcciones antes de desplegar
3. **SIEMPRE** prueba en testnet primero
4. **CONSIDERA** usar multi-sig para treasury
5. **DOCUMENTA** todo el proceso

---

## 🆘 Plan de Rollback

Si algo sale mal:

1. **Pausar Contratos**: Si tienen función de pausa
2. **Notificar Usuarios**: Comunicar el problema
3. **Investigar**: Identificar la causa
4. **Corregir**: Arreglar el problema
5. **Re-desplegar**: Si es necesario

---

## ✅ Checklist Final

### Pre-Despliegue
- [ ] Pre-deployment check pasa
- [ ] Tests pasando
- [ ] Código revisado
- [ ] Variables de entorno configuradas
- [ ] Balance de CELO suficiente

### Despliegue
- [ ] EnerpayRemittance desplegado
- [ ] MicrofinancePool desplegado
- [ ] Contratos verificados
- [ ] Direcciones guardadas

### Post-Despliegue
- [ ] Frontend actualizado
- [ ] Testing inicial completado
- [ ] Monitoreo configurado
- [ ] Documentación actualizada

---

**¡Éxito con el despliegue! 🚀**


