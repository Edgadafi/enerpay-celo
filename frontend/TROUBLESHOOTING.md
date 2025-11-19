# 🔧 Troubleshooting - Errores Comunes

## ⚠️ Errores Esperados (Sin Project ID de WalletConnect)

Si ves estos errores en la consola, **son normales** cuando no tienes configurado un Project ID válido de WalletConnect:

### 1. Error 403 de WalletConnect/Reown

```
[Reown Config] Failed to fetch remote project configuration. Using local/default values.
Error: HTTP status code: 403
```

**Causa**: El projectId placeholder `00000000000000000000000000000000` no es válido.

**Solución**: 
1. Ve a [WalletConnect Cloud](https://cloud.walletconnect.com)
2. Crea un proyecto
3. Copia el Project ID
4. Agrégalo a `.env.local`:
   ```env
   NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=tu_project_id_aqui
   ```
5. Reinicia el servidor de desarrollo

### 2. Error de Allowlist

```
Origin http://localhost:3000 not found on Allowlist
```

**Causa**: Tu dominio no está en la lista blanca del proyecto de WalletConnect.

**Solución**:
1. Ve a [WalletConnect Cloud](https://cloud.walletconnect.com)
2. Selecciona tu proyecto
3. Ve a "Settings" → "Allowed Domains"
4. Agrega `http://localhost:3000` para desarrollo
5. Agrega tu dominio de producción cuando despliegues

### 3. Errores de Coinbase Analytics

```
cca-lite.coinbase.com/amp:1 Failed to load resource: net::ERR_BLOCKED_BY_CLIENT
```

**Causa**: Tu bloqueador de anuncios está bloqueando las requests de Coinbase.

**Solución**: 
- **No es necesario hacer nada**. Estos errores no afectan la funcionalidad.
- Si quieres eliminarlos, desactiva temporalmente tu bloqueador de anuncios o agrega una excepción para `cca-lite.coinbase.com`

### 4. Error 404 de manifest.json

```
manifest.json:1 Failed to load resource: the server responded with a status of 404
```

**Causa**: El archivo `manifest.json` no existe.

**Solución**: 
- ✅ **Ya está resuelto**. El archivo `public/manifest.json` ha sido creado.
- Si aún ves el error, reinicia el servidor de desarrollo.

## ✅ Verificación Post-Configuración

Después de configurar tu Project ID, deberías ver:

1. ✅ No más errores 403 de WalletConnect
2. ✅ El botón "Connect Wallet" funciona correctamente
3. ✅ Puedes conectar tu wallet sin problemas
4. ✅ No hay errores de allowlist (si agregaste localhost)

## 🚀 Configuración Rápida

```bash
# 1. Obtén tu Project ID en https://cloud.walletconnect.com

# 2. Crea/edita .env.local
echo "NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=tu_project_id_aqui" > frontend/.env.local

# 3. Reinicia el servidor
npm run dev
```

## 📝 Notas Importantes

- **Desarrollo local**: Puedes trabajar sin Project ID, pero verás warnings en consola
- **Producción**: **DEBES** tener un Project ID válido configurado
- **Allowlist**: Asegúrate de agregar todos los dominios donde desplegarás la app

## 🆘 ¿Aún tienes problemas?

1. Verifica que `.env.local` existe y tiene el formato correcto
2. Reinicia el servidor de desarrollo completamente
3. Limpia la caché del navegador
4. Verifica que el Project ID tiene exactamente 32 caracteres hexadecimales

