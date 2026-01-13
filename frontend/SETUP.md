# 🚀 Guía Rápida de Setup - LatamFi Frontend

## ⚡ Inicio Rápido (5 minutos)

### 1. Instalar Dependencias

```bash
cd frontend
npm install
```

### 2. Configurar Variables de Entorno

```bash
cp .env.example .env.local
```

Edita `.env.local` y agrega tu WalletConnect Project ID:

```env
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=tu_project_id_aqui
```

**¿Cómo obtener un Project ID?**
1. Ve a [WalletConnect Cloud](https://cloud.walletconnect.com)
2. Crea una cuenta o inicia sesión
3. Crea un nuevo proyecto
4. Copia el Project ID y pégalo en `.env.local`

### 3. Ejecutar en Desarrollo

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## ✅ Verificación

### Verificar que todo funciona:

1. **Conexión de Wallet**
   - Haz clic en "Connect Wallet"
   - Selecciona tu wallet (MetaMask, Valora, etc.)
   - Acepta la conexión

2. **Cambio de Red**
   - Si no estás en Celo Mainnet, verás un prompt para cambiar
   - Haz clic en "Switch Network"
   - Acepta el cambio de red en tu wallet

3. **Balance de cUSD**
   - Una vez conectado, deberías ver tu balance de cUSD
   - Si no tienes cUSD, puedes obtenerlo en [Mento](https://mento.org)

## 🧪 Testing en Alfajores (Testnet)

Para probar en testnet:

1. Cambia la configuración en `src/lib/wagmi/config.ts` temporalmente
2. O usa el switch de red en RainbowKit para cambiar a Alfajores
3. Obtén cUSD de testnet en el [Faucet de Alfajores](https://celo.org/developers/faucet)

## 🐛 Problemas Comunes

### Error: "WalletConnect Project ID not set"

**Solución**: Asegúrate de tener `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID` en `.env.local`

### Error: "Cannot connect to Celo"

**Solución**: 
- Verifica que tu wallet soporte Celo
- Si usas MetaMask, agrega Celo manualmente:
  - Network Name: Celo
  - RPC URL: https://forno.celo.org
  - Chain ID: 42220
  - Currency Symbol: CELO
  - Block Explorer: https://celoscan.io

### Balance no se muestra

**Solución**:
- Verifica que estás en Celo Mainnet (Chain ID: 42220)
- Verifica que tienes cUSD en tu wallet
- Revisa la consola del navegador para errores

## 📱 Testing en Móvil

Para probar en móvil:

1. Ejecuta `npm run dev`
2. Encuentra tu IP local: `ip addr show` (Linux) o `ipconfig` (Windows)
3. Accede desde tu móvil: `http://TU_IP:3000`
4. O usa un servicio como [ngrok](https://ngrok.com) para un túnel público

## 🚀 Deploy

### Vercel (Recomendado)

```bash
# Instalar Vercel CLI
npm i -g vercel

# Deploy
vercel
```

Asegúrate de configurar las variables de entorno en el dashboard de Vercel.

### Otros Servicios

Cualquier servicio que soporte Next.js funcionará:
- Netlify
- Railway
- Render
- AWS Amplify

## 📚 Próximos Pasos

1. ✅ Setup completado
2. 🔄 Probar conexión de wallet
3. 💰 Obtener cUSD para testing
4. 📤 Probar envío de transacciones
5. 📥 Probar recepción de pagos
6. 🎨 Personalizar UI si es necesario

## 🆘 Ayuda

Si tienes problemas:
1. Revisa la [documentación de Celo](https://docs.celo.org)
2. Revisa los [issues en GitHub](https://github.com/celo-org)
3. Únete al [Discord de Celo](https://discord.gg/celo)

---

**¡Listo para construir! 🚀**

