# 🚀 PINJOC Lending & Borrowing Page

## 📜 Description

PINJOC is a decentralized fixed-rate lending protocol that revolutionizes DeFi lending by implementing a market-driven interest rate mechanism. Built on the Monad Network, the protocol leverages CLOB (Central Limit Order Book) technology from pinjoc clob to ensure efficient price discovery and optimal interest rate determination based on real-time supply and demand dynamics.

This page serves as the main interface for borrowing, lending, and managing assets within the PINJOC ecosystem.

🔗 [GitHub Repository](https://github.com/pinjoc-labs/frontend)

---

## 🛠️ Tech Stack

- **React.js** - Frontend framework
- **TypeScript** - Type-safe JavaScript for better maintainability
- **Tailwind CSS** - Utility-first CSS framework for styling
- **ShadCN UI** - Modern UI components
- **RainbowKit** - Ethereum wallet connection
- **Privy Wallet** - Secure and seamless wallet connection
- **Wagmi** - React hooks for Ethereum-based applications

---

## 🎯 Features

### 📊 Market Overview & Orderbook
- Users can browse available markets for borrowing and lending.
- The order book displays real-time data on borrowing and lending offers.
- Users can place orders to borrow or lend assets directly through the interface.

### 💼 Portfolio Management
- **Borrowers**:
  - View borrowed assets.
  - **Repay Loan**: A button to repay borrowed funds.
  - **Add Collateral**: Increase collateral to maintain loan health.
- **Lenders**:
  - View lent assets.
  - **Withdraw Funds**: Retrieve lent assets when eligible.

### 🔄 Tokenized Bonds (Secondary Market)
- Tokenized representations of lent assets can be traded.
- Users can buy and sell bonds obtained from lending transactions.
- Enables additional liquidity and secondary market participation.

### 📜 Transaction History
- Logs all past borrowing, lending, and repayment activities.
- Displays order book interactions and secondary market trades.
- Provides a clear overview of financial activity within the protocol.

---

## 🚀 Deployment Guide

Follow these steps to deploy the PINJOC Lending & Borrowing Page:

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/pinjoc-labs/frontend.git
cd frontend
```

### 2️⃣ Install Dependencies
```bash
npm install
```

### 3️⃣ Start Development Server
```bash
npm run dev
```
This will start a local development server at `http://localhost:3000/`.

### 4️⃣ Build for Production
```bash
npm run build
```

### 5️⃣ Deploy to Vercel
Ensure you have the Vercel CLI installed:
```bash
npm install -g vercel
vercel login
vercel
```
Follow the on-screen instructions to complete deployment.

---

## 🔗 Smart Contract Integration
- The page is fully integrated with the PINJOC smart contracts.
- Data displayed is currently using dummy values for testing purposes.
- Live smart contract data can be integrated when ready.

For further inquiries, feel free to reach out!

