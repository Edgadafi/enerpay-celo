"use client";

export const dynamic = "force-dynamic";

import { useState, useEffect } from "react";
import { useAccount, useWriteContract, useWaitForTransactionReceipt, useChainId, useConfig, useWalletClient, useSwitchChain } from "wagmi";
import { parseCUSD, isValidAddress } from "@/lib/celo/utils";
import { CELO_SEPOLIA_CHAIN_ID, CELO_MAINNET_CHAIN_ID, TOKENS } from "@/lib/celo/constants";
import { erc20Abi, encodeFunctionData, toHex } from "viem";
import { Send, Loader2 } from "lucide-react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Header } from "@/components/Header";
import { useCelo } from "@/hooks/useCelo";

// Helper function to get cUSD address based on chain
function getCUSDAddress(chainId: number): `0x${string}` {
  if (chainId === CELO_SEPOLIA_CHAIN_ID) {
    // Celo Sepolia testnet cUSD
    return "0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1";
  } else if (chainId === CELO_MAINNET_CHAIN_ID) {
    // Celo Mainnet cUSD
    return "0x765DE816845861e75A25fCA122bb6898B8B1282a";
  }
  // Default to Sepolia for unknown chains
  return "0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1";
}

export default function SendPage() {
  console.log("🟢 SendPage component rendered");
  
  const { address, isConnected, isCeloSepolia, chainId } = useCelo();
  const walletChainId = useChainId(); // Get chainId directly from wagmi
  const { chain } = useAccount(); // Get chain info from account
  const config = useConfig(); // Get wagmi config
  const { data: walletClient } = useWalletClient(); // Get wallet client for direct viem calls
  const { switchChain } = useSwitchChain(); // Get switchChain function
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");
  const [txHash, setTxHash] = useState<`0x${string}` | undefined>(undefined);

  // Use wallet's current chain ID - prioritize chain.id from account, fallback to walletChainId
  // This is the ACTUAL chainId from the connected wallet
  const currentChainId = chain?.id || walletChainId;
  const cusdAddress = getCUSDAddress(currentChainId);
  
  // Debug: Log all chain-related info
  console.log("🔍 Chain Debug Info:", {
    walletChainId,
    chainIdFromChain: chain?.id,
    currentChainId,
    isCeloSepolia,
    configChains: config.chains.map(c => ({ id: c.id, name: c.name })),
  });

  // Log component state
  useEffect(() => {
    console.log("📊 SendPage state:", {
      isConnected,
      walletChainId,
      chainId: chain?.id,
      currentChainId,
      cusdAddress,
      isCeloSepolia,
    });
  }, [isConnected, walletChainId, chain?.id, currentChainId, cusdAddress, isCeloSepolia]);

  // REMOVED useWriteContract - we're using window.ethereum.request directly
  // This was causing the chain mismatch error
  const [isPending, setIsPending] = useState(false);
  const [writeError, setWriteError] = useState<Error | null>(null);
  
  // Use txHash state for transaction tracking
  const transactionHash = txHash;
  
  const { isLoading: isConfirming, isSuccess } =
    useWaitForTransactionReceipt({
      hash: transactionHash,
      chainId: CELO_SEPOLIA_CHAIN_ID, // Use constant directly
    });

  const handleSend = async () => {
    console.log("🔵🔵🔵 handleSend called - NEW CODE VERSION 🔵🔵🔵");
    console.log("🔵 Timestamp:", new Date().toISOString());
    console.log("🔵 Code version: Using window.ethereum.request directly");
    setError("");

    // Validation
    if (!isConnected) {
      console.log("❌ Not connected");
      setError("Please connect your wallet");
      return;
    }

    console.log("✅ Connected, checking chain...", {
      walletChainId,
      chainId: chain?.id,
      isCeloSepolia,
    });

    // Check if user is on a supported Celo chain
    if (walletChainId !== CELO_SEPOLIA_CHAIN_ID && walletChainId !== CELO_MAINNET_CHAIN_ID) {
      console.log("❌ Unsupported chain:", walletChainId);
      setError(`Please switch to Celo Sepolia or Celo Mainnet. Current chain: ${walletChainId}`);
      return;
    }

    if (!recipient || !isValidAddress(recipient)) {
      console.log("❌ Invalid recipient");
      setError("Please enter a valid Celo address");
      return;
    }

    if (!amount || parseFloat(amount) <= 0) {
      console.log("❌ Invalid amount");
      setError("Please enter a valid amount");
      return;
    }

    console.log("✅ All validations passed, preparing transaction...");

    try {
      const amountWei = parseCUSD(amount);

      // Debug log
      console.log("📤 Sending transaction:", {
        walletChainId,
        currentChainId,
        chainId: chain?.id,
        cusdAddress,
        recipient,
        amount: amountWei.toString(),
      });

      // Get the actual chainId from the wallet - this is the source of truth
      const actualChainId = chain?.id || walletChainId;
      
      // Verify the chainId is valid
      if (actualChainId !== CELO_SEPOLIA_CHAIN_ID && actualChainId !== CELO_MAINNET_CHAIN_ID) {
        throw new Error(`Unsupported chain ID: ${actualChainId}. Please switch to Celo Sepolia or Mainnet.`);
      }
      
      console.log("📝 Calling writeContract with explicit chainId from wallet:", {
        address: cusdAddress,
        walletChainId,
        chainIdFromAccount: chain?.id,
        actualChainId,
        functionName: "transfer",
        chainObject: chain,
      });
      
      // Verify the chain is in wagmi config
      const chainInConfig = config.chains.find(c => c.id === actualChainId);
      if (!chainInConfig) {
        throw new Error(`Chain ${actualChainId} not found in wagmi config. Available chains: ${config.chains.map(c => c.id).join(', ')}`);
      }
      
      console.log("✅ Chain found in config:", chainInConfig.name, "ID:", chainInConfig.id);
      console.log("📌 Wallet chain info:", {
        walletChainId,
        chainFromAccount: chain?.id,
        actualChainId,
        chainName: chain?.name,
        chainInConfigId: chainInConfig.id,
        walletClientChainId: walletClient?.chain?.id,
      });
      
      // FINAL SOLUTION: Ensure wallet is on correct chain, then send transaction
      if (typeof window === "undefined" || !window.ethereum) {
        throw new Error("Ethereum provider not available");
      }
      
      if (!address) {
        throw new Error("Wallet address not available");
      }
      
      // CRITICAL: Verify and switch to Celo Sepolia if needed
      if (walletChainId !== CELO_SEPOLIA_CHAIN_ID) {
        console.log("⚠️ Wallet not on Celo Sepolia, attempting to switch...");
        try {
          // Try to switch chain
          await window.ethereum.request({
            method: "wallet_switchEthereumChain",
            params: [{ chainId: `0x${CELO_SEPOLIA_CHAIN_ID.toString(16)}` }],
          });
          // Wait a moment for the switch to complete
          await new Promise(resolve => setTimeout(resolve, 1000));
        } catch (switchError: any) {
          // If chain doesn't exist, try to add it
          if (switchError.code === 4902) {
            console.log("📝 Celo Sepolia not found, adding network...");
            await window.ethereum.request({
              method: "wallet_addEthereumChain",
              params: [
                {
                  chainId: `0x${CELO_SEPOLIA_CHAIN_ID.toString(16)}`,
                  chainName: "Celo Sepolia",
                  nativeCurrency: {
                    name: "CELO",
                    symbol: "CELO",
                    decimals: 18,
                  },
                  rpcUrls: ["https://forno.celo-sepolia.celo-testnet.org"],
                  blockExplorerUrls: ["https://explorer.celo.org/sepolia"],
                },
              ],
            });
            // Wait a moment for the add to complete
            await new Promise(resolve => setTimeout(resolve, 1000));
          } else {
            throw new Error(`Failed to switch to Celo Sepolia: ${switchError.message}`);
          }
        }
      }
      
      console.log("📝 Sending transaction with window.ethereum.request:", {
        address: TOKENS.CUSD,
        chainId: walletChainId,
        userAddress: address,
        functionName: "transfer",
        recipient,
        amount: amountWei.toString(),
      });
      
      // Encode the function call data
      const data = encodeFunctionData({
        abi: erc20Abi,
        functionName: "transfer",
        args: [recipient as `0x${string}`, amountWei],
      });
      
      console.log("🔍 About to send transaction with these params:", {
        from: address,
        to: TOKENS.CUSD,
        data: data,
        dataLength: data.length,
        walletChainId,
        ethereumProvider: !!window.ethereum,
      });
      
      // CRITICAL: Get current chain from wallet before sending
      const currentChain = await window.ethereum.request({
        method: "eth_chainId",
      });
      
      console.log("🔍 Current chain from wallet:", {
        chainIdHex: currentChain,
        chainIdDecimal: parseInt(currentChain as string, 16),
        expectedChainId: CELO_SEPOLIA_CHAIN_ID,
        matches: parseInt(currentChain as string, 16) === CELO_SEPOLIA_CHAIN_ID,
      });
      
      // Verify we're on the correct chain
      if (parseInt(currentChain as string, 16) !== CELO_SEPOLIA_CHAIN_ID) {
        throw new Error(
          `Wallet is on chain ${parseInt(currentChain as string, 16)} but needs to be on ${CELO_SEPOLIA_CHAIN_ID}. Please switch to Celo Sepolia.`
        );
      }
      
      // Send transaction - DO NOT include chainId, let wallet use current chain
      // Including chainId seems to cause the mismatch error
      console.log("📤📤📤 Sending transaction NOW with window.ethereum.request 📤📤📤");
      console.log("📤 Transaction params:", {
        from: address,
        to: TOKENS.CUSD,
        data: data.substring(0, 20) + "...",
        hasChainId: false,
      });
      
      setIsPending(true);
      setWriteError(null);
      
      try {
        const hash = await window.ethereum.request({
          method: "eth_sendTransaction",
          params: [
            {
              from: address,
              to: TOKENS.CUSD,
              data: data,
              // DO NOT include chainId - wallet will use its current chain
            },
          ],
        });
        
        console.log("✅✅✅ Transaction sent successfully, hash:", hash);
        setTxHash(hash as `0x${string}`);
        setIsPending(false);
      } catch (txError: any) {
        console.error("❌❌❌ Transaction error from window.ethereum.request:", txError);
        console.error("❌ Error details:", {
          message: txError.message,
          code: txError.code,
          data: txError.data,
          stack: txError.stack,
        });
        setIsPending(false);
        setWriteError(txError);
        throw txError;
      }
      
      console.log("✅ writeContract called successfully");
    } catch (err) {
      console.error("❌ Transaction error:", err);
      setError(err instanceof Error ? err.message : "Transaction failed");
    }
  };

  if (!isConnected) {
    return (
      <div className="min-h-screen p-4 flex items-center justify-center">
        <div className="max-w-md w-full text-center">
          <h1 className="text-2xl font-bold mb-4">Connect Wallet</h1>
          <p className="text-gray-600 mb-6">
            Please connect your wallet to send payments
          </p>
          <ConnectButton />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Header title="Send Payment" showBack={true} />

      {/* Form */}
      <div className="max-w-md mx-auto px-4 py-6">
        <div className="bg-white rounded-2xl p-6 shadow-sm space-y-6">
          {/* Chain Info */}
          <div className="bg-blue-50 border border-blue-200 text-blue-700 px-4 py-2 rounded-xl text-sm">
            Network: {isCeloSepolia ? "Celo Sepolia (Testnet)" : chainId === CELO_MAINNET_CHAIN_ID ? "Celo Mainnet" : `Chain ${chainId}`}
            <br />
            cUSD Address: {cusdAddress.slice(0, 6)}...{cusdAddress.slice(-4)}
          </div>

          {/* Recipient */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Recipient Address
            </label>
            <input
              type="text"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              placeholder="0x..."
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-celo-green focus:border-transparent outline-none"
            />
          </div>

          {/* Amount */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Amount (cUSD)
            </label>
            <input
              type="number"
              step="0.01"
              min="0"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-celo-green focus:border-transparent outline-none text-2xl font-semibold"
            />
          </div>

          {/* Error */}
          {(error || writeError) && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">
              <div className="font-semibold mb-1">Error:</div>
              <div>{error || writeError?.message || "Unknown error"}</div>
              {writeError && (
                <details className="mt-2 text-xs">
                  <summary className="cursor-pointer">Error details</summary>
                  <pre className="mt-1 overflow-auto">
                    {JSON.stringify(writeError, null, 2)}
                  </pre>
                </details>
              )}
            </div>
          )}

          {/* Success */}
          {isSuccess && (
            <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-xl text-sm">
              Payment sent successfully!
            </div>
          )}

          {/* Send Button */}
          <button
            onClick={(e) => {
              console.log("🖱️ Button clicked!");
              e.preventDefault();
              handleSend();
            }}
            disabled={isPending || isConfirming}
            className="w-full bg-celo-green text-white py-4 px-6 rounded-xl font-semibold shadow-md hover:bg-primary-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {(isPending || isConfirming) ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>{isPending ? "Confirming..." : "Processing..."}</span>
              </>
            ) : (
              <>
                <Send className="w-5 h-5" />
                <span>Send Payment</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}