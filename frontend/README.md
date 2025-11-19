# Enerpay Frontend

Frontend de Enerpay construido con Next.js 14, TypeScript, TailwindCSS y Wagmi/Viem para integración con Celo blockchain.

## 🚀 Stack Tecnológico

- **Next.js 14** - App Router con React Server Components
- **TypeScript** - Type safety
- **TailwindCSS** - Estilos móvil-first
- **Wagmi + Viem** - Integración Web3
- **RainbowKit** - UI de conexión de wallet
- **Celo Mainnet** - Chain ID: 42220
- **cUSD** - Token de pago principal

## 📦 Instalación

```bash
# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env.local
# Editar .env.local con tus valores

# Ejecutar en desarrollo
npm run dev
```

## 🔧 Configuración

### Variables de Entorno

Crea un archivo `.env.local` con las siguientes variables:

```env
# Celo Network
NEXT_PUBLIC_CELO_CHAIN_ID=42220
NEXT_PUBLIC_CELO_RPC_URL=https://forno.celo.org

# cUSD Token Address
NEXT_PUBLIC_CUSD_ADDRESS=0x765DE816845861e75A25fCA122bb6898B8B1282a

# WalletConnect Project ID (obtén uno en https://cloud.walletconnect.com)
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_project_id_here

# App Config
NEXT_PUBLIC_APP_NAME=Enerpay
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### WalletConnect Project ID

1. Ve a [WalletConnect Cloud](https://cloud.walletconnect.com)
2. Crea un nuevo proyecto
3. Copia el Project ID
4. Agrégalo a `.env.local`

## 🏗️ Estructura del Proyecto

```
frontend/
├── src/
│   ├── app/                 # Next.js App Router
│   │   ├── layout.tsx      # Layout principal con Web3Provider
│   │   ├── page.tsx        # Página principal
│   │   ├── send/           # Página de envío
│   │   └── receive/        # Página de recepción
│   ├── components/         # Componentes React
│   │   ├── wallet/        # Componentes de wallet
│   │   └── payment/       # Componentes de pago
│   ├── hooks/             # Custom hooks
│   │   ├── useCelo.ts     # Hook para Celo
│   │   └── useTokenBalance.ts  # Hook para balances
│   └── lib/               # Utilidades y configuraciones
│       ├── wagmi/         # Configuración de Wagmi
│       └── celo/          # Utilidades de Celo
├── public/                # Archivos estáticos
└── package.json
```

## 🔌 Integración con Celo

### Configuración de Wagmi

La configuración de Wagmi está en `src/lib/wagmi/config.ts`:

- **Celo Mainnet**: Chain ID 42220
- **Celo Alfajores**: Chain ID 44787 (testnet)
- **RPC**: https://forno.celo.org

### Tokens Soportados

- **cUSD** (Celo Dollar): `0x765DE816845861e75A25fCA122bb6898B8B1282a`
- **cREAL** (Celo Real): `0xe8537a3d056DA446677B9E2d2516b1ee149eE628`
- **cEUR** (Celo Euro): `0xD8763CBa276a3738E6DE85b4b3bF5FDed6D6cA73`

### Hooks Disponibles

#### `useCelo()`
Hook principal para funcionalidad de Celo:

```tsx
const {
  address,
  isConnected,
  isCeloMainnet,
  switchToCelo,
  getCUSDBalance,
} = useCelo();
```

#### `useCUSDBalance()`
Hook para obtener balance de cUSD:

```tsx
const { balance, formattedBalance, isLoading } = useCUSDBalance();
```

## 📱 Diseño Móvil-First

El diseño está optimizado para móviles con:

- **Touch targets** mínimos de 44x44px
- **Safe area insets** para dispositivos con notch
- **PWA-ready** para instalación como app
- **Responsive** con TailwindCSS

## 🧪 Desarrollo

```bash
# Desarrollo
npm run dev

# Build de producción
npm run build

# Iniciar servidor de producción
npm start

# Type checking
npm run type-check

# Linting
npm run lint
```

## 🔐 Seguridad

- **Non-custodial**: Los usuarios controlan sus claves
- **Validación de direcciones**: Verificación de formato de direcciones Celo
- **Manejo de errores**: Manejo robusto de errores de transacciones
- **Type safety**: TypeScript para prevenir errores

## 📚 Recursos

- [Celo Documentation](https://docs.celo.org)
- [Wagmi Documentation](https://wagmi.sh)
- [RainbowKit Documentation](https://rainbowkit.com)
- [Next.js Documentation](https://nextjs.org/docs)

## 🤝 Contribuir

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature
3. Commit tus cambios
4. Push a la rama
5. Abre un Pull Request

## 📄 Licencia

MIT License

