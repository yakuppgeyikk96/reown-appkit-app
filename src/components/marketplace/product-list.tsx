"use client";

import { Product } from "@/types/product";
import { useAppKitAccount } from "@reown/appkit/react";
import { ProductCard } from "../shared/ProductCard";
import { useMemo } from "react";
import { PackageX } from "lucide-react";

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

  if (productsToRender.length === 0) {
    return (
      <div className="flex w-full items-start justify-center min-h-[calc(100vh-200px)]">
        <div className="flex flex-col items-center justify-center min-h-[400px] p-8">
          <PackageX className="w-16 h-16 mb-4" />
          <h3 className="text-xl font-semibold text-gray-700 mb-2">
            No Products Available
          </h3>
          <p className="text-gray-500 text-center max-w-md">
            There are currently no products listed in the marketplace. Check
            back later for new listings.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {productsToRender.map((product: Product) => (
        <ProductCard key={product.id} product={product} variant="marketplace" />
      ))}
    </div>
  );
}
