'use client';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { editProduct } from "@/lib/actions/product";
import { Product } from "@/lib/definitions";
import { AlertCircleIcon } from "lucide-react";
import { useActionState } from "react";
import { Spinner } from "@/components/ui/spinner";

export default function EditProductForm({ product }: { product: Product }) {
  const editProductWithID = editProduct.bind(null, product.id)
  const [formState, formAction, isPending] = useActionState(
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
            defaultValue={formState?.values.name ?? product.name}
            required
          />
          {formState?.errors?.name && (
            <p className="text-red-500 text-sm">
              {formState?.errors.name[0]}
            </p>
          )}
        </div>
        <div className="grid gap-2">
          <Label htmlFor="description" className="text-sm">Description</Label>
          <Textarea
            id="description"
            name="description"
            defaultValue={formState?.values.description ?? product.description}
            required
          />
          {formState?.errors?.description && (
            <p className="text-red-500 text-sm">
              {formState?.errors.description[0]}
            </p>
          )}
        </div>
        <div className="grid gap-2">
          <Label htmlFor="price" className="text-sm">Price</Label>
          <Input
            id="price"
            type="number"
            name="price"
            step="1"
            defaultValue={formState?.values.price ?? product.price}
            required
          />
          {formState?.errors?.price && (
            <p className="text-red-500 text-sm">
              {formState?.errors.price[0]}
            </p>
          )}
        </div>
        <Button type="submit" className="w-full" aria-disabled={isPending}>
          {isPending && <Spinner />}
          Update Product
        </Button>
        {formState && (
          <p className="text-sm text-red-500 inline-flex items-center gap-2">
            <AlertCircleIcon size="1.25em" /> {formState.message}
          </p>
        )}
      </div>
    </form>
  )
}