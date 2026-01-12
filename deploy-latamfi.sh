#!/bin/bash

# Script para crear y desplegar LatamFi en Vercel
# Uso: ./deploy-latamfi.sh

set -e

echo "🚀 LatamFi - Deployment Script para Vercel"
echo "=========================================="
echo ""

# Colores para output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Verificar que estamos en el directorio correcto
if [ ! -d "frontend" ]; then
    echo -e "${RED}❌ Error: No se encontró el directorio 'frontend'${NC}"
    echo "Por favor, ejecuta este script desde la raíz del proyecto."
    exit 1
fi

echo -e "${GREEN}✅ Directorio frontend encontrado${NC}"
echo ""

# Verificar autenticación de Vercel
echo "🔐 Verificando autenticación de Vercel..."
if ! vercel whoami &>/dev/null; then
    echo -e "${YELLOW}⚠️  No estás autenticado en Vercel${NC}"
    echo "Por favor, ejecuta: vercel login"
    exit 1
fi

USER=$(vercel whoami)
echo -e "${GREEN}✅ Autenticado como: ${USER}${NC}"
echo ""

# Verificar si ya existe un proyecto vinculado
if [ -d ".vercel" ]; then
    echo -e "${YELLOW}⚠️  Ya existe un proyecto vinculado en .vercel${NC}"
    read -p "¿Deseas crear un nuevo proyecto? (s/n): " -n 1 -r
    echo ""
    if [[ ! $REPLY =~ ^[Ss]$ ]]; then
        echo "Usando proyecto existente..."
        PROJECT_NAME=$(cat .vercel/project.json 2>/dev/null | grep -o '"name":"[^"]*' | cut -d'"' -f4 || echo "unknown")
        echo -e "${GREEN}Proyecto actual: ${PROJECT_NAME}${NC}"
    else
        echo "Creando nuevo proyecto..."
        rm -rf .vercel
    fi
fi

# Crear nuevo proyecto si no existe
if [ ! -d ".vercel" ]; then
    echo "📦 Creando nuevo proyecto en Vercel..."
    echo ""
    echo "Configuración:"
    echo "  - Nombre del proyecto: LatamFi"
    echo "  - Root Directory: frontend"
    echo "  - Framework: Next.js"
    echo ""
    
    # Crear proyecto con configuración
    vercel --yes \
        --name="latamfi" \
        --scope=$(vercel whoami) \
        --root-directory="frontend"
    
    echo ""
    echo -e "${GREEN}✅ Proyecto creado exitosamente${NC}"
else
    echo -e "${GREEN}✅ Usando proyecto existente${NC}"
fi

echo ""
echo "📋 Variables de entorno necesarias:"
echo "===================================="
echo ""
echo "Por favor, agrega estas variables en Vercel Dashboard:"
echo "  Settings → Environment Variables"
echo ""
echo "1. NEXT_PUBLIC_APP_NAME=LatamFi"
echo "2. NEXT_PUBLIC_CELO_RPC_URL=https://forno.celo.org"
echo "3. NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=<tu-project-id>"
echo ""
echo -e "${YELLOW}⚠️  IMPORTANTE:${NC}"
echo "   - Agrega las variables para Production, Preview y Development"
echo "   - Obtén el WalletConnect Project ID en: https://cloud.walletconnect.com"
echo ""

# Preguntar si desea desplegar ahora
read -p "¿Deseas desplegar ahora? (s/n): " -n 1 -r
echo ""
if [[ $REPLY =~ ^[Ss]$ ]]; then
    echo "🚀 Desplegando a producción..."
    vercel --prod
    
    echo ""
    echo -e "${GREEN}✅ Deployment completado${NC}"
    echo ""
    echo "📝 Próximos pasos:"
    echo "   1. Ve a Vercel Dashboard y agrega las variables de entorno"
    echo "   2. Redesplega después de agregar las variables"
    echo "   3. Verifica que la aplicación funcione correctamente"
else
    echo ""
    echo "📝 Para desplegar más tarde, ejecuta:"
    echo "   vercel --prod"
fi

echo ""
echo -e "${GREEN}✨ ¡Listo!${NC}"
echo ""
echo "📚 Ver guía completa en: VERCEL_DEPLOY_LATAMFI.md"

