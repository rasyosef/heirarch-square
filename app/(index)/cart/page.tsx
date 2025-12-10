export const dynamic = 'force-dynamic';

import CartItemList from "@/components/CartItemsList";
import { getItemsInCartFromCookie } from "@/lib/data/cartData";

export default async function ShoppingCart() {
    const cart_items = await getItemsInCartFromCookie()

    return (
        <div>
            <h1 className="text-lg font-medium py-4">Cart</h1>
            <CartItemList cart_items={cart_items} />
        </div>
    )
}