# 📝 Cómo Editar .env.mainnet

## 🔒 Seguridad Primero

**⚠️ IMPORTANTE:**
- NUNCA commitees este archivo al repositorio
- NUNCA compartas tu private key
- Usa una wallet DEDICADA para despliegue (no tu wallet principal)

---

## 📋 Valores Necesarios para Mainnet

### 1. Abrir el archivo

```bash
cd contracts
nano .env.mainnet
# O usa tu editor preferido: vim, code, etc.
```

### 2. Editar las Variables

Copia y pega este template, reemplazando los valores:

```env
# Network (debe ser "celo" para mainnet)
NETWORK=celo

# Private Key de tu wallet de despliegue
# ⚠️  SECURITY: Usa una wallet dedicada, NUNCA tu wallet principal
# Formato: 0x seguido de 64 caracteres hexadecimales
PRIVATE_KEY=0xTU_PRIVATE_KEY_AQUI

# Treasury Address (dirección que recibirá los fees de la plataforma)
# Puede ser la misma que tu wallet de despliegue o una dirección diferente
# Si usas multi-sig, pon la dirección del contrato multi-sig
TREASURY_ADDRESS=0xTU_TREASURY_ADDRESS_AQUI

# cUSD Address (Celo Mainnet) - NO CAMBIAR
# Esta es la dirección oficial de cUSD en mainnet
CUSD_ADDRESS=0x765DE816845861e75A25fCA122bb6898B8B1282a

# Celoscan API Key (opcional, para verificación de contratos)
# Puedes obtenerla en: https://celoscan.io/apis
# Si no la tienes, déjala vacía o comenta la línea
CELOSCAN_API_KEY=tu_api_key_aqui
```

---

## 🔍 Ejemplo Completo

Aquí tienes un ejemplo con valores de muestra (NO uses estos valores reales):

```env
# Network
NETWORK=celo

# Private Key (ejemplo - NO usar)
PRIVATE_KEY=0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef

# Treasury Address (ejemplo - NO usar)
TREASURY_ADDRESS=0xfCb8226A19ee56EBC79127CC4662a8F1a85D2d77

# cUSD Address (mainnet - NO cambiar)
CUSD_ADDRESS=0x765DE816845861e75A25fCA122bb6898B8B1282a

# Celoscan API Key (opcional)
CELOSCAN_API_KEY=
```

---

## ✅ Verificación

Después de editar, verifica que:

1. **PRIVATE_KEY**:
   - Empieza con `0x`
   - Tiene 66 caracteres en total (0x + 64 hex)
   - Es de una wallet DEDICADA (no tu wallet principal)

2. **TREASURY_ADDRESS**:
   - Empieza con `0x`
   - Tiene 42 caracteres en total
   - Es una dirección válida de Ethereum/Celo

3. **CUSD_ADDRESS**:
   - NO cambiar - debe ser: `0x765DE816845861e75A25fCA122bb6898B8B1282a`

4. **NETWORK**:
   - Debe ser exactamente: `celo`

---

## 🧪 Probar la Configuración

Después de editar, prueba que funciona:

```bash
cd contracts

# Cargar variables de .env.mainnet
export $(cat .env.mainnet | grep -v '^#' | xargs)

# Verificar que se cargaron
echo "Network: $NETWORK"
echo "Treasury: $TREASURY_ADDRESS"

# Ejecutar pre-deployment check
npx hardhat run scripts/pre-deploy-check.js --network celo
```

---

## ⚠️ Errores Comunes

### Error: "PRIVATE_KEY format appears invalid"
- Verifica que empiece con `0x`
- Verifica que tenga 66 caracteres
- No debe tener espacios

### Error: "Invalid treasury address"
- Verifica que empiece con `0x`
- Verifica que tenga 42 caracteres
- No debe tener espacios

### Error: "Network is not Celo Mainnet"
- Verifica que `NETWORK=celo` (exactamente, en minúsculas)

---

## 🔒 Seguridad Adicional

1. **Permisos del archivo**:
   ```bash
   chmod 600 .env.mainnet  # Solo tú puedes leerlo
   ```

2. **Backup seguro**:
   - Guarda tu private key en un password manager
   - NUNCA en texto plano en tu computadora
   - Considera usar un hardware wallet

3. **Verificar .gitignore**:
   ```bash
   # Verificar que .env.mainnet está en .gitignore
   grep "\.env\.mainnet" .gitignore
   ```

---

## 📞 ¿Necesitas Ayuda?

Si tienes problemas:
1. Verifica que todos los valores estén correctos
2. Ejecuta el pre-deployment check
3. Revisa los errores específicos

---

**¡Listo! Una vez editado, puedes proceder con el despliegue.** 🚀

