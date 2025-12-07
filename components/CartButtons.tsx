"use client";

import { addToCart, deleteProduct, removeFromCart } from "@/lib/actions";
import { Button } from "./ui/button";
import { PlusIcon, TrashIcon } from "lucide-react";
import { toast } from "sonner"

export function AddToCartButton({ product_id }: { product_id: number }) {
    return (
        <Button
            size='lg'
            onClick={async () => {
                await addToCart(product_id)

                toast.success("Item has been added to cart!")
            }}
        >
            <PlusIcon /> Add to cart
        </Button>
    )
}

export function RemoveFromCartButton({ item_idx }: { item_idx: number }) {
    return (
        <Button
            size='lg'
            onClick={async () => {
                await removeFromCart(item_idx)

                toast.success("Item has been removed from cart!")
            }}
        >
            <TrashIcon /> Remove from Cart
        </Button>
    )
}

export function DeleteProductButton({ product_id }: { product_id: number }) {
    return (
        <Button
            size='lg'
            variant='outline'
            onClick={async () => {
                await deleteProduct(product_id)
            }}
        >
            <TrashIcon /> Delete
        </Button>
    )
}