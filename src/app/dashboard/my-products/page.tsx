import { ProductList } from "@/components/dashboard/my-products/MyProductList";
import DashboardPageLayout from "@/components/layout/dashboard-page-layout";

export default function MyProductsPage() {
  return (
    <DashboardPageLayout title="My Products">
      <ProductList />
    </DashboardPageLayout>
  );
}
