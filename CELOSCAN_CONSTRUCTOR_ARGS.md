# 🔧 Constructor Arguments para Celoscan

## ⚠️ Error Común: Parámetros del Constructor

Si Celoscan muestra "Unable to Verify Contract Source Code", es muy probable que los **Constructor Arguments** estén incorrectos.

---

## ✅ Parámetros Correctos

### Para EnerpayRemittance:

**Parámetro 1 (cUSD address):**
```
0x765DE816845861e75A25fCA122bb6898B8B1282a
```

**Parámetro 2 (Treasury address):**
```
0x856Ff827A04Ee1dE5576e3d21e1985BD76fB24E7
```

---

## 📋 Constructor Arguments (ABI Encoded)

**IMPORTANTE:** En Celoscan, cuando pide "Constructor Arguments", pega SOLO los caracteres hexadecimales **SIN el prefijo `0x`**:

```
000000000000000000000000765de816845861e75a25fca122bb6898b8b1282a000000000000000000000000856ff827a04ee1de5576e3d21e1985bd76fb24e7
```

**O con el prefijo 0x (depende de cómo Celoscan lo pida):**
```
0x000000000000000000000000765de816845861e75a25fca122bb6898b8b1282a000000000000000000000000856ff827a04ee1de5576e3d21e1985bd76fb24e7
```

---

## 🔍 Cómo Verificar los Parámetros

Puedes verificar los parámetros exactos del contrato desplegado:

1. Ve a: https://celoscan.io/address/0xB35aB84408E28D0B81205293Dd2ed1d6E8566f1e
2. Revisa la sección "Contract" → "Read Contract"
3. Verifica los valores de `cUSD` y `treasuryAddress`

---

## 📝 Pasos Completos para Verificación

1. **Compiler Type:** `Standard JSON Input`
2. **Compiler Version:** `v0.8.20+commit.a1b79de6`
3. **License:** `MIT`
4. **Optimization:** `Yes` (200 runs)
5. **Standard JSON Input:** Sube `dfd1dbca2d35391bf80368e6065e8b69.json`
6. **Constructor Arguments:** Pega el valor de arriba (sin 0x)

---

## ⚠️ Errores Comunes

### Error 1: Constructor Arguments con 0x cuando no lo pide
- **Solución:** Quita el `0x` al inicio

### Error 2: Direcciones en minúsculas vs mayúsculas
- **Solución:** Usa las direcciones exactas como están arriba (con mayúsculas/minúsculas mixtas)

### Error 3: Espacios o caracteres extra
- **Solución:** Asegúrate de que no haya espacios ni saltos de línea

---

## 🔄 Si Sigue Fallando

1. **Verifica el archivo JSON:**
   - Asegúrate de que sea el más reciente
   - Recompila si es necesario: `npx hardhat clean && npx hardhat compile`

2. **Verifica la versión del compilador:**
   - Debe ser exactamente: `v0.8.20+commit.a1b79de6`

3. **Intenta sin optimización primero:**
   - Si falla, prueba con `Optimization: No` temporalmente

4. **Contacta a Celoscan:**
   - Puede haber un problema temporal con su sistema

---

**¡Prueba con estos parámetros exactos!** ✅

