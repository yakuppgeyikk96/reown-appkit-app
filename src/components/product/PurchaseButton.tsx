import { useSolana } from "../../hooks/useSolana";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Product } from "@/types/product";
import { Button } from "../ui/button";
import { updateProductBuyers } from "@/app/actions/product";

interface PurchaseButtonProps {
  product: Product;
  buyerAddress: string;
}

const PurchaseButton = ({ product, buyerAddress }: PurchaseButtonProps) => {
  const { purchaseProduct, isLoading } = useSolana();
  const router = useRouter();

  const handlePurchase = async () => {
    console.log(product);

    if (!product.mintAddress) {
      toast.error("Product not minted");
      return;
    }

    const productPriceValue =
      product.metadata.attributes.find((attr) => attr.trait_type === "Price")
        ?.value || "";

    const productPriceStr = productPriceValue.split(" ")[0];

    const productPrice = productPriceStr ? parseFloat(productPriceStr) : 0;

    const success = await purchaseProduct(product.owner, productPrice);

    if (success) {
      await updateProductBuyers(product.id, buyerAddress);
      toast.success("Purchase successful!");
      router.refresh();
    }
  };

  return (
    <Button onClick={handlePurchase} disabled={isLoading}>
      {isLoading ? "Loading..." : "Buy Now"}
    </Button>
  );
};

export default PurchaseButton;
