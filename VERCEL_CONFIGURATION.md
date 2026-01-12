# ⚙️ Configuración de Vercel para LatamFi

## Problema Actual

Vercel está intentando ejecutar comandos pero no encuentra el directorio `frontend`. Esto puede deberse a:

1. **Root Directory no configurado** en Vercel Dashboard
2. **Configuración conflictiva** entre vercel.json y Root Directory

## Solución: Dos Opciones

### Opción 1: Usar vercel.json (Actual)

El `vercel.json` en la raíz especifica:
- `buildCommand`: `cd frontend && npm install --legacy-peer-deps && npm run build`
- `outputDirectory`: `frontend/.next`
- `installCommand`: `cd frontend && npm install --legacy-peer-deps`

**Con esta configuración:**
- ✅ NO configures Root Directory en Vercel Dashboard (déjalo vacío o en raíz)
- ✅ Vercel ejecutará desde la raíz del repositorio
- ✅ Los comandos `cd frontend` funcionarán correctamente

### Opción 2: Usar Root Directory (Alternativa)

Si prefieres usar Root Directory en Vercel Dashboard:

1. **Elimina vercel.json** de la raíz
2. **Configura Root Directory** en Vercel Dashboard como `frontend`
3. Vercel ejecutará automáticamente desde `frontend/`

**Con esta configuración:**
- ✅ Root Directory debe estar configurado como `frontend` en Dashboard
- ✅ NO debe haber vercel.json en la raíz
- ✅ Vercel auto-detectará Next.js desde `frontend/`

## Recomendación Actual

**Usar Opción 1 (vercel.json)** porque:
- ✅ Más explícito y controlado
- ✅ Funciona independientemente de la configuración del Dashboard
- ✅ Fácil de verificar y depurar

## Verificación

Después de hacer push de vercel.json:

1. **Verifica que vercel.json esté en la raíz** del repositorio
2. **Asegúrate de que Root Directory esté vacío o en raíz** en Vercel Dashboard
3. **Redesplega** el proyecto
4. **Verifica los logs** - deberían mostrar:
   - `Running "install" command: cd frontend && npm install...`
   - `Running "build" command: cd frontend && npm run build`
   - Build exitoso

## Si el Problema Persiste

1. **Verifica la estructura del repositorio**:
   ```
   enerpay/
   ├── frontend/
   │   ├── package.json
   │   ├── next.config.mjs
   │   └── src/
   └── vercel.json  ← Debe estar aquí
   ```

2. **Verifica que frontend/package.json exista** y tenga `"next"` en dependencies

3. **Revisa los logs de Vercel** para ver exactamente dónde está ejecutando los comandos

