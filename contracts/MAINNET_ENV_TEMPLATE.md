# 🔐 Template de Variables de Entorno para Mainnet

> **⚠️ IMPORTANTE: Nunca commitees este archivo con valores reales!**

Crea un archivo `.env.mainnet` en `contracts/` con las siguientes variables:

```env
# Network (should be "celo" for mainnet)
NETWORK=celo

# Private Key of deployment wallet
# ⚠️  SECURITY: Use a dedicated wallet, never use your main wallet
PRIVATE_KEY=your_private_key_here

# Treasury Address (where platform fees will be sent)
TREASURY_ADDRESS=0x0000000000000000000000000000000000000000

# cUSD Address (Celo Mainnet)
CUSD_ADDRESS=0x765DE816845861e75A25fCA122bb6898B8B1282a

# Celoscan API Key (for contract verification)
CELOSCAN_API_KEY=your_celoscan_api_key_here
```

## 🔒 Notas de Seguridad

1. **Private Keys**: Almacena de forma segura (password manager, hardware wallet)
2. **Wallet Dedicada**: Usa una wallet separada para despliegue
3. **Multi-sig**: Considera usar multi-sig para treasury address
4. **Backups**: Mantén backups de private keys en ubicaciones seguras
5. **Git**: NUNCA commitees archivos .env al repositorio


