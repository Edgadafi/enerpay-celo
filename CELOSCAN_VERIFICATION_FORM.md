# 📝 Formulario de Verificación en Celoscan - Respuestas Exactas

## ⚠️ IMPORTANTE: Los contratos usan imports de OpenZeppelin

**Debes usar "Standard JSON Input" para verificar contratos con imports.**

---

## 📋 Respuestas para el Formulario de Celoscan

### 1. Compiler Type
**Respuesta:** `Standard JSON Input` ⚠️ (NO uses "Solidity (Single file)")

**Razón:** Los contratos importan librerías de OpenZeppelin, por lo que necesitas el archivo JSON completo de compilación.

---

### 2. Compiler Version
**Respuesta:** `0.8.20`

**Cómo verificar:**
- Revisa `hardhat.config.js`: `version: "0.8.20"`
- O el archivo JSON de compilación en `artifacts/build-info/*.json`

---

### 3. License
**Respuesta:** `MIT`

**Razón:** Los contratos tienen `// SPDX-License-Identifier: MIT` al inicio.

---

### 4. Optimization
**Respuesta:** `Yes`

**Runs:** `200`

**Razón:** En `hardhat.config.js` está configurado:
```javascript
optimizer: {
  enabled: true,
  runs: 200,
}
```

---

### 5. Standard JSON Input
**Respuesta:** Sube el archivo JSON de compilación

**Ubicación del archivo:**
```
contracts/artifacts/build-info/[hash].json
```

**Cómo encontrar el archivo correcto:**
```bash
cd contracts
ls -lt artifacts/build-info/*.json | head -1
```

El archivo más reciente es el que necesitas. Contiene toda la información de compilación incluyendo los imports de OpenZeppelin.

---

### 6. Constructor Arguments
**Respuesta:** ABI-encoded parameters

#### Para EnerpayRemittance:
```
0x000000000000000000000000765de816845861e75a25fca122bb6898b8b1282a000000000000000000000000856ff827a04ee1de5576e3d21e1985bd76fb24e7
```

**Parámetros:**
1. `cUSD address`: `0x765DE816845861e75A25fCA122bb6898B8B1282a`
2. `Treasury address`: `0x856Ff827A04Ee1dE5576e3d21e1985BD76fB24E7`

#### Para MicrofinancePool:
```
0x000000000000000000000000765de816845861e75a25fca122bb6898b8b1282a000000000000000000000000856ff827a04ee1de5576e3d21e1985bd76fb24e7
```

**Parámetros:**
1. `cUSD address`: `0x765DE816845861e75A25fCA122bb6898B8B1282a`
2. `Treasury address`: `0x856Ff827A04Ee1dE5576e3d21e1985BD76fB24E7`

---

## 📝 Resumen Rápido

| Campo | Valor |
|-------|-------|
| **Compiler Type** | `Standard JSON Input` ⚠️ |
| **Compiler Version** | `0.8.20` |
| **License** | `MIT` |
| **Optimization** | `Yes` (200 runs) |
| **Standard JSON Input** | Archivo de `artifacts/build-info/*.json` |
| **Constructor Arguments** | Ver arriba según el contrato |

---

## 🔍 Verificación de Archivos

Para encontrar el archivo JSON correcto:

```bash
cd contracts

# Ver archivos de compilación
ls -lt artifacts/build-info/*.json

# El más reciente es el que necesitas
```

---

## ✅ Pasos Completos

1. **Ve a Celoscan:**
   - EnerpayRemittance: https://celoscan.io/address/0xB35aB84408E28D0B81205293Dd2ed1d6E8566f1e
   - MicrofinancePool: https://celoscan.io/address/0xc19C1A8bb735288e753fD737aF88bf559063D617

2. **Haz clic en "Contract" tab**

3. **Haz clic en "Verify and Publish"**

4. **Completa el formulario con los valores de arriba**

5. **Sube el archivo JSON** de `artifacts/build-info/`

6. **Pega los Constructor Arguments** (ver arriba)

7. **Haz clic en "Verify and Publish"**

---

**¡Listo! El contrato quedará verificado en Celoscan.** ✅

