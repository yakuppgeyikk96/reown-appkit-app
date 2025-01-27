import DashboardPageLayout from "@/components/layout/dashboard-page-layout";
import { Card, CardContent } from "@/components/ui/card";
import { PlusIcon } from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  return (
    <DashboardPageLayout title="Dashboard">
      <div className="">
        <Card className="max-w-fit shadow-none hover:bg-background-active cursor-pointer transition-colors duration-300">
          <CardContent className="flex items-center justify-center gap-4 py-4">
            <Link
              className="flex items-center justify-center gap-4 py-4"
              href="/dashboard/my-products/create"
            >
              <PlusIcon className="w-8 h-8 text-primary" />
              <h2 className="text-lg font-semibold">Create a product</h2>
            </Link>
          </CardContent>
        </Card>
      </div>
    </DashboardPageLayout>
  );
}
