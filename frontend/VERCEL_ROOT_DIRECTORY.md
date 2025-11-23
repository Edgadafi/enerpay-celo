# ⚙️ Configuración del Root Directory en Vercel

## ⚠️ Importante: Configurar Root Directory

Para que los despliegues automáticos funcionen correctamente, necesitas configurar el **Root Directory** en Vercel Dashboard.

### Pasos para Configurar

1. Ve a [vercel.com/dashboard](https://vercel.com/dashboard)
2. Selecciona el proyecto **enerpay**
3. Ve a **Settings** → **General**
4. En la sección **Root Directory**, haz clic en **Edit**
5. Ingresa: `frontend`
6. Haz clic en **Save**

### ¿Por qué es necesario?

El proyecto tiene una estructura de monorepo:
```
enerpay/
├── frontend/          ← Aquí está el proyecto Next.js
│   ├── package.json
│   ├── next.config.mjs
│   └── ...
├── contracts/         ← Smart contracts
└── vercel.json        ← Configuración de Vercel
```

Vercel necesita saber que el directorio raíz del proyecto Next.js es `frontend`, no la raíz del repositorio.

### Verificar Configuración

Después de configurar el Root Directory:

1. Ve a **Deployments**
2. Deberías ver un nuevo deployment iniciándose automáticamente (por el push que acabas de hacer)
3. El build debería completarse exitosamente

### Si el Build Falla

Si ves el error: `No Next.js version detected`:

1. Verifica que el Root Directory esté configurado como `frontend`
2. Verifica que `frontend/package.json` contenga `"next"` en `dependencies` o `devDependencies`
3. Revisa los logs del build en Vercel Dashboard para más detalles

---

**Nota**: Una vez configurado el Root Directory, todos los despliegues futuros (automáticos y manuales) usarán esta configuración.

