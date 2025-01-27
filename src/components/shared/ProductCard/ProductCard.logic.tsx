"use client";

import { useRouter } from "next/navigation";
import { useSolana } from "@/hooks/useSolana";
import { ProductCardProps } from "./ProductCard.types";
import { toast } from "sonner";
import { updateProductMintAddress } from "@/app/actions/product";
import { useAppKitAccount } from "@reown/appkit/react";
import { CheckIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import PurchaseButton from "@/components/product/PurchaseButton";

export const useProductCardLogic = ({ product, variant }: ProductCardProps) => {
  const router = useRouter();
  const { createToken, isLoading } = useSolana();
  const { address, isConnected } = useAppKitAccount();

  const handleList = async () => {
    const mintAddress = await createToken();

    if (mintAddress) {
      await updateProductMintAddress(product.id, mintAddress);
      toast.success("Product listed successfully");
      router.refresh();
    }
  };

  const handleViewDetails = () => {
    const basePath =
      variant === "dashboard" ? "/dashboard/my-products" : "/marketplace";
    router.push(`${basePath}/${product.id}`);
  };

  const isOwner = product.owner === address;
  const hasBought = product.buyers?.includes(address || "");

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
            {!product.mintAddress ? (
              <Button
                onClick={handleList}
                disabled={isLoading}
                className="w-full"
              >
                {isLoading ? "Listing..." : "List Product"}
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
              <PurchaseButton product={product} buyerAddress={address} />
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
  };
};
