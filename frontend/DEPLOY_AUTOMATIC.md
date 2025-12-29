# 🔄 Despliegues Automáticos con Vercel + GitHub

El repositorio de Enerpay ya está conectado con Vercel para despliegues automáticos.

## ✅ Estado Actual

- **Repositorio**: `https://github.com/Edgadafi/enerpay-celo`
- **Proyecto Vercel**: `enerpay` (ID: `prj_9PSVQ0OPMih7rQfyjliO7AT04LzG`)
- **Estado**: ✅ Conectado y configurado

## 🚀 Cómo Funcionan los Despliegues Automáticos

### Despliegues Automáticos por Rama

Vercel despliega automáticamente cuando haces push a:

1. **Rama `main`** → Despliegue de **Producción**
   - URL: `https://enerpay.vercel.app` (o tu dominio personalizado)
   - Se despliega automáticamente en cada push

2. **Otras ramas** → Despliegue de **Preview**
   - URL: `https://enerpay-git-[rama]-edgadafis-projects.vercel.app`
   - Útil para probar cambios antes de mergear a `main`

3. **Pull Requests** → Despliegue de **Preview**
   - URL única por PR
   - Comentarios automáticos en el PR con el link

### Flujo de Trabajo Recomendado

```bash
# 1. Crear una rama para tu feature
git checkout -b feature/nueva-funcionalidad

# 2. Hacer cambios y commitear
git add .
git commit -m "feat: nueva funcionalidad"

# 3. Push a GitHub
git push origin feature/nueva-funcionalidad

# 4. Vercel despliega automáticamente una preview
# 5. Revisar la preview en el link que aparece en el PR
# 6. Si todo está bien, mergear a main
git checkout main
git merge feature/nueva-funcionalidad
git push origin main

# 7. Vercel despliega automáticamente a producción
```

## 🔧 Configurar Variables de Entorno

Para que las variables de entorno estén disponibles en producción, configúralas en Vercel:

### Opción 1: Desde Vercel Dashboard (Recomendado)

1. Ve a [vercel.com/dashboard](https://vercel.com/dashboard)
2. Selecciona el proyecto `enerpay`
3. Ve a **Settings** → **Environment Variables**
4. Agrega las variables:

| Variable | Valor | Entornos |
|----------|-------|----------|
| `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID` | Tu Project ID de WalletConnect | Production, Preview, Development |
| `NEXT_PUBLIC_APP_NAME` | `Enerpay` | Production, Preview, Development |
| `NEXT_PUBLIC_CELO_RPC_URL` | `https://forno.celo-sepolia.celo-testnet.org` | Production, Preview, Development |
| `NEXT_PUBLIC_REMITTANCE_CONTRACT_ADDRESS` | `0x8aB940E40F64306E1C6af7B80429B4D0Bd2C65eb` | Production, Preview, Development |

5. Haz clic en **Save**
6. **Importante**: Redespliega para aplicar los cambios:
   - Ve a **Deployments**
   - Haz clic en los tres puntos (⋯) del último deployment
   - Selecciona **Redeploy**

### Opción 2: Desde CLI

```bash
# Agregar variable de entorno
vercel env add NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID

# Te pedirá:
# - Valor: [pega tu Project ID]
# - Entornos: [selecciona Production, Preview, Development]

# Repite para cada variable
vercel env add NEXT_PUBLIC_APP_NAME
vercel env add NEXT_PUBLIC_CELO_RPC_URL
vercel env add NEXT_PUBLIC_REMITTANCE_CONTRACT_ADDRESS

# Ver todas las variables
vercel env ls

# Redesplegar para aplicar cambios
vercel --prod
```

## 📊 Monitorear Despliegues

### Ver Estado de Despliegues

1. **Dashboard de Vercel**: [vercel.com/dashboard](https://vercel.com/dashboard)
   - Ve a tu proyecto → **Deployments**
   - Verás todos los despliegues con su estado (Building, Ready, Error)

2. **Desde CLI**:
   ```bash
   vercel ls
   ```

### Ver Logs de Build

1. En Vercel Dashboard → **Deployments** → Selecciona un deployment
2. Haz clic en **Build Logs** o **Function Logs**
3. O desde CLI:
   ```bash
   vercel logs [deployment-url]
   ```

## 🔍 Verificar Configuración

### Verificar Conexión del Repositorio

```bash
# Ver información del proyecto
cat .vercel/project.json

# Verificar que el repositorio está conectado
vercel inspect
```

### Verificar Configuración de Build

El archivo `vercel.json` en la raíz del proyecto contiene:

```json
{
  "buildCommand": "cd frontend && npm install && npm run build",
  "outputDirectory": "frontend/.next",
  "installCommand": "cd frontend && npm install",
  "framework": "nextjs"
}
```

## 🐛 Solución de Problemas

### Despliegue No Se Activa Automáticamente

**Problema**: Haces push pero no se despliega automáticamente.

**Solución**:
1. Verifica que el repositorio esté conectado:
   - Ve a Vercel Dashboard → Settings → Git
   - Debe mostrar: `https://github.com/Edgadafi/enerpay-celo`
2. Verifica que estés haciendo push a la rama correcta (`main` para producción)
3. Revisa los webhooks de GitHub:
   - Ve a GitHub → Settings → Webhooks
   - Debe haber un webhook de Vercel activo

### Build Falla en Vercel pero Funciona Localmente

**Problema**: `npm run build` funciona localmente pero falla en Vercel.

**Solución**:
1. Verifica que todas las dependencias estén en `package.json` (no solo en `node_modules`)
2. Revisa los logs de build en Vercel para ver el error específico
3. Asegúrate de que `vercel.json` tenga la configuración correcta del directorio raíz

### Variables de Entorno No Funcionan

**Problema**: Las variables configuradas no están disponibles en producción.

**Solución**:
1. Verifica que las variables estén configuradas para el entorno correcto (Production)
2. **Redespliega** después de agregar/modificar variables
3. Verifica que los nombres de las variables empiecen con `NEXT_PUBLIC_` si son para el cliente

## 🔐 Seguridad

### Buenas Prácticas

- ✅ **Nunca** commitees `.env.local` o archivos con secretos
- ✅ Usa variables de entorno de Vercel para datos sensibles
- ✅ Revisa los permisos de tu repositorio (público vs privado)
- ✅ Habilita 2FA en tu cuenta de Vercel
- ✅ Revisa los logs regularmente para detectar problemas

### Variables Sensibles

Si necesitas variables que NO deben exponerse al cliente (sin `NEXT_PUBLIC_`):

1. Configúralas en Vercel Dashboard → Environment Variables
2. Solo estarán disponibles en el servidor (API routes, Server Components)
3. No estarán disponibles en el cliente (browser)

## 📈 Próximos Pasos

1. **Configurar Dominio Personalizado** (opcional):
   - Ve a Settings → Domains
   - Agrega tu dominio personalizado

2. **Habilitar Analytics** (requiere plan Pro):
   - Ve a Analytics en el dashboard
   - Monitorea rendimiento y uso

3. **Configurar Notificaciones**:
   - Ve a Settings → Notifications
   - Recibe emails cuando los despliegues fallen

## ✅ Checklist

- [x] Repositorio conectado con Vercel
- [ ] Variables de entorno configuradas
- [ ] Primer despliegue exitoso verificado
- [ ] Webhooks de GitHub funcionando
- [ ] Dominio personalizado configurado (opcional)
- [ ] Notificaciones configuradas (opcional)

---

**¿Preguntas?** Revisa la [documentación oficial de Vercel](https://vercel.com/docs) o los logs en el dashboard.

