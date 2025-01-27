"use client";

import { useAppKitAccount } from "@reown/appkit/react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import NoFlickering from "../common/NoFlickering";

export default function DashboardButton() {
  const { address, isConnected } = useAppKitAccount();

  const router = useRouter();

  if (!isConnected || !address) {
    return null;
  }

  const goToDashboard = () => {
    router.push("/dashboard");
  };

  return (
    <NoFlickering>
      <Button onClick={goToDashboard}>Dashboard</Button>
    </NoFlickering>
  );
}
