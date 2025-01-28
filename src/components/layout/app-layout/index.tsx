"use client";

import Footer from "@/components/footer";
import Header from "@/components/header";
import { ReactNode } from "react";
import { createAppKit } from "@reown/appkit/react";
import { SolanaAdapter } from "@reown/appkit-adapter-solana";
import {
  PhantomWalletAdapter,
  SolflareWalletAdapter,
} from "@solana/wallet-adapter-wallets";
import { solanaDevnet } from "@reown/appkit/networks";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";

const solanaAdapter = new SolanaAdapter({
  wallets: [new PhantomWalletAdapter(), new SolflareWalletAdapter()],
});

const projectId = process.env.NEXT_PUBLIC_REOWN_PROJECTID;

const metadata = {
  name: "nft-marketplace",
  description: "AppKit Example",
  url: "http://localhost:3000",
  icons: ["https://assets.reown.com/reown-profile-pic.png"],
};

createAppKit({
  adapters: [solanaAdapter],
  networks: [solanaDevnet],
  metadata,
  projectId: projectId || "",
  features: {
    analytics: true,
  },
});

const queryClient = new QueryClient();

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="container max-w-screen-xl mx-auto flex-1">
          {children}
        </main>
        <Footer />
      </div>
      <Toaster />
    </QueryClientProvider>
  );
}
