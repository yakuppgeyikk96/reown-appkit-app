"use client";

import { NavItem } from "./nav-item";
import { dashboardSidebarItems } from "@/constants/dashboard-sidebar-items";

const items = dashboardSidebarItems;

export function NavItems() {
  return (
    <div className="flex flex-col gap-1 px-4 xl:pl-0">
      {items.map((item) => (
        <NavItem
          key={item.href}
          href={item.href}
          icon={item.icon}
          title={item.title}
        />
      ))}
    </div>
  );
}
