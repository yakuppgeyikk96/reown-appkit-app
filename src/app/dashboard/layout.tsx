import { DashboardSidebar } from "@/components/dashboard/sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-[calc(100vh-4rem)]">
      <DashboardSidebar />
      <div className="flex-1">
        <main className="h-[calc(100vh-7.5rem)] overflow-y-auto">
          <div className="container max-w-screen-2xl">{children}</div>
        </main>
      </div>
    </div>
  );
}
