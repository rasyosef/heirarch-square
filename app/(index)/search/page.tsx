import { searchProducts } from "@/lib/data/productData";
import CardList from "@/components/CardList";

export default async function SearchPage(props: {
    searchParams?: Promise<{
        query?: string;
    }>;
}) {
    const searchParams = await props.searchParams;
    const query = searchParams?.query || '';
    const products = await searchProducts(query)
    return (
        <div>
            <h1 className="text-lg font-medium py-4">Search Results</h1>
            <CardList products={products} />
        </div>
    );
}
