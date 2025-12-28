import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { celo, celoAlfajores } from "wagmi/chains";
import { http } from "wagmi";

// Celo Sepolia Testnet Configuration
const celoSepolia = {
  id: 11142220,
  name: "Celo Sepolia",
  nativeCurrency: {
    decimals: 18,
    name: "CELO",
    symbol: "CELO",
  },
  rpcUrls: {
    default: {
      http: ["https://forno.celo-sepolia.celo-testnet.org"],
    },
  },
  blockExplorers: {
    default: {
      name: "Celo Explorer",
      url: "https://explorer.celo.org/sepolia",
    },
  },
  testnet: true,
} as const;

// Celo Mainnet Configuration
// IMPORTANT: Don't spread ...celo as it might cause chain resolution issues
const celoMainnet = {
  id: 42220,
  name: "Celo",
  nativeCurrency: {
    decimals: 18,
    name: "CELO",
    symbol: "CELO",
  },
  rpcUrls: {
    default: {
      http: [process.env.NEXT_PUBLIC_CELO_RPC_URL || "https://forno.celo.org"],
    },
  },
  blockExplorers: {
    default: {
      name: "CeloScan",
      url: "https://celoscan.io",
    },
  },
  testnet: false,
} as const;

// Get WalletConnect Project ID from environment
// IMPORTANT: You must set NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID in .env.local
// Get one at https://cloud.walletconnect.com
const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID;

// Validate projectId format (should be 32 character hex string)
const isValidProjectId = projectId && /^[a-fA-F0-9]{32}$/.test(projectId);

if (!isValidProjectId) {
  if (typeof window !== "undefined") {
    // Client-side: show warning (only once to avoid spam)
    if (!(window as any).__WALLETCONNECT_WARNING_SHOWN) {
      console.warn(
        "⚠️ NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID is not set or invalid.\n" +
        "WalletConnect features will be limited. Get a valid Project ID at https://cloud.walletconnect.com\n" +
        "Note: The 403 errors you see are expected without a valid Project ID. See TROUBLESHOOTING.md for details."
      );
      (window as any).__WALLETCONNECT_WARNING_SHOWN = true;
    }
  }
}

// Wagmi configuration with Celo support
// Note: projectId is required for WalletConnect, but we can work without it for local development
// For production, you MUST set a valid projectId in .env.local
// TEMPORARY FIX: Use only Celo Sepolia for testing to avoid chain resolution issues
// TODO: Re-enable all chains once the chain mismatch issue is resolved
export const config = getDefaultConfig({
  appName: process.env.NEXT_PUBLIC_APP_NAME || "Enerpay",
  projectId: isValidProjectId ? projectId : "00000000000000000000000000000000", // Required by getDefaultConfig
  chains: [celoSepolia], // ONLY Celo Sepolia for now to fix chain mismatch
  ssr: true, // Enable SSR support
  transports: {
    [celoSepolia.id]: http(),
  },
});

// Export chain IDs for easy access
export const CELO_SEPOLIA_CHAIN_ID = 11142220;
export const CELO_MAINNET_CHAIN_ID = 42220;
export const CELO_ALFAJORES_CHAIN_ID = 44787;

// cUSD token address on Celo Mainnet
export const CUSD_ADDRESS = "0x765DE816845861e75A25fCA122bb6898B8B1282a" as const;

// cREAL token address on Celo Mainnet
export const CREAL_ADDRESS = "0xe8537a3d056DA446677B9E2d2516b1ee149eE628" as const;

// cEUR token address on Celo Mainnet
export const CEUR_ADDRESS = "0xD8763CBa276a3738E6DE85b4b3bF5FDed6D6cA73" as const;

