#!/bin/bash
# Script de despliegue a Vercel
# Ejecutar desde el directorio frontend/

echo "🚀 Desplegando Enerpay a Vercel..."
echo "📁 Directorio actual: $(pwd)"
echo ""

# Verificar que estamos en el directorio correcto
if [ ! -f "package.json" ] || [ ! -f "next.config.mjs" ]; then
    echo "❌ Error: Debes ejecutar este script desde el directorio frontend/"
    exit 1
fi

echo "✅ Archivos de Next.js encontrados"
echo ""

# Ejecutar vercel
# Cuando pregunte "In which directory is your code located?", responder: .
vercel

