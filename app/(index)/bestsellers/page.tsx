import CardList from "@/components/CardList";
import { CardListSkeleton } from "@/components/skeletons";
import { Suspense } from "react";

export default function BestSellers() {
  return (
    <div>
      <h1 className="text-lg font-medium py-4">Best Sellers</h1>
      <Suspense fallback={<CardListSkeleton />}>
        <CardList page="bestseller" />
      </Suspense>
    </div>
  )
}