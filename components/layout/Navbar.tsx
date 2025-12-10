import Link from "next/link";
import { ShoppingCartIcon } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import SearchProducts from "@/components/Search";
import { Badge } from "@/components/ui/badge";
import { Suspense } from "react";
import { getCartItemsCountCookie } from "@/lib/data/cartData";
import { auth } from "@/auth";
import { DefaultAvatarDropdown, UserAvatarDropdown } from "@/components/layout/AvatarDropdown";

export default async function Navbar() {
    const num_items_in_cart = await getCartItemsCountCookie();
    const session = await auth();

    return (
        <nav className="flex items-center p-2 border-b">
            <SidebarTrigger />
            <div className="flex gap-6 items-center ml-auto pr-2">
                <Suspense>
                    <SearchProducts />
                </Suspense>
                <Link href="/cart">
                    <div className="relative">
                        <ShoppingCartIcon />
                        <Badge className="absolute -top-2.5 -right-2.5 text-xs px-1 py-0 rounded-full bg-primary">{num_items_in_cart}</Badge>
                        <span className="sr-only">Shopping Cart</span>
                    </div>
                </Link>
                {!session && <DefaultAvatarDropdown />}
                {session && <UserAvatarDropdown />}
            </div>
        </nav>
    )
}