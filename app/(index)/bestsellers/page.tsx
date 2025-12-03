import CardList from "@/components/CardList";
import { getBestSellers } from "@/lib/data";

export default async function BestSellers() {
    const best_sellers = await getBestSellers()
    return (
        <div>
            <h1 className="text-lg font-medium py-4">Best Sellers</h1>
            <CardList products={best_sellers} />
        </div>
    )
}