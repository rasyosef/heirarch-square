'use client';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { editProduct } from "@/lib/actions";
import { Product } from "@/lib/definitions";
import { useActionState } from "react";

export default function EditProductForm({ product }: { product: Product }) {
    const editProductWithID = editProduct.bind(null, product.id)
    const [errorMessage, formAction, isPending] = useActionState(
        editProductWithID,
        undefined,
    );
    return (
        <form action={formAction}>
            <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                    <Label htmlFor="name" className="text-sm">Name</Label>
                    <Input
                        id="name"
                        type="text"
                        name="name"
                        defaultValue={product.name}
                        required
                    />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="description" className="text-sm">Description</Label>
                    <Textarea
                        id="description"
                        name="description"
                        defaultValue={product.description}
                        required
                    />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="price" className="text-sm">Price</Label>
                    <Input
                        id="price"
                        type="number"
                        name="price"
                        step="1"
                        defaultValue={product.price}
                        required
                    />
                </div>
                <Button type="submit" className="w-full" aria-disabled={isPending}>
                    Update Product
                </Button>
                {errorMessage && (
                    <p className="text-sm text-red-500">{errorMessage}</p>
                )}
            </div>
        </form>
    )
}