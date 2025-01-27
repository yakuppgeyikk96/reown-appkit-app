"use client";

import { Product } from "@/types/product";
import useMyProductListLogic from "./ProductList.logic";
import ProductSkeleton from "@/components/common/ProductSkeleton";
import { ProductCard } from "@/components/shared/ProductCard";

export function ProductList() {
  const { address, loading, products } = useMyProductListLogic();

  if (loading) {
    return <ProductSkeleton count={6} />;
  }

  if (!address) {
    return (
      <div className="flex items-center justify-center min-h-[200px] text-gray-600">
        Please connect your wallet to view your products
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[200px] text-gray-600 space-y-2">
        <p>You haven&apos;t created any products yet</p>
        <a
          href="/dashboard/create-product"
          className="text-blue-600 hover:underline"
        >
          Create your first product
        </a>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product: Product) => (
        <ProductCard key={product.id} product={product} variant="dashboard" />
      ))}
    </div>
  );
}
