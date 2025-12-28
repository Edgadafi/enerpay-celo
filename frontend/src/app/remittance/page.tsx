"use client";

export const dynamic = "force-dynamic";

import { useState, useEffect } from "react";
import { useAccount, usePublicClient, useWriteContract, useWaitForTransactionReceipt, useChainId } from "wagmi";
import { useRemittance, useCalculateFee } from "@/hooks/useRemittance";
import { isValidAddress, isValidPhoneNumber, formatPhoneToE164, parseCUSD } from "@/lib/celo/utils";
import { getAddress, formatUnits, maxUint256, encodeFunctionData } from "viem";
import { erc20Abi } from "viem";
import { TOKENS, CELO_SEPOLIA_CHAIN_ID } from "@/lib/celo/constants";
import { ENERPAY_REMITTANCE_ABI } from "@/lib/contracts/EnerpayRemittance.abi";
import { Send, Loader2, Calculator } from "lucide-react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Header } from "@/components/Header";

const DESTINATION_TYPES = [
  { value: "wallet", label: "Wallet (Instant)" },
  { value: "bank", label: "Bank Account" },
  { value: "mobile", label: "Mobile Money" },
];

export default function RemittancePage() {
  const { address, isConnected } = useAccount();
  const { isCeloSepolia, contractAddress } = useRemittance();
  const [beneficiary, setBeneficiary] = useState("");
  const [amount, setAmount] = useState("");
  const [destinationType, setDestinationType] = useState("mobile"); // Default to mobile for better UX
  const [destinationId, setDestinationId] = useState("");
  const [error, setError] = useState("");
  const [txHash, setTxHash] = useState<`0x${string}` | undefined>(undefined);
  const [isPending, setIsPending] = useState(false);
  const [isConfirming, setIsConfirming] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const { feeFormatted, totalAmountFormatted, isLoading: feeLoading } = useCalculateFee(amount);
  const publicClient = usePublicClient();
  const [needsApproval, setNeedsApproval] = useState(false);
  const [isCheckingAllowance, setIsCheckingAllowance] = useState(false);
  
  const { writeContract: writeApprove, data: approveHash, isPending: isApproving } = useWriteContract();
  const { isLoading: isApprovingConfirming, isSuccess: isApprovalSuccess } = useWaitForTransactionReceipt({
    hash: approveHash,
    chainId: CELO_SEPOLIA_CHAIN_ID,
    query: {
      enabled: !!approveHash && needsApproval,
    },
  });
  
  const [contractBalance, setContractBalance] = useState<string | null>(null);
  const [verificationStatus, setVerificationStatus] = useState<"idle" | "checking" | "verified" | "failed">("idle");

  // Verify transaction and contract balance after success
  useEffect(() => {
    if (isSuccess && txHash && (destinationType === "mobile" || destinationType === "bank")) {
      const verifyTransaction = async () => {
        setVerificationStatus("checking");
        try {
          // Wait a bit for the transaction to be fully processed
          await new Promise(resolve => setTimeout(resolve, 2000));
          
          // Get contract balance
          if (publicClient) {
            const balance = await publicClient.readContract({
              address: TOKENS.CUSD,
              abi: erc20Abi,
              functionName: "balanceOf",
              args: [contractAddress],
            });
            
            const balanceFormatted = formatUnits(balance as bigint, 18);
            setContractBalance(balanceFormatted);
            setVerificationStatus("verified");
            
            console.log("✅ Contract balance verified:", balanceFormatted, "cUSD");
          }
        } catch (err) {
          console.error("❌ Error verifying transaction:", err);
          setVerificationStatus("failed");
        }
      };
      
      verifyTransaction();
    } else {
      setContractBalance(null);
      setVerificationStatus("idle");
    }
  }, [isSuccess, txHash, destinationType, contractAddress, publicClient]);

  // After approval completes, automatically send remittance
  useEffect(() => {
    const sendAfterApproval = async () => {
      if (!needsApproval || !approveHash) {
        console.log("⏸️ Skipping - needsApproval:", needsApproval, "approveHash:", approveHash);
        return;
      }
      
      // Wait for approval to be confirmed
      if (isApproving || isApprovingConfirming) {
        console.log("⏳ Still waiting for approval confirmation...", {
          isApproving,
          isApprovingConfirming,
          isApprovalSuccess,
        });
        return;
      }
      
      // Only proceed if approval was successful
      if (!isApprovalSuccess) {
        console.log("⏸️ Approval not yet successful, waiting...");
        return;
      }
      
      console.log("✅ Approval completed successfully, preparing to send remittance...");
      console.log("📊 Current state:", {
        needsApproval,
        approveHash,
        isApproving,
        isApprovingConfirming,
        isApprovalSuccess,
        amount,
        destinationType,
        destinationId,
      });
      
      try {
        const amountWei = parseCUSD(amount);
        const feeWei = parseCUSD(feeFormatted || "0");
        const totalAmountWei = amountWei + feeWei;
        
        // Double-check allowance
        if (publicClient && address) {
          console.log("🔍 Checking allowance after approval...");
          const currentAllowance = await publicClient.readContract({
            address: TOKENS.CUSD,
            abi: erc20Abi,
            functionName: "allowance",
            args: [address, contractAddress],
          });
          
          console.log("🔍 Allowance after approval:", formatUnits(currentAllowance as bigint, 18), "cUSD");
          console.log("🔍 Total amount needed:", formatUnits(totalAmountWei, 18), "cUSD");
          
          if (currentAllowance >= totalAmountWei) {
            console.log("✅ Allowance sufficient, sending remittance...");
            setNeedsApproval(false);
            
            let finalBeneficiary: `0x${string}`;
            if (destinationType === "wallet") {
              finalBeneficiary = getAddress(beneficiary.trim());
            } else {
              finalBeneficiary = getAddress(contractAddress.trim());
            }
            
            console.log("📤 Calling sendRemittance with:", {
              finalBeneficiary,
              amount,
              destinationType,
              destinationId,
            });
            
            // After approval, send the remittance using window.ethereum.request directly
            console.log("✅ Approval complete, sending remittance...");
            setNeedsApproval(false);
            
            // Send remittance using window.ethereum.request (same as handleSend but without approval check)
            try {
              if (typeof window === "undefined" || !window.ethereum) {
                throw new Error("Ethereum provider not available");
              }
              
              // Verify chain
              const currentChain = await window.ethereum.request({
                method: "eth_chainId",
              });
              
              if (parseInt(currentChain as string, 16) !== CELO_SEPOLIA_CHAIN_ID) {
                throw new Error(`Please switch to Celo Sepolia. Current chain: ${parseInt(currentChain as string, 16)}`);
              }
              
              // Encode function call
              const data = encodeFunctionData({
                abi: ENERPAY_REMITTANCE_ABI,
                functionName: "sendRemittance",
                args: [finalBeneficiary, amountWei, destinationType, destinationId],
              });
              
              setIsPending(true);
              setError("");
              
              const hash = await window.ethereum.request({
                method: "eth_sendTransaction",
                params: [
                  {
                    from: address,
                    to: contractAddress,
                    data: data,
                  },
                ],
              });
              
              console.log("✅ Transaction hash received:", hash);
              setTxHash(hash as `0x${string}`);
              setIsPending(false);
              setIsConfirming(true);
              
              // Poll for receipt
              const checkTransaction = async () => {
                try {
                  const receipt = await window.ethereum.request({
                    method: "eth_getTransactionReceipt",
                    params: [hash],
                  });
                  
                  if (receipt) {
                    const status = receipt.status;
                    const isSuccessful = status === "0x1" || status === 1;
                    
                    if (isSuccessful) {
                      setIsConfirming(false);
                      setIsSuccess(true);
                    } else {
                      setIsConfirming(false);
                      setError("Transaction failed on-chain");
                    }
                  } else {
                    setTimeout(checkTransaction, 2000);
                  }
                } catch (err) {
                  console.error("❌ Error checking transaction:", err);
                  setTimeout(checkTransaction, 2000);
                }
              };
              
              setTimeout(checkTransaction, 2000);
            } catch (sendErr: any) {
              console.error("❌ Error sending remittance after approval:", sendErr);
              setError(sendErr?.message || "Failed to send remittance");
              setIsPending(false);
              setIsConfirming(false);
            }
            return;
          } else {
            console.error("❌ Allowance still insufficient after approval");
            setError("Approval completed but allowance is still insufficient. Please try again.");
            setNeedsApproval(false);
          }
        }
      } catch (err) {
        console.error("❌ Error sending after approval:", err);
        setError(err instanceof Error ? err.message : "Failed to send after approval");
        setNeedsApproval(false);
      }
    };
    
    // Only run if we're waiting for approval and have an approval hash
    if (needsApproval && approveHash && !isApproving && !isApprovingConfirming && isApprovalSuccess) {
      // Small delay to ensure everything is ready
      const timer = setTimeout(() => {
        sendAfterApproval();
      }, 1000);
      
      return () => clearTimeout(timer);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [needsApproval, approveHash, isApproving, isApprovingConfirming, isApprovalSuccess]);

  const handleSend = async () => {
    setError("");
    
    console.log("📤 handleSend called with:", {
      destinationType,
      beneficiary,
      destinationId,
      amount,
    });

    // Validation
    if (!isConnected) {
      setError("Please connect your wallet");
      return;
    }

    if (!isCeloSepolia) {
      setError("Please switch to Celo Sepolia network");
      return;
    }

    // For mobile and bank, beneficiary address is optional (will use contract address as escrow)
    // For wallet type, beneficiary address is required
    if (destinationType === "wallet") {
      if (!beneficiary || !isValidAddress(beneficiary)) {
        setError("Please enter a valid beneficiary address");
        return;
      }
    } else {
      console.log("✅ Skipping beneficiary validation for", destinationType);
    }

    if (!amount || parseFloat(amount) <= 0) {
      setError("Please enter a valid amount");
      return;
    }

    if (!destinationType) {
      setError("Please select a destination type");
      return;
    }

    // For wallet type, use beneficiary address as destinationId
    const finalDestinationId = destinationType === "wallet" ? beneficiary : destinationId;

    if (!finalDestinationId) {
      setError("Please enter destination ID");
      return;
    }

    // Validate phone number format for mobile type
    if (destinationType === "mobile") {
      if (!isValidPhoneNumber(finalDestinationId)) {
        setError(
          "Invalid phone number format. Please use E.164 format: +[country code][number]\n" +
          "Examples: +521234567890 (Mexico), +571234567890 (Colombia), +541123456789 (Argentina)"
        );
        return;
      }
    }

    try {
      // Calculate total amount needed (amount + fee)
      const amountWei = parseCUSD(amount);
      const feeWei = parseCUSD(feeFormatted || "0");
      const totalAmountWei = amountWei + feeWei;
      
      // Check allowance before sending
      setIsCheckingAllowance(true);
      if (publicClient && address) {
        const currentAllowance = await publicClient.readContract({
          address: TOKENS.CUSD,
          abi: erc20Abi,
          functionName: "allowance",
          args: [address, contractAddress],
        });
        
        console.log("🔍 Current allowance:", formatUnits(currentAllowance as bigint, 18), "cUSD");
        console.log("🔍 Total amount needed:", formatUnits(totalAmountWei, 18), "cUSD");
        
        if (currentAllowance < totalAmountWei) {
          console.log("⚠️ Insufficient allowance, requesting approval...");
          setNeedsApproval(true);
          setIsCheckingAllowance(false);
          
          // Request approval
          writeApprove({
            address: TOKENS.CUSD,
            abi: erc20Abi,
            functionName: "approve",
            args: [contractAddress, maxUint256], // Approve max for convenience
            chainId: CELO_SEPOLIA_CHAIN_ID,
          });
          
          return; // Wait for approval to complete
        }
      }
      setIsCheckingAllowance(false);
      setNeedsApproval(false);
      
      // Verify contract exists by trying to read from it
      if (publicClient) {
        try {
          console.log("🔍 Verifying contract exists at:", contractAddress);
          // Try to read a public variable to verify contract exists
          await publicClient.readContract({
            address: contractAddress,
            abi: ENERPAY_REMITTANCE_ABI,
            functionName: "remittanceCount",
          });
          console.log("✅ Contract verified - exists at address");
        } catch (contractErr: any) {
          console.error("❌ Contract verification failed:", contractErr);
          setError(`Contract not found at address ${contractAddress}. Please verify the contract is deployed.`);
          setIsCheckingAllowance(false);
          return;
        }
      }
      
      // For mobile/bank, use contract address as beneficiary (funds stay in contract as escrow)
      // In production, this would be resolved via an identity service
      let finalBeneficiary: `0x${string}`;
      
      if (destinationType === "wallet") {
        // Normalize and validate wallet address
        finalBeneficiary = getAddress(beneficiary.trim());
      } else {
        // Normalize contract address (remove any whitespace and get checksummed version)
        finalBeneficiary = getAddress(contractAddress.trim());
      }
      
      console.log("📤 Final beneficiary address:", finalBeneficiary);
      console.log("📤 Destination type:", destinationType);
      console.log("📤 Destination ID:", finalDestinationId);
      
      // Use window.ethereum.request directly to get better error messages
      if (typeof window === "undefined" || !window.ethereum) {
        throw new Error("Ethereum provider not available");
      }
      
      // Verify we're on the correct chain
      const currentChain = await window.ethereum.request({
        method: "eth_chainId",
      });
      
      if (parseInt(currentChain as string, 16) !== CELO_SEPOLIA_CHAIN_ID) {
        throw new Error(`Please switch to Celo Sepolia. Current chain: ${parseInt(currentChain as string, 16)}`);
      }
      
      // Encode the function call
      const data = encodeFunctionData({
        abi: ENERPAY_REMITTANCE_ABI,
        functionName: "sendRemittance",
        args: [finalBeneficiary, amountWei, destinationType, finalDestinationId],
      });
      
      console.log("📤 Sending transaction with window.ethereum.request:", {
        from: address,
        to: contractAddress,
        data: data.substring(0, 50) + "...",
      });
      
      setIsPending(true);
      setError("");
      
      try {
        const hash = await window.ethereum.request({
          method: "eth_sendTransaction",
          params: [
            {
              from: address,
              to: contractAddress,
              data: data,
            },
          ],
        });
        
        console.log("✅ Transaction hash received:", hash);
        setTxHash(hash as `0x${string}`);
        setIsPending(false);
        setIsConfirming(true);
        
        // Poll for transaction receipt
        let attempts = 0;
        const maxAttempts = 30; // 60 seconds max
        const checkTransaction = async () => {
          try {
            attempts++;
            const receipt = await window.ethereum.request({
              method: "eth_getTransactionReceipt",
              params: [hash],
            });
            
            if (receipt) {
              const status = receipt.status;
              const isSuccessful = status === "0x1" || status === 1;
              
              console.log("📋 Transaction receipt:", {
                status,
                isSuccessful,
                blockNumber: receipt.blockNumber,
                gasUsed: receipt.gasUsed,
              });
              
              if (isSuccessful) {
                setIsConfirming(false);
                setIsSuccess(true);
              } else {
                // Transaction failed - try to get revert reason
                console.error("❌ Transaction failed on-chain. Status: 0x0");
                
                // Try to get the transaction to see if there's error data
                try {
                  const tx = await window.ethereum.request({
                    method: "eth_getTransactionByHash",
                    params: [hash],
                  });
                  
                  console.error("❌ Failed transaction details:", {
                    hash,
                    from: tx.from,
                    to: tx.to,
                    input: tx.input?.substring(0, 100),
                  });
                } catch (txErr) {
                  console.error("❌ Could not get transaction details:", txErr);
                }
                
                setIsConfirming(false);
                setError(
                  `Transaction failed on-chain. ` +
                  `View details: https://sepolia.celoscan.io/tx/${hash}`
                );
              }
            } else if (attempts < maxAttempts) {
              // Transaction not yet mined, check again
              setTimeout(checkTransaction, 2000);
            } else {
              setIsConfirming(false);
              setError("Transaction timeout - please check the explorer manually");
            }
          } catch (err) {
            console.error("❌ Error checking transaction:", err);
            if (attempts < maxAttempts) {
              setTimeout(checkTransaction, 2000);
            } else {
              setIsConfirming(false);
              setError("Error checking transaction status");
            }
          }
        };
        
        // Start checking after a delay
        setTimeout(checkTransaction, 2000);
      } catch (txErr: any) {
        console.error("❌ Transaction error from window.ethereum.request:", txErr);
        console.error("❌ Error details:", {
          message: txErr?.message,
          code: txErr?.code,
          data: txErr?.data,
        });
        
        setIsPending(false);
        setIsConfirming(false);
        setError(txErr?.message || "Transaction failed");
        throw txErr;
      }
    } catch (err) {
      console.error("❌ Error in handleSend:", err);
      setIsCheckingAllowance(false);
      const errorMessage = err instanceof Error ? err.message : "Transaction failed";
      setError(errorMessage);
    }
  };

  if (!isConnected) {
    return (
      <div className="min-h-screen p-4 flex items-center justify-center">
        <div className="max-w-md w-full text-center">
          <h1 className="text-2xl font-bold mb-4">Connect Wallet</h1>
          <p className="text-gray-600 mb-6">
            Please connect your wallet to send remittances
          </p>
          <ConnectButton />
        </div>
      </div>
    );
  }

  if (!isCeloSepolia) {
    return (
      <div className="min-h-screen p-4 flex items-center justify-center">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-6 text-center">
          <h2 className="text-2xl font-bold mb-4">Switch to Celo Sepolia</h2>
          <p className="text-gray-600 mb-6">
            Please switch to Celo Sepolia Testnet to use remittances
          </p>
          <p className="text-sm text-gray-500 mb-4">
            Chain ID: 11142220
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Header title="Send Remittance" showBack={true} />

      {/* Form */}
      <div className="max-w-md mx-auto px-4 py-6">
        <div className="bg-white rounded-2xl p-6 shadow-sm space-y-6">
          {/* Beneficiary (only required for wallet type) */}
          {destinationType === "wallet" && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Beneficiary Address <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={beneficiary}
                onChange={(e) => setBeneficiary(e.target.value)}
                placeholder="0x..."
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-celo-green focus:border-transparent outline-none"
              />
            </div>
          )}
          
          {/* Info for mobile/bank */}
          {(destinationType === "mobile" || destinationType === "bank") && (
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
              <p className="text-sm text-blue-800">
                <strong>Note:</strong> For {destinationType === "mobile" ? "Mobile Money" : "Bank"} transfers, 
                you only need to provide the {destinationType === "mobile" ? "phone number" : "account number"}. 
                The funds will be held in escrow until the remittance is processed.
              </p>
              {destinationType === "mobile" && (
                <p className="text-xs text-blue-600 mt-2">
                  In production, the phone number would be automatically resolved to a wallet address 
                  using Celo&apos;s identity protocol or a similar service.
                </p>
              )}
            </div>
          )}

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

          {/* Fee Calculation */}
          {amount && parseFloat(amount) > 0 && (
            <div className="bg-gray-50 rounded-xl p-4 space-y-2">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Calculator className="w-4 h-4" />
                <span>Fee Calculation</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Amount:</span>
                <span className="font-semibold">{amount} cUSD</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Platform Fee (1.5%):</span>
                <span className="font-semibold">
                  {feeLoading ? "..." : feeFormatted} cUSD
                </span>
              </div>
              <div className="flex justify-between text-sm pt-2 border-t border-gray-200">
                <span className="text-gray-700 font-medium">Total:</span>
                <span className="font-bold text-celo-green">
                  {feeLoading ? "..." : totalAmountFormatted} cUSD
                </span>
              </div>
            </div>
          )}

          {/* Destination Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Destination Type
            </label>
            <select
              value={destinationType}
              onChange={(e) => {
                const newType = e.target.value;
                console.log("🔄 Changing destination type to:", newType);
                setDestinationType(newType);
                // Clear beneficiary when switching to mobile/bank
                if (newType !== "wallet") {
                  console.log("🧹 Clearing beneficiary field (not wallet type)");
                  setBeneficiary("");
                } else {
                  // When switching to wallet, use destinationId as beneficiary if available
                  if (destinationId && isValidAddress(destinationId)) {
                    setBeneficiary(destinationId);
                  }
                }
                // Clear destinationId when switching to wallet
                if (newType === "wallet") {
                  setDestinationId(beneficiary || "");
                }
              }}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-celo-green focus:border-transparent outline-none"
            >
              {DESTINATION_TYPES.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
            {destinationType === "wallet" && (
              <p className="text-xs text-gray-500 mt-1">
                Wallet-to-wallet transfers are instant
              </p>
            )}
          </div>

          {/* Destination ID (if not wallet) */}
          {destinationType !== "wallet" && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Destination ID
                {destinationType === "bank" && " (Account Number)"}
                {destinationType === "mobile" && " (Phone Number)"}
              </label>
              <input
                type="text"
                value={destinationId}
                onChange={(e) => {
                  // Auto-format phone numbers to E.164
                  if (destinationType === "mobile") {
                    const formatted = formatPhoneToE164(e.target.value);
                    setDestinationId(formatted);
                  } else {
                    setDestinationId(e.target.value);
                  }
                }}
                placeholder={
                  destinationType === "bank"
                    ? "Account number"
                    : "+521234567890"
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-celo-green focus:border-transparent outline-none"
              />
              {destinationType === "mobile" && (
                <div className="mt-2 text-xs text-gray-500 space-y-1">
                  <p className="font-medium">Format: E.164 (International)</p>
                  <p>Must start with + followed by country code and number</p>
                  <p className="text-gray-400">
                    Examples: +521234567890 (MX), +571234567890 (CO), +541123456789 (AR)
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Error */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm space-y-2">
              <div className="font-semibold">❌ Error</div>
              <div>{error}</div>
            </div>
          )}

          {/* Success */}
          {isSuccess && (
            <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-xl text-sm space-y-2">
              <div className="font-semibold">✅ Remittance sent successfully!</div>
              
              {(destinationType === "mobile" || destinationType === "bank") && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mt-2 text-blue-800 text-xs space-y-2">
                  <p className="font-semibold mb-1">📦 Funds in Escrow</p>
                  <p>
                    Your {amount} cUSD has been transferred to the contract and is being held in escrow. 
                    The platform fee ({feeLoading ? "..." : feeFormatted} cUSD) has been deducted.
                  </p>
                  <p className="mt-2 text-blue-700">
                    Status: <strong>Pending</strong> - Waiting for remittance processing
                  </p>
                  
                  {verificationStatus === "checking" && (
                    <p className="text-blue-600 italic">⏳ Verifying transaction on blockchain...</p>
                  )}
                  
                  {verificationStatus === "verified" && contractBalance && (
                    <div className="mt-2 p-2 bg-green-50 border border-green-200 rounded text-green-800">
                      <p className="font-semibold">✅ Transaction Verified</p>
                      <p className="text-xs mt-1">
                        Contract balance: <strong>{parseFloat(contractBalance).toFixed(4)} cUSD</strong>
                      </p>
                      <p className="text-xs mt-1 text-green-700">
                        Your funds are safely held in the contract escrow.
                      </p>
                    </div>
                  )}
                  
                  {verificationStatus === "failed" && (
                    <p className="text-orange-600 italic">
                      ⚠️ Could not verify automatically. Please check the transaction on the explorer.
                    </p>
                  )}
                </div>
              )}
              
              {destinationType === "wallet" && (
                <div className="text-xs text-green-600">
                  Funds have been transferred directly to the beneficiary wallet.
                </div>
              )}
              
              {txHash && (
                <div className="mt-2 space-y-1">
                  <div className="text-xs text-gray-600">Transaction Hash:</div>
                  <div className="flex flex-col gap-1">
                    <a
                      href={`https://sepolia.celoscan.io/tx/${txHash}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs underline break-all"
                    >
                      View on CeloScan: {txHash.slice(0, 10)}...{txHash.slice(-8)}
                    </a>
                    <a
                      href={`https://explorer.celo.org/sepolia/tx/${txHash}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs underline break-all"
                    >
                      View on Celo Explorer
                    </a>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Approval Status */}
          {needsApproval && (
            <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 px-4 py-3 rounded-xl text-sm">
              <p className="font-semibold">⚠️ Approval Required</p>
              <p className="text-xs mt-1">
                Please approve the contract to spend your cUSD. This is a one-time action per wallet.
              </p>
              {(isApproving || isApprovingConfirming) && (
                <p className="text-xs mt-2 italic">⏳ Waiting for approval confirmation...</p>
              )}
            </div>
          )}

          {/* Send Button */}
          <button
            onClick={handleSend}
            disabled={isPending || isConfirming || isCheckingAllowance || isApproving || isApprovingConfirming}
            className="w-full bg-celo-green text-white py-4 px-6 rounded-xl font-semibold shadow-md hover:bg-primary-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {(isPending || isConfirming || isCheckingAllowance || isApproving || isApprovingConfirming) ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>
                  {isCheckingAllowance 
                    ? "Checking allowance..." 
                    : isApproving || isApprovingConfirming
                    ? "Approving..."
                    : isPending 
                    ? "Confirming..." 
                    : "Processing..."}
                </span>
              </>
            ) : (
              <>
                <Send className="w-5 h-5" />
                <span>Send Remittance</span>
              </>
            )}
          </button>

          {/* Contract Info */}
          <div className="text-xs text-gray-500 text-center pt-4 border-t border-gray-200">
            Contract: {contractAddress.slice(0, 6)}...{contractAddress.slice(-4)}
          </div>
        </div>
      </div>
    </div>
  );
}


