# 📋 Crear Gist para Celoscan - Instrucciones

## 🎯 Pasos para Crear el Gist y Obtener el Gist ID

### Paso 1: Ir a GitHub Gist

1. **Abre tu navegador**
2. **Ve a:** https://gist.github.com/new
3. O si no estás logueado, ve a: https://gist.github.com/ (y haz login primero)

---

### Paso 2: Configurar el Gist

1. **Filename:** `EnerpayRemittance.sol`
   - Escribe esto en el campo "Filename including extension"

2. **Description (opcional):** 
   ```
   EnerpayRemittance contract for Celo Mainnet verification
   Contract Address: 0xB35aB84408E28D0B81205293Dd2ed1d6E8566f1e
   ```

3. **Visibility:** 
   - ⚠️ **DEBE ser "Public"** (Celoscan necesita acceso público)
   - NO uses "Secret" o "Private"

---

### Paso 3: Copiar el Código

**Opción A: Desde VS Code**
1. Abre: `contracts/contracts/EnerpayRemittance.sol`
2. Selecciona todo (Ctrl+A o Cmd+A)
3. Copia (Ctrl+C o Cmd+C)
4. Pega en el Gist (Ctrl+V o Cmd+V)

**Opción B: Desde Terminal**
```bash
cd /home/edgadafi/enerpay/contracts
cat contracts/EnerpayRemittance.sol
# Copia todo el output y pégalo en el Gist
```

**Opción C: Desde el Explorador de Archivos**
- Navega a: `\\wsl.localhost\debian\home\edgadafi\enerpay\contracts\contracts\`
- Abre `EnerpayRemittance.sol` con un editor de texto
- Copia todo y pégalo en el Gist

---

### Paso 4: Crear el Gist

1. **Revisa que todo esté correcto:**
   - ✅ Filename: `EnerpayRemittance.sol`
   - ✅ Visibility: `Public`
   - ✅ Código completo pegado

2. **Haz clic en:** "Create public gist" (botón verde)

---

### Paso 5: Obtener el Gist ID

Después de crear el Gist, GitHub te redirigirá a una URL como:

```
https://gist.github.com/tu-usuario/abc123def456789...
```

**El Gist ID es la parte después de tu usuario:**

**Ejemplo:**
- URL completa: `https://gist.github.com/Edgadafi/abc123def4567890123456789abcdef`
- **Gist ID:** `abc123def4567890123456789abcdef`

**O simplemente copia la URL completa** - Celoscan acepta ambas.

---

### Paso 6: Usar en Celoscan

1. **Ve a Celoscan:**
   - https://celoscan.io/address/0xB35aB84408E28D0B81205293Dd2ed1d6E8566f1e
   - Contract → Verify and Publish

2. **En el formulario:**
   - **Compiler Type:** `Solidity (Multi-file)` o `Solidity (Single file)`
   - **Source Code:** Busca la opción "Fetch from GitHub Gist" o "Gist URL"
   - **Gist URL:** Pega la URL completa o solo el Gist ID

3. **Completa el resto:**
   - Compiler Version: `0.8.20`
   - License: `MIT`
   - Optimization: `Yes` (200 runs)
   - Constructor Arguments: (el valor que te di antes)

---

## ⚠️ Nota Importante sobre Imports

El contrato usa imports de OpenZeppelin:
```solidity
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
```

**Celoscan debería resolver estos automáticamente desde GitHub**, pero si no funciona:

- Usa **"Multi-file"** en lugar de "Single file"
- O sube los archivos de OpenZeppelin manualmente

---

## 📋 Resumen Rápido

1. Ve a: https://gist.github.com/new
2. Filename: `EnerpayRemittance.sol`
3. Visibility: **Public** ⚠️
4. Pega el código de `contracts/contracts/EnerpayRemittance.sol`
5. Crea el Gist
6. Copia la URL o Gist ID
7. Úsalo en Celoscan

---

**¡Una vez que tengas el Gist ID, compártelo y te ayudo a usarlo en Celoscan!** 🚀

