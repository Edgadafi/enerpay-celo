# 🚀 Plan de Despliegue a Celo Mainnet

> **Guía completa para desplegar Enerpay en producción**

---

## 📋 Tabla de Contenidos

1. [Pre-requisitos y Preparación](#pre-requisitos-y-preparación)
2. [Fase 1: Auditoría y Seguridad](#fase-1-auditoría-y-seguridad)
3. [Fase 2: Configuración de Entorno](#fase-2-configuración-de-entorno)
4. [Fase 3: Despliegue de Contratos](#fase-3-despliegue-de-contratos)
5. [Fase 4: Verificación de Contratos](#fase-4-verificación-de-contratos)
6. [Fase 5: Actualización del Frontend](#fase-5-actualización-del-frontend)
7. [Fase 6: Testing en Mainnet](#fase-6-testing-en-mainnet)
8. [Fase 7: Monitoreo Post-Despliegue](#fase-7-monitoreo-post-despliegue)
9. [Checklist Final](#checklist-final)

---

## 🔒 Pre-requisitos y Preparación

### 1.1 Recursos Necesarios

- [ ] **Balance de CELO**: Mínimo 2-5 CELO en wallet de despliegue
- [ ] **API Key de Celoscan**: Para verificación de contratos
- [ ] **Wallet de Despliegue**: Wallet dedicada con multi-sig (recomendado)
- [ ] **Treasury Address**: Dirección para recibir fees (puede ser multi-sig)
- [ ] **Backup de Private Keys**: Almacenado de forma segura

### 1.2 Información de Mainnet

```
Network: Celo Mainnet
Chain ID: 42220
RPC URL: https://forno.celo.org
Explorer: https://celoscan.io
cUSD Address: 0x765DE816845861e75A25fCA122bb6898B8B1282a
cREAL Address: 0xe8537a3d056DA446677B9E2d2516b1ee149eE628
cEUR Address: 0xD8763CBa276a3738E6DE85b4b3bF5FDed6D6cA73
```

### 1.3 Contratos a Desplegar

1. **EnerpayRemittance** - Manejo de remesas
2. **MicrofinancePool** - Pool de microfinanzas
3. **ReputationSystem** (futuro) - Sistema de reputación
4. **CreditScore** (futuro) - Cálculo de crédito

---

## 🔐 Fase 1: Auditoría y Seguridad

### 1.1 Auditoría de Contratos

- [ ] **Auditoría Externa**: Contratar auditoría profesional
  - Revisar: Reentrancy, Access Control, Integer Overflow/Underflow
  - Tiempo estimado: 2-4 semanas
  - Costo estimado: $5,000-$15,000 USD

- [ ] **Auditoría Interna**: Revisión exhaustiva del código
  - [ ] Revisar todos los contratos
  - [ ] Ejecutar tests completos
  - [ ] Verificar lógica de negocio
  - [ ] Revisar eventos y logs

### 1.2 Testing Exhaustivo

- [ ] **Unit Tests**: Cobertura >90%
  ```bash
  cd contracts
  npm test
  ```

- [ ] **Integration Tests**: Probar flujos completos
- [ ] **Fuzz Testing**: Usar herramientas como Echidna
- [ ] **Gas Optimization**: Verificar costos de gas
- [ ] **Test en Testnet**: Desplegar y probar en Alfajores/Sepolia

### 1.3 Checklist de Seguridad

- [ ] Todos los contratos usan `ReentrancyGuard`
- [ ] Access control implementado (`Ownable` o `AccessControl`)
- [ ] Validación de inputs en todas las funciones
- [ ] Límites de fees configurados (máx 10%)
- [ ] Pausa de emergencia implementada (opcional pero recomendado)
- [ ] Multi-sig para funciones críticas
- [ ] Timelock para cambios importantes (opcional)

---

## ⚙️ Fase 2: Configuración de Entorno

### 2.1 Variables de Entorno

Crear archivo `.env.mainnet` en `contracts/`:

```env
# Network
NETWORK=celo

# Private Key (NUNCA commitees esto al repo)
PRIVATE_KEY=tu_private_key_aqui

# Treasury Address (dirección que recibirá fees)
TREASURY_ADDRESS=0x...

# cUSD Address (mainnet)
CUSD_ADDRESS=0x765DE816845861e75A25fCA122bb6898B8B1282a

# Celoscan API Key (para verificación)
CELOSCAN_API_KEY=tu_api_key_aqui

# Gas Settings (opcional)
GAS_PRICE=20000000000
GAS_LIMIT=5000000
```

### 2.2 Verificar Configuración

```bash
cd contracts

# Verificar que hardhat.config.js tiene la red "celo"
cat hardhat.config.js | grep -A 5 "celo:"

# Verificar balance
npx hardhat run scripts/check-balance.js --network celo
```

### 2.3 Preparar Wallet de Despliegue

- [ ] Crear wallet dedicada para despliegue
- [ ] Transferir CELO suficiente (2-5 CELO)
- [ ] Verificar que la wallet tiene acceso
- [ ] Configurar multi-sig si es posible
- [ ] Hacer backup de private key (encriptado)

---

## 📦 Fase 3: Despliegue de Contratos

### 3.1 Despliegue de EnerpayRemittance

```bash
cd contracts

# 1. Compilar contratos
npx hardhat compile

# 2. Verificar que compila sin errores
# 3. Desplegar a mainnet
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

**Guardar información:**
- [ ] Contract Address
- [ ] Transaction Hash
- [ ] Block Number
- [ ] Gas Used

### 3.2 Despliegue de MicrofinancePool

```bash
# Desplegar MicrofinancePool
npx hardhat run scripts/deploy-microfinance.js --network celo
```

**Guardar información:**
- [ ] Contract Address
- [ ] Transaction Hash
- [ ] Block Number

### 3.3 Verificar Despliegue

```bash
# Verificar que los contratos están desplegados
npx hardhat run scripts/verify-deployment.js --network celo
```

**Verificaciones:**
- [ ] Contrato desplegado correctamente
- [ ] cUSD address configurado correctamente
- [ ] Treasury address configurado correctamente
- [ ] Owner es la dirección correcta
- [ ] Fees configurados correctamente

---

## 🔍 Fase 4: Verificación de Contratos

### 4.1 Verificar en Celoscan

```bash
# Verificar EnerpayRemittance
npx hardhat verify --network celo \
  <CONTRACT_ADDRESS> \
  <CUSD_ADDRESS> \
  <TREASURY_ADDRESS>

# Verificar MicrofinancePool
npx hardhat verify --network celo \
  <CONTRACT_ADDRESS> \
  <CUSD_ADDRESS> \
  <TREASURY_ADDRESS>
```

### 4.2 Verificar Manualmente

- [ ] Visitar: `https://celoscan.io/address/<CONTRACT_ADDRESS>`
- [ ] Verificar que el código fuente está verificado
- [ ] Verificar que las direcciones son correctas
- [ ] Verificar que los parámetros iniciales son correctos

### 4.3 Guardar Deployment Info

Crear archivo `deployments/celo.json`:

```json
{
  "network": "celo",
  "chainId": "42220",
  "timestamp": "2025-XX-XX",
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

## 🎨 Fase 5: Actualización del Frontend

### 5.1 Actualizar Constantes

Editar `frontend/src/lib/celo/constants.ts`:

```typescript
// Actualizar direcciones de contratos
export const CONTRACTS = {
  ENERPAY_REMITTANCE_MAINNET: "0x...", // Nueva dirección
  MICROFINANCE_POOL_MAINNET: "0x...",  // Nueva dirección
} as const;
```

### 5.2 Actualizar Variables de Entorno

Editar `frontend/.env.production`:

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

### 5.3 Actualizar Configuración de Wagmi

Verificar `frontend/src/lib/wagmi/config.ts`:

- [ ] Celo Mainnet configurado correctamente
- [ ] Chain ID: 42220
- [ ] RPC URL correcto
- [ ] Explorer URL correcto

### 5.4 Build y Deploy del Frontend

```bash
cd frontend

# Build para producción
npm run build

# Verificar que build es exitoso
npm run start

# Deploy a Vercel/Netlify
vercel --prod
```

**Verificaciones:**
- [ ] Build exitoso sin errores
- [ ] Variables de entorno configuradas
- [ ] Contratos apuntan a mainnet
- [ ] UI muestra "Celo Mainnet"

---

## 🧪 Fase 6: Testing en Mainnet

### 6.1 Testing Inicial (Con Cantidades Pequeñas)

**Test 1: Envío de Remesa**
- [ ] Conectar wallet a mainnet
- [ ] Enviar remesa pequeña (ej: 1 cUSD)
- [ ] Verificar que se completa
- [ ] Verificar fee se cobra correctamente
- [ ] Verificar que llega al destinatario

**Test 2: Microcrédito**
- [ ] Solicitar microcrédito pequeño (ej: 10 cUSD)
- [ ] Verificar aprobación
- [ ] Verificar desembolso
- [ ] Verificar tasa de interés

**Test 3: Pagos P2P**
- [ ] Enviar pago entre dos wallets
- [ ] Verificar recepción
- [ ] Verificar historial

### 6.2 Verificar en Explorer

- [ ] Verificar transacciones en Celoscan
- [ ] Verificar eventos emitidos
- [ ] Verificar balances actualizados
- [ ] Verificar fees cobrados correctamente

### 6.3 Testing de Edge Cases

- [ ] Enviar remesa con monto mínimo
- [ ] Enviar remesa con monto máximo
- [ ] Intentar operación sin fondos suficientes
- [ ] Verificar manejo de errores

---

## 📊 Fase 7: Monitoreo Post-Despliegue

### 7.1 Monitoreo Inmediato (Primeras 24 horas)

- [ ] **Monitorear Transacciones**: Revisar cada transacción
- [ ] **Monitorear Errores**: Revisar logs de frontend
- [ ] **Monitorear Gas**: Verificar costos de gas
- [ ] **Monitorear Balances**: Verificar treasury balance

### 7.2 Herramientas de Monitoreo

**Opciones:**
- [ ] **Celoscan Alerts**: Configurar alertas
- [ ] **Tenderly**: Monitoreo de contratos
- [ ] **OpenZeppelin Defender**: Monitoreo y alertas
- [ ] **Custom Dashboard**: Crear dashboard propio

### 7.3 Métricas a Monitorear

- [ ] Número de transacciones diarias
- [ ] Volumen total en cUSD
- [ ] Fees recaudados
- [ ] Errores y fallos
- [ ] Gas costs promedio
- [ ] Usuarios activos

### 7.4 Plan de Respuesta a Incidentes

- [ ] **Procedimiento de Pausa**: Si es necesario pausar contratos
- [ ] **Contacto de Emergencia**: Lista de contactos
- [ ] **Procedimiento de Rollback**: Si es necesario revertir
- [ ] **Comunicación**: Cómo comunicar problemas a usuarios

---

## ✅ Checklist Final

### Pre-Despliegue
- [ ] Auditoría de seguridad completada
- [ ] Todos los tests pasando
- [ ] Documentación actualizada
- [ ] Variables de entorno configuradas
- [ ] Wallet de despliegue preparada
- [ ] Balance de CELO suficiente

### Despliegue
- [ ] Contratos desplegados exitosamente
- [ ] Contratos verificados en Celoscan
- [ ] Direcciones guardadas y documentadas
- [ ] Frontend actualizado y desplegado
- [ ] Variables de entorno configuradas

### Post-Despliegue
- [ ] Testing inicial completado
- [ ] Monitoreo configurado
- [ ] Documentación actualizada
- [ ] Anuncio público (si aplica)
- [ ] Usuarios notificados

### Seguridad
- [ ] Private keys almacenadas de forma segura
- [ ] Multi-sig configurado (si aplica)
- [ ] Acceso a contratos limitado
- [ ] Procedimientos de emergencia documentados

---

## 📝 Notas Importantes

### ⚠️ Advertencias

1. **NUNCA** commitees private keys al repositorio
2. **SIEMPRE** verifica direcciones antes de desplegar
3. **SIEMPRE** prueba en testnet primero
4. **CONSIDERA** usar multi-sig para funciones críticas
5. **DOCUMENTA** todo el proceso

### 🔄 Rollback Plan

Si algo sale mal:

1. **Pausar Contratos**: Si tienen función de pausa
2. **Notificar Usuarios**: Comunicar el problema
3. **Investigar**: Identificar la causa
4. **Corregir**: Arreglar el problema
5. **Re-desplegar**: Si es necesario

### 📞 Contactos de Emergencia

- **Equipo Técnico**: [contactos]
- **Auditoría**: [contactos]
- **Celo Foundation**: [contactos]

---

## 🎯 Próximos Pasos Post-Despliegue

1. **Marketing y Comunicación**
   - [ ] Anunciar lanzamiento
   - [ ] Crear tutoriales
   - [ ] Documentación para usuarios

2. **Crecimiento**
   - [ ] Onboarding de usuarios
   - [ ] Partnerships
   - [ ] Integraciones

3. **Mejoras Continuas**
   - [ ] Recopilar feedback
   - [ ] Iterar sobre features
   - [ ] Optimizar gas costs

---

**Última actualización**: [Fecha]
**Versión**: 1.0.0
**Estado**: 🟡 En Preparación

---

**¡Éxito con el despliegue! 🚀**


