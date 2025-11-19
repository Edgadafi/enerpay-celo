import { formatUnits, parseUnits } from "viem";
import { TOKEN_METADATA, TOKENS } from "./constants";

/**
 * Format token amount to human-readable string
 */
export function formatTokenAmount(
  amount: bigint,
  tokenAddress: string,
  decimals: number = 18
): string {
  try {
    return formatUnits(amount, decimals);
  } catch (error) {
    console.error("Error formatting token amount:", error);
    return "0";
  }
}

/**
 * Parse human-readable amount to bigint
 */
export function parseTokenAmount(
  amount: string,
  decimals: number = 18
): bigint {
  try {
    return parseUnits(amount, decimals);
  } catch (error) {
    console.error("Error parsing token amount:", error);
    return 0n;
  }
}

/**
 * Format cUSD amount with proper decimals
 */
export function formatCUSD(amount: bigint): string {
  return formatTokenAmount(amount, TOKENS.CUSD);
}

/**
 * Parse cUSD string to bigint
 */
export function parseCUSD(amount: string): bigint {
  return parseTokenAmount(amount, 18);
}

/**
 * Get token symbol from address
 */
export function getTokenSymbol(tokenAddress: string): string {
  const metadata = TOKEN_METADATA[tokenAddress as keyof typeof TOKEN_METADATA];
  return metadata?.symbol || "UNKNOWN";
}

/**
 * Get token name from address
 */
export function getTokenName(tokenAddress: string): string {
  const metadata = TOKEN_METADATA[tokenAddress as keyof typeof TOKEN_METADATA];
  return metadata?.name || "Unknown Token";
}

/**
 * Truncate address for display
 */
export function truncateAddress(address: string, length: number = 6): string {
  if (!address) return "";
  if (address.length <= length * 2) return address;
  return `${address.slice(0, length)}...${address.slice(-length)}`;
}

/**
 * Validate Celo address
 */
export function isValidAddress(address: string): boolean {
  return /^0x[a-fA-F0-9]{40}$/.test(address);
}

/**
 * Format currency with locale
 */
export function formatCurrency(
  amount: string | number,
  currency: string = "USD",
  locale: string = "en-US"
): string {
  const numAmount = typeof amount === "string" ? parseFloat(amount) : amount;
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(numAmount);
}

