#!/bin/bash

# Script para agregar la variable de entorno NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID a Vercel
# Uso: ./add-walletconnect-env.sh TU_PROJECT_ID

if [ -z "$1" ]; then
    echo "❌ Error: Debes proporcionar el WalletConnect Project ID"
    echo ""
    echo "Uso: ./add-walletconnect-env.sh TU_PROJECT_ID"
    echo ""
    echo "Ejemplo:"
    echo "  ./add-walletconnect-env.sh a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6"
    echo ""
    echo "¿No tienes un Project ID?"
    echo "1. Ve a https://cloud.walletconnect.com"
    echo "2. Crea un nuevo proyecto"
    echo "3. Copia el Project ID"
    exit 1
fi

PROJECT_ID="$1"

# Validar que el Project ID tenga el formato correcto (32 caracteres hexadecimales)
if [[ ! "$PROJECT_ID" =~ ^[a-fA-F0-9]{32}$ ]]; then
    echo "⚠️  Advertencia: El Project ID no parece tener el formato correcto"
    echo "   Se esperan 32 caracteres hexadecimales"
    echo "   ¿Continuar de todos modos? (s/n)"
    read -r response
    if [[ ! "$response" =~ ^[sS]$ ]]; then
        echo "❌ Cancelado"
        exit 1
    fi
fi

echo "🚀 Agregando NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID a Vercel..."
echo ""

# Agregar para Production
echo "📦 Agregando para Production..."
echo "$PROJECT_ID" | vercel env add NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID production
if [ $? -eq 0 ]; then
    echo "✅ Production: OK"
else
    echo "❌ Error al agregar para Production"
    exit 1
fi

# Agregar para Preview
echo ""
echo "📦 Agregando para Preview..."
echo "$PROJECT_ID" | vercel env add NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID preview
if [ $? -eq 0 ]; then
    echo "✅ Preview: OK"
else
    echo "❌ Error al agregar para Preview"
    exit 1
fi

# Agregar para Development
echo ""
echo "📦 Agregando para Development..."
echo "$PROJECT_ID" | vercel env add NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID development
if [ $? -eq 0 ]; then
    echo "✅ Development: OK"
else
    echo "❌ Error al agregar para Development"
    exit 1
fi

echo ""
echo "✅ ¡Variables de entorno agregadas exitosamente!"
echo ""
echo "📋 Próximos pasos:"
echo "1. Redespliega la aplicación desde Vercel Dashboard"
echo "2. O ejecuta: vercel --prod"
echo "3. Verifica que no haya errores de WalletConnect en la consola del navegador"
echo ""
echo "🔍 Verificar variables:"
echo "   vercel env ls"

