# 📋 Guía Paso a Paso: Probar la Función Credit

## 🎯 ¿Qué es la función Credit?

La función Credit es un sistema de **microfinanzas** que permite:
- ✅ Solicitar préstamos basados en reputación on-chain
- ✅ Ver historial de créditos
- ✅ Gestionar préstamos activos
- ✅ Repagar préstamos

---

## 📋 Requisitos Previos

Antes de probar, asegúrate de tener:

1. ✅ **Wallet conectada** (MetaMask o similar)
2. ✅ **Red: Celo Sepolia Testnet** (Chain ID: 11142220)
3. ✅ **Reputación mínima**: 100 puntos (por defecto)
4. ✅ **Contrato desplegado**: MicrofinancePool en Celo Sepolia

---

## 🚀 Paso 1: Verificar que el Contrato está Desplegado

### Opción A: Verificar en el código

El contrato debería estar en:
```
0x79Cdf63629bB1a9c5199416Fcc72Ab9FCD8bBea2
```

O configurado en la variable de entorno:
```
NEXT_PUBLIC_MICROFINANCE_CONTRACT_ADDRESS
```

### Opción B: Verificar en CeloScan

1. Ve a: https://sepolia.celoscan.io/
2. Busca la dirección del contrato
3. Verifica que el contrato existe y está verificado

### Opción C: Desplegar el contrato (si no existe)

Si el contrato no está desplegado, ejecuta:

```bash
cd contracts
npx hardhat run scripts/deploy-microfinance.js --network celoSepolia
```

---

## 🚀 Paso 2: Acceder a la Página de Credit

1. Abre tu aplicación en el navegador
2. Navega a: `/credit` o haz clic en "Credit" desde el menú
3. Asegúrate de que tu wallet esté conectada

---

## 🚀 Paso 3: Verificar Conexión y Red

La página debería mostrar:

- ✅ **Wallet conectada**: Tu dirección debería aparecer
- ✅ **Red correcta**: Debe indicar "Celo Sepolia"
- ⚠️ Si no está en Celo Sepolia, haz clic en "Switch Network"

---

## 🚀 Paso 4: Ver tu Reputación Score

La página mostrará automáticamente:

- **Tu Reputación Score**: X/1000
- **Mínimo requerido**: 100 (por defecto)

**Nota**: Si tu reputación es 0 o menor a 100, necesitas:
- Hacer pagos o remittances para aumentar tu reputación
- O el owner del contrato puede asignarte reputación manualmente

---

## 🚀 Paso 5: Solicitar un Préstamo (Request Credit)

### 5.1. Haz clic en "Request Credit"

### 5.2. Completa el formulario:

#### **Credit Amount (cUSD)**
- **Mínimo**: 10 cUSD
- **Máximo**: 10,000 cUSD
- **Ejemplo para prueba**: 10 cUSD

#### **Purpose (Propósito)**
Selecciona una opción:
- `business` - Negocio
- `personal` - Personal
- `emergency` - Emergencia
- `education` - Educación

#### **Repayment Period (Período de pago)**
Selecciona:
- `3` - 3 meses
- `6` - 6 meses
- `12` - 12 meses
- `24` - 24 meses

### 5.3. Revisa tu Reputación Score

- Debe aparecer tu score actual
- Si es menor al mínimo, verás un mensaje de advertencia

### 5.4. Haz clic en "Submit Request"

### 5.5. Confirma la transacción en MetaMask

- Revisa los detalles
- Confirma la transacción
- Espera la confirmación

---

## 🚀 Paso 6: Verificar la Solicitud

### 6.1. Mensaje de Éxito

Después de confirmar, deberías ver:
- ✅ "Credit Request Submitted!"
- 📋 Hash de la transacción (enlace al explorer)

### 6.2. Verificar en el Explorer

1. Haz clic en el enlace "View transaction"
2. O ve a: https://sepolia.celoscan.io/
3. Busca el hash de la transacción
4. Verifica que el status sea "Success"

---

## 🚀 Paso 7: Ver Historial de Créditos

1. Haz clic en "Credit History"
2. Deberías ver:
   - Tu solicitud de préstamo
   - Estado: "Pending" (esperando aprobación)
   - Detalles del préstamo

---

## 📊 Estados del Préstamo

Los préstamos pueden tener estos estados:

1. **Pending** - Solicitud creada, esperando aprobación
2. **Approved** - Aprobado, esperando desembolso
3. **Active** - Activo, siendo pagado
4. **Repaid** - Completamente pagado
5. **Defaulted** - Incumplido
6. **Liquidated** - Liquidado

---

## ⚠️ Notas Importantes

### Sobre la Aprobación

- La solicitud queda en estado **"Pending"**
- Solo el **owner del contrato** puede aprobar préstamos
- En producción, esto podría ser automatizado o manejado por un servicio

### Sobre la Reputación

- La reputación se construye con:
  - Historial de pagos
  - Volumen de transacciones
  - Tiempo en la plataforma
  - Referencias de usuarios

### Sobre los Intereses

- **Tasa base**: 5% APR (por defecto)
- Se ajusta según:
  - Tu reputación (mayor reputación = menor tasa)
  - Monto del préstamo (préstamos grandes = tasa ligeramente mayor)

---

## 🔧 Solución de Problemas

### Error: "Please switch to Celo Sepolia network"
- **Solución**: Haz clic en "Switch Network" o cambia manualmente en MetaMask

### Error: "Insufficient reputation score"
- **Solución**: Necesitas aumentar tu reputación haciendo pagos o remittances

### Error: "Amount below minimum"
- **Solución**: El monto mínimo es 10 cUSD. Usa al menos 10 cUSD

### Error: "Amount above maximum"
- **Solución**: El monto máximo es 10,000 cUSD. Usa menos de 10,000 cUSD

### Error: "Contract not found"
- **Solución**: El contrato no está desplegado. Despliega el contrato primero

### La transacción falla
- **Solución**: 
  1. Verifica que tienes suficiente CELO para gas
  2. Verifica que el contrato está desplegado
  3. Revisa los logs en la consola del navegador

---

## 📝 Ejemplo Completo

### Datos de Prueba:

```
Amount: 10 cUSD
Purpose: personal
Repayment Period: 3 months
Reputation Score: 100+ (mínimo requerido)
```

### Pasos:

1. ✅ Conecta wallet
2. ✅ Cambia a Celo Sepolia
3. ✅ Ve a `/credit`
4. ✅ Haz clic en "Request Credit"
5. ✅ Ingresa: 10 cUSD
6. ✅ Selecciona: "personal"
7. ✅ Selecciona: "3 months"
8. ✅ Haz clic en "Submit Request"
9. ✅ Confirma en MetaMask
10. ✅ Espera confirmación
11. ✅ Verifica en el explorer

---

## 🎯 Próximos Pasos

Después de solicitar el préstamo:

1. **Esperar aprobación** (solo owner puede aprobar)
2. **Ver historial** en "Credit History"
3. **Repagar** cuando el préstamo esté activo (si está implementado)

---

## 📚 Recursos Adicionales

- **Contrato**: `contracts/contracts/MicrofinancePool.sol`
- **Frontend**: `frontend/src/app/credit/page.tsx`
- **Hooks**: `frontend/src/hooks/useMicrofinance.ts`
- **Explorer**: https://sepolia.celoscan.io/

---

¡Listo para probar! 🚀

