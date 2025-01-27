import { MobileToggle } from "../sidebar/mobile-toggle";

interface PageHeaderProps {
  title: string;
  children?: React.ReactNode;
}

export function PageHeader({ title, children }: PageHeaderProps) {
  return (
    <div className="flex items-center justify-between py-4">
      <div className="flex items-center gap-x-2">
        <MobileToggle />
        <h1 className="text-2xl font-semibold">{title}</h1>
      </div>
      {children && <div className="flex items-center gap-x-2">{children}</div>}
    </div>
  );
}
