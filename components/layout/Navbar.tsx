import { SidebarTrigger } from "@/components/ui/sidebar";
import SearchProducts from "@/components/Search";
import { Suspense } from "react";
import { AvatarDropdown, CartWithBadge } from "@/components/layout/AvatarDropdown";
import { ThemeModes } from "@/components/layout/Themes";

export default function Navbar() {
  return (
    <nav className="flex items-center p-2 gap-4 border-b bg-sidebar">
      <SidebarTrigger />
      <div className="flex gap-4 items-center ml-auto pr-2">
        <Suspense>
          <SearchProducts />
        </Suspense>
        <ThemeModes />
        <CartWithBadge />
        <AvatarDropdown />
      </div>
    </nav>
  )
}