import {
  Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle
} from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { AddToCartButton } from "@/components/CartButtons";
import { upstashSearchProducts } from "@/lib/upstash-search";

export default async function SearchResultsList({ query }: { query: string }) {
  const products = await upstashSearchProducts(query)

  return (
    <div className="flex flex-col gap-4 pb-4 w-full lg:w-4/5">
      {
        products.map((product) => (
          <Card key={product.id} className="flex-col sm:flex-row rounded-md shadow-none p-0 gap-0">
            <CardContent className="w-full sm:w-3/10 py-4 flex justify-center bg-sidebar">
              <Image
                src={product.image_url}
                alt={product.name}
                width={1024}
                height={1024}
                className="aspect-15/9 object-contain"
              />
            </CardContent>

            <div className="w-full sm:w-7/10 flex flex-col justify-between gap-4 p-4 py-6">
              <CardHeader className="px-2">
                <CardTitle>
                  <Link
                    href={`/dp/${product.id}`}
                    className="text-primary hover:text-gray-700"
                  >{product.name}</Link>
                </CardTitle>
                <CardDescription className="line-clamp-2">{product.description}</CardDescription>
              </CardHeader>

              <CardFooter className="justify-between px-2 gap-3">
                <div className='flex flex-col'>
                  <span className='text-sm font-medium uppercase'>Price</span>
                  <span className='text-xl font-semibold'>${product.price}</span>
                </div>
                <AddToCartButton product_id={product.id} />
              </CardFooter>
            </div>
          </Card>
        ))
      }
    </div>
  );
}