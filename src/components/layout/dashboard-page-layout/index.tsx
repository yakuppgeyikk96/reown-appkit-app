import { PageHeader } from "@/components/dashboard/header/page-header";

interface PageLayoutProps {
  children: React.ReactNode;
  title: string;
}

const DashboardPageLayout: React.FC<PageLayoutProps> = ({
  children,
  title,
}) => {
  return (
    <div className="flex flex-col gap-6 px-12">
      <PageHeader title={title} />
      <div>{children}</div>
    </div>
  );
};

export default DashboardPageLayout;
