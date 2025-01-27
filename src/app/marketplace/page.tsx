import { getListedProducts } from "@/app/actions/product";
import ProductList from "@/components/marketplace/product-list";

export default async function MarketplacePage() {
  /**
   * Get listed products
   */
  const products = await getListedProducts();

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Marketplace</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <ProductList products={products} />
      </div>
    </div>
  );
}
