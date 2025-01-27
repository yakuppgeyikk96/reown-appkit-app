"use client";

import { Product } from "@/types/product";
import { useAppKitAccount } from "@reown/appkit/react";
import { ProductCard } from "../shared/ProductCard";
import { useMemo } from "react";

interface ProductListProps {
  products: Product[];
}

export default function ProductList({ products }: ProductListProps) {
  const { address } = useAppKitAccount();

  const productsToRender = useMemo(() => {
    const notBuyer = products.filter((product: Product) => {
      return address && !product.buyers.includes(address);
    });

    const notOwner = notBuyer.filter((product: Product) => {
      return address && product.owner !== address;
    });

    return notOwner;
  }, [products, address]);

  return productsToRender.map((product: Product) => (
    <ProductCard key={product.id} product={product} variant="marketplace" />
  ));
}
