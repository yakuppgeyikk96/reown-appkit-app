import { useAppKitAccount } from "@reown/appkit/react";
import { getPurchasedProducts as getPurchasedProductsByAddress } from "@/app/actions/product";
import { Product, ProductMetadata } from "@/types/product";
import { useCallback } from "react";

const usePurchases = () => {
  const { address } = useAppKitAccount();

  const getPurchasedProducts = useCallback(async () => {
    const purchasedProducts = await getPurchasedProductsByAddress(
      address || ""
    );

    const productsWithMetadata = purchasedProducts.map((product) => ({
      ...product,
      metadata: product.metadata as ProductMetadata,
    }));

    return productsWithMetadata as Product[];
  }, [address]);

  return { getPurchasedProducts };
};

export default usePurchases;
