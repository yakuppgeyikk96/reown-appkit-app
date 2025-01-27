/* eslint-disable @typescript-eslint/no-explicit-any */

import { toast } from "sonner";
import { ProductCardProps } from "./MyProductCard.types";
import { useMemo } from "react";
import { useRouter } from "next/navigation";
import { updateProductMintAddress } from "@/app/actions/product";
import { useSolana } from "@/hooks/useSolana";

const useMyProductCardLogic = ({ product }: ProductCardProps) => {
  const router = useRouter();

  const { createToken, isLoading } = useSolana();

  const handleMint = async () => {
    const mintAddress = await createToken();
    if (mintAddress) {
      await updateProductMintAddress(product.id, mintAddress);
      toast.success("Token created successfully");
      router.refresh();
    }
  };

  const handleViewDetails = () => {
    router.push(`/dashboard/my-products/${product.id}`);
  };

  const productPrice = useMemo(() => {
    const productAttribute = product.metadata.attributes.find(
      (attribute) => attribute.trait_type === "Price"
    );

    return productAttribute?.value;
  }, [product.metadata.attributes]);

  return {
    isLoading,
    handleMint,
    handleViewDetails,
    product,
    productPrice,
  };
};

export default useMyProductCardLogic;
