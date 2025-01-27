import { Product } from "@/types/product";

export interface ProductCardProps {
  product: Product;
}

export const StatusBadgeVariants: Record<
  string,
  "default" | "secondary" | "destructive" | "outline"
> = {
  draft: "secondary",
  listed: "default",
  sold: "outline",
  inactive: "destructive",
};
