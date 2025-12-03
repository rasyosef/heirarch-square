import { getProducts } from "@/lib/data";
import CardList from "@/components/CardList";

export default async function Home() {
  const products = await getProducts()
  return (
    <div>
      <h1 className="text-lg font-medium py-4">Products</h1>
      <CardList products={products} />
    </div>
  );
}
