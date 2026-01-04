# 🚀 Despliegue a Mainnet - Paso a Paso Ejecutable

## ⚠️ ADVERTENCIA CRÍTICA

**Este es un despliegue a MAINNET (producción real).**
- Los fondos son REALES
- Los errores son IRREVERSIBLES
- La seguridad es PRIORIDAD #1

---

## 📋 PASO 1: Preparación y Seguridad

### 1.1 Verificar Pre-requisitos

```bash
cd contracts

# Ejecutar pre-deployment check
npx hardhat run scripts/pre-deploy-check.js --network celo
```

**Debe pasar todos los checks antes de continuar.**

### 1.2 Obtener CELO en Mainnet

Necesitas **mínimo 2-5 CELO** para desplegar:

**Opciones:**
1. **Exchange**: Comprar CELO en un exchange (Binance, Coinbase, etc.)
2. **Bridge**: Usar un bridge desde otra red
3. **Swap**: Si tienes otros tokens en Celo

**Verificar balance:**
```bash
# Verificar balance en mainnet
npx hardhat run scripts/check-balance.js --network celo
```

### 1.3 Crear .env.mainnet

```bash
cd contracts
cp .env .env.mainnet
```

Editar `.env.mainnet`:
```env
# Network
NETWORK=celo

# Private Key (de wallet dedicada para despliegue)
PRIVATE_KEY=tu_private_key_aqui

# Treasury Address (donde se recibirán los fees)
TREASURY_ADDRESS=0x...

# cUSD Address (mainnet - ya está en código)
CUSD_ADDRESS=0x765DE816845861e75A25fCA122bb6898B8B1282a

# Celoscan API Key (opcional)
CELOSCAN_API_KEY=tu_api_key_aqui
```

**⚠️ IMPORTANTE:**
- Usa una wallet DEDICADA para despliegue
- NUNCA uses tu wallet principal
- NUNCA commitees este archivo

### 1.4 Ejecutar Tests

```bash
cd contracts
npm test
```

**⚠️ CRÍTICO: Todos los tests deben pasar**

---

## 📋 PASO 2: Compilar y Verificar

### 2.1 Compilar Contratos

```bash
cd contracts
npx hardhat compile
```

Verifica que no hay errores.

### 2.2 Verificar Código una Última Vez

- [ ] Revisar `EnerpayRemittance.sol`
- [ ] Revisar `MicrofinancePool.sol`
- [ ] Verificar que SafeERC20 está implementado
- [ ] Verificar que ReentrancyGuard está en funciones críticas

---

## 📋 PASO 3: Desplegar Contratos

### 3.1 Cargar Variables de Mainnet

```bash
cd contracts

# Cargar .env.mainnet
export $(cat .env.mainnet | grep -v '^#' | xargs)
```

### 3.2 Desplegar EnerpayRemittance

```bash
cd contracts
npx hardhat run scripts/deploy.js --network celo
```

**📝 GUARDAR:**
- Contract Address: `0x...`
- Transaction Hash: `0x...`
- Block Number: `...`

### 3.3 Desplegar MicrofinancePool

```bash
cd contracts
npx hardhat run scripts/deploy-microfinance.js --network celo
```

**📝 GUARDAR:**
- Contract Address: `0x...`
- Transaction Hash: `0x...`
- Block Number: `...`

### 3.4 Verificar Despliegue

```bash
cd contracts
npx hardhat run scripts/verify-deployment.js --network celo
```

---

## 📋 PASO 4: Verificar en Celoscan

### 4.1 Verificar Contratos

1. Visita: `https://celoscan.io/address/<CONTRACT_ADDRESS>`
2. Verifica que el contrato existe
3. Verifica que la transacción está confirmada

### 4.2 Verificar Código Fuente (Opcional)

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

---

## 📋 PASO 5: Actualizar Frontend

### 5.1 Actualizar Constantes

Editar `frontend/src/lib/celo/constants.ts`:

```typescript
export const CONTRACTS = {
  // Mainnet addresses
  ENERPAY_REMITTANCE_MAINNET: "0x...", // Nueva dirección
  MICROFINANCE_POOL_MAINNET: "0x...",  // Nueva dirección
  
  // ... mantener testnet addresses también
} as const;
```

### 5.2 Actualizar Variables de Entorno en Vercel

En Vercel Dashboard → Settings → Environment Variables:

```env
NEXT_PUBLIC_REMITTANCE_CONTRACT_ADDRESS=0x...
NEXT_PUBLIC_MICROFINANCE_CONTRACT_ADDRESS=0x...
NEXT_PUBLIC_CELO_CHAIN_ID=42220
NEXT_PUBLIC_CELO_RPC_URL=https://forno.celo.org
```

### 5.3 Deploy Frontend

```bash
cd frontend
npm run build
# Verificar build exitoso
git add .
git commit -m "Update contract addresses for mainnet"
git push
```

Vercel desplegará automáticamente.

---

## 📋 PASO 6: Testing en Mainnet

### 6.1 Test con Montos Pequeños

1. **Test Remittance:**
   - Enviar 1 cUSD
   - Verificar completación
   - Verificar fee

2. **Test Microfinance:**
   - Solicitar préstamo de 10 cUSD
   - Aprobar y desembolsar
   - Verificar funcionamiento

### 6.2 Monitoreo

- Monitorear transacciones en Celoscan
- Revisar logs de frontend
- Verificar balances

---

## ✅ Checklist Final

### Pre-Despliegue
- [ ] Pre-deployment check pasa
- [ ] Tests pasando
- [ ] Balance de CELO suficiente (2-5 CELO)
- [ ] .env.mainnet creado
- [ ] Treasury address configurada

### Despliegue
- [ ] EnerpayRemittance desplegado
- [ ] MicrofinancePool desplegado
- [ ] Contratos verificados en Celoscan
- [ ] Direcciones guardadas

### Post-Despliegue
- [ ] Frontend actualizado
- [ ] Testing inicial completado
- [ ] Monitoreo configurado

---

**¡Éxito con el despliegue! 🚀**


