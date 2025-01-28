import Link from "next/link";
import ConnectButton from "./ConnectButton";
import DashboardButton from "./DashboardButton";
import Logo from "../shared/Logo";

export default function Navbar() {
  return (
    <nav className="container max-w-screen-xl mx-auto flex justify-between items-center py-2 px-4 xl:px-0">
      <div className="flex items-center space-x-12">
        <Logo />
        <ul>
          <li className="font-semibold text-muted-foreground hover:text-primary">
            <Link href="/marketplace">Marketplace</Link>
          </li>
        </ul>
      </div>
      <div className="flex items-center space-x-4">
        <DashboardButton />
        <ConnectButton />
      </div>
    </nav>
  );
}
