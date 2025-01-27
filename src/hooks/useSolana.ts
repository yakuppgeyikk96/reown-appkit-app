/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Connection,
  clusterApiUrl,
  PublicKey,
  Transaction,
  Keypair,
  SystemProgram,
} from "@solana/web3.js";
import { useAppKitAccount, useAppKitProvider } from "@reown/appkit/react";
import { Provider } from "@reown/appkit-adapter-solana";
import { toast } from "sonner";
import { useState, useMemo } from "react";
import { getAssociatedTokenAddress } from "@solana/spl-token";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { createProductToken } from "@/app/actions/mint-token";

export const useSolana = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { address } = useAppKitAccount();
  const { walletProvider } = useAppKitProvider<Provider>("solana");

  /**
   * Create a connection to the Solana network
   */
  const connection = useMemo(
    () => new Connection(clusterApiUrl("devnet"), "confirmed"),
    []
  );

  // const getProgram = () => {
  //   if (!walletProvider) throw new Error("Wallet not connected");

  //   const provider = new AnchorProvider(connection, walletProvider as any, {
  //     commitment: "confirmed",
  //   });

  //   return new Program(
  //     escrow_idl as any,
  //     new PublicKey(ESCROW_PROGRAM_ID),
  //     provider
  //   );
  // };

  // const getEscrowAuthority = async (escrowAccountKey: PublicKey) => {
  //   const [escrowAuthority, bump] = await PublicKey.findProgramAddress(
  //     [Buffer.from("escrow"), escrowAccountKey.toBytes()],
  //     new PublicKey(ESCROW_PROGRAM_ID)
  //   );
  //   return { escrowAuthority, bump };
  // };

  // const depositToken = async (mintAddress: string) => {
  //   if (!address || !walletProvider) {
  //     toast.error("Please connect your wallet");
  //     return null;
  //   }

  //   try {
  //     setIsLoading(true);
  //     const program = getProgram();

  //     // Escrow account için yeni bir keypair oluştur
  //     const escrowAccount = Keypair.generate();

  //     // Escrow authority PDA'sını hesapla
  //     const { escrowAuthority, bump } = await getEscrowAuthority(
  //       escrowAccount.publicKey
  //     );

  //     // Token hesaplarını bul
  //     const initializerDepositTokenAccount = await getAssociatedTokenAddress(
  //       new PublicKey(mintAddress),
  //       new PublicKey(address)
  //     );

  //     // WSOL için ATA
  //     const WSOL_MINT = new PublicKey(
  //       "So11111111111111111111111111111111111111112"
  //     );
  //     const initializerReceiveTokenAccount = await getAssociatedTokenAddress(
  //       WSOL_MINT,
  //       new PublicKey(address)
  //     );

  //     // Önce token transferi için approval
  //     const approveIx = createApproveInstruction(
  //       initializerDepositTokenAccount, // from
  //       initializerDepositTokenAccount, // delegate
  //       new PublicKey(address), // owner
  //       1 // amount
  //     );

  //     // Initialize işlemini çağır
  //     const tx = await program.methods
  //       .initialize(new BN(1), bump)
  //       .accounts({
  //         initializer: new PublicKey(address),
  //         initializerDepositTokenAccount,
  //         initializerReceiveTokenAccount,
  //         escrowAccount: escrowAccount.publicKey,
  //         escrowAuthority,
  //         systemProgram: SystemProgram.programId,
  //         tokenProgram: TOKEN_PROGRAM_ID,
  //         rent: SYSVAR_RENT_PUBKEY,
  //       })
  //       .preInstructions([approveIx])
  //       .signers([escrowAccount])
  //       .rpc({ skipPreflight: true }); // Preflight check'i devre dışı bırak

  //     console.log("Escrow initialized:", tx);
  //     return {
  //       tx,
  //       escrowAccount: escrowAccount.publicKey.toString(),
  //     };
  //   } catch (error) {
  //     console.error("Deposit token error:", error);
  //     toast.error("Failed to deposit token");
  //     return null;
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  // const cancelEscrow = async (
  //   escrowAccount: PublicKey,
  //   depositTokenAccount: PublicKey
  // ) => {
  //   if (!address || !walletProvider) {
  //     toast.error("Please connect your wallet");
  //     return null;
  //   }

  //   try {
  //     const program = getProgram();
  //     const escrowAuthority = await getEscrowAuthority(escrowAccount);

  //     return await program.methods
  //       .cancel()
  //       .accounts({
  //         initializer: new PublicKey(address),
  //         initializerDepositTokenAccount: depositTokenAccount,
  //         escrowAccount,
  //         escrowAuthority: escrowAuthority.escrowAuthority,
  //         tokenProgram: TOKEN_PROGRAM_ID,
  //       })
  //       .rpc();
  //   } catch (error) {
  //     console.error("Cancel escrow error:", error);
  //     toast.error("Failed to cancel escrow");
  //     return null;
  //   }
  // };

  // const exchangeToken = async (
  //   escrowAccount: PublicKey,
  //   takerDepositTokenAccount: PublicKey,
  //   takerReceiveTokenAccount: PublicKey,
  //   initializerDepositTokenAccount: PublicKey,
  //   initializerReceiveTokenAccount: PublicKey
  // ) => {
  //   if (!address || !walletProvider) {
  //     toast.error("Please connect your wallet");
  //     return null;
  //   }

  //   try {
  //     const program = getProgram();
  //     const escrowAuthority = await getEscrowAuthority(escrowAccount);

  //     return await program.methods
  //       .exchange()
  //       .accounts({
  //         taker: new PublicKey(address),
  //         takerDepositTokenAccount,
  //         takerReceiveTokenAccount,
  //         initializerDepositTokenAccount,
  //         initializerReceiveTokenAccount,
  //         escrowAccount,
  //         escrowAuthority: escrowAuthority.escrowAuthority,
  //         tokenProgram: TOKEN_PROGRAM_ID,
  //       })
  //       .rpc();
  //   } catch (error) {
  //     console.error("Exchange token error:", error);
  //     toast.error("Failed to exchange token");
  //     return null;
  //   }
  // };

  const createToken = async () => {
    if (!address || !walletProvider) {
      toast.error("Please connect your wallet");
      return null;
    }

    try {
      setIsLoading(true);
      const result = await createProductToken(address);

      if (!result.success || !result.mintAddress || !result.transaction)
        return null;

      const transaction = Transaction.from(
        Buffer.from(result.transaction, "base64")
      );

      const { blockhash } = await connection.getLatestBlockhash("confirmed");

      transaction.recentBlockhash = blockhash;
      transaction.feePayer = new PublicKey(address);

      const mintKeypair = Keypair.fromSecretKey(
        Buffer.from(result.mintSecretKey, "base64")
      );

      transaction.partialSign(mintKeypair);
      const signature = await walletProvider.signTransaction(transaction);

      const txHash = await connection.sendRawTransaction(signature.serialize());

      await connection.confirmTransaction(txHash);

      return result.mintAddress;
    } catch (error) {
      console.error("Create token error:", error);
      toast.error("Failed to create token");
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const purchaseProduct = async (
    sellerAddress: string,
    price: number
  ): Promise<boolean> => {
    if (!address || !walletProvider) {
      toast.error("Please connect your wallet");
      return false;
    }

    try {
      setIsLoading(true);

      const transferProgram = SystemProgram.transfer({
        fromPubkey: new PublicKey(address),
        toPubkey: new PublicKey(sellerAddress),
        lamports: Math.floor(price * LAMPORTS_PER_SOL),
      });

      const transaction = new Transaction().add(transferProgram);

      transaction.recentBlockhash = (
        await connection.getLatestBlockhash()
      ).blockhash;
      transaction.feePayer = new PublicKey(address);

      const signature = await walletProvider.signTransaction(transaction);
      const txHash = await connection.sendRawTransaction(signature.serialize());
      await connection.confirmTransaction(txHash);

      return true;
    } catch (error) {
      console.error("Purchase product error:", error);
      toast.error("Failed to purchase product");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const checkTokenOwnership = async (mintAddress: string): Promise<boolean> => {
    if (!address) return false;

    try {
      const tokenAccount = await getAssociatedTokenAddress(
        new PublicKey(mintAddress),
        new PublicKey(address)
      );

      const balance = await connection.getTokenAccountBalance(tokenAccount);
      return (balance.value.uiAmount ?? 0) > 0;
    } catch (error) {
      console.error("Check token ownership error:", error);
      return false;
    }
  };

  return {
    isLoading,
    createToken,
    purchaseProduct,
    checkTokenOwnership,
    connection,
    walletAddress: address,
    walletProvider,
  };
};
