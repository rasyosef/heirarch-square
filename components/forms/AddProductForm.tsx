'use client';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { addProduct } from "@/lib/actions/product";
import { AlertCircleIcon } from "lucide-react";
import { useActionState } from "react";
import { Spinner } from "@/components/ui/spinner";

export default function AddProductForm() {
  const [formState, formAction, isPending] = useActionState(
    addProduct,
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
            placeholder="Name of your product"
            defaultValue={formState?.values.name ?? ""}
            required
          />
          {formState?.errors?.name && (
            <p className="text-red-500 text-sm">
              {formState?.errors.name[0]}
            </p>
          )}
        </div>
        <div className="grid gap-2">
          <Label htmlFor="image" className="text-sm">Picture</Label>
          <Input
            id="image"
            type="file"
            name="image"
            accept="image/png, image/jpeg, image/webp"
            required />
          {formState?.errors?.image && (
            <p className="text-red-500 text-sm">
              {formState?.errors.image[0]}
            </p>
          )}
        </div>
        <div className="grid gap-2">
          <Label htmlFor="description" className="text-sm">Description</Label>
          <Textarea
            id="description"
            name="description"
            placeholder="description of your product"
            defaultValue={formState?.values.description ?? ""}
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
            placeholder="price in USD"
            defaultValue={formState?.values.price ?? ""}
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
          Add Product
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