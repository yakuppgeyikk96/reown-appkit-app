"use client";

import { useAppKit, useAppKitAccount } from "@reown/appkit/react";
import { Button } from "../ui/button";
import NoFlickering from "../common/NoFlickering";
import { Skeleton } from "../ui/skeleton";

export default function ConnectButton() {
  const { open } = useAppKit();
  const { address, status } = useAppKitAccount();

  const openConnect = () => {
    open();
  };

  if (status === "connecting") {
    return <Skeleton className="w-40 h-8" />;
  }

  return (
    <NoFlickering>
      {status === "connected" && address ? (
        <Button variant="outline" onClick={openConnect}>
          <p className="truncate">{`${address.slice(0, 4)}...${address.slice(
            -4
          )}`}</p>
        </Button>
      ) : (
        <Button onClick={openConnect}>Connect Wallet</Button>
      )}
    </NoFlickering>
  );
}
