import { prisma } from "@/lib/prisma";
import { Product, SaleData } from "@/lib/definitions"

const products_list = [
    <Product>{
        id: 0,
        name: "Apple 2025 MacBook Air 13-inch Laptop with M4 chip",
        description: "13.6-inch Liquid Retina Display, 16GB Unified Memory, 256GB SSD Storage, 12MP Center Stage Camera, Touch ID; Starlight",
        image_url: "/mba13.jpg",
        price: 750
    },

    <Product>{
        id: 1,
        name: "Apple 2025 MacBook Air 15-inch Laptop with M4 chip",
        description: "15.3-inch Liquid Retina Display, 16GB Unified Memory, 256GB SSD Storage, 12MP Center Stage Camera, Touch ID; Sky Blue",
        image_url: "/mba15.jpg",
        price: 950
    },

    <Product>{
        id: 2,
        name: "Apple 2024 MacBook Pro 14 inch Laptop with M4 chip",
        description: "14.2-inch Liquid Retina XDR Display, 10‑core CPU and 10‑core GPU, 16GB Unified Memory, 512GB SSD Storage; Space Black",
        image_url: "/mbp14.jpg",
        price: 1300
    },

    <Product>{
        id: 3,
        name: "Apple 2024 MacBook Pro 16 inch Laptop with M4 Pro chip",
        description: "16.2-inch Liquid Retina XDR Display, 14‑core CPU and 20‑core GPU, 24GB Unified Memory, 512GB SSD Storage; Silver",
        image_url: "/mbp16.jpg",
        price: 2200
    }
]

const sale_data = [
    <SaleData>{
        product_id: 0,
        num_sold: 16
    },
    <SaleData>{
        product_id: 2,
        num_sold: 8
    }
]

// SEED
export async function seedDB(){

    const num_records = await prisma.product.count();

    if (num_records > 0){
        return "DB already seeded!"
    }
    
    for (let i=0; i<products_list.length; i++)
        await prisma.product.create({
            data: {
                id: products_list[i].id,
                name: products_list[i].name,
                description: products_list[i].description,
                image_url: products_list[i].image_url,
                price: products_list[i].price
            }
        })

    for (let i=0; i<sale_data.length; i++)
        await prisma.saleData.create({
            data: {
            product_id: sale_data[i].product_id,
            num_sold: sale_data[i].num_sold
            }
    })

    return "Seed Successful!";
}