import {
  LayoutDashboard,
  Settings,
  ShoppingBag,
  ShoppingCart,
} from "lucide-react";

export const dashboardSidebarItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "My Products",
    href: "/dashboard/my-products",
    icon: ShoppingBag,
  },
  {
    title: "Purchases",
    href: "/dashboard/purchases",
    icon: ShoppingCart,
  },
  {
    title: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
] as const;
