# 🔄 Guía de Migración: MXNB/Base → Celo

Esta guía documenta la migración de Enerpay desde MXNB/Base hacia Celo Mainnet.

## 📋 Resumen de Cambios

### Configuración de Red
- **Antes**: Base (Chain ID: 8453) o MXNB
- **Después**: Celo Mainnet (Chain ID: 42220)

### Token de Pago
- **Antes**: USDC en Base o MXNB
- **Después**: cUSD (Celo Dollar) en Celo Mainnet

### Stack Tecnológico
- **Mantenido**: Next.js 14, TypeScript, TailwindCSS, Wagmi, Viem
- **Actualizado**: Configuración de chains y tokens

## 🔧 Cambios Técnicos

### 1. Configuración de Wagmi

**Antes (Base):**
```typescript
import { base } from "wagmi/chains";

const config = {
  chains: [base],
  // ...
};
```

**Después (Celo):**
```typescript
import { celo, celoAlfajores } from "wagmi/chains";

const celoMainnet = {
  ...celo,
  id: 42220,
  // ...
};

const config = {
  chains: [celoMainnet, celoAlfajores],
  // ...
};
```

### 2. Direcciones de Tokens

**Antes:**
- USDC en Base: `0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913`

**Después:**
- cUSD en Celo: `0x765DE816845861e75A25fCA122bb6898B8B1282a`
- cREAL en Celo: `0xe8537a3d056DA446677B9E2d2516b1ee149eE628`
- cEUR en Celo: `0xD8763CBa276a3738E6DE85b4b3bF5FDed6D6cA73`

### 3. RPC Endpoints

**Antes:**
```env
NEXT_PUBLIC_RPC_URL=https://mainnet.base.org
```

**Después:**
```env
NEXT_PUBLIC_CELO_RPC_URL=https://forno.celo.org
```

### 4. Block Explorers

**Antes:**
- BaseScan: `https://basescan.org`

**Después:**
- CeloScan: `https://celoscan.io`

## 📁 Archivos Modificados/Creados

### Nuevos Archivos

1. **`src/lib/wagmi/config.ts`**
   - Configuración de Wagmi para Celo
   - Definición de chains (Mainnet y Alfajores)
   - Constantes de tokens

2. **`src/lib/wagmi/provider.tsx`**
   - Web3Provider con RainbowKit
   - Configuración de tema Celo

3. **`src/lib/celo/constants.ts`**
   - Constantes de Celo (Chain IDs, direcciones de tokens)
   - Metadata de tokens
   - ABIs de ERC20

4. **`src/lib/celo/utils.ts`**
   - Utilidades para formateo de tokens
   - Validación de direcciones
   - Formateo de monedas

5. **`src/hooks/useCelo.ts`**
   - Hook personalizado para funcionalidad de Celo
   - Manejo de cambio de red
   - Obtención de balances

6. **`src/hooks/useTokenBalance.ts`**
   - Hook para obtener balances de tokens
   - Hooks específicos para cUSD y cREAL

### Archivos Modificados

1. **`package.json`**
   - Agregado `@celo/rainbowkit-celo` para soporte de Celo
   - Actualizado `wagmi` y `viem` a versiones compatibles

2. **`.env.example`**
   - Variables de entorno actualizadas para Celo
   - Nuevas constantes de tokens

3. **Componentes de UI**
   - Actualizados para usar cUSD en lugar de USDC
   - Referencias a Celo en lugar de Base

## 🚀 Pasos de Migración

### Paso 1: Actualizar Dependencias

```bash
cd frontend
npm install
```

### Paso 2: Configurar Variables de Entorno

```bash
cp .env.example .env.local
```

Editar `.env.local`:
```env
NEXT_PUBLIC_CELO_CHAIN_ID=42220
NEXT_PUBLIC_CELO_RPC_URL=https://forno.celo.org
NEXT_PUBLIC_CUSD_ADDRESS=0x765DE816845861e75A25fCA122bb6898B8B1282a
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_project_id
```

### Paso 3: Verificar Configuración

1. Verificar que Wagmi está configurado para Celo
2. Verificar que los tokens están correctamente definidos
3. Probar conexión de wallet en Celo Mainnet

### Paso 4: Testing

1. Conectar wallet a Celo Mainnet
2. Verificar balance de cUSD
3. Probar envío de transacción
4. Verificar recepción de pagos

## ✅ Checklist de Migración

- [x] Configuración de Wagmi para Celo
- [x] Actualización de direcciones de tokens
- [x] Actualización de RPC endpoints
- [x] Actualización de block explorers
- [x] Creación de hooks personalizados
- [x] Actualización de componentes UI
- [x] Documentación actualizada
- [ ] Testing en Alfajores testnet
- [ ] Testing en Celo Mainnet
- [ ] Actualización de contratos inteligentes (si aplica)

## 🔍 Verificación Post-Migración

### Verificar Conexión a Celo

```typescript
const { isCeloMainnet, chainId } = useCelo();
console.log("Is Celo Mainnet:", isCeloMainnet); // true
console.log("Chain ID:", chainId); // 42220
```

### Verificar Balance de cUSD

```typescript
const { formattedBalance } = useCUSDBalance();
console.log("cUSD Balance:", formattedBalance);
```

### Verificar Transacciones

1. Enviar una transacción de prueba
2. Verificar en CeloScan
3. Confirmar recepción

## 🐛 Troubleshooting

### Problema: Wallet no se conecta a Celo

**Solución**: Verificar que el Project ID de WalletConnect está configurado correctamente.

### Problema: Balance no se muestra

**Solución**: Verificar que la wallet está conectada a Celo Mainnet (Chain ID: 42220).

### Problema: Transacciones fallan

**Solución**: 
1. Verificar que hay suficiente CELO para gas
2. Verificar que hay suficiente cUSD para la transacción
3. Verificar que la dirección del destinatario es válida

## 📚 Recursos Adicionales

- [Celo Documentation](https://docs.celo.org)
- [Celo Token Addresses](https://docs.celo.org/developer-guide/celo-for-eth-devs)
- [Wagmi Celo Guide](https://wagmi.sh/core/chains/celo)
- [RainbowKit Celo](https://rainbowkit.com/docs/installation#celo)

## 🎯 Próximos Pasos

1. **Testing Completo**: Probar todas las funcionalidades en Alfajores
2. **Deploy a Mainnet**: Una vez probado, deployar a Celo Mainnet
3. **Actualizar Contratos**: Si hay contratos, actualizarlos para Celo
4. **Documentación de Usuario**: Actualizar guías de usuario

---

**Fecha de Migración**: Noviembre 2024  
**Versión**: 1.0.0  
**Estado**: ✅ Completado

