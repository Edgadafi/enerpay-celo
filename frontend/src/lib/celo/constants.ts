/**
 * Celo Network Constants
 * All addresses and configurations for Celo Mainnet
 */

// Chain IDs
export const CELO_MAINNET_CHAIN_ID = 42220;
export const CELO_SEPOLIA_CHAIN_ID = 11142220; // Celo Sepolia Testnet
export const CELO_ALFAJORES_CHAIN_ID = 44787;

// Token Addresses
// Celo Sepolia Testnet - Official contract addresses
export const TOKENS = {
  CUSD: "0xdE9e4C3ce781b4bA68120d6261cbad65ce0aB00b" as const, // Celo Sepolia - Official cUSD contract
  CREAL: "0xe8537a3d056DA446677B9E2d2516b1ee149eE628" as const,
  CEUR: "0xD8763CBa276a3738E6DE85b4b3bF5FDed6D6cA73" as const,
  CELO: "0x471EcE3750Da237f93B8E339c536989b8978a438" as const, // Native CELO token
} as const;

// Alfajores Testnet (legacy)
export const TOKENS_ALFAJORES = {
  CUSD: "0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1" as const, // Alfajores cUSD
  CREAL: "0xe8537a3d056DA446677B9E2d2516b1ee149eE628" as const,
  CEUR: "0xD8763CBa276a3738E6DE85b4b3bF5FDed6D6cA73" as const,
} as const;

// Mainnet Token Addresses (for reference)
export const TOKENS_MAINNET = {
  CUSD: "0x765DE816845861e75A25fCA122bb6898B8B1282a" as const,
  CREAL: "0xe8537a3d056DA446677B9E2d2516b1ee149eE628" as const,
  CEUR: "0xD8763CBa276a3738E6DE85b4b3bF5FDed6D6cA73" as const,
} as const;

// Token Metadata
export const TOKEN_METADATA = {
  [TOKENS.CUSD]: {
    name: "Celo Dollar",
    symbol: "cUSD",
    decimals: 18,
    logo: "💵",
  },
  [TOKENS.CREAL]: {
    name: "Celo Real",
    symbol: "cREAL",
    decimals: 18,
    logo: "🇧🇷",
  },
  [TOKENS.CEUR]: {
    name: "Celo Euro",
    symbol: "cEUR",
    decimals: 18,
    logo: "🇪🇺",
  },
} as const;

// RPC URLs
export const RPC_URLS = {
  mainnet: process.env.NEXT_PUBLIC_CELO_RPC_URL || "https://forno.celo.org",
  celoSepolia: "https://forno.celo-sepolia.celo-testnet.org",
  alfajores: "https://alfajores-forno.celo-testnet.org",
} as const;

// Block Explorers
export const EXPLORERS = {
  mainnet: "https://celoscan.io",
  celoSepolia: "https://explorer.celo.org/sepolia",
  alfajores: "https://alfajores.celoscan.io",
} as const;

// Smart Contract Addresses
export const CONTRACTS = {
  // EnerpayRemittance deployed on Celo Sepolia (Updated with SafeERC20)
  ENERPAY_REMITTANCE_SEPOLIA:
    process.env.NEXT_PUBLIC_REMITTANCE_CONTRACT_ADDRESS ||
    "0x8aB940E40F64306E1C6af7B80429B4D0Bd2C65eb",
  // MicrofinancePool deployed on Celo Sepolia
  MICROFINANCE_POOL_SEPOLIA:
    process.env.NEXT_PUBLIC_MICROFINANCE_CONTRACT_ADDRESS ||
    "0x79Cdf63629bB1a9c5199416Fcc72Ab9FCD8bBea2",
} as const;

// ERC20 ABI for token interactions
export const ERC20_ABI = [
  {
    constant: true,
    inputs: [{ name: "_owner", type: "address" }],
    name: "balanceOf",
    outputs: [{ name: "balance", type: "uint256" }],
    type: "function",
  },
  {
    constant: false,
    inputs: [
      { name: "_to", type: "address" },
      { name: "_value", type: "uint256" },
    ],
    name: "transfer",
    outputs: [{ name: "", type: "bool" }],
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "decimals",
    outputs: [{ name: "", type: "uint8" }],
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "symbol",
    outputs: [{ name: "", type: "string" }],
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "name",
    outputs: [{ name: "", type: "string" }],
    type: "function",
  },
] as const;

