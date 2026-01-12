# ⚡ Despliegue Rápido de LatamFi en Vercel

## Opción 1: Usar el Script Automático (Recomendado)

```bash
cd /home/edgadafi/enerpay
./deploy-latamfi.sh
```

El script te guiará paso a paso para:
- ✅ Verificar autenticación
- ✅ Crear proyecto "LatamFi" en Vercel
- ✅ Configurar root directory
- ✅ Desplegar a producción

## Opción 2: Usar Vercel CLI Manualmente

### Paso 1: Autenticarse (si no lo has hecho)
```bash
vercel login
```

### Paso 2: Crear el Proyecto
```bash
cd /home/edgadafi/enerpay
vercel --yes --name="latamfi" --root-directory="frontend"
```

### Paso 3: Desplegar a Producción
```bash
vercel --prod
```

## Opción 3: Desde Vercel Dashboard (Web)

1. Ve a [vercel.com/new](https://vercel.com/new)
2. Selecciona tu repositorio
3. Configura:
   - **Project Name**: `LatamFi`
   - **Root Directory**: `frontend`
   - **Framework**: Next.js (auto-detect)
4. Haz clic en **Deploy**

## 📋 Variables de Entorno Requeridas

Después de crear el proyecto, agrega estas variables en **Settings → Environment Variables**:

| Variable | Valor | Entornos |
|----------|-------|----------|
| `NEXT_PUBLIC_APP_NAME` | `LatamFi` | All |
| `NEXT_PUBLIC_CELO_RPC_URL` | `https://forno.celo.org` | All |
| `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID` | `<tu-project-id>` | All |

**Obtén WalletConnect Project ID en**: [cloud.walletconnect.com](https://cloud.walletconnect.com)

## ✅ Verificación

Una vez desplegado, tu aplicación estará disponible en:
- `https://latamfi.vercel.app` (o el dominio que Vercel asigne)

## 📚 Guía Completa

Para instrucciones detalladas, ver: **VERCEL_DEPLOY_LATAMFI.md**

