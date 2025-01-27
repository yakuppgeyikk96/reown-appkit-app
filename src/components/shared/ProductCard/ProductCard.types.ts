import { Product } from "@/types/product";

export interface ProductCardProps {
  product: Product;
  variant: "dashboard" | "marketplace";
}
