import { Button } from "@/components/ui/button";
import { usePurchase } from "@/hooks/use-purchase";
import { Product } from "@/types/product";
import { useState } from "react";

interface PurchaseButtonProps {
  product: Product;
}

export default function PurchaseButton({ product }: PurchaseButtonProps) {
  const { purchaseProduct } = usePurchase();
  const [isLoading, setIsLoading] = useState(false);

  const handlePurchase = async () => {
    setIsLoading(true);
    try {
      await purchaseProduct(product);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button onClick={handlePurchase} disabled={isLoading} className="w-full">
      {isLoading ? "Processing..." : "Buy Now"}
    </Button>
  );
}
