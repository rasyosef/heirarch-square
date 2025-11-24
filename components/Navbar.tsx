import Link from "next/link";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LogOut, Settings, ShoppingCart, User } from "lucide-react";
import { SidebarTrigger } from "./ui/sidebar";
import SearchProducts from "./Search";
import { Badge } from "./ui/badge";
import { Suspense } from "react";
import { getItemsInCart } from "@/lib/data";

export default async function Navbar() {
    const items_in_cart = await getItemsInCart();
    const num_items_in_cart = items_in_cart?.length
    return (
        <nav className="flex items-center justify-between p-2 border-b">
            <SidebarTrigger />
            <div className="flex gap-4 items-center">
                <Suspense>
                    <SearchProducts />
                </Suspense>
                <Link href="/cart">
                    <div className="relative">
                        <ShoppingCart />
                        <Badge className="absolute -top-2.5 -right-2.5 text-xs px-1 py-0 rounded-full bg-primary">{num_items_in_cart}</Badge>
                        <span className="sr-only">Shopping Cart</span>
                    </div>
                </Link>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Avatar>
                            <AvatarImage src="https://assetsio.gnwcdn.com/the_witcher_3_wild_hunt_e3_2014_18.jpg?width=100&height=100&fit=crop&quality=100&format=png&enable=upscale&auto=webp" />
                            <AvatarFallback>G</AvatarFallback>
                        </Avatar>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent sideOffset={8}>
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild>
                            <Link href="/cart"><ShoppingCart /> Cart </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <User /> Profile
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <Settings /> Settings
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem variant="destructive">
                            <LogOut /> Logout
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </nav>
    )
}