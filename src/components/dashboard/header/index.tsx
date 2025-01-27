import { MobileToggle } from "../sidebar/mobile-toggle";

export function DashboardHeader() {
  return (
    <div className="flex h-14 items-center xl:px-6">
      <MobileToggle />
    </div>
  );
}
