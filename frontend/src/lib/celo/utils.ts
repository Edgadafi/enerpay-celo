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

/**
 * Validate phone number in E.164 format
 * E.164 format: +[country code][number] (e.g., +521234567890)
 * - Must start with +
 * - Country code: 1-3 digits
 * - Number: 4-15 digits (total length including country code: max 15 digits)
 */
export function isValidPhoneNumber(phone: string): boolean {
  if (!phone) return false;
  // E.164 format: + followed by 1-15 digits
  // Total length: 1 (for +) + 1-15 digits = 2-16 characters
  const e164Regex = /^\+[1-9]\d{1,14}$/;
  return e164Regex.test(phone);
}

/**
 * Format phone number to E.164 format (removes spaces, dashes, parentheses)
 * Note: This only cleans the format, doesn't add country code
 */
export function formatPhoneToE164(phone: string): string {
  if (!phone) return "";
  // Remove all non-digit characters except +
  let cleaned = phone.replace(/[^\d+]/g, "");
  // Ensure it starts with +
  if (!cleaned.startsWith("+")) {
    cleaned = "+" + cleaned;
  }
  return cleaned;
}

