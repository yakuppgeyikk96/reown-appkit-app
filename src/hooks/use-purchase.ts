import { useEscrow } from "./use-escrow";
import { Product } from "@/types/product";
import { toast } from "sonner";
import { useAppKitAccount } from "@reown/appkit/react";
import { updateProductBuyers } from "@/app/actions/product";
import { BN, web3 } from "@project-serum/anchor";
import { useRouter } from "next/navigation";

export const usePurchase = () => {
  const { address } = useAppKitAccount();
  const { program } = useEscrow();

  const router = useRouter();

  const purchaseProduct = async (product: Product) => {
    if (
      !address ||
      !product.escrowId ||
      !product.price ||
      !product.uniqueSeed
    ) {
      toast.error("Invalid product data");
      return;
    }

    console.log(product.price);

    try {
      const uniqueSeed = Buffer.from(product.uniqueSeed, "hex");

      const tx = await program.methods
        .purchaseProduct(
          new BN(product.price * web3.LAMPORTS_PER_SOL),
          uniqueSeed
        )
        .accounts({
          buyer: new web3.PublicKey(address),
          seller: new web3.PublicKey(product.owner),
          productAccount: new web3.PublicKey(product.escrowId),
          systemProgram: web3.SystemProgram.programId,
        })
        .rpc();

      console.log("Purchase tx: ", tx);

      await updateProductBuyers(product.id, address);

      toast.success("Product purchased successfully!");

      router.push("/dashboard/purchases");

      return tx;
    } catch (error) {
      console.error("Purchase error:", error);
      toast.error("Failed to purchase product");
      return null;
    }
  };

  return { purchaseProduct };
};
