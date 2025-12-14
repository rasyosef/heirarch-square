export const dynamic = 'force-dynamic';

import CartItemList from "@/components/CartItemsList";
import { CardListSkeleton } from "@/components/skeletons";
import { Suspense } from "react";

export default async function ShoppingCart() {
  return (
    <div>
      <h1 className="text-lg font-medium py-4">Cart</h1>
      <Suspense fallback={<CardListSkeleton />}>
        <CartItemList />
      </Suspense>
    </div>
  )
}