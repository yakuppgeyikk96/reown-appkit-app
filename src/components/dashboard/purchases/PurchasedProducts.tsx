"use client";

import ProductSkeleton from "@/components/common/ProductSkeleton";
import ProductGrid from "@/components/shared/ProductGrid";
import { getPurchasedProducts } from "@/app/actions/product";
import { useAppKitAccount } from "@reown/appkit/react";
import { useQuery } from "@tanstack/react-query";

export default function PurchasedProducts() {
  const { address } = useAppKitAccount();

  const { data: purchasedProducts, isLoading } = useQuery({
    queryKey: ["purchasedProducts", address],
    queryFn: () => getPurchasedProducts(address || ""),
    enabled: !!address,
  });

  if (isLoading) {
    return <ProductSkeleton count={6} />;
  }

  return purchasedProducts?.length === 0 ? (
    <div className="text-center py-8">
      <p className="text-gray-500">
        You haven&apos;t purchased any products yet.
      </p>
    </div>
  ) : (
    <ProductGrid products={purchasedProducts || []} variant="dashboard" />
  );
}
