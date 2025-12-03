import Link from "next/link";
import { ShoppingCartIcon } from "lucide-react";
import { SidebarTrigger } from "./ui/sidebar";
import SearchProducts from "./Search";
import { Badge } from "./ui/badge";
import { Suspense } from "react";
import { getCartItemsCount } from "@/lib/data";
import { auth } from "@/auth";
import { DefaultAvatarDropdown, UserAvatarDropdown } from "./AvatarDropdown";

export default async function Navbar() {
    const num_items_in_cart = await getCartItemsCount();
    const session = await auth();

    // console.log('session:', session)
    return (
        <nav className="flex items-center justify-between p-2 border-b">
            <SidebarTrigger />
            <div className="flex gap-4 items-center">
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