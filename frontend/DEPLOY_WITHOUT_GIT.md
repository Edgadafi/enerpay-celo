# 🚀 Despliegue en Vercel sin Git

Este proyecto está desplegado directamente desde tu máquina local usando Vercel CLI, **sin** un repositorio Git conectado.

## 📋 Estado Actual

- ✅ Proyecto desplegado: `enerpay-celo`
- ✅ URL de producción: https://enerpay-celo-9ygaic1h7-edgadafis-projects.vercel.app
- ✅ Build exitoso sin errores

## 🔄 Cómo Actualizar el Deployment

Cada vez que hagas cambios y quieras actualizar la aplicación en producción:

### Paso 1: Asegúrate de estar en el directorio correcto

```bash
cd /home/edgadafi/enerpay/frontend
```

### Paso 2: Despliega a producción

```bash
vercel --prod
```

Esto:
- Subirá todos los archivos del directorio `frontend/`
- Ejecutará el build en Vercel
- Desplegará la nueva versión a producción

## 📝 Comandos Útiles de Vercel CLI

### Ver deployments recientes
```bash
vercel ls
```

### Ver logs de un deployment
```bash
vercel inspect [deployment-url] --logs
```

### Desplegar solo a preview (no producción)
```bash
vercel
```

### Ver información del proyecto
```bash
vercel inspect
```

## ⚙️ Configuración Actual

- **Framework**: Next.js (auto-detectado)
- **Build Command**: `npm run build`
- **Install Command**: `npm install --legacy-peer-deps`
- **Output Directory**: `.next` (default de Next.js)

## 🔐 Variables de Entorno

Si necesitas configurar variables de entorno:

### Opción 1: Desde Vercel Dashboard
1. Ve a: https://vercel.com/edgadafis-projects/enerpay-celo/settings/environment-variables
2. Agrega las variables necesarias:
   - `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID` (opcional)
   - `NEXT_PUBLIC_APP_NAME` (opcional)
   - `NEXT_PUBLIC_CELO_RPC_URL` (opcional)
   - `NEXT_PUBLIC_REMITTANCE_CONTRACT_ADDRESS` (opcional)

### Opción 2: Desde CLI
```bash
vercel env add NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID
# Sigue las instrucciones interactivas
```

## 🔄 Flujo de Trabajo Recomendado

1. **Desarrollo local**: 
   ```bash
   cd /home/edgadafi/enerpay/frontend
   npm run dev
   ```

2. **Probar cambios localmente** en http://localhost:3000

3. **Verificar build local**:
   ```bash
   npm run build
   ```

4. **Desplegar a producción**:
   ```bash
   vercel --prod
   ```

## ⚠️ Importante

- **Sin Git**: Cada cambio requiere ejecutar `vercel --prod` manualmente
- **Con Git**: Si conectas un repositorio, Vercel desplegará automáticamente en cada push

## 🔗 Conectar Repositorio Git (Opcional)

Si quieres automatizar los despliegues:

1. Crea un repositorio en GitHub/GitLab/Bitbucket
2. Haz commit de tu código:
   ```bash
   cd /home/edgadafi/enerpay
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin [tu-repo-url]
   git push -u origin main
   ```
3. En Vercel Dashboard:
   - Settings → Git → Connect Git Repository
   - Selecciona tu repositorio
   - Configura Root Directory: `frontend`
   - Guarda

Después de esto, cada `git push` desplegará automáticamente.

## 📊 Monitoreo

- **Dashboard**: https://vercel.com/edgadafis-projects/enerpay-celo
- **Logs**: Disponibles en cada deployment
- **Analytics**: Disponible en el plan Pro

## 🐛 Solución de Problemas

### Error: "Command not found: vercel"
```bash
npm i -g vercel
```

### Error: "Not logged in"
```bash
vercel login
```

### Error: Build failed
1. Verifica que el build funcione localmente: `npm run build`
2. Revisa los logs: `vercel inspect [deployment-url] --logs`
3. Verifica que `package.json` no tenga dependencias conflictivas

---

**¿Necesitas ayuda?** Revisa los logs en Vercel Dashboard o ejecuta `vercel inspect --logs`

