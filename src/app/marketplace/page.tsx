import { getListedProducts } from "@/app/actions/product";
import ProductList from "@/components/marketplace/product-list";

export default async function MarketplacePage() {
  /**
   * Get listed products
   */
  const products = await getListedProducts();

  return (
    <div className="container mx-auto py-8 text-center">
      <h1 className="text-2xl font-bold mb-6">Marketplace</h1>
      <ProductList products={products} />
    </div>
  );
}
