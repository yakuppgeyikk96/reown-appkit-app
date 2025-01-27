"use client";

import ProductGrid from "@/components/shared/ProductGrid";
import usePurchases from "@/hooks/use-purchases";
import { Product } from "@/types/product";
import { useEffect, useState } from "react";

export default function PurchasedProducts() {
  const [purchasedProducts, setPurchasedProducts] = useState<Product[]>([]);

  const { getPurchasedProducts } = usePurchases();

  useEffect(() => {
    const fetchPurchasedProducts = async () => {
      const products = await getPurchasedProducts();
      console.log(products);
      setPurchasedProducts(products);
    };
    fetchPurchasedProducts();
  }, [getPurchasedProducts]);

  return purchasedProducts.length === 0 ? (
    <div className="text-center py-8">
      <p className="text-gray-500">
        You haven&apos;t purchased any products yet.
      </p>
    </div>
  ) : (
    <ProductGrid products={purchasedProducts} variant="dashboard" />
  );
}
