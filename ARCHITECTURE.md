# 🏗️ Enerpay Technical Architecture

> Deep dive into the technical design and implementation of Enerpay

---

## Overview

Enerpay is built as a **mobile-first, decentralized financial platform** with three main layers:

1. **Frontend Layer** - Next.js PWA with wallet integration
2. **Smart Contract Layer** - Solidity contracts on Celo
3. **Blockchain Layer** - Celo network with stablecoins

---

## System Architecture

### High-Level Architecture

```
┌─────────────────────────────────────────────┐
│         User Interface (Next.js PWA)         │
│  - Wallet Management                         │
│  - Payment UI                                │
│  - Remittance Flow                           │
│  - Microfinance Dashboard                    │
│  - Reputation Display                        │
└──────────────┬───────────────────────────────┘
               │
               │ Wallet Connect / Valora SDK
               │
┌──────────────▼───────────────────────────────┐
│      Smart Contracts (Solidity)               │
│  ┌─────────────────────────────────────┐     │
│  │ PaymentRouter.sol                   │     │
│  │ - Handle payments                   │     │
│  │ - Multi-token support                │     │
│  │ - Fee management                     │     │
│  └─────────────────────────────────────┘     │
│  ┌─────────────────────────────────────┐     │
│  │ RemittancePool.sol                   │     │
│  │ - Liquidity pools                    │     │
│  │ - Rate conversion                    │     │
│  │ - Cross-border settlement            │     │
│  └─────────────────────────────────────┘     │
│  ┌─────────────────────────────────────┐     │
│  │ ReputationSystem.sol                 │     │
│  │ - SBT issuance                       │     │
│  │ - Reputation levels                  │     │
│  │ - Non-transferable                   │     │
│  └─────────────────────────────────────┘     │
│  ┌─────────────────────────────────────┐     │
│  │ CreditScore.sol                     │     │
│  │ - Score calculation                 │     │
│  │ - On-chain storage                  │     │
│  │ - Public queries                     │     │
│  └─────────────────────────────────────┘     │
│  ┌─────────────────────────────────────┐     │
│  │ MicrofinancePool.sol                 │     │
│  │ - Lending logic                      │     │
│  │ - Interest rates                     │     │
│  │ - Repayment tracking                  │     │
│  └─────────────────────────────────────┘     │
└──────────────┬───────────────────────────────┘
               │
               │ Celo RPC
               │
┌──────────────▼───────────────────────────────┐
│         Celo Blockchain                       │
│  - cUSD / cREAL / cEUR transfers            │
│  - On-chain reputation (SBT)                │
│  - Transaction history                       │
│  - Smart contract state                      │
└─────────────────────────────────────────────┘
```

---

## Smart Contract Architecture

### 1. PaymentRouter.sol

**Purpose:** Handle payments between users

**Key Functions:**
```solidity
function sendPayment(
    address recipient,
    uint256 amount,
    address token // cUSD, cREAL, etc.
) external;

function payMerchant(
    address merchant,
    uint256 amount,
    bytes32 orderId
) external;

function payCooperative(
    address cooperative,
    uint256 amount,
    address[] calldata signers
) external;
```

**Features:**
- Multi-token support (cUSD, cREAL, cEUR)
- Fee structure (0.1-0.3%)
- Event emissions for frontend
- Gas optimization

### 2. RemittancePool.sol

**Purpose:** Manage liquidity for cross-border remittances

**Key Functions:**
```solidity
function addLiquidity(uint256 amount) external;
function removeLiquidity(uint256 amount) external;
function sendRemittance(
    address recipient,
    uint256 amount,
    string calldata destinationCountry
) external;
function getExchangeRate(string calldata country) external view returns (uint256);
```

**Features:**
- Liquidity provider rewards
- Exchange rate management
- Cross-border settlement
- Fee distribution

### 3. ReputationSystem.sol

**Purpose:** Issue and manage reputation SBTs

**Key Functions:**
```solidity
function calculateReputation(address user) external view returns (uint256);
function issueReputationSBT(address user, uint8 level) external;
function updateReputation(address user) external;
```

**Reputation Levels:**
- Bronze (0-100 points)
- Silver (101-500 points)
- Gold (501-2000 points)
- Platinum (2000+ points)

**Scoring Factors:**
- Payment history (completed transactions)
- Transaction volume
- Time on platform
- User references

### 4. CreditScore.sol

**Purpose:** Calculate and store credit scores

**Key Functions:**
```solidity
function calculateCreditScore(address user) external view returns (uint256);
function updateCreditScore(address user) external;
function getCreditScore(address user) external view returns (uint256);
```

**Algorithm:**
```
score = (payment_history * 0.4) + 
        (transaction_volume * 0.3) + 
        (time_on_platform * 0.2) + 
        (references * 0.1)
```

### 5. MicrofinancePool.sol

**Purpose:** Manage community lending pool

**Key Functions:**
```solidity
function requestLoan(uint256 amount, uint256 duration) external;
function approveLoan(uint256 loanId) external;
function repayLoan(uint256 loanId, uint256 amount) external;
function liquidateLoan(uint256 loanId) external;
```

**Features:**
- Reputation-based eligibility
- Dynamic interest rates
- Auto-repayment
- Liquidation mechanism

---

## Frontend Architecture

### Project Structure

```
frontend/
├── src/
│   ├── app/                    # Next.js pages
│   │   ├── page.tsx           # Landing
│   │   ├── wallet/            # Wallet dashboard
│   │   ├── send/              # Send payment
│   │   ├── receive/           # Receive payment
│   │   ├── remittance/        # Remittances
│   │   ├── credit/            # Microcredit
│   │   └── reputation/        # Reputation
│   │
│   ├── components/
│   │   ├── wallet/           # Wallet components
│   │   ├── payment/          # Payment components
│   │   ├── remittance/       # Remittance components
│   │   └── credit/           # Credit components
│   │
│   ├── lib/
│   │   ├── celo/             # Celo integration
│   │   ├── contracts/        # Contract interactions
│   │   └── utils/            # Utilities
│   │
│   └── hooks/
│       ├── useWallet.ts      # Wallet hook
│       ├── usePayment.ts     # Payment hook
│       └── useReputation.ts   # Reputation hook
│
└── public/                    # Static assets
```

### Key Components

**WalletConnect Component:**
- Integrates with Valora/Celo Wallet
- Handles connection/disconnection
- Manages account state

**PaymentForm Component:**
- Input for recipient and amount
- Token selection (cUSD/cREAL)
- QR scanner for addresses
- Transaction confirmation

**RemittanceFlow Component:**
- Country selection
- Amount input
- Exchange rate display
- Transaction tracking

**CreditApplication Component:**
- Loan amount input
- Duration selection
- Reputation display
- Approval status

---

## Data Flow

### Payment Flow

```
User → [Frontend] → [Wallet Connect] → [PaymentRouter Contract]
                                                    ↓
                                            [Celo Blockchain]
                                                    ↓
                                            [Recipient Receives]
                                                    ↓
                                            [Reputation Updated]
```

### Remittance Flow

```
User → [Select Countries] → [Enter Amount] → [Convert to cUSD]
                                                    ↓
                                            [RemittancePool Contract]
                                                    ↓
                                            [Cross-Border Transfer]
                                                    ↓
                                            [Recipient Receives]
```

### Microcredit Flow

```
User → [Check Reputation] → [Request Loan] → [CreditScore Check]
                                                    ↓
                                            [MicrofinancePool Approval]
                                                    ↓
                                            [Funds Disbursed]
                                                    ↓
                                            [Repayment Tracking]
```

---

## Security Considerations

### Smart Contract Security
- Comprehensive input validation
- Reentrancy guards
- Access control (Ownable/Roles)
- Overflow/underflow protection
- Event logging for transparency

### Frontend Security
- Wallet connection validation
- Transaction signing verification
- Error handling and user feedback
- Rate limiting (if needed)

### Reputation System Security
- SBT non-transferability
- Score calculation transparency
- On-chain verification
- Prevention of gaming/manipulation

---

## Performance Optimizations

### Smart Contracts
- Gas-efficient operations
- Batch transactions where possible
- Minimal storage writes
- Event-based indexing

### Frontend
- PWA caching
- Lazy loading
- Optimistic UI updates
- RPC connection pooling

---

## Integration Points

### Celo Ecosystem
- **Valora Wallet** - Primary wallet integration
- **Mento Protocol** - Stablecoin swaps
- **Ubeswap** - DEX integration (if needed)
- **Celo Composer** - Development boilerplate

### External Services
- **IPFS** - Metadata storage
- **Exchange Rate APIs** - For remittances
- **Push Notifications** - Transaction alerts (optional)

---

## Deployment Strategy

### Testnet (Alfajores)
1. Deploy contracts to Alfajores
2. Test all functionality
3. User acceptance testing
4. Security review

### Mainnet
1. Final security audit
2. Deploy contracts to Celo Mainnet
3. Initialize pools and parameters
4. Gradual rollout
5. Monitor and iterate

---

## Future Enhancements

- Cross-chain support (via Wormhole)
- Layer 2 integration
- Advanced analytics
- Mobile app (React Native)
- API for third-party integrations
- Governance token ($ENERGY)

---

**Last Updated:** November 2024

