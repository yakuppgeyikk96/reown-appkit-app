import { ProductCard } from "@/components/shared/ProductCard/";
import { Product } from "@/types/product";

interface ProductGridProps {
  products: Product[];
  variant: "dashboard" | "marketplace";
}

export default function ProductGrid({ products, variant }: ProductGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} variant={variant} />
      ))}
    </div>
  );
}
