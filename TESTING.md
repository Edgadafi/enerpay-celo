# 🧪 Guía de Testing - EnerPay

## 🌐 Enlace de Producción

**URL Principal:** https://enerpay-celo.vercel.app

## 📱 Funcionalidades Disponibles para Testing

### 1. 💰 Wallet y Balance
- **Conectar Wallet**: MetaMask, WalletConnect, Valora, etc.
- **Ver Balance**: Muestra balance de cUSD en Celo Sepolia
- **Cambio de Red**: Prompts automáticos para cambiar a Celo Sepolia

### 2. 💸 Envío de Pagos
- **Ruta**: `/send`
- Enviar cUSD a cualquier dirección de Celo
- Validación de direcciones
- Confirmación de transacciones

### 3. 📥 Recepción de Pagos
- **Ruta**: `/receive`
- Genera QR code con tu dirección
- Copiar dirección al portapapeles
- Compartir para recibir pagos

### 4. 🌍 Remesas
- **Ruta**: `/remittance`
- Enviar remesas con diferentes tipos de destino
- Cálculo automático de fees (1.5%)
- Transferencias wallet-to-wallet instantáneas
- **Historial**: `/remittance/history`

### 5. 💡 Pago CFE
- **Ruta**: `/pay-cfe`
- Pago múltiple de recibos CFE
- Agregar múltiples recibos
- Cálculo automático del total
- Pago único de todos los recibos

### 6. 📈 Crédito (Microfinanzas)
- **Ruta**: `/credit`
- Solicitar préstamos basados en reputación
- Ver historial de crédito
- Sistema de reputación on-chain
- **Requisitos**:
  - Reputación mínima: 100/1000
  - Monto mínimo: 10 cUSD
  - Monto máximo: 10,000 cUSD

## 🔗 Contratos Desplegados

### EnerpayRemittance
- **Dirección**: `0x733177De022870Eb7Cfd0B72fAC63F53a1F96f48`
- **Explorer**: [Ver en Celo Sepolia](https://explorer.celo.org/sepolia/address/0x733177De022870Eb7Cfd0B72fAC63F53a1F96f48)
- **Red**: Celo Sepolia Testnet

### MicrofinancePool
- **Dirección**: `0x79Cdf63629bB1a9c5199416Fcc72Ab9FCD8bBea2`
- **Explorer**: [Ver en Celo Sepolia](https://explorer.celo.org/sepolia/address/0x79Cdf63629bB1a9c5199416Fcc72Ab9FCD8bBea2)
- **Red**: Celo Sepolia Testnet

## 🧪 Cómo Probar

### Setup Inicial

1. **Conectar Wallet**
   - Abre la aplicación
   - Haz clic en "Connect Wallet"
   - Selecciona tu wallet (MetaMask, Valora, etc.)
   - Acepta el cambio a Celo Sepolia si se solicita

2. **Obtener cUSD de Testnet**
   - Usa el faucet de Celo Sepolia: https://faucet.celo.org/
   - O solicita en el Discord de Celo

### Flujos de Testing

#### Flujo 1: Envío y Recepción de Pagos
1. Conecta tu wallet
2. Ve a `/receive` y copia tu dirección
3. En otra wallet/envía desde otra cuenta a esa dirección
4. Verifica que el balance se actualice

#### Flujo 2: Remesas
1. Ve a `/remittance`
2. Ingresa una dirección de beneficiario
3. Selecciona monto y tipo de destino
4. Revisa el cálculo de fees
5. Envía la remesa
6. Verifica en `/remittance/history`

#### Flujo 3: Pago CFE
1. Ve a `/pay-cfe`
2. Agrega múltiples recibos
3. Ingresa números de cuenta y montos
4. Verifica el total calculado
5. Envía el pago

#### Flujo 4: Crédito (Requiere Reputación)
1. Ve a `/credit`
2. Verifica tu score de reputación
3. Si es < 100, necesitas construir reputación primero:
   - Haz algunos pagos/remesas
   - El owner puede configurar tu reputación
4. Solicita un préstamo
5. El owner debe aprobar y desembolsar

## 📝 Checklist de Testing

### Funcionalidad Básica
- [ ] Conectar wallet funciona
- [ ] Balance de cUSD se muestra correctamente
- [ ] Cambio de red funciona
- [ ] Logo y diseño se ven bien en móvil

### Pagos
- [ ] Envío de pagos funciona
- [ ] Recepción de pagos (QR code) funciona
- [ ] Validación de direcciones funciona
- [ ] Errores se muestran correctamente

### Remesas
- [ ] Crear remesa funciona
- [ ] Cálculo de fees es correcto
- [ ] Historial de remesas se muestra
- [ ] Estados de remesas son correctos

### Pago CFE
- [ ] Agregar múltiples recibos funciona
- [ ] Eliminar recibos funciona
- [ ] Cálculo de total es correcto
- [ ] Envío de pago funciona

### Crédito
- [ ] Ver score de reputación funciona
- [ ] Solicitar préstamo funciona (si tienes reputación)
- [ ] Validaciones de monto funcionan
- [ ] Mensajes de error son claros

### UX/UI
- [ ] Diseño responsive en móvil
- [ ] Navegación entre páginas funciona
- [ ] Botones y formularios son accesibles
- [ ] Mensajes de éxito/error son claros
- [ ] Loading states funcionan

## 🐛 Reportar Problemas

Si encuentras algún problema, por favor reporta:

1. **Descripción del problema**
2. **Pasos para reproducir**
3. **Comportamiento esperado vs. actual**
4. **Screenshot (si aplica)**
5. **Wallet y navegador usado**
6. **Console errors (si hay)**

## 📊 Métricas a Observar

- Tiempo de carga de la aplicación
- Tiempo de confirmación de transacciones
- Facilidad de uso en móvil
- Claridad de mensajes de error
- Flujo de onboarding

## 🔐 Notas de Seguridad

- Esta es una aplicación en **testnet** (Celo Sepolia)
- No uses fondos reales de mainnet
- Todas las transacciones son en cUSD de testnet
- Los contratos están en fase de testing

## 📞 Contacto

Para preguntas o feedback:
- GitHub: https://github.com/Edgadafi/enerpay-celo
- Issues: Abre un issue en el repositorio

---

**¡Gracias por ayudar a mejorar EnerPay! 🚀**

