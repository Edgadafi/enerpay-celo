# 🔧 Verificación en Celoscan usando Standard JSON Input

## ⚠️ Problema
Sourcify requiere que el contrato esté verificado en Etherscan/Celoscan primero.

## ✅ Solución: Usar Standard JSON Input en Celoscan

---

## 📋 Pasos Detallados

### Paso 1: Obtener el Standard JSON Input

El archivo ya está generado en:
```
contracts/standard-json-input.json
```

**Ruta desde Windows:**
```
\\wsl.localhost\debian\home\edgadafi\enerpay\contracts\standard-json-input.json
```

### Paso 2: Ir a Celoscan

1. Ve a: https://celoscan.io/address/0xB35aB84408E28D0B81205293Dd2ed1d6E8566f1e
2. Haz clic en la pestaña **"Contract"**
3. Haz clic en **"Verify and Publish"**

### Paso 3: Configurar la Verificación

1. **Compiler Type:** Selecciona `Solidity (Standard JSON Input)`

2. **Compiler Version:** `v0.8.20+commit.a1b79de6`

3. **License:** `MIT`

4. **Standard JSON Input:**
   - Haz clic en "Choose File"
   - Selecciona: `standard-json-input.json`
   - Ruta: `\\wsl.localhost\debian\home\edgadafi\enerpay\contracts\standard-json-input.json`

5. **Constructor Arguments:**
   ```
   000000000000000000000000765de816845861e75a25fca122bb6898b8b1282a000000000000000000000000856ff827a04ee1de5576e3d21e1985bd76fb24e7
   ```
   ⚠️ **IMPORTANTE:** Sin el prefijo `0x`

6. Haz clic en **"Verify and Publish"**

---

## 📋 Datos Exactos para el Formulario

| Campo | Valor |
|-------|-------|
| **Compiler Type** | `Solidity (Standard JSON Input)` |
| **Compiler Version** | `v0.8.20+commit.a1b79de6` |
| **License** | `MIT` |
| **Standard JSON Input** | `standard-json-input.json` (subir archivo) |
| **Constructor Arguments** | `000000000000000000000000765de816845861e75a25fca122bb6898b8b1282a000000000000000000000000856ff827a04ee1de5576e3d21e1985bd76fb24e7` |

---

## 🔍 Si Aparece Error de Bytecode Mismatch

Si Celoscan dice que el bytecode no coincide:

1. **Verifica que el archivo JSON es del mismo deployment:**
   - El archivo `standard-json-input.json` debe ser de la misma compilación que se usó para desplegar

2. **Recompila el contrato:**
   ```bash
   cd contracts
   npx hardhat clean
   npx hardhat compile
   ```

3. **Regenera el Standard JSON Input:**
   ```bash
   node scripts/generate-verification-data.js
   ```

4. **Intenta de nuevo con el nuevo archivo**

---

## 💡 Alternativa: Verificación Manual Multi-file

Si Standard JSON Input no funciona, usa Multi-file:

1. **Compiler Type:** `Solidity (Multi-file)`

2. **Sube estos 5 archivos:**
   - `EnerpayRemittance.sol` (raíz)
   - `@openzeppelin/contracts/token/ERC20/IERC20.sol`
   - `@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol`
   - `@openzeppelin/contracts/utils/ReentrancyGuard.sol`
   - `@openzeppelin/contracts/access/Ownable.sol`

3. **Configuración:**
   - Compiler: `0.8.20`
   - Optimizer: `Enabled` (200 runs)
   - License: `MIT`
   - Constructor Arguments: (mismo de arriba)

---

## 📁 Ubicación de Archivos

### Desde Windows Explorer:

1. Abre el Explorador de Archivos
2. En la barra de direcciones, pega:
   ```
   \\wsl.localhost\debian\home\edgadafi\enerpay\contracts
   ```
3. Busca `standard-json-input.json`

---

## ✅ Después de Verificar

Una vez verificado en Celoscan:

1. El contrato aparecerá como verificado en Celoscan
2. Podrás usar Sourcify (si aún lo necesitas)
3. El código fuente será visible públicamente

---

## 🆘 Si Nada Funciona

Si ninguna opción funciona:

1. Verifica que el contrato fue desplegado correctamente
2. Confirma que usaste la misma configuración de compilación
3. Considera contactar al soporte de Celoscan

---

**Última actualización:** Generado automáticamente

