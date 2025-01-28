# YG Digital Marketplace
A decentralized marketplace built on Solana blockchain for digital products.

## Features

- 🔐 Secure Authentication with Reown Appkit on Solana
- 💰 List & Sell Digital Products
- 🛒 Purchase Products with SOL
- 🔍 View Purchase History
- ⛓️ Blockchain-based Ownership Verification

## Tech Stack

- **Frontend:**
  - Next.js 15 (App Router)
  - Reown Appkit
  - Pinata Cloud
  - Web3.js Solana
  - TailwindCSS
  - shadcn/ui
  - TypeScript

- **Backend:**
  - MongoDB
  - Prisma ORM
  - Solana Blockchain
  - Anchor Framework

- **State Management & Data Fetching:**
  - TanStack Query
  - Server Actions
  - Zod, react-hook-form

## Getting Started

First set up your env variables:
 - NEXT_PUBLIC_REOWN_PROJECTID = --your-reown-project-id--
 - NEXT_PUBLIC_PINATA_API_KEY = --your-pinata-api-key--
 - NEXT_PUBLIC_PINATA_API_SECRET = --your-pinata-api-secret--
 - NEXT_PUBLIC_PINATA_JWT = --your-pinata-cloud-jwt--
 - DATABASE_URL = --your-mongodb-connection-uri--


Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

