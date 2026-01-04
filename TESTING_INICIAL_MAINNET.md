# 🧪 Testing Inicial en Mainnet

## 📋 TODO #10: Testing Inicial con Montos Pequeños

Este es el último paso del despliegue. Realiza pruebas con montos pequeños para verificar que todo funciona correctamente.

---

## ⚠️ IMPORTANTE: Usa Montos Pequeños

**Siempre prueba con montos pequeños primero:**
- Remittances: 1-5 cUSD
- Préstamos: 10-50 cUSD

---

## 🧪 Test 1: Remittances (Envío de Remesas)

### Preparación:

1. **Conecta tu wallet a Celo Mainnet:**
   - Chain ID: 42220
   - RPC: https://forno.celo.org

2. **Asegúrate de tener cUSD:**
   - Necesitas cUSD para enviar
   - Puedes obtenerlo en un exchange o swap

### Pasos:

1. **Ve a la aplicación:**
   - Abre tu frontend desplegado
   - O usa: https://tu-app.vercel.app/remittance

2. **Conecta tu wallet:**
   - Asegúrate de estar en Celo Mainnet

3. **Envía una remesa pequeña:**
   - Monto: **1 cUSD** (para prueba)
   - Beneficiario: Tu propia wallet o una wallet de prueba
   - Tipo: "wallet" (más simple para pruebas)

4. **Verifica:**
   - ✅ La transacción se completa
   - ✅ El fee se cobra correctamente (1.5% = 0.015 cUSD)
   - ✅ El beneficiario recibe el monto correcto
   - ✅ La transacción aparece en Celoscan

### Verificación en Celoscan:

1. Ve a: https://celoscan.io/address/0xB35aB84408E28D0B81205293Dd2ed1d6E8566f1e
2. Revisa las transacciones recientes
3. Verifica que el evento `RemittanceCreated` se emitió
4. Verifica los montos transferidos

---

## 🧪 Test 2: Microfinance (Préstamos)

### Preparación:

1. **Asegúrate de tener reputación:**
   - Si no tienes, puedes asignarla usando el script:
   ```bash
   cd contracts
   USER_ADDRESS=tu_wallet AMOUNT=200 npx hardhat run scripts/set-reputation.js --network celo
   ```

2. **Asegúrate de que el pool tenga fondos:**
   - Verifica el balance del pool
   - Si está vacío, agrega fondos:
   ```bash
   cd contracts
   AMOUNT=100 npx hardhat run scripts/add-pool-funds.js --network celo
   ```

### Pasos:

1. **Solicita un préstamo:**
   - Monto: **10 cUSD** (para prueba)
   - Ve a: `/credit` en tu frontend
   - Completa el formulario

2. **Verifica la solicitud:**
   - ✅ La solicitud se crea
   - ✅ Aparece como "Pending"
   - ✅ La transacción se completa en Celoscan

3. **Aprueba el préstamo (si tienes permisos):**
   ```bash
   cd contracts
   LOAN_ID=0 npx hardhat run scripts/approve-loan.js --network celo
   ```

4. **Desembolsa el préstamo:**
   ```bash
   cd contracts
   LOAN_ID=0 npx hardhat run scripts/disburse-loan.js --network celo
   ```

5. **Verifica:**
   - ✅ El préstamo se desembolsa correctamente
   - ✅ Recibes los fondos en tu wallet
   - ✅ La transacción aparece en Celoscan

---

## 📊 Monitoreo Post-Testing

### Verificar en Celoscan:

1. **EnerpayRemittance:**
   - https://celoscan.io/address/0xB35aB84408E28D0B81205293Dd2ed1d6E8566f1e
   - Revisa transacciones recientes
   - Verifica eventos emitidos

2. **MicrofinancePool:**
   - https://celoscan.io/address/0xc19C1A8bb735288e753fD737aF88bf559063D617
   - Revisa transacciones recientes
   - Verifica el balance del pool

3. **Treasury:**
   - https://celoscan.io/address/0x856Ff827A04Ee1dE5576e3d21e1985BD76fB24E7
   - Verifica que los fees se están recibiendo

### Verificar en Frontend:

1. **Revisa los logs de la consola:**
   - Abre DevTools (F12)
   - Revisa si hay errores
   - Verifica que las transacciones se completan

2. **Verifica el historial:**
   - Revisa que las remesas aparecen en el historial
   - Verifica que los préstamos aparecen correctamente

---

## ✅ Checklist de Testing

### Remittances:
- [ ] Wallet conectada a Celo Mainnet
- [ ] Tienes cUSD suficiente
- [ ] Remesa enviada exitosamente
- [ ] Fee cobrado correctamente (1.5%)
- [ ] Beneficiario recibió el monto correcto
- [ ] Transacción visible en Celoscan
- [ ] Evento `RemittanceCreated` emitido

### Microfinance:
- [ ] Reputación asignada (si es necesario)
- [ ] Pool tiene fondos
- [ ] Préstamo solicitado exitosamente
- [ ] Préstamo aprobado (si aplica)
- [ ] Préstamo desembolsado
- [ ] Fondos recibidos correctamente
- [ ] Transacciones visibles en Celoscan

### Monitoreo:
- [ ] Transacciones aparecen en Celoscan
- [ ] Eventos emitidos correctamente
- [ ] Treasury recibiendo fees
- [ ] Frontend funcionando correctamente
- [ ] Sin errores en consola

---

## 🆘 Si Hay Problemas

### Error: "Insufficient balance"
- **Solución:** Asegúrate de tener suficiente cUSD y CELO para gas

### Error: "Transaction reverted"
- **Solución:** Revisa los logs en Celoscan para ver el motivo
- Verifica que los parámetros sean correctos

### Error: "Contract not found"
- **Solución:** Verifica que estás en Celo Mainnet (Chain ID: 42220)
- Verifica que el frontend tiene las direcciones correctas

---

## 📝 Después del Testing

Una vez que todo funcione:

1. **Documenta los resultados**
2. **Monitorea las primeras 24 horas**
3. **Prepara para producción completa**

---

**¡Este es el último paso! Una vez completado, el despliegue estará 100% completo.** 🎉

