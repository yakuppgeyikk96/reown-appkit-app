type SolanaNetwork = "mainnet" | "devnet" | "testnet";

export const getSolanaExplorerLink = (
  address: string | null,
  network: SolanaNetwork
) => {
  if (!address) return "";
  return `https://explorer.solana.com/address/${address}?cluster=${network}`;
};
