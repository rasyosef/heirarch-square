"use client";

import { addToCartCookie, removeFromCartCookie } from "@/lib/actions/cart";
import { deleteProduct } from "@/lib/actions/product";
import { Button } from "@/components/ui/button";
import { EditIcon, MinusIcon, PlusIcon, TrashIcon, Trash2Icon } from "lucide-react";
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
import { ButtonGroup } from "@/components/ui/button-group";

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
      <PlusIcon strokeWidth={2.5} /> Add to Cart
    </Button>
  )
}

export function RemoveFromCartButton({ product_id }: { product_id: number }) {
  return (
    <Button
      className="rounded-l-full"
      onClick={async () => {
        await removeFromCartCookie(product_id)

        toast.success("Item has been removed from cart!")
      }}
    >
      <TrashIcon strokeWidth={2.5} />
    </Button>
  )
}

export function AddItemCountButton({ product_id }: { product_id: number }) {
  return (
    <Button
      size="lg"
      className="rounded-r-full"
      onClick={async () => {
        await addToCartCookie(product_id)

        toast.success("Item has been added to cart!")
      }}
    >
      <PlusIcon strokeWidth={2.5} />
    </Button>
  )
}

export function SubtractItemCountButton({ product_id, product_count }: { product_id: number, product_count: number }) {
  return (
    <Button
      size="lg"
      className="rounded-l-full px-2"
      onClick={async () => {
        await removeFromCartCookie(product_id)

        toast.success("Item has been removed from cart!")
      }}
    >
      {product_count <= 1 && <TrashIcon />}
      {product_count > 1 && <MinusIcon strokeWidth={2.5} />}
    </Button>
  )
}

export function CartButtonGroup({ product_id, product_count }: { product_id: number, product_count: number }) {

  return (
    <ButtonGroup>
      <SubtractItemCountButton product_id={product_id} product_count={product_count} />
      <Button size="lg" variant="ghost" className="bg-primary text-secondary font-bold hover:bg-primary hover:text-secondary px-2">
        {product_count}
      </Button>
      <AddItemCountButton product_id={product_id} />
    </ButtonGroup>
  )
}

export function EditProductButton({ product_id }: { product_id: number }) {
  return (
    <Button
      size='lg'
      className="rounded-full bg-gray-900 hover:bg-gray-800"
      asChild
    >
      <Link href={`/dp/${product_id}/edit`}><EditIcon strokeWidth={2.5} /> Edit </Link>
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
          <Trash2Icon strokeWidth={2.5} /> Delete
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