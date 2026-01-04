# 🔧 Correcciones Necesarias en .env.mainnet

## ❌ Problemas Detectados

### 1. PRIVATE_KEY - Formato Incorrecto

**Problema:**
- Longitud: 64 caracteres (debería ser 66)
- Falta el prefijo `0x`

**Solución:**

Edita `.env.mainnet` y asegúrate de que `PRIVATE_KEY` tenga el formato correcto:

```env
# ❌ INCORRECTO (sin 0x)
PRIVATE_KEY=1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef

# ✅ CORRECTO (con 0x)
PRIVATE_KEY=0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef
```

**Formato correcto:**
- Debe empezar con `0x`
- Debe tener 66 caracteres en total (0x + 64 caracteres hexadecimales)
- Sin espacios

---

### 2. Balance de CELO - Insuficiente

**Problema:**
- Balance actual: 0.0 CELO
- Necesitas mínimo 2-5 CELO para desplegar

**Solución:**

Obtén CELO en mainnet usando una de estas opciones:

#### Opción 1: Comprar en Exchange
1. Compra CELO en un exchange (Binance, Coinbase, Kraken, etc.)
2. Retira a tu wallet de despliegue en Celo Mainnet
3. Asegúrate de usar la red correcta (Celo Mainnet, Chain ID: 42220)

#### Opción 2: Bridge desde Otra Red
- Usa un bridge como:
  - [Celo Bridge](https://bridge.celo.org/)
  - [Wormhole](https://wormhole.com/)
  - [Allbridge](https://allbridge.io/)

#### Opción 3: Swap de Otros Tokens
- Si tienes otros tokens en Celo Mainnet, puedes hacer swap:
  - Usar Uniswap en Celo
  - Usar Ubeswap
  - Usar otros DEXs en Celo

---

## 📝 Pasos para Corregir

### Paso 1: Corregir PRIVATE_KEY

```bash
cd contracts
nano .env.mainnet
```

Busca la línea:
```env
PRIVATE_KEY=...
```

Y asegúrate de que tenga el formato:
```env
PRIVATE_KEY=0xTU_PRIVATE_KEY_AQUI
```

**Importante:** Si tu private key NO tiene `0x` al inicio, agrégalo.

### Paso 2: Obtener CELO

Sigue una de las opciones mencionadas arriba para obtener CELO.

### Paso 3: Verificar Balance

```bash
cd contracts
npx hardhat run scripts/verify-mainnet-env.js --network celo
```

O verifica manualmente en:
- [Celoscan](https://celoscan.io/address/TU_WALLET_ADDRESS)
- Tu wallet (MetaMask, etc.)

### Paso 4: Verificar Nuevamente

Una vez corregido el PRIVATE_KEY y obtenido CELO:

```bash
cd contracts
npx hardhat run scripts/verify-mainnet-env.js --network celo
```

Todos los checks deben pasar antes de desplegar.

---

## ✅ Checklist Final

Antes de desplegar, verifica:

- [ ] PRIVATE_KEY tiene formato correcto (0x + 64 caracteres)
- [ ] Balance de CELO >= 2 CELO
- [ ] TREASURY_ADDRESS es válida
- [ ] CUSD_ADDRESS es correcto (0x765DE816845861e75A25fCA122bb6898B8B1282a)
- [ ] NETWORK=celo
- [ ] Todos los checks pasan

---

## 🚀 Después de Corregir

Una vez que todos los checks pasen:

```bash
cd contracts

# 1. Ejecutar tests
npm test

# 2. Verificar pre-despliegue
npx hardhat run scripts/verify-mainnet-env.js --network celo

# 3. Desplegar (cuando todo esté listo)
npx hardhat run scripts/deploy.js --network celo
npx hardhat run scripts/deploy-microfinance.js --network celo
```

---

**¡Corrige estos problemas y vuelve a verificar!** 🔧

