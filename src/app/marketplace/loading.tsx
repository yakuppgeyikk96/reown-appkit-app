import ProductSkeleton from "@/components/common/ProductSkeleton";

export default function MarketplaceLoading() {
  return (
    <div className="container mx-auto py-8">
      <ProductSkeleton count={6} />
    </div>
  );
}
