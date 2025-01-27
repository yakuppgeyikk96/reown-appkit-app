import { CreateProductForm } from "@/components/forms/create-product-form";
import DashboardPageLayout from "@/components/layout/dashboard-page-layout";

export default function CreateProductPage() {
  return (
    <DashboardPageLayout title="Create Product">
      <CreateProductForm />
    </DashboardPageLayout>
  );
}
