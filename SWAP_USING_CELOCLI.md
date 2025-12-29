# 💱 Guía: Swap CELO → cUSD usando celocli (Mento Protocol)

## 🎯 Método Recomendado: Usar celocli con Mento Protocol

El protocolo **Mento** es el mecanismo oficial de Celo para intercambiar CELO por stablecoins (cUSD, cEUR, cREAL).

## 📋 Paso 1: Instalar celocli

### Opción A: Usando npm
```bash
npm install -g @celo/celocli
```

### Opción B: Usando yarn
```bash
yarn global add @celo/celocli
```

### Opción C: Usando npx (sin instalar)
```bash
npx @celo/celocli
```

## 📋 Paso 2: Configurar celocli para Celo Sepolia

```bash
celocli config:set --node https://forno.celo-sepolia.celo-testnet.org/
```

Verifica la configuración:
```bash
celocli config:get
```

## 📋 Paso 3: Configurar tu Wallet

Tienes dos opciones:

### Opción A: Usar tu Private Key (desde .env)
```bash
# Asegúrate de tener PRIVATE_KEY en tu .env
export PRIVATE_KEY=$(cat .env | grep PRIVATE_KEY | cut -d '=' -f2)
```

### Opción B: Usar una cuenta nueva
```bash
celocli account:new
```

## 📋 Paso 4: Verificar tu Balance

```bash
celocli account:balance --address 0xfCb8226A19ee56EBC79127CC4662a8F1a85D2d77
```

Deberías ver:
- CELO: ~8.04
- cUSD: ~0.094

## 📋 Paso 5: Hacer el Swap CELO → cUSD

### Comando Básico

```bash
celocli exchange:celo \
  --value 100000000000000000 \
  --from 0xfCb8226A19ee56EBC79127CC4662a8F1a85D2d77 \
  --stableToken cUSD \
  --node https://forno.celo-sepolia.celo-testnet.org/
```

**Explicación:**
- `--value`: Cantidad en Wei (100000000000000000 = 0.1 CELO)
- `--from`: Tu dirección de wallet
- `--stableToken`: Token estable a recibir (cUSD)
- `--node`: URL del nodo RPC

### Conversión de Cantidad

Para convertir CELO a Wei:
- 0.1 CELO = 100000000000000000 Wei
- 1 CELO = 1000000000000000000 Wei

### Ejemplo: Intercambiar 0.5 CELO

```bash
celocli exchange:celo \
  --value 500000000000000000 \
  --from 0xfCb8226A19ee56EBC79127CC4662a8F1a85D2d77 \
  --stableToken cUSD \
  --node https://forno.celo-sepolia.celo-testnet.org/
```

## 📋 Paso 6: Confirmar la Transacción

1. `celocli` te pedirá que confirmes la transacción
2. Revisa los detalles:
   - Cantidad de CELO a intercambiar
   - Cantidad estimada de cUSD a recibir
   - Gas fees
3. Confirma escribiendo "yes" o presionando Enter

## 📋 Paso 7: Verificar el Resultado

Después de la transacción:

```bash
celocli account:balance --address 0xfCb8226A19ee56EBC79127CC4662a8F1a85D2d77
```

Deberías ver tu nuevo balance de cUSD.

## 🔧 Solución de Problemas

### Error: "celocli: command not found"
**Solución**: Instala celocli o usa `npx @celo/celocli`

### Error: "Insufficient balance"
**Solución**: Verifica que tengas suficiente CELO (necesitas para gas + swap)

### Error: "Network not found"
**Solución**: Configura el nodo correctamente:
```bash
celocli config:set --node https://forno.celo-sepolia.celo-testnet.org/
```

### Error: "Private key not found"
**Solución**: Configura tu private key:
```bash
export CELO_PRIVATE_KEY=tu_private_key_aqui
```

## 💡 Alternativa: Script de Node.js

Si prefieres usar un script:

```javascript
const { execSync } = require('child_process');
require('dotenv').config();

// Cantidad en CELO
const amountCELO = 0.1;
const amountWei = (amountCELO * 1e18).toString();

const command = `celocli exchange:celo \
  --value ${amountWei} \
  --from ${process.env.DEPLOYER_ADDRESS} \
  --stableToken cUSD \
  --node https://forno.celo-sepolia.celo-testnet.org/`;

try {
  console.log("🔄 Ejecutando swap...");
  const output = execSync(command, { encoding: 'utf-8' });
  console.log(output);
  console.log("✅ Swap completado!");
} catch (error) {
  console.error("❌ Error:", error.message);
}
```

## 📚 Referencias

- **Documentación celocli**: https://docs.celo.org/tooling/libraries-sdks/cli/exchange
- **Mento Protocol**: https://docs.celo.org/protocol/stability/mento
- **Celo Sepolia**: https://docs.celo.org/tooling/testnets/celo-sepolia

