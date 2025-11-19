# 💚 Enerpay - Financial Inclusion Platform for LATAM

> **Empowering communities through mobile payments, remittances, and microfinance on Celo**

Enerpay is a decentralized financial platform built on Celo, designed to bring financial services to underserved communities in Latin America. Through a lightweight mobile wallet, instant payments, simplified remittances, and community-based microfinance, Enerpay enables financial inclusion for millions.

---

## 🌟 Vision

**Financial inclusion for everyone, everywhere.**

Enerpay leverages Celo's mobile-first blockchain and stablecoins to provide:
- 💳 **Instant Payments** - Send and receive money instantly using cUSD/cREAL
- 🌍 **Simplified Remittances** - Low-cost cross-border transfers
- 💰 **Microfinance** - Access to credit based on on-chain reputation
- 🏆 **Reputation System** - Build creditworthiness through blockchain activity

---

## 🚀 Key Features

### 1. Lightweight Mobile Wallet
- Create/import wallet in seconds
- View balances (cUSD, cREAL, CELO)
- Transaction history
- QR code for receiving payments
- PWA-first design (works offline)

### 2. Instant Payments
- Send/receive payments between users
- Pay merchants via QR scanning
- Pay cooperatives (multi-sig support)
- Push notifications (optional)

### 3. Simplified Remittances
- Select origin/destination country
- Convert local currency → cUSD
- Instant settlement
- Transaction tracking
- Low fees (<1%)

### 4. On-Chain Reputation System
- Credit score based on:
  - Payment history
  - Transaction volume
  - Time on platform
  - User references
- Stored as Soulbound Token (SBT)
- Non-transferable, verifiable
- Used for microcredit eligibility

### 5. Decentralized Microfinance
- Request microcredit (reputation-based)
- Community liquidity pools
- Flexible terms (APR based on score)
- Auto-repayment with stablecoins
- Rewards for responsible consumption

---

## 🏗️ Architecture

### Tech Stack

**Frontend:**
- Next.js 14 (PWA-first)
- TypeScript
- Tailwind CSS
- Celo Wallet Connect / Valora SDK

**Blockchain:**
- Celo (Alfajores testnet → Mainnet)
- Solidity smart contracts
- Hardhat/Foundry for development

**Stablecoins:**
- cUSD (Celo Dollar)
- cREAL (Celo Real)
- cEUR (Celo Euro)

**Storage:**
- IPFS (metadata)
- Celo blockchain (on-chain data)

### System Architecture

```
┌─────────────────────────────────────┐
│   Frontend (Next.js PWA)            │
│   - Wallet Integration              │
│   - Payment UI                      │
│   - Remittance Flow                 │
│   - Microfinance Dashboard          │
└──────────────┬──────────────────────┘
               │
┌──────────────▼──────────────────────┐
│   Smart Contracts (Solidity)         │
│   - PaymentRouter.sol                │
│   - RemittancePool.sol               │
│   - CreditScore.sol                  │
│   - ReputationSystem.sol             │
│   - MicrofinancePool.sol             │
└──────────────┬──────────────────────┘
               │
┌──────────────▼──────────────────────┐
│   Celo Blockchain                     │
│   - cUSD/cREAL transfers              │
│   - On-chain reputation               │
│   - Transaction history               │
└─────────────────────────────────────┘
```

---

## 📦 Installation & Setup

### Prerequisites
- Node.js 18+
- npm or yarn
- Git
- Celo wallet (Valora or Celo Wallet)

### Quick Start

```bash
# Clone repository
git clone https://github.com/YOUR_USERNAME/enerpay.git
cd enerpay

# Install dependencies
cd frontend
npm install

# Setup environment
cp .env.example .env.local
# Edit .env.local with your config

# Run development server
npm run dev
```

### Smart Contracts

```bash
# Setup contracts
cd contracts
npm install

# Compile
npx hardhat compile

# Deploy to Alfajores
npx hardhat run scripts/deploy.js --network alfajores
```

---

## 🎯 Use Cases

### 1. Daily Payments
**Scenario:** Maria pays for groceries at a local store
- Opens Enerpay wallet
- Scans merchant QR code
- Sends 50 cUSD
- Transaction confirmed in <3 seconds
- Merchant receives payment instantly

### 2. Remittances
**Scenario:** Juan sends money from USA to Mexico
- Opens remittance flow
- Selects USA → Mexico
- Enters $200 USD
- Converts to cUSD
- Sends to recipient's wallet
- Recipient receives 200 cUSD (~3,600 MXN)
- Cost: <$2 (vs $10-15 traditional)

### 3. Microcredit
**Scenario:** Carlos needs a small loan
- Has good reputation (Gold level)
- Requests 500 cUSD microcredit
- Approved based on on-chain score
- Receives funds instantly
- Repays over 6 months
- Builds better reputation

### 4. Cooperative Payments
**Scenario:** Community cooperative receives payments
- Multiple members sign transactions
- Multi-sig wallet for security
- Transparent on-chain accounting
- Members can verify payments

---

## 🔐 Security

- **Non-custodial** - Users control their keys
- **On-chain verification** - All transactions verifiable
- **Reputation system** - Prevents fraud
- **Multi-sig support** - For cooperatives
- **Smart contract audits** - Before mainnet

---

## 🛣️ Roadmap

### Phase 1: MVP (Nov-Dec 2025)
- [x] Project setup
- [ ] Smart contracts (PaymentRouter, ReputationSystem)
- [ ] Frontend wallet integration
- [ ] Basic payment flow
- [ ] Remittance flow
- [ ] Deploy to Alfajores

### Phase 2: Microfinance (Q1 2026)
- [ ] CreditScore contract
- [ ] MicrofinancePool contract
- [ ] Credit application UI
- [ ] Reputation dashboard
- [ ] Testing & security audit

### Phase 3: Mainnet & Growth (Q2 2026)
- [ ] Mainnet deployment
- [ ] Mobile app (React Native)
- [ ] Partnerships with cooperatives
- [ ] User acquisition
- [ ] Marketing campaign

---

## 🤝 Contributing

We welcome contributions! See [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines.

**Priority Areas:**
- Smart contract development
- Frontend improvements
- Mobile app development
- Documentation
- Testing

---

## 📄 License

MIT License - see [LICENSE](./LICENSE) for details.

---

## 🙏 Acknowledgments

- **Celo Foundation** - For the mobile-first blockchain
- **Mento Protocol** - For stablecoin infrastructure
- **Valora** - For wallet SDK
- **Buildathon Celo México** - For the opportunity

---

## 📞 Contact & Links

- **GitHub**: [github.com/YOUR_USERNAME/enerpay](https://github.com/YOUR_USERNAME/enerpay)
- **Demo**: [Coming soon]
- **Documentation**: [docs.enerpay.io](https://docs.enerpay.io) (coming soon)

---

## 🎯 Built for Celo Buildathon México 2025

**Project:** Enerpay  
**Team:** Edgadafi  
**Category:** Payments & Finance / Impact & Sustainability  
**Blockchain:** Celo  
**Status:** In Development

---

**Made with ❤️ for financial inclusion in LATAM**

