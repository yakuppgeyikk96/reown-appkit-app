"use server";

import {
  Connection,
  PublicKey,
  Transaction,
  SystemProgram,
  Keypair,
  clusterApiUrl,
} from "@solana/web3.js";
import {
  createInitializeMintInstruction,
  TOKEN_PROGRAM_ID,
  MINT_SIZE,
  getMinimumBalanceForRentExemptMint,
} from "@solana/spl-token";

export async function createProductToken(walletAddress: string) {
  try {
    const connection = new Connection(clusterApiUrl("devnet"));
    const walletPublicKey = new PublicKey(walletAddress);

    /**
     * Create a new keypair for the mint
     */
    const mintKeypair = Keypair.generate();

    /**
     * Create a new transaction
     */
    const transaction = new Transaction();

    /**
     * Get the latest blockhash
     */
    const { blockhash } = await connection.getLatestBlockhash();
    transaction.recentBlockhash = blockhash;
    transaction.feePayer = walletPublicKey;

    /**
     * Calculate the rent for the mint account
     */
    const lamports = await getMinimumBalanceForRentExemptMint(connection);

    /**
     * Add the instructions to the transaction
     */
    transaction.add(
      SystemProgram.createAccount({
        fromPubkey: walletPublicKey,
        newAccountPubkey: mintKeypair.publicKey,
        space: MINT_SIZE,
        lamports,
        programId: TOKEN_PROGRAM_ID,
      }),
      createInitializeMintInstruction(
        mintKeypair.publicKey,
        0,
        walletPublicKey,
        walletPublicKey
      )
    );

    /**
     * Serialize the transaction
     */
    const serializedTransaction = transaction.serialize({
      requireAllSignatures: false,
      verifySignatures: false,
    });

    return {
      success: true,
      transaction: Buffer.from(serializedTransaction).toString("base64"),
      mintAddress: mintKeypair.publicKey.toString(),
      mintSecretKey: Buffer.from(mintKeypair.secretKey).toString("base64"),
    };
  } catch (error: unknown) {
    console.error("Token creation error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
}
