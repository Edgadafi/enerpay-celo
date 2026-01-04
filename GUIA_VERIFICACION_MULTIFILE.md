# ✅ Guía Completa: Verificación Multi-file en Celoscan

## 🎯 Método: Solidity (Multi-file)

Esta es la **única opción que funciona actualmente** dado que Celoscan migró a API V2.

---

## 📋 Pasos Detallados

### Paso 1: Ir a Celoscan

1. Abre tu navegador
2. Ve a: **https://celoscan.io/address/0xB35aB84408E28D0B81205293Dd2ed1d6E8566f1e**
3. Haz clic en la pestaña **"Contract"** (arriba)
4. Haz clic en el botón **"Verify and Publish"** (botón azul/verde)

---

### Paso 2: Seleccionar Método

**⚠️ IMPORTANTE:** Selecciona:
- **Compiler Type:** `Solidity (Multi-file)`
- **NO uses:** "Standard JSON Input" o "Solidity (Single file)"

---

### Paso 3: Configuración

Completa estos campos:

| Campo | Valor |
|-------|-------|
| **Compiler Version** | `0.8.20` (o `v0.8.20+commit.a1b79de6`) |
| **License** | `MIT` |
| **Optimization** | `Yes` |
| **Runs** | `200` |

---

### Paso 4: Subir Archivo Principal

1. Haz clic en **"Choose Files"** o **"Browse"**
2. Navega a: `\\wsl.localhost\debian\home\edgadafi\enerpay\contracts\contracts\`
3. Selecciona: **`EnerpayRemittance.sol`**
4. O arrastra el archivo desde VS Code directamente

**Archivo a subir:**
- Nombre: `EnerpayRemittance.sol`
- Ubicación: `contracts/contracts/EnerpayRemittance.sol`

---

### Paso 5: Constructor Arguments

En el campo **"Constructor Arguments"**, pega esto:

```
000000000000000000000000765de816845861e75a25fca122bb6898b8b1282a000000000000000000000000856ff827a04ee1de5576e3d21e1985bd76fb24e7
```

**⚠️ IMPORTANTE:**
- Sin el prefijo `0x`
- Sin espacios
- Sin saltos de línea
- Copia y pega exactamente como está arriba

---

### Paso 6: OpenZeppelin (Automático)

**Celoscan descargará automáticamente los contratos de OpenZeppelin desde GitHub.**

No necesitas subirlos manualmente a menos que Celoscan te lo pida específicamente.

Si Celoscan pide los archivos de OpenZeppelin, están en:
```
node_modules/@openzeppelin/contracts/
```

---

### Paso 7: Verificar

1. Revisa que todos los campos estén correctos
2. Haz clic en **"Verify and Publish"**
3. Espera a que procese (puede tardar 1-2 minutos)
4. Si hay errores, Celoscan te dirá qué falta

---

## ✅ Checklist Antes de Verificar

- [ ] **Compiler Type:** `Solidity (Multi-file)` ✅
- [ ] **Compiler Version:** `0.8.20` ✅
- [ ] **License:** `MIT` ✅
- [ ] **Optimization:** `Yes` (200 runs) ✅
- [ ] **Archivo subido:** `EnerpayRemittance.sol` ✅
- [ ] **Constructor Arguments:** Valor correcto pegado ✅

---

## 🆘 Si Hay Errores

### Error: "Missing files"
- Celoscan no pudo descargar OpenZeppelin
- **Solución:** Sube manualmente los archivos de OpenZeppelin

### Error: "Constructor arguments mismatch"
- Los parámetros no coinciden
- **Solución:** Verifica que pegaste el valor exacto (sin 0x, sin espacios)

### Error: "Compiler version mismatch"
- La versión no coincide
- **Solución:** Usa exactamente `0.8.20`

---

## 📁 Archivos de OpenZeppelin (Si es Necesario)

Si Celoscan pide los archivos de OpenZeppelin, sube estos:

1. `node_modules/@openzeppelin/contracts/token/ERC20/IERC20.sol`
2. `node_modules/@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol`
3. `node_modules/@openzeppelin/contracts/utils/ReentrancyGuard.sol`
4. `node_modules/@openzeppelin/contracts/access/Ownable.sol`

**Estructura en Celoscan:**
```
@openzeppelin/
  contracts/
    token/
      ERC20/
        IERC20.sol
        utils/
          SafeERC20.sol
    utils/
      ReentrancyGuard.sol
    access/
      Ownable.sol
```

---

## ✅ Después de Verificar

1. Espera 1-2 minutos
2. Recarga la página del contrato
3. Ve a la pestaña "Contract"
4. Deberías ver el código fuente verificado

---

## 💡 Nota Final

**La verificación NO es crítica.** El contrato funciona perfectamente sin ella. Es solo para transparencia y hacer el código público.

---

**¡Sigue estos pasos y debería funcionar!** 🚀

