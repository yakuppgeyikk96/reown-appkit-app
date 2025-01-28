"use client";

import { useRouter } from "next/navigation";
import { useSolana } from "@/hooks/useSolana";
import { ProductCardProps } from "./ProductCard.types";
import { toast } from "sonner";
import { useAppKitAccount } from "@reown/appkit/react";
import { CheckIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import PurchaseButton from "@/components/product/PurchaseButton";
import { useEscrow } from "@/hooks/use-escrow";
import { useMemo } from "react";
import { getPriceFromMetadata } from "@/utils/get-price-from-metadata";
import { updateProductEscrow } from "@/app/actions/update-product-escrow";
import Spinner from "../Spinner";
import { getSolanaExplorerLink } from "@/utils/get-solana-explorer-link";
import useMyProduct from "@/hooks/use-my-product";

export const useProductCardLogic = ({ product, variant }: ProductCardProps) => {
  const router = useRouter();
  const { isLoading } = useSolana();
  const { address, isConnected } = useAppKitAccount();
  const { refetchProducts } = useMyProduct();

  const { listProduct, isLoading: isEscrowLoading } = useEscrow();

  const productPrice = useMemo(() => {
    return getPriceFromMetadata(product.metadata);
  }, [product.metadata]);

  const handleList = async () => {
    if (!productPrice || !address || !product.metadataUri) {
      toast.error("Product price and metadata uri is required");
      return;
    }

    try {
      /**
       * List product on escrow
       */
      const result = await listProduct(productPrice, product.metadataUri);
      console.log("result", result);

      if (result) {
        /**
         * Save escrowId to database
         */
        await updateProductEscrow(
          product.id,
          result.productAccount,
          result.uniqueSeed
        );

        refetchProducts();
      }
    } catch (error) {
      console.error("Failed to list product", error);
      toast.error("Failed to list product");
    }
  };

  const handleViewDetails = () => {
    const basePath =
      variant === "dashboard" ? "/dashboard/my-products" : "/marketplace";
    router.push(`${basePath}/${product.id}`);
  };

  const isOwner = product.owner === address;
  const hasBought = product.buyers?.includes(address || "");

  const solanaExplorerLink = getSolanaExplorerLink(product.escrowId, "devnet");

  const renderActions = () => {
    if (!address || !isConnected) {
      return (
        <div className="mt-2 p-2 bg-red-100 border border-red-300 rounded text-center flex items-center justify-center gap-2">
          <p className="text-red-500">Connect your wallet to continue</p>
        </div>
      );
    }

    return (
      <div className="flex flex-col gap-2">
        {isOwner ? (
          // Owner actions
          <>
            {!product.escrowId ? (
              <Button
                onClick={handleList}
                disabled={isLoading}
                className="w-full"
              >
                {isEscrowLoading ? <Spinner /> : "List Product"}
              </Button>
            ) : (
              <div className="p-2 bg-green-100 border border-green-300 rounded text-center flex items-center justify-center gap-2">
                <CheckIcon className="w-4 h-4 text-green-500" />
                <p className="text-green-700">You listed this product</p>
              </div>
            )}
          </>
        ) : (
          // Non-owner actions
          <>
            {hasBought ? (
              <div className="p-2 bg-green-100 border border-green-300 rounded text-center flex items-center justify-center gap-2">
                <CheckIcon className="w-4 h-4 text-green-500" />
                <p className="text-green-700">You own this product</p>
              </div>
            ) : (
              <PurchaseButton product={product} />
            )}
          </>
        )}

        <Button
          onClick={handleViewDetails}
          variant="secondary"
          className="w-full"
        >
          View Details
        </Button>
      </div>
    );
  };

  return {
    renderActions,
    isOwner,
    hasBought,
    solanaExplorerLink,
  };
};
