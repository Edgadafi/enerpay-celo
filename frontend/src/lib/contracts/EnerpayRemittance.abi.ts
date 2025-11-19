/**
 * ABI for EnerpayRemittance Smart Contract
 * Generated from contracts/EnerpayRemittance.sol
 */

export const ENERPAY_REMITTANCE_ABI = [
  {
    inputs: [
      { internalType: "address", name: "_cUSD", type: "address" },
      { internalType: "address", name: "_treasuryAddress", type: "address" },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [{ internalType: "address", name: "owner", type: "address" }],
    name: "OwnableInvalidOwner",
    type: "error",
  },
  {
    inputs: [{ internalType: "address", name: "account", type: "address" }],
    name: "OwnableUnauthorizedAccount",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "remittanceId",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "sender",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "beneficiary",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      { indexed: false, internalType: "uint256", name: "fee", type: "uint256" },
      {
        indexed: false,
        internalType: "string",
        name: "destinationType",
        type: "string",
      },
      {
        indexed: false,
        internalType: "string",
        name: "destinationId",
        type: "string",
      },
    ],
    name: "RemittanceCreated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "remittanceId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "enum EnerpayRemittance.RemittanceStatus",
        name: "status",
        type: "uint8",
      },
    ],
    name: "RemittanceCompleted",
    type: "event",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "newOwner", type: "address" }],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "cUSD",
    outputs: [{ internalType: "contract IERC20", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "treasuryAddress",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "platformFee",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    name: "remittances",
    outputs: [
      { internalType: "address", name: "sender", type: "address" },
      { internalType: "address", name: "beneficiary", type: "address" },
      { internalType: "uint256", name: "amount", type: "uint256" },
      { internalType: "string", name: "destinationType", type: "string" },
      { internalType: "string", name: "destinationId", type: "string" },
      { internalType: "uint256", name: "timestamp", type: "uint256" },
      {
        internalType: "enum EnerpayRemittance.RemittanceStatus",
        name: "status",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "remittanceCount",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "userRemittances",
    outputs: [{ internalType: "uint256[]", name: "", type: "uint256[]" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "_beneficiary", type: "address" },
      { internalType: "uint256", name: "_amount", type: "uint256" },
      { internalType: "string", name: "_destinationType", type: "string" },
      { internalType: "string", name: "_destinationId", type: "string" },
    ],
    name: "sendRemittance",
    outputs: [{ internalType: "uint256", name: "remittanceId", type: "uint256" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "_remittanceId", type: "uint256" },
      {
        internalType: "enum EnerpayRemittance.RemittanceStatus",
        name: "_status",
        type: "uint8",
      },
    ],
    name: "completeRemittance",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "_user", type: "address" }],
    name: "getRemittanceHistory",
    outputs: [{ internalType: "uint256[]", name: "", type: "uint256[]" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "_remittanceId", type: "uint256" }],
    name: "getRemittance",
    outputs: [
      {
        components: [
          { internalType: "address", name: "sender", type: "address" },
          { internalType: "address", name: "beneficiary", type: "address" },
          { internalType: "uint256", name: "amount", type: "uint256" },
          { internalType: "string", name: "destinationType", type: "string" },
          { internalType: "string", name: "destinationId", type: "string" },
          { internalType: "uint256", name: "timestamp", type: "uint256" },
          {
            internalType: "enum EnerpayRemittance.RemittanceStatus",
            name: "status",
            type: "uint8",
          },
        ],
        internalType: "struct EnerpayRemittance.Remittance",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "_amount", type: "uint256" }],
    name: "calculateFee",
    outputs: [
      { internalType: "uint256", name: "fee", type: "uint256" },
      { internalType: "uint256", name: "totalAmount", type: "uint256" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "_newFee", type: "uint256" }],
    name: "setPlatformFee",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "_newTreasury", type: "address" }],
    name: "setTreasuryAddress",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "_amount", type: "uint256" },
      { internalType: "address", name: "_to", type: "address" },
    ],
    name: "emergencyWithdraw",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

// Remittance Status Enum
export enum RemittanceStatus {
  Pending = 0,
  Completed = 1,
  Failed = 2,
  Refunded = 3,
}

// Remittance Status Labels
export const REMITTANCE_STATUS_LABELS = {
  [RemittanceStatus.Pending]: "Pending",
  [RemittanceStatus.Completed]: "Completed",
  [RemittanceStatus.Failed]: "Failed",
  [RemittanceStatus.Refunded]: "Refunded",
} as const;


