"use client";

import { ProductCardProps } from "./ProductCard.types";
import { useProductCardLogic } from "./ProductCard.logic";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ExternalLinkIcon } from "lucide-react";

export const ProductCard = ({ product, variant }: ProductCardProps) => {
  const { renderActions, solanaExplorerLink } = useProductCardLogic({
    product,
    variant,
  });

  return (
    <div className="flex flex-col justify-between gap-2 border rounded-lg p-4">
      <div>
        <Image
          src={product.metadata.image}
          alt={product.name}
          width={400}
          height={192}
          className="w-full h-48 object-cover rounded"
        />
        <h3 className="text-lg font-semibold mt-2">{product.name}</h3>
        <p className="text-gray-600">{product.metadata.description}</p>
      </div>
      {renderActions()}
      {solanaExplorerLink && (
        <Button variant="outline" className="w-full">
          <Link
            href={solanaExplorerLink}
            target="_blank"
            className="flex items-center justify-center gap-2"
          >
            <span>View on Solana Explorer</span>
            <ExternalLinkIcon className="w-4 h-4" />
          </Link>
        </Button>
      )}
    </div>
  );
};
