"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import { useMemo } from "react";

interface NavItemProps {
  href: string;
  icon: LucideIcon;
  title: string;
}

export function NavItem({ href, icon: Icon, title }: NavItemProps) {
  const pathname = usePathname();

  const isActive = useMemo(() => {
    if (href === "/dashboard") {
      return pathname === href;
    }

    return pathname.includes(href);
  }, [pathname, href]);

  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-x-2 rounded-lg px-3 py-2 text-sm transition-all hover:bg-background-active",
        isActive
          ? "bg-background-active text-primary font-semibold"
          : "text-muted-foreground"
      )}
    >
      <Icon className={cn("h-4 w-4", isActive && "text-primary")} />
      <span>{title}</span>
    </Link>
  );
}
