"use client";

import { addToCartCookie, removeFromCartCookie } from "@/lib/actions/cart";
import { deleteProduct } from "@/lib/actions/product";
import { Button } from "@/components/ui/button";
import { EditIcon, PlusIcon, TrashIcon } from "lucide-react";
import { toast } from "sonner"
import Link from "next/link";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

export function AddToCartButton({ product_id }: { product_id: number }) {
  return (
    <Button
      size='lg'
      className="rounded-full"
      onClick={async () => {
        await addToCartCookie(product_id)

        toast.success("Item has been added to cart!")
      }}
    >
      <PlusIcon /> Add to Cart
    </Button>
  )
}

export function RemoveFromCartButton({ item_idx, product_id }: { item_idx: number, product_id: number }) {
  return (
    <Button
      size='lg'
      className="rounded-full"
      onClick={async () => {
        await removeFromCartCookie(item_idx, product_id)

        toast.success("Item has been removed from cart!")
      }}
    >
      <TrashIcon /> Remove
    </Button>
  )
}

export function EditProductButton({ product_id }: { product_id: number }) {
  return (
    <Button
      size='lg'
      className="rounded-full"
      asChild
    >
      <Link href={`/dp/${product_id}/edit`}><EditIcon /> Edit </Link>
    </Button>
  )
}

export function DeleteProductButton({ product_id }: { product_id: number }) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          size='lg'
          variant='outline'
          className="rounded-full"
        >
          <TrashIcon /> Delete
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="w-sm">
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure you want to Delete this product?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your product.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button
              onClick={async () => {
                await deleteProduct(product_id)
              }}
            >
              Delete
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}