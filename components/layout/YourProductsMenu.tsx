import Link from "next/link";
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { auth } from "@/auth";
import { getProductsCreatedByUser } from "@/lib/data/productData";
import { BoxIcon } from "lucide-react";


export default async function YourProductsMenu() {
    const session = await auth();
    const your_products = (session?.user?.email) ? await getProductsCreatedByUser(session?.user?.email) : [];

    return (
        <SidebarMenu >
            {
                your_products.map(product => (
                    <SidebarMenuItem key={product.id} className="my-0 py-0">
                        <SidebarMenuButton asChild>
                            <Link className="truncate text-sm" href={`/dp/${product.id}`}> <BoxIcon /> <span className="inline-block">{product.name}</span> </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                ))
            }
        </SidebarMenu>
    )
}