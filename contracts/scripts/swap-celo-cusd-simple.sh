#!/bin/bash

# Script simple para hacer swap CELO → cUSD
# Uso: ./swap-celo-cusd-simple.sh [cantidad_en_CELO]

set -e

# Cargar variables de entorno
if [ -f .env ]; then
    export $(cat .env | grep -v '^#' | xargs)
fi

# Configuración
NODE_URL="https://forno.celo-sepolia.celo-testnet.org/"
WALLET_ADDRESS="0xfCb8226A19ee56EBC79127CC4662a8F1a85D2d77"
STABLE_TOKEN="cUSD"

# Cantidad a intercambiar (default: 0.1 CELO)
AMOUNT_CELO=${1:-0.1}

# Convertir CELO a Wei (usando node para cálculo preciso)
AMOUNT_WEI=$(node -e "console.log(Math.floor($AMOUNT_CELO * 1e18).toString())")

echo "💱 CELO to cUSD Swap"
echo "==================="
echo ""
echo "📡 Network: Celo Sepolia"
echo "👤 Wallet: $WALLET_ADDRESS"
echo "💰 Amount: $AMOUNT_CELO CELO"
echo "💵 Token: $STABLE_TOKEN"
echo ""

# Verificar que PRIVATE_KEY esté configurado
if [ -z "$PRIVATE_KEY" ] && [ -z "$CELO_PRIVATE_KEY" ]; then
    echo "❌ PRIVATE_KEY no está configurado."
    echo ""
    echo "💡 Configura tu private key:"
    echo "   export CELO_PRIVATE_KEY=\$(grep PRIVATE_KEY .env | cut -d '=' -f2)"
    echo "   O desde el archivo .env:"
    echo "   export \$(cat .env | grep PRIVATE_KEY | xargs)"
    exit 1
fi

# Usar PRIVATE_KEY si CELO_PRIVATE_KEY no está configurado
if [ -z "$CELO_PRIVATE_KEY" ] && [ -n "$PRIVATE_KEY" ]; then
    export CELO_PRIVATE_KEY="$PRIVATE_KEY"
fi

# Verificar balance antes
echo "📊 Verificando balance antes del swap..."
npx @celo/celocli account:balance "$WALLET_ADDRESS" --node "$NODE_URL" || {
    echo "❌ Error al verificar balance."
    exit 1
}

echo ""
echo "🔄 Ejecutando swap de $AMOUNT_CELO CELO → cUSD..."
echo ""

# Ejecutar el swap
npx @celo/celocli exchange:celo \
    --value "$AMOUNT_WEI" \
    --from "$WALLET_ADDRESS" \
    --stableToken "$STABLE_TOKEN" \
    --node "$NODE_URL"

echo ""
echo "✅ Swap completado!"
echo ""
echo "📊 Verificando balance después del swap..."
npx @celo/celocli account:balance "$WALLET_ADDRESS" --node "$NODE_URL"

