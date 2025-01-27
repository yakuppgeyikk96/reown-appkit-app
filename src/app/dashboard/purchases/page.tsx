import PurchasedProducts from "@/components/dashboard/purchases/PurchasedProducts";
import DashboardPageLayout from "@/components/layout/dashboard-page-layout";

export default async function PurchasesPage() {
  return (
    <DashboardPageLayout title="My Purchases">
      <PurchasedProducts />
    </DashboardPageLayout>
  );
}
