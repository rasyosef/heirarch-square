'use server';

import { revalidatePath } from "next/cache";
import { prisma } from "./prisma";

export async function addToCart(product_id: number){
    await prisma.cartItem.create({
        data: {
            product_id: product_id,
        },
    })
    revalidatePath("/")
}

export async function removeFromCart(cart_item_id: number){
    await prisma.cartItem.delete({
        where: {
            cart_item_id: cart_item_id
        }
    })
    revalidatePath("/")
}

export async function getCartItemsCount(){
    const num_items = await prisma.cartItem.count();
    return num_items
}