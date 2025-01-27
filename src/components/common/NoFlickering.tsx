import React from "react";
import { Skeleton } from "../ui/skeleton";

export default function NoFlickering({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return <Skeleton className="w-40 h-8" />;
  }

  return <>{children}</>;
}
