"use client";

import { memo } from "react";
import { ProductCardProps, StatusBadgeVariants } from "./MyProductCard.types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { EyeIcon } from "lucide-react";
import useMyProductCardLogic from "./MyProductCard.logic";
import Image from "next/image";

const ProductCard = (props: ProductCardProps) => {
  const { product, productPrice, handleViewDetails, handleMint, isLoading } =
    useMyProductCardLogic(props);

  return (
    <div className="border rounded-lg p-4 bg-white shadow-sm space-y-4">
      <div className="relative">
        <Image
          src={product.metadata.image}
          alt={product.name}
          width={400}
          height={192}
          className="w-full h-48 object-cover rounded-lg"
        />
        <div className="absolute top-2 right-2">
          <Badge variant={StatusBadgeVariants[product.status] || "default"}>
            {product.status}
          </Badge>
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="text-lg font-bold">{product.name}</h3>

        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">
            {productPrice ? (
              <Badge variant="outline">{productPrice}</Badge>
            ) : (
              "Price not set"
            )}
          </span>

          {product.mintAddress && (
            <span
              className="text-xs text-gray-500 truncate max-w-[180px]"
              title={product.mintAddress}
            >
              {product.mintAddress}
            </span>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Button
          variant="outline"
          className="w-full"
          onClick={handleViewDetails}
        >
          <EyeIcon className="w-4 h-4 mr-2" />
          See Details
        </Button>

        {product.status === "draft" && (
          <Button
            variant="default"
            className="w-full"
            onClick={handleMint}
            disabled={isLoading}
          >
            {isLoading ? "Processing..." : "Mint & List"}
          </Button>
        )}
      </div>
    </div>
  );
};

export default memo(ProductCard);
