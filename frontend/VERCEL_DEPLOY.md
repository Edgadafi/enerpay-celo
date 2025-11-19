# 🚀 Guía Rápida: Desplegar en Vercel desde CLI

## ⚠️ IMPORTANTE: Respuesta Correcta

Cuando Vercel CLI pregunte:
```
? In which directory is your code located?
```

**Responde SOLO:**
```
.
```

**NO escribas:**
- ❌ `./`
- ❌ `frontend`
- ❌ `./frontend`
- ❌ `# comentarios`
- ❌ Rutas absolutas
- ❌ Cualquier otra cosa

**Solo escribe un punto (`.`) y presiona Enter.**

## 📋 Pasos Completos

### 1. Navegar al directorio frontend

```bash
cd /home/edgadafi/enerpay/frontend
```

### 2. Ejecutar Vercel

```bash
vercel
```

### 3. Responder las preguntas:

1. **Set up and deploy?** → `yes`
2. **Which scope?** → Selecciona tu cuenta
3. **Link to existing project?** → `no` (primera vez) o `yes` (si ya existe)
4. **Project name?** → `enerpay-celo` (o el que prefieras)
5. **In which directory is your code located?** → **`.`** ⚠️ SOLO UN PUNTO
6. **Override settings?** → `No` (por defecto)

### 4. Para producción

```bash
vercel --prod
```

## 🔧 Alternativa: Usar el script

```bash
cd /home/edgadafi/enerpay/frontend
./deploy.sh
```

## ❌ Errores Comunes

### Error: "The provided path does not exist"

**Causa**: Escribiste algo diferente a `.` (punto)

**Solución**: 
- Cancela con `Ctrl+C`
- Vuelve a ejecutar `vercel`
- Cuando pregunte el directorio, escribe solo `.` y Enter

### Error: "Cannot find package.json"

**Causa**: No estás en el directorio `frontend/`

**Solución**:
```bash
cd /home/edgadafi/enerpay/frontend
vercel
```

## ✅ Verificación

Después del despliegue, Vercel te dará una URL como:
```
https://enerpay-celo.vercel.app
```

¡Listo! 🎉

