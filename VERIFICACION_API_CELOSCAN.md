# 🔧 Verificación Programática usando Celoscan API

## 🎯 Método: API de Celoscan

Usaremos la API de Celoscan directamente para verificar el contrato.

---

## 📋 Opción 1: Script Personalizado (Recomendado)

He creado un script que usa la API de Celoscan directamente:

### Ejecutar el Script:

```bash
cd contracts
npx hardhat run scripts/verify-celoscan-api.js --network celo
```

Este script:
- ✅ Lee el archivo JSON de compilación
- ✅ Prepara los datos correctamente
- ✅ Envía la solicitud a la API de Celoscan
- ✅ Maneja la respuesta

---

## 📋 Opción 2: Usar Hardhat Verify (Actualizado)

Si Hardhat se actualiza para soportar API V2, puedes usar:

```bash
cd contracts
npx hardhat verify --network celo \
  0xB35aB84408E28D0B81205293Dd2ed1d6E8566f1e \
  0x765DE816845861e75A25fCA122bb6898B8B1282a \
  0x856Ff827A04Ee1dE5576e3d21e1985BD76fB24E7
```

---

## 📋 Opción 3: API Directa con cURL

Si prefieres usar cURL directamente:

```bash
cd contracts

# Obtener el archivo JSON más reciente
LATEST_JSON=$(ls -t artifacts/build-info/*.json | head -1)

# Preparar los datos
API_KEY="PW8GY73YCAPSY8UKS2S6EKYYRV9SGH7SFP"
CONTRACT_ADDRESS="0xB35aB84408E28D0B81205293Dd2ed1d6E8566f1e"
SOURCE_CODE=$(cat $LATEST_JSON | jq -c .input)

# Enviar a la API (requiere jq instalado)
curl -X POST "https://api.celoscan.io/api" \
  -H "Content-Type: application/json" \
  -d "{
    \"apikey\": \"$API_KEY\",
    \"module\": \"contract\",
    \"action\": \"verifysourcecode\",
    \"contractaddress\": \"$CONTRACT_ADDRESS\",
    \"codeformat\": \"solidity-standard-json-input\",
    \"contractname\": \"contracts/EnerpayRemittance.sol:EnerpayRemittance\",
    \"compilerversion\": \"v0.8.20+commit.a1b79de6\",
    \"optimizationused\": 1,
    \"runs\": 200,
    \"constructorArguements\": \"000000000000000000000000765de816845861e75a25fca122bb6898b8b1282a000000000000000000000000856ff827a04ee1de5576e3d21e1985bd76fb24e7\",
    \"sourceCode\": $SOURCE_CODE
  }"
```

---

## 🔍 Verificar Estado de la Verificación

Después de enviar la solicitud, puedes verificar el estado:

1. **En Celoscan:**
   - Ve a: https://celoscan.io/address/0xB35aB84408E28D0B81205293Dd2ed1d6E8566f1e
   - Revisa si el código fuente está verificado

2. **Usando la API:**
   ```bash
   curl "https://api.celoscan.io/api?module=contract&action=getsourcecode&address=0xB35aB84408E28D0B81205293Dd2ed1d6E8566f1e&apikey=TU_API_KEY"
   ```

---

## 📋 Parámetros de la API

- **apikey:** Tu API key de Celoscan
- **module:** `contract`
- **action:** `verifysourcecode`
- **contractaddress:** `0xB35aB84408E28D0B81205293Dd2ed1d6E8566f1e`
- **codeformat:** `solidity-standard-json-input`
- **contractname:** `contracts/EnerpayRemittance.sol:EnerpayRemittance`
- **compilerversion:** `v0.8.20+commit.a1b79de6`
- **optimizationused:** `1` (Yes)
- **runs:** `200`
- **constructorArguements:** (sin 0x)
- **sourceCode:** JSON completo del Standard JSON Input

---

## ✅ Ventajas de la API

- ✅ Control total sobre los parámetros
- ✅ No depende de plugins de Hardhat
- ✅ Puede funcionar aunque Hardhat tenga problemas con API V2
- ✅ Respuesta inmediata con GUID de verificación

---

## 🆘 Si Hay Errores

1. **Verifica la API Key:**
   - Asegúrate de que sea válida
   - Verifica en: https://celoscan.io/apis

2. **Verifica el formato del JSON:**
   - Debe ser un JSON válido
   - Debe incluir toda la información de compilación

3. **Revisa los parámetros:**
   - Constructor arguments deben ser correctos
   - Compiler version debe coincidir

---

**¡Ejecuta el script y verifica el resultado!** 🚀

