# 🔐 Variables de Entorno Configuradas en Vercel

## ✅ Variables Configuradas

Las siguientes variables de entorno están configuradas en Vercel para todos los entornos (Production, Preview, Development):

| Variable | Valor | Descripción |
|----------|-------|-------------|
| `NEXT_PUBLIC_APP_NAME` | `Enerpay` | Nombre de la aplicación |
| `NEXT_PUBLIC_CELO_RPC_URL` | `https://forno.celo-sepolia.celo-testnet.org` | URL del RPC de Celo Sepolia Testnet |
| `NEXT_PUBLIC_REMITTANCE_CONTRACT_ADDRESS` | `0x733177De022870Eb7Cfd0B72fAC63F53a1F96f48` | Dirección del contrato de remesas desplegado en Celo Sepolia |

## ⚠️ Variable Opcional (Recomendada)

La siguiente variable **no está configurada** pero es recomendada para una mejor experiencia de usuario:

| Variable | Descripción | Cómo Obtenerla |
|----------|-------------|----------------|
| `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID` | Project ID de WalletConnect para conexión de wallets | [cloud.walletconnect.com](https://cloud.walletconnect.com) |

### Cómo Agregar WalletConnect Project ID

Si quieres agregar esta variable:

```bash
# Desde CLI
echo "tu-project-id-aqui" | vercel env add NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID production
echo "tu-project-id-aqui" | vercel env add NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID preview
echo "tu-project-id-aqui" | vercel env add NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID development
```

O desde el Dashboard de Vercel:
1. Ve a [vercel.com/dashboard](https://vercel.com/dashboard)
2. Selecciona el proyecto `enerpay`
3. Ve a **Settings** → **Environment Variables**
4. Agrega `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID` con tu Project ID
5. Selecciona todos los entornos (Production, Preview, Development)
6. Guarda y redespliega

## 🔄 Aplicar Cambios

**Importante**: Después de agregar o modificar variables de entorno, necesitas **redesplegar** la aplicación para que los cambios tomen efecto.

### Opción 1: Desde Vercel Dashboard

1. Ve a [vercel.com/dashboard](https://vercel.com/dashboard)
2. Selecciona el proyecto `enerpay`
3. Ve a **Deployments**
4. Haz clic en los tres puntos (⋯) del último deployment
5. Selecciona **Redeploy**

### Opción 2: Desde CLI

```bash
# Redesplegar a producción
vercel --prod

# O hacer un nuevo commit y push (despliegue automático)
git commit --allow-empty -m "chore: trigger redeploy"
git push origin main
```

## 📋 Verificar Variables

Para ver todas las variables configuradas:

```bash
vercel env ls
```

Para descargar las variables localmente (útil para desarrollo):

```bash
vercel env pull .env.local
```

## 🔍 Valores Actuales

### NEXT_PUBLIC_APP_NAME
- **Valor**: `Enerpay`
- **Uso**: Nombre de la aplicación mostrado en la UI

### NEXT_PUBLIC_CELO_RPC_URL
- **Valor**: `https://forno.celo-sepolia.celo-testnet.org`
- **Uso**: Endpoint RPC para conectarse a Celo Sepolia Testnet
- **Alternativas**:
  - Mainnet: `https://forno.celo.org`
  - Alfajores: `https://alfajores-forno.celo-testnet.org`

### NEXT_PUBLIC_REMITTANCE_CONTRACT_ADDRESS
- **Valor**: `0x733177De022870Eb7Cfd0B72fAC63F53a1F96f48`
- **Uso**: Dirección del contrato inteligente `EnerpayRemittance` desplegado en Celo Sepolia
- **Explorer**: [Ver en Celo Sepolia Explorer](https://explorer.celo.org/sepolia/address/0x733177De022870Eb7Cfd0B72fAC63F53a1F96f48)

## 🛡️ Seguridad

- ✅ Todas las variables están encriptadas en Vercel
- ✅ Las variables `NEXT_PUBLIC_*` son públicas (se exponen al cliente)
- ✅ No hay secretos sensibles en estas variables
- ✅ El `.env.local` está en `.gitignore` y no se commitea

## 📝 Notas

- Las variables `NEXT_PUBLIC_*` están disponibles tanto en el servidor como en el cliente (browser)
- Para variables solo del servidor, no uses el prefijo `NEXT_PUBLIC_`
- Los cambios en variables de entorno requieren un redespliegue para aplicarse
- Las variables se pueden tener valores diferentes por entorno (Production, Preview, Development)

---

**Última actualización**: Variables configuradas el $(date)

