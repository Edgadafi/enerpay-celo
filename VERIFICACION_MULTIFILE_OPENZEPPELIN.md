# 📋 Verificación Multi-file con OpenZeppelin

## ⚠️ Problema: Celoscan requiere mínimo 2 archivos

Para Multi-file necesitas subir el archivo principal Y los archivos de OpenZeppelin.

---

## 📁 Archivos Necesarios

### Archivo Principal:
1. **EnerpayRemittance.sol**
   - Ubicación: `contracts/contracts/EnerpayRemittance.sol`
   - Ruta desde Windows: `\\wsl.localhost\debian\home\edgadafi\enerpay\contracts\contracts\EnerpayRemittance.sol`

### Archivos de OpenZeppelin (4 archivos):

2. **IERC20.sol**
   - Ubicación: `node_modules/@openzeppelin/contracts/token/ERC20/IERC20.sol`
   - Ruta desde Windows: `\\wsl.localhost\debian\home\edgadafi\enerpay\contracts\node_modules\@openzeppelin\contracts\token\ERC20\IERC20.sol`

3. **SafeERC20.sol**
   - Ubicación: `node_modules/@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol`
   - Ruta desde Windows: `\\wsl.localhost\debian\home\edgadafi\enerpay\contracts\node_modules\@openzeppelin\contracts\token\ERC20\utils\SafeERC20.sol`

4. **ReentrancyGuard.sol**
   - Ubicación: `node_modules/@openzeppelin/contracts/utils/ReentrancyGuard.sol`
   - Ruta desde Windows: `\\wsl.localhost\debian\home\edgadafi\enerpay\contracts\node_modules\@openzeppelin\contracts\utils\ReentrancyGuard.sol`

5. **Ownable.sol**
   - Ubicación: `node_modules/@openzeppelin/contracts/access/Ownable.sol`
   - Ruta desde Windows: `\\wsl.localhost\debian\home\edgadafi\enerpay\contracts\node_modules\@openzeppelin\contracts\access\Ownable.sol`

---

## 📋 Pasos en Celoscan

### Paso 1: Seleccionar Multi-file

1. Ve a: https://celoscan.io/address/0xB35aB84408E28D0B81205293Dd2ed1d6E8566f1e
2. Contract → Verify and Publish
3. **Compiler Type:** `Solidity (Multi-file)`

### Paso 2: Crear Estructura de Carpetas

En Celoscan, necesitas crear la estructura de carpetas:

```
EnerpayRemittance.sol (en la raíz)
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

### Paso 3: Subir Archivos

1. **Sube EnerpayRemittance.sol** (archivo principal)

2. **Crea la carpeta `@openzeppelin/contracts/token/ERC20/`**
   - Sube `IERC20.sol`

3. **Crea la carpeta `@openzeppelin/contracts/token/ERC20/utils/`**
   - Sube `SafeERC20.sol`

4. **Crea la carpeta `@openzeppelin/contracts/utils/`**
   - Sube `ReentrancyGuard.sol`

5. **Crea la carpeta `@openzeppelin/contracts/access/`**
   - Sube `Ownable.sol`

### Paso 4: Configuración

- **Compiler Version:** `0.8.20`
- **License:** `MIT`
- **Optimization:** `Yes` (200 runs)
- **Constructor Arguments:** 
  ```
  000000000000000000000000765de816845861e75a25fca122bb6898b8b1282a000000000000000000000000856ff827a04ee1de5576e3d21e1985bd76fb24e7
  ```

---

## 💡 Alternativa Más Simple: Usar Single File

Si Celoscan te permite usar "Solidity (Single file)":

1. **Compiler Type:** `Solidity (Single file)`
2. **Sube solo:** `EnerpayRemittance.sol`
3. Celoscan debería resolver los imports automáticamente desde GitHub

**Nota:** Algunas versiones de Celoscan permiten esto y resuelven los imports automáticamente.

---

## 🔍 Verificar si Single File Funciona

Intenta primero con "Single file":
- Si Celoscan acepta el archivo y resuelve los imports → ✅ Listo
- Si Celoscan da error sobre imports faltantes → Usa Multi-file con todos los archivos

---

## 📋 Resumen de Opciones

| Opción | Archivos | Dificultad |
|--------|----------|------------|
| **Single file** | 1 (EnerpayRemittance.sol) | ⭐ Fácil |
| **Multi-file** | 5 archivos (1 principal + 4 OpenZeppelin) | ⭐⭐ Media |

---

**Recomendación: Prueba primero con Single file. Si no funciona, usa Multi-file con todos los archivos.** 🚀

