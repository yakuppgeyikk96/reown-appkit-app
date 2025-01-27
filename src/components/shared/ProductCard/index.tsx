"use client";

import { ProductCardProps } from "./ProductCard.types";
import { useProductCardLogic } from "./ProductCard.logic";
import Image from "next/image";

export const ProductCard = ({ product, variant }: ProductCardProps) => {
  const { renderActions } = useProductCardLogic({ product, variant });

  return (
    <div className="flex flex-col gap-2 border rounded-lg p-4">
      <Image
        src={product.metadata.image}
        alt={product.name}
        width={400}
        height={192}
        className="w-full h-48 object-cover rounded"
      />
      <h3 className="text-lg font-semibold mt-2">{product.name}</h3>
      <p className="text-gray-600">{product.metadata.description}</p>

      {renderActions()}
    </div>
  );
};
