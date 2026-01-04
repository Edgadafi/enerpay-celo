# 💰 Cómo Agregar Fondos al Pool

## 📋 Ubicación del Script

El script está en: `contracts/scripts/add-pool-funds.js`

## ✅ Comando Correcto

### Opción 1: Desde el directorio `contracts/`

```bash
# Asegúrate de estar en el directorio correcto
cd /home/edgadafi/enerpay/contracts

# Verifica tu ubicación
pwd
# Debe mostrar: /home/edgadafi/enerpay/contracts

# Ejecuta el comando (SIN hacer cd contracts de nuevo)
AMOUNT=10 npx hardhat run scripts/add-pool-funds.js --network celoSepolia
```

### Opción 2: Todo en una línea

```bash
cd /home/edgadafi/enerpay/contracts && AMOUNT=10 npx hardhat run scripts/add-pool-funds.js --network celoSepolia
```

## ❌ Errores Comunes

### Error 1: "Script doesn't exist"

**Causa:** Estás en el directorio incorrecto (probablemente `contracts/contracts/`)

**Solución:**
```bash
# Verifica tu ubicación
pwd

# Si no estás en contracts/, ve ahí
cd /home/edgadafi/enerpay/contracts

# Verifica que el script existe
ls scripts/add-pool-funds.js

# Ahora ejecuta el comando
AMOUNT=10 npx hardhat run scripts/add-pool-funds.js --network celoSepolia
```

### Error 2: Sintaxis de bash

**Causa:** Usar corchetes angulares `< >` en el comando

**Incorrecto:**
```bash
AMOUNT=<10> npx hardhat run scripts/add-pool-funds.js --network celoSepolia
```

**Correcto:**
```bash
AMOUNT=10 npx hardhat run scripts/add-pool-funds.js --network celoSepolia
```

## 💡 Notas Importantes

1. **El monto está en cUSD** (no en wei)
   - `AMOUNT=10` = 10 cUSD
   - `AMOUNT=100` = 100 cUSD
   - `AMOUNT=0.5` = 0.5 cUSD

2. **Verifica tu balance antes de agregar:**
   ```bash
   # El script te mostrará tu balance actual
   ```

3. **El script requiere:**
   - Estar en el directorio `contracts/`
   - Tener cUSD en tu wallet
   - Tener allowance aprobada (el script lo hace automáticamente)

## 📊 Ejemplos

### Agregar 10 cUSD
```bash
cd /home/edgadafi/enerpay/contracts
AMOUNT=10 npx hardhat run scripts/add-pool-funds.js --network celoSepolia
```

### Agregar 100 cUSD
```bash
cd /home/edgadafi/enerpay/contracts
AMOUNT=100 npx hardhat run scripts/add-pool-funds.js --network celoSepolia
```

### Agregar 0.5 cUSD
```bash
cd /home/edgadafi/enerpay/contracts
AMOUNT=0.5 npx hardhat run scripts/add-pool-funds.js --network celoSepolia
```

## 🔍 Verificar Pool Balance

Para verificar el balance del pool después de agregar fondos:

```bash
cd /home/edgadafi/enerpay/contracts
npx hardhat run scripts/check-pool-status.js --network celoSepolia
```


