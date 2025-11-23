# 🚀 Guía Completa: Configurar Root Directory y WalletConnect en Vercel

Esta guía te llevará paso a paso para configurar el Root Directory y agregar la variable de WalletConnect en Vercel.

## 📋 Paso 1: Configurar Root Directory

### 1.1 Acceder al Dashboard

1. Ve a [vercel.com/dashboard](https://vercel.com/dashboard)
2. Inicia sesión si es necesario
3. Selecciona el proyecto **enerpay**

### 1.2 Configurar Root Directory

1. Haz clic en la pestaña **Settings** (Configuración) en la parte superior
2. Desplázate hasta la sección **General**
3. Busca la opción **Root Directory**
4. Haz clic en **Edit** (Editar)
5. Ingresa: `frontend`
6. Haz clic en **Save** (Guardar)

**✅ Verificación**: Después de guardar, deberías ver `frontend` en el campo Root Directory.

### 1.3 ¿Por qué es necesario?

Tu proyecto tiene esta estructura:
```
enerpay/
├── frontend/          ← Aquí está Next.js (package.json, next.config.mjs)
│   ├── package.json
│   ├── src/
│   └── ...
├── contracts/         ← Smart contracts
└── vercel.json
```

Vercel necesita saber que el directorio raíz del proyecto Next.js es `frontend`, no la raíz del repositorio.

---

## 📋 Paso 2: Obtener WalletConnect Project ID

### 2.1 Crear Cuenta/Iniciar Sesión

1. Ve a [cloud.walletconnect.com](https://cloud.walletconnect.com)
2. Inicia sesión o crea una cuenta (es gratis)

### 2.2 Crear un Nuevo Proyecto

1. Una vez dentro, haz clic en **Create New Project** o **+ New Project**
2. Completa el formulario:
   - **Project Name**: `Enerpay` (o el nombre que prefieras)
   - **Homepage URL**: `https://enerpay.vercel.app` (o tu dominio)
   - **Allowed Domains**: 
     - `localhost:3000` (para desarrollo local)
     - `*.vercel.app` (para previews de Vercel)
     - Tu dominio de producción (si lo tienes)
3. Haz clic en **Create**

### 2.3 Copiar el Project ID

1. Una vez creado el proyecto, verás el **Project ID**
2. Es una cadena de 32 caracteres hexadecimales (ejemplo: `a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6`)
3. **Copia este ID** (lo necesitarás en el siguiente paso)

**💡 Tip**: El Project ID también está disponible en la sección **Project Settings** del proyecto.

---

## 📋 Paso 3: Agregar Variable de WalletConnect en Vercel

### 3.1 Acceder a Variables de Entorno

1. En el Dashboard de Vercel, ve a tu proyecto **enerpay**
2. Haz clic en **Settings** → **Environment Variables**

### 3.2 Agregar la Variable

1. Haz clic en **Add New** (Agregar Nueva)
2. Completa el formulario:
   - **Name**: `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID`
   - **Value**: Pega el Project ID que copiaste en el Paso 2.3
   - **Environments**: Selecciona los tres:
     - ✅ Production
     - ✅ Preview
     - ✅ Development
3. Haz clic en **Save**

**✅ Verificación**: Deberías ver la variable en la lista con los tres entornos marcados.

---

## 📋 Paso 4: Redesplegar la Aplicación

Después de configurar el Root Directory y agregar la variable, necesitas redesplegar para aplicar los cambios.

### Opción 1: Desde el Dashboard (Recomendado)

1. Ve a **Deployments** en tu proyecto
2. Haz clic en los tres puntos (⋯) del último deployment
3. Selecciona **Redeploy**
4. Espera a que termine el build (2-5 minutos)

### Opción 2: Desde CLI

```bash
cd /home/edgadafi/enerpay
vercel --prod
```

### Opción 3: Hacer un Nuevo Push

```bash
git commit --allow-empty -m "chore: trigger redeploy after Vercel config"
git push origin main
```

---

## ✅ Verificación Final

### 1. Verificar Root Directory

1. Ve a **Settings** → **General**
2. Verifica que **Root Directory** muestre: `frontend`

### 2. Verificar Variables de Entorno

1. Ve a **Settings** → **Environment Variables**
2. Deberías ver estas 4 variables:
   - ✅ `NEXT_PUBLIC_APP_NAME`
   - ✅ `NEXT_PUBLIC_CELO_RPC_URL`
   - ✅ `NEXT_PUBLIC_REMITTANCE_CONTRACT_ADDRESS`
   - ✅ `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID`

### 3. Verificar Despliegue

1. Ve a **Deployments**
2. El último deployment debería estar en estado **Ready** (verde)
3. Haz clic en el deployment y verifica que:
   - El build completó sin errores
   - Las variables de entorno están disponibles
   - La aplicación carga correctamente

### 4. Probar en Producción

1. Abre la URL de producción: `https://enerpay.vercel.app` (o tu dominio)
2. Intenta conectar una wallet
3. No deberías ver errores de WalletConnect en la consola del navegador

---

## 🐛 Solución de Problemas

### Error: "No Next.js version detected"

**Causa**: Root Directory no está configurado correctamente.

**Solución**:
1. Verifica que el Root Directory sea exactamente `frontend` (sin espacios, sin `/` al inicio)
2. Verifica que `frontend/package.json` exista y contenga `"next"` en dependencies

### Error: "WalletConnect 403" o "Origin not found on Allowlist"

**Causa**: El dominio no está en la lista de dominios permitidos en WalletConnect Cloud.

**Solución**:
1. Ve a [cloud.walletconnect.com](https://cloud.walletconnect.com)
2. Selecciona tu proyecto
3. Ve a **Project Settings** → **Allowed Domains**
4. Agrega:
   - `localhost:3000`
   - `*.vercel.app`
   - Tu dominio de producción

### Error: Build falla después de configurar Root Directory

**Causa**: Puede haber un problema con la configuración o dependencias.

**Solución**:
1. Revisa los logs del build en Vercel Dashboard
2. Verifica que `frontend/package.json` tenga todas las dependencias necesarias
3. Intenta hacer un build local: `cd frontend && npm run build`

---

## 📚 Recursos Adicionales

- [Documentación de Vercel - Root Directory](https://vercel.com/docs/projects/project-configuration#root-directory)
- [Documentación de Vercel - Environment Variables](https://vercel.com/docs/environment-variables)
- [WalletConnect Cloud Documentation](https://docs.walletconnect.com/cloud)
- [Next.js Environment Variables](https://nextjs.org/docs/basic-features/environment-variables)

---

## ✅ Checklist

- [ ] Root Directory configurado como `frontend` en Vercel
- [ ] WalletConnect Project ID obtenido
- [ ] Variable `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID` agregada en Vercel
- [ ] Dominios permitidos configurados en WalletConnect Cloud
- [ ] Aplicación redesplegada
- [ ] Build completado exitosamente
- [ ] Aplicación funciona correctamente en producción
- [ ] Conexión de wallet funciona sin errores

---

**¿Necesitas ayuda?** Revisa los logs en Vercel Dashboard o abre un issue en el repositorio.

