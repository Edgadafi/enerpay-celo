#!/bin/bash

# Script para hacer swap CELO → cUSD usando celocli
# Uso: ./swap-with-celocli.sh [cantidad_en_CELO]

set -e

# Cargar variables de entorno
if [ -f .env ]; then
    export $(cat .env | grep -v '^#' | xargs)
fi

# Configuración
NODE_URL="https://forno.celo-sepolia.celo-testnet.org/"
WALLET_ADDRESS="${DEPLOYER_ADDRESS:-0xfCb8226A19ee56EBC79127CC4662a8F1a85D2d77}"
STABLE_TOKEN="cUSD"

# Cantidad a intercambiar (default: 0.1 CELO)
AMOUNT_CELO=${1:-0.1}

# Convertir CELO a Wei
AMOUNT_WEI=$(echo "$AMOUNT_CELO * 1000000000000000000" | bc | cut -d. -f1)

echo "💱 CELO to cUSD Swap Script"
echo "=========================="
echo ""
echo "📡 Network: Celo Sepolia"
echo "👤 Wallet: $WALLET_ADDRESS"
echo "💰 Amount: $AMOUNT_CELO CELO ($AMOUNT_WEI Wei)"
echo "💵 Token: $STABLE_TOKEN"
echo ""

# Verificar que celocli está instalado
if ! command -v celocli &> /dev/null; then
    echo "❌ celocli no está instalado."
    echo ""
    echo "💡 Instala celocli con uno de estos métodos:"
    echo "   npm install -g @celo/celocli"
    echo "   yarn global add @celo/celocli"
    echo "   O usa: npx @celo/celocli"
    exit 1
fi

# Configurar el nodo
echo "⚙️  Configurando nodo..."
celocli config:set --node "$NODE_URL" > /dev/null 2>&1 || true

# Verificar balance antes
echo "📊 Verificando balance antes del swap..."
celocli account:balance --address "$WALLET_ADDRESS" || {
    echo "❌ Error al verificar balance. Verifica tu configuración."
    exit 1
}

echo ""
echo "🔄 Ejecutando swap..."
echo ""

# Ejecutar el swap
celocli exchange:celo \
    --value "$AMOUNT_WEI" \
    --from "$WALLET_ADDRESS" \
    --stableToken "$STABLE_TOKEN" \
    --node "$NODE_URL"

echo ""
echo "✅ Swap completado!"
echo ""
echo "📊 Verificando balance después del swap..."
celocli account:balance --address "$WALLET_ADDRESS"

