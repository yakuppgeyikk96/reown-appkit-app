import { getMyProductById } from "@/app/actions/product";
import MyProductDetail from "@/components/dashboard/my-products/MyProductDetail";
import DashboardPageLayout from "@/components/layout/dashboard-page-layout";

interface MarketplaceProductDetailParams {
  id: string;
}

export default async function MarketplaceProductDetailPage({
  params,
}: {
  params: Promise<MarketplaceProductDetailParams>;
}) {
  const productId = (await params).id;

  const response = await getMyProductById(productId);

  return (
    <DashboardPageLayout title="Product Detail">
      <MyProductDetail product={response.data} />
    </DashboardPageLayout>
  );
}
