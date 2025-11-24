"use client";

import { addToCart, removeFromCart } from "@/lib/actions";
import { Button } from "./ui/button";
import { Plus, Trash } from "lucide-react";

export function AddToCart({ product_id }: { product_id: number }) {
    return (
        <Button
            size='lg'
            onClick={() => addToCart(product_id)}
        >
            <Plus /> Add to cart
        </Button>
    )
}

export function RemoveFromCart({ item_idx }: { item_idx: number }) {
    return (
        <Button
            size='lg'
            onClick={() => removeFromCart(item_idx)}
        >
            <Trash /> Remove from Cart
        </Button>
    )
}