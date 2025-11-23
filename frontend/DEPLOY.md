# 🚀 Guía de Despliegue en Vercel

Esta guía te ayudará a desplegar Enerpay en Vercel de forma rápida y segura.

## 📋 Prerrequisitos

1. **Cuenta de Vercel**: Regístrate en [vercel.com](https://vercel.com) (gratis)
2. **Repositorio Git**: Tu código debe estar en GitHub, GitLab o Bitbucket
3. **WalletConnect Project ID** (opcional pero recomendado): Obtén uno en [cloud.walletconnect.com](https://cloud.walletconnect.com)

## 🔧 Variables de Entorno

Antes de desplegar, configura estas variables de entorno en Vercel:

### Variables Requeridas

Ninguna variable es estrictamente requerida, pero se recomienda configurar:

### Variables Opcionales (Recomendadas)

| Variable | Descripción | Ejemplo | Dónde obtener |
|----------|-------------|---------|---------------|
| `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID` | ID del proyecto WalletConnect para conexión de wallets | `a1b2c3d4e5f6...` (32 caracteres hex) | [cloud.walletconnect.com](https://cloud.walletconnect.com) |
| `NEXT_PUBLIC_APP_NAME` | Nombre de la aplicación | `Enerpay` | - |
| `NEXT_PUBLIC_CELO_RPC_URL` | URL del RPC de Celo (opcional, usa default si no se define) | `https://forno.celo.org` | - |
| `NEXT_PUBLIC_REMITTANCE_CONTRACT_ADDRESS` | Dirección del contrato de remesas (opcional, usa default) | `0x733177De022870Eb7Cfd0B72fAC63F53a1F96f48` | Contrato desplegado |

## ✅ Repositorio Ya Conectado

**¡Buenas noticias!** El repositorio ya está conectado con Vercel para despliegues automáticos.

- **Repositorio**: `https://github.com/Edgadafi/enerpay-celo`
- **Proyecto Vercel**: `enerpay`
- **Estado**: ✅ Conectado

Cada push a la rama `main` despliega automáticamente a producción. Ver [DEPLOY_AUTOMATIC.md](./DEPLOY_AUTOMATIC.md) para más detalles.

## 📦 Método 1: Despliegue desde Vercel Dashboard (Ya Configurado)

### Paso 1: Verificar Conexión (Ya Hecho)

El repositorio ya está conectado. Puedes verificar en:
- Vercel Dashboard → Settings → Git

### Paso 2: Configurar Proyecto (Ya Configurado)

1. **Root Directory**: Selecciona `frontend` (o deja vacío si el proyecto está en la raíz)
2. **Framework Preset**: Debería detectar automáticamente "Next.js"
3. **Build Command**: `npm run build` (por defecto)
4. **Output Directory**: `.next` (por defecto)
5. **Install Command**: `npm install` (por defecto)

### Paso 3: Configurar Variables de Entorno

1. En la sección "Environment Variables", agrega:
   ```
   NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=tu_project_id_aqui
   NEXT_PUBLIC_APP_NAME=Enerpay
   ```

2. Opcionalmente, agrega:
   ```
   NEXT_PUBLIC_CELO_RPC_URL=https://forno.celo.org
   NEXT_PUBLIC_REMITTANCE_CONTRACT_ADDRESS=0x733177De022870Eb7Cfd0B72fAC63F53a1F96f48
   ```

### Paso 4: Desplegar

1. Haz clic en **"Deploy"**
2. Espera a que termine el build (2-5 minutos)
3. ¡Listo! Tu app estará disponible en `https://tu-proyecto.vercel.app`

## 📦 Método 2: Despliegue desde CLI

### Paso 1: Instalar Vercel CLI

```bash
npm i -g vercel
```

### Paso 2: Login

```bash
vercel login
```

### Paso 3: Navegar al Directorio Frontend

```bash
cd frontend
```

### Paso 4: Desplegar

```bash
# Primera vez (configuración interactiva)
vercel

# Despliegues siguientes
vercel --prod
```

### Paso 5: Configurar Variables de Entorno

```bash
# Configurar variables
vercel env add NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID
vercel env add NEXT_PUBLIC_APP_NAME
vercel env add NEXT_PUBLIC_CELO_RPC_URL
vercel env add NEXT_PUBLIC_REMITTANCE_CONTRACT_ADDRESS

# Aplicar a producción
vercel env pull .env.local
```

## 🔍 Verificación Post-Despliegue

### 1. Verificar Build

- ✅ El build debe completarse sin errores
- ✅ Todas las rutas deben estar disponibles

### 2. Probar Funcionalidades

- ✅ Conectar wallet (MetaMask, WalletConnect, etc.)
- ✅ Ver balance de cUSD
- ✅ Enviar remesas
- ✅ Ver historial de remesas

### 3. Verificar Variables de Entorno

En la consola del navegador, verifica que no haya errores de:
- WalletConnect (si no configuraste `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID`, verás warnings pero funcionará)
- Conexión a Celo Sepolia Testnet

## 🐛 Solución de Problemas

### Error: Build Failed

**Problema**: El build falla en Vercel

**Solución**:
1. Verifica que `package.json` tenga todos los scripts necesarios
2. Revisa los logs de build en Vercel Dashboard
3. Asegúrate de que el directorio raíz esté configurado correctamente (`frontend`)

### Error: WalletConnect 403

**Problema**: Errores 403 en la consola relacionados con WalletConnect

**Solución**:
1. Obtén un Project ID válido en [cloud.walletconnect.com](https://cloud.walletconnect.com)
2. Agrega `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID` en las variables de entorno de Vercel
3. Redespliega la aplicación

### Error: Cannot Connect to Celo

**Problema**: No se puede conectar a la red Celo

**Solución**:
1. Verifica que `NEXT_PUBLIC_CELO_RPC_URL` esté configurado correctamente
2. Prueba con el RPC por defecto: `https://forno.celo.org` (mainnet) o `https://forno.celo-sepolia.celo-testnet.org` (testnet)

### Error: Contract Not Found

**Problema**: No se encuentra el contrato de remesas

**Solución**:
1. Verifica que `NEXT_PUBLIC_REMITTANCE_CONTRACT_ADDRESS` tenga la dirección correcta
2. Asegúrate de que el contrato esté desplegado en Celo Sepolia Testnet
3. Verifica la dirección en [Celo Sepolia Explorer](https://explorer.celo.org/sepolia)

## 🔄 Actualizaciones Automáticas

✅ **Ya configurado**: El repositorio está conectado y los despliegues automáticos están activos.

Vercel despliega automáticamente cuando haces push a:
- **Producción**: Rama `main` → `https://enerpay.vercel.app`
- **Preview**: Cualquier otra rama o pull request → URL única por rama/PR

Para más detalles sobre despliegues automáticos, ver [DEPLOY_AUTOMATIC.md](./DEPLOY_AUTOMATIC.md).

## 📊 Monitoreo

- **Logs**: Ve a tu proyecto en Vercel Dashboard → "Deployments" → Selecciona un deployment → "Functions" → Ver logs
- **Analytics**: Vercel Analytics está disponible en el plan Pro
- **Performance**: Usa Lighthouse o Vercel Analytics para monitorear rendimiento

## 🔐 Seguridad

- ✅ Nunca commitees `.env.local` o archivos con claves privadas
- ✅ Usa variables de entorno de Vercel para datos sensibles
- ✅ Revisa los permisos de tu repositorio Git
- ✅ Habilita 2FA en tu cuenta de Vercel

## 📚 Recursos Adicionales

- [Documentación de Vercel](https://vercel.com/docs)
- [Next.js en Vercel](https://vercel.com/docs/frameworks/nextjs)
- [Variables de Entorno en Vercel](https://vercel.com/docs/environment-variables)
- [WalletConnect Cloud](https://cloud.walletconnect.com)

## ✅ Checklist Pre-Despliegue

- [ ] Código en repositorio Git
- [ ] Build local funciona (`npm run build`)
- [ ] Variables de entorno documentadas
- [ ] WalletConnect Project ID obtenido (opcional)
- [ ] Contrato desplegado en Celo Sepolia
- [ ] Dirección del contrato actualizada en código o variables de entorno
- [ ] `.env.local` no está en el repositorio (verificado en `.gitignore`)

---

**¿Problemas?** Revisa los logs en Vercel Dashboard o abre un issue en el repositorio.

