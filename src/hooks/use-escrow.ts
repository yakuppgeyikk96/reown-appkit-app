import { Program, AnchorProvider, web3, BN } from "@project-serum/anchor";
import { PublicKey } from "@solana/web3.js";
import { toast } from "sonner";
import { IDL } from "@/idl/digital_marketplace";
import { useAppKitAccount, useAppKitProvider } from "@reown/appkit/react";
import { Provider } from "@reown/appkit-adapter-solana";
import { useState } from "react";
import { useSolana } from "./useSolana";
import { ESCROW_PROGRAM_ID } from "@/config";

export const useEscrow = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { address } = useAppKitAccount();
  const { walletProvider } = useAppKitProvider<Provider>("solana");

  const { connection } = useSolana();

  const getProgram = () => {
    if (!address || !walletProvider) {
      throw new Error("Wallet not connected");
    }

    const provider = new AnchorProvider(
      connection,
      {
        publicKey: new PublicKey(address),
        signTransaction: (tx) => walletProvider.signTransaction(tx),
        signAllTransactions: (txs) => walletProvider.signAllTransactions(txs),
      },
      {
        commitment: "confirmed",
      }
    );

    return new Program(IDL, ESCROW_PROGRAM_ID, provider);
  };

  const listProduct = async (price: number, metadataUri: string) => {
    if (!address || !walletProvider) {
      toast.error("Please connect your wallet");
      return null;
    }

    setIsLoading(true);

    try {
      const program = getProgram();

      const uniqueSeed = web3.Keypair.generate().publicKey.toBytes();
      console.log("List unique seed:", uniqueSeed);

      const [productAccount] = await PublicKey.findProgramAddress(
        [Buffer.from("product"), new PublicKey(address).toBuffer(), uniqueSeed],
        new PublicKey(ESCROW_PROGRAM_ID)
      );

      const tx = await program.methods
        .listProduct(
          new BN(price * web3.LAMPORTS_PER_SOL),
          metadataUri,
          Buffer.from(uniqueSeed)
        )
        .accounts({
          seller: new PublicKey(address),
          productAccount,
          systemProgram: web3.SystemProgram.programId,
        })
        .rpc();

      return {
        tx,
        productAccount: productAccount.toString(),
        uniqueSeed: Buffer.from(uniqueSeed).toString("hex"),
      };
    } catch (error) {
      console.error("List product error:", error);
      toast.error("Failed to list product");
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    listProduct,
    isLoading,
    program: getProgram(),
  };
};
