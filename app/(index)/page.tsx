import CardList from "@/components/CardList";
import { CardListSkeleton } from "@/components/skeletons";
import { Suspense } from "react";

export default async function Home() {
  return (
    <div>
      <h1 className="text-lg font-medium py-4">Products</h1>
      <Suspense fallback={<CardListSkeleton />}>
        <CardList page="home" />
      </Suspense>
    </div>
  );
}
