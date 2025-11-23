# ⚡ Configuración Rápida de Vercel

## 🎯 Resumen de lo que necesitas hacer

### 1️⃣ Configurar Root Directory (Dashboard de Vercel)

**⏱️ Tiempo estimado: 2 minutos**

1. Ve a [vercel.com/dashboard](https://vercel.com/dashboard) → Proyecto **enerpay**
2. **Settings** → **General** → **Root Directory**
3. Ingresa: `frontend`
4. Guarda

### 2️⃣ Obtener WalletConnect Project ID

**⏱️ Tiempo estimado: 3 minutos**

1. Ve a [cloud.walletconnect.com](https://cloud.walletconnect.com)
2. Crea un nuevo proyecto:
   - **Name**: `Enerpay`
   - **Homepage**: `https://enerpay.vercel.app`
   - **Allowed Domains**: 
     - `localhost:3000`
     - `*.vercel.app`
3. Copia el **Project ID** (32 caracteres hex)

### 3️⃣ Agregar Variable de WalletConnect

**Opción A: Usando el script (Recomendado)**

```bash
cd /home/edgadafi/enerpay/frontend
./add-walletconnect-env.sh TU_PROJECT_ID_AQUI
```

**Opción B: Manualmente desde CLI**

```bash
cd /home/edgadafi/enerpay
echo "TU_PROJECT_ID" | vercel env add NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID production
echo "TU_PROJECT_ID" | vercel env add NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID preview
echo "TU_PROJECT_ID" | vercel env add NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID development
```

**Opción C: Desde Dashboard**

1. Vercel Dashboard → **Settings** → **Environment Variables**
2. **Add New**:
   - Name: `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID`
   - Value: Tu Project ID
   - Environments: ✅ Production, ✅ Preview, ✅ Development
3. Guarda

### 4️⃣ Redesplegar

```bash
# Opción 1: Desde CLI
vercel --prod

# Opción 2: Desde Dashboard
# Deployments → ⋯ → Redeploy

# Opción 3: Nuevo commit
git commit --allow-empty -m "chore: trigger redeploy"
git push origin main
```

---

## ✅ Verificación

```bash
# Ver todas las variables configuradas
vercel env ls
```

Deberías ver 4 variables:
- ✅ `NEXT_PUBLIC_APP_NAME`
- ✅ `NEXT_PUBLIC_CELO_RPC_URL`
- ✅ `NEXT_PUBLIC_REMITTANCE_CONTRACT_ADDRESS`
- ✅ `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID`

---

## 📚 Documentación Completa

Para más detalles, ver:
- `VERCEL_SETUP_GUIDE.md` - Guía completa paso a paso
- `VERCEL_ROOT_DIRECTORY.md` - Detalles sobre Root Directory
- `ENV_VARIABLES.md` - Documentación de variables de entorno

---

**¿Problemas?** Revisa `VERCEL_SETUP_GUIDE.md` para solución de problemas detallada.

