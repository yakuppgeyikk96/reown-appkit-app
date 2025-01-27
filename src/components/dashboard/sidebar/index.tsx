import { NavItems } from "./nav-items";

export function DashboardSidebar() {
  return (
    <div className="hidden md:flex h-full w-56 flex-col border-r bg-background py-6">
      <div className="flex-1">
        <NavItems />
      </div>
    </div>
  );
}
