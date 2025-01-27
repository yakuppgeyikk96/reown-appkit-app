import { getMyProductById } from "@/app/actions/product";
import MyProductDetail from "@/components/dashboard/my-products/MyProductDetail";
import DashboardPageLayout from "@/components/layout/dashboard-page-layout";

interface MyProductDetailParams {
  id: string;
}

export default async function MyProductDetailPage({
  params,
}: {
  params: Promise<MyProductDetailParams>;
}) {
  const productId = (await params).id;

  const response = await getMyProductById(productId);

  return (
    <DashboardPageLayout title="Product Detail">
      <MyProductDetail product={response.data} />
    </DashboardPageLayout>
  );
}
