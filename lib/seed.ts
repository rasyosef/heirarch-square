import postgres from 'postgres';
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

const sql = postgres(process.env.POSTGRES_URL!, {ssl: 'require'});

// SEED
export async function seedDB(){
    await sql`DROP TABLE IF EXISTS heirarch_products;`
    await sql`DROP TABLE IF EXISTS heirarch_sale_data;`
    await sql`DROP TABLE IF EXISTS heirarch_cart;`

    await sql`CREATE TABLE IF NOT EXISTS heirarch_products(
        id int primary key,
        name varchar(128),
        description varchar(256),
        image_url varchar(256),
        price float
    );`

    for (let i=0; i<products_list.length; i++)
        await sql`INSERT INTO heirarch_products VALUES(
            ${products_list[i].id},
            ${products_list[i].name},
            ${products_list[i].description},
            ${products_list[i].image_url},
            ${products_list[i].price}
        );`

    const prod_res = await sql<Product[]>`SELECT * FROM heirarch_products`;
    console.log("Products Inserted:", prod_res.length, prod_res[0]);

    //

    await sql`CREATE TABLE IF NOT EXISTS heirarch_sale_data(
        product_id int primary key,
        num_sold int
    );`

    for (let i=0; i<sale_data.length; i++)
        await sql`INSERT INTO heirarch_sale_data VALUES(
            ${sale_data[i].product_id},
            ${sale_data[i].num_sold}
        );`

    const res = await sql<SaleData[]>`SELECT * FROM heirarch_sale_data`;
    console.log("Sale Data Inserted:", res.length, res[0]);

    //

    await sql`CREATE TABLE IF NOT EXISTS heirarch_cart(
        id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        product_id int
    );`

    return "Seed Successful!";
}