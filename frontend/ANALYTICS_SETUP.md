# 📊 Analytics & Monitoring Setup - LatamFi

Esta guía explica cómo configurar analytics y monitoreo para LatamFi.

## 🎯 Analytics Configurados

### Google Analytics 4 (GA4)

**Estado:** ✅ Configurado y listo para usar

**Configuración:**

1. **Obtén tu Measurement ID:**
   - Ve a [Google Analytics](https://analytics.google.com)
   - Crea una nueva propiedad (o usa una existente)
   - Copia tu Measurement ID (formato: `G-XXXXXXXXXX`)

2. **Agrega a variables de entorno:**
   ```env
   NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
   ```

3. **Eventos trackeados automáticamente:**
   - ✅ Page views (cambio de ruta)
   - ✅ Wallet connection/disconnection
   - ✅ Payment sent
   - ✅ Remittance sent
   - ✅ Microcredit request
   - ✅ Feedback submitted
   - ✅ Errors (exceptions)

**Uso en código:**
```typescript
import { trackEvent, trackWalletConnect, trackPaymentSent } from "@/lib/analytics";

// Track custom event
trackEvent("button_click", { button_name: "send_payment" });

// Track wallet connection
trackWalletConnect("MetaMask", 42220);

// Track payment
trackPaymentSent("100", "0x1234...", "cUSD");
```

## 🐛 Error Tracking

**Estado:** ✅ Configurado (console-based, extensible a Sentry)

**Configuración actual:**
- Errores se loguean en consola (desarrollo)
- Errores se trackean en Google Analytics como eventos de excepción

**Para agregar Sentry (opcional):**

1. **Instala Sentry:**
   ```bash
   npm install @sentry/nextjs
   ```

2. **Configura Sentry:**
   ```typescript
   // En src/lib/analytics.ts, descomenta la sección de Sentry
   ```

3. **Agrega DSN a variables de entorno:**
   ```env
   NEXT_PUBLIC_SENTRY_DSN=https://xxx@xxx.ingest.sentry.io/xxx
   ```

## 📝 Feedback System

**Estado:** ✅ Implementado

**Características:**
- Botón flotante en la esquina inferior derecha
- Formulario con tipos: General, Bug, Feature
- Tracking automático en analytics
- Listo para integrar con backend API

**Integración con backend (TODO):**

1. **Opción 1: Formspree (rápido)**
   ```typescript
   // En FeedbackButton.tsx
   const response = await fetch("https://formspree.io/f/YOUR_FORM_ID", {
     method: "POST",
     headers: { "Content-Type": "application/json" },
     body: JSON.stringify({ type: feedbackType, message: feedback }),
   });
   ```

2. **Opción 2: API propia**
   ```typescript
   // En FeedbackButton.tsx
   const response = await fetch("/api/feedback", {
     method: "POST",
     headers: { "Content-Type": "application/json" },
     body: JSON.stringify({ type: feedbackType, message: feedback }),
   });
   ```

3. **Opción 3: Email (SendGrid, etc.)**
   ```typescript
   // Integrar con servicio de email
   await sendEmail({
     to: "feedback@latamfi.com",
     subject: `Feedback: ${feedbackType}`,
     body: feedback,
   });
   ```

## 📊 Eventos Personalizados

### Eventos de Wallet
- `wallet_connect` - Cuando un usuario conecta su wallet
- `wallet_disconnect` - Cuando un usuario desconecta su wallet

### Eventos de Transacciones
- `payment_sent` - Cuando se envía un pago
- `remittance_sent` - Cuando se envía una remesa
- `microcredit_request` - Cuando se solicita un microcrédito

### Eventos de UX
- `feedback_submitted` - Cuando se envía feedback
- `button_click` - Clicks en botones importantes
- `page_view` - Visitas a páginas (automático)

### Eventos de Errores
- `exception` - Errores y excepciones

## 🔒 Privacidad

**Consideraciones:**
- ✅ Direcciones de wallet se truncan (solo primeros 10 caracteres)
- ✅ No se trackean datos sensibles
- ✅ Cumple con GDPR (opcional: agregar consentimiento)

**Para agregar consentimiento GDPR:**
```typescript
// Crear componente de consentimiento
// Solo inicializar GA después de consentimiento
if (hasConsent) {
  initGoogleAnalytics(gaId);
}
```

## 📈 Dashboard de Analytics

**Métricas importantes a monitorear:**
1. **Usuarios activos** (DAU, MAU)
2. **Tasa de conversión** (visitas → conexión de wallet)
3. **Eventos de transacciones** (pagos, remesas, microcréditos)
4. **Errores** (frecuencia y tipos)
5. **Feedback** (tipos y frecuencia)

## 🚀 Próximos Pasos

- [ ] Agregar consentimiento GDPR (si es necesario)
- [ ] Integrar Sentry para error tracking avanzado
- [ ] Configurar alertas para errores críticos
- [ ] Crear dashboard personalizado en GA4
- [ ] Integrar feedback con backend API
- [ ] Agregar heatmaps (opcional: Hotjar, Clarity)

## 📚 Recursos

- [Google Analytics 4 Documentation](https://developers.google.com/analytics/devguides/collection/ga4)
- [Sentry Next.js Setup](https://docs.sentry.io/platforms/javascript/guides/nextjs/)
- [GDPR Compliance Guide](https://gdpr.eu/)

